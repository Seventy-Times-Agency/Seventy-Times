import { jsonLd } from "@/lib/jsonLd";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/data/services";
import { LOCALES, isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { siteConfig } from "@/data/siteConfig";
import { languageAlternates } from "@/lib/localizedMeta";
import ServiceDetail from "./ServiceDetail";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SERVICES.map((s) => ({ locale, slug: s.slug })),
  );
}

const MAX_DESC = 160;

// Compose tag + note into a single meta description, capped near 160
// chars on a word boundary so search engines don't hard-truncate it
// mid-word.
function buildDescription(tag: string, note: string): string {
  const combined = `${tag}. ${note}`.replace(/\.\.+/g, ".").trim();
  if (combined.length <= MAX_DESC) return combined;
  const slice = combined.slice(0, MAX_DESC);
  const lastSpace = slice.lastIndexOf(" ");
  return `${(lastSpace > 0 ? slice.slice(0, lastSpace) : slice).replace(/[.,;:\s]+$/, "")}…`;
}

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string; slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const item = SERVICES.find((s) => s.slug === params.slug);
  if (!item) return {};
  const t = getDictionary(locale);
  const title = t[item.i18n.title];
  const tag = t[item.i18n.tag] ?? "";
  const note = t[item.i18n.note] ?? "";

  // Build a richer ~140–160 char description from the service's own
  // localized fields. A bare `tag` is too thin for a useful SERP snippet;
  // combining tag + note gives Google more context without repeating the
  // title (which it already shows separately). Trim on a word boundary.
  const description = buildDescription(tag, note);

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/services/${item.slug}`,
      languages: languageAlternates(`/services/${item.slug}`),
    },
    openGraph: {
      title: `${title} — ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/${locale}/services/${item.slug}`,
    },
  };
}

export default async function ServicePage(
  props: {
    params: Promise<{ locale: string; slug: string }>;
  }
) {
  const params = await props.params;
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
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }}
      />
      <ServiceDetail item={item} related={related} />
    </>
  );
}
