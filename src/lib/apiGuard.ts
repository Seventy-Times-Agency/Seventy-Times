import { NextResponse } from "next/server";
import { getRateStore } from "./rateStore";

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfter: number };

/**
 * Fixed-window rate limit. Increments the counter for `key` in the shared
 * store and rejects once it exceeds `limit` within `windowMs`. Async now
 * because the backing store may be a remote Redis (Upstash / Vercel KV);
 * with no Redis env configured it resolves against the in-memory store
 * with the same behaviour as before.
 *
 * Note: the retryAfter is approximated from the full window — the store
 * tracks the count, not the per-key reset timestamp, so we report the
 * whole window length as the worst-case backoff. (The previous in-memory
 * implementation reported the remaining time; reporting the full window
 * is a safe over-estimate and keeps the store interface minimal.)
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const count = await getRateStore().incrWithExpiry(key, windowMs);
  if (count > limit) {
    return { ok: false, retryAfter: Math.ceil(windowMs / 1000) };
  }
  return { ok: true };
}

export function getClientIp(req: Request): string {
  // On Vercel these are set by the platform and are NOT client-spoofable.
  // Prefer them over the left-most X-Forwarded-For entry, which the
  // client fully controls — trusting that would let an attacker rotate
  // a fake IP per request and bypass every rate-limit / dedup bucket.
  const vercel = req.headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  // Fallback: take the right-most X-Forwarded-For hop (closest to our
  // infrastructure), not the spoofable left-most one.
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return "unknown";
}

function parseOrigins(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim().replace(/\/$/, ""))
    .filter(Boolean);
}

/**
 * Extract the origin (scheme + host) from the request. Falls back to
 * the Referer header if Origin is missing. Returns null when neither
 * header is present or parseable.
 */
function getRequestOrigin(req: Request): string | null {
  const origin = req.headers.get("origin");
  if (origin) return origin.replace(/\/$/, "");

  const referer = req.headers.get("referer");
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

/**
 * Automatically trust this project's own Vercel deployment URLs even if
 * they're not listed in ALLOWED_ORIGINS — Vercel generates fresh
 * hostnames on every deploy so an explicit list would rot fast.
 *
 * Matching is against the deployment hostnames Vercel injects at
 * runtime (VERCEL_URL / VERCEL_BRANCH_URL / production URL), not a
 * blanket "*.vercel.app" — any other Vercel project could host a page
 * with that suffix and relay spam through our form endpoints.
 */
function isVercelHost(candidate: string): boolean {
  const own = [
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ].filter(Boolean) as string[];
  if (own.length === 0) return false;
  try {
    const { hostname } = new URL(candidate);
    return own.some((h) => h.toLowerCase() === hostname.toLowerCase());
  } catch {
    return false;
  }
}

/**
 * True when this deployment trusts at least one Vercel-injected host
 * (VERCEL_URL / VERCEL_BRANCH_URL / production URL). Used by checkOrigin
 * to decide whether an empty ALLOWED_ORIGINS list is safe.
 */
function hasVercelHosts(): boolean {
  return [
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ].some(Boolean);
}

export function checkOrigin(req: Request): boolean {
  const allowed = parseOrigins(process.env.ALLOWED_ORIGINS);
  if (allowed.length === 0) {
    // No explicit allow-list AND no Vercel host to fall back on. In
    // dev that's expected (localhost) so stay fail-open; in production
    // an unconfigured origin check would accept any caller — fail
    // closed instead and shout about the misconfiguration.
    if (!hasVercelHosts()) {
      if (process.env.NODE_ENV === "production") {
        console.warn(
          "[ORIGIN] reject — no ALLOWED_ORIGINS and no VERCEL_* host " +
            "configured in production; refusing all callers (fail-closed)",
        );
        return false;
      }
      return true;
    }
    // We have Vercel hosts but no explicit list — fall through so the
    // candidate is matched against isVercelHost() below.
  }

  const candidate = getRequestOrigin(req);
  if (!candidate) {
    console.warn("[ORIGIN] reject — no Origin or Referer", {
      ua: req.headers.get("user-agent")?.slice(0, 80) ?? "",
    });
    return false;
  }

  if (allowed.includes(candidate)) return true;
  if (isVercelHost(candidate)) return true;

  // Accept the same host with or without "www." prefix, since users
  // may arrive at either one unless the DNS forces a canonical host.
  try {
    const url = new URL(candidate);
    const altHost = url.hostname.startsWith("www.")
      ? url.hostname.slice(4)
      : `www.${url.hostname}`;
    const altOrigin = `${url.protocol}//${altHost}`;
    if (allowed.includes(altOrigin)) return true;
  } catch {
    // ignore
  }

  console.warn("[ORIGIN] reject", { candidate });
  return false;
}

export function rateLimitResponse(result: Extract<RateLimitResult, { ok: false }>) {
  return NextResponse.json(
    { error: "RATE_LIMITED" },
    {
      status: 429,
      headers: { "Retry-After": String(result.retryAfter) },
    }
  );
}

/**
 * Reject obviously oversized payloads before allocating buffers for
 * req.json(). Reads the declared Content-Length only — a request that
 * omits the header still goes through, but the runtime body parser
 * has its own hard cap as the second line of defence.
 */
export function enforceBodyLimit(
  req: Request,
  maxBytes: number,
): NextResponse | null {
  const declared = req.headers.get("content-length");
  if (!declared) return null;
  const size = Number(declared);
  if (!Number.isFinite(size) || size <= maxBytes) return null;
  return NextResponse.json({ error: "TOO_LONG" }, { status: 413 });
}

export function forbiddenOriginResponse() {
  return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
}

/**
 * If the honeypot field is filled, return a response that looks
 * identical to a successful submission — so the bot moves on — but
 * don't process the payload (no Telegram, no Notion, no logs beyond
 * one warn line). Real users never see this field.
 */
export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function silentSuccessResponse() {
  return NextResponse.json({ ok: true });
}

/**
 * Fixed-window deduplication. Returns true the first time a key is seen
 * within the window, false on subsequent calls until the window expires.
 * Backed by the shared RateStore (getRateStore) — so with Upstash / KV
 * env set it's global across serverless instances, otherwise in-memory
 * per-instance, the same as rateLimit.
 */
export async function isFirstSeen(
  key: string,
  windowMs: number,
): Promise<boolean> {
  return getRateStore().setIfAbsent(key, windowMs);
}

/**
 * Normalise a contact string for dedup keys: lowercase, strip spaces /
 * dashes / @-prefix. For emails, dots are stripped from the local part
 * only ("j.doe@host.com" ≈ "jdoe@host.com" gmail-style) — stripping
 * them from the domain too would collapse different hosts into one key.
 * Non-email contacts (phones, usernames) lose dots entirely.
 */
export function normalizeContactKey(contact: string): string {
  const base = contact
    .trim()
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/[\s\-]/g, "");
  const at = base.indexOf("@");
  if (at === -1) return base.replace(/\./g, "");
  return base.slice(0, at).replace(/\./g, "") + base.slice(at);
}
