import type { Viewport } from "next";
import { Manrope } from "next/font/google";
import { siteConfig } from "@/data/siteConfig";
import { DEFAULT_LOCALE } from "@/i18n/config";
import AnimatedBackground from "@/components/decor/AnimatedBackground";
import FloatingGlyphs from "@/components/decor/FloatingGlyphs";
import ScrollProgress from "@/components/decor/ScrollProgress";
import SmoothScroll from "@/components/decor/SmoothScroll";
import "./globals.css";

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
    <html lang={DEFAULT_LOCALE} className={manrope.variable}>
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
        <a href="#top" className="skipLink">
          Skip to content
        </a>
        <SmoothScroll />
        <AnimatedBackground />
        <FloatingGlyphs />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
