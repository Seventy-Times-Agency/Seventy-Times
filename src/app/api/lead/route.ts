import { NextResponse, after } from "next/server";
import { randomUUID } from "node:crypto";
import {
  checkOrigin,
  enforceBodyLimit,
  forbiddenOriginResponse,
  getClientIp,
  isFirstSeen,
  isHoneypotTripped,
  normalizeContactKey,
  rateLimit,
  rateLimitResponse,
  silentSuccessResponse,
} from "@/lib/apiGuard";
import { parseFbCookies, type MetaLeadEvent } from "@/lib/metaCapi";
import { sanitizeUtm } from "@/lib/utm";
import {
  deliverLead,
  isAnyLeadChannelConfigured,
  type LeadKind,
} from "@/lib/leadDelivery";
import { isPlausibleContact } from "@/lib/contactValidation";
import {
  isLeadBudget,
  isLeadPackage,
  type LeadBudget,
  type LeadPackage,
} from "@/lib/leadDraft";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  name: string;
  contact: string;
  business: string;
  request: string;
  package?: LeadPackage;
  budget?: LeadBudget;
  phone?: string;
  kind?: LeadKind;
  utm?: Record<string, string>;
};

const LIMITS = {
  name: 100,
  contact: 200,
  business: 500,
  request: 2000,
  phone: 40,
};

function isValid(p: unknown): p is LeadPayload {
  if (typeof p !== "object" || p === null) return false;
  const r = p as Record<string, unknown>;
  return (
    typeof r.name === "string" &&
    typeof r.contact === "string" &&
    typeof r.business === "string" &&
    typeof r.request === "string"
  );
}

export async function POST(req: Request) {
  if (!checkOrigin(req)) return forbiddenOriginResponse();

  const tooBig = enforceBodyLimit(req, 16 * 1024);
  if (tooBig) return tooBig;

  const ip = getClientIp(req);
  const rl = await rateLimit(`lead:${ip}`, 5, 60 * 60_000);
  if (!rl.ok) return rateLimitResponse(rl);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "INVALID_JSON" }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
  }

  if (
    typeof body === "object" &&
    body !== null &&
    isHoneypotTripped((body as Record<string, unknown>).website)
  ) {
    console.warn("[LEAD] honeypot tripped", {
      at: new Date().toISOString(),
      ip,
    });
    return silentSuccessResponse();
  }

  const name = body.name.trim();
  const contact = body.contact.trim();
  const business = body.business.trim();
  const request = body.request.trim();
  const rawPackage = (body as Record<string, unknown>).package;
  const leadPackage = isLeadPackage(rawPackage) ? rawPackage : undefined;
  const rawBudget = (body as Record<string, unknown>).budget;
  const leadBudget = isLeadBudget(rawBudget) ? rawBudget : undefined;
  const rawPhone = (body as Record<string, unknown>).phone;
  const phone =
    typeof rawPhone === "string" && rawPhone.trim()
      ? rawPhone.trim()
      : undefined;
  const rawKind = (body as Record<string, unknown>).kind;
  const kind: LeadKind = rawKind === "callback" ? "callback" : "lead";
  const utm = sanitizeUtm((body as Record<string, unknown>).utm);

  if (!name || !contact || !business || !request) {
    return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
  }

  if (
    name.length > LIMITS.name ||
    contact.length > LIMITS.contact ||
    business.length > LIMITS.business ||
    request.length > LIMITS.request ||
    (phone !== undefined && phone.length > LIMITS.phone)
  ) {
    return NextResponse.json({ error: "TOO_LONG" }, { status: 400 });
  }

  // Server-side mirror of the client contact check — an email, an
  // @handle, or a phone. Rejects junk (and header-injection attempts)
  // before the value is forwarded downstream.
  if (!isPlausibleContact(contact)) {
    return NextResponse.json({ error: "MISSING_FIELDS" }, { status: 400 });
  }

  // If nothing is configured, a 200 would silently swallow the lead.
  // Tell the user clearly so the form can show a fallback ("write to
  // us on Telegram / WhatsApp directly") instead of a fake success.
  // Checked BEFORE the dedup mark: a 503'd submission must not burn the
  // contact's first-seen slot, or their retry (once channels are fixed)
  // would be tagged duplicate and skip Notion.
  if (!isAnyLeadChannelConfigured()) {
    console.error("[LEAD] no outbound channels configured — refusing");
    return NextResponse.json(
      { error: "NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  // Detect repeat submissions from the same contact within the last
  // hour. We don't block (one duplicate is cheaper than losing a real
  // lead), but we tag downstream notifications so the team can spot it.
  const dedupKey = `lead-dedup:${normalizeContactKey(contact)}`;
  const isDuplicate = !(await isFirstSeen(dedupKey, 60 * 60_000));

  console.log("[LEAD] received", {
    at: new Date().toISOString(),
    kind,
    duplicate: isDuplicate,
  });

  // Read the user's selected locale from the cookie set by I18nProvider.
  // "ua" is the legacy Ukrainian cookie value (pre-/uk slug) — cookies
  // live for a year, so keep accepting it as an alias.
  const localeMatch = req.headers
    .get("cookie")
    ?.match(/(?:^|;\s*)lang=(en|ru|de|uk|ua)/);
  const locale = localeMatch?.[1] === "ua" ? "uk" : (localeMatch?.[1] ?? "en");

  const lead: LeadPayload = {
    name,
    contact,
    business,
    request,
    package: leadPackage,
    budget: leadBudget,
    phone,
    kind,
    utm,
  };

  // Meta CAPI context — built ONLY when the visitor accepted the cookie
  // banner (the form sends `adConsent`). The browser Pixel is consent-
  // gated too, so this keeps the server half of the tracking honest: no
  // consent, no server event. The browser fires its Pixel `Lead` with the
  // same `eventId`, so Meta dedupes the two. `_fbp`/`_fbc` cookies + IP +
  // UA lift match quality; email/phone are hashed downstream.
  const adConsent = (body as Record<string, unknown>).adConsent === true;
  let meta: MetaLeadEvent | undefined;
  if (adConsent) {
    const rawEventId = (body as Record<string, unknown>).eventId;
    const eventId =
      typeof rawEventId === "string" && rawEventId.trim()
        ? rawEventId.trim().slice(0, 100)
        : randomUUID();
    const { fbp, fbc } = parseFbCookies(req.headers.get("cookie"));
    meta = {
      eventId,
      email: contact,
      phone: phone ?? contact,
      clientIp: ip,
      userAgent: req.headers.get("user-agent") ?? undefined,
      fbp,
      fbc,
      sourceUrl: req.headers.get("referer") ?? undefined,
    };
  }

  // Fan out to side channels after the response is sent. Without this,
  // a slow Telegram/Notion/Email upstream made the user wait for the
  // slowest one — even though `fetchWithTimeout` caps each at 5s, that
  // is still up to 5s of perceived form latency per channel.
  after(() =>
    deliverLead(lead, {
      duplicate: isDuplicate,
      kind,
      locale,
      source: "website",
      meta,
    }),
  );

  return NextResponse.json({ ok: true });
}
