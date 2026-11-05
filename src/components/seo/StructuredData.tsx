"use client";

import { jsonLd } from "@/lib/jsonLd";
import { siteConfig } from "@/data/siteConfig";
import { useT } from "@/i18n/context";

/**
 * Client-rendered JSON-LD for three Service entries (the FAQPage schema
 * moved to /process with the FAQ, see FaqStructuredData).
 * Client-side because service copy comes from the i18n context,
 * so the schema should match whichever language the user is viewing.
 *
 * Google still picks these up at crawl time — Googlebot executes JS.
 * The organisation-level schema lives in src/app/layout.tsx and is
 * server-rendered so it shows up even without JS.
 */
export default function StructuredData() {
  const { t } = useT();

  const services = [
    {
      name: t.svc1Title,
      description: t.svc1Tag,
      id: "ads",
    },
    {
      name: t.svc2Title,
      description: t.svc2Tag,
      id: "automation",
    },
    {
      name: t.svc3Title,
      description: t.svc3Tag,
      id: "ai",
    },
  ];

  const serviceSchemas = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}#${s.id}`,
    name: s.name,
    description: s.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: ["United States", "Worldwide"],
    serviceType: s.name,
  }));

  return (
    <>
      {serviceSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      ))}
    </>
  );
}
