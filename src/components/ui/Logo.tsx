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
  const isCustomLogo = Boolean(logoUrl && logoUrl !== "/logo.svg");

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-emerald-700 focus-visible:outline-offset-2 rounded-[6px]"
      aria-label={`${siteName} - Beranda`}
    >
      {isCustomLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={siteName}
          className="h-9 w-auto max-h-9 object-contain"
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-[6px] object-contain shrink-0"
          />
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
