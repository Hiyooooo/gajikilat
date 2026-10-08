import { PROOF_NUMBERS, PROOF_CLIENTS } from "@/lib/data";

export function TrustStrip() {
  {/* ILUSTRATIF: ganti dengan data & klien asli. Pastikan nama tidak menyerupai perusahaan nyata */}
  return (
    <section className="w-full bg-canvas py-12 border-b border-rule">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        {/* Grid 4 Metrik Operasional */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-rule pb-10 border-b border-rule">
          {PROOF_NUMBERS.map((item, idx) => (
            <div
              key={item.angka}
              className={`flex flex-col ${
                idx === 0
                  ? "md:pr-8"
                  : idx === 3
                  ? "md:pl-8"
                  : "md:px-8"
              }`}
            >
              <span className="font-mono text-[28px] md:text-[34px] font-bold text-ink tabular-nums leading-none">
                {item.angka}
              </span>
              <span className="mt-2 text-[13px] text-ink-3 leading-snug">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Baris Nama Klien Fiktif Ilustratif */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 shrink-0">
            Digunakan oleh tim operasional:
          </span>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[14px] font-semibold text-ink-3">
            {PROOF_CLIENTS.map((klien) => (
              <span key={klien} className="tracking-tight hover:text-ink transition-colors">
                {klien}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
