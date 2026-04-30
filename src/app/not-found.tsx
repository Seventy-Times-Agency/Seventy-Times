import Link from "next/link";
import { getDictionary } from "@/i18n/dictionary";
import { readLocaleFromCookies } from "@/lib/localizedMeta";
import styles from "./not-found.module.css";

export default function NotFound() {
  const t = getDictionary(readLocaleFromCookies());

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>{t.notFoundEyebrow}</span>
        <h1 className={styles.title}>
          70<span className={styles.titleOutline}>×</span>
        </h1>
        <h2 className={styles.subtitle}>{t.notFoundTitle}</h2>
        <p className={styles.lead}>{t.notFoundLead}</p>
        <Link href="/" className={styles.cta}>
          {t.notFoundCta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
