# 06 — Anti "AI Slop" (ATURAN KERAS)

"AI slop" = hasil generik yang terlihat dan terdengar seperti keluaran otomatis: gradien ungu, kartu ikon-dalam-lingkaran, slogan kosong, angka karangan. Untuk produk payroll, kesan generik sama dengan kesan tidak teliti. Baca file ini sebelum menulis kode atau copy.

## 1. Visual: dilarang
- Gradien apa pun (termasuk teks gradien, `bg-gradient-*`, `bg-clip-text`). Satu-satunya `linear-gradient` yang boleh: garis buku besar di hero (`02` §10).
- Ungu, pink, indigo, violet, fuchsia, atau biru-ungu. Palet bawaan Tailwind yang tidak ada di token.
- Glow, blob, aurora, mesh, noise, glassmorphism, `backdrop-blur`, spotlight kursor, kartu melayang saat hover, `hover:scale-*`.
- Ikon di dalam lingkaran/kotak berwarna sebagai hiasan kartu. Ikon "sparkle/✨/roket/petir" sebagai penanda fitur. Emoji sebagai ikon di UI (emoji di docs hanya penanda modul untuk agent).
- Layout serba rata tengah; tiga kartu identik berderet untuk semua section; hero berupa headline tengah + dua tombol + screenshot mengambang.
- `rounded-2xl/3xl`, `shadow-lg/xl/2xl`. Radius dan shadow hanya dari `02`.
- Animasi looping (pulse, bounce, marquee, gradient bergerak). Reveal dengan translate/stagger.
- Stock photo, avatar orang AI/ilustrasi generik, logo klien/bank/lembaga sertifikasi asli.
- Mockup yang menampilkan angka tidak konsisten antar kartu (mis. gaji bersih berbeda antara hero, kartu Gaji, slip, dan OG).

## 2. Visual: wajib (penanda desain yang disengaja)
- Aturan garis + eyebrow bernomor di tiap section; tabel rincian dengan leader titik dan angka mono rata kanan; garis ganda di total.
- Judul serif; angka mono tabular; palet hanya navy/slate/emerald dengan emerald ≤ 10%.
- Variasi bentuk antar section (tabel sebelum/sesudah, kolom bernomor, kartu slip, tabel harga), bukan satu pola kartu untuk semuanya.

## 3. Copy: dilarang
- Kata/frasa: *revolusioner, terdepan, inovatif, canggih, seamless, tanpa batas, next-level, supercharge, unlock, elevate, game-changer, all-in-one solution, solusi terbaik, di era digital ini, dalam dunia yang serba cepat, transformasi digital*, "dari … hingga …" berantai, "bukan sekadar … tetapi …".
- Triplet slogan kosong ("Cepat. Mudah. Aman."). Pertanyaan retoris sebagai judul. Seruan (`!`).
- Klaim superlatif/absolut tanpa mekanisme ("100% akurat", "tanpa kesalahan apa pun"). Judul `Bebas salah hitung` (dari brief pemilik) **harus langsung disusul mekanisme** (dihitung dari tabel aturan, diperiksa sebelum transfer) di sub-judul/section yang sama.
- Statistik/rating/testimoni yang tampak nyata tetapi karangan tanpa penanda ilustratif. Persentase akurasi bulat yang dikarang.
- Em dash (—) berlebihan di copy halaman: maksimal satu per section; utamakan titik dan koma.

## 4. Copy: wajib
- Kalimat deklaratif dengan kata benda dan angka spesifik: `12 jam × Rp 32.000 = Rp 384.000`, bukan "hitung lembur dengan mudah".
- Judul menyatakan fakta atau hasil. Setiap klaim fitur punya bukti di layar (mockup/angka).
- Tone formal tenang. Kata kerja aktif. Satu ide per kalimat.
- Istilah regulasi persis: PPh 21, TER, PMK 168/2023, BPJS Ketenagakerjaan, BPJS Kesehatan, 1721-A1.

## 5. Kode: dilarang
- Sisa template `create-next-app` (logo Next/Vercel, `page.module.css`, SVG bawaan, teks "Get started by editing").
- `any`, `// @ts-ignore`, `console.log`, komentar yang hanya mengulang kode, dependensi tak terpakai, komponen mati.
- Rumus atau angka rupiah hardcoded di JSX; angka sihir tanpa nama (`0.0125`).
- `div` dengan `onClick` sebagai tombol; ikon tanpa label yang menyampaikan makna; `alt` kosong/seragam pada konten bermakna.
- Menyalin boilerplate komponen UI generik tanpa menyesuaikan dengan token (mis. `Button` bawaan shadcn dengan variant yang tak dipakai).

## 6. Uji anti-slop (jawab semua sebelum selesai; jika ada "tidak", perbaiki)
1. Jika logo dan nama dihapus, apakah halaman ini masih jelas milik produk payroll (bukan SaaS apa saja)?
2. Apakah setiap angka di halaman bisa ditelusuri ke `payroll.ts`/`savings.ts` atau diberi tanda ilustratif?
3. Apakah ada section yang bisa dipindah ke website lain tanpa mengubah satu kata pun? Jika ya, tulis ulang dengan konteks manufaktur/payroll.
4. Apakah tiap judul menyatakan fakta, bukan slogan?
5. Apakah semua klaim akurasi disertai mekanisme di dekatnya?
6. Apakah variasi bentuk antar section terlihat jelas saat di-scroll cepat?
7. Apakah kalkulator memberi hasil berbeda dan benar saat input diubah (bukan angka statis)?
8. Apakah lencana keamanan memakai wording "selaras/mengacu", bukan klaim sertifikasi palsu?
9. Apakah tombol WhatsApp kapsul terlihat benar di atas pita putih **dan** navy?
10. Apakah ada elemen yang bergerak terus-menerus? (Harus tidak.)

## 7. Audit otomatis (jalankan di root proyek; semua harus **tanpa hasil** kecuali dicatat)
```bash
# warna & efek terlarang
grep -rEn "gradient|bg-clip-text|backdrop-blur|blur-|shadow-(lg|xl|2xl)|rounded-(2xl|3xl)|hover:scale|indigo|purple|violet|fuchsia|pink|animate-(pulse|bounce|ping)" src
# hex di komponen (hanya boleh di globals.css dan opengraph-image.tsx)
grep -rEn "#[0-9A-Fa-f]{6}\b" src --include=*.tsx --include=*.ts | grep -v "opengraph-image"
# kata & placeholder terlarang
grep -rEin "lorem|revolusioner|terdepan|seamless|next-level|supercharge|game-changer|your text here|href=\"#\"" src
# sisa template & debug
grep -rEn "console\.log|@ts-ignore|: any\b|Get started by editing" src
# emoji di source UI
grep -rEnP "[\x{1F300}-\x{1FAFF}\x{2728}\x{26A1}]" src
```
Pengecualian sah (catat di laporan): `repeating-linear-gradient` garis hero di `globals.css`; `rounded-full` pada kapsul WhatsApp, avatar, dan titik status; `animate-spin` pada spinner `Hitung Ulang`.
