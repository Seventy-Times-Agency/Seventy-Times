export type Locale = "ru" | "en" | "de" | "uk";

export const LOCALES: Locale[] = ["en", "ru", "de", "uk"];

// Visible labels in the language switcher. Ukrainian is displayed as
// "UA" — that's how Ukrainians expect to see it (and "UK" would read
// as United Kingdom) — even though the URL slug and language code are
// `uk` (ISO 639-1).
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  de: "DE",
  uk: "UA",
};

export const DEFAULT_LOCALE: Locale = "en";

/**
 * ISO 639-1 language code for each locale, used for `<html lang>`,
 * hreflang alternates and JSON-LD `inLanguage`. Slugs and codes are
 * identical today (the historical `/ua` slug 301-redirects to `/uk`
 * in middleware), but every consumer goes through this map so a
 * future slug/code divergence stays a one-line change.
 */
export const LOCALE_LANG: Record<Locale, string> = {
  en: "en",
  ru: "ru",
  de: "de",
  uk: "uk",
};

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" &&
    (LOCALES as readonly string[]).includes(value)
  );
}

/**
 * Build a URL path scoped to the given locale.
 *   localizedPath("ru", "/about")  → "/ru/about"
 *   localizedPath("en", "/")       → "/en"
 *   localizedPath("de", "")        → "/de"
 */
export function localizedPath(locale: Locale, path: string): string {
  const trimmed = path.replace(/^\/+/, "");
  return trimmed ? `/${locale}/${trimmed}` : `/${locale}`;
}
