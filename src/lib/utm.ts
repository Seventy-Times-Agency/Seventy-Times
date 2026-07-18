/**
 * UTM / click-id capture. On the first page load that carries campaign
 * parameters we stash them in localStorage so a lead submitted later in
 * the session (form or chat) can be attributed to its source, even after
 * the visitor has clicked around and the query string is long gone.
 *
 * Mirrors the defensive try/catch style of leadDraft.ts — localStorage
 * can be blocked or full, and we never want attribution plumbing to
 * throw on the user.
 */

export const UTM_KEY = "st-utm-v1";

/** Parameters we care about: standard UTMs + the two big ad-click ids. */
const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

/**
 * Read campaign params from the current URL and persist them. If the URL
 * carries none, we leave any previously captured (non-empty) attribution
 * untouched — first-touch wins, and an internal navigation without params
 * shouldn't wipe the original source.
 */
export function captureUtm(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const captured: Record<string, string> = {};
    for (const key of UTM_PARAMS) {
      const value = params.get(key);
      if (value) captured[key] = value.slice(0, 200);
    }
    if (Object.keys(captured).length === 0) return;
    window.localStorage.setItem(UTM_KEY, JSON.stringify(captured));
  } catch {
    // localStorage blocked / full — ignore.
  }
}

// Server-side caps for a client-supplied attribution blob.
const UTM_MAX_KEYS = 8;
const UTM_MAX_KEY_LENGTH = 50;
const UTM_MAX_VALUE_LENGTH = 200;

/**
 * Sanitise an untrusted `utm` object from a request body: keep only
 * string values, cap key/value lengths and the number of keys. Returns
 * undefined when nothing usable remains, so downstream attribution lines
 * can be skipped entirely. Pure — safe on both server and client.
 */
export function sanitizeUtm(raw: unknown): Record<string, string> | undefined {
  if (typeof raw !== "object" || raw === null) return undefined;
  const out: Record<string, string> = {};
  let count = 0;
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (count >= UTM_MAX_KEYS) break;
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (!trimmed) continue;
    out[key.slice(0, UTM_MAX_KEY_LENGTH)] = trimmed.slice(
      0,
      UTM_MAX_VALUE_LENGTH,
    );
    count++;
  }
  return count > 0 ? out : undefined;
}

/** Read the stored attribution back; empty object when there's none. */
export function readUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(UTM_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) return {};
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string") result[key] = value;
    }
    return result;
  } catch {
    return {};
  }
}
