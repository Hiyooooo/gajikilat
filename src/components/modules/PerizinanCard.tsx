"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  Check,
  X,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { usePayrollDemo } from "./PayrollDemoProvider";
import { PERMISSION_REQUESTS } from "@/lib/data";
import { Card, CardHead, CardBody, CardFoot } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function PerizinanCard() {
  const {
    employeeId,
    employee,
    cutiTahunanTerpakai,
    requests,
    approveRequest,
    rejectRequest,
    resetDemo,
  } = usePayrollDemo();

  const [activeRequestIdx, setActiveRequestIdx] = useState(0);

  const activeReq = PERMISSION_REQUESTS[activeRequestIdx];
  const sisaCuti = employee.cutiTahunanDefault - cutiTahunanTerpakai;

  const allReviewed = PERMISSION_REQUESTS.every(
    (req) => requests[req.id] !== "pending"
  );

  return (
    <Card as="article" className="border-rule-2">
      {/* Kepala Kartu */}
      <CardHead>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-emerald-50 text-emerald-700">
            <CalendarCheck className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <span className="font-mono text-[12px] font-semibold tracking-[0.06em] text-ink uppercase">
            PERIZINAN
          </span>
        </div>
        <Badge variant="success">Tersinkron ke Gaji</Badge>
      </CardHead>

      {/* Badan Kartu */}
      <CardBody className="gap-4">
        <div>
          <h3 className="font-sans text-[18px] font-semibold text-ink leading-snug">
            Cuti dan lembur langsung menyesuaikan slip.
          </h3>
          <p className="mt-1 text-[13px] text-ink-3 leading-relaxed">
            Approval berjenjang. Cuti berbayar tidak memotong gaji, cuti tidak dibayar otomatis terpotong di slip.
          </p>
        </div>

        {/* Transparansi Sisa Cuti */}
        <div className="rounded-[6px] border border-rule bg-canvas p-3 space-y-1.5">
          <div className="flex justify-between items-center text-[12px]">
            <span className="font-medium text-ink">Transparansi Hak Cuti Tahunan:</span>
            <span className="font-mono font-semibold text-ink tabular-nums">
              {sisaCuti} dari {employee.cutiTahunanTotal} hari tersisa
            </span>
          </div>
          <div className="w-full bg-rule h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald h-full rounded-full transition-all duration-300"
              style={{
                width: `${(sisaCuti / employee.cutiTahunanTotal) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Selector Item Permintaan */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {PERMISSION_REQUESTS.map((req, idx) => {
            const status = requests[req.id];
            return (
              <button
                key={req.id}
                type="button"
                onClick={() => setActiveRequestIdx(idx)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-[4px] border shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700 ${
                  activeRequestIdx === idx
                    ? "bg-paper border-ink text-ink font-semibold shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
                    : "bg-canvas border-rule text-ink-3 hover:text-ink"
                }`}
              >
                {req.judul}
                {status === "approved" && " ✓"}
                {status === "rejected" && " ✕"}
              </button>
            );
          })}
        </div>

        {/* Kartu Detail Permintaan Aktif */}
        {activeReq && (
          <div className="rounded-[6px] border border-rule-2 bg-paper p-3.5 space-y-2.5 text-[13px]">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-semibold text-ink text-[14px]">
                  {activeReq.judul} · {activeReq.durasi}
                </div>
                <div className="text-[12px] text-ink-3">
                  {activeReq.tanggal} · {activeReq.keterangan}
                </div>
              </div>
              <span
                className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-[4px] border ${
                  activeReq.tipe === "unpaid"
                    ? "bg-danger-bg text-danger border-danger/20"
                    : activeReq.tipe === "lembur"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                    : "bg-canvas text-ink-2 border-rule"
                }`}
              >
                {activeReq.tipe === "unpaid"
                  ? "Unpaid Leave"
                  : activeReq.tipe === "lembur"
                  ? "Lembur Terjadwal"
                  : "Cuti Berbayar"}
              </span>
            </div>

            {/* Stepper Workflow Approval */}
            <div className="flex items-center justify-between text-[11px] font-mono py-1 px-2 bg-canvas rounded border border-rule">
              <span className="text-emerald-700 font-semibold">1. Diajukan ✓</span>
              <span className="text-rule-2">→</span>
              <span className="text-emerald-700 font-semibold">2. Atasan Lini ✓</span>
              <span className="text-rule-2">→</span>
              <span className="text-ink font-bold">3. Verifikasi HR</span>
            </div>

            {/* Dampak ke Slip Gaji */}
            <div className="flex items-center justify-between p-2 rounded bg-band text-[12px]">
              <span className="text-ink-2">Dampak ke Gaji:</span>
              <span className="font-mono font-bold text-ink">
                {activeReq.dampakPotongan[employeeId]}
              </span>
            </div>

            {/* Tombol Approval atau Status */}
            {requests[activeReq.id] === "pending" ? (
              <div className="flex gap-2 pt-1">
                <Button
                  variant="primary"
                  onClick={() => approveRequest(activeReq.id)}
                  className="flex-1 h-9 text-[13px]"
                >
                  <Check className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
                  Setujui
                </Button>
                <button
                  type="button"
                  onClick={() => rejectRequest(activeReq.id)}
                  className="flex-1 h-9 flex items-center justify-center gap-1.5 rounded-[6px] border border-danger/40 text-danger text-[13px] font-semibold hover:bg-danger-bg transition-colors focus-visible:outline-2 focus-visible:outline-danger"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                  Tolak
                </button>
              </div>
            ) : (
              <div
                className={`p-2 rounded text-[12px] font-medium flex items-center justify-between ${
                  requests[activeReq.id] === "approved"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-danger-bg text-danger border border-danger/20"
                }`}
              >
                <span>
                  Status: Permintaan telah{" "}
                  {requests[activeReq.id] === "approved" ? "disetujui" : "ditolak"}
                </span>
                <span className="font-mono font-bold">
                  {requests[activeReq.id] === "approved" ? "DISETUJUI" : "DITOLAK"}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Banner Selesai Semua & Tombol Reset */}
        {allReviewed && (
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-[6px] flex items-center justify-between text-[12px] text-emerald-700">
            <div className="flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Semua permintaan sudah ditinjau</span>
            </div>
            <button
              type="button"
              onClick={resetDemo}
              className="inline-flex items-center gap-1 text-[11px] font-mono underline hover:text-emerald-900"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        )}
      </CardBody>

      {/* Footer Chip Sub-fitur */}
      <CardFoot>
        <Badge variant="chip">Approval cuti</Badge>
        <Badge variant="chip">Izin sakit</Badge>
        <Badge variant="chip">Lembur</Badge>
        <Badge variant="chip">Sisa cuti transparan</Badge>
        <Badge variant="chip">Berbayar vs unpaid</Badge>
      </CardFoot>
    </Card>
  );
}
