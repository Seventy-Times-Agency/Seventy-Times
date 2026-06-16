import type { Metadata } from "next";
import { getTermsMeta, languageAlternates } from "@/lib/localizedMeta";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { siteConfig } from "@/data/siteConfig";
import TermsClient from "./TermsClient";

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const meta = getTermsMeta(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/terms`,
      languages: languageAlternates("/terms"),
    },
    openGraph: {
      title: `${meta.title} — ${siteConfig.name}`,
      description: meta.description,
      url: `${siteConfig.url}/${locale}/terms`,
    },
  };
}

export default function Page() {
  return <TermsClient />;
}
