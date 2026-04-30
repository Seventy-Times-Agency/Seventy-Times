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

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
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

export default function CasePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const item = CASES.find((c) => c.id === params.slug);
  if (!item) notFound();
  return <CaseDetail item={item} />;
}
