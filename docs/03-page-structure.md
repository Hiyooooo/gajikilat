# 03 — Struktur Halaman & Copywriting

Satu halaman (`src/app/page.tsx`), single scroll. **Urutan section tetap.** Setiap section = satu komponen di `components/sections/`. Setiap section diawali garis 1px `--ink` + eyebrow bernomor (`02-design-system.md` §4).

Perubahan dari template sebelumnya: ditambah section **Keamanan & Kepatuhan** (wajib untuk audiens enterprise), tombol WhatsApp melayang, hero 3 kolom.

## Peta Section & Ritme Latar
| # | Section | Latar |
|---|---|---|
| 1 | Navbar | paper |
| 2 | Hero 3 kolom (copy · kalkulator hemat waktu · panel keamanan) | navy |
| 3 | Strip Bukti (angka + klien fiktif) | canvas |
| 4 | Masalah → Solusi | paper |
| 5 | **Modul** (id `modul`) | canvas |
| 6 | Cara Kerja (id `cara-kerja`) | paper |
| 7 | Keamanan & Kepatuhan (id `keamanan`) | navy |
| 8 | Testimoni | canvas |
| 9 | Paket & Harga (id `harga`) | paper |
| 10 | FAQ (id `faq`) | canvas |
| 11 | CTA Penutup | navy |
| 12 | Footer | navy-950 |
| — | Tombol WhatsApp kapsul (fixed, di luar alur) | — |

CTA primer `Jadwalkan Demo` muncul di: navbar, hero, setelah modul, harga, CTA penutup (≥ 5×). Tautan `Jadwalkan Demo` → `mailto:${site.email}?subject=Jadwalkan%20Demo%20GajiKilat` (placeholder). Tautan WhatsApp → `wa.me` (placeholder).

---

## 1. Navbar
- Kiri: Logo (`Link` ke `/`). Tengah (desktop): `Modul` · `Cara Kerja` · `Keamanan` · `Harga` · `FAQ` (anchor smooth-scroll).
- Kanan: sekunder `Hitung Simulasi` (→ `#simulasi`), primer `Jadwalkan Demo`.
- Mobile: tombol `Menu`/`X` → panel penuh, focus trap, Esc menutup. Tombol ≥ 44px.

## 2. Hero (3 kolom, `id="simulasi"` pada kolom kalkulator)
Grid 12 kolom desktop: **kolom 1 (4)** copy · **kolom 2 (5)** kalkulator hemat waktu · **kolom 3 (3)** panel keamanan. Tablet (768–1023): copy penuh, lalu kalkulator (7) + panel (5). Mobile: tumpuk (copy → kalkulator → panel).

**Kolom 1: Copy**
- Eyebrow (mono): `HRIS & Payroll · 200 – 5.000 karyawan`
- H1: **Payroll akurat. Bebas salah hitung.**
- Sub (≤ 2 kalimat): `PPh 21 dan BPJS dihitung otomatis dari data absensi dan perizinan, lalu diperiksa sebelum transfer. Tidak ada rekap lembur yang diketik ulang.`
- CTA: primer `Jadwalkan Demo` · sekunder `Lihat Alur Payroll` (→ `#modul`).
- Catatan mikro: `Demo dengan data contoh perusahaan Anda · Tanpa kewajiban berlangganan`
- Tiga butir bukti kecil (ikon Lucide + teks 13px): `Check` TER PMK 168/2023 · `Check` BPJS Ketenagakerjaan & Kesehatan · `Check` Transfer bank dari satu batch.

**Kolom 2: Kalkulator Hemat Waktu** (`SavingsCalculator`, spesifikasi `04` §0). Kartu putih di atas navy, tanpa rotasi/efek.

**Kolom 3: Panel Keamanan** (`SecurityPanel`): judul `Keamanan data penggajian` + 4 `SecurityBadge` (`02` §8) tersusun vertikal + satu baris `Lihat detail keamanan →` (→ `#keamanan`). Di atas navy: border `--rule-navy`, teks `--on-navy`.

## 3. Strip Bukti
Empat angka dalam kolom dengan pemisah vertikal (mono besar, label 13px di bawah), lalu satu baris 5 nama perusahaan **fiktif** (wordmark teks abu `--ink-3`, tanpa logo):
- `120+` perusahaan manufaktur & ritel · `350 rb+` slip gaji per bulan · `0` input ulang lembur & izin · `1 klik` hitung payroll satu batch
- Klien fiktif: `Sinar Logam Nusantara` · `Mitra Ritel Bersama` · `Tekstil Cahaya Pratama` · `Karya Pangan Utama` · `Baja Mandiri Perkasa`
- Komentar kode wajib: `{/* ILUSTRATIF: ganti dengan data & klien asli. Pastikan nama tidak menyerupai perusahaan nyata */}`

## 4. Masalah → Solusi
- Eyebrow `01 / Masalah`. H2: **Selisih kecil di payroll jadi komplain besar.**
- Tiga kolom "Sebelum / Sesudah" dalam bentuk tabel dua baris (bukan kartu ikon-lingkaran). Setiap kolom: judul masalah, baris `Sebelum`, baris `Sesudah`, dan satu angka/contoh konkret:
  1. `Lembur direkap dari absensi lewat Excel` → `Jam lembur tercatat otomatis dan masuk ke komponen gaji` · contoh: `12 jam × Rp 32.000 = Rp 384.000`
  2. `PPh 21 dan BPJS dihitung terpisah` → `Dihitung dari satu tabel aturan, hasilnya diperiksa sebelum transfer` · contoh: `PPh 21 Rp 84.800 · BPJS Rp 256.000`
  3. `Bukti potong dan kontrak tercecer` → `Arsip 1721-A1 dan kontrak tersimpan per karyawan, bisa dicari` · contoh: `Cari "Bagas" → 2 dokumen`
- Penutup 1 kalimat + tautan teks `Lihat alurnya langsung ↓` (→ `#modul`).

## 5. Section Modul (id `modul`)
- Eyebrow `02 / Modul`. H2: **Lima modul, satu sumber data.**
- Sub: `Absensi dan Perizinan mengubah angka di Gaji secara langsung. Coba sendiri di bawah.`
- Isi: grid 3 kolom, 5 kartu, masing-masing menampilkan **seluruh sub-fitur** (`04`). Kartu Gaji besar. Tombol `Reset Demo` di kanan atas section.

```
┌─────────────────────────────┬──────────────┐
│ GAJI  (2 kolom × 2 baris)   │ ABSENSI      │
│ kalkulator interaktif       │ (1 kol ×     │
│                             │  2 baris)    │
├──────────────┬──────────────┼──────────────┤
│ PERIZINAN    │ EXAM         │ LIBRARY      │
└──────────────┴──────────────┴──────────────┘
```
Tablet: 2 kolom (Gaji penuh; Absensi + Perizinan; Exam + Library). Mobile: 1 kolom urut Gaji → Absensi → Perizinan → Exam → Library.
- CTA di bawah grid: primer `Jadwalkan Demo`, sekunder tautan `Tanya lewat WhatsApp`.

## 6. Cara Kerja (id `cara-kerja`)
- Eyebrow `03 / Cara Kerja`. H2: **Dari data mentah ke transfer, dalam tiga langkah.** Tiga kolom bernomor mono `01 02 03`, dipisah garis vertikal:
  1. `Hubungkan data` — Impor karyawan dan komponen gaji dari CSV/Excel. Atur shift, geofence, dan aturan cuti.
  2. `Periksa hasil hitung` — Pratinjau seluruh batch: PPh 21, BPJS, lembur, potongan unpaid. Selisih ditandai sebelum disetujui.
  3. `Setujui dan transfer` — Persetujuan berlapis, transfer ke rekening bank karyawan, slip gaji terkirim digital.
- Satu catatan di bawah: `Migrasi dari sistem lama dapat dijalankan paralel selama satu siklus gaji.` (klaim layanan → tandai untuk konfirmasi pemilik)

## 7. Keamanan & Kepatuhan (id `keamanan`, latar navy)
- Eyebrow `04 / Keamanan`. H2: **Data gaji dilindungi berlapis.**
- Tiga kolom:
  1. **Enkripsi** — `Data tersimpan dienkripsi AES-256. Data dalam perjalanan memakai TLS 1.3. Nomor rekening disamarkan di antarmuka.`
  2. **Akses & audit** — `Akses per peran. Pembuat batch gaji dan penyetuju harus orang berbeda. Setiap perubahan gaji tercatat: siapa, kapan, nilai sebelum dan sesudah.`
  3. **Kepatuhan** — `Dirancang sesuai UU Pelindungan Data Pribadi. Pengelolaan keamanan informasi selaras ISO/IEC 27001.`
- Baris 4 `SecurityBadge` di bawah. Komentar kode wajib sesuai `02` §8. **Semua klaim teknis di section ini ditandai "konfirmasi tim engineering/legal" di laporan akhir.**

## 8. Testimoni
3 kartu putih (berurutan, tinggi sama): kutipan 1–2 kalimat berisi hasil konkret, nama, jabatan, perusahaan **fiktif**. Wajib ditandai ilustratif.
- `Dewi Anggraini, Manajer Payroll, Sinar Logam Nusantara` — "Rekap lembur 1.800 operator dulu memakan tiga hari. Sekarang angka lembur sudah ada di draf gaji sebelum rapat pagi."
- `Hendra Wijaya, Direktur Keuangan, Mitra Ritel Bersama` — "Komplain selisih BPJS di slip hampir hilang. Kami melihat hitungannya sebelum transfer, bukan sesudah ada protes."
- `Rani Putri, Kepala HR, Tekstil Cahaya Pratama` — "Cuti tidak dibayar langsung memotong gaji di bulan yang tepat. Tidak ada lagi koreksi manual di akhir bulan."
- Komentar kode: `{/* ILUSTRATIF: ganti dengan testimoni asli yang sudah disetujui */}`. Tanpa foto; avatar inisial persegi 40px.

## 9. Paket & Harga (id `harga`, ilustratif)
3 kartu sama tinggi: `Bisnis` (hingga 500 karyawan), `Enterprise` (disorot; badge `Paling Dipilih`; 500–2.000), `Korporasi` (2.000+). Harga per karyawan/bulan **placeholder**: `Rp 18.000`, `Rp 14.000`, `Hubungi kami`. Daftar modul termasuk (ikon `Check`), CTA `Jadwalkan Demo`.
- Bisnis: Gaji, Absensi, Perizinan. Enterprise: + Exam, Library, transfer bank massal. Korporasi: + multi-entitas, SLA khusus, dukungan implementasi.
- Catatan di bawah: `Harga ilustratif. Konfirmasi dengan pemilik sebelum rilis.` Tidak boleh menyertakan `offers` di JSON-LD.

## 10. FAQ (id `faq`)
Akordeon aksesibel (`button` + `aria-expanded` + `aria-controls`), 7 pertanyaan. Data di `data.ts`, dipakai juga oleh JSON-LD.
1. **Bagaimana PPh 21 dihitung?** Sistem memakai tarif efektif rata-rata (TER) bulanan sesuai PMK 168/2023, lalu penghitungan ulang di masa pajak terakhir sesuai ketentuan. Tabel dapat diperbarui bila regulasi berubah. Kasus khusus tetap perlu dikonfirmasi dengan konsultan pajak Anda.
2. **Bagaimana iuran BPJS dihitung?** Iuran BPJS Ketenagakerjaan dan Kesehatan dihitung dari upah dengan batas sesuai ketentuan. Porsi karyawan dipotong dari gaji; porsi perusahaan dicatat terpisah di laporan.
3. **Seberapa cepat transfer sampai ke rekening karyawan?** Setelah batch disetujui, instruksi dikirim ke bank. Waktu tiba mengikuti kanal dan jam operasional bank. Rincian bank mitra dikonfirmasi saat implementasi.
4. **Bagaimana lembur dan cuti masuk ke gaji?** Lembur dari absensi dan potongan unpaid leave dari perizinan yang sudah disetujui langsung masuk komponen gaji periode berjalan. Perubahan setelah tanggal cut-off tercatat sebagai penyesuaian bulan berikutnya.
5. **Apakah data karyawan aman?** Data dienkripsi, akses dibatasi per peran, dan setiap perubahan gaji tercatat di log audit. Detail di bagian Keamanan.
6. **Bisakah memindahkan data dari sistem lama untuk ribuan karyawan?** Bisa lewat CSV/Excel dengan pemetaan komponen gaji. Kami menyarankan satu siklus paralel untuk membandingkan hasil sebelum beralih penuh.
7. **Bagaimana proses mulai dan berapa biayanya?** Mulai dari demo dengan data contoh, lalu pilot. Harga per karyawan per bulan menyesuaikan jumlah karyawan dan modul. Hubungi tim kami untuk penawaran.

## 11. CTA Penutup (navy)
- H2: **Jalankan satu siklus payroll dengan data Anda.**
- Sub: `Jadwalkan demo. Kami hitung contoh payroll Anda dan tunjukkan hasilnya baris demi baris.`
- Tombol: primer `Jadwalkan Demo` + sekunder `Chat WhatsApp`.

## 12. Footer (navy-950)
- Logo + tagline `Payroll akurat untuk perusahaan besar.`
- Kolom: **Produk** (5 modul, anchor ke `#modul`), **Perusahaan** (`Keamanan` → `#keamanan`, `Kontak` → `mailto:`), **Legal** (Kebijakan Privasi, Syarat Layanan → `mailto:legal@gajikilat.id?subject=...` placeholder; **laporkan: halaman legal asli belum ada**).
- `© 2026 GajiKilat. Seluruh hak dilindungi.` + catatan 13px: `Simulasi di situs ini bersifat ilustratif dan bukan nasihat pajak.`
- Tanpa `href="#"` kosong.

## Aturan Copywriting
- Judul ≤ 9 kata. Deskripsi kartu ≤ 22 kata. Mulai dengan fakta atau kata kerja.
- Tanda "—" di dokumen ini hanya pemisah antara judul dan isi dalam spesifikasi. Jangan ikut ditulis di halaman; pakai titik dua atau pisahkan jadi dua elemen.
- Setiap klaim akurasi disertai mekanisme atau angka. Aturan lengkap, daftar kata terlarang, dan uji copy: `06-anti-slop.md`.
- Data dummy: Bagas Pratama, Fajar Nugroho, Dewi Anggraini, Rani Putri, Hendra Wijaya; kota Cikarang, Karawang, Surabaya, Bandung, Jakarta; `Rp`, `WIB`.
