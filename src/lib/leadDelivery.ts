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
import {
  BUDGET_LABELS,
  PACKAGE_LABELS,
  type LeadBudget,
  type LeadPackage,
} from "@/lib/leadDraft";

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
  /** Campaign attribution captured at first touch (utm_*, gclid, fbclid). */
  utm?: Record<string, string>;
};

export type DeliverOptions = {
  duplicate: boolean;
  kind: LeadKind;
  locale: string;
  source: LeadSource;
};

/** Russian-labelled, human-readable package/budget for Telegram + email. */
const PACKAGE_LABEL_RU = (p: LeadPackage): string => PACKAGE_LABELS[p].ru;
const BUDGET_LABEL_RU = (b: LeadBudget): string => BUDGET_LABELS[b].ru;

/**
 * Flatten captured attribution into a single readable line, e.g.
 * "utm_source=google, utm_campaign=spring, gclid=abc". Empty string when
 * there's nothing to show, so callers can skip the line entirely.
 */
function formatUtm(utm: Record<string, string> | undefined): string {
  if (!utm) return "";
  const parts = Object.entries(utm)
    .filter(([, v]) => typeof v === "string" && v.length > 0)
    .map(([k, v]) => `${k}=${v}`);
  return parts.join(", ");
}

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
    ? `📦 *Пакет:* ${escapeMarkdown(PACKAGE_LABEL_RU(lead.package))}`
    : null;
  const budgetLine = lead.budget
    ? `💰 *Бюджет:* ${escapeMarkdown(BUDGET_LABEL_RU(lead.budget))}`
    : null;
  const phoneLine = lead.phone
    ? `📱 *Телефон:* ${escapeMarkdown(lead.phone)}`
    : null;
  const utmText = formatUtm(lead.utm);
  const utmLine = utmText
    ? `🎯 *Источник:* ${escapeMarkdown(utmText)}`
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
    ...(utmLine ? [utmLine] : []),
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
    lead.package ? `Package: ${PACKAGE_LABEL_RU(lead.package)}` : null,
    lead.budget ? `Budget: ${BUDGET_LABEL_RU(lead.budget)}` : null,
    formatUtm(lead.utm) ? `Source: ${formatUtm(lead.utm)}` : null,
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
          utm: lead.utm,
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
