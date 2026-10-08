# 05 — SEO, OpenGraph, Schema, Aksesibilitas, Performa & Checklist Final

## 1. Sumber Data Tunggal — `src/lib/site.ts`
```ts
export const site = {
  name: "GajiKilat",
  url: "https://gajikilat.id",              // PLACEHOLDER: ganti dengan domain asli
  title: "GajiKilat - Sistem HRIS & Payroll Otomatis Bebas Salah Hitung",
  description:
    "Solusi penggajian cepat, akurat, dan patuh regulasi PPh 21 & BPJS untuk enterprise dan manufaktur.",
  locale: "id_ID",
  email: "halo@gajikilat.id",               // PLACEHOLDER
  whatsapp: "6281200000000",                // PLACEHOLDER: format internasional tanpa + atau 0 di depan
};
```
Title (61 karakter) dan description (98 karakter) **persis** seperti di atas; jangan diubah. Description ≤ 160 karakter.

## 2. Metadata Next.js (`src/app/layout.tsx`)
```ts
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", siteName: site.name, locale: site.locale, url: "/",
    title: site.title, description: site.description,
    // og:image otomatis dari src/app/opengraph-image.tsx
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};
export const viewport = { themeColor: "#0F172A" };
```
- `<html lang="id">` wajib.
- Wajib ada: `title`, `description`, `canonical`, `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`, Twitter card.

## 3. OG Image (`src/app/opengraph-image.tsx`)
- `ImageResponse` dari `next/og`, **1200×630**, `contentType = "image/png"`, `alt = "GajiKilat: slip gaji dengan PPh 21 dan BPJS dihitung otomatis"`.
- Desain: latar `--navy`; kiri wordmark GajiKilat + H `Payroll akurat. Bebas salah hitung.` (serif) + satu baris `PPh 21 · BPJS · Transfer bank`; kanan kartu putih berbentuk **slip gaji** dengan 5 baris rincian (angka dari `payroll.ts`, default Bagas: bruto 6.784.000, PPh 21 −84.800, BPJS TK −192.000, BPJS Kes −64.000, **bersih Rp 6.443.200**) dan garis ganda di atas total emerald. Tanpa gradien/glow.
- Font: simpan file TTF Source Serif 4 / IBM Plex di `src/assets/fonts/` dan baca lokal (`fs`/`import`), **bukan fetch jaringan saat build**.
- Periksa `/opengraph-image` di browser: teks tidak terpotong, kontras terbaca.

## 4. Schema Markup (JSON-LD) — `src/lib/schema.ts` + `page.tsx`
Satu `@graph` lewat `<script type="application/ld+json">`:
- `Organization` (name, url, logo, email)
- `WebSite` (name, url, inLanguage `id-ID`)
- `SoftwareApplication` (name, `applicationCategory: "BusinessApplication"`, `operatingSystem: "Web"`, description, `featureList` = **seluruh sub-fitur 5 modul** termasuk PPh 21 TER, BPJS, transfer bank, lembur → gaji, unpaid leave → slip, arsip 1721-A1, kontrak legal; **tanpa `offers`** selama harga placeholder)
- `FAQPage` dibangun dari data FAQ yang sama dengan komponen

Tanpa `aggregateRating`/`review`.

## 5. Sitemap & Robots
- `sitemap.ts`: halaman utama (`lastModified`, `changeFrequency: "monthly"`, `priority: 1`).
- `robots.ts`: izinkan semua, tunjuk `sitemap`.

## 6. HTML Semantik
- Satu `<h1>`; heading berurutan. Landmark: `<header>`, `<nav aria-label="Utama">`, `<main>`, `<section aria-labelledby>`, `<footer>`.
- Tautan "Lewati ke konten" di paling atas. `next/link` untuk tautan internal.
- Tabel rincian gaji memakai markup yang benar (`<dl>` atau `<table>` dengan `<th scope>`), bukan `div` murni, agar terbaca screen reader.

## 7. Aksesibilitas (WCAG 2.2 AA)
- Kontras sesuai `02` §2 (emerald-700 untuk teks di terang, teks navy di atas fill emerald).
- Seluruh interaksi bisa dengan keyboard; focus ring terlihat; slider dapat diatur panah; input punya `<label>`.
- Mockup dekoratif `aria-hidden="true"`; bagian interaktif punya role/label benar. Hasil kalkulator dalam `aria-live="polite"` (throttle).
- Status tidak hanya warna (selalu ikon/teks). Target sentuh ≥ 44×44px (termasuk tombol WhatsApp). Hormati `prefers-reduced-motion`.

## 8. Performa (Lighthouse ≥ 90 semua kategori)
- Server Components default; `"use client"` hanya untuk kalkulator & kartu modul; `dynamic()` untuk kartu di bawah lipatan (Exam, Library, Perizinan).
- Tanpa gambar raster; SVG/JSX. Ikon Lucide per-ikon. Font via `next/font` (`display: swap`) hanya weight yang dipakai.
- CLS < 0.05: dimensi pasti pada kartu/mockup (min-height), termasuk panel slip dan hasil transfer.
- Tanpa `backdrop-filter`. Animasi hanya `transform`/`opacity`/warna.
- `npm run build` dan `npm test` bersih tanpa warning.

## 9. Checklist Final (agent wajib mencentang semua)

**Format & Konten**
- [ ] Terasa seperti landing page promosi (bukan dashboard); alur persuasi lengkap
- [ ] CTA `Jadwalkan Demo` muncul ≥ 5×; tombol WhatsApp kapsul tampil di pojok kanan bawah dan membuka `wa.me` dengan teks awal
- [ ] Teks Bahasa Indonesia; tanpa lorem ipsum / `href="#"` kosong
- [ ] Testimoni, angka bukti, klien, harga, lencana keamanan, nomor WA, domain: ditandai ilustratif di kode **dan** dilaporkan

**5 Modul Wajib (semua sub-fitur terlihat)**
- [ ] Gaji: Kalkulasi otomatis · PPh 21 TER · BPJS TK & Kesehatan · Slip digital · Reimbursement · Transfer bank
- [ ] Absensi: Clock-in/out · GPS geofencing · Shift kerja · Rekap real-time · Rekap lembur → Gaji
- [ ] Perizinan: Approval cuti · Izin sakit · Lembur · Sisa cuti · Berbayar vs unpaid → slip
- [ ] Exam: Rekrutmen · Kinerja · Kompetensi (Grade & Teknis) · Proctoring
- [ ] Library: Bukti potong 1721-A1 · Kontrak legal · SOP · E-learning

**Integritas Angka**
- [ ] `npm test` hijau: semua test vector `04` (payroll 7 baris, savings 3 baris)
- [ ] Tidak ada angka rupiah hardcoded di JSX yang seharusnya hasil hitung
- [ ] Alur data diuji manual: setujui Lembur → 14 jam → Bagas bersih `Rp 6.506.400`; setujui Cuti Tidak Dibayar → `Rp 6.301.760`; slip sinkron
- [ ] Kalkulator hero: 500 karyawan / 15 mnt / Rp 50.000 → `Rp 73.700.000` per tahun
- [ ] Penyederhanaan rumus tercatat sebagai komentar kode dan di laporan

**Desain & Anti-Slop**
- [ ] Semua warna dari token; konsisten dengan `02-design-system.md`
- [ ] Audit otomatis `06` §Audit bersih; semua pertanyaan "uji anti-slop" terjawab
- [ ] Hanya `lucide-react` + `WhatsAppIcon`; tidak ada logo bank/lembaga sertifikasi asli
- [ ] Teks di atas emerald = navy; teks emerald di atas terang = emerald-700 (verifikasi kontras dengan skrip)

**SEO & OG**
- [ ] `title` & `description` persis sesuai §1
- [ ] `canonical`, `og:*`, `twitter:*` lengkap; `og:image` 1200×630 tampil
- [ ] JSON-LD valid (Organization, WebSite, SoftwareApplication, FAQPage)
- [ ] `sitemap.xml` dan `robots.txt` tersedia

**Teknis**
- [ ] `npm run build` sukses; tanpa error console
- [ ] Responsif 375/768/1024/1440 tanpa scroll horizontal; kapsul WhatsApp tidak menutup kontrol di 375px
- [ ] Hover, focus-visible, reduced-motion di semua elemen interaktif
- [ ] Lighthouse ≥ 90 (Performance, Accessibility, Best Practices, SEO)

## 10. Format Laporan Akhir Agent
1. **Selesai**: daftar fitur/halaman/file penting.
2. **Asumsi**: domain, email, nomor WA placeholder; angka bukti/testimoni/klien/harga ilustratif; logo dan lencana buatan sendiri; CTA primer `Jadwalkan Demo`.
3. **Penyederhanaan rumus**: daftar (a)–(d) dari `04` §Rumus Payroll.
4. **Skor**: hasil Lighthouse (atau alasan jika tidak bisa dijalankan) + hasil `npm test`.
5. **Perlu keputusan pemilik**: verifikasi rumus PPh 21/BPJS oleh konsultan pajak; bukti sertifikasi asli sebelum mengubah wording lencana; klaim teknis keamanan (AES-256, TLS 1.3, dual approval, log audit); klaim layanan (migrasi paralel, transfer instan dan bank mitra); domain asli, nomor WhatsApp, harga final; halaman Kebijakan Privasi & Syarat Layanan; data & klien asli.
