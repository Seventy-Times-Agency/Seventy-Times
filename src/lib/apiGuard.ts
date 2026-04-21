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
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
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
 * Automatically trust Vercel preview/production URLs for this project
 * even if they're not listed in ALLOWED_ORIGINS — Vercel generates
 * fresh hostnames on every deploy so an explicit list would rot fast.
 *
 * We still require a real vercel.app suffix, so random strangers on
 * other Vercel projects are rejected.
 */
function isVercelHost(candidate: string): boolean {
  try {
    const { hostname } = new URL(candidate);
    return hostname.endsWith(".vercel.app") || hostname === "vercel.app";
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
    { error: "Слишком много запросов. Попробуй чуть позже." },
    {
      status: 429,
      headers: { "Retry-After": String(result.retryAfter) },
    }
  );
}

export function forbiddenOriginResponse() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
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
