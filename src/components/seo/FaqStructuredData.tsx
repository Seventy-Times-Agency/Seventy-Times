"use client";

import { jsonLd } from "@/lib/jsonLd";
import { useT } from "@/i18n/context";

/**
 * FAQPage JSON-LD for /<locale>/faq. A client component only because the
 * copy comes from the i18n context — it is still server-rendered into
 * the static HTML of every locale, so crawlers see it without JS.
 * Must list exactly the questions the FAQ section shows (same keys,
 * same order); every answer is in that section's HTML too (collapsed
 * with CSS, never unmounted), as Google requires for FAQ rich results.
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
