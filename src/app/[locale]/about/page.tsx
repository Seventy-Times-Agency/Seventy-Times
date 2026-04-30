import type { Metadata } from "next";
import { getAboutMeta } from "@/lib/localizedMeta";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import AboutClient from "./AboutClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const meta = getAboutMeta(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${locale}/about` },
  };
}

export default function Page() {
  return <AboutClient />;
}
