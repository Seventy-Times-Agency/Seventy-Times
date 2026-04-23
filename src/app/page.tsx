"use client";

import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import VelocityTicker from "@/components/sections/VelocityTicker";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import ChatDemo from "@/components/sections/ChatDemo";
import Testimonials from "@/components/sections/Testimonials";
import Cases from "@/components/sections/Cases";
import GrowthSimulator from "@/components/sections/GrowthSimulator";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";
import SectionDivider from "@/components/decor/SectionDivider";
import StructuredData from "@/components/seo/StructuredData";
import { useT } from "@/i18n/context";

export default function HomePage() {
  const { t } = useT();

  return (
    <>
      <StructuredData />
      <Nav />
      <main>
        <Hero />
        <VelocityTicker />
        <Services />
        <SectionDivider label={t.divNext} />
        <Process />
        <SectionDivider label={t.divMeet} />
        <ChatDemo />
        <SectionDivider label={t.divProof} />
        <Testimonials />
        <SectionDivider label={t.divCases} />
        <Cases />
        <SectionDivider label={t.divSimulator} />
        <GrowthSimulator />
        <SectionDivider label={t.divQuestions} />
        <FAQ />
        <SectionDivider label={t.divTalk} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
