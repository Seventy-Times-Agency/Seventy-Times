import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { getLocaleMeta, languageAlternates } from "@/lib/localizedMeta";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_LANG,
  isLocale,
  type Locale,
} from "@/i18n/config";
import { I18nProvider } from "@/i18n/context";
import { getDictionary } from "@/i18n/dictionary";
import AnimatedBackground from "@/components/decor/AnimatedBackground";
import FloatingGlyphs from "@/components/decor/FloatingGlyphs";
import ScrollProgress from "@/components/decor/ScrollProgress";
import SmoothScroll from "@/components/decor/SmoothScroll";
import ClientOverlays from "@/components/overlays/ClientOverlays";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0b10",
  width: "device-width",
  initialScale: 1,
};

// Schema.org graph. Declaring ourselves as Organization + the more
// specific ProfessionalService surface gives Google extra hooks for
// service-type rich results without contradicting the broader entity.
// Both share an @id so search engines see them as one node, with a
// WebSite node tied to the same publisher.
const ORG_ID = `${siteConfig.url}/#organization`;

const SITE_LANGUAGES = LOCALES.map((l) => LOCALE_LANG[l]);

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORG_ID,
      name: siteConfig.name,
      alternateName: siteConfig.shortName,
      url: siteConfig.url,
      logo: `${siteConfig.url}/favicon.svg`,
      image: `${siteConfig.url}/${DEFAULT_LOCALE}/opengraph-image`,
      description: siteConfig.description,
      email: siteConfig.contacts.email.address,
      telephone: siteConfig.contacts.phone.raw,
      priceRange: "$$",
      areaServed: ["United States", "Worldwide"],
      sameAs: [
        siteConfig.contacts.telegram.url,
        siteConfig.contacts.instagram.url,
        siteConfig.contacts.facebook.url,
        siteConfig.contacts.linkedin.url,
        siteConfig.contacts.whatsapp.url,
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteConfig.contacts.email.address,
          telephone: siteConfig.contacts.phone.raw,
          availableLanguage: SITE_LANGUAGES,
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: { "@id": ORG_ID },
      inLanguage: SITE_LANGUAGES,
    },
  ],
};

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

  // Canonical always carries the locale prefix — the bare site URL is a
  // redirect to /en, and pointing canonical at a redirect wastes crawl
  // signals.
  const canonical = `${siteConfig.url}/${locale}`;

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
      languages: languageAlternates(""),
    },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      alternateLocale: alternateLocales,
      url: canonical,
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description: meta.description,
      siteName: siteConfig.name,
      // og:image itself comes from the [locale]/opengraph-image.tsx
      // file convention — localized card + localized alt, and Next
      // appends the width/height/type from its exports.
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description: meta.description,
      images: [
        {
          url: `/${locale}/opengraph-image/og`,
          alt: meta.ogImageAlt,
        },
      ],
    },
    icons: { icon: "/favicon.svg" },
    manifest: "/manifest.webmanifest",
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
  const t = getDictionary(locale);

  return (
    <html lang={LOCALE_LANG[locale]} className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteConfig.name} RSS`}
          href="/feed.xml"
        />
      </head>
      <body>
        <a href="#main-content" className="skipLink">
          {t.skipToContent}
        </a>
        <I18nProvider locale={locale}>
          <SmoothScroll />
          <AnimatedBackground />
          <FloatingGlyphs />
          <ScrollProgress />
          {children}
          <ClientOverlays />
        </I18nProvider>
      </body>
    </html>
  );
}
