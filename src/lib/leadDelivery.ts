/**
 * Shared lead fan-out. One lead can arrive from two places:
 *   - the website forms (`/api/lead`), or
 *   - Vanessa capturing a contact mid-conversation (`/api/chat` tool use).
 *
 * Both funnel through `deliverLead`, so the team gets identical Telegram /
 * Notion / email notifications no matter where the lead came from — the
 * only difference is the `source` tag, which lets you see at a glance that
 * Vanessa closed it.
 *
 * Every channel is best-effort: `deliverLead` never throws and returns
 * whether *at least one* channel accepted the lead, so the chat tool can
 * tell Vanessa to either confirm the hand-off or fall back to the direct
 * contacts.
 */

import {
  escapeMarkdown,
  isTelegramConfigured,
  sendTelegramMessage,
} from "@/lib/telegram";
import { isNotionLeadsConfigured, sendLeadToNotion } from "@/lib/notion";
import { isEmailConfigured, sendEmail } from "@/lib/email";
import type { LeadBudget, LeadPackage } from "@/lib/leadDraft";

export type LeadKind = "lead" | "callback";
export type LeadSource = "website" | "chat";

export type DeliverableLead = {
  name: string;
  contact: string;
  business: string;
  request: string;
  package?: LeadPackage;
  budget?: LeadBudget;
  phone?: string;
};

export type DeliverOptions = {
  duplicate: boolean;
  kind: LeadKind;
  locale: string;
  source: LeadSource;
};

export const PACKAGE_LABEL: Record<LeadPackage, string> = {
  not_sure: "Пока не уверен",
  standalone: "Одна услуга (standalone)",
  launch: "LAUNCH",
  growth: "GROWTH ⭐",
  scale: "SCALE",
};

export const BUDGET_LABEL: Record<LeadBudget, string> = {
  not_sure: "Не уверен",
  under_1k: "до $1 000 / мес",
  "1k_3k": "$1 000–3 000 / мес",
  "3k_10k": "$3 000–10 000 / мес",
  "10k_plus": "$10 000+ / мес",
};

/** Are any outbound channels configured at all? */
export function isAnyLeadChannelConfigured(): boolean {
  return (
    isTelegramConfigured() || isNotionLeadsConfigured() || isEmailConfigured()
  );
}

function telegramHeader(source: LeadSource, kind: LeadKind): string {
  if (source === "chat") return "🤖 *Лид из чата с Венессой*";
  return kind === "callback"
    ? "📞 *Заявка на звонок*"
    : "📩 *Новая заявка с сайта Seventy Times*";
}

async function notifyTelegram(
  lead: DeliverableLead,
  { duplicate, kind, source }: DeliverOptions,
): Promise<boolean> {
  if (!isTelegramConfigured()) return false;

  const headerBase = telegramHeader(source, kind);
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

function buildEmailText(lead: DeliverableLead, duplicate: boolean): string {
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

/**
 * Fan a lead out to Telegram + Notion + email in parallel. Telegram and
 * email always fire (with a duplicate tag); Notion is skipped on a
 * duplicate so the CRM doesn't accumulate near-identical rows. Returns
 * true if any channel reported success.
 */
export async function deliverLead(
  lead: DeliverableLead,
  opts: DeliverOptions,
): Promise<boolean> {
  const { duplicate, kind, locale, source } = opts;
  const sourceLabel = source === "chat" ? "Vanessa chat" : "Website";
  const subjectKind = kind === "callback" ? "Callback" : "Lead";
  const subjectSource = source === "chat" ? " (Vanessa)" : "";

  const results = await Promise.allSettled([
    notifyTelegram(lead, opts),
    duplicate
      ? Promise.resolve(false)
      : sendLeadToNotion({
          name: lead.name,
          contact: lead.contact,
          business: lead.business,
          request: lead.request,
          locale,
          package: lead.package,
          budget: lead.budget,
          phone: lead.phone,
          source: sourceLabel,
        }),
    sendEmail({
      subject: `${duplicate ? "[duplicate] " : ""}${subjectKind}${subjectSource}: ${lead.name}`,
      text: buildEmailText(lead, duplicate),
      // Only set Reply-To for a real email address — an @handle also
      // "includes('@')" but is not a valid header value (and a raw
      // contact string must not be injected into a header unchecked).
      replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.contact)
        ? lead.contact
        : undefined,
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

  const delivered = results.some(
    (r) => r.status === "fulfilled" && r.value === true,
  );

  if (!delivered) {
    console.error("[LEAD] ALL channels failed — lead not delivered", {
      at: new Date().toISOString(),
      kind,
      source,
    });
  }

  return delivered;
}
