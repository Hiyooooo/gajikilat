"use client";

import React, { useState, useId } from "react";
import { site } from "@/lib/site";
import { simulateSavings } from "@/lib/savings";
import { rupiah, jam } from "@/lib/format";
import { Button } from "@/components/ui/Button";

export function SavingsCalculator() {
  const [karyawan, setKaryawan] = useState(500);
  const [menitManual, setMenitManual] = useState(15);
  const [tarifJam, setTarifJam] = useState(50000);

  const karyawanId = useId();
  const menitId = useId();
  const tarifId = useId();

  const result = simulateSavings(karyawan, menitManual, tarifJam);

  const mailtoCalculated = `mailto:${site.email}?subject=${encodeURIComponent(
    `Permintaan Analisis Hemat Waktu Payroll (${karyawan} Karyawan)`
  )}`;

  return (
    <div
      id="simulasi"
      className="bg-paper border border-rule-2 rounded-[8px] shadow-[0_1px_2px_rgba(15,23,42,0.06)] p-5 md:p-6 text-ink flex flex-col justify-between"
    >
      <div>
        {/* Header Kartu */}
        <div className="flex items-center justify-between border-b border-rule pb-3 mb-5">
          <span className="font-mono text-[12px] font-medium tracking-[0.06em] text-ink-3 uppercase">
            KALKULATOR EFISIENSI
          </span>
          <span className="text-[12px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-[4px] border border-emerald-100">
            Simulasi Hidup
          </span>
        </div>

        <h3 className="font-serif text-[20px] font-semibold text-ink leading-snug mb-5">
          Simulasi hemat waktu penggajian
        </h3>

        {/* Input Controls */}
        <div className="space-y-4 mb-6">
          {/* 1. Jumlah Karyawan */}
          <div>
            <div className="flex justify-between items-center text-[13px] font-medium text-ink mb-1.5">
              <label htmlFor={karyawanId}>Jumlah karyawan</label>
              <div className="flex items-center gap-1.5">
                <input
                  id={karyawanId}
                  type="number"
                  min={50}
                  max={5000}
                  step={50}
                  value={karyawan}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setKaryawan(Math.max(50, Math.min(5000, val || 50)));
                  }}
                  className="w-20 text-right h-8 px-2 rounded-[6px] border border-control bg-paper font-mono text-[13px] text-ink focus:outline-none focus:ring-2 focus:ring-emerald-700 tabular-nums"
                />
                <span className="text-ink-3 text-[12px]">orang</span>
              </div>
            </div>
            <input
              type="range"
              min={50}
              max={5000}
              step={50}
              value={karyawan}
              onChange={(e) => setKaryawan(Number(e.target.value))}
              aria-label="Atur jumlah karyawan"
              className="w-full h-2 bg-rule-2 rounded-lg appearance-none cursor-pointer accent-navy focus-visible:outline-2 focus-visible:outline-emerald-700"
            />
            <div className="flex justify-between text-[11px] font-mono text-ink-3 mt-1">
              <span>50</span>
              <span>2.500</span>
              <span>5.000</span>
            </div>
          </div>

          {/* 2. Waktu Proses Manual */}
          <div>
            <label
              htmlFor={menitId}
              className="block text-[13px] font-medium text-ink mb-1.5"
            >
              Waktu proses manual per karyawan (menit/bulan)
            </label>
            <select
              id={menitId}
              value={menitManual}
              onChange={(e) => setMenitManual(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-[6px] border border-control bg-paper text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-emerald-700 font-sans cursor-pointer"
            >
              <option value={5}>5 menit / karyawan</option>
              <option value={10}>10 menit / karyawan</option>
              <option value={15}>15 menit / karyawan (rata-rata pabrik)</option>
              <option value={20}>20 menit / karyawan</option>
              <option value={25}>25 menit / karyawan</option>
              <option value={30}>30 menit / karyawan</option>
            </select>
          </div>

          {/* 3. Biaya Staf HR per Jam */}
          <div>
            <label
              htmlFor={tarifId}
              className="block text-[13px] font-medium text-ink mb-1.5"
            >
              Biaya staf HR per jam (Rp)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-[14px] text-ink-3 font-mono">
                Rp
              </span>
              <input
                id={tarifId}
                type="number"
                min={10000}
                step={5000}
                value={tarifJam}
                onChange={(e) => setTarifJam(Math.max(0, Number(e.target.value) || 0))}
                className="w-full h-11 pl-10 pr-3 rounded-[6px] border border-control bg-paper text-[14px] font-mono text-ink focus:outline-none focus:ring-2 focus:ring-emerald-700 tabular-nums"
              />
            </div>
          </div>
        </div>

        {/* Tabel Rincian Output */}
        <div
          role="region"
          aria-live="polite"
          aria-atomic="true"
          className="bg-canvas border border-rule rounded-[6px] p-4 space-y-2.5 text-[14px]"
        >
          <div className="flex items-center justify-between">
            <span className="text-ink-2">Proses manual</span>
            <div className="dotted-leader" />
            <span className="font-mono text-ink tabular-nums">
              {jam(result.jamManual)} jam / bulan
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-ink-2">Dengan GajiKilat</span>
            <div className="dotted-leader" />
            <span className="font-mono text-ink tabular-nums">
              {jam(result.jamGajiKilat)} jam / bulan
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-rule font-medium">
            <span className="text-ink font-semibold">Waktu dihemat</span>
            <div className="dotted-leader" />
            <span className="font-mono text-emerald-700 font-semibold tabular-nums">
              {jam(result.jamHemat)} jam / bulan
            </span>
          </div>

          <div className="flex items-center justify-between text-ink-2">
            <span>Setara biaya staf</span>
            <div className="dotted-leader" />
            <span className="font-mono text-ink tabular-nums">
              {rupiah(result.hematBulan)} / bulan
            </span>
          </div>

          {/* Total Besar dengan Garis Ganda */}
          <div className="double-line-top pt-3 mt-3 flex items-baseline justify-between">
            <span className="text-[14px] font-semibold text-ink">
              Estimasi Penghematan
            </span>
            <div className="text-right">
              <span className="block font-mono text-[22px] md:text-[24px] font-bold text-emerald-700 tabular-nums leading-none">
                {rupiah(result.hematTahun)}
              </span>
              <span className="text-[12px] text-ink-3 font-mono">/ tahun</span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-[12px] text-ink-3 leading-relaxed">
          Estimasi ilustratif dengan asumsi di atas. Hasil nyata bergantung pada proses dan jumlah cabang Anda.
        </p>
      </div>

      {/* Tombol Aksi */}
      <div className="mt-6">
        <Button variant="primary" href={mailtoCalculated} isExternal className="w-full">
          Minta hitungan untuk perusahaan Anda
        </Button>
      </div>
    </div>
  );
}
