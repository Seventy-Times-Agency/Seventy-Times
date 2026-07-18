/**
 * Lightweight, privacy-friendly event tracking. Pushes events onto
 * `window.dataLayer` — the GTM / GA4 convention — so a tag manager (or
 * any listener) can pick them up without us bundling a vendor SDK.
 *
 * Deliberately harmless without consent: it only writes to an in-page
 * array, never makes a network request. Anything that *does* hit the
 * network (a real analytics tag) is wired separately and gated on the
 * cookie banner.
 *
 * SSR-safe: a no-op when there's no `window` (server render / build).
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// Events that mean "a lead was captured". These are forwarded to the Meta
// Pixel as the standard `Lead` conversion so ad campaigns can optimize for
// real enquiries instead of raw page views. Consent-wise: the pixel loads
// in a `consent revoke` state (see TagManager), so a Lead fired before
// acceptance is only QUEUED in-page and transmits solely if the visitor
// later grants consent — nothing leaves the browser before that.
const LEAD_EVENTS = new Set([
  "lead_submit",
  "callback_submit",
  "chat_lead_captured",
]);

/**
 * Generate an id shared between a browser Pixel event and its server-side
 * CAPI twin (Meta dedupes on it). `crypto.randomUUID` is only available in
 * secure contexts + newer browsers, and throwing here would strand a form
 * mid-submit — so fall back to a random hex id rather than ever throwing.
 */
export function newEventId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
  } catch {
    // fall through to the manual id
  }
  return `ev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export function track(
  event: string,
  props?: Record<string, string | number | boolean>,
  // Shared with the server-side CAPI event so Meta dedupes the two. Pass
  // the same id that goes to /api/lead (forms) or arrives on the chat's
  // `lead_captured` action.
  eventId?: string,
): void {
  if (typeof window === "undefined") return;
  try {
    const layer = (window.dataLayer ??= []);
    layer.push({ event, ...props });

    // Forward lead conversions to the Meta Pixel when it's present. Typed
    // via a local cast — `fbq` is declared globally in TagManager.tsx, and
    // re-declaring it here would clash on interface merge.
    if (LEAD_EVENTS.has(event)) {
      const w = window as unknown as {
        fbq?: (...args: unknown[]) => void;
      };
      if (typeof w.fbq === "function") {
        if (eventId) w.fbq("track", "Lead", {}, { eventID: eventId });
        else w.fbq("track", "Lead");
      }
    }
  } catch {
    // Never let analytics break the page.
  }
}
