import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { siteConfig } from "@/data/siteConfig";
import { I18nProvider } from "@/i18n/context";
import HtmlLangSync from "@/i18n/HtmlLangSync";
import { getLocaleMeta, readLocaleFromCookies } from "@/lib/localizedMeta";
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = readLocaleFromCookies();
  const meta = getLocaleMeta(locale);
  const alternateLocales = (["en_US", "ru_RU", "de_DE"] as const).filter(
    (l) => l !== meta.ogLocale
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
      canonical: siteConfig.url,
      languages: {
        en: `${siteConfig.url}?lang=en`,
        ru: `${siteConfig.url}?lang=ru`,
        de: `${siteConfig.url}?lang=de`,
        "x-default": siteConfig.url,
      },
    },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      alternateLocale: [...alternateLocales],
      url: siteConfig.url,
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
  const locale = readLocaleFromCookies();
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
        <I18nProvider initialLocale={locale}>
          <a href="#top" className="skipLink">
            Skip to content
          </a>
          <HtmlLangSync />
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
