import type { Metadata, Viewport } from "next";
import { Source_Serif_4, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-serif",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${sourceSerif.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink-2 antialiased selection:bg-emerald-100 selection:text-emerald-700">
        <a
          href="#konten-utama"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-[6px] focus:bg-emerald focus:px-4 focus:py-2 focus:text-navy focus:font-semibold focus:outline-2 focus:outline-emerald-700"
        >
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
