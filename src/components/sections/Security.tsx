import { SECURITY_BADGES } from "@/lib/data";
import { SecurityBadge } from "@/components/ui/SecurityBadge";
import { ShieldCheck, Lock, KeyRound } from "lucide-react";

export function Security() {
  {/* ILUSTRATIF: Seluruh klaim teknis di section ini ditandai konfirmasi tim engineering/legal */}
  const securityPillars = [
    {
      title: "Enkripsi Data Menyeluruh",
      desc: "Data tersimpan dienkripsi dengan standar AES-256. Data dalam perjalanan diamankan dengan protokol TLS 1.3. Nomor rekening karyawan disamarkan pada tampilan antarmuka.",
      icon: Lock,
    },
    {
      title: "Kontrol Akses & Jejak Audit",
      desc: "Akses berbasis peran ketat (RBAC). Pembuat batch draf gaji dan penyetuju transfer harus dua akun berbeda (dual approval). Setiap perubahan angka tercatat di log audit yang tidak bisa diubah.",
      icon: KeyRound,
    },
    {
      title: "Kepatuhan Regulasi & Privasi",
      desc: "Arsitektur sistem dirancang selaras dengan Undang-Undang Pelindungan Data Pribadi (UU PDP). Standar tata kelola keamanan informasi mengacu pada kerangka ISO/IEC 27001.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="keamanan" className="w-full bg-navy text-on-navy py-16 md:py-20 border-b border-rule-navy">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        {/* Aturan Garis + Eyebrow Bernomor di atas Navy */}
        <div className="w-full border-t border-rule-navy mb-3" />
        <div className="font-mono text-[12px] font-medium tracking-[0.08em] uppercase text-emerald mb-2">
          04 / Keamanan & Kepatuhan
        </div>

        <h2 className="font-serif text-[28px] md:text-[36px] font-semibold text-on-navy leading-[1.2] max-w-3xl">
          Data gaji dilindungi berlapis.
        </h2>
        <p className="mt-3 text-[16px] text-on-navy-2 max-w-3xl leading-relaxed">
          Kerahasiaan nominal upah, nomor rekening, dan data perpajakan dijaga dengan standar teknis setara perbankan.
        </p>

        {/* Grid 3 Pilar Keamanan */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {securityPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-[8px] border border-rule-navy bg-navy-2/40 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-navy-2 border border-rule-navy text-emerald mb-4">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans text-[18px] font-semibold text-on-navy mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-[14px] text-on-navy-2 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Lencana Keamanan Standar */}
        <div className="mt-10 pt-8 border-t border-rule-navy">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SECURITY_BADGES.map((badge) => (
              <SecurityBadge key={badge.judul} item={badge} onNavy />
            ))}
          </div>
          <p className="mt-4 text-[12px] text-on-navy-3 font-mono">
            {/* ILUSTRATIF: wording selaras/mengacu digunakan sampai sertifikat audit resmi diterbitkan */}
            Lencana di atas mencerminkan prinsip arsitektur sistem dan kerangka standar kepatuhan.
          </p>
        </div>
      </div>
    </section>
  );
}
