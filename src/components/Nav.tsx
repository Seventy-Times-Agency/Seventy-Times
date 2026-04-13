"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { useT } from "@/i18n/context";
import { LOCALES, LOCALE_LABELS } from "@/i18n/config";
import styles from "./Nav.module.css";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, t, setLocale } = useT();

  const close = () => setMenuOpen(false);

  const NAV_LINKS = [
    { href: "#services", label: t.navServices },
    { href: "#process", label: t.navProcess },
    { href: "#chat", label: t.navVenesa },
    { href: "#faq", label: t.navFaq },
  ];

  return (
    <nav className={styles.nav}>
      <a href="#top" className={styles.logo} aria-label={siteConfig.name}>
        <span className={styles.logoMark}>
          ia<span className={styles.logoOutline}>a</span>
        </span>
        <span className={styles.logoSub}>agency</span>
      </a>

      <div className={styles.links}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className={styles.link}>
            {l.label}
          </a>
        ))}
      </div>

      <div className={styles.right}>
        <span className={styles.status}>
          <span className={styles.statusDot} /> {t.navStatus}
        </span>
        <div className={styles.langSwitcher}>
          {LOCALES.map((l) => (
            <button
              key={l}
              className={`${styles.langBtn}${l === locale ? ` ${styles.langBtnActive}` : ""}`}
              onClick={() => setLocale(l)}
              type="button"
            >
              {LOCALE_LABELS[l]}
            </button>
          ))}
        </div>
        <a href="#lead" className={styles.cta}>
          {t.navCta} <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </a>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          type="button"
        >
          <span className={menuOpen ? styles.barX1 : ""} />
          <span className={menuOpen ? styles.barX2 : ""} />
          <span className={menuOpen ? styles.barX3 : ""} />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.mobileLink} onClick={close}>
              {l.label}
            </a>
          ))}
          <div className={styles.mobileLangRow}>
            {LOCALES.map((l) => (
              <button
                key={l}
                className={`${styles.mobileLangBtn}${l === locale ? ` ${styles.mobileLangBtnActive}` : ""}`}
                onClick={() => setLocale(l)}
                type="button"
              >
                {LOCALE_LABELS[l]}
              </button>
            ))}
          </div>
          <a href="#lead" className={styles.mobileCta} onClick={close}>
            {t.heroCta1} →
          </a>
        </div>
      )}
    </nav>
  );
}
