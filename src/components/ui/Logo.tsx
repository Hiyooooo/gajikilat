import Link from "next/link";

interface LogoProps {
  onNavy?: boolean;
  logoUrl?: string;
  siteName?: string;
}

export function Logo({
  onNavy = false,
  logoUrl,
  siteName = "GajiKilat",
}: LogoProps) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-emerald-700 focus-visible:outline-offset-2 rounded-[6px]"
      aria-label={`${siteName} - Beranda`}
    >
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={siteName}
          className="h-9 w-auto max-h-9 object-contain"
        />
      ) : (
        <>
          <div className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-rule-navy bg-navy shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              {/* Poliline 3 titik custom buatan sendiri (bukan ikon Zap Lucide) */}
              <polyline
                points="18,6 12,17 19,17 14,26"
                stroke="currentColor"
                className="text-emerald"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className={`font-serif text-[22px] font-semibold tracking-[-0.015em] ${
              onNavy ? "text-on-navy" : "text-ink"
            }`}
          >
            {siteName}
          </span>
        </>
      )}
    </Link>
  );
}
