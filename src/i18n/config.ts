export type Locale = "ru" | "en" | "de" | "ua";

export const LOCALES: Locale[] = ["en", "ru", "de", "ua"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  de: "DE",
  ua: "UA",
};

export const DEFAULT_LOCALE: Locale = "en";

/**
 * ISO 639-1 language code for each locale, used for `<html lang>`,
 * hreflang alternates and JSON-LD `inLanguage`. The Ukrainian URL slug
 * is "ua" for brand/marketing reasons, but the language code search
 * engines and screen readers expect is "uk" — "ua" is a country code
 * and is ignored as an hreflang value.
 */
export const LOCALE_LANG: Record<Locale, string> = {
  en: "en",
  ru: "ru",
  de: "de",
  ua: "uk",
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
