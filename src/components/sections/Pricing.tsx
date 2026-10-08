import { Check } from "lucide-react";
import { site } from "@/lib/site";
import { PRICING_PLANS } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function Pricing() {
  const getMailto = (planName: string) => {
    return `mailto:${site.email}?subject=${encodeURIComponent(
      `Permintaan Penawaran Paket ${planName} GajiKilat`
    )}`;
  };

  return (
    <section id="harga" className="w-full bg-paper py-16 md:py-20 border-b border-rule">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        {/* Aturan Garis + Eyebrow Bernomor */}
        <div className="w-full border-t border-ink mb-3" />
        <div className="font-mono text-[12px] font-medium tracking-[0.08em] uppercase text-ink-3 mb-2">
          06 / Paket & Harga
        </div>

        <h2 className="font-serif text-[28px] md:text-[36px] font-semibold text-ink leading-[1.2] max-w-3xl">
          Struktur paket sesuai skala operasional.
        </h2>
        <p className="mt-3 text-[16px] text-ink-2 max-w-3xl leading-relaxed">
          Biaya transparan per karyawan per bulan tanpa biaya tersembunyi untuk kalkulasi dan transfer batch.
        </p>

        {/* Grid 3 Kartu Harga */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.nama}
              className={`rounded-[8px] border p-6 flex flex-col justify-between transition-colors shadow-[0_1px_2px_rgba(15,23,42,0.06)] ${
                plan.populer
                  ? "border-emerald-700 bg-paper ring-1 ring-emerald-700"
                  : "border-rule-2 bg-paper"
              }`}
            >
              <div>
                {/* Header Paket */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-sans text-[20px] font-bold text-ink">
                    {plan.nama}
                  </h3>
                  {plan.populer && (
                    <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-[4px]">
                      Paling Dipilih
                    </span>
                  )}
                </div>

                <div className="text-[13px] text-ink-3 mb-4">
                  {plan.kisaran}
                </div>

                {/* Harga Mono */}
                <div className="pb-6 border-b border-rule">
                  <div className="font-mono text-[28px] md:text-[32px] font-bold text-ink tabular-nums leading-none">
                    {plan.tarif}
                  </div>
                  <div className="text-[12px] text-ink-3 font-mono mt-1">
                    {plan.satuan}
                  </div>
                </div>

                {/* Daftar Fitur */}
                <ul className="mt-6 space-y-3 text-[13px] text-ink-2">
                  {plan.fitur.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" strokeWidth={1.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tombol CTA */}
              <div className="mt-8 pt-4 border-t border-rule">
                <Button
                  variant={plan.populer ? "primary" : "secondary"}
                  href={getMailto(plan.nama)}
                  isExternal
                  className="w-full"
                >
                  Jadwalkan Demo
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Catatan Ilustratif */}
        <p className="mt-6 text-center text-[12px] text-ink-3 font-mono">
          {/* ILUSTRATIF: Harga ilustratif. Konfirmasi dengan pemilik sebelum rilis */}
          Harga di atas bersifat ilustratif untuk estimasi operasional. Hubungi tim kami untuk penawaran final enterprise.
        </p>
      </div>
    </section>
  );
}
