import { ShieldCheck, Lock, FileLock2 } from "lucide-react";
import { SecurityBadgeItem } from "@/lib/data";

interface SecurityBadgeProps {
  item: SecurityBadgeItem;
  onNavy?: boolean;
}

export function SecurityBadge({ item, onNavy = false }: SecurityBadgeProps) {
  {/* ILUSTRATIF: ubah ke "Tersertifikasi" hanya bila sertifikat asli ada */}
  const IconComponent =
    item.icon === "Lock"
      ? Lock
      : item.icon === "FileLock2"
      ? FileLock2
      : ShieldCheck;

  return (
    <div
      className={`rounded-[8px] border p-3 flex items-start gap-3 transition-colors ${
        onNavy
          ? "border-rule-navy bg-navy-2/60 text-on-navy"
          : "border-rule-2 bg-paper text-ink"
      }`}
    >
      <div
        className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-[4px] shrink-0 ${
          onNavy
            ? "text-emerald bg-navy-2"
            : "text-emerald-700 bg-emerald-50"
        }`}
      >
        <IconComponent className="w-4 h-4" strokeWidth={1.5} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-mono text-[12px] font-medium tracking-[0.04em] uppercase">
          {item.judul}
        </span>
        <span
          className={`text-[13px] leading-snug mt-0.5 ${
            onNavy ? "text-on-navy-3" : "text-ink-3"
          }`}
        >
          {item.keterangan}
        </span>
      </div>
    </div>
  );
}
