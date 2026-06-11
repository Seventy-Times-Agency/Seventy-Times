import type { Metadata } from "next";
import { getPrivacyMeta, languageAlternates } from "@/lib/localizedMeta";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { siteConfig } from "@/data/siteConfig";
import PrivacyClient from "./PrivacyClient";

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const meta = getPrivacyMeta(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: languageAlternates("/privacy"),
    },
    openGraph: {
      title: `${meta.title} — ${siteConfig.name}`,
      description: meta.description,
      url: `${siteConfig.url}/${locale}/privacy`,
    },
  };
}

export default function Page() {
  return <PrivacyClient />;
}
