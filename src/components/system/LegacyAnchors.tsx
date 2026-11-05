"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/i18n/context";

// Landing anchors whose sections moved to their own pages. Old shared links
// and ads keep working: `/ru#faq` lands on `/ru/faq`.
const MOVED: Record<string, string> = {
  process: "/process",
  comparison: "/process#comparison",
  chat: "/process#chat",
  faq: "/faq",
};

export default function LegacyAnchors() {
  const router = useRouter();
  const { localePath } = useT();

  useEffect(() => {
    const redirect = () => {
      const id = window.location.hash.slice(1);
      if (MOVED[id]) router.replace(localePath(MOVED[id]));
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, [router, localePath]);

  return null;
}
