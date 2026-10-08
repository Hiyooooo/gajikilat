/**
 * Simulasi hemat waktu & biaya penggajian
 * Spesifikasi docs/04-modules.md §0
 *
 * Rumus murni:
 * jamManual   = n * menitManual / 60
 * jamGajiKilat = (30 + 0.2 * n) / 60   // 30 mnt setup tetap + 0.2 mnt review per karyawan
 * jamHemat    = jamManual - jamGajiKilat
 * hematBulan  = jamHemat * tarifJam
 * hematTahun  = hematBulan * 12
 */

export interface SavingsResult {
  jamManual: number;
  jamGajiKilat: number;
  jamHemat: number;
  hematBulan: number;
  hematTahun: number;
}

export function simulateSavings(
  n: number,
  menitManual: number,
  tarifJam: number
): SavingsResult {
  // Validasi & klem input agar tidak pernah NaN / negatif
  const safeN = Math.max(50, Math.min(5000, Number.isFinite(n) ? n : 500));
  const safeMenit = Math.max(1, Number.isFinite(menitManual) ? menitManual : 15);
  const safeTarif = Math.max(0, Number.isFinite(tarifJam) ? tarifJam : 50000);

  const jamManual = (safeN * safeMenit) / 60;
  const jamGajiKilat = (30 + 0.2 * safeN) / 60;
  const jamHemat = jamManual - jamGajiKilat;

  const hematBulanExact = jamHemat * safeTarif;
  const hematBulan = Math.round(hematBulanExact);
  // hematTahun dihitung dari hematBulan SEBELUM pembulatan sesuai spesifikasi
  const hematTahun = Math.round(hematBulanExact * 12);

  return {
    jamManual,
    jamGajiKilat,
    jamHemat,
    hematBulan,
    hematTahun,
  };
}
