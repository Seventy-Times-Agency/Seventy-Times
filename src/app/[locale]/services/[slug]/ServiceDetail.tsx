"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";
import { siteConfig } from "@/data/siteConfig";
import type { ServiceItem } from "@/data/services";
import { SERVICE_ICONS } from "@/components/ui/ServiceIcons";
import styles from "./ServiceDetail.module.css";

type Props = {
  item: ServiceItem;
  related: readonly ServiceItem[];
};

export default function ServiceDetail({ item, related }: Props) {
  const { t, localePath } = useT();
  const home = localePath("/");
  const Icon = SERVICE_ICONS[item.key];

  const title = t[item.i18n.title];
  const tag = t[item.i18n.tag];
  const note = t[item.i18n.note];
  const includes = t[item.i18n.inc];
  const addons = t[item.i18n.add];

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <nav className={styles.breadcrumbs} aria-label={t.casesBreadcrumbs}>
          <Link href={home}>{siteConfig.shortName}</Link>
          <span aria-hidden="true">›</span>
          <Link href={`${home}#services`}>{t.navServices}</Link>
          <span aria-hidden="true">›</span>
          <span className={styles.breadcrumbCurrent} aria-current="page">
            {title}
          </span>
        </nav>

        <div className={styles.head}>
          <div className={styles.headTop}>
            <span className={styles.kicker}>
              / {String(item.index).padStart(2, "0")}
            </span>
            {Icon && (
              <span className={styles.iconBox}>
                <Icon className={styles.iconSvg} />
              </span>
            )}
          </div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.tagline}>{tag}</p>
          {note && <span className={styles.note}>{note}</span>}
        </div>

        <div className={styles.cols}>
          <section className={styles.col}>
            <h2 className={styles.colLabel}>{t.svcIncludes}</h2>
            <ul className={styles.list}>
              {includes.map((entry) => (
                <li key={entry} className={styles.item}>
                  <span className={styles.bullet} aria-hidden="true">
                    →
                  </span>
                  <span>{entry}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.col}>
            <h2 className={styles.colLabel}>{t.svcAddons}</h2>
            <ul className={styles.list}>
              {addons.map((entry) => (
                <li key={entry} className={`${styles.item} ${styles.itemMuted}`}>
                  <span
                    className={`${styles.bullet} ${styles.bulletMuted}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                  <span>{entry}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.ctaRow}>
          <Link href={`${home}#lead`} className={styles.primaryCta}>
            {t.svcDetailPrimaryCta} <span aria-hidden="true">→</span>
          </Link>
          <Link href={`${home}#cases`} className={styles.secondaryCta}>
            {t.svcDetailSecondaryCta} <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {related.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.colLabel}>{t.svcDetailRelatedTitle}</h2>
            <div className={styles.relatedGrid}>
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={localePath(`/services/${r.slug}`)}
                  className={styles.relatedCard}
                >
                  <span className={styles.relatedKicker}>
                    / {String(r.index).padStart(2, "0")}
                  </span>
                  <span className={styles.relatedTitle}>
                    {t[r.i18n.title]}
                  </span>
                  <span className={styles.relatedTag}>{t[r.i18n.tag]}</span>
                  <span className={styles.relatedArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
