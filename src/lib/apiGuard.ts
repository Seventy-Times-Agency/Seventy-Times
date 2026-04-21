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

export function checkOrigin(req: Request): boolean {
  const allowed = parseOrigins(process.env.ALLOWED_ORIGINS);
  if (allowed.length === 0) return true;

  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  const candidate = origin || (referer ? new URL(referer).origin : null);
  if (!candidate) return false;

  return allowed.includes(candidate.replace(/\/$/, ""));
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
