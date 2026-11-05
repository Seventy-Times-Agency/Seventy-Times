import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getProcessMeta, languageAlternates } from "@/lib/localizedMeta";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { siteConfig } from "@/data/siteConfig";
import Nav from "@/components/chrome/Nav";
import Footer from "@/components/chrome/Footer";
import PageCrumbs from "@/components/chrome/PageCrumbs";
import SectionDivider from "@/components/decor/SectionDivider";
import Process from "@/components/sections/Process";

const Comparison = dynamic(() => import("@/components/sections/Comparison"));
const ChatDemo = dynamic(() => import("@/components/sections/ChatDemo"));
const CTA = dynamic(() => import("@/components/sections/CTA"));

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const meta = getProcessMeta(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/process`,
      languages: languageAlternates("/process"),
    },
    openGraph: {
      title: `${meta.title} — ${siteConfig.name}`,
      description: meta.description,
      url: `${siteConfig.url}/${locale}/process`,
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
        <PageCrumbs current={t.navWork} />
        <Process titleAs="h1" />
        <SectionDivider labelKey="divCompare" />
        <Comparison />
        <SectionDivider labelKey="divMeet" />
        <ChatDemo />
        <SectionDivider labelKey="divTalk" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
