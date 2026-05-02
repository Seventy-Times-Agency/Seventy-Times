"use client";

import { useEffect } from "react";
import { useT } from "./context";

/**
 * Keeps `<html lang>` in sync with the active locale on the client.
 * The root layout renders with the default locale because it doesn't
 * have access to URL params during static generation; once the
 * locale-prefixed [locale]/layout mounts, this updates the attribute
 * so screen readers and SEO tooling pick up the right language.
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
