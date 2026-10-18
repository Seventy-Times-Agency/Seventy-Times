"use client";

import { useT } from "@/i18n/context";
import LegalPage from "@/components/legal/LegalPage";
import { TERMS } from "@/data/legal/terms";

export default function TermsClient() {
  const { t, locale } = useT();
  return (
    <LegalPage
      title={t.termsTitle}
      updated={t.termsUpdated}
      markdown={TERMS[locale]}
    />
  );
}
