"use client";

import { siteConfig } from "@/data/siteConfig";
import Reveal from "@/components/ui/Reveal";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionWatermark from "@/components/decor/SectionWatermark";
import Magnetic from "@/components/ui/Magnetic";
import { useT } from "@/i18n/context";
import {
  TelegramIcon,
  EmailIcon,
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
} from "@/components/ui/ContactIcons";
import styles from "@/components/sections/CTA.module.css";

export default function CTA() {
  const { t } = useT();

  const channels = [
    {
      name: "Telegram",
      icon: TelegramIcon,
      handle: siteConfig.contacts.telegram.handle,
      url: siteConfig.contacts.telegram.url,
    },
    {
      name: "Email",
      icon: EmailIcon,
      handle: siteConfig.contacts.email.address,
      url: siteConfig.contacts.email.url,
    },
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      handle: siteConfig.contacts.whatsapp.handle,
      url: siteConfig.contacts.whatsapp.url,
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      handle: siteConfig.contacts.instagram.handle,
      url: siteConfig.contacts.instagram.url,
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      handle: siteConfig.contacts.facebook.handle,
      url: siteConfig.contacts.facebook.url,
    },
  ];

  return (
    <section id="contact" className={styles.section}>
      <SectionWatermark
        text={t.ftContact.toLowerCase()}
        number="/ 06"
        position="center"
      />
      <Reveal>
        <div className={styles.inner}>
          <div className={styles.eyebrowRow}>
            <span className="eyebrow">{t.ctaEyebrow}</span>
            <span className={styles.eyebrowEnd}>{t.ctaEnd}</span>
          </div>
          <h2 className={styles.title}>
            <AnimatedText
              stagger={0.12}
              words={[
                t.ctaTitle1,
                { text: t.ctaTitle2, className: styles.titleItalic },
                t.ctaTitle3,
              ]}
            />
          </h2>
          <p className={styles.sub}>{t.ctaSub}</p>

          <div className={styles.buttons}>
            <Magnetic strength={0.4}>
              <a className={styles.primary} href="#lead">
                {t.ctaPrimary} <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </div>

          <p className={styles.channelsLabel}>{t.ctaChannelsLabel}</p>
          <div className={styles.channels}>
            {channels.map((ch) => (
              <a
                key={ch.name}
                href={ch.url}
                className={styles.channel}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ch.icon className={styles.channelIcon} />
                <span className={styles.channelName}>{ch.name}</span>
                <span className={styles.channelHandle}>{ch.handle}</span>
              </a>
            ))}
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
