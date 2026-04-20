import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Seventy Times collects, uses, and protects your data. An honest minimum for the early stage — to be revised with legal counsel as we grow.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return <PrivacyClient />;
}
