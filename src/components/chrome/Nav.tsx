"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { SERVICES } from "@/data/services";
import { FLOW, FLOW_COPY } from "@/components/sections/services/flow";
import { useT } from "@/i18n/context";
import { LOCALES, LOCALE_LABELS } from "@/i18n/config";
import Logo from "@/components/ui/Logo";
import Magnetic from "@/components/ui/Magnetic";
import styles from "@/components/chrome/Nav.module.css";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, t, setLocale, localePath } = useT();
  const pathname = usePathname();

  const close = () => setMenuOpen(false);
  const isUnder = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const servicesHref = localePath("/services");
  const services = FLOW.map((key) => {
    const s = SERVICES.find((x) => x.key === key)!;
    return {
      href: localePath(`/services/${s.slug}`),
      title: t[s.i18n.title],
      role: t[FLOW_COPY[key].role],
    };
  });

  const NAV_LINKS = [
    { href: localePath("/cases"), label: t.navCases, active: isUnder(localePath("/cases")) },
    { href: localePath("/process"), label: t.navWork, active: isUnder(localePath("/process")) },
    { href: localePath("/faq"), label: t.navFaq, active: isUnder(localePath("/faq")) },
    {
      href: localePath("/about"),
      label: t.ftAbout,
      // The team page is part of the same section.
      active: isUnder(localePath("/about")) || isUnder(localePath("/team")),
    },
  ];
  const servicesActive = isUnder(servicesHref);

  return (
    <nav className={styles.nav}>
      <Link href={localePath("/")} className={styles.logo} aria-label={siteConfig.name}>
        <Logo variant="compact" />
      </Link>

      <div className={styles.links}>
        {/* Opens on hover and on keyboard focus — no JS state to get stuck. */}
        <div className={styles.dropdown}>
          <Link
            href={servicesHref}
            className={`${styles.link}${servicesActive ? ` ${styles.linkActive}` : ""}`}
            aria-current={servicesActive ? "page" : undefined}
          >
            {t.navServices}
            <span className={styles.chevron} aria-hidden="true" />
          </Link>
          <div className={styles.menu}>
            <div className={styles.menuPanel}>
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className={styles.menuItem}
                  aria-current={pathname === s.href ? "page" : undefined}
                  onClick={(e) => e.currentTarget.blur()}
                >
                  {s.title}
                  <small>{s.role}</small>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`${styles.link}${l.active ? ` ${styles.linkActive}` : ""}`}
            aria-current={l.active ? "page" : undefined}
          >
            {l.label}
          </Link>
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
              aria-pressed={l === locale}
            >
              {LOCALE_LABELS[l]}
            </button>
          ))}
        </div>
        <Magnetic strength={0.25} className={styles.ctaWrap}>
          <a href="#lead" className={styles.cta}>
            {t.navCta} <span className={styles.ctaArrow} aria-hidden="true">→</span>
          </a>
        </Magnetic>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? t.navCloseMenu : t.navOpenMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          <span className={menuOpen ? styles.barX1 : ""} />
          <span className={menuOpen ? styles.barX2 : ""} />
          <span className={menuOpen ? styles.barX3 : ""} />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu} id="mobile-menu">
          <Link
            href={servicesHref}
            className={`${styles.mobileLink}${servicesActive ? ` ${styles.mobileLinkActive}` : ""}`}
            aria-current={servicesActive ? "page" : undefined}
            onClick={close}
          >
            {t.navServices}
          </Link>
          <div className={styles.mobileSub}>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className={styles.mobileSubLink}
                aria-current={pathname === s.href ? "page" : undefined}
                onClick={close}
              >
                {s.title}
              </Link>
            ))}
          </div>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.mobileLink}${l.active ? ` ${styles.mobileLinkActive}` : ""}`}
              aria-current={l.active ? "page" : undefined}
              onClick={close}
            >
              {l.label}
            </Link>
          ))}
          <div className={styles.mobileLangRow}>
            {LOCALES.map((l) => (
              <button
                key={l}
                className={`${styles.mobileLangBtn}${l === locale ? ` ${styles.mobileLangBtnActive}` : ""}`}
                onClick={() => setLocale(l)}
                type="button"
                aria-pressed={l === locale}
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
