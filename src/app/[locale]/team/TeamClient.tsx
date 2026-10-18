"use client";

import { useState } from "react";
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
  // Touch screens have no hover: a tap toggles the second pose instead.
  const [turned, setTurned] = useState<string | null>(null);

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
                <Reveal
                  delay={i * 0.05}
                  className={`${styles.card} ${turned === member.id ? styles.cardTurned : ""}`}
                >
                  {member.photo && (
                    <span
                      className={styles.portrait}
                      onClick={() => setTurned((v) => (v === member.id ? null : member.id))}
                    >
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                        className={`${styles.shot} ${styles.shotBase}`}
                      />
                      {member.photoTurn && (
                        <Image
                          src={member.photoTurn}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                          className={`${styles.shot} ${styles.shotTurn}`}
                        />
                      )}
                      <span className={styles.haze} aria-hidden="true" />
                      <span className={styles.smoke} aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
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
