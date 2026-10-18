"use client";

import { useT } from "@/i18n/context";
import LegalPage from "@/components/legal/LegalPage";
import { PRIVACY } from "@/data/legal/privacy";

export default function PrivacyClient() {
  const { t, locale } = useT();
  return (
    <LegalPage
      title={t.privacyTitle}
      updated={t.privacyUpdated}
      markdown={PRIVACY[locale]}
    />
  );
}
