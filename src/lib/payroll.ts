/**
 * Rumus Payroll GajiKilat
 * Spesifikasi docs/04-modules.md §Rumus Payroll
 *
 * Catatan Penyederhanaan Demo (Wajib dilaporkan ke pemilik):
 * (a) Hanya memodelkan TER kategori A (TK/0).
 * (b) Premi JKK/JKM/BPJS Kesehatan yang dibayar pemberi kerja belum dimasukkan ke penghasilan bruto.
 * (c) Batas atas upah iuran JP/Kesehatan tidak dimodelkan (aman untuk kisaran upah demo di bawah batas).
 * (d) Penghitungan ulang masa pajak Desember tidak dimodelkan.
 * Pemilik wajib mengonfirmasi rumus dan tarif dengan konsultan pajak sebelum rilis.
 */

export interface EmployeeSalaryConfig {
  pokok: number;
  tunjanganTetap: number;
  tarifLembur: number;
}

export interface PayrollInput {
  pokok: number;
  tunjanganTetap: number;
  tarifLembur: number;
  lemburJam: number;
  unpaidHari: number;
  reimbursement?: boolean;
}

export interface PayrollResult {
  upahTetap: number;
  lembur: number;
  potongUnpaid: number;
  bruto: number;
  tarifTER: number; // Dalam persen, mis. 1.25 untuk 1.25%
  pph21: number;
  bpjsTK: number;
  bpjsKes: number;
  bersih: number;
  reimb: number;
  ditransfer: number;
}

// Tabel TER Kategori A (PMK 168/2023 - Batas Atas Bruto Bulanan -> Persentase Tarif)
export const TER_A_BRACKETS: ReadonlyArray<{ batasAtas: number; tarif: number }> = [
  { batasAtas: 5_400_000, tarif: 0 },
  { batasAtas: 5_650_000, tarif: 0.25 },
  { batasAtas: 5_950_000, tarif: 0.5 },
  { batasAtas: 6_300_000, tarif: 0.75 },
  { batasAtas: 6_750_000, tarif: 1.0 },
  { batasAtas: 7_500_000, tarif: 1.25 },
  { batasAtas: 8_550_000, tarif: 1.5 },
  { batasAtas: 9_650_000, tarif: 1.75 },
  { batasAtas: 10_050_000, tarif: 2.0 },
  { batasAtas: 10_350_000, tarif: 2.25 },
  { batasAtas: 10_700_000, tarif: 2.5 },
  { batasAtas: 11_050_000, tarif: 3.0 },
  { batasAtas: 11_600_000, tarif: 3.5 },
  { batasAtas: 12_500_000, tarif: 4.0 },
  { batasAtas: 13_750_000, tarif: 5.0 },
  { batasAtas: 15_100_000, tarif: 6.0 },
];

export function lookupTER_A(bruto: number): number {
  if (bruto <= 0) return 0;
  for (const tier of TER_A_BRACKETS) {
    if (bruto <= tier.batasAtas) {
      return tier.tarif;
    }
  }
  // Di atas 15.100.000: di luar cakupan demo, klem ke 6%
  return 6.0;
}

export function computePayroll(input: PayrollInput): PayrollResult {
  const upahTetap = input.pokok + input.tunjanganTetap;
  const lembur = Math.round(input.lemburJam * input.tarifLembur);
  // Pembagi 25 hari kerja
  const potongUnpaid = Math.round((input.pokok / 25) * input.unpaidHari);
  const bruto = input.pokok + input.tunjanganTetap + lembur - potongUnpaid;

  const tarifTER = lookupTER_A(bruto);
  const pph21 = Math.round((bruto * tarifTER) / 100);

  // Porsi karyawan: BPJS Ketenagakerjaan (JHT 2% + JP 1% = 3%), BPJS Kesehatan (1%)
  const bpjsTK = Math.round(upahTetap * 0.03);
  const bpjsKes = Math.round(upahTetap * 0.01);

  const bersih = bruto - pph21 - bpjsTK - bpjsKes;
  const reimb = input.reimbursement ? 250_000 : 0;
  const ditransfer = bersih + reimb;

  return {
    upahTetap,
    lembur,
    potongUnpaid,
    bruto,
    tarifTER,
    pph21,
    bpjsTK,
    bpjsKes,
    bersih,
    reimb,
    ditransfer,
  };
}
