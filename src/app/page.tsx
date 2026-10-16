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
import { getSiteConfig } from "@/lib/api";

export default async function Home() {
  const config = await getSiteConfig();
  const jsonLd = generateJsonLd();

  return (
    <>
      {/* Schema Markup JSON-LD (@graph) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigasi Utama */}
      <Navbar
        logoUrl={config.branding.logo_url}
        siteName={config.site.name}
      />

      {/* Konten Halaman Tunggal */}
      <main id="konten-utama" className="flex flex-col min-h-screen">
        <Hero
          heroData={config.hero}
          whatsappUrl={config.cta.whatsapp_url}
        />
        <TrustStrip />
        <ProblemSolution />
        <Modules whatsappUrl={config.cta.whatsapp_url} />
        <HowItWorks />
        <Security />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta
          whatsappUrl={config.cta.whatsapp_url}
          ctaText={config.hero.cta_text}
        />
      </main>

      {/* Footer Navigasi & Legal */}
      <Footer
        footerData={{
          email: config.contact.email,
          phone: config.contact.phone,
          socialLinks: config.contact.social_links,
          copyright: config.footer_text,
          logoUrl: config.branding.logo_url,
          name: config.site.name,
        }}
      />

      {/* Tombol WhatsApp Kapsul Melayang */}
      <WhatsAppButton whatsappUrl={config.cta.whatsapp_url} />
    </>
  );
}
