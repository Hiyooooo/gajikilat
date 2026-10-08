import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Modules } from "@/components/sections/Modules";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Security } from "@/components/sections/Security";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { generateJsonLd } from "@/lib/schema";

export default function Home() {
  const jsonLd = generateJsonLd();

  return (
    <>
      {/* Schema Markup JSON-LD (@graph) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigasi Utama */}
      <Navbar />

      {/* Konten Halaman Tunggal */}
      <main id="konten-utama" className="flex flex-col min-h-screen">
        <Hero />
        <TrustStrip />
        <ProblemSolution />
        <Modules />
        <HowItWorks />
        <Security />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>

      {/* Footer Navigasi & Legal */}
      <Footer />

      {/* Tombol WhatsApp Kapsul Melayang */}
      <WhatsAppButton />
    </>
  );
}
