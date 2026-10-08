"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Search,
  FileText,
  FileSignature,
  GraduationCap,
  Eye,
} from "lucide-react";
import { LIBRARY_DOCS, LibraryDoc } from "@/lib/data";
import { Card, CardHead, CardBody, CardFoot } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function LibraryCard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredDocs = LIBRARY_DOCS.filter((doc) => {
    const matchesFilter =
      filterType === "all" ? true : doc.tipe === filterType;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesFilter;

    const matchesSearch =
      doc.judul.toLowerCase().includes(q) ||
      (doc.karyawan && doc.karyawan.toLowerCase().includes(q)) ||
      doc.tipeLabel.toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  const getDocIcon = (tipe: LibraryDoc["tipe"]) => {
    switch (tipe) {
      case "bukti-potong":
        return FileText;
      case "kontrak":
        return FileSignature;
      case "sop":
        return BookOpen;
      case "elearning":
        return GraduationCap;
    }
  };

  return (
    <Card as="article" className="border-rule-2">
      {/* Kepala Kartu */}
      <CardHead>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-emerald-50 text-emerald-700">
            <BookOpen className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <span className="font-mono text-[12px] font-semibold tracking-[0.06em] text-ink uppercase">
            LIBRARY
          </span>
        </div>
        <span className="text-[11px] font-mono text-ink-3 bg-canvas px-2 py-0.5 rounded border border-rule">
          7 Dokumen Tersimpan
        </span>
      </CardHead>

      {/* Badan Kartu */}
      <CardBody className="gap-3.5">
        <div>
          <h3 className="font-sans text-[18px] font-semibold text-ink leading-snug">
            Bukti potong dan kontrak, tersimpan rapi.
          </h3>
          <p className="mt-1 text-[13px] text-ink-3 leading-relaxed">
            Arsip 1721-A1, kontrak kerja, SOP, dan e-learning dalam satu pencarian.
          </p>
        </div>

        {/* Input Pencarian dengan kbd */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-ink-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Cari "Bagas", "1721-A1", atau "SOP"...'
            aria-label="Cari dokumen arsip"
            className="w-full h-10 pl-9 pr-14 rounded-[6px] border border-control bg-paper text-[13px] text-ink focus:outline-none focus:ring-2 focus:ring-emerald-700 font-sans"
          />
          <kbd className="absolute right-2.5 top-2.5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-ink-3 bg-canvas border border-rule rounded">
            ⌘ K
          </kbd>
        </div>

        {/* Filter Kategori */}
        <div className="flex flex-wrap gap-1">
          {[
            { id: "all", label: "Semua" },
            { id: "bukti-potong", label: "Bukti Potong" },
            { id: "kontrak", label: "Kontrak" },
            { id: "sop", label: "SOP" },
            { id: "elearning", label: "E-learning" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilterType(f.id)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-[4px] border transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700 min-h-[32px] ${
                filterType === f.id
                  ? "bg-paper border-ink text-ink font-semibold shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
                  : "bg-canvas border-rule text-ink-2 hover:bg-band"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Daftar Dokumen */}
        <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-0.5">
          {filteredDocs.length > 0 ? (
            filteredDocs.map((doc) => {
              const IconComp = getDocIcon(doc.tipe);
              return (
                <div
                  key={doc.id}
                  className="p-2.5 rounded-[6px] border border-rule bg-paper hover:bg-canvas transition-colors flex items-center justify-between gap-2 text-[12px]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-7 w-7 rounded-[4px] bg-canvas border border-rule flex items-center justify-center shrink-0 text-emerald-700">
                      <IconComp className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                    <div className="truncate">
                      <div className="font-semibold text-ink truncate">
                        {doc.judul}
                      </div>
                      <div className="text-[11px] text-ink-3 truncate">
                        {doc.karyawan ? `${doc.karyawan} · ` : ""}
                        {doc.tahunAtauMasa}
                      </div>
                      {doc.progres !== undefined && (
                        <div className="w-24 bg-rule h-1 rounded-full mt-1 overflow-hidden">
                          <div
                            className="bg-emerald h-full rounded-full"
                            style={{ width: `${doc.progres}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Pratinjau: ${doc.judul}`)}
                    aria-label={`Lihat ${doc.judul}`}
                    className="h-7 px-2 rounded-[4px] border border-rule bg-canvas text-ink-2 hover:text-ink text-[11px] font-medium flex items-center gap-1 shrink-0 focus-visible:outline-2 focus-visible:outline-emerald-700"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Lihat</span>
                  </button>
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center text-[12px] text-ink-3 border border-dashed border-rule rounded-[6px]">
              Tidak ada dokumen yang cocok dengan pencarian
            </div>
          )}
        </div>
      </CardBody>

      {/* Footer Chip Sub-fitur */}
      <CardFoot>
        <Badge variant="chip">Arsip 1721-A1</Badge>
        <Badge variant="chip">Kontrak legal</Badge>
        <Badge variant="chip">SOP kantor</Badge>
        <Badge variant="chip">E-learning</Badge>
      </CardFoot>
    </Card>
  );
}
