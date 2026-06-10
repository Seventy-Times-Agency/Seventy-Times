import type { Locale } from "./config";
import ru from "./locales/ru";
import en from "./locales/en";
import de from "./locales/de";
import ua from "./locales/ua";

/**
 * Full UI dictionary. Each locale file lives in `./locales/<code>.ts`
 * and default-exports the flat object of strings for that language.
 *
 * The `Dictionary` type is inferred from the Russian file — all four
 * locales must keep the same shape, otherwise TypeScript will surface
 * the mismatch at build time.
 */
export type Dictionary = typeof ru;

// Typed without casts on purpose: if a locale file misses a key (or
// renames one), this declaration is where TypeScript reports it.
const dict: Record<Locale, Dictionary> = { ru, en, de, ua };

export function getDictionary(locale: Locale): Dictionary {
  return dict[locale];
}
