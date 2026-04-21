"use client";

import { useT } from "@/i18n/context";
import LegalPage from "@/components/legal/LegalPage";

export default function PrivacyClient() {
  const { t } = useT();
  return (
    <LegalPage
      title={t.privacyTitle}
      updated={t.privacyUpdated}
      draftNote={t.privacyDraftNote}
      body={t.privacyBody}
    />
  );
}
