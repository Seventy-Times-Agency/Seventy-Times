import type { Locale } from "@/i18n/config";
import en from "./en";
import ru from "./ru";
import uk from "./uk";

/** Terms of Use per locale. English is the binding version. */
export const TERMS: Record<Locale, string> = { en, ru, uk };
