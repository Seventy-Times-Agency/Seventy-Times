"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { useT } from "@/i18n/context";
import { LOCALES, LOCALE_LABELS } from "@/i18n/config";
import Logo from "@/components/ui/Logo";
import styles from "@/components/layout/Nav.module.css";

const SECTION_IDS = ["services", "process", "chat", "faq"] as const;

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { locale, t, setLocale } = useT();

  useEffect(() => {
    const nodes = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const close = () => setMenuOpen(false);

  const NAV_LINKS = [
    { href: "#services", id: "services", label: t.navServices },
    { href: "#process", id: "process", label: t.navProcess },
    { href: "#chat", id: "chat", label: t.navVenesa },
    { href: "#faq", id: "faq", label: t.navFaq },
  ];

  return (
    <nav className={styles.nav}>
      <a href="#top" className={styles.logo} aria-label={siteConfig.name}>
        <Logo variant="compact" />
      </a>

      <div className={styles.links}>
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`${styles.link}${active === l.id ? ` ${styles.linkActive}` : ""}`}
            aria-current={active === l.id ? "location" : undefined}
          >
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
          aria-label={menuOpen ? t.navCloseMenu : t.navOpenMenu}
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
            <a
              key={l.href}
              href={l.href}
              className={`${styles.mobileLink}${active === l.id ? ` ${styles.mobileLinkActive}` : ""}`}
              onClick={close}
              aria-current={active === l.id ? "location" : undefined}
            >
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
