"use client";

import { siteConfig } from "@/data/siteConfig";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import SectionWatermark from "./SectionWatermark";
import Magnetic from "./Magnetic";
import { useT } from "@/i18n/context";
import styles from "./CTA.module.css";

export default function CTA() {
  const { t } = useT();

  return (
    <section id="contact" className={styles.section}>
      <SectionWatermark text={t.ftContact.toLowerCase()} number="/ 06" position="center" />
      <Reveal>
        <div className={styles.inner}>
          <div className={styles.eyebrowRow}>
            <span className="eyebrow">{t.ctaEyebrow}</span>
            <span className={styles.eyebrowEnd}>{t.ctaEnd}</span>
          </div>
          <h2 className={styles.title}>
            <AnimatedText stagger={0.12}
              words={[t.ctaTitle1, { text: t.ctaTitle2, className: styles.titleItalic }, t.ctaTitle3]} />
          </h2>
          <p className={styles.sub}>{t.ctaSub}</p>
          <div className={styles.buttons}>
            <Magnetic strength={0.4}>
              <a className={styles.primary} href="#lead">
                {t.ctaPrimary} <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a className={styles.secondary} href={siteConfig.contacts.telegram.url} target="_blank" rel="noopener noreferrer">
                <TelegramIcon /> {t.ctaTelegram}
              </a>
            </Magnetic>
          </div>
          <div className={styles.emailRow}>
            <a className={styles.emailLink} href={siteConfig.contacts.email.url}>
              <MailIcon /> {siteConfig.contacts.email.address}
            </a>
          </div>
          <div className={styles.metaBottom}>
            <span>{t.ctaMeta1}</span>
            <span>{t.ctaMeta2}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function TelegramIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}
