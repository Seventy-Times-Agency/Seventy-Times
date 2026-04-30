"use client";

import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALES,
  localizedPath,
  type Locale,
} from "./config";
import { getDictionary, type Dictionary } from "./dictionary";

type I18nContextValue = {
  locale: Locale;
  t: Dictionary;
  setLocale: (l: Locale) => void;
  /** Build a URL inside the current locale (e.g. localePath("/about")). */
  localePath: (path: string) => string;
};

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  t: getDictionary(DEFAULT_LOCALE),
  setLocale: () => {},
  localePath: (path) => path,
});

function writeCookie(locale: Locale) {
  document.cookie = `lang=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

const LOCALE_PATTERN = new RegExp(`^/(${LOCALES.join("|")})(?=/|$)`);

export function I18nProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = useCallback(
    (next: Locale) => {
      writeCookie(next);
      // Swap the locale prefix in the current path, keeping the rest.
      const stripped = (pathname ?? "/").replace(LOCALE_PATTERN, "") || "/";
      const target =
        stripped === "/" ? `/${next}` : `/${next}${stripped}`;
      router.push(target);
    },
    [pathname, router],
  );

  const localePath = useCallback(
    (path: string) => localizedPath(locale, path),
    [locale],
  );

  const t = getDictionary(locale);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale, localePath }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useT() {
  return useContext(I18nContext);
}
