"use client";

import Link from "next/link";
import Image from "next/image";
import { useT } from "@/i18n/context";
import { TEAM } from "@/data/team";
import Reveal from "@/components/ui/Reveal";
import LegalCrumbs from "@/components/legal/LegalCrumbs";
import legal from "@/components/legal/LegalPage.module.css";
import styles from "./TeamClient.module.css";

export default function TeamClient() {
  const { t, locale, localePath } = useT();
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
          <ul className={styles.grid}>
            {TEAM.map((member, i) => (
              <li key={member.id}>
                <Reveal delay={i * 0.05} className={styles.card}>
                  {member.photo && (
                    <span className={styles.avatar}>
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="88px"
                        className={styles.avatarImg}
                      />
                    </span>
                  )}
                  <h2 className={styles.name}>{member.name}</h2>
                  <p className={styles.role}>{member.role[locale]}</p>
                  <p className={styles.bio}>{member.bio[locale]}</p>
                  {member.linkedin && (
                    <a
                      className={styles.link}
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn <span aria-hidden="true">→</span>
                    </a>
                  )}
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        <Link href={home} className={legal.back}>
          {t.legalBack}
        </Link>
      </div>
    </main>
  );
}
