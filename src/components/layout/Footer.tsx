import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="w-full bg-navy-950 text-on-navy-3 border-t border-rule-navy">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
          {/* Kolom 1: Brand & Tagline */}
          <div className="md:col-span-1 flex flex-col">
            <Logo onNavy />
            <p className="mt-4 text-[14px] leading-relaxed text-on-navy-2">
              Payroll akurat untuk perusahaan besar.
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-on-navy-3">
              Mencegah salah hitung PPh 21 dan BPJS untuk industri manufaktur dan ritel.
            </p>
          </div>

          {/* Kolom 2: Produk / Modul */}
          <div className="flex flex-col">
            <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-on-navy">
              Produk & Modul
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-[14px]">
              <li>
                <a
                  href="#modul"
                  className="hover:text-on-navy transition-colors focus-visible:outline-2 focus-visible:outline-emerald rounded-[4px]"
                >
                  Modul Gaji (Payroll)
                </a>
              </li>
              <li>
                <a
                  href="#modul"
                  className="hover:text-on-navy transition-colors focus-visible:outline-2 focus-visible:outline-emerald rounded-[4px]"
                >
                  Modul Absensi & Shift
                </a>
              </li>
              <li>
                <a
                  href="#modul"
                  className="hover:text-on-navy transition-colors focus-visible:outline-2 focus-visible:outline-emerald rounded-[4px]"
                >
                  Modul Perizinan & Cuti
                </a>
              </li>
              <li>
                <a
                  href="#modul"
                  className="hover:text-on-navy transition-colors focus-visible:outline-2 focus-visible:outline-emerald rounded-[4px]"
                >
                  Modul Exam & Kompetensi
                </a>
              </li>
              <li>
                <a
                  href="#modul"
                  className="hover:text-on-navy transition-colors focus-visible:outline-2 focus-visible:outline-emerald rounded-[4px]"
                >
                  Modul Library & Arsip
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Perusahaan */}
          <div className="flex flex-col">
            <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-on-navy">
              Perusahaan
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-[14px]">
              <li>
                <a
                  href="#cara-kerja"
                  className="hover:text-on-navy transition-colors focus-visible:outline-2 focus-visible:outline-emerald rounded-[4px]"
                >
                  Cara Kerja
                </a>
              </li>
              <li>
                <a
                  href="#keamanan"
                  className="hover:text-on-navy transition-colors focus-visible:outline-2 focus-visible:outline-emerald rounded-[4px]"
                >
                  Keamanan & Kepatuhan
                </a>
              </li>
              <li>
                <a
                  href="#harga"
                  className="hover:text-on-navy transition-colors focus-visible:outline-2 focus-visible:outline-emerald rounded-[4px]"
                >
                  Paket & Harga
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent("Pertanyaan Produk GajiKilat")}`}
                  className="hover:text-on-navy transition-colors focus-visible:outline-2 focus-visible:outline-emerald rounded-[4px]"
                >
                  Kontak Tim
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Legal & Kepatuhan */}
          <div className="flex flex-col">
            <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-on-navy">
              Legal & Ketentuan
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-[14px]">
              {/* ILUSTRATIF: halaman legal asli belum ada, diarahkan ke email legal */}
              <li>
                <a
                  href={`mailto:legal@gajikilat.id?subject=${encodeURIComponent("Permintaan Kebijakan Privasi")}`}
                  className="hover:text-on-navy transition-colors focus-visible:outline-2 focus-visible:outline-emerald rounded-[4px]"
                >
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a
                  href={`mailto:legal@gajikilat.id?subject=${encodeURIComponent("Permintaan Syarat Layanan")}`}
                  className="hover:text-on-navy transition-colors focus-visible:outline-2 focus-visible:outline-emerald rounded-[4px]"
                >
                  Syarat Layanan
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-on-navy transition-colors focus-visible:outline-2 focus-visible:outline-emerald rounded-[4px]"
                >
                  FAQ Regulasi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Baris Bawah: Hak Cipta & Catatan Legal */}
        <div className="mt-12 pt-8 border-t border-rule-navy flex flex-col md:flex-row items-center justify-between gap-4 text-[13px]">
          <div>
            &copy; 2026 {site.name}. Seluruh hak dilindungi.
          </div>
          <div className="text-on-navy-3 text-center md:text-right">
            Simulasi di situs ini bersifat ilustratif dan bukan nasihat pajak.
          </div>
        </div>
      </div>
    </footer>
  );
}
