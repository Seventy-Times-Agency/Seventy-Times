"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import VelocityTicker from "@/components/VelocityTicker";
import Services from "@/components/Services";
import Process from "@/components/Process";
import ChatDemo from "@/components/ChatDemo";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import { useT } from "@/i18n/context";

export default function HomePage() {
  const { t } = useT();

  return (
    <>
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
        <SectionDivider label={t.divQuestions} />
        <FAQ />
        <SectionDivider label={t.divTalk} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
