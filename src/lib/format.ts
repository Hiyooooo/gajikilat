/**
 * Format angka, mata uang Rupiah, jam, dan persentase
 * Sesuai aturan design system 02 & 04 (IBM Plex Mono tabular, pemformatan id-ID)
 */

export function rupiah(nominal: number): string {
  const rounded = Math.round(nominal);
  return `Rp ${rounded.toLocaleString("id-ID")}`;
}

export function jam(totalJam: number): string {
  return totalJam.toLocaleString("id-ID", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function persen(tarifPersen: number): string {
  return `${tarifPersen.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}%`;
}
