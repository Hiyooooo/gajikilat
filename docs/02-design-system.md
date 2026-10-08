# 02 — Design System (SUMBER KEBENARAN VISUAL)

Gaya: **Fintech & Corporate Trust**. Terang, formal, rata, presisi. Terasa seperti laporan keuangan dan slip gaji, bukan seperti landing page SaaS generik. Kepercayaan datang dari ketertiban: garis tipis, kolom angka rata kanan, tipografi serif, dan nol efek dekoratif.

## 1. Identitas (ringkas)
| Sumbu | Keputusan |
|---|---|
| Mode | Terang. Pita navy untuk hero, keamanan, CTA, footer |
| Warna | Navy `#0F172A` + Emerald `#10B981` (emerald = akurasi/uang masuk) |
| Font | Source Serif 4 (judul) · IBM Plex Sans (body) · IBM Plex Mono (angka) |
| Bentuk | Radius kecil (8/6px), border 1px, tanpa blur/glow/gradien |
| Layout | Grid 12 kolom dengan **3 kolom formal** sebagai pola utama |
| Motion | Nyaris statis: fade 200ms, tween angka, akordeon. Nol animasi looping |
| Metafora visual | Buku besar / slip gaji: aturan garis, baris rincian, angka mono |

## 2. Token Warna (`:root` di `src/app/globals.css`)
```css
:root {
  /* Permukaan */
  --paper:   #FFFFFF;      /* kartu, halaman putih */
  --canvas:  #F8FAFC;      /* latar section alternatif */
  --band:    #F1F5F9;      /* baris tabel genap, footer kartu (jangan untuk teks --ink-3) */
  --navy:    #0F172A;      /* pita gelap: hero, keamanan, CTA */
  --navy-2:  #1E293B;      /* kartu/elemen di atas navy */
  --navy-950:#0A0F1D;      /* footer */

  /* Garis */
  --rule:      #E2E8F0;    /* garis dekoratif / pemisah */
  --rule-2:    #CBD5E1;    /* garis kartu penting */
  --control:   #64748B;    /* border input/slider (≥3:1) */
  --rule-navy: rgba(255,255,255,.14);

  /* Teks di atas terang */
  --ink:    #0F172A;       /* judul (17,9:1 di putih) */
  --ink-2:  #334155;       /* body (10,4:1) */
  --ink-3:  #64748B;       /* meta (4,76:1 putih; 4,55:1 canvas). JANGAN di --band */
  /* Teks di atas navy */
  --on-navy:   #F8FAFC;
  --on-navy-2: #CBD5E1;    /* 12:1 */
  --on-navy-3: #94A3B8;    /* 6,96:1 */

  /* Emerald */
  --emerald:     #10B981;  /* FILL saja: tombol, bar, titik. Teks di atasnya = --navy (7,04:1) */
  --emerald-600: #059669;  /* hover tombol (navy di atasnya 4,74:1) */
  --emerald-700: #047857;  /* TEKS & ikon emerald di atas terang (5,48:1), fokus ring */
  --emerald-50:  #ECFDF5;  /* latar badge/baris sorot */
  --emerald-100: #D1FAE5;

  /* Status (selalu dengan ikon/teks, bukan warna saja) */
  --warn: #B45309;  --warn-bg: #FEF3C7;   /* 4,51:1 */
  --danger: #B91C1C; --danger-bg: #FEE2E2; /* 5,30:1 */

  /* Pihak ketiga */
  --wa-green: #25D366;     /* hanya glyph WhatsApp di atas --navy (9:1) */
}
```
**Aturan warna (keras)**
- **Dilarang teks putih di atas `--emerald`** (2,54:1, gagal). Tombol emerald = teks navy.
- **Dilarang teks `--emerald` di atas putih** (2,54:1). Gunakan `--emerald-700`.
- Emerald ≤ ±10% area layar. Fungsinya: tombol primer, indikator "benar/sinkron", batang progres, angka hasil penting.
- Tidak ada gradien sama sekali. Tidak ada ungu/pink/biru-ungu. Biru bukan warna situs ini.
- Hex hanya di `globals.css`. Komponen memakai utilitas token (`bg-paper`, `text-ink-2`, `border-rule`, `bg-emerald`, `text-emerald-700`, `bg-navy`).
- Kontras: body ≥ 4.5:1, teks besar & elemen UI ≥ 3:1. Verifikasi dengan skrip saat selesai.

## 3. Tipografi
| Peran | Font | Desktop / Mobile | Weight | Tracking | LH |
|---|---|---|---|---|---|
| H1 hero | Source Serif 4 | 44 / 32 px | 600 | -0.015em | 1.1 |
| H2 section | Source Serif 4 | 36 / 28 px | 600 | -0.01em | 1.2 |
| H3 judul kartu | IBM Plex Sans | 18 / 17 px | 600 | 0 | 1.3 |
| Body | IBM Plex Sans | 16 px | 400 | 0 | 1.6 |
| Kecil / meta | IBM Plex Sans | 13 px | 500 | 0.01em | 1.45 |
| Eyebrow bernomor | IBM Plex Mono | 12 px uppercase | 500 | 0.08em | 1.2 |
| Angka, Rupiah, jam | IBM Plex Mono | konteks | 500 | -0.01em | 1.2 |

- `font-variant-numeric: tabular-nums` pada semua angka. Kolom angka **rata kanan**.
- Eyebrow selalu bernomor seperti bagian laporan: `01 / Modul`, `02 / Cara Kerja`.
- Judul dan teks rata kiri. **Tidak ada layout hero rata tengah.**
- `next/font`: Source Serif 4 (600), IBM Plex Sans (400, 500, 600), IBM Plex Mono (500). `display: swap`.

## 4. Spacing, Radius, Layout
- Skala spacing: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.
- Container `max-width: 1200px`, gutter sisi 20 (mobile) / 32 (desktop).
- Section padding vertikal: 80 desktop / 56 mobile (padat, bukan renggang).
- Radius: kartu **8px**, elemen dalam **6px**, tombol **6px**, badge **4px**. Pil 999px **hanya** tombol WhatsApp, avatar, dan titik status.
- **Grid 3 kolom formal**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, gap 24. Hero memakai 12 kolom dengan pembagian 4/5/3. Setiap section memakai kelipatan 3 kolom; tidak ada layout asimetris acak.
- **Aturan garis**: setiap section diawali garis 1px `--ink` selebar container dengan eyebrow bernomor di bawahnya (seperti kepala bagian laporan).
- Pemisah antar kolom pada strip bukti: garis vertikal 1px `--rule`.

## 5. Komponen
**Card (`ui/Card.tsx`)**
```css
.card { background: var(--paper); border: 1px solid var(--rule-2); border-radius: 8px;
        box-shadow: 0 1px 2px rgba(15,23,42,.06); }
.card__head { padding: 12px 20px; border-bottom: 1px solid var(--rule);
              display:flex; justify-content:space-between; align-items:center; }  /* label modul mono + status */
.card__body { padding: 20px 24px; }
.card__foot { padding: 12px 20px; border-top: 1px solid var(--rule); background: var(--canvas); } /* chip sub-fitur */
```
- Tanpa hover-lift, tanpa spotlight, tanpa blur. Kartu non-interaktif tidak berubah saat hover. Elemen interaktif di dalamnya punya state sendiri.
- Judul kartu: ikon Lucide 20px `--emerald-700` + label mono `GAJI` di kepala kartu, H3 manfaat di badan.

**Tombol** (tinggi 44px, radius 6, teks 15px/600)
- Primer: bg `--emerald`, teks `--navy`; hover bg `--emerald-600`; active turun 0 (tanpa transform).
- Sekunder: bg `--paper`, border 1px `--ink`, teks `--ink`; hover bg `--canvas`. Di atas navy: transparan, border `--rule-navy` → `--on-navy-2`, teks `--on-navy`.
- Tautan teks: `--emerald-700` + underline 1px offset 3px. Di atas navy: `--emerald`.
- Fokus: `outline: 2px solid var(--emerald-700); outline-offset: 2px;` (di atas navy: `--emerald`).

**Badge/chip sub-fitur**: bg `--emerald-50`, border 1px `--emerald-100`, teks `--emerald-700`, 12px/600, radius 4, padding 4×8, ikon Lucide 14px.
**Badge status**: sukses (emerald-50/emerald-700 + `Check`), peringatan (warn-bg/warn + `AlertTriangle`), bahaya (danger-bg/danger + `XCircle`).
**Input/slider/select (di mockup)**: bg `--paper`, border 1px `--control`, radius 6, tinggi 44; fokus ring emerald-700. Slider: track `--rule-2`, bagian terisi `--emerald`, thumb 20px `--navy` dengan ring putih.
**Tabel rincian (pola utama)**: baris `label ........ angka` dengan **leader titik** (`border-bottom: 1px dotted var(--rule-2)` pada elemen penengah), angka mono rata kanan, subtotal dengan garis atas 1px `--ink` dan weight 600, total dengan garis ganda (`border-top: 3px double var(--ink)`).
**Navbar**: sticky, 64px, bg `--paper`, border bawah 1px `--rule`. **Tanpa blur/transparansi.**

## 6. Motion (hampir statis)
- Durasi: 120ms (warna/border), 200ms (fade, akordeon), 400ms (tween angka). Easing `cubic-bezier(.2,0,0,1)`.
- Diizinkan: (a) fade-in sekali 200ms saat masuk viewport (`Reveal`, **tanpa translate, tanpa stagger**), (b) tween angka saat input berubah, (c) sorot baris yang berubah (`--emerald-50` memudar 1 detik, sekali), (d) akordeon, (e) spinner tombol saat `Hitung Ulang` (600ms, sekali), (f) jam berjalan per detik di Absensi (data, bukan animasi).
- **Nol animasi looping/infinite.** Tidak ada pulse, bounce, marquee.
- `@media (prefers-reduced-motion: reduce)`: matikan fade, tween, sorot; tampilkan state akhir langsung.
- Timer hanya jalan saat kartu terlihat (IntersectionObserver) dan berhenti saat tab tersembunyi (`visibilitychange`).

## 7. Ikonografi & Logo
- Ikon **hanya `lucide-react`**: `strokeWidth={1.5}`, 16–24px, `currentColor`, import per-ikon. Pengecualian tunggal: `WhatsAppIcon`.
- Ikon **tidak** ditaruh di dalam lingkaran/kotak berwarna sebagai dekorasi kartu. Ikon berdiri sendiri, sejajar teks.
- Logo: wordmark `GajiKilat` (Source Serif 4, 600) + simbol buatan sendiri: persegi navy radius 6px berisi garis kilat bersudut emerald (polyline 3 titik, **bukan ikon `Zap` Lucide**). Komponen `ui/Logo.tsx`; simpan juga `public/favicon.svg`.

## 8. Lencana Keamanan & Sertifikasi (`ui/SecurityBadge.tsx`)
- Bentuk: persegi panjang 8px, border 1px, ikon `ShieldCheck`/`Lock`/`FileLock2` Lucide + dua baris teks (judul mono kecil, keterangan). **Bukan logo resmi lembaga mana pun.**
- Isi (data di `data.ts`, field `confirmed: false`):
  `Enkripsi AES-256` (data tersimpan) · `TLS 1.3` (data terkirim) · `Selaras ISO/IEC 27001` · `Dirancang sesuai UU PDP`.
- Wording **"selaras/mengacu/dirancang sesuai"**, bukan "tersertifikasi/bersertifikat", sampai pemilik memberi bukti. Beri komentar kode: `{/* ILUSTRATIF: ubah ke "Tersertifikasi" hanya bila sertifikat asli ada */}`.
- Daftar bank di bagian transfer: teks biasa (mis. "Transfer ke rekening bank utama"), tanpa logo bank.

## 9. Tombol WhatsApp Kapsul (`layout/WhatsAppButton.tsx`)
- `position: fixed; right: 20px; bottom: max(20px, env(safe-area-inset-bottom)); z-index: 50`.
- **Bentuk kapsul memanjang**: tinggi 52px, `border-radius: 999px`, padding `0 20px 0 14px`, isi: glyph WhatsApp 24px + teks `Chat WhatsApp` (14px/600), gap 10px. Teks tampil di semua lebar layar (tetap kapsul, bukan bulat).
- Warna: bg `--navy`, teks `--on-navy`, glyph `--wa-green`, border 1px `rgba(255,255,255,.24)`, shadow `0 4px 12px rgba(15,23,42,.25)` (satu-satunya shadow tebal-ringan yang diizinkan). Hover: bg `--navy-2`. Tanpa pulse/animasi.
- Periksa visual di atas pita navy (CTA, footer): border putih transparan memastikan kapsul tetap terbaca.
- Tautan: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Halo GajiKilat, saya ingin menjadwalkan demo payroll.")}`; `target="_blank" rel="noopener noreferrer"`; `aria-label="Chat WhatsApp dengan tim GajiKilat (tab baru)"`.
- Target sentuh ≥ 44px. Sembunyikan saat cetak (`@media print`). Beri padding bawah halaman 88px agar tidak menutup konten terakhir/footer. Tidak boleh menutupi tombol/kontrol kalkulator pada 375px (uji manual).
- `WhatsAppIcon.tsx`: glyph resmi WhatsApp sebagai inline SVG (`aria-hidden`), mis. path Simple Icons (CC0). Jika path tidak tersedia, fallback `MessageCircle` Lucide dan laporkan.

## 10. Latar & Tekstur
- Hero: bg `--navy` + garis horizontal tipis `repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 1px, transparent 1px 32px)` (kertas buku besar). Hanya ini; tidak ada glow/blob/noise.
- Section lain polos `--paper` / `--canvas` bergantian sesuai `03`.

## 11. Implementasi Tailwind + Next.js
- Token di `globals.css` persis §2. Tailwind v4: `@theme inline { --color-paper: var(--paper); --color-ink: var(--ink); --color-ink-2: ...; --color-rule: ...; --color-emerald-700: ...; }`. Tailwind v3: `theme.extend.colors`. Matikan palet bawaan yang tidak dipakai agar warna tak resmi (indigo, purple, dll.) tidak bisa terpakai tidak sengaja.
- Font via `next/font/google` → variabel `--font-serif`, `--font-sans`, `--font-mono` di `<html>`.
- `Reveal.tsx`: fade 200ms sekali via IntersectionObserver, tanpa translate.
