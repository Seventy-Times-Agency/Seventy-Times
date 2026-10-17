"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { SERVICES } from "@/data/services";
import { FLOW } from "@/components/sections/services/flow";
import { useT } from "@/i18n/context";
import Logo from "@/components/ui/Logo";
import {
  TelegramIcon,
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
} from "@/components/ui/ContactIcons";
import styles from "@/components/chrome/Footer.module.css";

/**
 * Compact footer: one raised panel (brand · services · company · contacts)
 * and a single bottom line with legal links. Services link to their own
 * pages in the order a lead travels through the machine.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const { locale, t, localePath } = useT();
  const pathname = usePathname();
  const home = localePath("/");
  const onHome = pathname === home || pathname === `/${locale}`;
  // Anchors point to landing-page sections; from other routes go home first.
  const anchor = (id: string) => (onHome ? `#${id}` : `${home}#${id}`);

  const services = FLOW.map((key) => SERVICES.find((s) => s.key === key)!);
  const socials = [
    { name: "Telegram", icon: TelegramIcon, url: siteConfig.contacts.telegram.url },
    { name: "WhatsApp", icon: WhatsAppIcon, url: siteConfig.contacts.whatsapp.url },
    { name: "Instagram", icon: InstagramIcon, url: siteConfig.contacts.instagram.url },
    { name: "Facebook", icon: FacebookIcon, url: siteConfig.contacts.facebook.url },
    { name: "LinkedIn", icon: LinkedInIcon, url: siteConfig.contacts.linkedin.url },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.panel}>
        <div className={styles.brand}>
          <Link href={home} className={styles.logo} aria-label={siteConfig.name}>
            <Logo variant="full" />
          </Link>
          <p className={styles.tagline}>{t.heroMeta1}</p>
          <span className={styles.status}>
            <i aria-hidden="true" />
            {t.navStatus} · {t.ftLocation}
          </span>
        </div>

        <nav className={styles.col} aria-label={t.ftServices}>
          <span className={styles.colTitle}>{t.ftServices}</span>
          {services.map((s) => (
            <Link key={s.slug} href={localePath(`/services/${s.slug}`)}>
              {t[s.i18n.title]}
            </Link>
          ))}
        </nav>

        <nav className={styles.col} aria-label={t.ftCompany}>
          <span className={styles.colTitle}>{t.ftCompany}</span>
          <Link href={localePath("/about")}>{t.ftAbout}</Link>
          <Link href={localePath("/team")}>{t.ftTeam}</Link>
          <a href={anchor("process")}>{t.ftProcess}</a>
          <a href={anchor("faq")}>{t.ftFaq}</a>
          <a href={`${onHome ? "" : home}#review`} title={t.ftReviewNote}>
            {t.ftReview}
          </a>
        </nav>

        <div className={styles.col}>
          <span className={styles.colTitle}>{t.ftContacts}</span>
          <a href={siteConfig.contacts.phone.url}>{siteConfig.contacts.phone.label}</a>
          <a href={siteConfig.contacts.email.url}>{siteConfig.contacts.email.address}</a>
          <a href={`${onHome ? "" : home}#callback`}>{t.ftCallback}</a>
          <ul className={styles.socials}>
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} title={s.name}>
                  <s.icon className={styles.socialIcon} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>
          © {year} {siteConfig.name} · {t.ftRights}
        </span>
        <nav className={styles.legal} aria-label={t.ftLegal}>
          <Link href={localePath("/privacy")}>{t.ftPrivacy}</Link>
          <Link href={localePath("/terms")}>{t.ftTerms}</Link>
          <Link href={localePath("/imprint")}>{t.ftImprint}</Link>
        </nav>
        <a href={onHome ? "#top" : home} className={styles.up}>
          {t.ftUp}
        </a>
      </div>

      <p className={styles.disclaimer}>{t.ftDisclaimer}</p>
    </footer>
  );
}
