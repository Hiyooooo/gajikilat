import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  {/* ILUSTRATIF: ganti dengan testimoni asli yang sudah disetujui */}
  return (
    <section className="w-full bg-canvas py-16 md:py-20 border-b border-rule">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* Aturan Garis + Eyebrow Bernomor */}
        <div className="w-full border-t border-ink mb-3" />
        <div className="font-mono text-[12px] font-medium tracking-[0.08em] uppercase text-ink-3 mb-2">
          05 / Ulasan Pengguna
        </div>

        <h2 className="font-serif text-[28px] md:text-[36px] font-semibold text-ink leading-[1.2] max-w-2xl">
          Pengalaman tim payroll di perusahaan besar.
        </h2>
        <p className="mt-3 text-[16px] text-ink-2 max-w-2xl leading-relaxed">
          Hasil nyata dari otomatisasi kalkulasi lembur, potongan cuti, dan transfer batch.
        </p>

        {/* Grid 3 Kartu Testimoni Sama Tinggi */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.nama}
              className="border border-rule-2 rounded-[8px] bg-paper p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06)] flex flex-col justify-between"
            >
              <p className="text-[14px] text-ink-2 leading-relaxed italic">
                &ldquo;{t.kutipan}&rdquo;
              </p>

              <div className="mt-6 pt-4 border-t border-rule flex items-center gap-3">
                {/* Avatar Inisial Persegi 40px (tanpa foto) */}
                <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-band border border-rule font-mono text-[14px] font-bold text-ink shrink-0">
                  {t.inisial}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-ink text-[14px] truncate">
                    {t.nama}
                  </div>
                  <div className="text-[12px] text-ink-3 truncate">
                    {t.jabatan}, {t.perusahaan}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
