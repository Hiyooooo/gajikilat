"use client";

import { site } from "@/lib/site";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { PayrollDemoProvider, usePayrollDemo } from "@/components/modules/PayrollDemoProvider";
import { GajiCard } from "@/components/modules/GajiCard";
import { AbsensiCard } from "@/components/modules/AbsensiCard";
import { PerizinanCard } from "@/components/modules/PerizinanCard";
import { ExamCard } from "@/components/modules/ExamCard";
import { LibraryCard } from "@/components/modules/LibraryCard";

function ModulesHeader() {
  const { resetDemo } = usePayrollDemo();

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <div className="w-full border-t border-ink mb-3" />
        <div className="font-mono text-[12px] font-medium tracking-[0.08em] uppercase text-ink-3 mb-2">
          02 / Modul Terintegrasi
        </div>
        <h2 className="font-serif text-[28px] md:text-[36px] font-semibold text-ink leading-[1.2]">
          Lima modul, satu sumber data.
        </h2>
        <p className="mt-2 text-[15px] md:text-[16px] text-ink-2 max-w-3xl leading-relaxed">
          Absensi dan Perizinan mengubah angka di Gaji secara langsung. Coba sendiri interaksi kartu di bawah.
        </p>
      </div>

      <button
        type="button"
        onClick={resetDemo}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-ink text-ink text-[12px] font-mono hover:bg-canvas transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-emerald-700"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Simulasi Demo</span>
      </button>
    </div>
  );
}

interface ModulesProps {
  whatsappUrl?: string;
}

export function Modules({ whatsappUrl }: ModulesProps = {}) {
  const demoMailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Jadwalkan Demo GajiKilat - Fitur Modul"
  )}`;
  const waUrl =
    whatsappUrl ||
    `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
      "Halo GajiKilat, saya ingin bertanya tentang integrasi modul payroll."
    )}`;

  return (
    <section id="modul" className="w-full bg-canvas py-16 md:py-20 border-b border-rule">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <PayrollDemoProvider>
          <ModulesHeader />

          {/* Grid Modul 3 Kolom Formal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            <GajiCard />
            <AbsensiCard />
            <PerizinanCard />
            <ExamCard />
            <LibraryCard />
          </div>
        </PayrollDemoProvider>

        {/* CTA Setelah Modul */}
        <div className="mt-12 p-6 md:p-8 rounded-[8px] border border-rule-2 bg-paper flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
          <div>
            <h3 className="font-serif text-[20px] md:text-[22px] font-semibold text-ink">
              Ingin melihat alur ini dengan data pabrik atau cabang Anda?
            </h3>
            <p className="mt-1 text-[14px] text-ink-3">
              Jadwalkan demo langsung 30 menit dengan simulasi komponen gaji perusahaan Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button variant="primary" href={demoMailto} isExternal>
              Jadwalkan Demo
            </Button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-[6px] border border-rule bg-canvas px-4 text-[14px] font-medium text-ink hover:bg-band transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span>Tanya lewat WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
