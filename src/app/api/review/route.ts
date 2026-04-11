import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ReviewPayload = {
  code: string;
  name: string;
  role: string;
  location: string;
  content: string;
};

const LIMITS = {
  code: 64,
  name: 100,
  role: 150,
  location: 120,
  content: 1200,
};

function isValid(p: unknown): p is ReviewPayload {
  if (typeof p !== "object" || p === null) return false;
  const r = p as Record<string, unknown>;
  return (
    typeof r.code === "string" &&
    typeof r.name === "string" &&
    typeof r.role === "string" &&
    typeof r.location === "string" &&
    typeof r.content === "string"
  );
}

/**
 * Check the provided code against the CLIENT_CODES env var, which
 * holds a comma-separated list of valid one-off client codes. Each
 * real client gets a code after their project ends; only people with
 * a real code can submit a review.
 *
 * Matching is case-insensitive and whitespace-insensitive, and
 * accepts codes with or without spaces/dashes for convenience.
 */
function isCodeValid(code: string): boolean {
  const normalize = (s: string) =>
    s.replace(/[\s\-_]/g, "").toLowerCase();

  const raw = process.env.CLIENT_CODES || "";
  if (!raw.trim()) return false;

  const needle = normalize(code);
  if (!needle) return false;

  return raw
    .split(",")
    .map((c) => normalize(c))
    .filter(Boolean)
    .includes(needle);
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, (c) => `\\${c}`);
}

async function notifyTelegram(review: Omit<ReviewPayload, "code">, code: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    "⭐️ *Новый отзыв на сайте IAA agency*",
    "",
    `🔑 *Код клиента:* \`${escapeMarkdown(code)}\``,
    `👤 *Имя:* ${escapeMarkdown(review.name)}`,
    `💼 *Роль:* ${escapeMarkdown(review.role)}`,
    `📍 *Локация:* ${escapeMarkdown(review.location)}`,
    "",
    `💬 *Отзыв:*`,
    escapeMarkdown(review.content),
    "",
    "_Добавь вручную в src/data/testimonials.ts_",
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
    console.error("[REVIEW] Telegram notification failed:", err);
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
      { error: "Не хватает полей в отзыве" },
      { status: 400 }
    );
  }

  const code = body.code.trim();
  const name = body.name.trim();
  const role = body.role.trim();
  const location = body.location.trim();
  const content = body.content.trim();

  if (!code || !name || !role || !location || !content) {
    return NextResponse.json(
      { error: "Заполни все поля" },
      { status: 400 }
    );
  }

  if (
    code.length > LIMITS.code ||
    name.length > LIMITS.name ||
    role.length > LIMITS.role ||
    location.length > LIMITS.location ||
    content.length > LIMITS.content
  ) {
    return NextResponse.json(
      { error: "Одно из полей слишком длинное" },
      { status: 400 }
    );
  }

  if (!isCodeValid(code)) {
    return NextResponse.json(
      {
        error:
          "Код не подходит. Если вы реальный клиент — напишите нам в Telegram, мы выдадим вам персональный код.",
      },
      { status: 401 }
    );
  }

  console.log("[REVIEW]", {
    code,
    name,
    role,
    location,
    content,
    at: new Date().toISOString(),
  });

  await notifyTelegram({ name, role, location, content }, code);

  return NextResponse.json({ ok: true });
}
