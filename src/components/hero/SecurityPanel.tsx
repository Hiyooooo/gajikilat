import { SECURITY_BADGES } from "@/lib/data";
import { SecurityBadge } from "@/components/ui/SecurityBadge";
import { ArrowRight } from "lucide-react";

export function SecurityPanel() {
  return (
    <div className="flex flex-col justify-between rounded-[8px] border border-rule-navy bg-navy-2/40 p-5 md:p-6 text-on-navy">
      <div>
        <div className="flex items-center justify-between border-b border-rule-navy pb-3 mb-4">
          <span className="font-mono text-[12px] font-medium tracking-[0.06em] text-on-navy-3 uppercase">
            KEPATUHAN & DATA
          </span>
          <span className="h-2 w-2 rounded-full bg-emerald" aria-hidden="true" />
        </div>

        <h3 className="font-serif text-[18px] font-semibold text-on-navy leading-snug mb-4">
          Keamanan data penggajian
        </h3>

        <div className="space-y-3">
          {SECURITY_BADGES.map((badge) => (
            <SecurityBadge key={badge.judul} item={badge} onNavy />
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-rule-navy">
        <a
          href="#keamanan"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-emerald hover:text-emerald-500 transition-colors focus-visible:outline-2 focus-visible:outline-emerald rounded-[4px]"
        >
          <span>Lihat detail keamanan dan kepatuhan</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </a>
      </div>
    </div>
  );
}
