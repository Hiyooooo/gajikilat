import { ArrowDown } from "lucide-react";

export function ProblemSolution() {
  const problems = [
    {
      title: "Rekap Lembur Manual",
      sebelum: "Lembur direkap dari absensi ke Excel manual tiap tanggal gajian.",
      sesudah: "Jam lembur tercatat otomatis dan masuk ke komponen gaji periode berjalan.",
      contohLabel: "Contoh hitungan:",
      contohVal: "12 jam × Rp 32.000 = Rp 384.000",
    },
    {
      title: "Perhitungan Pajak & Iuran",
      sebelum: "PPh 21 dan BPJS dihitung terpisah dengan formula rumus lama yang rawan salah tarif.",
      sesudah: "Dihitung dari satu tabel aturan PMK 168/2023, hasilnya diperiksa sebelum transfer batch.",
      contohLabel: "Contoh verifikasi:",
      contohVal: "PPh 21 Rp 84.800 · BPJS Rp 256.000",
    },
    {
      title: "Penyimpanan Dokumen Legal",
      sebelum: "Bukti potong pajak dan kontrak kerja tercecer di folder lokal dan lemari arsip.",
      sesudah: "Arsip 1721-A1 dan kontrak tersimpan per karyawan dalam satu pencarian terpusat.",
      contohLabel: "Pencarian cepat:",
      contohVal: 'Cari "Bagas" → 2 dokumen aktif',
    },
  ];

  return (
    <section className="w-full bg-paper py-16 md:py-20 border-b border-rule">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        {/* Aturan Garis + Eyebrow Bernomor */}
        <div className="w-full border-t border-ink mb-3" />
        <div className="font-mono text-[12px] font-medium tracking-[0.08em] uppercase text-ink-3 mb-3">
          01 / Masalah Operasional
        </div>

        {/* H2 Section */}
        <h2 className="font-serif text-[28px] md:text-[36px] font-semibold text-ink leading-[1.2] max-w-2xl">
          Selisih kecil di payroll jadi komplain besar.
        </h2>
        <p className="mt-3 text-[16px] text-ink-2 max-w-2xl leading-relaxed">
          Di pabrik dan ritel dengan ratusan karyawan, rekap spreadsheet manual selalu menghasilkan selisih lembur, kesalahan tarif TER, atau potongan izin yang terlewat.
        </p>

        {/* Grid 3 Kolom Formal Tabel Sebelum / Sesudah */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((item) => (
            <div
              key={item.title}
              className="border border-rule-2 rounded-[8px] bg-paper shadow-[0_1px_2px_rgba(15,23,42,0.06)] flex flex-col justify-between overflow-hidden"
            >
              {/* Kepala Kolom */}
              <div className="px-5 py-3 border-b border-rule bg-canvas">
                <h3 className="font-sans text-[16px] font-semibold text-ink">
                  {item.title}
                </h3>
              </div>

              {/* Badan Tabel Sebelum / Sesudah */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-[14px]">
                {/* Baris Sebelum */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.05em] text-danger font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                    <span>Sebelum</span>
                  </div>
                  <p className="text-ink-2 leading-relaxed text-[13px]">
                    {item.sebelum}
                  </p>
                </div>

                {/* Baris Sesudah */}
                <div className="space-y-1 pt-3 border-t border-rule">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.05em] text-emerald-700 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                    <span>Sesudah GajiKilat</span>
                  </div>
                  <p className="text-ink font-medium leading-relaxed text-[13px]">
                    {item.sesudah}
                  </p>
                </div>

                {/* Contoh Angka Konkret */}
                <div className="pt-3 border-t border-rule bg-band/60 -mx-5 -mb-5 p-4 text-[12px]">
                  <span className="text-ink-3 block text-[11px] font-mono">
                    {item.contohLabel}
                  </span>
                  <span className="font-mono font-bold text-ink">
                    {item.contohVal}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Penutup & Tautan Navigasi */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-rule">
          <p className="text-[14px] text-ink-3">
            Satu sumber data menghubungkan absensi, perizinan, dan slip gaji secara langsung.
          </p>
          <a
            href="#modul"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700 rounded-[4px]"
          >
            <span>Lihat alurnya langsung</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
