import { NextResponse } from "next/server";

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

function escapeMarkdown(text: string): string {
  // Escape Telegram MarkdownV2 special chars so user input can't break
  // the message formatting or inject markup.
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, (c) => `\\${c}`);
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

  // Always log the lead so it's visible in Vercel logs even without
  // a Telegram bot configured.
  console.log("[LEAD]", {
    name,
    contact,
    business,
    request,
    at: new Date().toISOString(),
  });

  // Fire-and-notify Telegram if credentials are set in env.
  await notifyTelegram({ name, contact, business, request });

  return NextResponse.json({ ok: true });
}
