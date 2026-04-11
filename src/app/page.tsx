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

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <VelocityTicker />
        <Services />
        <SectionDivider label="— next" />
        <Process />
        <SectionDivider label="— meet venesa" />
        <ChatDemo />
        <SectionDivider label="— social proof" />
        <Testimonials />
        <SectionDivider label="— questions" />
        <FAQ />
        <SectionDivider label="— let's talk" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
