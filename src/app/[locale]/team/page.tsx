import type { Metadata } from "next";
import { getTeamMeta } from "@/lib/localizedMeta";
import { LOCALES, isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { siteConfig } from "@/data/siteConfig";
import TeamClient from "./TeamClient";

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  },
): Promise<Metadata> {
  const params = await props.params;
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const meta = getTeamMeta(locale);

  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${siteConfig.url}/${l}/team`;
  }
  languages["x-default"] = `${siteConfig.url}/${DEFAULT_LOCALE}/team`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/team`,
      languages,
    },
  };
}

export default function Page() {
  return <TeamClient />;
}
