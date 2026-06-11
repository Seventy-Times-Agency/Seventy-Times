import { NextResponse, after } from "next/server";
import {
  checkOrigin,
  enforceBodyLimit,
  forbiddenOriginResponse,
  getClientIp,
  isFirstSeen,
  isHoneypotTripped,
  normalizeContactKey,
  rateLimit,
  rateLimitResponse,
  silentSuccessResponse,
} from "@/lib/apiGuard";
import {
  escapeMarkdown,
  isTelegramConfigured,
  sendTelegramMessage,
} from "@/lib/telegram";
import { isNotionLeadsConfigured, sendLeadToNotion } from "@/lib/notion";
import { isEmailConfigured, sendEmail } from "@/lib/email";
import {
  isLeadBudget,
  isLeadPackage,
  type LeadBudget,
  type LeadPackage,
} from "@/lib/leadDraft";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadKind = "lead" | "callback";

type LeadPayload = {
  name: string;
  contact: string;
  business: string;
  request: string;
  package?: LeadPackage;
  budget?: LeadBudget;
  phone?: string;
  kind?: LeadKind;
};

const PACKAGE_LABEL: Record<LeadPackage, string> = {
  not_sure: "Пока не уверен",
  standalone: "Одна услуга (standalone)",
  launch: "LAUNCH",
  growth: "GROWTH ⭐",
  scale: "SCALE",
};

const BUDGET_LABEL: Record<LeadBudget, string> = {
  not_sure: "Не уверен",
  under_1k: "до $1 000 / мес",
  "1k_3k": "$1 000–3 000 / мес",
  "3k_10k": "$3 000–10 000 / мес",
  "10k_plus": "$10 000+ / мес",
};

const LIMITS = {
  name: 100,
  contact: 200,
  business: 500,
  request: 2000,
  phone: 40,
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

type TelegramArgs = {
  lead: LeadPayload;
  duplicate: boolean;
  kind: LeadKind;
};

async function notifyTelegram({ lead, duplicate, kind }: TelegramArgs) {
  if (!isTelegramConfigured()) return false;

  const headerBase =
    kind === "callback"
      ? "📞 *Заявка на звонок*"
      : "📩 *Новая заявка с сайта Seventy Times*";
  const header = duplicate
    ? `${headerBase}\n_⚠️ Возможный дубликат — этот контакт уже писал в последний час_`
    : headerBase;

  const packageLine = lead.package
    ? `📦 *Пакет:* ${escapeMarkdown(PACKAGE_LABEL[lead.package])}`
    : null;
  const budgetLine = lead.budget
    ? `💰 *Бюджет:* ${escapeMarkdown(BUDGET_LABEL[lead.budget])}`
    : null;
  const phoneLine = lead.phone
    ? `📱 *Телефон:* ${escapeMarkdown(lead.phone)}`
    : null;

  const text = [
    header,
    "",
    `👤 *Имя:* ${escapeMarkdown(lead.name)}`,
    `📞 *Контакт:* ${escapeMarkdown(lead.contact)}`,
    ...(phoneLine ? [phoneLine] : []),
    `🏢 *Бизнес:* ${escapeMarkdown(lead.business)}`,
    ...(packageLine ? [packageLine] : []),
    ...(budgetLine ? [budgetLine] : []),
    "",
    `💬 *Запрос:*`,
    escapeMarkdown(lead.request),
  ].join("\n");

  return sendTelegramMessage(text);
}

function buildEmailText(lead: LeadPayload, duplicate: boolean) {
  const lines = [
    duplicate ? "[POSSIBLE DUPLICATE]" : null,
    `Name: ${lead.name}`,
    `Contact: ${lead.contact}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    `Business: ${lead.business}`,
    lead.package ? `Package: ${PACKAGE_LABEL[lead.package]}` : null,
    lead.budget ? `Budget: ${BUDGET_LABEL[lead.budget]}` : null,
    "",
    "Request:",
    lead.request,
  ];
  return lines.filter(Boolean).join("\n");
}

export async function POST(req: Request) {
  if (!checkOrigin(req)) return forbiddenOriginResponse();

  const tooBig = enforceBodyLimit(req, 16 * 1024);
  if (tooBig) return tooBig;

  const ip = getClientIp(req);
  const rl = rateLimit(`lead:${ip}`, 5, 60 * 60_000);
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
    console.warn("[LEAD] honeypot tripped", {
      at: new Date().toISOString(),
      ip,
    });
    return silentSuccessResponse();
  }

  const name = body.name.trim();
  const contact = body.contact.trim();
  const business = body.business.trim();
  const request = body.request.trim();
  const rawPackage = (body as Record<string, unknown>).package;
  const leadPackage = isLeadPackage(rawPackage) ? rawPackage : undefined;
  const rawBudget = (body as Record<string, unknown>).budget;
  const leadBudget = isLeadBudget(rawBudget) ? rawBudget : undefined;
  const rawPhone = (body as Record<string, unknown>).phone;
  const phone =
    typeof rawPhone === "string" && rawPhone.trim()
      ? rawPhone.trim()
      : undefined;
  const rawKind = (body as Record<string, unknown>).kind;
  const kind: LeadKind = rawKind === "callback" ? "callback" : "lead";

  if (!name || !contact || !business || !request) {
    return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
  }

  if (
    name.length > LIMITS.name ||
    contact.length > LIMITS.contact ||
    business.length > LIMITS.business ||
    request.length > LIMITS.request ||
    (phone !== undefined && phone.length > LIMITS.phone)
  ) {
    return NextResponse.json({ error: "TOO_LONG" }, { status: 400 });
  }

  // Detect repeat submissions from the same contact within the last
  // hour. We don't block (one duplicate is cheaper than losing a real
  // lead), but we tag downstream notifications so the team can spot it.
  const dedupKey = `lead-dedup:${normalizeContactKey(contact)}`;
  const isDuplicate = !isFirstSeen(dedupKey, 60 * 60_000);

  const telegramOn = isTelegramConfigured();
  const notionOn = isNotionLeadsConfigured();
  const emailOn = isEmailConfigured();

  console.log("[LEAD] received", {
    at: new Date().toISOString(),
    kind,
    duplicate: isDuplicate,
    channels: { telegram: telegramOn, notion: notionOn, email: emailOn },
  });

  // If nothing is configured, a 200 would silently swallow the lead.
  // Tell the user clearly so the form can show a fallback ("write to
  // us on Telegram / WhatsApp directly") instead of a fake success.
  if (!telegramOn && !notionOn && !emailOn) {
    console.error("[LEAD] no outbound channels configured — refusing");
    return NextResponse.json(
      { error: "NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  // Read the user's selected locale from the cookie set by I18nProvider.
  // "ua" is the legacy Ukrainian cookie value (pre-/uk slug) — cookies
  // live for a year, so keep accepting it as an alias.
  const localeMatch = req.headers
    .get("cookie")
    ?.match(/(?:^|;\s*)lang=(en|ru|de|uk|ua)/);
  const locale = localeMatch?.[1] === "ua" ? "uk" : (localeMatch?.[1] ?? "en");

  const lead: LeadPayload = {
    name,
    contact,
    business,
    request,
    package: leadPackage,
    budget: leadBudget,
    phone,
    kind,
  };

  // Fan out to side channels after the response is sent. Without this,
  // a slow Telegram/Notion/Email upstream made the user wait for the
  // slowest one — even though `fetchWithTimeout` caps each at 5s, that
  // is still up to 5s of perceived form latency per channel.
  after(async () => {
    const results = await Promise.allSettled([
      notifyTelegram({ lead, duplicate: isDuplicate, kind }),
      isDuplicate
        ? Promise.resolve(false)
        : sendLeadToNotion({
            name,
            contact,
            business,
            request,
            locale,
            package: leadPackage,
            budget: leadBudget,
            phone,
          }),
      sendEmail({
        subject: isDuplicate
          ? `[duplicate] ${kind === "callback" ? "Callback" : "Lead"}: ${name}`
          : `${kind === "callback" ? "Callback" : "Lead"}: ${name}`,
        text: buildEmailText(lead, isDuplicate),
        replyTo: contact.includes("@") ? contact : undefined,
      }),
    ]);
    const channels = ["telegram", "notion", "email"] as const;
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`[LEAD] channel ${channels[i]} threw`, {
          reason: r.reason instanceof Error ? r.reason.message : "unknown",
        });
      } else if (r.value === false) {
        console.warn(`[LEAD] channel ${channels[i]} reported failure`);
      }
    });
    // Every channel failing means the lead is lost despite the 200 the
    // user already saw — make that loud and searchable in the logs.
    if (results.every((r) => r.status !== "fulfilled" || r.value === false)) {
      console.error("[LEAD] ALL channels failed — lead not delivered", {
        at: new Date().toISOString(),
        kind,
      });
    }
  });

  return NextResponse.json({ ok: true });
}
