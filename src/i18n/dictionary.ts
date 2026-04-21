import type { Locale } from "./config";
import ru from "./locales/ru";
import en from "./locales/en";
import de from "./locales/de";

/**
 * Full UI dictionary. Each locale file lives in `./locales/<code>.ts`
 * and default-exports the flat object of strings for that language.
 *
 * The `Dictionary` type is inferred from the Russian file — all three
 * locales must keep the same shape, otherwise TypeScript will surface
 * the mismatch at build time.
 */
const dict = { ru, en, de } as const;

export type Dictionary = typeof ru;

export function getDictionary(locale: Locale): Dictionary {
  return dict[locale] as Dictionary;
}
