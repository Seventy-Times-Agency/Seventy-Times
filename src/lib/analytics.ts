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

export function track(
  event: string,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  try {
    const layer = (window.dataLayer ??= []);
    layer.push({ event, ...props });
  } catch {
    // Never let analytics break the page.
  }
}
