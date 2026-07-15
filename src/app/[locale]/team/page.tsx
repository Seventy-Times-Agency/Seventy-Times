import type { Metadata } from "next";
import { getTeamMeta, languageAlternates } from "@/lib/localizedMeta";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { siteConfig } from "@/data/siteConfig";
import { TEAM } from "@/data/team";
import { jsonLd } from "@/lib/jsonLd";
import TeamClient from "./TeamClient";

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  },
): Promise<Metadata> {
  const params = await props.params;
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const meta = getTeamMeta(locale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/team`,
      languages: languageAlternates("/team"),
    },
    openGraph: {
      title: `${meta.title} — ${siteConfig.name}`,
      description: meta.description,
      url: `${siteConfig.url}/${locale}/team`,
    },
  };
}

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;

  // Person JSON-LD, one per real team member. Empty (nothing emitted)
  // until data/team.ts has entries — we don't publish structured data for
  // people who don't exist.
  const people = TEAM.map((member) => ({
    "@type": "Person",
    name: member.name,
    jobTitle: member.role[locale],
    ...(member.photo ? { image: `${siteConfig.url}${member.photo}` } : {}),
    ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }));

  return (
    <>
      {people.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({ "@context": "https://schema.org", "@graph": people }),
          }}
        />
      )}
      <TeamClient />
    </>
  );
}
