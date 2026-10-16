import { site } from "./site";

export interface SiteConfig {
  site: {
    id: string;
    name: string;
    domain: string;
  };
  branding: {
    logo_url: string;
    favicon_url: string;
    primary_color: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta_text: string;
  };
  cta: {
    whatsapp_number: string;
    whatsapp_message_template: string;
    whatsapp_url: string;
  };
  contact: {
    email: string;
    phone: string;
    social_links: Array<{ platform?: string; name?: string; url: string }>;
  };
  footer_text: string;
  tracking: {
    ga_id: string | null;
    meta_pixel_id: string | null;
  };
  seo: {
    meta_title: string;
    meta_description: string;
    keywords: string[];
    og_image_url: string;
  };
}

export const DEFAULT_CONFIG: SiteConfig = {
  site: {
    id: "02-gajikilat",
    name: site.name,
    domain: site.url,
  },
  branding: {
    logo_url: "",
    favicon_url: "/favicon.svg",
    primary_color: "#10B981", // default emerald
  },
  hero: {
    headline: "Payroll akurat. Bebas salah hitung.",
    subheadline:
      "PPh 21 dan BPJS dihitung otomatis dari data absensi dan perizinan, lalu diperiksa sebelum transfer. Tidak ada rekap lembur yang diketik ulang.",
    cta_text: "Jadwalkan Demo",
  },
  cta: {
    whatsapp_number: site.whatsapp,
    whatsapp_message_template:
      "Halo GajiKilat, saya ingin menjadwalkan demo payroll.",
    whatsapp_url: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
      "Halo GajiKilat, saya ingin menjadwalkan demo payroll.",
    )}`,
  },
  contact: {
    email: site.email,
    phone: "",
    social_links: [],
  },
  footer_text: "© 2026 GajiKilat. Seluruh hak dilindungi.",
  tracking: {
    ga_id: null,
    meta_pixel_id: null,
  },
  seo: {
    meta_title: site.title,
    meta_description: site.description,
    keywords: [
      "HRIS",
      "Payroll",
      "PPh 21 TER",
      "BPJS Ketenagakerjaan",
      "BPJS Kesehatan",
    ],
    og_image_url: "",
  },
};

export async function getSiteConfig(): Promise<SiteConfig> {
  const apiUrl = process.env.API_URL;
  const siteId = process.env.SITE_ID || "02-gajikilat";
  const siteSecret = process.env.SITE_SECRET;

  if (!apiUrl || !siteSecret) {
    return DEFAULT_CONFIG;
  }

  try {
    const cleanUrl = apiUrl.replace(/\/+$/, "");
    const revalidateSeconds = Number(process.env.REVALIDATE_SECONDS) || 10;
    const response = await fetch(`${cleanUrl}/api/v1/site/config`, {
      method: "GET",
      headers: {
        "X-Site-Id": siteId,
        "X-Site-Secret": siteSecret,
        Accept: "application/json",
      },
      next: { revalidate: revalidateSeconds },
    });

    if (!response.ok) {
      return DEFAULT_CONFIG;
    }

    const data = await response.json();

    const socialLinks = Array.isArray(data.contact?.social_links)
      ? data.contact.social_links
      : typeof data.contact?.social_links === "object" &&
          data.contact?.social_links !== null
        ? Object.entries(data.contact.social_links).map(([platform, url]) => ({
            platform,
            url: String(url),
          }))
        : [];

    const resolveUrl = (url: string | null | undefined): string => {
      if (!url) return "";
      if (url.startsWith("/")) return `${cleanUrl}${url}`;
      if (url.includes("localhost:8000") && !cleanUrl.includes("localhost:8000")) {
        return url.replace(/https?:\/\/[^/]+/, cleanUrl);
      }
      return url;
    };

    return {
      site: {
        id: data.site?.id || DEFAULT_CONFIG.site.id,
        name: data.site?.name || DEFAULT_CONFIG.site.name,
        domain: data.site?.domain || DEFAULT_CONFIG.site.domain,
      },
      branding: {
        logo_url:
          resolveUrl(data.branding?.logo_url) ||
          DEFAULT_CONFIG.branding.logo_url,
        favicon_url:
          resolveUrl(data.branding?.favicon_url) ||
          DEFAULT_CONFIG.branding.favicon_url,
        primary_color:
          data.branding?.primary_color || DEFAULT_CONFIG.branding.primary_color,
      },
      hero: {
        headline: data.hero?.headline || DEFAULT_CONFIG.hero.headline,
        subheadline: data.hero?.subheadline || DEFAULT_CONFIG.hero.subheadline,
        cta_text: data.hero?.cta_text || DEFAULT_CONFIG.hero.cta_text,
      },
      cta: {
        whatsapp_number:
          data.cta?.whatsapp_number || DEFAULT_CONFIG.cta.whatsapp_number,
        whatsapp_message_template:
          data.cta?.whatsapp_message_template ||
          DEFAULT_CONFIG.cta.whatsapp_message_template,
        whatsapp_url: data.cta?.whatsapp_url || DEFAULT_CONFIG.cta.whatsapp_url,
      },
      contact: {
        email: data.contact?.email || DEFAULT_CONFIG.contact.email,
        phone: data.contact?.phone || DEFAULT_CONFIG.contact.phone,
        social_links: socialLinks,
      },
      footer_text: data.footer_text || DEFAULT_CONFIG.footer_text,
      tracking: {
        ga_id: data.tracking?.ga_id ?? null,
        meta_pixel_id: data.tracking?.meta_pixel_id ?? null,
      },
      seo: {
        meta_title: data.seo?.meta_title || DEFAULT_CONFIG.seo.meta_title,
        meta_description:
          data.seo?.meta_description || DEFAULT_CONFIG.seo.meta_description,
        keywords: Array.isArray(data.seo?.keywords)
          ? data.seo.keywords
          : DEFAULT_CONFIG.seo.keywords,
        og_image_url:
          resolveUrl(data.seo?.og_image_url) || DEFAULT_CONFIG.seo.og_image_url,
      },
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}
