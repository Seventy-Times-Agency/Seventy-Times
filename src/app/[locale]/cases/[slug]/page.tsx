import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASES } from "@/data/cases";
import { LOCALES, isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { siteConfig } from "@/data/siteConfig";
import CaseDetail from "./CaseDetail";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    CASES.map((c) => ({ locale, slug: c.id })),
  );
}

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string; slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const item = CASES.find((c) => c.id === params.slug);
  if (!item) return {};
  const t = getDictionary(locale);
  const title = t[item.titleKey];
  const summary = t[item.summaryKey];
  return {
    title: `${title} — ${siteConfig.name}`,
    description: summary,
    alternates: { canonical: `/${locale}/cases/${item.id}` },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description: summary,
      url: `/${locale}/cases/${item.id}`,
    },
  };
}

export default async function CasePage(
  props: {
    params: Promise<{ locale: string; slug: string }>;
  }
) {
  const params = await props.params;
  const item = CASES.find((c) => c.id === params.slug);
  if (!item) notFound();

  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  const title = t[item.titleKey];

  // BreadcrumbList JSON-LD — gives Google a real navigation trail it
  // can render directly under the search result instead of the raw URL.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: `${siteConfig.url}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t.navCases,
        item: `${siteConfig.url}/${locale}#cases`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${siteConfig.url}/${locale}/cases/${item.id}`,
      },
    ],
  };

  // Up to 3 sibling cases for the "related" rail at the bottom.
  const related = CASES.filter((c) => c.id !== item.id).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CaseDetail item={item} related={related} />
    </>
  );
}
