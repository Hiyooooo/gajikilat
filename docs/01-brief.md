# 01 — Project Brief

## Ringkasan
**GajiKilat** adalah sistem HRIS & payroll otomatis untuk perusahaan dengan ratusan hingga ribuan karyawan. Inti produk: **payroll yang akurat**. Gaji, PPh 21, dan BPJS dihitung otomatis dari data absensi dan perizinan, dicek sebelum dibayar, lalu ditransfer ke bank. Empat modul lain (Absensi, Perizinan, Exam, Library) memberi makan data ke payroll atau mengarsipkan hasilnya.

Website ini adalah **landing page promosi**: persuasif, formal, fokus konversi. Bukan aplikasi internal.

## Target Audiens
- Manufaktur, pabrik, ritel besar, korporasi (±200–5.000 karyawan), banyak shift, lembur rutin, banyak cabang/lini.
- Pembuat keputusan: **Direktur HR/Finance, Manajer Payroll, Controller, Kepala Pabrik**.
- Influencer internal: staf payroll yang mengerjakan rekap manual tiap bulan.
- Selera: dokumen rapi, angka jelas, bukti keamanan. Mereka dibakar oleh salah hitung (komplain massal, denda pajak/BPJS), bukan oleh UI yang kurang cantik.

## Masalah Nyata yang Dijual
1. Lembur dan izin direkap manual dari absensi ke spreadsheet. Tiap bulan ada selisih.
2. PPh 21 dan BPJS dihitung terpisah. Perubahan regulasi (mis. skema TER) membuat rumus lama keliru.
3. Cuti tidak dibayar (unpaid leave) lupa dipotong, atau terpotong dua kali.
4. Bukti potong dan kontrak kerja tercecer di folder dan lemari.

## Tujuan Halaman (urut prioritas)
1. **Konversi utama**: `Jadwalkan Demo` (enterprise membeli lewat demo, bukan coba mandiri).
2. **Konversi sekunder**: interaksi dengan kalkulator (hero & modul Gaji), lalu klik `Chat WhatsApp`.
3. Dalam 5 detik pengunjung paham: "payroll otomatis untuk perusahaan besar, hasilnya akurat".
4. Dalam 30 detik pengunjung menjalankan kalkulator hemat waktu dan melihat angkanya sendiri.
5. Membuktikan lewat kalkulator gaji yang bisa diutak-atik: lembur dari Absensi dan unpaid leave dari Perizinan mengubah slip gaji secara langsung.

## Proposisi Nilai
- **Payroll akurat, dicek sebelum transfer**: PPh 21 TER dan BPJS dihitung dari aturan, bukan input manual.
- **Satu sumber data**: lembur dan izin masuk ke gaji tanpa diketik ulang.
- **Siap audit**: arsip bukti potong 1721-A1, kontrak, dan jejak perubahan gaji.
- **Aman**: enkripsi, akses berbasis peran, persetujuan berlapis untuk batch gaji.

## Kerangka Persuasi
Janji akurat (hero + simulasi hemat waktu) → Bukti angka → Masalah (rekap manual) → Solusi (modul terintegrasi, kalkulator hidup) → Cara kerja → Keamanan → Testimoni → Harga → FAQ keberatan (regulasi, keamanan, migrasi) → CTA.

## Tone & Voice (beda tegas dari kesan "startup")
- **Formal, tenang, presisi.** Seperti laporan keuangan yang ditulis dengan baik.
- Kalimat deklaratif, angka konkret, tanpa seruan. Sapaan netral; bila perlu "Anda".
- Klaim akurasi selalu dibarengi mekanisme ("dihitung dari tabel TER", "dicek sebelum transfer"), bukan adjektif.
- Judul menyatakan fakta, bukan slogan. Rincian di `06-anti-slop.md`.

## Referensi Gaya (inspirasi, bukan salinan)
Laporan tahunan dan slip gaji bank; dokumentasi produk fintech yang padat data. Nuansa buku besar: garis tipis, kolom angka rata kanan, tipografi serif untuk judul. Tidak meniru brand tertentu.

## Di Luar Cakupan
Backend nyata, autentikasi, pembayaran online, blog, multi-bahasa, dashboard sungguhan. Semua tombol CTA mengarah ke anchor, `mailto:`, atau `wa.me` placeholder.

## Default yang Diasumsikan (agent: pakai, lalu laporkan)
- CTA primer `Jadwalkan Demo`, sekunder `Hitung Simulasi` (scroll ke kalkulator). Berbeda dari konvensi "Coba Gratis" karena pembelian enterprise lewat demo.
- Harga: 3 paket ilustratif per karyawan/bulan (lihat `03`).
- Logo: wordmark GajiKilat + simbol buatan sendiri.
- Testimoni, klien, angka bukti, lencana keamanan, nomor WhatsApp, domain: ilustratif/placeholder, ditandai.
- Regulasi acuan demo: PMK 168/2023 (TER) dan tarif iuran BPJS standar. **Pemilik wajib memverifikasi dengan konsultan pajak sebelum rilis** (lihat `05` §9).
