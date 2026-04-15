"use client";

import { useEffect } from "react";
import { useT } from "./context";

/**
 * Keeps <html lang="..."> in sync with the active locale so CSS
 * rules scoped by language (e.g. hyphens for German) actually fire.
 */
export default function HtmlLangSync() {
  const { locale } = useT();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
