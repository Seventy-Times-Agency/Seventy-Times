import { siteConfig } from "@/data/siteConfig";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <a href="#top" className={styles.logo} aria-label={siteConfig.name}>
        <span className={styles.logoIcon}>A</span>
        <span>{siteConfig.name}</span>
      </a>
      <div className={styles.links}>
        <a href="#services" className={styles.link}>Услуги</a>
        <a href="#chat" className={styles.link}>AI-консультант</a>
        <a href="#contact" className={styles.cta}>
          Начать <span aria-hidden="true">→</span>
        </a>
      </div>
    </nav>
  );
}
