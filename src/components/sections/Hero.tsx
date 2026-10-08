import { Check } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { SavingsCalculator } from "@/components/hero/SavingsCalculator";
import { SecurityPanel } from "@/components/hero/SecurityPanel";

export function Hero() {
  const demoMailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Jadwalkan Demo GajiKilat"
  )}`;

  return (
    <section className="relative w-full bg-navy hero-ledger-pattern text-on-navy py-14 md:py-20 border-b border-rule-navy overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-12 lg:gap-8 items-stretch">
          {/* Kolom 1: Copywriting Utama (Desktop: 4 kolom) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Eyebrow Bernomor / Kategori */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="font-mono text-[12px] font-medium tracking-[0.08em] uppercase text-emerald">
                  HRIS & Payroll · 200 – 5.000 Karyawan
                </span>
              </div>

              {/* H1 Utama */}
              <h1 className="font-serif text-[34px] md:text-[44px] font-semibold text-on-navy tracking-[-0.015em] leading-[1.12]">
                Payroll akurat. Bebas salah hitung.
              </h1>

              {/* Sub-headline Deskriptif */}
              <p className="mt-4 text-[16px] text-on-navy-2 leading-[1.6]">
                PPh 21 dan BPJS dihitung otomatis dari data absensi dan perizinan, lalu diperiksa sebelum transfer. Tidak ada rekap lembur yang diketik ulang.
              </p>

              {/* CTA Utama & Sekunder */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button variant="primary" href={demoMailto} isExternal>
                  Jadwalkan Demo
                </Button>
                <Button variant="outline-navy" href="#modul">
                  Lihat Alur Payroll
                </Button>
              </div>

              {/* Catatan Mikro */}
              <p className="mt-3 text-[12px] text-on-navy-3">
                Demo dengan data contoh perusahaan Anda · Tanpa kewajiban berlangganan
              </p>
            </div>

            {/* Tiga Butir Bukti Fitur Kunci */}
            <div className="mt-8 pt-6 border-t border-rule-navy space-y-2.5 text-[13px]">
              <div className="flex items-center gap-2 text-on-navy-2">
                <Check className="w-4 h-4 text-emerald shrink-0" strokeWidth={1.5} />
                <span>TER PMK 168/2023 diperbarui otomatis</span>
              </div>
              <div className="flex items-center gap-2 text-on-navy-2">
                <Check className="w-4 h-4 text-emerald shrink-0" strokeWidth={1.5} />
                <span>BPJS Ketenagakerjaan & Kesehatan terpisah</span>
              </div>
              <div className="flex items-center gap-2 text-on-navy-2">
                <Check className="w-4 h-4 text-emerald shrink-0" strokeWidth={1.5} />
                <span>Transfer bank massal dari satu batch gaji</span>
              </div>
            </div>
          </div>

          {/* Kolom 2: Kalkulator Hemat Waktu (Desktop: 5 kolom) */}
          <div className="lg:col-span-5">
            <SavingsCalculator />
          </div>

          {/* Kolom 3: Panel Keamanan (Desktop: 3 kolom) */}
          <div className="lg:col-span-3">
            <SecurityPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
