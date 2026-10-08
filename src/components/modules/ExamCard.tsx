"use client";

import React, { useState, useEffect } from "react";
import {
  ClipboardCheck,
  ShieldCheck,
  AlertTriangle,
  Check,
  X,
  Clock,
  Award,
} from "lucide-react";
import { EXAM_DATA } from "@/lib/data";
import { Card, CardHead, CardBody, CardFoot } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function ExamCard() {
  const [activeTab, setActiveTab] = useState<
    "rekrutmen" | "kinerja" | "grade" | "teknis"
  >("grade");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(582); // 09:42
  const [violations, setViolations] = useState(0);

  const currentExam = EXAM_DATA[activeTab];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const isLowTime = timerSeconds < 60;

  const handleSelectTab = (tab: "rekrutmen" | "kinerja" | "grade" | "teknis") => {
    setActiveTab(tab);
    setSelectedAnswer(null);
  };

  return (
    <Card as="article" className="border-rule-2">
      {/* Kepala Kartu */}
      <CardHead>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-emerald-50 text-emerald-700">
            <ClipboardCheck className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <span className="font-mono text-[12px] font-semibold tracking-[0.06em] text-ink uppercase">
            EXAM
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Proctoring Aktif</span>
        </div>
      </CardHead>

      {/* Badan Kartu */}
      <CardBody className="gap-3.5">
        <div>
          <h3 className="font-sans text-[18px] font-semibold text-ink leading-snug">
            Ujian kualifikasi untuk grade dan keahlian.
          </h3>
          <p className="mt-1 text-[13px] text-ink-3 leading-relaxed">
            Rekrutmen, evaluasi kinerja, dan uji kompetensi dengan proctoring. Hasil lulus memicu usulan grade gaji.
          </p>
        </div>

        {/* Tab Ujian */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-band rounded-[6px] border border-rule">
          {(["rekrutmen", "kinerja", "grade", "teknis"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleSelectTab(tab)}
              className={`py-1 text-center text-[12px] rounded-[4px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700 ${
                activeTab === tab
                  ? "bg-paper text-ink font-semibold shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
                  : "text-ink-2 hover:text-ink"
              }`}
            >
              {EXAM_DATA[tab].tabLabel}
            </button>
          ))}
        </div>

        {/* Header Soal & Timer */}
        <div className="flex items-center justify-between text-[12px] border-b border-rule pb-2">
          <span className="font-mono text-ink-3 font-medium">
            {currentExam.nomorSoal}
          </span>
          <div
            className={`flex items-center gap-1 font-mono font-bold ${
              isLowTime ? "text-warn" : "text-ink"
            }`}
          >
            {isLowTime && <AlertTriangle className="w-3.5 h-3.5" />}
            <Clock className="w-3.5 h-3.5 text-ink-3" />
            <span>{formatTimer(timerSeconds)}</span>
          </div>
        </div>

        {/* Pertanyaan */}
        <div className="text-[13px] font-medium text-ink leading-snug">
          {currentExam.pertanyaan}
        </div>

        {/* Opsi Pilihan Ganda */}
        <div className="space-y-1.5">
          {currentExam.opsi.map((opsi, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentExam.kunciJawaban;
            const hasAnswered = selectedAnswer !== null;

            let optionStyle =
              "bg-paper border-rule text-ink hover:bg-canvas";
            if (hasAnswered) {
              if (isSelected && isCorrect) {
                optionStyle = "bg-emerald-50 border-emerald-700 text-emerald-700 font-semibold";
              } else if (isSelected && !isCorrect) {
                optionStyle = "bg-danger-bg border-danger text-danger";
              } else if (isCorrect) {
                optionStyle = "bg-emerald-50 border-emerald-100 text-emerald-700";
              } else {
                optionStyle = "bg-canvas border-rule text-ink-3 opacity-60";
              }
            }

            return (
              <button
                key={opsi}
                type="button"
                onClick={() => setSelectedAnswer(idx)}
                className={`w-full text-left p-2.5 rounded-[6px] border text-[12px] flex items-center justify-between transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700 ${optionStyle}`}
              >
                <span>{opsi}</span>
                {hasAnswered && isCorrect && (
                  <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                )}
                {hasAnswered && isSelected && !isCorrect && (
                  <X className="w-4 h-4 text-danger shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hasil Kenaikan Grade / Hasil Lulus */}
        {selectedAnswer !== null && (
          <div className="p-2.5 rounded-[6px] bg-canvas border border-rule-2 space-y-1.5 text-[12px]">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-ink flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-700" />
                <span>Skor: {currentExam.skor}/100</span>
              </span>
              <span className="text-emerald-700 font-mono text-[11px] font-bold">
                LULUS KOMPETENSI
              </span>
            </div>
            <p className="text-[12px] text-ink-2 leading-relaxed">
              {currentExam.hasilKelulusan}
            </p>
          </div>
        )}

        {/* Proctoring Bar & Simulasi Pelanggaran */}
        <div className="mt-auto pt-2 border-t border-rule flex items-center justify-between text-[11px]">
          <span className="text-ink-3 font-mono">
            Log: Layar fokus · Pelanggaran: {violations}
          </span>
          <button
            type="button"
            onClick={() => setViolations((prev) => prev + 1)}
            className="text-[11px] font-mono text-ink-2 bg-canvas border border-rule px-2 py-1 rounded hover:bg-band transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700"
          >
            Simulasi Pelanggaran
          </button>
        </div>
      </CardBody>

      {/* Footer Chip Sub-fitur */}
      <CardFoot>
        <Badge variant="chip">Assessment rekrutmen</Badge>
        <Badge variant="chip">Evaluasi kinerja</Badge>
        <Badge variant="chip">Uji kompetensi</Badge>
        <Badge variant="chip">Proctoring</Badge>
      </CardFoot>
    </Card>
  );
}
