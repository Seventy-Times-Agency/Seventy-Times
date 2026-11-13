"use client";

import Link from "next/link";
import { useT } from "@/i18n/context";
import { TEAM } from "@/data/team";
import LegalCrumbs from "@/components/legal/LegalCrumbs";
import TeamGrid from "@/components/sections/team/TeamGrid";
import legal from "@/components/legal/LegalPage.module.css";
import styles from "./TeamClient.module.css";

export default function TeamClient() {
  const { t, localePath } = useT();
  const home = localePath("/");

  const openChat = () => window.dispatchEvent(new Event("open-chat"));

  return (
    <main id="main-content" className={legal.main}>
      <div className={`${legal.inner} ${legal.innerWide}`}>
        <LegalCrumbs current={t.teamTitle} />

        <header className={legal.header}>
          <h1 className={styles.title}>{t.teamTitle}</h1>
          <p className={legal.lead}>{t.teamLead}</p>
        </header>

        {TEAM.length === 0 ? (
          <div className={`${legal.draft} ${styles.placeholder}`}>
            <p>{t.teamPlaceholder}</p>
            <button type="button" className={legal.primary} onClick={openChat}>
              {t.chatOpen}
              <i aria-hidden="true">↗</i>
            </button>
          </div>
        ) : (
          <div className={styles.gridWrap}>
            <TeamGrid />
          </div>
        )}

        <Link href={home} className={legal.back}>
          {t.legalBack}
        </Link>
      </div>
    </main>
  );
}
