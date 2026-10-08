# AGENTS.md — GajiKilat (Website 02)

> Dibaca PERTAMA oleh setiap AI agent. File ini memuat aturan wajib proyek (sebelumnya terpisah di `00-global-rules.md`, kini dilebur ke sini). Folder ini berdiri sendiri; tidak ada aturan lintas-website.

## 1. Misi
Bangun **website landing page** (promosi produk, persuasif, fokus konversi dan showcase fitur) untuk **GajiKilat**: sistem HRIS & payroll otomatis untuk **manufaktur, pabrik, ritel besar, dan korporasi (ratusan hingga ribuan karyawan)**.

Bukan aplikasi internal. Mockup di dalam halaman hanya alat peraga.

Bintang halaman: **payroll akurat, bebas salah hitung** + **kalkulator simulasi hemat waktu** di hero + **kalkulator gaji interaktif** (PPh 21 TER, BPJS, lembur dari absensi, potongan unpaid leave dari perizinan) di modul Gaji.

Gaya: **Fintech & Corporate Trust**. Mode terang, formal, navy `#0F172A` + emerald `#10B981`, tata letak 3 kolom, rapi seperti laporan keuangan. Detail di `docs/02-design-system.md`.

## 2. Urutan Baca & Prioritas
1. `docs/01-brief.md`: konteks, audiens, tujuan konversi, tone
2. `docs/06-anti-slop.md`: larangan "AI slop" (aturan keras, dibaca sebelum menulis kode apa pun)
3. `docs/02-design-system.md`: token, tipografi, layout, komponen, motion (SUMBER KEBENARAN visual)
4. `docs/04-modules.md`: spesifikasi hero, kalkulator, 5 modul, rumus & test vector
5. `docs/03-page-structure.md`: urutan section & copywriting
6. `docs/05-seo-og-quality.md`: metadata, OG, schema, aksesibilitas, performa, checklist, format laporan

Prioritas jika konflik: `AGENTS.md` > `06-anti-slop` > `02-design-system` > `04-modules` > `03-page-structure` > `05-seo-og-quality` > `01-brief`.

## 3. Format Produk
- Alur persuasi: Hero (janji + simulasi) → bukti → masalah → modul → cara kerja → keamanan → testimoni → harga → FAQ → CTA.
- CTA utama berulang ≥ 4× (navbar, hero, setelah modul, harga, penutup). Tombol WhatsApp melayang selalu tersedia.
- Setiap klaim fitur didukung visual mockup atau contoh angka nyata di halaman.

## 4. Lima Modul Wajib (semua sub-fitur harus terlihat)
| Modul | Peran di GajiKilat | Sub-fitur WAJIB |
|---|---|---|
| 💰 **Gaji** (bintang) | Pusat halaman. Menerima data dari modul lain | Kalkulasi otomatis · PPh 21 (TER) · BPJS Ketenagakerjaan & Kesehatan · Slip gaji digital · Reimbursement · Transfer bank instan |
| 📍 **Absensi** | Sumber data lembur | Clock-in/out · GPS geofencing · Shift kerja · Rekap kehadiran real-time · **Rekap lembur otomatis ke nominal gaji** |
| 📑 **Perizinan** | Sumber data cuti & potongan | Workflow approval cuti · Izin sakit · Lembur · Transparansi sisa cuti · **Cuti berbayar vs unpaid leave otomatis ke slip gaji** |
| 📝 **Exam** | Kualifikasi grade & keahlian | Assessment rekrutmen · Evaluasi kinerja · Uji kompetensi (**kenaikan grade gaji**, **level keahlian teknis**) · Proctoring |
| 📚 **Library** | Arsip legal & pengetahuan | **Arsip bukti potong 1721-A1** · **Kontrak kerja legal** · Knowledge base SOP · Modul e-learning |

Aturan:
- Nama modul persis: Gaji, Absensi, Perizinan, Exam, Library.
- Ikon Lucide: `Wallet`, `MapPin`, `CalendarCheck`, `ClipboardCheck`, `BookOpen`.
- **Integrasi adalah argumen jual**: Absensi dan Perizinan benar-benar mengubah angka di kartu Gaji lewat state bersama (lihat `04` §Alur Data).

## 5. Tech Stack (WAJIB)
- **Next.js (App Router) + React + TypeScript**
- **Tailwind CSS** (token dipetakan dari CSS variables ke tema)
- **`lucide-react`** (stroke 1.5) untuk semua ikon. **Satu-satunya pengecualian**: `ui/WhatsAppIcon.tsx` (glyph WhatsApp inline SVG) untuk tombol WhatsApp; ikon sertifikasi/keamanan memakai Lucide (`ShieldCheck`, `Lock`, dst.).
- Font via `next/font/google`: **Source Serif 4** (judul), **IBM Plex Sans** (body), **IBM Plex Mono** (angka).
- Library tambahan hanya yang perlu: `clsx`, `tailwind-merge`, dan `vitest` (devDependency, khusus unit test `payroll.ts` & `savings.ts`). **Tanpa** framer-motion/GSAP/chart library. Animasi = CSS.
- Proyek mandiri dengan `package.json` sendiri.

```
02-gajikilat/
├── AGENTS.md
├── docs/
├── package.json  next.config.ts  tsconfig.json  postcss.config.mjs  vitest.config.ts
├── public/favicon.svg
└── src/
    ├── app/
    │   ├── layout.tsx  page.tsx  globals.css
    │   ├── opengraph-image.tsx  sitemap.ts  robots.ts
    ├── assets/fonts/                # TTF untuk og:image (jangan fetch saat build)
    ├── components/
    │   ├── layout/    Navbar, Footer, WhatsAppButton
    │   ├── sections/  Hero, TrustStrip, ProblemSolution, Modules, HowItWorks,
    │   │              Security, Testimonials, Pricing, Faq, FinalCta
    │   ├── hero/      SavingsCalculator, SecurityPanel
    │   ├── modules/   PayrollDemoProvider, GajiCard, AbsensiCard, PerizinanCard,
    │   │              ExamCard, LibraryCard
    │   └── ui/        Button, Badge, Card, Reveal, Logo, SecurityBadge, WhatsAppIcon
    └── lib/
        ├── site.ts  schema.ts  data.ts
        ├── payroll.ts   payroll.test.ts     # fungsi murni: TER, BPJS, computePayroll
        ├── savings.ts   savings.test.ts     # fungsi murni: simulasi hemat waktu
        └── format.ts                        # rupiah(), jam(), persen()
```
Komponen interaktif memakai `"use client"`; selebihnya Server Component. **Seluruh rumus hidup di `lib/payroll.ts` dan `lib/savings.ts`**, bukan di komponen.

## 6. Aturan Mutlak
**DO**
- Warna hanya lewat token (CSS variables → Tailwind). Tidak ada hex di komponen.
- Konten **Bahasa Indonesia** formal-profesional. Istilah teknis (payroll, geofencing, batch) boleh Inggris.
- Semua angka di mockup berasal dari `payroll.ts`/`savings.ts` dan lolos test vector di `04`.
- Tombol WhatsApp kapsul di pojok kanan bawah (spesifikasi `02` §9).
- Hover, focus-visible, dan reduced-motion di setiap elemen interaktif.
- Data dummy realistis: nama Indonesia, Rupiah, WIB, kota industri (Cikarang, Karawang, Surabaya, Bandung, Jakarta).
- Tandai semua yang ilustratif: testimoni, angka bukti, nama klien, harga, **lencana sertifikasi/keamanan**, nomor WhatsApp, domain.

**DON'T**
- Semua larangan di `docs/06-anti-slop.md`.
- Tampilan aplikasi internal (sidebar, tabel CRUD penuh, login).
- Stock photo, `lorem ipsum`, `href="#"` kosong.
- Logo asli pihak lain: **logo bank, logo ISO/AICPA/lembaga sertifikasi, logo DJP/BPJS**. Lencana dibuat sendiri (perisai + teks).
- Klaim sertifikasi palsu (lihat `02` §8 dan `05` §9): teks lencana memakai "selaras/mengacu" sampai pemilik menyerahkan sertifikat asli.
- `aggregateRating`/`review` palsu di JSON-LD.

## 7. Kualitas Minimum
- `npm run build` sukses tanpa warning lint/type; `npm test` hijau.
- Lighthouse ≥ 90 (Performance, Accessibility, Best Practices, SEO).
- Responsif 375 / 768 / 1024 / 1440 tanpa scroll horizontal; WCAG 2.2 AA; hormati `prefers-reduced-motion`.
- SEO/OG lengkap: `title`, `description`, `canonical`, `og:*` (image 1200×630), Twitter card, JSON-LD (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`), `sitemap`, `robots`.
- Domain/URL, email, nomor WhatsApp: placeholder, satu tempat di `src/lib/site.ts`.

## 8. Alur Kerja Agent
1. Baca semua docs → ringkas pemahaman dalam 5 baris.
2. `npx create-next-app` (TypeScript, Tailwind, App Router, `src/`); pasang `lucide-react`, `clsx`, `tailwind-merge`, `vitest`. **Hapus semua aset/halaman bawaan template.**
3. Tulis `lib/payroll.ts`, `lib/savings.ts`, `lib/format.ts` + unit test dari test vector (`04`). Jangan lanjut sebelum hijau.
4. `globals.css` + tema Tailwind, `site.ts`, `data.ts`.
5. Kerangka `page.tsx` dengan semua section.
6. Hero + `SavingsCalculator`, lalu `PayrollDemoProvider` + 5 kartu modul (Gaji dahulu).
7. SEO: metadata, OG, JSON-LD, sitemap, robots.
8. Jalankan audit anti-slop (`06` §Audit otomatis), `npm run build`, `npm test`, checklist `05` §9.
9. Laporkan sesuai `05` §10.

## 9. Definition of Done
Build & test hijau, Lighthouse ≥ 90, lima modul lengkap dengan sub-fitur dan integrasi data bekerja, audit anti-slop bersih, metadata persis sesuai `05` §1, tombol WhatsApp berfungsi, seluruh item ilustratif ditandai dan dilaporkan.
