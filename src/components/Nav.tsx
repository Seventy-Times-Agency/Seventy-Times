"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import styles from "./Nav.module.css";

const NAV_LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Процесс" },
  { href: "#chat", label: "Венеса" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const close = () => setMenuOpen(false);

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
          <span className={styles.statusDot} /> Принимаем проекты
        </span>
        <a href="#lead" className={styles.cta}>
          Заявка <span className={styles.ctaArrow} aria-hidden="true">→</span>
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
          <a href="#lead" className={styles.mobileCta} onClick={close}>
            Оставить заявку →
          </a>
        </div>
      )}
    </nav>
  );
}
