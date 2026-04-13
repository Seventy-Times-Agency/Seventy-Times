export type Locale = "ru" | "en";

export const LOCALES: Locale[] = ["ru", "en"];

export const LOCALE_LABELS: Record<Locale, string> = {
  ru: "RU",
  en: "EN",
};

export const DEFAULT_LOCALE: Locale = "ru";
