import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SalesFlow from "@/components/SalesFlow";
import InlineCTA from "@/components/InlineCTA";
import IntegrationFlow from "@/components/IntegrationFlow";
import BranchFlow from "@/components/BranchFlow";
import MergeFlow from "@/components/MergeFlow";
import BlogTeaser from "@/components/BlogTeaser";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
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
        <SalesFlow />
        <InlineCTA
          text="Quero um fluxo assim para o meu negócio"
          message="Olá! Vi o exemplo de venda automatizada no site e quero algo assim para o meu negócio."
        />
        <IntegrationFlow />
        <BranchFlow />
        <MergeFlow />
        <InlineCTA
          text="Quero integrar meus sistemas"
          message="Olá! Vi os exemplos de integração no site e quero saber mais."
        />
        <BlogTeaser />
        <Pricing />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
