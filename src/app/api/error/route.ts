import { NextResponse } from "next/server";
import { checkOrigin, forbiddenOriginResponse, getClientIp, rateLimit, rateLimitResponse } from "@/lib/apiGuard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ErrorPayload = {
  message: string;
  source?: string;
  line?: number;
  column?: number;
  stack?: string;
  url?: string;
  userAgent?: string;
};

const MAX_FIELD = 2000;

function clean(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  return value.slice(0, MAX_FIELD);
}

/**
 * Lightweight error sink. Browser-side error boundaries POST a
 * JSON description here; we just emit a console.error so the
 * payload shows up in Vercel's runtime logs. Cheap, no third-party
 * SDK to babysit, and good enough until traffic is high enough to
 * justify a real APM.
 */
export async function POST(req: Request) {
  if (!checkOrigin(req)) return forbiddenOriginResponse();

  const ip = getClientIp(req);
  const rl = rateLimit(`error:${ip}`, 30, 60_000);
  if (!rl.ok) return rateLimitResponse(rl);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  const r = body as Record<string, unknown>;
  const payload: ErrorPayload = {
    message: clean(r.message) ?? "(no message)",
    source: clean(r.source),
    line: typeof r.line === "number" ? r.line : undefined,
    column: typeof r.column === "number" ? r.column : undefined,
    stack: clean(r.stack),
    url: clean(r.url),
    userAgent: clean(r.userAgent),
  };

  console.error("[CLIENT_ERROR]", {
    at: new Date().toISOString(),
    ip,
    ...payload,
  });

  return NextResponse.json({ ok: true });
}
