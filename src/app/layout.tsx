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

// Schema.org graph. Declaring ourselves as Organization + the more
// specific ProfessionalService surface gives Google extra hooks for
// service-type rich results without contradicting the broader entity.
// Both share an @id so search engines see them as one node, with a
// WebSite node tied to the same publisher.
const ORG_ID = `${siteConfig.url}/#organization`;

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
      image: `${siteConfig.url}/opengraph-image`,
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
          availableLanguage: ["en", "ru", "de", "ua"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: { "@id": ORG_ID },
      inLanguage: ["en", "ru", "de", "ua"],
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
        <a href="#main-content" className="skipLink">
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
