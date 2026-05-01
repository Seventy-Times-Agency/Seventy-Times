import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import { LOCALES, isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { siteConfig } from "@/data/siteConfig";
import ServiceDetail from "./ServiceDetail";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SERVICES.map((s) => ({ locale, slug: s.slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const item = SERVICES.find((s) => s.slug === params.slug);
  if (!item) return {};
  const t = getDictionary(locale);
  const title = t[item.i18n.title];
  const tag = t[item.i18n.tag];
  return {
    title: `${title} — ${siteConfig.name}`,
    description: tag,
    alternates: { canonical: `/${locale}/services/${item.slug}` },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description: tag,
      url: `/${locale}/services/${item.slug}`,
    },
  };
}

export default function ServicePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const item = SERVICES.find((s) => s.slug === params.slug);
  if (!item) notFound();

  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const t = getDictionary(locale);
  const title = t[item.i18n.title];

  // BreadcrumbList JSON-LD — same trail Google should surface in
  // search snippets.
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
        name: t.navServices,
        item: `${siteConfig.url}/${locale}#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${siteConfig.url}/${locale}/services/${item.slug}`,
      },
    ],
  };

  // Per-service Service JSON-LD — landing page already has all four
  // services declared, but a dedicated detail page deserves its own
  // entry so search engines can rank this URL for the service name.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/${locale}/services/${item.slug}`,
    name: title,
    description: t[item.i18n.tag],
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: ["United States", "Worldwide"],
    serviceType: title,
  };

  // Up to 3 sibling services for the "explore" rail at the bottom.
  const related = SERVICES.filter((s) => s.slug !== item.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceDetail item={item} related={related} />
    </>
  );
}
