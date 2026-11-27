import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CasesSection from "@/components/CasesSection";
import SalesFlow from "@/components/SalesFlow";
import InlineCTA from "@/components/InlineCTA";
import IntegrationFlow from "@/components/IntegrationFlow";
import BlogTeaser from "@/components/BlogTeaser";
import HowWeWork from "@/components/HowWeWork";
import WhyEMC from "@/components/WhyEMC";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Founder from "@/components/Founder";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <div className="bg-scene" />
      <Header />
      <main className="relative z-10 flex-1">
        <Hero />
        <Services />
        <CasesSection />
        <SalesFlow />
        <InlineCTA
          text="Quero um atendimento assim no meu WhatsApp"
          message="Olá! Vi o exemplo de venda automatizada no site e quero algo assim para o meu negócio."
        />
        <WhyEMC />
        <IntegrationFlow />
        <InlineCTA
          text="Quero integrar meus sistemas"
          message="Olá! Vi os exemplos de integração no site e quero saber mais."
        />
        <HowWeWork />
        <Pricing />
        <About />
        <Founder />
        <FAQ />
        <BlogTeaser />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
