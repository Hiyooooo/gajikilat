"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Clock, CheckCircle2 } from "lucide-react";
import { usePayrollDemo } from "./PayrollDemoProvider";
import { Card, CardHead, CardBody, CardFoot } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { rupiah } from "@/lib/format";

export function AbsensiCard() {
  const { employee, lemburJam } = usePayrollDemo();

  const [selectedShift, setSelectedShift] = useState<"pagi" | "siang" | "malam">("pagi");
  const [clockedIn, setClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [hadirCount, setHadirCount] = useState(1184);

  // Update jam real-time Asia/Jakarta (hanya jalan saat mounted di client)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        new Intl.DateTimeFormat("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Jakarta",
        }).format(now) + " WIB"
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClockToggle = () => {
    if (!clockedIn) {
      setClockedIn(true);
      setHadirCount((prev) => prev + 1);
      setToastMessage(`Check-in berhasil · ${currentTime}`);
    } else {
      setClockedIn(false);
      setHadirCount((prev) => prev - 1);
      setToastMessage(`Check-out tercatat · Durasi shift selesai`);
    }
    setTimeout(() => setToastMessage(""), 4000);
  };

  const shifts = [
    { id: "pagi", label: "Pagi 07–15", desc: "07:00 – 15:00 WIB" },
    { id: "siang", label: "Siang 15–23", desc: "15:00 – 23:00 WIB" },
    { id: "malam", label: "Malam 23–07", desc: "23:00 – 07:00 WIB" },
  ] as const;

  const totalLemburRp = lemburJam * employee.tarifLembur;

  return (
    <Card as="article" className="lg:row-span-2 border-rule-2">
      {/* Kepala Kartu */}
      <CardHead>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-emerald-50 text-emerald-700">
            <MapPin className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <span className="font-mono text-[12px] font-semibold tracking-[0.06em] text-ink uppercase">
            ABSENSI
          </span>
        </div>
        <Badge variant="success">Tersinkron ke Gaji</Badge>
      </CardHead>

      {/* Badan Kartu */}
      <CardBody className="gap-4">
        <div>
          <h3 className="font-sans text-[18px] font-semibold text-ink leading-snug">
            Lembur tercatat otomatis, langsung ke gaji.
          </h3>
          <p className="mt-1 text-[13px] text-ink-3 leading-relaxed">
            Clock-in/out dengan geofencing GPS, shift fleksibel, dan rekap lembur yang masuk ke nominal gaji.
          </p>
        </div>

        {/* 1. Shift Kerja */}
        <div>
          <label className="block text-[11px] font-mono text-ink-3 uppercase mb-1.5">
            Pilih Shift Kerja Pabrik
          </label>
          <div className="grid grid-cols-3 gap-1">
            {shifts.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedShift(s.id)}
                className={`py-1.5 px-2 text-[12px] font-medium rounded-[4px] border text-center transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700 ${
                  selectedShift === s.id
                    ? "bg-paper border-ink text-ink font-semibold shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
                    : "bg-canvas border-rule text-ink-2 hover:bg-band"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Clock In / Out & Jam Berjalan */}
        <div className="rounded-[6px] border border-rule bg-canvas p-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[12px] text-ink-3 font-mono">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>{currentTime || "07:02:14 WIB"}</span>
            </div>
            <div className="text-[13px] font-semibold text-ink mt-0.5">
              {clockedIn ? "Status: Bekerja (07:00 – selesai)" : "Status: Belum Clock-In"}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClockToggle}
            className={`h-9 px-4 rounded-[6px] text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700 ${
              clockedIn
                ? "bg-paper border border-ink text-ink hover:bg-band"
                : "bg-emerald text-navy hover:bg-emerald-600"
            }`}
          >
            {clockedIn ? "Clock Out" : "Clock In"}
          </button>
        </div>

        {/* Toast Notifikasi Live */}
        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="p-2 text-[12px] rounded-[4px] bg-emerald-50 border border-emerald-100 text-emerald-700 font-medium flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 3. GPS Geofencing Mini Map SVG */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[12px]">
            <span className="font-mono text-ink-3 uppercase text-[11px]">
              GPS Geofence: Pabrik Cikarang (Radius 150m)
            </span>
            <span className="text-emerald-700 font-medium text-[11px]">Akurasi ±3m</span>
          </div>

          <div
            className="relative h-28 w-full rounded-[6px] border border-rule bg-canvas overflow-hidden flex items-center justify-center"
            aria-label="Peta geofencing lokasi pabrik"
          >
            <svg
              className="absolute inset-0 w-full h-full opacity-30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid"
                  width="16"
                  height="16"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 16 0 L 0 0 0 16"
                    fill="none"
                    stroke="currentColor"
                    className="text-rule-2"
                    strokeWidth="0.75"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Geofence Perimeter */}
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-700 bg-emerald-50/60 flex items-center justify-center">
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-paper/90 px-1 py-0.5 rounded border border-emerald-100">
                  Area Pabrik
                </span>
              </div>

              {/* Titik Karyawan 1 (Bagas - dalam) */}
              <div
                className="absolute top-2 left-3 flex items-center gap-1"
                title="Bagas Pratama: Di dalam area"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald ring-2 ring-paper" />
              </div>

              {/* Titik Karyawan 2 (Fajar - dalam) */}
              <div
                className="absolute bottom-3 right-4 flex items-center gap-1"
                title="Fajar Nugroho: Di dalam area"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald ring-2 ring-paper" />
              </div>

              {/* Titik Karyawan 3 (Luar Geofence) */}
              <div
                className="absolute -top-3 -right-20 flex items-center gap-1 bg-danger-bg border border-danger/20 px-1.5 py-0.5 rounded text-[10px] text-danger"
                title="Rani Putri: Di luar area geofence"
              >
                <span className="w-2 h-2 rounded-full bg-danger" />
                <span>Di luar area</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Rekap Kehadiran Real-time */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[12px]">
            <span className="text-ink-2 font-medium">Rekap Hari Ini:</span>
            <span className="font-mono text-ink font-semibold tabular-nums">
              {hadirCount} / 1.240 hadir
            </span>
          </div>
          <div className="w-full bg-rule h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald h-full rounded-full transition-all duration-300"
              style={{ width: `${(hadirCount / 1240) * 100}%` }}
            />
          </div>
        </div>

        {/* 5. Rekap Lembur Mingguan -> Masuk ke Gaji */}
        <div className="mt-auto rounded-[6px] border border-rule-2 bg-paper p-3 space-y-2 text-[12px]">
          <div className="flex justify-between items-center pb-1 border-b border-rule">
            <span className="font-mono text-ink-3 uppercase text-[11px]">
              Rekap Lembur Periode Ini
            </span>
            <span className="font-mono font-semibold text-ink tabular-nums">
              Total {lemburJam} Jam
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1 text-center font-mono text-[11px]">
            <div className="bg-canvas p-1 rounded border border-rule">M1: 3j</div>
            <div className="bg-canvas p-1 rounded border border-rule">M2: 4j</div>
            <div className="bg-canvas p-1 rounded border border-rule">M3: 2j</div>
            <div className="bg-canvas p-1 rounded border border-rule">
              M4: {lemburJam - 9}j
            </div>
          </div>
          <div className="pt-1.5 border-t border-rule flex items-center justify-between text-ink font-medium">
            <span className="text-ink-2">Masuk ke Gaji:</span>
            <span className="font-mono font-bold text-emerald-700 tabular-nums">
              {lemburJam}j × {rupiah(employee.tarifLembur)} = {rupiah(totalLemburRp)}
            </span>
          </div>
        </div>
      </CardBody>

      {/* Footer Chip Sub-fitur */}
      <CardFoot>
        <Badge variant="chip">Clock-in/out</Badge>
        <Badge variant="chip">GPS geofencing</Badge>
        <Badge variant="chip">Shift kerja</Badge>
        <Badge variant="chip">Rekap real-time</Badge>
        <Badge variant="chip">Lembur → Gaji</Badge>
      </CardFoot>
    </Card>
  );
}
