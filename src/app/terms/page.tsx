import type { Metadata } from "next";
import { getTermsMeta, readLocaleFromCookies } from "@/lib/localizedMeta";
import TermsClient from "./TermsClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = readLocaleFromCookies();
  const meta = getTermsMeta(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: "/terms" },
  };
}

export default function Page() {
  return <TermsClient />;
}
