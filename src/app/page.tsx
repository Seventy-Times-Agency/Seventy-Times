import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ChatDemo from "@/components/ChatDemo";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <ChatDemo />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
