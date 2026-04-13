export type Locale = "ru" | "en" | "de";

export const LOCALES: Locale[] = ["en", "ru", "de"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  de: "DE",
};

export const DEFAULT_LOCALE: Locale = "en";
