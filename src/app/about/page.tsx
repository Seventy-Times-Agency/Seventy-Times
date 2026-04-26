import type { Metadata } from "next";
import { getAboutMeta, readLocaleFromCookies } from "@/lib/localizedMeta";
import AboutClient from "./AboutClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = readLocaleFromCookies();
  const meta = getAboutMeta(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: "/about" },
  };
}

export default function Page() {
  return <AboutClient />;
}
