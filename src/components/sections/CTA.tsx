"use client";

import { siteConfig } from "@/data/siteConfig";
import Reveal from "@/components/ui/Reveal";
import SectionWatermark from "@/components/decor/SectionWatermark";
import Magnetic from "@/components/ui/Magnetic";
import { useT } from "@/i18n/context";
import {
  TelegramIcon,
  EmailIcon,
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
} from "@/components/ui/ContactIcons";
import styles from "@/components/sections/CTA.module.css";

/**
 * Closing CTA, built for conversion: one brutal panel with the offer and
 * what happens next on the left, three ways in on the right (briefing
 * form → callback → Vanessa), and a single compact row of direct
 * channels underneath.
 */
export default function CTA() {
  const { t } = useT();

  const channels = [
    { name: "Telegram", icon: TelegramIcon, ...siteConfig.contacts.telegram },
    { name: "Email", icon: EmailIcon, handle: siteConfig.contacts.email.address, url: siteConfig.contacts.email.url },
    { name: "WhatsApp", icon: WhatsAppIcon, ...siteConfig.contacts.whatsapp },
    { name: "Instagram", icon: InstagramIcon, ...siteConfig.contacts.instagram },
    { name: "Facebook", icon: FacebookIcon, ...siteConfig.contacts.facebook },
    { name: "LinkedIn", icon: LinkedInIcon, ...siteConfig.contacts.linkedin },
  ];

  const openChat = () => {
    window.dispatchEvent(new Event("open-chat"));
  };

  return (
    <section id="contact" className={styles.section}>
      <SectionWatermark text={t.ftContact.toLowerCase()} number="/ 07" position="center" />

      <Reveal>
        <div className={styles.panel}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>{t.ctaEyebrow}</span>
            <h2 className={styles.title}>
              {t.ctaTitle1} <span className={styles.titleOutline}>{t.ctaTitle2}</span>
              {t.ctaTitle3.trim()}
            </h2>
            <p className={styles.sub}>{t.ctaShort}</p>
            <ol className={styles.path}>
              <li>{t.ctaPath1}</li>
              <li>{t.ctaPath2}</li>
              <li>{t.ctaPath3}</li>
            </ol>
          </div>

          <div className={styles.actions}>
            <Magnetic strength={0.3}>
              <a className={styles.primary} href="#lead">
                {t.hxCtaBrief}
                <i aria-hidden="true">↗</i>
              </a>
            </Magnetic>
            <div className={styles.secondaryRow}>
              <a href="#callback" className={styles.secondary}>
                {t.ctaCallback}
              </a>
              <span className={styles.or}>{t.ctaOr}</span>
              <button type="button" className={styles.secondary} onClick={openChat}>
                {t.venCta}
              </button>
            </div>
            <span className={styles.reply}>
              <i aria-hidden="true" />
              {t.ctaReply}
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className={styles.channelsRow}>
          <span className={styles.channelsLabel}>{t.ctaChannelsLabel}</span>
          <ul className={styles.channels}>
            {channels.map((ch) => (
              <li key={ch.name}>
                <a
                  href={ch.url}
                  className={styles.channel}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={ch.handle}
                >
                  <ch.icon className={styles.channelIcon} />
                  {ch.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
