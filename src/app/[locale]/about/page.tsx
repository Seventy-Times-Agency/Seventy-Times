import type { Metadata } from "next";
import { getAboutMeta, languageAlternates } from "@/lib/localizedMeta";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { siteConfig } from "@/data/siteConfig";
import AboutClient from "./AboutClient";

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const meta = getAboutMeta(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: languageAlternates("/about"),
    },
    openGraph: {
      title: `${meta.title} — ${siteConfig.name}`,
      description: meta.description,
      url: `${siteConfig.url}/${locale}/about`,
    },
  };
}

export default function Page() {
  return <AboutClient />;
}
