# 04 — Spesifikasi: Kalkulator Hero, Alur Data, dan 5 Modul

Semua visual dari **JSX/CSS/SVG + `lucide-react`** (tanpa gambar raster). Mockup = showcase interaktif dengan state lokal React, **tanpa network request**. Semua angka dihasilkan oleh `lib/payroll.ts` / `lib/savings.ts`, bukan ditulis tangan di JSX. Beri `aria-label` deskriptif pada wadah mockup.

Struktur kartu modul: `kepala (ikon + label mono + status sinkron)` → `H3 manfaat` → `deskripsi ≤ 22 kata` → `visual interaktif` → `footer chip sub-fitur`.

---

## 0. Kalkulator Hemat Waktu (`hero/SavingsCalculator.tsx`, kolom 2 hero)
Judul kartu: `Simulasi hemat waktu penggajian`.

**Input** (label terlihat, bukan hanya placeholder):
1. `Jumlah karyawan`: slider 50–5.000, step 50, + input angka tersinkron. Default **500**.
2. `Waktu proses manual per karyawan` (menit/bulan): select 5 · 10 · 15 · 20 · 25 · 30. Default **15**.
3. `Biaya staf HR per jam` (Rp): input angka. Default **50.000**.

**Rumus** (`lib/savings.ts`, fungsi murni `simulateSavings(n, menitManual, tarifJam)`):
```
jamManual   = n × menitManual / 60
jamGajiKilat = (30 + 0,2 × n) / 60        // 30 menit setup tetap + 0,2 menit review per karyawan
jamHemat    = jamManual − jamGajiKilat
hematBulan  = jamHemat × tarifJam
hematTahun  = hematBulan × 12
```
Tampilan: jam 1 desimal (`id-ID`), Rupiah dibulatkan ke rupiah terdekat, `hematTahun` dihitung dari `hematBulan` **sebelum** pembulatan.

**Output** (tabel rincian dengan leader titik, angka mono rata kanan; `aria-live="polite"`, diperbarui paling cepat tiap 500ms):
- `Proses manual` → `125,0 jam / bulan`
- `Dengan GajiKilat` → `2,2 jam / bulan`
- `Waktu dihemat` → `122,8 jam / bulan` (subtotal)
- `Setara biaya staf` → `Rp 6.141.667 / bulan`
- **Total** `Rp 73.700.000 / tahun` (angka besar mono, `--emerald-700`, garis ganda di atas)

Catatan kecil 12px di bawah (wajib): `Estimasi ilustratif dengan asumsi di atas. Hasil nyata bergantung pada proses dan jumlah cabang Anda.`
CTA kartu: `Minta hitungan untuk perusahaan Anda` (primer, mailto demo).

**Test vector (`savings.test.ts`)**
| n | menit | tarif | jamManual | jamGajiKilat | jamHemat | hematBulan | hematTahun |
|---|---|---|---|---|---|---|---|
| 500 | 15 | 50.000 | 125,0 | 2,1667 | 122,8333 | 6.141.667 | 73.700.000 |
| 1.000 | 15 | 50.000 | 250,0 | 3,8333 | 246,1667 | 12.308.333 | 147.700.000 |
| 5.000 | 15 | 50.000 | 1.250,0 | 17,1667 | 1.232,8333 | 61.641.667 | 739.700.000 |

Input tidak valid (kosong, negatif, > batas) → klem ke batas, tidak pernah `NaN`. Reduced-motion: tanpa tween.

---

## Alur Data Terintegrasi (`modules/PayrollDemoProvider.tsx`)
React Context `"use client"` yang membungkus section Modul. State:
```ts
type DemoState = {
  employeeId: "bagas" | "fajar";
  lemburJam: number;          // dari rekap Absensi + lembur disetujui di Perizinan
  unpaidHari: number;         // dari Perizinan (cuti tidak dibayar disetujui)
  cutiTahunanTerpakai: number;// dari Perizinan (cuti berbayar disetujui)
  reimbursement: boolean;     // toggle di Gaji
  requests: Record<RequestId, "pending" | "approved" | "rejected">;
};
```
- Ganti karyawan (selector di kartu Gaji) memuat data karyawan itu dari `data.ts` dan mereset `requests`.
- `Reset Demo` (header section) mengembalikan semua ke default.
- Kartu Gaji **hanya membaca** `lemburJam`/`unpaidHari`/`reimbursement` lalu memanggil `computePayroll()`. Absensi dan Perizinan menulis state. Setiap perubahan memunculkan sorot baris (`--emerald-50`, sekali) dan pesan `aria-live`: `Gaji dihitung ulang: lembur 14 jam`.
- Setiap kartu sumber menampilkan chip status di kepala: `Tersinkron ke Gaji ✓` (ikon `RefreshCw`/`Check`, statis).

### Data karyawan (`data.ts`)
| | Bagas Pratama | Fajar Nugroho |
|---|---|---|
| Jabatan, lokasi | Operator Produksi, Cikarang | Supervisor Gudang, Karawang |
| Gaji pokok | Rp 5.600.000 | Rp 7.800.000 |
| Tunjangan tetap | Rp 800.000 | Rp 1.200.000 |
| Tarif lembur/jam | Rp 32.000 | Rp 45.000 |
| Rekap lembur Okt (minggu 1–4) | 3 · 4 · 2 · 3 = **12 jam** | 2 · 3 · 3 · 2 = **10 jam** |
| Cuti tahunan | sisa 10 dari 12 | sisa 7 dari 12 |
| Status PTKP demo | TK/0 (TER kategori A) | TK/0 (TER kategori A) |

---

## Rumus Payroll (`lib/payroll.ts`)
```
upahTetap  = pokok + tunjanganTetap                     // dasar BPJS
lembur     = lemburJam × tarifLembur
potongUnpaid = round(pokok / 25 × unpaidHari)           // pembagi 25 hari kerja (bisa diatur)
bruto      = pokok + tunjanganTetap + lembur − potongUnpaid
tarifTER   = lookupTER_A(bruto)                         // tabel di bawah
pph21      = round(bruto × tarifTER / 100)
bpjsTK     = upahTetap × 3%                             // JHT 2% + JP 1% (porsi karyawan)
bpjsKes    = upahTetap × 1%                             // porsi karyawan
bersih     = bruto − pph21 − bpjsTK − bpjsKes
reimb      = reimbursement ? 250.000 : 0                // di luar dasar pajak dalam demo
ditransfer = bersih + reimb
```
**Tabel TER kategori A (TK/0)**, `bruto ≤ batas → tarif`: 5.400.000 → 0% · 5.650.000 → 0,25% · 5.950.000 → 0,5% · 6.300.000 → 0,75% · 6.750.000 → 1% · 7.500.000 → 1,25% · 8.550.000 → 1,5% · 9.650.000 → 1,75% · 10.050.000 → 2% · 10.350.000 → 2,25% · 10.700.000 → 2,5% · 11.050.000 → 3% · 11.600.000 → 3,5% · 12.500.000 → 4% · 13.750.000 → 5% · 15.100.000 → 6%. (Di atas itu: **di luar cakupan demo**; klem dan tampilkan peringatan.)

**Penyederhanaan demo (WAJIB diberi komentar kode + dilaporkan):** (a) hanya TER kategori A; (b) premi JKK/JKM/BPJS Kesehatan yang dibayar pemberi kerja belum dimasukkan ke penghasilan bruto; (c) batas upah iuran JP/Kesehatan tidak dimodelkan (aman untuk upah di bawah batas pada data demo); (d) penghitungan ulang Desember tidak dimodelkan. **Pemilik wajib mengonfirmasi rumus dan tarif dengan konsultan pajak sebelum rilis.** Di UI, kartu Gaji memuat catatan 12px: `Simulasi ilustratif, bukan nasihat pajak.`

### Test vector (`payroll.test.ts`, semua harus hijau)
| Karyawan | Lembur | Unpaid | Bruto | TER | PPh 21 | BPJS TK | BPJS Kes | Bersih | + Reimb (250.000) |
|---|---|---|---|---|---|---|---|---|---|
| Bagas | 12 jam | 0 | 6.784.000 | 1,25% | 84.800 | 192.000 | 64.000 | **6.443.200** | 6.693.200 |
| Bagas | 12 jam | 1 hari (−224.000) | 6.560.000 | 1% | 65.600 | 192.000 | 64.000 | **6.238.400** | 6.488.400 |
| Bagas | 14 jam | 0 | 6.848.000 | 1,25% | 85.600 | 192.000 | 64.000 | **6.506.400** | 6.756.400 |
| Bagas | 14 jam | 1 hari | 6.624.000 | 1% | 66.240 | 192.000 | 64.000 | **6.301.760** | 6.551.760 |
| Fajar | 10 jam | 0 | 9.450.000 | 1,75% | 165.375 | 270.000 | 90.000 | **8.924.625** | 9.174.625 |
| Fajar | 10 jam | 1 hari (−312.000) | 9.138.000 | 1,75% | 159.915 | 270.000 | 90.000 | **8.618.085** | 8.868.085 |
| Fajar | 12 jam | 0 | 9.540.000 | 1,75% | 166.950 | 270.000 | 90.000 | **9.013.050** | 9.263.050 |

Catatan: Bagas melintasi batas TER (1,25% ↔ 1%) saat unpaid leave disetujui. Itu bagian dari demonstrasi bahwa hitungan manual rawan salah.

---

## 1. GAJI 💰 (`GajiCard.tsx`): 2 kolom × 2 baris (bintang halaman)
- **Ikon** `Wallet` · label `GAJI` · **H3** `Payroll dihitung dari data, bukan dari ingatan.`
- **Deskripsi**: `PPh 21 TER, BPJS, lembur, dan potongan cuti dihitung otomatis lalu ditransfer dari satu batch.`
- **Susunan** (desktop dua kolom di dalam kartu; mobile tumpuk):
  - **Kiri (input & sumber)**: selector karyawan (segmented: `Bagas Pratama` / `Fajar Nugroho`, nama + jabatan); panel `Data masuk otomatis` dengan 2 baris read-only: `Lembur dari Absensi: 12 jam` dan `Unpaid leave dari Perizinan: 0 hari` (ikon `Link2`, label sumber); toggle `Reimbursement transport +Rp 250.000`; tombol `Hitung Ulang` (spinner 600ms sekali).
  - **Kanan (rincian gaji)**: tabel rincian ala slip (leader titik):
    - Gaji pokok · Tunjangan tetap · `Lembur 12 jam × Rp 32.000` `+Rp 384.000` · `Potongan unpaid 0 hari` · **Penghasilan bruto**
    - `PPh 21 (TER 1,25%)` `−Rp 84.800`
    - `BPJS Ketenagakerjaan (JHT 2% + JP 1%)` `−Rp 192.000`
    - `BPJS Kesehatan (1%)` `−Rp 64.000`
    - **Gaji bersih** `Rp 6.443.200`
    - `Reimbursement transport` `+Rp 250.000` (di luar dasar pajak)
    - **Total ditransfer** `Rp 6.693.200` (garis ganda, angka besar emerald-700)
- **Sub-fitur → wujud**:
  1. **Kalkulasi otomatis**: angka berhitung ulang (tween 400ms) saat lembur/unpaid/karyawan berubah; badge `Dihitung ulang otomatis`.
  2. **PPh 21 TER**: baris PPh dengan persen tarif; saat bruto melintasi batas, persen ikut berubah.
  3. **BPJS Ketenagakerjaan & Kesehatan**: dua baris terpisah.
  4. **Reimbursement**: baris + toggle.
  5. **Slip gaji digital**: tombol `Lihat Slip Gaji` membuka panel slip (kop `PT Sinar Logam Nusantara (contoh)`, nama, periode `Oktober 2026`, rincian yang sama, baris `Keterangan` otomatis mis. `Cuti tahunan 2 hari (berbayar) · Izin tidak dibayar 1 hari`), ikon `FileText`, tombol `Unduh PDF` (dekoratif, tanpa unduhan). Slip harus mencerminkan state terkini.
  6. **Transfer bank instan**: tombol `Kirim Transfer` → status bertahap (teks + ikon, bukan hanya warna): `Memvalidasi 1.240 rekening` → `Mengirim ke bank` → `Berhasil · {jam WIB}` (jam dari `Intl` zona Asia/Jakarta, dihitung **saat klik**, bukan saat render, agar tidak mismatch hidrasi). Ringkasan batch: `Batch Gaji Oktober 2026 · 1.240 karyawan` (ilustratif). Tanpa logo bank.
- **Chip footer**: `Hitung otomatis` · `PPh 21 TER` · `BPJS` · `Slip digital` · `Reimbursement` · `Transfer bank`.
- Catatan 12px: `Simulasi ilustratif, bukan nasihat pajak.`
- Reduced-motion: hasil langsung, tanpa spinner/tween (status transfer tampil bertahap tanpa animasi).

## 2. ABSENSI 📍 (`AbsensiCard.tsx`): 1 kolom × 2 baris
- **Ikon** `MapPin` · label `ABSENSI` · chip kepala `Tersinkron ke Gaji ✓` · **H3** `Lembur tercatat otomatis, langsung ke gaji.`
- **Deskripsi**: `Clock-in/out dengan geofencing GPS, shift fleksibel, dan rekap lembur yang masuk ke nominal gaji.`
- **Sub-fitur → wujud** (tumpuk vertikal):
  1. **Shift kerja**: chip `Pagi 07–15` · `Siang 15–23` · `Malam 23–07` (pabrik 3 shift); memilih shift mengubah jam target.
  2. **Clock-in/out**: tombol besar `Clock In` ↔ `Clock Out`, jam berjalan (mono, WIB), durasi kerja.
  3. **GPS Geofencing**: peta SVG mini terang (grid jalan garis tipis), lingkaran geofence `Pabrik Cikarang` (stroke emerald-700 putus-putus, fill `--emerald-50`), 3 titik: 2 dalam (emerald), 1 luar (`--danger`, label `Di luar area`).
  4. **Rekap kehadiran real-time**: `1.184 / 1.240 hadir` + progres, 4 baris live (`Bagas Pratama · Hadir · 06:58`, `Fajar Nugroho · Hadir · 07:03`, `Dewi Anggraini · Terlambat · 07:19`, `Rani Putri · Di luar area`). Hover/fokus baris menyorot titik di peta.
  5. **Rekap lembur → gaji**: tabel kecil `Minggu 1: 3 jam … Minggu 4: 3 jam` + total `12 jam`, lalu baris hasil `→ Gaji: 12 jam × Rp 32.000 = Rp 384.000`. Nilai mengikuti `lemburJam` dari state (naik jika lembur di Perizinan disetujui).
- **Interaksi**: `Clock In` → titik pengguna masuk geofence, toast `Check-in berhasil · {jam} WIB` (`aria-live`), rekap hadir +1. `Clock Out` menampilkan durasi total. (Clock Out tidak menambah lembur; lembur masuk dari rekap dan persetujuan.)
- **Chip footer**: `Clock-in/out` · `GPS geofencing` · `Shift kerja` · `Rekap real-time` · `Lembur → Gaji`.

## 3. PERIZINAN 📑 (`PerizinanCard.tsx`): 1 kolom × 1 baris (tinggi menyesuaikan)
- **Ikon** `CalendarCheck` · label `PERIZINAN` · chip kepala `Tersinkron ke Gaji ✓` · **H3** `Cuti dan lembur langsung menyesuaikan slip.`
- **Deskripsi**: `Approval berjenjang. Cuti berbayar tidak memotong gaji, cuti tidak dibayar otomatis terpotong di slip.`
- **Sub-fitur → wujud**:
  1. **Workflow approval**: stepper `Diajukan → Atasan → HR`; tombol `Setujui` (emerald, teks navy) / `Tolak` (outline danger); antrean 4 permintaan, satu aktif.
  2. **Empat permintaan** (karyawan terpilih), tiap kartu dengan label jenis dan **dampak ke gaji**:
     - `Cuti Tahunan · 13–14 Okt 2026 · 2 hari` → label `Berbayar` · dampak `Tidak memotong gaji`
     - `Izin Sakit · 7 Okt 2026 · 1 hari (surat dokter terlampir)` → `Berbayar` · `Tidak memotong gaji`
     - `Cuti Tidak Dibayar · 20 Okt 2026 · 1 hari` → `Unpaid` · `Potongan Rp 224.000 (Bagas) / Rp 312.000 (Fajar)`
     - `Lembur · 15 Okt 2026, 18:00–20:00 WIB · 2 jam` → `Lembur` · `+Rp 64.000 (Bagas) / +Rp 90.000 (Fajar)`
  3. **Transparansi sisa cuti**: panel `Sisa Cuti`: `10 dari 12 hari` + progres; saat Cuti Tahunan disetujui → `8 dari 12` (tween). Izin sakit tidak mengurangi cuti tahunan.
- **Efek state saat `Setujui`**: Cuti Tahunan → `cutiTahunanTerpakai +2`; Izin Sakit → tidak ada efek gaji; Cuti Tidak Dibayar → `unpaidHari +1` (kartu Gaji: potongan muncul, TER bisa berubah); Lembur → `lemburJam +2` (rekap Absensi dan kartu Gaji ikut naik). `Tolak` → tidak ada efek.
- Setelah semua ditinjau: `Semua permintaan sudah ditinjau ✓` + `Reset Demo`.
- **Chip footer**: `Approval cuti` · `Izin sakit` · `Lembur` · `Sisa cuti transparan` · `Berbayar vs unpaid`.

## 4. EXAM 📝 (`ExamCard.tsx`): 1 kolom × 1 baris
- **Ikon** `ClipboardCheck` · label `EXAM` · **H3** `Ujian kualifikasi untuk grade dan keahlian.`
- **Deskripsi**: `Rekrutmen, evaluasi kinerja, dan uji kompetensi dengan proctoring. Hasil lulus memicu usulan grade gaji.`
- **Sub-fitur → wujud**:
  1. **Tab**: `Rekrutmen` · `Kinerja` · `Grade` · `Teknis` (Grade & Teknis = uji kompetensi). Ganti tab mengganti judul dan soal.
  2. **Soal & timer**: header `Soal 3/10`, timer mono hitung mundur dari `09:42` (jadi `--warn` + ikon di bawah 01:00), pilihan ganda 3 opsi; jawab → benar/salah dengan warna **dan** ikon (`Check`/`X`); lalu ring skor SVG `80/100`.
  3. **Hasil Grade**: bila tab Grade selesai dengan skor ≥ 75 → panel `Layak naik ke Grade G4` + `Usulan gaji pokok: Rp 5.600.000 → Rp 6.100.000 (menunggu persetujuan HR)` (angka ilustratif). Tab Teknis → `Level Teknis 2 tercapai`.
  4. **Proctoring**: indikator `Proctoring aktif` (`ShieldCheck`) + log mini `Tab tetap fokus ✓`; tombol demo `Simulasi pelanggaran` → badge peringatan kuning (ikon `AlertTriangle` + teks) + penghitung bertambah.
- **Soal contoh** (opsi benar ditebalkan, acak urutan boleh):
  - Rekrutmen: `Lini berhenti 20 menit karena material terlambat. Tindakan pertama supervisor?` — (a) Lanjut tanpa melapor (b) **Catat penyebab dan kabari perencana produksi** (c) Menyalahkan operator
  - Kinerja: `Target 1.200 unit per shift, tercapai 1.080. Berapa persen pencapaiannya?` — (a) 85% (b) **90%** (c) 92%
  - Grade: `Langkah pertama sebelum perawatan mesin press?` — (a) Melepas pengaman agar cepat (b) **Terapkan lockout-tagout dan pastikan energi nol** (c) Minta rekan menjaga tombol
  - Teknis: `Alat ukur untuk ketebalan komponen dengan ketelitian 0,01 mm?` — (a) Mistar baja (b) **Mikrometer sekrup** (c) Meteran gulung
- **Chip footer**: `Assessment rekrutmen` · `Evaluasi kinerja` · `Uji kompetensi` · `Proctoring`.

## 5. LIBRARY 📚 (`LibraryCard.tsx`): 1 kolom × 1 baris
- **Ikon** `BookOpen` · label `LIBRARY` · **H3** `Bukti potong dan kontrak, tersimpan rapi.`
- **Deskripsi**: `Arsip 1721-A1, kontrak kerja, SOP, dan e-learning dalam satu pencarian.`
- **Sub-fitur → wujud**:
  1. **Pencarian** (command palette mini: input + `kbd` `⌘ K`), memfilter real-time, sorotan teks cocok dengan `--emerald-50` + teks `--emerald-700`.
  2. **Filter**: `Semua` · `Bukti Potong` · `Kontrak` · `SOP` · `E-learning` (chip wrap; target ≥ 44px).
  3. **Arsip legal**: ikon per tipe (`FileText` bukti potong, `FileSignature` kontrak, `BookOpen` SOP, `GraduationCap` e-learning); tiap baris memuat tipe, karyawan, tahun/masa berlaku, tombol `Lihat` (dekoratif).
  4. **E-learning** memiliki progres: `Keselamatan Kerja di Lini Produksi · 60%`.
- **Data (7 item)**: `Bukti Potong 1721-A1 · Bagas Pratama · 2025` · `Bukti Potong 1721-A1 · Fajar Nugroho · 2025` · `Kontrak Kerja PKWT · Bagas Pratama · s.d. 31 Des 2026` · `Kontrak Kerja PKWTT · Fajar Nugroho` · `SOP Pengajuan Cuti` · `SOP Perhitungan Lembur` · `Keselamatan Kerja di Lini Produksi` (E-learning).
- **Interaksi**: ketik memfilter (case-insensitive); ↑↓ memindah sorotan, Enter memilih; state kosong `Tidak ada dokumen yang cocok`. Placeholder `Cari "Bagas"…` (diketik otomatis sekali saat masuk viewport, kecuali reduced-motion).
- Catatan: jangan mengklaim integrasi pelaporan ke DJP; yang ditampilkan adalah arsip dan pencarian.
- **Chip footer**: `Arsip 1721-A1` · `Kontrak legal` · `SOP kantor` · `E-learning`.

---

## Aturan Lintas Modul
- State lokal React hooks; **tanpa network request**.
- Tombol memakai `<button>` asli, target sentuh ≥ 44px; status dinamis di `aria-live="polite"`.
- Timer/tween hanya berjalan saat kartu terlihat dan berhenti saat tab tersembunyi.
- **Nol animasi looping** (lihat `02` §6).
- Hover: border `--rule-2` → `--control` hanya pada elemen interaktif; focus-visible ring 2px emerald-700.
- Warna/radius/spacing dari token `02`; ikon hanya `lucide-react`.
- Verifikasi akhir: untuk tiap modul, centang bahwa semua sub-fitur di tabel `AGENTS.md` §4 terlihat di layar **dan** alur data bekerja: (1) setujui Lembur di Perizinan → rekap Absensi 14 jam → Gaji bersih Bagas `Rp 6.506.400`; (2) setujui Cuti Tidak Dibayar → Gaji turun sesuai tabel test vector; (3) slip mencerminkan keduanya.
