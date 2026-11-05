import type { Metadata } from "next";
import { getServicesMeta, languageAlternates } from "@/lib/localizedMeta";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { siteConfig } from "@/data/siteConfig";
import Nav from "@/components/chrome/Nav";
import Footer from "@/components/chrome/Footer";
import PageCrumbs from "@/components/chrome/PageCrumbs";
import SectionDivider from "@/components/decor/SectionDivider";
import Services from "@/components/sections/Services";
import CTA from "@/components/sections/CTA";

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const meta = getServicesMeta(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/services`,
      languages: languageAlternates("/services"),
    },
    openGraph: {
      title: `${meta.title} — ${siteConfig.name}`,
      description: meta.description,
      url: `${siteConfig.url}/${locale}/services`,
    },
  };
}

export default async function Page(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const t = getDictionary(locale);

  return (
    <>
      <Nav />
      <main id="main-content">
        <PageCrumbs current={t.navServices} />
        <Services titleAs="h1" />
        <SectionDivider labelKey="divTalk" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
