/**
 * Meta Conversions API (server-side). Sends a `Lead` event straight from
 * our server to Meta, complementing the browser Pixel:
 *   - Server events aren't lost to ad-blockers / iOS / early tab-closes.
 *   - We already hold the lead's real email/phone, so we hash and send them
 *     for high match quality (the "+match rate" the CAPI gateway upsells —
 *     here without any third party).
 *   - Deduplicated against the browser Pixel via a shared `event_id`.
 *
 * Dormant until `META_CAPI_ACCESS_TOKEN` is set (the dataset id defaults to
 * the public pixel id). Like the other side channels it never throws and
 * reports success/failure through its return value.
 */

import { createHash } from "node:crypto";
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";

// Meta Graph API version. Bump when Meta deprecates it.
const GRAPH_VERSION = "v21.0";

/** The dataset (a.k.a. pixel) events are attributed to. */
function datasetId(): string | undefined {
  return process.env.META_DATASET_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
}

export function isMetaCapiConfigured(): boolean {
  return Boolean(process.env.META_CAPI_ACCESS_TOKEN && datasetId());
}

const sha256 = (v: string): string =>
  createHash("sha256").update(v).digest("hex");

/** SHA-256 of a normalised email — only if the value actually is one. */
function hashEmail(raw: string): string | undefined {
  const e = raw.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? sha256(e) : undefined;
}

/**
 * SHA-256 of a phone's digits. Only accepts phone-shaped input (digits
 * plus +()-. and spaces) with 7+ digits — otherwise an email or @handle
 * that merely CONTAINS digits ("shop2024_8912345") would produce a hash
 * of a non-existent phone and drag down Meta's match quality.
 */
function hashPhone(raw: string): string | undefined {
  const v = raw.trim();
  if (!/^[+()\d][\d\s().-]{5,}$/.test(v)) return undefined;
  const digits = v.replace(/\D/g, "");
  return digits.length >= 7 ? sha256(digits) : undefined;
}

/** Extract Meta's `_fbp` / `_fbc` cookies from a Cookie header (better
 *  match quality when present). */
export function parseFbCookies(cookieHeader: string | null): {
  fbp?: string;
  fbc?: string;
} {
  if (!cookieHeader) return {};
  const grab = (name: string): string | undefined => {
    const m = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
    return m ? decodeURIComponent(m[1]) : undefined;
  };
  return { fbp: grab("_fbp"), fbc: grab("_fbc") };
}

export type MetaLeadEvent = {
  /** Shared with the browser Pixel's Lead event so Meta can dedupe. */
  eventId: string;
  /** Raw contact strings — hashed here, only if usable as email/phone. */
  email?: string;
  phone?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  sourceUrl?: string;
  /** Unix seconds; defaults to now. */
  eventTime?: number;
};

/**
 * Fire a server-side `Lead` conversion. Returns whether Meta accepted it.
 * A no-op (false) when CAPI isn't configured or there's no identifier to
 * match on.
 */
export async function sendMetaLeadEvent(ev: MetaLeadEvent): Promise<boolean> {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  const id = datasetId();
  if (!token || !id) return false;

  const userData: Record<string, unknown> = {};
  const em = ev.email ? hashEmail(ev.email) : undefined;
  if (em) userData.em = [em];
  const ph = ev.phone ? hashPhone(ev.phone) : undefined;
  if (ph) userData.ph = [ph];
  if (ev.clientIp) userData.client_ip_address = ev.clientIp;
  if (ev.userAgent) userData.client_user_agent = ev.userAgent;
  if (ev.fbp) userData.fbp = ev.fbp;
  if (ev.fbc) userData.fbc = ev.fbc;

  // Meta needs at least one identifier to attribute the event — skip one we
  // can't match (it would just be rejected and waste a round-trip).
  if (Object.keys(userData).length === 0) return false;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: ev.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: ev.eventId,
        action_source: "website",
        ...(ev.sourceUrl ? { event_source_url: ev.sourceUrl } : {}),
        user_data: userData,
      },
    ],
    access_token: token,
  };

  try {
    const res = await fetchWithTimeout(
      `https://graph.facebook.com/${GRAPH_VERSION}/${id}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        timeoutMs: 5000,
      },
    );
    if (!res.ok) {
      console.error("[CAPI] Meta rejected the event", { status: res.status });
      return false;
    }
    return true;
  } catch (err) {
    console.error("[CAPI] request error", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return false;
  }
}
