import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { siteConfig } from "@/data/siteConfig";
import { I18nProvider } from "@/i18n/context";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import PageIntro from "@/components/PageIntro";
import LeadForm from "@/components/LeadForm";
import ReviewForm from "@/components/ReviewForm";
import ViewportFrame from "@/components/ViewportFrame";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI",
    "маркетинг",
    "таргетированная реклама",
    "автоматизация",
    "AI-бот",
    "Claude",
    "агентство",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        <I18nProvider>
          <SmoothScroll />
          <PageIntro />
          <AnimatedBackground />
          <ViewportFrame />
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
