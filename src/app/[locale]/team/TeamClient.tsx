"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";
import styles from "@/components/legal/LegalPage.module.css";

export default function TeamClient() {
  const { t, localePath } = useT();
  const home = localePath("/");

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <Link href={home} className={styles.back}>
          {t.legalBack}
        </Link>

        <h1 className={styles.title}>{t.teamTitle}</h1>
        <p className={styles.updated}>{t.teamLead}</p>

        <p className={styles.updated} style={{ marginTop: 12 }}>
          {t.teamPlaceholder}
        </p>

        <Link href={home} className={styles.back}>
          {t.legalBack}
        </Link>
      </div>
    </main>
  );
}
