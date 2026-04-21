/**
 * Notion integration — direct REST calls (no SDK) so the bundle stays
 * small and we don't depend on a client library's lifecycle.
 *
 * All functions here are fire-and-forget: they never throw, and they
 * log (without PII) if something goes wrong. The public API route
 * stays fast and the user still gets a successful response even if
 * Notion is down — Telegram remains the primary notification channel.
 */

const NOTION_VERSION = "2022-06-28";
const NOTION_ENDPOINT = "https://api.notion.com/v1/pages";

type Locale = "en" | "ru" | "de";

type LeadRecord = {
  name: string;
  contact: string;
  business: string;
  request: string;
  locale?: Locale | string;
};

type ReviewRecord = {
  name: string;
  role: string;
  location: string;
  content: string;
  code: string;
};

function richText(content: string) {
  // Notion has a 2000-char limit per rich_text chunk. Anything we
  // accept from the forms is already below that cap, but we slice
  // defensively in case a limit changes upstream.
  return [
    {
      type: "text",
      text: { content: content.slice(0, 2000) },
    },
  ];
}

function title(content: string) {
  return [
    {
      type: "text",
      text: { content: content.slice(0, 2000) },
    },
  ];
}

async function createPage(
  token: string,
  databaseId: string,
  properties: Record<string, unknown>,
  label: string
): Promise<void> {
  try {
    const res = await fetch(NOTION_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_VERSION,
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties,
      }),
    });

    if (!res.ok) {
      console.error(`[${label}] Notion create failed`, {
        status: res.status,
      });
    }
  } catch (err) {
    console.error(`[${label}] Notion request error`, {
      message: err instanceof Error ? err.message : "unknown",
    });
  }
}

export async function sendLeadToNotion(
  lead: LeadRecord
): Promise<void> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_LEADS_ID;
  if (!token || !databaseId) return;

  const locale = (lead.locale ?? "en").toString();
  const localeOption = ["en", "ru", "de"].includes(locale) ? locale : "en";

  await createPage(
    token,
    databaseId,
    {
      Name: { title: title(lead.name) },
      Contact: { rich_text: richText(lead.contact) },
      Business: { rich_text: richText(lead.business) },
      Request: { rich_text: richText(lead.request) },
      Status: { select: { name: "New" } },
      Source: { select: { name: "Website" } },
      Locale: { select: { name: localeOption } },
      Submitted: { date: { start: new Date().toISOString() } },
    },
    "LEAD"
  );
}

export async function sendReviewToNotion(
  review: ReviewRecord
): Promise<void> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_REVIEWS_ID;
  if (!token || !databaseId) return;

  await createPage(
    token,
    databaseId,
    {
      Name: { title: title(review.name) },
      Role: { rich_text: richText(review.role) },
      Location: { rich_text: richText(review.location) },
      Content: { rich_text: richText(review.content) },
      Code: { rich_text: richText(review.code) },
      Status: { select: { name: "Pending" } },
      Submitted: { date: { start: new Date().toISOString() } },
    },
    "REVIEW"
  );
}
