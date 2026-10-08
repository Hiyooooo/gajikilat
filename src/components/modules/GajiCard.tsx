"use client";

import React, { useState } from "react";
import {
  Wallet,
  Link2,
  FileText,
  Send,
  Loader2,
  CheckCircle2,
  RotateCw,
  X,
  Printer,
} from "lucide-react";
import { usePayrollDemo } from "./PayrollDemoProvider";
import { rupiah, persen } from "@/lib/format";
import { Card, CardHead, CardBody, CardFoot } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function GajiCard() {
  const {
    employeeId,
    employee,
    lemburJam,
    unpaidHari,
    reimbursement,
    payrollResult,
    setEmployeeId,
    setReimbursement,
  } = usePayrollDemo();

  const [isCalculating, setIsCalculating] = useState(false);
  const [showSlipModal, setShowSlipModal] = useState(false);
  const [transferStep, setTransferStep] = useState<
    "idle" | "validating" | "sending" | "success"
  >("idle");
  const [transferTimestamp, setTransferTimestamp] = useState("");

  const handleRecalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
    }, 600);
  };

  const handleTransfer = () => {
    setTransferStep("validating");
    setTimeout(() => {
      setTransferStep("sending");
      setTimeout(() => {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Jakarta",
        }).format(now);
        setTransferTimestamp(`${timeStr} WIB`);
        setTransferStep("success");
      }, 700);
    }, 600);
  };

  return (
    <>
      <Card
        as="article"
        className="md:col-span-2 lg:col-span-2 lg:row-span-2 border-rule-2"
      >
        {/* Kepala Kartu */}
        <CardHead>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-emerald-50 text-emerald-700">
              <Wallet className="h-4 w-4" strokeWidth={1.5} />
            </div>
            <span className="font-mono text-[12px] font-semibold tracking-[0.06em] text-ink uppercase">
              GAJI
            </span>
          </div>
          <Badge variant="success">Tersinkron ke Gaji</Badge>
        </CardHead>

        {/* Badan Kartu */}
        <CardBody className="gap-5">
          <div>
            <h3 className="font-sans text-[18px] md:text-[20px] font-semibold text-ink leading-snug">
              Payroll dihitung dari data, bukan dari ingatan.
            </h3>
            <p className="mt-1 text-[14px] text-ink-3 leading-relaxed">
              PPh 21 TER, BPJS, lembur, dan potongan cuti dihitung otomatis lalu ditransfer dari satu batch.
            </p>
          </div>

          {/* Grid Kiri (Input & Sumber) + Kanan (Rincian Slip Gaji) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
            {/* KIRI: Input & Sumber Data (5 kolom di desktop) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Segmented Selector Karyawan */}
              <div>
                <label className="block text-[12px] font-mono uppercase tracking-[0.05em] text-ink-3 mb-1.5">
                  Pilih Karyawan Contoh
                </label>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-band rounded-[6px] border border-rule">
                  <button
                    type="button"
                    onClick={() => setEmployeeId("bagas")}
                    className={`px-2.5 py-1.5 text-left rounded-[4px] transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700 ${
                      employeeId === "bagas"
                        ? "bg-paper text-ink font-semibold shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
                        : "text-ink-2 hover:text-ink text-[13px]"
                    }`}
                  >
                    <div className="text-[13px] leading-tight">Bagas Pratama</div>
                    <div className="text-[11px] text-ink-3">Operator · Cikarang</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmployeeId("fajar")}
                    className={`px-2.5 py-1.5 text-left rounded-[4px] transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700 ${
                      employeeId === "fajar"
                        ? "bg-paper text-ink font-semibold shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
                        : "text-ink-2 hover:text-ink text-[13px]"
                    }`}
                  >
                    <div className="text-[13px] leading-tight">Fajar Nugroho</div>
                    <div className="text-[11px] text-ink-3">Supervisor · Karawang</div>
                  </button>
                </div>
              </div>

              {/* Panel Data Masuk Otomatis */}
              <div className="rounded-[6px] border border-rule bg-canvas p-3.5 space-y-2 text-[13px]">
                <div className="flex items-center gap-1.5 text-[12px] font-mono text-ink-3 uppercase pb-1 border-b border-rule">
                  <Link2 className="w-3.5 h-3.5 text-emerald-700" strokeWidth={1.5} />
                  <span>Data Masuk Otomatis</span>
                </div>
                <div className="flex justify-between items-center text-ink-2">
                  <span>Lembur dari Absensi:</span>
                  <span className="font-mono font-semibold text-ink tabular-nums">
                    {lemburJam} jam
                  </span>
                </div>
                <div className="flex justify-between items-center text-ink-2">
                  <span>Unpaid dari Perizinan:</span>
                  <span className="font-mono font-semibold text-ink tabular-nums">
                    {unpaidHari} hari
                  </span>
                </div>
              </div>

              {/* Toggle Reimbursement */}
              <label className="flex items-center justify-between p-3 rounded-[6px] border border-rule bg-paper cursor-pointer hover:bg-canvas transition-colors">
                <span className="text-[13px] font-medium text-ink">
                  Klaim transport (+Rp 250 rb)
                </span>
                <input
                  type="checkbox"
                  checked={reimbursement}
                  onChange={(e) => setReimbursement(e.target.checked)}
                  className="h-4 w-4 rounded border-control text-emerald-700 focus:ring-emerald-700 cursor-pointer"
                />
              </label>

              {/* Tombol Hitung Ulang & Pratinjau Slip */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleRecalculate}
                  disabled={isCalculating}
                  className="h-10 px-3 flex items-center justify-center gap-2 rounded-[6px] border border-ink text-ink text-[13px] font-semibold hover:bg-canvas transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700"
                >
                  <RotateCw
                    className={`w-3.5 h-3.5 ${isCalculating ? "animate-spin" : ""}`}
                    strokeWidth={1.5}
                  />
                  <span>{isCalculating ? "Menghitung..." : "Hitung Ulang"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSlipModal(true)}
                  className="h-10 px-3 flex items-center justify-center gap-2 rounded-[6px] bg-canvas border border-rule text-ink text-[13px] font-semibold hover:bg-band transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-700" strokeWidth={1.5} />
                  <span>Lihat Slip Gaji Digital</span>
                </button>
              </div>

              {/* Transfer Massal Instan */}
              <div className="pt-2 border-t border-rule">
                <div className="text-[11px] font-mono text-ink-3 uppercase mb-1.5">
                  Batch: 1.240 Karyawan · Batch Okt 2026
                </div>
                {transferStep === "idle" && (
                  <Button
                    variant="primary"
                    onClick={handleTransfer}
                    className="w-full h-10 text-[13px]"
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.5} />
                    Kirim Transfer Bank Instan
                  </Button>
                )}
                {transferStep === "validating" && (
                  <div className="h-10 px-3 flex items-center justify-center gap-2 rounded-[6px] bg-canvas border border-rule text-ink-2 text-[12px] font-medium">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-700" strokeWidth={1.5} />
                    <span>Memvalidasi 1.240 rekening...</span>
                  </div>
                )}
                {transferStep === "sending" && (
                  <div className="h-10 px-3 flex items-center justify-center gap-2 rounded-[6px] bg-canvas border border-rule text-ink-2 text-[12px] font-medium">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-700" strokeWidth={1.5} />
                    <span>Mengirim instruksi transfer ke bank...</span>
                  </div>
                )}
                {transferStep === "success" && (
                  <div className="p-2.5 rounded-[6px] bg-emerald-50 border border-emerald-100 flex flex-col gap-1 text-[12px]">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
                      <span>Transfer Berhasil · {transferTimestamp}</span>
                    </div>
                    <span className="text-ink-3 text-[11px]">
                      Instruksi batch diproses ke rekening bank karyawan
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* KANAN: Tabel Rincian ala Buku Besar / Slip Gaji (7 kolom di desktop) */}
            <div className="lg:col-span-7 bg-paper border border-rule rounded-[6px] p-4 text-[13px] flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-rule">
                  <div>
                    <div className="font-semibold text-ink text-[14px]">
                      {employee.nama}
                    </div>
                    <div className="text-[12px] text-ink-3">
                      {employee.jabatan} · {employee.lokasi}
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-ink-3 bg-canvas border border-rule px-2 py-0.5 rounded-[4px]">
                    {employee.ptkp}
                  </span>
                </div>

                {/* Komponen Pendapatan */}
                <div className="flex items-center justify-between">
                  <span className="text-ink-2">Gaji pokok</span>
                  <div className="dotted-leader" />
                  <span className="font-mono text-ink tabular-nums">
                    {rupiah(employee.pokok)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-ink-2">Tunjangan tetap</span>
                  <div className="dotted-leader" />
                  <span className="font-mono text-ink tabular-nums">
                    {rupiah(employee.tunjanganTetap)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-ink-2">
                    Lembur ({lemburJam} jam × {rupiah(employee.tarifLembur)})
                  </span>
                  <div className="dotted-leader" />
                  <span className="font-mono text-emerald-700 tabular-nums">
                    +{rupiah(payrollResult.lembur)}
                  </span>
                </div>

                {unpaidHari > 0 && (
                  <div className="flex items-center justify-between bg-emerald-50/50 px-1 py-0.5 rounded">
                    <span className="text-ink-2">
                      Potongan unpaid leave ({unpaidHari} hari)
                    </span>
                    <div className="dotted-leader" />
                    <span className="font-mono text-danger tabular-nums">
                      -{rupiah(payrollResult.potongUnpaid)}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-rule font-semibold">
                  <span className="text-ink">Penghasilan bruto</span>
                  <div className="dotted-leader" />
                  <span className="font-mono text-ink tabular-nums">
                    {rupiah(payrollResult.bruto)}
                  </span>
                </div>

                {/* Komponen Potongan Pajak & BPJS */}
                <div className="pt-2 border-t border-rule space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-ink-2">
                      PPh 21 (TER A {persen(payrollResult.tarifTER)})
                    </span>
                    <div className="dotted-leader" />
                    <span className="font-mono text-danger tabular-nums">
                      -{rupiah(payrollResult.pph21)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-ink-2">
                      BPJS Ketenagakerjaan (JHT 2% + JP 1%)
                    </span>
                    <div className="dotted-leader" />
                    <span className="font-mono text-danger tabular-nums">
                      -{rupiah(payrollResult.bpjsTK)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-ink-2">BPJS Kesehatan (1%)</span>
                    <div className="dotted-leader" />
                    <span className="font-mono text-danger tabular-nums">
                      -{rupiah(payrollResult.bpjsKes)}
                    </span>
                  </div>
                </div>

                {/* Subtotal Gaji Bersih */}
                <div className="flex items-center justify-between pt-1 border-t border-rule font-medium">
                  <span className="text-ink">Gaji bersih</span>
                  <div className="dotted-leader" />
                  <span className="font-mono text-ink font-semibold tabular-nums">
                    {rupiah(payrollResult.bersih)}
                  </span>
                </div>

                {reimbursement && (
                  <div className="flex items-center justify-between">
                    <span className="text-ink-2">Reimbursement transport</span>
                    <div className="dotted-leader" />
                    <span className="font-mono text-emerald-700 tabular-nums">
                      +{rupiah(payrollResult.reimb)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Ditransfer Garis Ganda */}
              <div className="double-line-top pt-3 mt-3 flex items-baseline justify-between">
                <div>
                  <span className="block text-[14px] font-bold text-ink">
                    Total Ditransfer
                  </span>
                  <span className="text-[11px] text-ink-3">
                    Ke rekening terdaftar karyawan
                  </span>
                </div>
                <span className="font-mono text-[20px] md:text-[22px] font-bold text-emerald-700 tabular-nums">
                  {rupiah(payrollResult.ditransfer)}
                </span>
              </div>
            </div>
          </div>

          <p className="text-[12px] text-ink-3 italic mt-1">
            Simulasi ilustratif, bukan nasihat pajak.
          </p>
        </CardBody>

        {/* Footer Chip Sub-fitur */}
        <CardFoot>
          <Badge variant="chip">Hitung otomatis</Badge>
          <Badge variant="chip">PPh 21 TER</Badge>
          <Badge variant="chip">BPJS TK & Kes</Badge>
          <Badge variant="chip">Slip digital</Badge>
          <Badge variant="chip">Reimbursement</Badge>
          <Badge variant="chip">Transfer bank</Badge>
        </CardFoot>
      </Card>

      {/* Modal Dialog Slip Gaji Digital */}
      {showSlipModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="slip-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60"
        >
          <div className="bg-paper border border-rule-2 rounded-[8px] max-w-lg w-full p-6 text-ink shadow-[0_4px_12px_rgba(15,23,42,0.25)] max-h-[90vh] overflow-y-auto flex flex-col justify-between">
            <div>
              {/* Kop Slip */}
              <div className="flex justify-between items-start border-b border-rule pb-4 mb-4">
                <div>
                  <div className="text-[11px] font-mono text-ink-3 uppercase tracking-wider">
                    PT SINAR LOGAM NUSANTARA (CONTOH)
                  </div>
                  <h4 id="slip-title" className="font-serif text-[18px] font-semibold text-ink">
                    Slip Gaji Karyawan · Periode Oktober 2026
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSlipModal(false)}
                  aria-label="Tutup slip gaji"
                  className="h-8 w-8 rounded-[4px] border border-rule text-ink hover:bg-canvas flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Data Karyawan */}
              <div className="grid grid-cols-2 gap-2 text-[13px] bg-canvas p-3 rounded-[6px] border border-rule mb-4">
                <div>
                  <span className="text-ink-3 text-[11px] block">Nama Karyawan:</span>
                  <span className="font-semibold text-ink">{employee.nama}</span>
                </div>
                <div>
                  <span className="text-ink-3 text-[11px] block">Jabatan / Lokasi:</span>
                  <span className="text-ink">{employee.jabatan} ({employee.lokasi})</span>
                </div>
                <div>
                  <span className="text-ink-3 text-[11px] block">Status Pajak:</span>
                  <span className="text-ink font-mono">{employee.ptkp}</span>
                </div>
                <div>
                  <span className="text-ink-3 text-[11px] block">Metode Pembayaran:</span>
                  <span className="text-ink">Transfer Bank Batch</span>
                </div>
              </div>

              {/* Baris Rincian */}
              <div className="space-y-2 text-[13px] border-b border-rule pb-4 mb-4">
                <div className="flex justify-between">
                  <span>Gaji Pokok</span>
                  <span className="font-mono">{rupiah(employee.pokok)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tunjangan Tetap</span>
                  <span className="font-mono">{rupiah(employee.tunjanganTetap)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Upah Lembur ({lemburJam} jam)</span>
                  <span className="font-mono text-emerald-700">+{rupiah(payrollResult.lembur)}</span>
                </div>
                {unpaidHari > 0 && (
                  <div className="flex justify-between">
                    <span>Potongan Cuti Tidak Dibayar ({unpaidHari} hari)</span>
                    <span className="font-mono text-danger">-{rupiah(payrollResult.potongUnpaid)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold pt-1 border-t border-rule">
                  <span>Penghasilan Bruto</span>
                  <span className="font-mono">{rupiah(payrollResult.bruto)}</span>
                </div>
                <div className="flex justify-between text-ink-2">
                  <span>Potongan PPh 21 (TER {persen(payrollResult.tarifTER)})</span>
                  <span className="font-mono text-danger">-{rupiah(payrollResult.pph21)}</span>
                </div>
                <div className="flex justify-between text-ink-2">
                  <span>BPJS Ketenagakerjaan (3%)</span>
                  <span className="font-mono text-danger">-{rupiah(payrollResult.bpjsTK)}</span>
                </div>
                <div className="flex justify-between text-ink-2">
                  <span>BPJS Kesehatan (1%)</span>
                  <span className="font-mono text-danger">-{rupiah(payrollResult.bpjsKes)}</span>
                </div>
                {reimbursement && (
                  <div className="flex justify-between">
                    <span>Reimbursement Klaim Transport</span>
                    <span className="font-mono text-emerald-700">+{rupiah(payrollResult.reimb)}</span>
                  </div>
                )}
                <div className="double-line-top pt-2 flex justify-between font-bold text-[15px]">
                  <span>Total Ditransfer</span>
                  <span className="font-mono text-emerald-700">{rupiah(payrollResult.ditransfer)}</span>
                </div>
              </div>

              {/* Baris Keterangan Otomatis */}
              <div className="text-[12px] bg-canvas p-3 rounded-[6px] border border-rule text-ink-3">
                <span className="font-semibold text-ink block mb-0.5">Catatan Periode:</span>
                Cuti tahunan terpakai berjalan · Lembur teregistrasi absensi ({lemburJam} jam)
                {unpaidHari > 0 ? ` · Izin tidak dibayar (${unpaidHari} hari) terpotong.` : " · Tanpa potongan absensi."}
              </div>
            </div>

            {/* Aksi Modal */}
            <div className="mt-6 flex justify-end gap-3 pt-3 border-t border-rule">
              <Button
                variant="secondary"
                onClick={() => setShowSlipModal(false)}
                className="h-9 px-4 text-[13px]"
              >
                Tutup
              </Button>
              <button
                type="button"
                onClick={() => alert("Pratinjau unduh PDF ilustratif")}
                className="inline-flex h-9 items-center gap-1.5 rounded-[6px] bg-canvas border border-ink px-4 text-[13px] font-semibold text-ink hover:bg-band"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Unduh PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
