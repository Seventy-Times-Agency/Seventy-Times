/**
 * Cookie-consent helpers shared by the banner (CookieConsent) and the
 * tag loader (TagManager). Single source of truth for the storage key,
 * the in-page event name, and reading the current choice.
 *
 * All functions are SSR-safe (no-op without `window`) and wrapped in
 * try/catch so a blocked / unavailable localStorage never breaks a render.
 */

const STORAGE_KEY = "st-cookie-consent-v1";

export type ConsentChoice = "accepted" | "essential";

/** Custom DOM event dispatched whenever the user makes a banner choice. */
export const CONSENT_EVENT = "st-consent-change";

/** In-page event that re-opens the banner ("Cookie settings" in the footer). */
export const OPEN_CONSENT_EVENT = "st-consent-open";

/**
 * Global Privacy Control (navigator.globalPrivacyControl). The privacy
 * policy promises to honour it as an opt-out of targeted advertising, so
 * a GPC browser is never treated as "accepted" for marketing tags.
 */
export function hasGpc(): boolean {
  if (typeof navigator === "undefined") return false;
  return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

const honourGpc = (c: ConsentChoice): ConsentChoice =>
  c === "accepted" && hasGpc() ? "essential" : c;

/** Read the persisted consent decision, or null if none recorded yet. */
export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "accepted" || saved === "essential") return honourGpc(saved);
    return null;
  } catch {
    return null;
  }
}

/** Ask the cookie banner to show again so the visitor can change their choice. */
export function openConsentSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}

/** Broadcast a fresh consent decision to in-page listeners (TagManager). */
export function emitConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(
      new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: honourGpc(choice) }),
    );
  } catch {
    // Never let a missing CustomEvent constructor break the banner.
  }
}

/**
 * Subscribe to consent changes. Returns an unsubscribe function so the
 * caller can clean up in a React effect.
 */
export function onConsent(cb: (c: ConsentChoice) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<ConsentChoice>).detail;
    if (detail === "accepted" || detail === "essential") cb(detail);
  };
  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}
