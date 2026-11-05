"use client";

import { jsonLd } from "@/lib/jsonLd";
import { useT } from "@/i18n/context";

/**
 * Client-rendered FAQPage JSON-LD for /process, the page that shows the
 * FAQ section — the schema has to sit on the page with the visible
 * answers. Client-side because the copy comes from the i18n context.
 */
export default function FaqStructuredData() {
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
    />
  );
}
