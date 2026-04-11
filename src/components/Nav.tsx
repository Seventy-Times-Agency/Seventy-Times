import { siteConfig } from "@/data/siteConfig";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <a href="#top" className={styles.logo} aria-label={siteConfig.name}>
        <span className={styles.logoMark}>
          ia<span className={styles.logoOutline}>a</span>
        </span>
        <span className={styles.logoSub}>agency</span>
      </a>

      <div className={styles.links}>
        <a href="#services" className={styles.link}>
          Услуги
        </a>
        <a href="#process" className={styles.link}>
          Процесс
        </a>
        <a href="#chat" className={styles.link}>
          AI-демо
        </a>
        <a href="#faq" className={styles.link}>
          FAQ
        </a>
      </div>

      <div className={styles.right}>
        <span className={styles.status}>
          <span className={styles.statusDot} /> Принимаем проекты
        </span>
        <a href="#chat" className={styles.cta}>
          Начать
          <span className={styles.ctaArrow} aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </nav>
  );
}
