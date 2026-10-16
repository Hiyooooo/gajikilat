import type { Metadata, Viewport } from "next";
import { Source_Serif_4, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { getSiteConfig } from "@/lib/api";
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

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();

  const title = config.seo.meta_title || site.title;
  const description = config.seo.meta_description || site.description;
  const favicon = config.branding.favicon_url || "/favicon.svg";
  const ogImageUrl = config.seo.og_image_url;

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: config.site.name || site.name,
      locale: site.locale,
      url: "/",
      title,
      description,
      ...(ogImageUrl
        ? {
            images: [
              {
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
    robots: { index: true, follow: true },
    icons: { icon: favicon },
  };
}

export const viewport: Viewport = {
  themeColor: "#0F172A",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();
  const primaryColor = config.branding.primary_color || "#10B981";

  return (
    <html
      lang="id"
      className={`${sourceSerif.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      style={{ "--emerald": primaryColor } as React.CSSProperties}
    >
      <head>
        {config.tracking.ga_id && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${config.tracking.ga_id}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${config.tracking.ga_id}');
                `,
              }}
            />
          </>
        )}
        {config.tracking.meta_pixel_id && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${config.tracking.meta_pixel_id}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
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
