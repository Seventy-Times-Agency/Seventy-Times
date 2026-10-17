"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";
import LegalCrumbs from "@/components/legal/LegalCrumbs";
import styles from "@/components/legal/LegalPage.module.css";

type Section = { heading: string; text: string };

type Props = {
  title: string;
  updated: string;
  body: ReadonlyArray<Section>;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function LegalPage({ title, updated, body }: Props) {
  const { t, localePath } = useT();
  const home = localePath("/");

  return (
    <main id="main-content" className={styles.main}>
      <div className={styles.inner}>
        <LegalCrumbs current={title} />

        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.updated}>{updated}</p>
        </header>

        {body.length > 2 && (
          <nav className={styles.toc} aria-label={title}>
            <ol className={styles.tocList}>
              {body.map((section, i) => (
                <li key={section.heading}>
                  <a href={`#s-${i + 1}`}>
                    <span className={styles.tocNum}>{pad(i + 1)}</span>
                    <span>{section.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={styles.body}>
          {body.map((section, i) => (
            <section key={section.heading} id={`s-${i + 1}`} className={styles.section}>
              <h2 className={styles.heading}>
                <span className={styles.num} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                {section.heading}
              </h2>
              <p className={styles.text}>{section.text}</p>
            </section>
          ))}
        </div>

        <Link href={home} className={styles.back}>
          {t.legalBack}
        </Link>
      </div>
    </main>
  );
}
