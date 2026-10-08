export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Hubungkan data karyawan",
      desc: "Impor data karyawan dan komponen gaji dari file CSV atau Excel. Atur jadwal shift kerja pabrik, radius geofence, serta hak kuota cuti tahunan.",
      detail: "Mendukung multi-lokasi dan ratusan master komponen tunjangan.",
    },
    {
      num: "02",
      title: "Periksa hasil hitung otomatis",
      desc: "Pratinjau draf penggajian satu batch: PPh 21 TER, BPJS, lembur, dan potongan unpaid leave. Selisih atau kejanggalan ditandai sebelum disetujui.",
      detail: "Audit trail mencatat setiap kalkulasi dengan referensi regulasi.",
    },
    {
      num: "03",
      title: "Setujui dan transfer bank",
      desc: "Dual approval dari pembuat batch dan controller. Satu klik instruksi transfer massal ke bank mitra, dan slip gaji terkirim langsung ke karyawan.",
      detail: "Bukti potong dan arsip langsung masuk ke modul Library.",
    },
  ];

  return (
    <section id="cara-kerja" className="w-full bg-paper py-16 md:py-20 border-b border-rule">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        {/* Aturan Garis + Eyebrow Bernomor */}
        <div className="w-full border-t border-ink mb-3" />
        <div className="font-mono text-[12px] font-medium tracking-[0.08em] uppercase text-ink-3 mb-2">
          03 / Cara Kerja
        </div>

        <h2 className="font-serif text-[28px] md:text-[36px] font-semibold text-ink leading-[1.2] max-w-3xl">
          Dari data mentah ke transfer, dalam tiga langkah.
        </h2>
        <p className="mt-3 text-[16px] text-ink-2 max-w-3xl leading-relaxed">
          Proses terstandarisasi untuk memangkas siklus tutup buku payroll dari hitungan hari menjadi hitungan menit.
        </p>

        {/* 3 Kolom Formal Bernomor Mono */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-rule border border-rule-2 rounded-[8px] bg-paper shadow-[0_1px_2px_rgba(15,23,42,0.06)] overflow-hidden">
          {steps.map((step) => (
            <div key={step.num} className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[28px] font-bold text-emerald-700 leading-none block mb-4">
                  {step.num}
                </span>
                <h3 className="font-sans text-[18px] font-semibold text-ink mb-2">
                  {step.title}
                </h3>
                <p className="text-[14px] text-ink-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-rule text-[12px] font-mono text-ink-3">
                {step.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Catatan Layanan Migrasi Paralel */}
        <div className="mt-6 p-4 rounded-[6px] bg-canvas border border-rule flex items-center justify-between text-[13px] text-ink-3">
          <span>
            {/* ILUSTRATIF: klaim layanan migrasi paralel perlu konfirmasi pemilik */}
            Catatan implementasi: Migrasi dari sistem lama dapat dijalankan paralel selama satu siklus gaji tanpa mengganggu operasional.
          </span>
          <span className="font-mono text-[11px] text-emerald-700 font-semibold uppercase shrink-0 ml-4">
            Dukungan Penuh
          </span>
        </div>
      </div>
    </section>
  );
}
