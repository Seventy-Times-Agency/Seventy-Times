import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Manrope } from "next/font/google";
import { siteConfig } from "@/data/siteConfig";
import { getLocaleMeta } from "@/lib/localizedMeta";
import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "@/i18n/config";
import { I18nProvider } from "@/i18n/context";
import AnimatedBackground from "@/components/decor/AnimatedBackground";
import FloatingGlyphs from "@/components/decor/FloatingGlyphs";
import ScrollProgress from "@/components/decor/ScrollProgress";
import SmoothScroll from "@/components/decor/SmoothScroll";
import PageIntro from "@/components/layout/PageIntro";
import ClientOverlays from "@/components/layout/ClientOverlays";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// Middleware sets `x-locale` on every request based on the URL prefix
// (or cookie / Accept-Language as fallback). We trust it here so the
// SSR'd HTML, metadata, and <html lang> all match the URL the user
// is actually loading.
function readLocale(): Locale {
  const fromHeader = headers().get("x-locale");
  return isLocale(fromHeader) ? fromHeader : DEFAULT_LOCALE;
}

const OG_LOCALE_TAGS: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  de: "de_DE",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = readLocale();
  const meta = getLocaleMeta(locale);
  const ogLocale = OG_LOCALE_TAGS[locale];
  const alternateLocales = LOCALES.filter((l) => l !== locale).map(
    (l) => OG_LOCALE_TAGS[l],
  );

  // Each locale lives at /<locale>; the home of the default locale is
  // also reachable at `/`, but the canonical points to the prefixed URL
  // so search engines never collapse RU/DE into the EN canonical.
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
      locale: ogLocale,
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
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
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
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    icons: { icon: "/favicon.svg" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0b10",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/favicon.svg`,
  description: siteConfig.description,
  email: siteConfig.contacts.email.address,
  sameAs: [
    siteConfig.contacts.telegram.url,
    siteConfig.contacts.instagram.url,
    siteConfig.contacts.facebook.url,
    siteConfig.contacts.whatsapp.url,
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.contacts.email.address,
      availableLanguage: ["en", "ru", "de"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = readLocale();
  return (
    <html lang={locale} className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        <I18nProvider locale={locale}>
          <a href="#top" className="skipLink">
            Skip to content
          </a>
          <SmoothScroll />
          <PageIntro />
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
