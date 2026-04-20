import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for seventy-times.com. An honest minimum for the early stage — to be revised with legal counsel as we grow.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return <TermsClient />;
}
