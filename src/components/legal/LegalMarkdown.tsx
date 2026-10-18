import Link from "next/link";
import type { ReactNode } from "react";
import styles from "@/components/legal/LegalPage.module.css";

/**
 * Tiny renderer for the legal texts in data/legal/*. Supports only what
 * counsel's documents use: "## N. Heading" sections, paragraphs (single
 * newlines become line breaks), "- " lists, pipe tables, **bold**,
 * *italic* and [links](/path). Internal links get the locale prefix via
 * `localize`.
 */

type Block =
  | { kind: "p"; lines: string[] }
  | { kind: "ul"; items: string[] }
  | { kind: "table"; head: string[]; rows: string[][] };

export type LegalSection = { heading: string; blocks: Block[] };
export type LegalDoc = { intro: Block[]; sections: LegalSection[] };

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

function parseBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  for (const chunk of text.split(/\n{2,}/)) {
    const lines = chunk.split("\n").filter((l) => l.trim() !== "");
    if (lines.length === 0) continue;
    if (lines.every((l) => l.trimStart().startsWith("- "))) {
      blocks.push({ kind: "ul", items: lines.map((l) => l.trimStart().slice(2)) });
    } else if (lines.every((l) => l.trimStart().startsWith("|"))) {
      const [head, , ...rows] = lines;
      blocks.push({ kind: "table", head: cells(head), rows: rows.map(cells) });
    } else {
      blocks.push({ kind: "p", lines });
    }
  }
  return blocks;
}

export function parseLegal(md: string): LegalDoc {
  const [introText, ...parts] = md.split(/^## /m);
  return {
    intro: parseBlocks(introText),
    sections: parts.map((part) => {
      const nl = part.indexOf("\n");
      const heading = part.slice(0, nl).trim().replace(/^\d+\.\s*/, "");
      return { heading, blocks: parseBlocks(part.slice(nl + 1)) };
    }),
  };
}

function inline(text: string, localize: (href: string) => string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${m.index}`;
    if (m[1] !== undefined) out.push(<strong key={key}>{m[1]}</strong>);
    else if (m[2] !== undefined) out.push(<em key={key}>{m[2]}</em>);
    else if (m[4].startsWith("/"))
      out.push(
        <Link key={key} href={localize(m[4])}>
          {m[3]}
        </Link>,
      );
    else
      out.push(
        <a key={key} href={m[4]} target="_blank" rel="noopener noreferrer">
          {m[3]}
        </a>,
      );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function LegalBlocks({
  blocks,
  localize,
}: {
  blocks: Block[];
  localize: (href: string) => string;
}) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === "ul")
          return (
            <ul key={i} className={styles.list}>
              {b.items.map((item, j) => (
                <li key={j}>{inline(item, localize)}</li>
              ))}
            </ul>
          );
        if (b.kind === "table")
          return (
            <div key={i} className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {b.head.map((h, j) => (
                      <th key={j}>{inline(h, localize)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, j) => (
                    <tr key={j}>
                      {row.map((c, k) => (
                        <td key={k}>{inline(c, localize)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        return (
          <p key={i} className={styles.text}>
            {b.lines.map((line, j) => (
              <span key={j}>
                {j > 0 && <br />}
                {inline(line, localize)}
              </span>
            ))}
          </p>
        );
      })}
    </>
  );
}
