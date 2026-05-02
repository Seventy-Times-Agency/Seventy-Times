import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import {
  checkOrigin,
  forbiddenOriginResponse,
  getClientIp,
  isFirstSeen,
  rateLimit,
  rateLimitResponse,
} from "@/lib/apiGuard";
import {
  escapeMarkdown,
  isTelegramConfigured,
  sendTelegramMessage,
} from "@/lib/telegram";

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

function signature(p: ErrorPayload): string {
  // First line of the message + source + line keeps the signature
  // narrow enough to dedup repeated errors but specific enough that
  // genuinely different bugs each get their own alert.
  const head = (p.message || "").split("\n")[0].slice(0, 200);
  const seed = `${head}|${p.source ?? ""}|${p.line ?? ""}`;
  return createHash("sha1").update(seed).digest("hex").slice(0, 12);
}

async function notifyTelegram(p: ErrorPayload, sig: string) {
  if (!isTelegramConfigured()) return;
  const lines = [
    "🚨 *Client error on Seventy Times*",
    `🔖 *Sig:* \`${escapeMarkdown(sig)}\``,
    `💬 *Message:* ${escapeMarkdown(p.message.slice(0, 400))}`,
  ];
  if (p.url) lines.push(`🌐 *URL:* ${escapeMarkdown(p.url)}`);
  if (p.source)
    lines.push(`📄 *Source:* ${escapeMarkdown(p.source)}:${p.line ?? "?"}`);
  if (p.userAgent)
    lines.push(`🧭 *UA:* ${escapeMarkdown(p.userAgent.slice(0, 160))}`);
  await sendTelegramMessage(lines.join("\n"));
}

/**
 * Lightweight error sink. Browser-side error boundaries POST a JSON
 * description here. We log it for Vercel's runtime logs, and on the
 * first occurrence within an hour we also push a Telegram alert so a
 * regression doesn't sit silently in logs all weekend. Repeated hits
 * with the same signature inside that window are deduplicated.
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

  const sig = signature(payload);
  console.error("[CLIENT_ERROR]", {
    at: new Date().toISOString(),
    ip,
    sig,
    ...payload,
  });

  // One Telegram ping per signature per hour. Suppresses storms when
  // a single visitor reloads a broken page.
  if (isFirstSeen(`error-sig:${sig}`, 60 * 60_000)) {
    await notifyTelegram(payload, sig);
  }

  return NextResponse.json({ ok: true });
}
