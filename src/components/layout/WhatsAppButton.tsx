import { site } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface WhatsAppButtonProps {
  whatsappUrl?: string;
}

export function WhatsAppButton({ whatsappUrl }: WhatsAppButtonProps = {}) {
  const defaultMessage = encodeURIComponent(
    "Halo GajiKilat, saya ingin menjadwalkan demo payroll."
  );
  const href =
    whatsappUrl || `https://wa.me/${site.whatsapp}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className="fixed right-5 bottom-5 z-50 print:hidden"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp dengan tim GajiKilat (tab baru)"
        className="flex h-[52px] items-center gap-2.5 rounded-full bg-navy pl-3.5 pr-5 text-[14px] font-semibold text-on-navy border border-white/25 shadow-[0_4px_12px_rgba(15,23,42,0.25)] hover:bg-navy-2 transition-colors duration-120 focus-visible:outline-2 focus-visible:outline-emerald focus-visible:outline-offset-2 select-none"
      >
        <WhatsAppIcon className="w-6 h-6 shrink-0" />
        <span className="whitespace-nowrap">Chat WhatsApp</span>
      </a>
    </aside>
  );
}
