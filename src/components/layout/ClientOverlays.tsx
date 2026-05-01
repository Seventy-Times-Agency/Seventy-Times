"use client";

import dynamic from "next/dynamic";

// Overlays that have no SSR value: they only matter once the user
// triggers them (open chat, open #lead, open #review) or after a delay
// (cookie banner). Loading them as a separate chunk keeps the initial
// JS for the landing smaller and removes them from the SSR'd HTML.
const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"), {
  ssr: false,
});
const LeadForm = dynamic(() => import("@/components/forms/LeadForm"), {
  ssr: false,
});
const ReviewForm = dynamic(() => import("@/components/forms/ReviewForm"), {
  ssr: false,
});
const CookieConsent = dynamic(
  () => import("@/components/layout/CookieConsent"),
  { ssr: false },
);
const MobileStickyCta = dynamic(
  () => import("@/components/layout/MobileStickyCta"),
  { ssr: false },
);
const ExitIntent = dynamic(() => import("@/components/layout/ExitIntent"), {
  ssr: false,
});
const ServiceWorkerRegister = dynamic(
  () => import("@/components/layout/ServiceWorkerRegister"),
  { ssr: false },
);
const ErrorReporter = dynamic(
  () => import("@/components/layout/ErrorReporter"),
  { ssr: false },
);

export default function ClientOverlays() {
  return (
    <>
      <ChatWidget />
      <LeadForm />
      <ReviewForm />
      <CookieConsent />
      <MobileStickyCta />
      <ExitIntent />
      <ServiceWorkerRegister />
      <ErrorReporter />
    </>
  );
}
