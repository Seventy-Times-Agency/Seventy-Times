"use client";

import { siteConfig } from "@/data/siteConfig";
import { useT } from "@/i18n/context";

/**
 * Client-rendered JSON-LD for FAQPage and three Service entries.
 * Client-side because FAQ / service copy comes from the i18n context,
 * so the schema should match whichever language the user is viewing.
 *
 * Google still picks these up at crawl time — Googlebot executes JS.
 * The organisation-level schema lives in src/app/layout.tsx and is
 * server-rendered so it shows up even without JS.
 */
export default function StructuredData() {
  const { t } = useT();

  const faqItems = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
    { q: t.faq5q, a: t.faq5a },
    { q: t.faq6q, a: t.faq6a },
    { q: t.faq7q, a: t.faq7a },
    { q: t.faq8q, a: t.faq8a },
    { q: t.faq9q, a: t.faq9a },
    { q: t.faq10q, a: t.faq10a },
    { q: t.faq11q, a: t.faq11a },
    { q: t.faq12q, a: t.faq12a },
    { q: t.faq13q, a: t.faq13a },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {serviceSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
