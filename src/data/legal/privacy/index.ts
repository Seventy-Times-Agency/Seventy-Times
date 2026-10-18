import type { Locale } from "@/i18n/config";
import en from "./en";
import ru from "./ru";
import uk from "./uk";

/** Privacy Policy per locale. English is the binding version. */
export const PRIVACY: Record<Locale, string> = { en, ru, uk };
