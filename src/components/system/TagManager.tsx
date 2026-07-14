"use client";

/**
 * Headless loader for analytics / advertising tags. Mounted once in the
 * root layout. Everything is gated behind public env vars:
 *
 *   NEXT_PUBLIC_GTM_ID        — Google Tag Manager (GTM-XXXX)
 *   NEXT_PUBLIC_GA_ID         — GA4 direct gtag.js (G-XXXX)
 *   NEXT_PUBLIC_META_PIXEL_ID — Meta (Facebook) Pixel
 *
 * If NONE of them are set this component renders `null` — a full no-op,
 * zero scripts, zero network requests. The owner just drops IDs into env
 * and the tags light up.
 *
 * Privacy model:
 * - GA / GTM use Consent Mode v2: a `consent default` of all-denied is
 *   installed BEFORE GTM/GA load, then upgraded to `granted` only once
 *   the visitor accepts in the cookie banner. So the tags can load but
 *   stay storage-less until consent.
 * - Meta Pixel uses its own Consent Mode: the pixel loads immediately but
 *   in a `consent revoke` state, so Meta can detect the install (and you
 *   can finish setup) while it transmits NOTHING — PageView / Lead stay
 *   queued. On acceptance we call `consent grant` and the queued events
 *   fire. No events leave the browser before consent.
 */

import { useEffect } from "react";
import Script from "next/script";
import { onConsent, readConsent } from "@/lib/consent";

type Gtag = (...args: unknown[]) => void;
type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    // `dataLayer` is also declared (more narrowly) in lib/analytics.ts;
    // the two declarations merge, so keep them compatible.
    dataLayer?: Record<string, unknown>[];
    gtag?: Gtag;
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
} as const;

/**
 * Inject and initialise the Meta Pixel in Consent Mode. Idempotent: the
 * standard Meta snippet guards against double-init via `window.fbq`.
 *
 * The pixel is initialised with consent *revoked*, so it is present and
 * detectable by Meta but sends nothing until `grant`. `PageView` is queued
 * and only transmits once consent is granted (immediately if the visitor
 * already accepted on a prior visit).
 */
function loadMetaPixel(pixelId: string, granted: boolean): void {
  if (typeof window === "undefined") return;
  if (window.fbq) {
    // Already initialised — just reflect the current consent state.
    if (granted) window.fbq("consent", "grant");
    return;
  }
  const w = window as unknown as { fbq?: Fbq; _fbq?: Fbq };
  const fbq = function (this: unknown, ...args: unknown[]) {
    const f = fbq as Fbq;
    if (f.callMethod) {
      f.callMethod(...args);
    } else {
      (f.queue ??= []).push(args);
    }
  } as Fbq;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";
  w.fbq = fbq;
  w._fbq = w._fbq ?? fbq;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);

  // Revoke BEFORE init/track — the pixel loads (Meta can detect it) but
  // holds every event until `grant`.
  fbq("consent", "revoke");
  fbq("init", pixelId);
  fbq("track", "PageView");
  if (granted) fbq("consent", "grant");
}

export default function TagManager() {
  const usesGtag = Boolean(GTM_ID || GA_ID);

  // Load the Meta Pixel (in a revoked state) on mount so Meta can detect
  // the install, then grant/upgrade consent once the visitor accepts —
  // also handling the case where consent was accepted on a previous visit.
  useEffect(() => {
    if (META_PIXEL_ID) {
      loadMetaPixel(META_PIXEL_ID, readConsent() === "accepted");
    }

    const apply = (granted: boolean) => {
      if (!granted) return;
      if (usesGtag && typeof window.gtag === "function") {
        window.gtag("consent", "update", GRANTED);
      }
      // Flip the pixel revoked → granted; the queued PageView and any
      // subsequent Lead events now transmit.
      if (META_PIXEL_ID && typeof window.fbq === "function") {
        window.fbq("consent", "grant");
      }
    };

    if (readConsent() === "accepted") apply(true);

    const unsubscribe = onConsent((choice) => apply(choice === "accepted"));
    return unsubscribe;
  }, [usesGtag]);

  // Full no-op when no tag IDs are configured.
  if (!GTM_ID && !GA_ID && !META_PIXEL_ID) return null;

  // Consent Mode v2 default. If consent was already granted in a prior
  // visit, start granted so the very first GTM/GA load isn't storage-less.
  const defaultGranted = readConsent() === "accepted";
  const consentDefault = defaultGranted ? "'granted'" : "'denied'";

  return (
    <>
      {usesGtag && (
        // afterInteractive (not beforeInteractive) so it stays a valid
        // App Router strategy; scripts of the same strategy execute in
        // document order, so this consent default still runs before the
        // GTM / GA scripts that follow it below.
        <Script id="st-consent-default" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: ${consentDefault},
              ad_user_data: ${consentDefault},
              ad_personalization: ${consentDefault},
              analytics_storage: ${consentDefault},
              wait_for_update: 500
            });
          `}
        </Script>
      )}

      {GTM_ID && (
        <Script id="st-gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      )}

      {GA_ID && (
        <>
          <Script
            id="st-ga-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="st-ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              window.gtag('js', new Date());
              window.gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

    </>
  );
}
