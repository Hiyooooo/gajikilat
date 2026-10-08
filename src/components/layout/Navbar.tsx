"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Modul", href: "#modul" },
    { label: "Cara Kerja", href: "#cara-kerja" },
    { label: "Keamanan", href: "#keamanan" },
    { label: "Harga", href: "#harga" },
    { label: "FAQ", href: "#faq" },
  ];

  const demoMailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Jadwalkan Demo GajiKilat"
  )}`;

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-rule bg-paper">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav aria-label="Utama" className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-ink-2 hover:text-ink transition-colors focus-visible:outline-2 focus-visible:outline-emerald-700 focus-visible:outline-offset-2 rounded-[4px] py-1 px-1.5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="secondary" href="#simulasi">
            Hitung Simulasi
          </Button>
          <Button variant="primary" href={demoMailto} isExternal>
            Jadwalkan Demo
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={mobileMenuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-[6px] border border-rule text-ink hover:bg-canvas focus-visible:outline-2 focus-visible:outline-emerald-700"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi mobile"
          className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col bg-paper border-t border-rule px-6 py-6 md:hidden overflow-y-auto"
        >
          <nav aria-label="Mobile" className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-[17px] font-semibold text-ink border-b border-rule hover:text-emerald-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <Button
              variant="secondary"
              href="#simulasi"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              Hitung Simulasi
            </Button>
            <Button
              variant="primary"
              href={demoMailto}
              isExternal
              onClick={() => setMobileMenuOpen(false)}
              className="w-full"
            >
              Jadwalkan Demo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
