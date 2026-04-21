import { NextResponse } from "next/server";
import {
  checkOrigin,
  forbiddenOriginResponse,
  getClientIp,
  isHoneypotTripped,
  rateLimit,
  rateLimitResponse,
  silentSuccessResponse,
} from "@/lib/apiGuard";
import { escapeMarkdown } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  name: string;
  contact: string;
  business: string;
  request: string;
};

const LIMITS = {
  name: 100,
  contact: 200,
  business: 500,
  request: 2000,
};

function isValid(p: unknown): p is LeadPayload {
  if (typeof p !== "object" || p === null) return false;
  const r = p as Record<string, unknown>;
  return (
    typeof r.name === "string" &&
    typeof r.contact === "string" &&
    typeof r.business === "string" &&
    typeof r.request === "string"
  );
}

async function notifyTelegram(lead: LeadPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    "📩 *Новая заявка с сайта IAA agency*",
    "",
    `👤 *Имя:* ${escapeMarkdown(lead.name)}`,
    `📞 *Контакт:* ${escapeMarkdown(lead.contact)}`,
    `🏢 *Бизнес:* ${escapeMarkdown(lead.business)}`,
    "",
    `💬 *Запрос:*`,
    escapeMarkdown(lead.request),
  ].join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "MarkdownV2",
      }),
    });
  } catch (err) {
    console.error("[LEAD] Telegram notification failed:", err);
  }
}

export async function POST(req: Request) {
  if (!checkOrigin(req)) return forbiddenOriginResponse();

  const ip = getClientIp(req);
  const rl = rateLimit(`lead:${ip}`, 5, 60 * 60_000);
  if (!rl.ok) return rateLimitResponse(rl);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "Не хватает полей в заявке" },
      { status: 400 }
    );
  }

  // Honeypot: bots fill every field they see. Humans never see this one.
  if (
    typeof body === "object" &&
    body !== null &&
    isHoneypotTripped((body as Record<string, unknown>).website)
  ) {
    console.warn("[LEAD] honeypot tripped", {
      at: new Date().toISOString(),
      ip: getClientIp(req),
    });
    return silentSuccessResponse();
  }

  const name = body.name.trim();
  const contact = body.contact.trim();
  const business = body.business.trim();
  const request = body.request.trim();

  if (!name || !contact || !business || !request) {
    return NextResponse.json(
      { error: "Заполни, пожалуйста, все поля" },
      { status: 400 }
    );
  }

  if (
    name.length > LIMITS.name ||
    contact.length > LIMITS.contact ||
    business.length > LIMITS.business ||
    request.length > LIMITS.request
  ) {
    return NextResponse.json(
      { error: "Один из ответов слишком длинный" },
      { status: 400 }
    );
  }

  const telegramConfigured = Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
  );

  console.log("[LEAD] received", {
    at: new Date().toISOString(),
    telegram: telegramConfigured,
    sizes: {
      name: name.length,
      contact: contact.length,
      business: business.length,
      request: request.length,
    },
  });

  if (!telegramConfigured) {
    console.warn(
      "[LEAD] Telegram not configured — lead accepted but not forwarded"
    );
  }

  await notifyTelegram({ name, contact, business, request });

  return NextResponse.json({ ok: true });
}
