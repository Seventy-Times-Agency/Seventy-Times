/**
 * Resend email helper — fire-and-forget. Used as a fallback channel
 * for /api/lead and /api/review when Telegram and Notion are both
 * unavailable, so a submission never silently disappears.
 *
 * Set RESEND_API_KEY and LEAD_NOTIFY_EMAIL to enable. Without them,
 * every call resolves to `false` and the caller can decide whether
 * the submission was forwarded by some other channel.
 */

import { fetchWithTimeout } from "@/lib/fetchWithTimeout";

type SendArgs = {
  subject: string;
  text: string;
  replyTo?: string;
};

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL,
  );
}

export async function sendEmail({
  subject,
  text,
  replyTo,
}: SendArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return false;

  const from =
    process.env.RESEND_FROM ||
    "Seventy Times <onboarding@resend.dev>";

  try {
    const res = await fetchWithTimeout("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        reply_to: replyTo,
      }),
      // Match the 7s ceiling telegram/notion use, rather than the
      // fetchWithTimeout default of 5s — email is the fallback channel
      // and a slightly longer wait is worth not dropping a lead.
      timeoutMs: 7000,
    });

    if (!res.ok) {
      console.error("[EMAIL] Resend failed", { status: res.status });
      return false;
    }
    return true;
  } catch (err) {
    console.error("[EMAIL] Resend request error", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return false;
  }
}
