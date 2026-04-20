import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { siteConfig } from "@/data/siteConfig";
import { I18nProvider } from "@/i18n/context";
import HtmlLangSync from "@/i18n/HtmlLangSync";
import AnimatedBackground from "@/components/AnimatedBackground";
import FloatingGlyphs from "@/components/FloatingGlyphs";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import PageIntro from "@/components/PageIntro";
import LeadForm from "@/components/LeadForm";
import ReviewForm from "@/components/ReviewForm";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Seventy Times",
    "AI marketing agency",
    "AI агентство",
    "маркетинговое агентство",
    "таргетированная реклама",
    "performance marketing",
    "автоматизация бизнеса",
    "AI-бот",
    "Claude",
    "digital marketing",
  ],
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
    locale: "en_US",
    alternateLocale: ["ru_RU", "de_DE"],
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        <I18nProvider>
          <HtmlLangSync />
          <SmoothScroll />
          <PageIntro />
          <AnimatedBackground />
          <FloatingGlyphs />
          <ScrollProgress />
          {children}
          <ChatWidget />
          <LeadForm />
          <ReviewForm />
        </I18nProvider>
      </body>
    </html>
  );
}
