/**
 * Data terpusat untuk showcase dan mockup GajiKilat
 * Spesifikasi docs/02, 03, 04, 05
 */

export interface Employee {
  id: "bagas" | "fajar";
  nama: string;
  jabatan: string;
  lokasi: string;
  pokok: number;
  tunjanganTetap: number;
  tarifLembur: number;
  lemburMingguan: [number, number, number, number];
  lemburDefault: number;
  cutiTahunanDefault: number;
  cutiTahunanTotal: number;
  ptkp: string;
}

export const EMPLOYEES: Record<"bagas" | "fajar", Employee> = {
  bagas: {
    id: "bagas",
    nama: "Bagas Pratama",
    jabatan: "Operator Produksi",
    lokasi: "Cikarang",
    pokok: 5_600_000,
    tunjanganTetap: 800_000,
    tarifLembur: 32_000,
    lemburMingguan: [3, 4, 2, 3],
    lemburDefault: 12,
    cutiTahunanDefault: 10,
    cutiTahunanTotal: 12,
    ptkp: "TK/0 (TER Kategori A)",
  },
  fajar: {
    id: "fajar",
    nama: "Fajar Nugroho",
    jabatan: "Supervisor Gudang",
    lokasi: "Karawang",
    pokok: 7_800_000,
    tunjanganTetap: 1_200_000,
    tarifLembur: 45_000,
    lemburMingguan: [2, 3, 3, 2],
    lemburDefault: 10,
    cutiTahunanDefault: 7,
    cutiTahunanTotal: 12,
    ptkp: "TK/0 (TER Kategori A)",
  },
};

export type RequestId = "req-cuti" | "req-sakit" | "req-unpaid" | "req-lembur";

export interface PermissionRequest {
  id: RequestId;
  judul: string;
  tanggal: string;
  durasi: string;
  keterangan: string;
  tipe: "berbayar" | "unpaid" | "lembur";
  labelDampak: string;
  dampakPotongan: {
    bagas: string;
    fajar: string;
  };
}

export const PERMISSION_REQUESTS: PermissionRequest[] = [
  {
    id: "req-cuti",
    judul: "Cuti Tahunan",
    tanggal: "13–14 Okt 2026",
    durasi: "2 hari",
    keterangan: "Keperluan keluarga",
    tipe: "berbayar",
    labelDampak: "Tidak memotong gaji",
    dampakPotongan: {
      bagas: "Tidak memotong gaji",
      fajar: "Tidak memotong gaji",
    },
  },
  {
    id: "req-sakit",
    judul: "Izin Sakit",
    tanggal: "7 Okt 2026",
    durasi: "1 hari",
    keterangan: "Surat dokter terlampir",
    tipe: "berbayar",
    labelDampak: "Tidak memotong gaji",
    dampakPotongan: {
      bagas: "Tidak memotong gaji",
      fajar: "Tidak memotong gaji",
    },
  },
  {
    id: "req-unpaid",
    judul: "Cuti Tidak Dibayar",
    tanggal: "20 Okt 2026",
    durasi: "1 hari",
    keterangan: "Izin keperluan pribadi mendesak",
    tipe: "unpaid",
    labelDampak: "Potongan gaji pokok",
    dampakPotongan: {
      bagas: "Potongan Rp 224.000",
      fajar: "Potongan Rp 312.000",
    },
  },
  {
    id: "req-lembur",
    judul: "Lembur",
    tanggal: "15 Okt 2026, 18:00–20:00 WIB",
    durasi: "2 jam",
    keterangan: "Percepatan target pengiriman kontainer",
    tipe: "lembur",
    labelDampak: "Penambahan upah lembur",
    dampakPotongan: {
      bagas: "+Rp 64.000 (2 jam)",
      fajar: "+Rp 90.000 (2 jam)",
    },
  },
];

export interface ExamQuestion {
  tab: "rekrutmen" | "kinerja" | "grade" | "teknis";
  tabLabel: string;
  nomorSoal: string;
  pertanyaan: string;
  opsi: string[];
  kunciJawaban: number;
  hasilKelulusan: string;
  skor: number;
}

export const EXAM_DATA: Record<
  "rekrutmen" | "kinerja" | "grade" | "teknis",
  ExamQuestion
> = {
  rekrutmen: {
    tab: "rekrutmen",
    tabLabel: "Rekrutmen",
    nomorSoal: "Soal 3/10",
    pertanyaan:
      "Lini berhenti 20 menit karena material terlambat. Tindakan pertama supervisor?",
    opsi: [
      "Lanjut tanpa melapor",
      "Catat penyebab dan kabari perencana produksi",
      "Menyalahkan operator lini",
    ],
    kunciJawaban: 1,
    hasilKelulusan: "Rekomendasi lolos wawancara tahap teknis",
    skor: 85,
  },
  kinerja: {
    tab: "kinerja",
    tabLabel: "Kinerja",
    nomorSoal: "Soal 4/10",
    pertanyaan:
      "Target 1.200 unit per shift, tercapai 1.080 unit. Berapa persen pencapaiannya?",
    opsi: ["85%", "90%", "92%"],
    kunciJawaban: 1,
    hasilKelulusan: "Evaluasi kinerja: Sangat Baik (Grade stabil)",
    skor: 90,
  },
  grade: {
    tab: "grade",
    tabLabel: "Grade",
    nomorSoal: "Soal 8/10",
    pertanyaan: "Langkah pertama sebelum perawatan mesin press?",
    opsi: [
      "Melepas pengaman agar cepat",
      "Terapkan lockout-tagout dan pastikan energi nol",
      "Minta rekan menjaga tombol",
    ],
    kunciJawaban: 1,
    hasilKelulusan:
      "Layak naik ke Grade G4 · Usulan gaji pokok: Rp 5.600.000 → Rp 6.100.000 (menunggu persetujuan HR)",
    skor: 88,
  },
  teknis: {
    tab: "teknis",
    tabLabel: "Teknis",
    nomorSoal: "Soal 5/10",
    pertanyaan:
      "Alat ukur untuk ketebalan komponen dengan ketelitian 0,01 mm?",
    opsi: ["Mistar baja", "Mikrometer sekrup", "Meteran gulung"],
    kunciJawaban: 1,
    hasilKelulusan: "Level Teknis 2 tercapai · Sertifikasi internal aktif",
    skor: 92,
  },
};

export interface LibraryDoc {
  id: string;
  judul: string;
  karyawan?: string;
  tipe: "bukti-potong" | "kontrak" | "sop" | "elearning";
  tipeLabel: string;
  tahunAtauMasa: string;
  progres?: number;
}

export const LIBRARY_DOCS: LibraryDoc[] = [
  {
    id: "lib-1",
    judul: "Bukti Potong 1721-A1",
    karyawan: "Bagas Pratama",
    tipe: "bukti-potong",
    tipeLabel: "Bukti Potong",
    tahunAtauMasa: "Tahun Pajak 2025",
  },
  {
    id: "lib-2",
    judul: "Bukti Potong 1721-A1",
    karyawan: "Fajar Nugroho",
    tipe: "bukti-potong",
    tipeLabel: "Bukti Potong",
    tahunAtauMasa: "Tahun Pajak 2025",
  },
  {
    id: "lib-3",
    judul: "Kontrak Kerja PKWT",
    karyawan: "Bagas Pratama",
    tipe: "kontrak",
    tipeLabel: "Kontrak",
    tahunAtauMasa: "s.d. 31 Des 2026",
  },
  {
    id: "lib-4",
    judul: "Kontrak Kerja PKWTT",
    karyawan: "Fajar Nugroho",
    tipe: "kontrak",
    tipeLabel: "Kontrak",
    tahunAtauMasa: "Permanen / Tetap",
  },
  {
    id: "lib-5",
    judul: "SOP Pengajuan Cuti",
    tipe: "sop",
    tipeLabel: "SOP",
    tahunAtauMasa: "Revisi 2026",
  },
  {
    id: "lib-6",
    judul: "SOP Perhitungan Lembur",
    tipe: "sop",
    tipeLabel: "SOP",
    tahunAtauMasa: "Revisi 2026",
  },
  {
    id: "lib-7",
    judul: "Keselamatan Kerja di Lini Produksi",
    tipe: "elearning",
    tipeLabel: "E-learning",
    tahunAtauMasa: "Modul K3 Wajib",
    progres: 60,
  },
];

export interface SecurityBadgeItem {
  judul: string;
  keterangan: string;
  icon: "ShieldCheck" | "Lock" | "FileLock2";
  confirmed: boolean;
}

export const SECURITY_BADGES: SecurityBadgeItem[] = [
  {
    judul: "Enkripsi AES-256",
    keterangan: "Data tersimpan dienkripsi standar perbankan",
    icon: "Lock",
    confirmed: false, // ILUSTRATIF: ubah ke true bila audit keamanan lolos
  },
  {
    judul: "TLS 1.3",
    keterangan: "Protokol transmisi data aman dalam perjalanan",
    icon: "ShieldCheck",
    confirmed: false,
  },
  {
    judul: "Selaras ISO/IEC 27001",
    keterangan: "Tata kelola keamanan informasi sistem penggajian",
    icon: "ShieldCheck",
    confirmed: false, // ILUSTRATIF: ubah ke "Tersertifikasi" hanya bila sertifikat resmi ada
  },
  {
    judul: "Dirancang sesuai UU PDP",
    keterangan: "Kepatuhan privasi data dan perlindungan data pribadi",
    icon: "FileLock2",
    confirmed: false,
  },
];

export interface Testimonial {
  kutipan: string;
  nama: string;
  jabatan: string;
  perusahaan: string;
  inisial: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    kutipan:
      "Rekap lembur 1.800 operator dulu memakan tiga hari. Sekarang angka lembur sudah ada di draf gaji sebelum rapat pagi.",
    nama: "Dewi Anggraini",
    jabatan: "Manajer Payroll",
    perusahaan: "Sinar Logam Nusantara",
    inisial: "DA",
  },
  {
    kutipan:
      "Komplain selisih BPJS di slip hampir hilang. Kami melihat hitungannya sebelum transfer, bukan sesudah ada protes.",
    nama: "Hendra Wijaya",
    jabatan: "Direktur Keuangan",
    perusahaan: "Mitra Ritel Bersama",
    inisial: "HW",
  },
  {
    kutipan:
      "Cuti tidak dibayar langsung memotong gaji di bulan yang tepat. Tidak ada lagi koreksi manual di akhir bulan.",
    nama: "Rani Putri",
    jabatan: "Kepala HR",
    perusahaan: "Tekstil Cahaya Pratama",
    inisial: "RP",
  },
];

export interface PricingPlan {
  nama: string;
  populer?: boolean;
  kisaran: string;
  tarif: string;
  satuan: string;
  fitur: string[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    nama: "Bisnis",
    kisaran: "Hingga 500 karyawan",
    tarif: "Rp 18.000",
    satuan: "/ karyawan / bulan",
    fitur: [
      "Modul Gaji & Kalkulasi TER",
      "Modul Absensi & Shift Kerja",
      "Modul Perizinan & Approval",
      "Slip Gaji Digital",
      "Dukungan Email & Jam Kerja",
    ],
  },
  {
    nama: "Enterprise",
    populer: true,
    kisaran: "500 – 2.000 karyawan",
    tarif: "Rp 14.000",
    satuan: "/ karyawan / bulan",
    fitur: [
      "Semua fitur paket Bisnis",
      "Modul Exam & Uji Kompetensi",
      "Modul Library & Arsip 1721-A1",
      "Transfer Bank Massal 1 Batch",
      "Integrasi Dual Approval Audit",
      "Account Manager Khusus",
    ],
  },
  {
    nama: "Korporasi",
    kisaran: "2.000+ karyawan",
    tarif: "Hubungi kami",
    satuan: "kebutuhan terkustomisasi",
    fitur: [
      "Semua fitur paket Enterprise",
      "Multi-entitas & Multi-pabrik",
      "SLA 99,9% & Dedicated Support",
      "Dukungan Implementasi On-site",
      "Migrasi Data Paralel 1 Siklus",
      "Konektor ERP Terkustomisasi",
    ],
  },
];

export interface FAQItem {
  id: string;
  pertanyaan: string;
  jawaban: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    pertanyaan: "Bagaimana PPh 21 dihitung?",
    jawaban:
      "Sistem memakai tarif efektif rata-rata (TER) bulanan sesuai PMK 168/2023, lalu penghitungan ulang di masa pajak terakhir sesuai ketentuan. Tabel dapat diperbarui bila regulasi berubah. Kasus khusus tetap perlu dikonfirmasi dengan konsultan pajak Anda.",
  },
  {
    id: "faq-2",
    pertanyaan: "Bagaimana iuran BPJS dihitung?",
    jawaban:
      "Iuran BPJS Ketenagakerjaan dan Kesehatan dihitung dari upah dengan batas sesuai ketentuan. Porsi karyawan dipotong dari gaji; porsi perusahaan dicatat terpisah di laporan.",
  },
  {
    id: "faq-3",
    pertanyaan: "Seberapa cepat transfer sampai ke rekening karyawan?",
    jawaban:
      "Setelah batch disetujui, instruksi dikirim ke bank. Waktu tiba mengikuti kanal dan jam operasional bank. Rincian bank mitra dikonfirmasi saat implementasi.",
  },
  {
    id: "faq-4",
    pertanyaan: "Bagaimana lembur dan cuti masuk ke gaji?",
    jawaban:
      "Lembur dari absensi dan potongan unpaid leave dari perizinan yang sudah disetujui langsung masuk komponen gaji periode berjalan. Perubahan setelah tanggal cut-off tercatat sebagai penyesuaian bulan berikutnya.",
  },
  {
    id: "faq-5",
    pertanyaan: "Apakah data karyawan aman?",
    jawaban:
      "Data dienkripsi, akses dibatasi per peran, dan setiap perubahan gaji tercatat di log audit. Detail di bagian Keamanan.",
  },
  {
    id: "faq-6",
    pertanyaan: "Bisakah memindahkan data dari sistem lama untuk ribuan karyawan?",
    jawaban:
      "Bisa lewat CSV/Excel dengan pemetaan komponen gaji. Kami menyarankan satu siklus paralel untuk membandingkan hasil sebelum beralih penuh.",
  },
  {
    id: "faq-7",
    pertanyaan: "Bagaimana proses mulai dan berapa biayanya?",
    jawaban:
      "Mulai dari demo dengan data contoh, lalu pilot. Harga per karyawan per bulan menyesuaikan jumlah karyawan dan modul. Hubungi tim kami untuk penawaran.",
  },
];

export const PROOF_NUMBERS = [
  { angka: "120+", label: "Perusahaan manufaktur & ritel" },
  { angka: "350 rb+", label: "Slip gaji per bulan" },
  { angka: "0", label: "Input ulang lembur & izin" },
  { angka: "1 klik", label: "Hitung payroll satu batch" },
];

export const PROOF_CLIENTS = [
  "Sinar Logam Nusantara",
  "Mitra Ritel Bersama",
  "Tekstil Cahaya Pratama",
  "Karya Pangan Utama",
  "Baja Mandiri Perkasa",
];
