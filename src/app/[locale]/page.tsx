import dynamic from "next/dynamic";
import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import MarqueeStack from "@/components/sections/MarqueeStack";
import GrowthMachine from "@/components/sections/GrowthMachine";
import Services from "@/components/sections/Services";
import Footer from "@/components/layout/Footer";
import SectionDivider from "@/components/decor/SectionDivider";
import StructuredData from "@/components/seo/StructuredData";

// Below-fold sections — code-split so the initial route bundle stays
// lean. Still SSR'd (no `ssr: false`) so search engines and the first
// paint keep the content; only the client JS for hydration is deferred.
const Comparison = dynamic(() => import("@/components/sections/Comparison"));
const Process = dynamic(() => import("@/components/sections/Process"));
const ChatDemo = dynamic(() => import("@/components/sections/ChatDemo"));
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials"),
);
const Cases = dynamic(() => import("@/components/sections/Cases"));
const GrowthSimulator = dynamic(
  () => import("@/components/sections/GrowthSimulator"),
);
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const CTA = dynamic(() => import("@/components/sections/CTA"));

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Nav />
      <main>
        <Hero />
        <MarqueeStack />
        <SectionDivider labelKey="divMachine" />
        <GrowthMachine />
        <Services />
        <SectionDivider labelKey="divCompare" />
        <Comparison />
        <SectionDivider labelKey="divNext" />
        <Process />
        <SectionDivider labelKey="divMeet" />
        <ChatDemo />
        <SectionDivider labelKey="divProof" />
        <Testimonials />
        <SectionDivider labelKey="divCases" />
        <Cases />
        <SectionDivider labelKey="divSimulator" />
        <GrowthSimulator />
        <SectionDivider labelKey="divQuestions" />
        <FAQ />
        <SectionDivider labelKey="divTalk" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
