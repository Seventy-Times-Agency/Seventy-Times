import { NextResponse, after } from "next/server";
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
import { isEmailConfigured, sendEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ReviewPayload = {
  name: string;
  role: string;
  location: string;
  content: string;
};

const LIMITS = {
  name: 100,
  role: 150,
  location: 120,
  content: 1200,
};

function isValid(p: unknown): p is ReviewPayload {
  if (typeof p !== "object" || p === null) return false;
  const r = p as Record<string, unknown>;
  return (
    typeof r.name === "string" &&
    typeof r.role === "string" &&
    typeof r.location === "string" &&
    typeof r.content === "string"
  );
}

// No client code: anyone can leave a review. Spam is held off by the
// honeypot, the 3/hour per-IP rate limit and manual moderation — reviews
// are published by hand, never automatically.

async function notifyTelegram(review: ReviewPayload) {
  if (!isTelegramConfigured()) return false;
  const text = [
    "⭐️ *Новый отзыв на сайте Seventy Times*",
    "",
    `👤 *Имя:* ${escapeMarkdown(review.name)}`,
    `💼 *Роль:* ${escapeMarkdown(review.role)}`,
    `📍 *Локация:* ${escapeMarkdown(review.location)}`,
    "",
    `💬 *Отзыв:*`,
    escapeMarkdown(review.content),
  ].join("\n");
  return sendTelegramMessage(text);
}

/** Ready-to-paste entry for src/data/reviews.ts — publishing a review is
 *  one paste + deploy. JSON.stringify keeps quotes/newlines safe. */
function publishSnippet(review: ReviewPayload): string {
  const id = `${new Date().toISOString().slice(0, 7)}-${Date.now().toString(36)}`;
  return [
    "  {",
    `    id: ${JSON.stringify(id)},`,
    `    name: ${JSON.stringify(review.name)},`,
    `    role: ${JSON.stringify(review.role)},`,
    `    location: ${JSON.stringify(review.location)},`,
    `    content: ${JSON.stringify(review.content)},`,
    "  },",
  ].join("\n");
}

function buildEmailText(review: ReviewPayload) {
  return [
    `Name: ${review.name}`,
    `Role: ${review.role}`,
    `Location: ${review.location}`,
    "",
    "Content:",
    review.content,
    "",
    "———",
    "To publish (only with the client's OK): paste this into the REVIEWS",
    "list in src/data/reviews.ts, commit and deploy.",
    "",
    publishSnippet(review),
  ].join("\n");
}

export async function POST(req: Request) {
  if (!checkOrigin(req)) return forbiddenOriginResponse();

  const tooBig = enforceBodyLimit(req, 16 * 1024);
  if (tooBig) return tooBig;

  const ip = getClientIp(req);
  const rl = await rateLimit(`review:${ip}`, 3, 60 * 60_000);
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

  const name = body.name.trim();
  const role = body.role.trim();
  const location = body.location.trim();
  const content = body.content.trim();

  if (!name || !role || !location || !content) {
    return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
  }

  if (
    name.length > LIMITS.name ||
    role.length > LIMITS.role ||
    location.length > LIMITS.location ||
    content.length > LIMITS.content
  ) {
    return NextResponse.json({ error: "TOO_LONG" }, { status: 400 });
  }

  const telegramOn = isTelegramConfigured();
  const emailOn = isEmailConfigured();

  console.log("[REVIEW] accepted", {
    at: new Date().toISOString(),
    channels: { telegram: telegramOn, email: emailOn },
  });

  if (!telegramOn && !emailOn) {
    console.error("[REVIEW] no outbound channels configured — refusing");
    return NextResponse.json(
      { error: "NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  after(async () => {
    const results = await Promise.allSettled([
      notifyTelegram({ name, role, location, content }),
      sendEmail({
        subject: `Review: ${name}`,
        text: buildEmailText({ name, role, location, content }),
      }),
    ]);
    const channels = ["telegram", "email"] as const;
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`[REVIEW] channel ${channels[i]} threw`, {
          reason: r.reason instanceof Error ? r.reason.message : "unknown",
        });
      } else if (r.value === false) {
        console.warn(`[REVIEW] channel ${channels[i]} reported failure`);
      }
    });
  });

  return NextResponse.json({ ok: true });
}
