"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";
import { TEAM } from "@/data/team";
import Reveal from "@/components/ui/Reveal";
import TeamGrid from "@/components/sections/team/TeamGrid";
import legal from "@/components/legal/LegalPage.module.css";
import styles from "./AboutClient.module.css";

/**
 * About: title + lead, then the team itself (faces first), then the
 * "let's meet" CTA. No breadcrumbs, sticker or link tiles — the nav
 * already covers the rest of the site.
 */
export default function AboutClient() {
  const { t, localePath } = useT();
  const home = localePath("/");

  return (
    <main id="main-content" className={legal.main}>
      <div className={`${legal.inner} ${legal.innerWide}`}>
        <header className={`${legal.header} ${styles.header}`}>
          <h1 className={styles.title}>{t.aboutTitle}</h1>
          <p className={legal.lead}>{t.aboutLead}</p>
          <div className={legal.actions}>
            <Link href={`${home}#lead`} className={legal.primary}>
              {t.aboutCtaBtn}
              <i aria-hidden="true">↗</i>
            </Link>
          </div>
        </header>

        {TEAM.length > 0 && (
          <section className={styles.team} aria-labelledby="about-team-title">
            <div className={styles.teamHead}>
              <h2 className={styles.teamTitle} id="about-team-title">
                {t.teamTitle}
              </h2>
              <p className={styles.teamLead}>{t.teamLead}</p>
            </div>
            <TeamGrid nameAs="h3" />
          </section>
        )}

        <Reveal>
          <div className={legal.cta}>
            <div>
              <p className={legal.ctaTitle}>{t.aboutCtaTitle}</p>
              <p className={legal.ctaBody}>{t.aboutCtaBody}</p>
            </div>
            <Link href={`${home}#lead`} className={legal.ctaBtn}>
              {t.aboutCtaBtn} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        <Link href={home} className={legal.back}>
          {t.legalBack}
        </Link>
      </div>
    </main>
  );
}
