"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";
import styles from "@/components/legal/LegalPage.module.css";

export default function AboutClient() {
  const { t } = useT();

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>
          {t.legalBack}
        </Link>

        <h1 className={styles.title}>{t.aboutTitle}</h1>
        <p className={styles.updated}>{t.aboutLead}</p>

        <div className={styles.draft}>{t.aboutDraftNote}</div>

        <Link href="/" className={styles.back}>
          {t.legalBack}
        </Link>
      </div>
    </main>
  );
}
