import { siteConfig } from "@/data/siteConfig";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>A</span>
        <span>{siteConfig.name}</span>
      </div>
      <div className={styles.links}>
        <a href={siteConfig.contacts.telegram.url} target="_blank" rel="noopener noreferrer">
          Telegram
        </a>
        <a href={siteConfig.contacts.email.url}>Email</a>
      </div>
      <div className={styles.note}>© {year} {siteConfig.name}. All rights reserved.</div>
    </footer>
  );
}
