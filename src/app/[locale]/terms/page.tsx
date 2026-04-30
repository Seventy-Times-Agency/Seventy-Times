import type { Metadata } from "next";
import { getTermsMeta } from "@/lib/localizedMeta";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import TermsClient from "./TermsClient";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const meta = getTermsMeta(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${locale}/terms` },
  };
}

export default function Page() {
  return <TermsClient />;
}
