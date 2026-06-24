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
 * - Meta Pixel has no Consent Mode, so it is only injected AFTER the
 *   visitor accepts — never before.
 */

import { useEffect, useState } from "react";
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
 * Inject and initialise the Meta Pixel. Idempotent: the standard Meta
 * snippet guards against double-init via `window.fbq`.
 */
function loadMetaPixel(pixelId: string): void {
  if (typeof window === "undefined") return;
  if (window.fbq) {
    // Already initialised — nothing else to do.
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

  fbq("init", pixelId);
  fbq("track", "PageView");
}

export default function TagManager() {
  const usesGtag = Boolean(GTM_ID || GA_ID);
  const [metaLoaded, setMetaLoaded] = useState(false);

  // Consent reactions: upgrade GA/GTM consent + load Meta Pixel once the
  // visitor accepts. Also handles the case where consent was accepted in
  // a previous visit (read on mount).
  useEffect(() => {
    const apply = (granted: boolean) => {
      if (!granted) return;
      if (usesGtag && typeof window.gtag === "function") {
        window.gtag("consent", "update", GRANTED);
      }
      if (META_PIXEL_ID) {
        loadMetaPixel(META_PIXEL_ID);
        setMetaLoaded(true);
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

      {/* Meta Pixel <noscript> fallback only renders once loaded (i.e.
          after consent). Without JS there's no consent gate, so we keep
          it tied to the consent-driven load state. */}
      {META_PIXEL_ID && metaLoaded && (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      )}
    </>
  );
}
