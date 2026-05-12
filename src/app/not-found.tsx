import Link from "next/link";
import { headers, type UnsafeUnwrappedHeaders } from "next/headers";
import { getDictionary } from "@/i18n/dictionary";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import styles from "./not-found.module.css";

export default function NotFound() {
  const fromHeader = (headers() as unknown as UnsafeUnwrappedHeaders).get("x-locale");
  const locale = isLocale(fromHeader) ? fromHeader : DEFAULT_LOCALE;
  const t = getDictionary(locale);

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>{t.notFoundEyebrow}</span>
        <h1 className={styles.title}>
          70<span className={styles.titleOutline}>×</span>
        </h1>
        <h2 className={styles.subtitle}>{t.notFoundTitle}</h2>
        <p className={styles.lead}>{t.notFoundLead}</p>
        <Link href={`/${locale}`} className={styles.cta}>
          {t.notFoundCta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
