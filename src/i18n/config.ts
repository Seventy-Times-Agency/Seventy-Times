export type Locale = "ru" | "en" | "de" | "ua";

export const LOCALES: Locale[] = ["en", "ru", "de", "ua"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  de: "DE",
  ua: "UA",
};

export const DEFAULT_LOCALE: Locale = "en";

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
