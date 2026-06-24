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

/** Read the persisted consent decision, or null if none recorded yet. */
export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "accepted" || saved === "essential") return saved;
    return null;
  } catch {
    return null;
  }
}

/** Broadcast a fresh consent decision to in-page listeners (TagManager). */
export function emitConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(
      new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: choice }),
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
