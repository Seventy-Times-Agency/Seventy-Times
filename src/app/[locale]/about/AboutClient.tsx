"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";
import { siteConfig } from "@/data/siteConfig";
import Reveal from "@/components/ui/Reveal";
import LegalCrumbs from "@/components/legal/LegalCrumbs";
import legal from "@/components/legal/LegalPage.module.css";
import styles from "./AboutClient.module.css";

export default function AboutClient() {
  const { t, localePath } = useT();
  const home = localePath("/");

  const links = [
    { href: `${home}#services`, label: t.navServices },
    { href: `${home}#cases`, label: t.navCases },
    { href: `${home}#process`, label: t.navProcess },
    { href: localePath("/team"), label: t.teamTitle },
  ];

  return (
    <main id="main-content" className={legal.main}>
      <div className={`${legal.inner} ${styles.inner}`}>
        <LegalCrumbs current={t.aboutTitle} />

        <header className={legal.header}>
          <span className={styles.sticker}>
            <b>{siteConfig.shortName}</b> · {siteConfig.name}
          </span>
          <h1 className={styles.title}>{t.aboutTitle}</h1>
          <p className={legal.lead}>{t.aboutLead}</p>
          <div className={legal.actions}>
            <Link href={`${home}#lead`} className={legal.primary}>
              {t.hxCtaBrief}
              <i aria-hidden="true">↗</i>
            </Link>
          </div>
        </header>

        <nav className={styles.tiles} aria-label={t.aboutTitle}>
          {links.map((link, i) => (
            <Reveal key={link.href} delay={i * 0.05}>
              <Link href={link.href} className={styles.tile}>
                <span className={styles.tileNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.tileLabel}>{link.label}</span>
                <span className={styles.tileArrow} aria-hidden="true">→</span>
              </Link>
            </Reveal>
          ))}
        </nav>

        <Reveal>
          <div className={legal.cta}>
            <div>
              <p className={legal.ctaTitle}>{t.svcDetailCtaTitle}</p>
              <p className={legal.ctaBody}>{t.svcDetailCtaBody}</p>
            </div>
            <Link href={`${home}#lead`} className={legal.ctaBtn}>
              {t.hxCtaBrief} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        <Link href={home} className={legal.back}>
          {t.legalBack}
        </Link>
      </div>
    </main>
  );
}
