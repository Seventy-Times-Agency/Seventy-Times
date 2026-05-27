import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { getLocaleMeta } from "@/lib/localizedMeta";
import {
  DEFAULT_LOCALE,
  LOCALES,
  isLocale,
  type Locale,
} from "@/i18n/config";
import { I18nProvider } from "@/i18n/context";
import HtmlLangSync from "@/i18n/HtmlLangSync";
import ClientOverlays from "@/components/overlays/ClientOverlays";

// Statically pre-render every supported locale at build time.
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const meta = getLocaleMeta(locale);
  const alternateLocales = LOCALES.filter((l) => l !== locale).map(
    (l) => getLocaleMeta(l).ogLocale,
  );

  const canonical =
    locale === DEFAULT_LOCALE ? siteConfig.url : `${siteConfig.url}/${locale}`;
  const languageAlternates = Object.fromEntries(
    LOCALES.map((l) => [l, `${siteConfig.url}/${l}`]),
  );

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${siteConfig.tagline}`,
      template: `%s — ${siteConfig.name}`,
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: siteConfig.name }],
    alternates: {
      canonical,
      languages: {
        ...languageAlternates,
        "x-default": siteConfig.url,
      },
    },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      alternateLocale: alternateLocales,
      url: canonical,
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description: meta.description,
      siteName: siteConfig.name,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description: meta.description,
      images: [
        {
          url: "/opengraph-image",
          alt: meta.ogImageAlt,
        },
      ],
    },
    icons: { icon: "/favicon.svg" },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <I18nProvider locale={locale}>
      <HtmlLangSync />
      {children}
      <ClientOverlays />
    </I18nProvider>
  );
}
