import { describe, it, expect } from "vitest";
import { computePayroll } from "./payroll";

describe("computePayroll (docs/04-modules.md §Test vector)", () => {
  const bagasConfig = {
    pokok: 5_600_000,
    tunjanganTetap: 800_000,
    tarifLembur: 32_000,
  };

  const fajarConfig = {
    pokok: 7_800_000,
    tunjanganTetap: 1_200_000,
    tarifLembur: 45_000,
  };

  it("Vektor 1: Bagas | Lembur 12 jam | Unpaid 0 | tanpa reimb", () => {
    const res = computePayroll({
      ...bagasConfig,
      lemburJam: 12,
      unpaidHari: 0,
      reimbursement: false,
    });
    expect(res.bruto).toBe(6_784_000);
    expect(res.tarifTER).toBe(1.25);
    expect(res.pph21).toBe(84_800);
    expect(res.bpjsTK).toBe(192_000);
    expect(res.bpjsKes).toBe(64_000);
    expect(res.bersih).toBe(6_443_200);
    expect(res.ditransfer).toBe(6_443_200);
  });

  it("Vektor 1 (dengan reimb): Bagas | Lembur 12 jam | Unpaid 0 | reimb Rp 250.000", () => {
    const res = computePayroll({
      ...bagasConfig,
      lemburJam: 12,
      unpaidHari: 0,
      reimbursement: true,
    });
    expect(res.bersih).toBe(6_443_200);
    expect(res.ditransfer).toBe(6_693_200);
  });

  it("Vektor 2: Bagas | Lembur 12 jam | Unpaid 1 hari (-224.000) | pergeseran TER ke 1%", () => {
    const res = computePayroll({
      ...bagasConfig,
      lemburJam: 12,
      unpaidHari: 1,
      reimbursement: false,
    });
    expect(res.potongUnpaid).toBe(224_000);
    expect(res.bruto).toBe(6_560_000);
    expect(res.tarifTER).toBe(1.0);
    expect(res.pph21).toBe(65_600);
    expect(res.bpjsTK).toBe(192_000);
    expect(res.bpjsKes).toBe(64_000);
    expect(res.bersih).toBe(6_238_400);
  });

  it("Vektor 3: Bagas | Lembur 14 jam | Unpaid 0", () => {
    const res = computePayroll({
      ...bagasConfig,
      lemburJam: 14,
      unpaidHari: 0,
      reimbursement: false,
    });
    expect(res.lembur).toBe(448_000);
    expect(res.bruto).toBe(6_848_000);
    expect(res.tarifTER).toBe(1.25);
    expect(res.pph21).toBe(85_600);
    expect(res.bersih).toBe(6_506_400);
  });

  it("Vektor 4: Bagas | Lembur 14 jam | Unpaid 1 hari", () => {
    const res = computePayroll({
      ...bagasConfig,
      lemburJam: 14,
      unpaidHari: 1,
      reimbursement: false,
    });
    expect(res.bruto).toBe(6_624_000);
    expect(res.tarifTER).toBe(1.0);
    expect(res.pph21).toBe(66_240);
    expect(res.bersih).toBe(6_301_760);
  });

  it("Vektor 5: Fajar | Lembur 10 jam | Unpaid 0", () => {
    const res = computePayroll({
      ...fajarConfig,
      lemburJam: 10,
      unpaidHari: 0,
      reimbursement: false,
    });
    expect(res.bruto).toBe(9_450_000);
    expect(res.tarifTER).toBe(1.75);
    expect(res.pph21).toBe(165_375);
    expect(res.bpjsTK).toBe(270_000);
    expect(res.bpjsKes).toBe(90_000);
    expect(res.bersih).toBe(8_924_625);
  });

  it("Vektor 6: Fajar | Lembur 10 jam | Unpaid 1 hari (-312.000)", () => {
    const res = computePayroll({
      ...fajarConfig,
      lemburJam: 10,
      unpaidHari: 1,
      reimbursement: false,
    });
    expect(res.potongUnpaid).toBe(312_000);
    expect(res.bruto).toBe(9_138_000);
    expect(res.tarifTER).toBe(1.75);
    expect(res.pph21).toBe(159_915);
    expect(res.bersih).toBe(8_618_085);
  });

  it("Vektor 7: Fajar | Lembur 12 jam | Unpaid 0", () => {
    const res = computePayroll({
      ...fajarConfig,
      lemburJam: 12,
      unpaidHari: 0,
      reimbursement: false,
    });
    expect(res.bruto).toBe(9_540_000);
    expect(res.tarifTER).toBe(1.75);
    expect(res.pph21).toBe(166_950);
    expect(res.bersih).toBe(9_013_050);
  });
});
