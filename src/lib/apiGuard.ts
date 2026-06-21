import { NextResponse } from "next/server";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key);
  }
}

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfter: number };

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
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

export function checkOrigin(req: Request): boolean {
  const allowed = parseOrigins(process.env.ALLOWED_ORIGINS);
  if (allowed.length === 0) return true;

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
 * Sliding-window deduplication. Returns true the first time a key is
 * seen within the window, false on subsequent calls until the window
 * expires. Backed by the same in-memory bucket store as rateLimit, so
 * it shares the same per-instance limitation on Vercel.
 */
export function isFirstSeen(key: string, windowMs: number): boolean {
  const now = Date.now();
  sweep(now);
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  bucket.count += 1;
  return false;
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
