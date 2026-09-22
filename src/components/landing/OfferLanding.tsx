"use client";

import { useEffect } from "react";
import Nav from "@/components/chrome/Nav";
import Footer from "@/components/chrome/Footer";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { OFFERS, type OfferVariant } from "@/data/offers";
import { markLanding } from "@/lib/utm";
import { useT } from "@/i18n/context";
import styles from "@/components/landing/OfferLanding.module.css";

/**
 * Shared shell for the two A/B entry-offer landings (/go/audit and
 * /go/brief). All copy and offer values come from `data/offers.ts` —
 * this component only lays them out. On mount it tags the visitor
 * (landing=audit|brief) so every lead they submit afterwards carries
 * the source into Telegram / email.
 */
export default function OfferLanding({ variant }: { variant: OfferVariant }) {
  const { locale } = useT();
  const offer = OFFERS[variant];

  useEffect(() => {
    markLanding(variant);
  }, [variant]);

  return (
    <>
      <Nav />
      <main id="main-content" className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <Reveal>
            <span className="eyebrow">{offer.eyebrow[locale]}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className={styles.title}>{offer.title[locale]}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.sub}>{offer.sub[locale]}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className={styles.priceRow}>
              {offer.price && (
                <span className={styles.price}>{offer.price}</span>
              )}
              <span className={styles.priceNote}>
                {offer.priceNote[locale]}
              </span>
            </div>
          </Reveal>
        </section>

        {/* What you get */}
        <section className={styles.bullets}>
          {offer.bullets.map((b, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className={styles.bullet}>
                <span className={styles.bulletMark} aria-hidden="true">
                  ✓
                </span>
                <p className={styles.bulletText}>{b[locale]}</p>
              </div>
            </Reveal>
          ))}
        </section>

        {/* CTA */}
        <section className={styles.ctaBlock}>
          <Reveal>
            <Magnetic strength={0.4}>
              <a href="#lead" className={styles.cta}>
                {offer.cta[locale]}
                <span aria-hidden="true"> →</span>
              </a>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.1}>
            <span className={styles.ctaHint}>{offer.ctaHint[locale]}</span>
          </Reveal>
        </section>

        {/* Short FAQ */}
        <section className={styles.faq}>
          {offer.faq.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className={styles.faqItem}>
                <h2 className={styles.faqQ}>{item.q[locale]}</h2>
                <p className={styles.faqA}>{item.a[locale]}</p>
              </div>
            </Reveal>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
