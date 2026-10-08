"use client";

import React, { useState } from "react";
import { FAQS } from "@/lib/data";
import { ChevronDown } from "lucide-react";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="w-full bg-canvas py-16 md:py-20 border-b border-rule">
      <div className="mx-auto max-w-[880px] px-5 md:px-8">
        {/* Aturan Garis + Eyebrow Bernomor */}
        <div className="w-full border-t border-ink mb-3" />
        <div className="font-mono text-[12px] font-medium tracking-[0.08em] uppercase text-ink-3 mb-2">
          07 / FAQ
        </div>

        <h2 className="font-serif text-[28px] md:text-[36px] font-semibold text-ink leading-[1.2]">
          Pertanyaan umum seputar payroll dan regulasi.
        </h2>
        <p className="mt-3 text-[16px] text-ink-2 leading-relaxed">
          Penjelasan teknis perhitungan PPh 21 TER, integrasi BPJS, dan keamanan data karyawan.
        </p>

        {/* Akordeon Aksesibel */}
        <div className="mt-10 divide-y divide-rule border-y border-rule">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-4">
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="flex w-full items-center justify-between gap-4 text-left py-2 text-[16px] font-semibold text-ink hover:text-emerald-700 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700 rounded-[4px]"
                  >
                    <span>{faq.pertanyaan}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-ink-3 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-emerald-700" : ""
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    className="pt-2 pb-3 text-[14px] text-ink-2 leading-relaxed"
                  >
                    {faq.jawaban}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
