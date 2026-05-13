"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { useT } from "@/i18n/context";
import Logo from "@/components/ui/Logo";
import styles from "@/components/chrome/Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const { locale, t, localePath } = useT();
  const pathname = usePathname();
  const home = localePath("/");
  const onHome = pathname === home || pathname === `/${locale}`;
  // Anchors point to landing-page sections; from non-home routes we
  // need to send the user to the home URL first so the browser
  // actually has somewhere to scroll to.
  const anchor = (id: string) => (onHome ? `#${id}` : `${home}#${id}`);

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Logo variant="full" className={styles.brandLogo} />
          <p className={styles.brandText}>{siteConfig.description}</p>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>{t.ftServices}</span>
          <a href={anchor("services")}>{t.ftAds}</a>
          <a href={anchor("services")}>{t.ftAutomation}</a>
          <a href={anchor("services")}>{t.ftBots}</a>
          <button
            type="button"
            className={styles.linkBtn}
            onClick={() => window.dispatchEvent(new Event("open-chat"))}
          >
            {t.ftTess}
          </button>
          <a href={anchor("process")}>{t.ftProcess}</a>
          <a href={anchor("faq")}>{t.ftFaq}</a>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>{t.ftContacts}</span>
          <a href={siteConfig.contacts.phone.url}>
            {siteConfig.contacts.phone.label}
          </a>
          <a href={`${onHome ? "" : home}#callback`}>{t.ftCallback}</a>
          <a href={siteConfig.contacts.telegram.url} target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href={siteConfig.contacts.whatsapp.url} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href={siteConfig.contacts.instagram.url} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={siteConfig.contacts.facebook.url} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={siteConfig.contacts.email.url}>{siteConfig.contacts.email.address}</a>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>{t.ftCompany}</span>
          <Link href={localePath("/about")}>{t.ftAbout}</Link>
          <a href={anchor("contact")}>{t.ftCollab}</a>
          <span>{t.ftAccepting}</span>
        </div>

        <div className={styles.col}>
          <span className={styles.colTitle}>{t.ftLegal}</span>
          <Link href={localePath("/privacy")}>{t.ftPrivacy}</Link>
          <Link href={localePath("/terms")}>{t.ftTerms}</Link>
          <a href={`${onHome ? "" : home}#review`} title={t.ftReviewNote}>
            {t.ftReview}
          </a>
        </div>
      </div>

      <div className={styles.wordmark} aria-hidden="true">
        seventy<span className={styles.wordmarkOutline}>×</span>times
        <span className={styles.wordmarkSub}>®</span>
      </div>

      <p className={styles.disclaimer}>{t.ftDisclaimer}</p>

      <div className={styles.bottom}>
        <span>© {year} {siteConfig.name} · {t.ftRights}</span>
        <div className={styles.bottomLinks}>
          <a href={onHome ? "#top" : home}>{t.ftUp}</a>
          <a href={anchor("contact")}>{t.ftContact}</a>
        </div>
      </div>
    </footer>
  );
}
