import { siteConfig } from "@/data/siteConfig";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            <span className={styles.logoMark}>
              ia<span className={styles.logoOutline}>a</span>
            </span>
            <span className={styles.logoSub}>agency</span>
          </span>
          <p className={styles.brandText}>
            {siteConfig.description} Команда строит системы, которые приводят
            клиентов на автопилоте.
          </p>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Услуги</span>
          <a href="#services">Ads / Таргет</a>
          <a href="#services">Automation</a>
          <a href="#services">AI-боты</a>
          <a href="#chat">AI-демо</a>
          <a href="#process">Процесс</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Контакты</span>
          <a
            href={siteConfig.contacts.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
          <a href={siteConfig.contacts.email.url}>
            {siteConfig.contacts.email.address}
          </a>
          <span>Алматы → Мир</span>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>Компания</span>
          <a href="#top">О нас</a>
          <a href="#contact">Сотрудничество</a>
          <span>Принимаем проекты</span>
        </div>
      </div>

      <div className={styles.wordmark} aria-hidden="true">
        ia<span className={styles.wordmarkOutline}>a</span>
        <span className={styles.wordmarkSub}>agency®</span>
      </div>

      <div className={styles.bottom}>
        <span>© {year} {siteConfig.name} · All rights reserved</span>
        <div className={styles.bottomLinks}>
          <a href="#top">Наверх ↑</a>
          <a href="#contact">Связаться</a>
        </div>
      </div>
    </footer>
  );
}
