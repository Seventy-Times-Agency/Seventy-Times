import { siteConfig } from "@/data/siteConfig";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";
import SectionWatermark from "./SectionWatermark";
import Magnetic from "./Magnetic";
import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section id="contact" className={styles.section}>
      <SectionWatermark text="contact" number="/ 06" position="center" />

      <Reveal>
        <div className={styles.inner}>
          <div className={styles.eyebrowRow}>
            <span className="eyebrow">— Get in touch</span>
            <span className={styles.eyebrowEnd}>IAA / 2026 →</span>
          </div>

          <h2 className={styles.title}>
            <AnimatedText
              stagger={0.12}
              words={[
                "Готовы",
                { text: "к росту", className: styles.titleItalic },
                "?",
              ]}
            />
          </h2>

          <p className={styles.sub}>
            Напишите в Telegram или на почту — обсудим задачу, расскажем как
            можем помочь, и в течение часа дадим первые идеи. Без обязательств,
            без воды.
          </p>

          <div className={styles.buttons}>
            <Magnetic strength={0.4}>
              <a
                className={styles.primary}
                href={siteConfig.contacts.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TelegramIcon />
                Написать в Telegram
                <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a className={styles.secondary} href={siteConfig.contacts.email.url}>
                <MailIcon />
                {siteConfig.contacts.email.address}
              </a>
            </Magnetic>
          </div>

          <div className={styles.metaBottom}>
            <span>IAA agency · Ads × Automation × AI</span>
            <span>Accepting projects · USA → Worldwide</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function TelegramIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}
