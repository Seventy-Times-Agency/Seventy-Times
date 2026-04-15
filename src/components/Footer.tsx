"use client";

import { siteConfig } from "@/data/siteConfig";
import { useT } from "@/i18n/context";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useT();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            <span className={styles.logoMark}>
              70<span className={styles.logoOutline}>×</span>
            </span>
            <span className={styles.logoSub}>times</span>
          </span>
          <p className={styles.brandText}>{siteConfig.description}</p>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>{t.ftServices}</span>
          <a href="#services">{t.ftAds}</a>
          <a href="#services">{t.ftAutomation}</a>
          <a href="#services">{t.ftBots}</a>
          <a href="#chat">{t.ftVenesa}</a>
          <a href="#process">{t.ftProcess}</a>
          <a href="#faq">{t.ftFaq}</a>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>{t.ftContacts}</span>
          <a href={siteConfig.contacts.telegram.url} target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href={siteConfig.contacts.email.url}>{siteConfig.contacts.email.address}</a>
          <span>{t.ftLocation}</span>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>{t.ftCompany}</span>
          <a href="#top">{t.ftAbout}</a>
          <a href="#contact">{t.ftCollab}</a>
          <span>{t.ftAccepting}</span>
        </div>
      </div>

      <div className={styles.wordmark} aria-hidden="true">
        seventy<span className={styles.wordmarkOutline}>×</span>times
        <span className={styles.wordmarkSub}>®</span>
      </div>

      <div className={styles.bottom}>
        <span>© {year} {siteConfig.name} · {t.ftRights}</span>
        <div className={styles.bottomLinks}>
          <a href="#top">{t.ftUp}</a>
          <a href="#contact">{t.ftContact}</a>
        </div>
      </div>
    </footer>
  );
}
