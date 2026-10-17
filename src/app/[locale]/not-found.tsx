import Link from "next/link";
import { headers, type UnsafeUnwrappedHeaders } from "next/headers";
import { getDictionary } from "@/i18n/dictionary";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import Nav from "@/components/chrome/Nav";
import Footer from "@/components/chrome/Footer";
import styles from "./not-found.module.css";

export default function NotFound() {
  const fromHeader = (headers() as unknown as UnsafeUnwrappedHeaders).get("x-locale");
  const locale = isLocale(fromHeader) ? fromHeader : DEFAULT_LOCALE;
  const t = getDictionary(locale);

  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        <div className={styles.inner}>
          <span className={styles.sticker}>{t.notFoundEyebrow}</span>
          <p className={styles.code} aria-hidden="true">
            70<span className="neonOutline">×</span>
          </p>
          <div className={styles.card}>
            <h1 className={styles.title}>{t.notFoundTitle}</h1>
            <p className={styles.lead}>{t.notFoundLead}</p>
            <Link href={`/${locale}`} className={styles.cta}>
              {t.notFoundCta}
              <i aria-hidden="true">↗</i>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
