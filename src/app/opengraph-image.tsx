import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/api";

export const alt = "GajiKilat: slip gaji dengan PPh 21 dan BPJS dihitung otomatis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const config = await getSiteConfig();
  const ogImageUrl = config.seo.og_image_url;

  if (ogImageUrl) {
    try {
      const res = await fetch(ogImageUrl);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        const mime = res.headers.get("content-type") || "image/jpeg";
        return new Response(buffer, {
          headers: {
            "Content-Type": mime,
            "Cache-Control": "public, max-age=15, stale-while-revalidate=15",
          },
        });
      }
    } catch {
      // Fallback ke ImageResponse di bawah jika gagal fetch
    }
  }

  const headline = config.seo.meta_title || config.hero.headline || "Payroll akurat. Bebas salah hitung.";
  const subheadline = config.seo.meta_description || config.hero.subheadline || "Sistem HRIS & penggajian otomatis untuk enterprise dan manufaktur.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0F172A", // --navy
          padding: "64px",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        {/* Kolom Kiri: Branding & Value Proposition */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "560px",
          }}
        >
          {/* Logo Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "6px",
                backgroundColor: "#0F172A",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
              >
                <polyline
                  points="18,6 12,17 19,17 14,26"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 600,
                color: "#F8FAFC",
                letterSpacing: "-0.01em",
              }}
            >
              GajiKilat
            </div>
          </div>

          {/* Heading */}
          <div
            style={{
              fontSize: "46px",
              fontWeight: 600,
              color: "#F8FAFC",
              lineHeight: 1.15,
              marginBottom: "20px",
              letterSpacing: "-0.015em",
            }}
          >
            {headline}
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "#CBD5E1",
              lineHeight: 1.5,
              marginBottom: "36px",
            }}
          >
            {subheadline}
          </div>

          {/* Tiga butir pilar */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              fontSize: "14px",
              color: "#94A3B8",
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: "#10B981" }}>• PPh 21 TER</span>
            <span style={{ color: "#10B981" }}>• BPJS TK & Kes</span>
            <span style={{ color: "#10B981" }}>• Transfer 1 Batch</span>
          </div>
        </div>

        {/* Kolom Kanan: Kartu Slip Gaji Nyata */}
        <div
          style={{
            width: "480px",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            border: "1px solid #CBD5E1",
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 1px 2px rgba(15,23,42,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #E2E8F0",
              paddingBottom: "12px",
              marginBottom: "16px",
            }}
          >
            <div style={{ fontSize: "12px", fontFamily: "monospace", color: "#64748B" }}>
              SLIP GAJI · OKTOBER 2026
            </div>
            <div
              style={{
                fontSize: "11px",
                padding: "2px 8px",
                backgroundColor: "#ECFDF5",
                color: "#047857",
                borderRadius: "4px",
                fontWeight: 600,
              }}
            >
              TERVALIDASI
            </div>
          </div>

          <div style={{ fontSize: "17px", fontWeight: 600, color: "#0F172A", marginBottom: "4px" }}>
            Bagas Pratama
          </div>
          <div style={{ fontSize: "13px", color: "#64748B", marginBottom: "16px" }}>
            Operator Produksi · Pabrik Cikarang
          </div>

          {/* Rincian Angka Konsisten dengan computePayroll Bagas Pratama */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#334155" }}>
              <span>Penghasilan Bruto</span>
              <span style={{ fontFamily: "monospace", fontWeight: 600 }}>Rp 6.784.000</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#334155" }}>
              <span>PPh 21 (TER A 1,25%)</span>
              <span style={{ fontFamily: "monospace", color: "#B91C1C" }}>-Rp 84.800</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#334155" }}>
              <span>BPJS Ketenagakerjaan (3%)</span>
              <span style={{ fontFamily: "monospace", color: "#B91C1C" }}>-Rp 192.000</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#334155" }}>
              <span>BPJS Kesehatan (1%)</span>
              <span style={{ fontFamily: "monospace", color: "#B91C1C" }}>-Rp 64.000</span>
            </div>

            {/* Total Garis Ganda */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTopWidth: 2,
                borderTopStyle: "solid",
                borderTopColor: "#0F172A",
                paddingTop: "14px",
                marginTop: "6px",
              }}
            >
              <span style={{ fontSize: "15px", fontWeight: 600, color: "#0F172A" }}>
                Gaji Bersih Diterima
              </span>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: "#047857",
                }}
              >
                Rp 6.443.200
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
