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
const NOTION_QUERY_ENDPOINT = (databaseId: string) =>
  `https://api.notion.com/v1/databases/${databaseId}/query`;

type Locale = "en" | "ru" | "de" | "uk";

type LeadPackage =
  | "not_sure"
  | "standalone"
  | "launch"
  | "growth"
  | "scale";

const PACKAGE_NOTION_LABEL: Record<LeadPackage, string> = {
  not_sure: "Not sure",
  standalone: "Standalone",
  launch: "Launch",
  growth: "Growth",
  scale: "Scale",
};

type LeadRecord = {
  name: string;
  contact: string;
  business: string;
  request: string;
  locale?: Locale | string;
  package?: LeadPackage;
  phone?: string;
};

type ReviewRecord = {
  name: string;
  role: string;
  location: string;
  content: string;
  code: string;
};

type ChatRecord = {
  sessionId: string;
  turnIndex: number;
  user: string;
  tess: string;
  locale: Locale | string;
};

export type ApprovedReview = {
  id: string;
  name: string;
  role: string;
  location: string;
  content: string;
  submittedAt: string | null;
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
  label: string,
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

export function isNotionLeadsConfigured(): boolean {
  return Boolean(
    process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_LEADS_ID,
  );
}

export function isNotionReviewsConfigured(): boolean {
  return Boolean(
    process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_REVIEWS_ID,
  );
}

export function isNotionChatsConfigured(): boolean {
  return Boolean(
    process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_CHATS_ID,
  );
}

export async function sendLeadToNotion(
  lead: LeadRecord,
): Promise<boolean> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_LEADS_ID;
  if (!token || !databaseId) return false;

  const locale = (lead.locale ?? "en").toString();
  const localeOption = ["en", "ru", "de", "uk"].includes(locale) ? locale : "en";

  const properties: Record<string, unknown> = {
    Name: { title: title(lead.name) },
    Contact: { rich_text: richText(lead.contact) },
    Business: { rich_text: richText(lead.business) },
    Request: { rich_text: richText(lead.request) },
    Status: { select: { name: "New" } },
    Source: { select: { name: "Website" } },
    Locale: { select: { name: localeOption } },
    Submitted: { date: { start: new Date().toISOString() } },
  };

  if (lead.package) {
    properties.Package = {
      select: { name: PACKAGE_NOTION_LABEL[lead.package] },
    };
  }
  if (lead.phone) {
    properties.Phone = { phone_number: lead.phone };
  }

  await createPage(token, databaseId, properties, "LEAD");
  return true;
}

export async function sendReviewToNotion(
  review: ReviewRecord,
): Promise<boolean> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_REVIEWS_ID;
  if (!token || !databaseId) return false;

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
    "REVIEW",
  );
  return true;
}

export async function logChatTurn(turn: ChatRecord): Promise<void> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_CHATS_ID;
  if (!token || !databaseId) return;

  const locale = (turn.locale ?? "en").toString();
  const localeOption = ["en", "ru", "de", "uk"].includes(locale) ? locale : "en";

  await createPage(
    token,
    databaseId,
    {
      Session: { title: title(turn.sessionId) },
      User: { rich_text: richText(turn.user) },
      Tess: { rich_text: richText(turn.tess) },
      Turn: { number: turn.turnIndex },
      Locale: { select: { name: localeOption } },
      Submitted: { date: { start: new Date().toISOString() } },
    },
    "CHAT",
  );
}

/**
 * Pull approved reviews from the Notion Reviews database, newest first.
 * Returns an empty array when Notion is not configured or the request
 * fails — the caller can render its fallback (principles).
 */
export async function fetchApprovedReviews(
  pageSize = 12,
): Promise<ApprovedReview[]> {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_REVIEWS_ID;
  if (!token || !databaseId) return [];

  try {
    const res = await fetch(NOTION_QUERY_ENDPOINT(databaseId), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_VERSION,
      },
      body: JSON.stringify({
        filter: {
          property: "Status",
          select: { equals: "Approved" },
        },
        sorts: [{ property: "Submitted", direction: "descending" }],
        page_size: pageSize,
      }),
      // Cache for 5 minutes — the section is part of an ISR'd page so
      // this revalidates on the page tick anyway. Keeps repeat hits
      // from the same render cheap.
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error("[REVIEWS] Notion query failed", { status: res.status });
      return [];
    }

    const data = (await res.json()) as { results?: NotionPage[] };
    if (!Array.isArray(data.results)) return [];

    return data.results
      .map(parseReview)
      .filter((r): r is ApprovedReview => r !== null);
  } catch (err) {
    console.error("[REVIEWS] Notion request error", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return [];
  }
}

type NotionPage = {
  id: string;
  properties?: Record<string, unknown>;
};

function readPlain(prop: unknown): string {
  if (!prop || typeof prop !== "object") return "";
  const p = prop as Record<string, unknown>;
  const arr =
    (Array.isArray(p.rich_text) && p.rich_text) ||
    (Array.isArray(p.title) && p.title) ||
    [];
  return (arr as Array<{ plain_text?: string }>)
    .map((b) => b.plain_text ?? "")
    .join("")
    .trim();
}

function readDate(prop: unknown): string | null {
  if (!prop || typeof prop !== "object") return null;
  const p = prop as Record<string, unknown>;
  const date = p.date as { start?: string } | null | undefined;
  return date?.start ?? null;
}

function parseReview(page: NotionPage): ApprovedReview | null {
  const props = page.properties ?? {};
  const name = readPlain(props["Name"]);
  const content = readPlain(props["Content"]);
  if (!name || !content) return null;

  return {
    id: page.id,
    name,
    role: readPlain(props["Role"]),
    location: readPlain(props["Location"]),
    content,
    submittedAt: readDate(props["Submitted"]),
  };
}
