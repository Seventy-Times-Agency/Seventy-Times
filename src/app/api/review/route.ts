import { NextResponse } from "next/server";
import {
  checkOrigin,
  enforceBodyLimit,
  forbiddenOriginResponse,
  getClientIp,
  isHoneypotTripped,
  rateLimit,
  rateLimitResponse,
  silentSuccessResponse,
} from "@/lib/apiGuard";
import {
  escapeMarkdown,
  isTelegramConfigured,
  sendTelegramMessage,
} from "@/lib/telegram";
import { isNotionReviewsConfigured, sendReviewToNotion } from "@/lib/notion";
import { isEmailConfigured, sendEmail } from "@/lib/email";

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

function isCodeValid(code: string): boolean {
  const normalize = (s: string) => s.replace(/[\s\-_]/g, "").toLowerCase();
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

async function notifyTelegram(
  review: Omit<ReviewPayload, "code">,
  code: string,
) {
  if (!isTelegramConfigured()) return false;
  const text = [
    "⭐️ *Новый отзыв на сайте Seventy Times*",
    "",
    `🔑 *Код клиента:* \`${escapeMarkdown(code)}\``,
    `👤 *Имя:* ${escapeMarkdown(review.name)}`,
    `💼 *Роль:* ${escapeMarkdown(review.role)}`,
    `📍 *Локация:* ${escapeMarkdown(review.location)}`,
    "",
    `💬 *Отзыв:*`,
    escapeMarkdown(review.content),
  ].join("\n");
  return sendTelegramMessage(text);
}

function buildEmailText(review: Omit<ReviewPayload, "code">, code: string) {
  return [
    `Code: ${code}`,
    `Name: ${review.name}`,
    `Role: ${review.role}`,
    `Location: ${review.location}`,
    "",
    "Content:",
    review.content,
  ].join("\n");
}

export async function POST(req: Request) {
  if (!checkOrigin(req)) return forbiddenOriginResponse();

  const tooBig = enforceBodyLimit(req, 16 * 1024);
  if (tooBig) return tooBig;

  const ip = getClientIp(req);
  const rl = rateLimit(`review:${ip}`, 3, 60 * 60_000);
  if (!rl.ok) return rateLimitResponse(rl);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
  }

  if (
    typeof body === "object" &&
    body !== null &&
    isHoneypotTripped((body as Record<string, unknown>).website)
  ) {
    console.warn("[REVIEW] honeypot tripped", {
      at: new Date().toISOString(),
      ip,
    });
    return silentSuccessResponse();
  }

  const code = body.code.trim();
  const name = body.name.trim();
  const role = body.role.trim();
  const location = body.location.trim();
  const content = body.content.trim();

  if (!code || !name || !role || !location || !content) {
    return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
  }

  if (
    code.length > LIMITS.code ||
    name.length > LIMITS.name ||
    role.length > LIMITS.role ||
    location.length > LIMITS.location ||
    content.length > LIMITS.content
  ) {
    return NextResponse.json({ error: "TOO_LONG" }, { status: 400 });
  }

  if (!isCodeValid(code)) {
    const bruteforce = rateLimit(`review-bad-code:${ip}`, 5, 15 * 60_000);
    if (!bruteforce.ok) return rateLimitResponse(bruteforce);
    console.warn("[REVIEW] invalid code attempt", {
      at: new Date().toISOString(),
      codeLen: code.length,
    });
    return NextResponse.json({ error: "INVALID_CODE" }, { status: 401 });
  }

  const telegramOn = isTelegramConfigured();
  const notionOn = isNotionReviewsConfigured();
  const emailOn = isEmailConfigured();

  console.log("[REVIEW] accepted", {
    at: new Date().toISOString(),
    channels: { telegram: telegramOn, notion: notionOn, email: emailOn },
  });

  if (!telegramOn && !notionOn && !emailOn) {
    console.error("[REVIEW] no outbound channels configured — refusing");
    return NextResponse.json(
      { error: "NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  await Promise.allSettled([
    notifyTelegram({ name, role, location, content }, code),
    sendReviewToNotion({ name, role, location, content, code }),
    sendEmail({
      subject: `Review: ${name}`,
      text: buildEmailText({ name, role, location, content }, code),
    }),
  ]);

  return NextResponse.json({ ok: true });
}
