import { site } from "./site";
import { FAQS } from "./data";

export function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/favicon.svg`,
        email: site.email,
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "id-ID",
        publisher: {
          "@id": `${site.url}/#organization`,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${site.url}/#software`,
        name: site.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: site.description,
        featureList: [
          "Kalkulasi otomatis gaji",
          "PPh 21 skema TER (PMK 168/2023)",
          "BPJS Ketenagakerjaan (JHT & JP)",
          "BPJS Kesehatan",
          "Slip gaji digital",
          "Reimbursement transport",
          "Transfer bank massal satu batch",
          "Clock-in dan clock-out GPS geofencing",
          "Shift kerja pabrik dan rotasi",
          "Rekap kehadiran real-time",
          "Rekap lembur otomatis ke komponen gaji",
          "Workflow approval cuti berjenjang",
          "Izin sakit",
          "Transparansi sisa cuti",
          "Cuti berbayar vs unpaid leave otomatis ke slip gaji",
          "Assessment rekrutmen",
          "Evaluasi kinerja",
          "Uji kompetensi kenaikan grade gaji dan level keahlian teknis",
          "Proctoring ujian online",
          "Arsip bukti potong pajak 1721-A1",
          "Kontrak kerja legal PKWT dan PKWTT",
          "Knowledge base SOP operasional",
          "Modul e-learning K3",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.pertanyaan,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.jawaban,
          },
        })),
      },
    ],
  };
}
