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

export default async function HomePage() {
  // Approved reviews had their store removed together with the Notion
  // integration; the Testimonials section stays in the codebase and
  // lights up again as soon as a reviews source returns entries here.
  const reviews: import("@/components/sections/Testimonials").ApprovedReview[] = [];

  return (
    <>
      <StructuredData />
      <Nav />
      <main id="main-content">
        <Hero />
        <MarqueeStack />
        <SectionDivider labelKey="divStart" />
        <HowWeStart />
        <Services />
        <SectionDivider labelKey="divMeet" />
        <ChatDemo />
        <SectionDivider labelKey="divCompare" />
        <Comparison />
        <SectionDivider labelKey="divCases" />
        <Cases />
        {reviews.length > 0 && (
          <>
            <SectionDivider labelKey="divProof" />
            <Testimonials reviews={reviews} />
          </>
        )}
        <SectionDivider labelKey="divNext" />
        <Process />
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
