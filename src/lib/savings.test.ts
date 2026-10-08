import { describe, it, expect } from "vitest";
import { simulateSavings } from "./savings";

describe("simulateSavings (docs/04-modules.md §0 test vectors)", () => {
  it("menghitung benar untuk n=500 karyawan", () => {
    const res = simulateSavings(500, 15, 50000);
    expect(res.jamManual).toBeCloseTo(125.0, 1);
    expect(res.jamGajiKilat).toBeCloseTo(2.1667, 4);
    expect(res.jamHemat).toBeCloseTo(122.8333, 4);
    expect(res.hematBulan).toBe(6141667);
    expect(res.hematTahun).toBe(73700000);
  });

  it("menghitung benar untuk n=1000 karyawan", () => {
    const res = simulateSavings(1000, 15, 50000);
    expect(res.jamManual).toBeCloseTo(250.0, 1);
    expect(res.jamGajiKilat).toBeCloseTo(3.8333, 4);
    expect(res.jamHemat).toBeCloseTo(246.1667, 4);
    expect(res.hematBulan).toBe(12308333);
    expect(res.hematTahun).toBe(147700000);
  });

  it("menghitung benar untuk n=5000 karyawan", () => {
    const res = simulateSavings(5000, 15, 50000);
    expect(res.jamManual).toBeCloseTo(1250.0, 1);
    expect(res.jamGajiKilat).toBeCloseTo(17.1667, 4);
    expect(res.jamHemat).toBeCloseTo(1232.8333, 4);
    expect(res.hematBulan).toBe(61641667);
    expect(res.hematTahun).toBe(739700000);
  });

  it("menangani input ekstrem dan tidak valid tanpa NaN", () => {
    const resNaN = simulateSavings(NaN, NaN, NaN);
    expect(Number.isFinite(resNaN.jamManual)).toBe(true);
    expect(Number.isFinite(resNaN.hematTahun)).toBe(true);

    const resClamp = simulateSavings(10, 15, 50000);
    expect(resClamp.jamManual).toBeCloseTo((50 * 15) / 60, 1);
  });
});
