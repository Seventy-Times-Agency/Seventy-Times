"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";
import styles from "@/components/legal/LegalPage.module.css";

type Section = { heading: string; text: string };

type Props = {
  title: string;
  updated: string;
  draftNote: string;
  body: ReadonlyArray<Section>;
};

export default function LegalPage({ title, updated, draftNote, body }: Props) {
  const { t } = useT();

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>
          {t.legalBack}
        </Link>

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>{updated}</p>

        <div className={styles.draft}>{draftNote}</div>

        <div className={styles.body}>
          {body.map((section) => (
            <section key={section.heading} className={styles.section}>
              <h2 className={styles.heading}>{section.heading}</h2>
              <p className={styles.text}>{section.text}</p>
            </section>
          ))}
        </div>

        <Link href="/" className={styles.back}>
          {t.legalBack}
        </Link>
      </div>
    </main>
  );
}
