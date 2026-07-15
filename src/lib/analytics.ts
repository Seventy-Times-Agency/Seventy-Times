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
// real enquiries instead of raw page views. Firing is a no-op until the
// pixel is actually loaded (`window.fbq` exists), which only happens after
// the visitor accepts cookies — so this stays consent-safe.
const LEAD_EVENTS = new Set([
  "lead_submit",
  "callback_submit",
  "chat_lead_captured",
]);

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
