import dynamic from "next/dynamic";
import Nav from "@/components/chrome/Nav";
import Hero from "@/components/sections/Hero";
import MarqueeStack from "@/components/sections/MarqueeStack";
import HowWeStart from "@/components/sections/HowWeStart";
import Services from "@/components/sections/Services";
import Footer from "@/components/chrome/Footer";
import SectionDivider from "@/components/decor/SectionDivider";
import StructuredData from "@/components/seo/StructuredData";

// Below-fold sections — code-split so the initial route bundle stays
// lean. Still SSR'd (no `ssr: false`) so search engines and the first
// paint keep the content; only the client JS for hydration is deferred.
const Cases = dynamic(() => import("@/components/sections/Cases"));
const StackBuilder = dynamic(() => import("@/components/sections/StackBuilder"));
const CTA = dynamic(() => import("@/components/sections/CTA"));

export default async function HomePage() {
  return (
    <>
      <StructuredData />
      <Nav />
      <main id="main-content">
        <Hero />
        <MarqueeStack />
        <SectionDivider labelKey="divStart" />
        <HowWeStart />
        <Services teaser />
        <SectionDivider labelKey="divCases" />
        <Cases />
        <SectionDivider labelKey="divSimulator" />
        <StackBuilder />
        <SectionDivider labelKey="divTalk" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
