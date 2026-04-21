"use client";

import { useT } from "@/i18n/context";
import LegalPage from "@/components/LegalPage";

export default function TermsClient() {
  const { t } = useT();
  return (
    <LegalPage
      title={t.termsTitle}
      updated={t.termsUpdated}
      draftNote={t.termsDraftNote}
      body={t.termsBody}
    />
  );
}
