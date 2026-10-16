import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface FinalCtaProps {
  whatsappUrl?: string;
  ctaText?: string;
}

export function FinalCta({ whatsappUrl, ctaText }: FinalCtaProps = {}) {
  const demoMailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Jadwalkan Demo GajiKilat - CTA Penutup"
  )}`;
  const waUrl =
    whatsappUrl ||
    `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
      "Halo GajiKilat, saya ingin menjadwalkan demo payroll satu siklus."
    )}`;
  const primaryCta = ctaText || "Jadwalkan Demo";

  return (
    <section className="w-full bg-navy text-on-navy py-16 md:py-24 border-b border-rule-navy relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 text-center flex flex-col items-center">
        <span className="font-mono text-[12px] font-medium tracking-[0.08em] uppercase text-emerald mb-3">
          Siap Bebas Dari Salah Hitung
        </span>

        <h2 className="font-serif text-[32px] md:text-[44px] font-semibold text-on-navy tracking-[-0.015em] leading-[1.15] max-w-3xl">
          Jalankan satu siklus payroll dengan data Anda.
        </h2>

        <p className="mt-4 text-[16px] md:text-[18px] text-on-navy-2 max-w-2xl leading-relaxed">
          Jadwalkan demo. Kami hitung contoh payroll Anda dan tunjukkan hasilnya baris demi baris.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" href={demoMailto} isExternal className="h-12 px-6 text-[16px]">
            {primaryCta}
          </Button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2.5 rounded-[6px] border border-rule-navy bg-navy-2/60 px-6 text-[15px] font-semibold text-on-navy hover:bg-navy-2 transition-colors focus-visible:outline-2 focus-visible:outline-emerald"
          >
            <WhatsAppIcon className="w-5 h-5 shrink-0" />
            <span>Chat WhatsApp</span>
          </a>
        </div>

        <p className="mt-4 text-[12px] text-on-navy-3 font-mono">
          Demo dipandu konsultan implementasi · Estimasi waktu 30 menit
        </p>
      </div>
    </section>
  );
}
