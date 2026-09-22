import type { Metadata } from "next";
import OfferLanding from "@/components/landing/OfferLanding";
import { OFFERS } from "@/data/offers";
import { isLocale, DEFAULT_LOCALE, LOCALES } from "@/i18n/config";

// A/B entry landing — deliberately OUTSIDE the navigation and the
// sitemap, and noindexed: it exists only for ad traffic and the sales
// team's links. All copy comes from data/offers.ts.

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const offer = OFFERS.brief;
  return {
    title: offer.title[locale],
    description: offer.sub[locale],
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <OfferLanding variant="brief" />;
}
