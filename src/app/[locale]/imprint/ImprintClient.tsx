"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";
import { legalEntity } from "@/data/legalEntity";
import legal from "@/components/legal/LegalPage.module.css";
import styles from "./ImprintClient.module.css";

export default function ImprintClient() {
  const { t, localePath } = useT();
  const home = localePath("/");
  const e = legalEntity;

  // Only rows with a value are shown, so an incomplete entity renders
  // cleanly rather than a wall of empty fields.
  const rows: Array<[string, string]> = (
    [
      [t.imprintEntity, e.name],
      [t.imprintForm, e.form],
      [t.imprintAddress, e.address],
      [t.imprintResponsible, e.responsible],
      [t.imprintRegistration, e.registration],
      [t.imprintVat, e.vatId],
      [t.imprintEmail, e.email],
      [t.imprintPhone, e.phone],
    ] as Array<[string, string]>
  ).filter(([, value]) => value.length > 0);

  return (
    <main className={legal.main}>
      <div className={legal.inner}>
        <Link href={home} className={legal.back}>
          {t.legalBack}
        </Link>

        <h1 className={legal.title}>{t.imprintTitle}</h1>
        <p className={legal.updated}>{t.imprintUpdated}</p>

        <div className={legal.body}>
          <section className={legal.section}>
            <h2 className={legal.heading}>{t.imprintProviderHeading}</h2>
            {e.name ? (
              <dl className={styles.details}>
                {rows.map(([label, value]) => (
                  <div key={label} className={styles.detailRow}>
                    <dt className={styles.detailLabel}>{label}</dt>
                    <dd className={styles.detailValue}>{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className={legal.text}>{t.imprintPlaceholder}</p>
            )}
          </section>

          <section className={legal.section}>
            <h2 className={legal.heading}>{t.imprintTransferHeading}</h2>
            <p className={legal.text}>{t.imprintTransferText}</p>
          </section>
        </div>

        <Link href={home} className={legal.back}>
          {t.legalBack}
        </Link>
      </div>
    </main>
  );
}
