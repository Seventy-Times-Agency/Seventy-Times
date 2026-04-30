# Seventy Times — developer & AI guide

Marketing landing for **Seventy Times**, a US-based AI + performance-marketing
agency. Single page with a lead form, a review form, and a live Claude-powered
chat assistant named Tess. Trilingual (en / ru / de).

This file is the short orientation map. Read it first when opening the repo.

---

## Tech stack

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | CSS Modules + `src/app/globals.css` design tokens |
| Animation | Framer Motion + Lenis smooth scroll |
| AI chat | `@anthropic-ai/sdk` (server-side only) |
| CRM fan-out | Telegram Bot API + Notion REST API |
| Hosting | Vercel |

---

## File tree (what lives where)

```
src/
├── app/                          Next.js App Router
│   ├── api/
│   │   ├── chat/route.ts         /api/chat — Anthropic proxy for Tess
│   │   ├── lead/route.ts         /api/lead — lead form → Telegram + Notion
│   │   └── review/route.ts       /api/review — review form → Telegram + Notion
│   ├── about/                    /about page (i18n-aware metadata)
│   │   ├── page.tsx              server component, generates metadata
│   │   └── AboutClient.tsx       client component, renders copy
│   ├── privacy/                  /privacy page (same shape as about)
│   │   ├── page.tsx
│   │   └── PrivacyClient.tsx
│   ├── terms/                    /terms page (same shape)
│   │   ├── page.tsx
│   │   └── TermsClient.tsx
│   ├── layout.tsx                Root layout, <html lang> from cookie,
│   │                             JSON-LD, fonts, mounts forms + ChatWidget
│   ├── page.tsx                  Landing page — composes all sections
│   ├── globals.css               Design tokens + reset + shimmer/reduced-motion
│   ├── robots.ts                 /robots.txt
│   ├── sitemap.ts                /sitemap.xml (home + legal + hreflang)
│   └── opengraph-image.tsx       Dynamic OG preview at /opengraph-image
│
├── components/                   Grouped by role
│   ├── layout/                   Chrome: Nav, Footer, PageIntro,
│   │                             CookieConsent
│   ├── sections/                 Landing sections in scroll order:
│   │                             Hero, GrowthMachine, VelocityTicker,
│   │                             Services, Process, ChatDemo, Testimonials,
│   │                             Cases, GrowthSimulator, FAQ, CTA
│   ├── forms/                    LeadForm + ReviewForm (share CSS module)
│   ├── chat/                     ChatWidget (floating Tess chat)
│   ├── decor/                    Non-content: AnimatedBackground,
│   │                             FloatingGlyphs, ScrollProgress, SmoothScroll,
│   │                             SectionDivider, SectionWatermark
│   ├── ui/                       Reusable primitives: Reveal, Magnetic,
│   │                             AnimatedText, RingCounter, Counter,
│   │                             ContactIcons, ServiceIcons, Logo
│   ├── legal/                    LegalPage (shared shell for /privacy /terms)
│   └── seo/                      StructuredData (FAQPage + Service JSON-LD)
│
├── data/                         Static content
│   ├── siteConfig.ts             Brand name, URL, contact URLs, hero stats
│   └── cases.ts                  Portfolio cases (i18n keys + status + url)
│
├── i18n/                         Localization
│   ├── config.ts                 Locale list and labels (en/ru/de)
│   ├── context.tsx               I18nProvider + useT() hook,
│   │                             takes initialLocale from server
│   ├── HtmlLangSync.tsx          Keeps <html lang="..."> in sync when the
│   │                             user switches locale on the client
│   ├── dictionary.ts             Aggregates three locale files
│   └── locales/
│       ├── en.ts                 English strings
│       ├── ru.ts                 Russian strings
│       └── de.ts                 German strings
│
├── lib/                          Server-side / pure utilities
│   ├── apiGuard.ts               Rate limit, Origin check, honeypot helpers
│   ├── telegram.ts               Telegram MarkdownV2 escape
│   ├── notion.ts                 Notion REST helpers (lead + review create)
│   ├── localizedMeta.ts          Per-locale metadata + cookie reader
│   └── systemPrompt.ts           Tess's Claude system prompt (English)
│
└── middleware.ts                 Blocks scanner user-agents on / and /api/*
public/
├── tess.jpg                      Tess portrait (optimized via next/image)
└── favicon.svg
```

Repository root is kept minimal — everything is folders, except this
file and the toolchain configs that Next.js / npm / TypeScript require
at the top level:

| File | Why it must live at the root |
|---|---|
| `CLAUDE.md` | You're reading it — the one orientation doc |
| `package.json` | npm requires it at the project root |
| `tsconfig.json` | TypeScript resolves paths (`@/*`) from here |
| `next.config.mjs` | Next.js config, security headers, rewrites |
| `.gitignore` | Git convention |
| `.env.example` | Template for local `.env.local` — conventionally at root |
| `next-env.d.ts` | Auto-generated by Next.js (ignored in Git) |
| `package-lock.json` | npm-generated lockfile (ignored in Git) |

All source code lives under `src/`. All static assets under `public/`.
No loose `.ts` or `.tsx` files at the root — those were cleared out
during the restructure.

---

## Key concepts

### i18n
- Three locales: `en` (default), `ru`, `de`. Defined in `src/i18n/config.ts`.
- User's choice is saved in a `lang` cookie. `RootLayout` reads it on the
  server with `readLocaleFromCookies()` and passes it both to
  `<html lang={...}>` and `<I18nProvider initialLocale={...}>`. This means
  the SSR'd HTML is already in the user's language — no English flash, no
  hydration mismatch.
- Client components call `useT()` → get `{ locale, t, setLocale }`.
- `setLocale` writes the cookie and re-renders. `HtmlLangSync` keeps the
  `<html lang>` attribute updated when the user switches locale on the fly.
- Server components for `/about`, `/privacy`, `/terms` page.tsx call
  `readLocaleFromCookies()` to localize their metadata.
- Tess (the AI chat) detects the user's language from their first message,
  not from the cookie — rules are in `src/lib/systemPrompt.ts`.

### Dictionary shape
- `Dictionary` type is inferred from `locales/ru.ts`.
- Changing one string in one language is fine, but adding a new key or
  changing a key name **must be done in all three files** — TypeScript will
  complain otherwise.

### API routes
All three routes (`/api/chat`, `/api/lead`, `/api/review`) share a guard
stack, applied in this order:

1. `checkOrigin(req)` — must come from an allowed host (env `ALLOWED_ORIGINS`
   plus automatic `*.vercel.app` and www/non-www tolerance).
2. `rateLimit(key, limit, windowMs)` — in-memory sliding window.
3. Body parse + validation.
4. Honeypot check (`isHoneypotTripped(body.website)`) for form routes — if
   tripped, return a fake success response.
5. Business logic.

Every helper lives in `src/lib/apiGuard.ts`.

### Error responses
On non-2xx, every route returns `{ error: "<CODE>" }` with one of:
`INVALID_JSON`, `MISSING_FIELDS`, `TOO_LONG`, `INVALID_CODE`, `RATE_LIMITED`,
`FORBIDDEN`, `NOT_CONFIGURED`, `MISSING_MESSAGES`, `EMPTY_REPLY`,
`UPSTREAM_ERROR`. Codes are English and stable; the client maps them to
localized strings via the dictionary (e.g. 401 → `t.reviewInvalidCode`,
429 → `t.leadTooMany`). Server text is never displayed directly to the user.

### Lead / review fan-out
`POST /api/lead` and `POST /api/review` send to **both** Telegram and Notion
in parallel via `Promise.allSettled`. Either channel failing does not block
the user's success response. See `src/lib/notion.ts` and the `notifyTelegram`
function inside each route.

### Hero ring animation
`components/ui/RingCounter.tsx` drives the four hero stats. It writes to the
SVG circle's `stroke-dashoffset` and the number's `textContent` **directly
via refs** — React state is not used in the animation loop, so every rAF tick
paints a frame. The rings wait for a `st-intro-gone` event dispatched by
`PageIntro` before starting, so the fill is visible from 0 rather than
playing behind the intro curtain.

### Security headers
`next.config.mjs` → `headers()` returns CSP, HSTS, X-Frame-Options,
Referrer-Policy, Permissions-Policy, and X-Content-Type-Options for all
routes. CSP is intentionally loose on scripts (`unsafe-inline`, `unsafe-eval`)
because Framer Motion injects inline styles and Next.js needs inline scripts;
tighten later with nonces if needed.

---

## Environment variables

All optional except `ANTHROPIC_API_KEY`. See `.env.example` for full setup
instructions and example values.

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Claude Sonnet 4.6 for Tess (required) |
| `ANTHROPIC_MODEL` | Override model id (default: `claude-sonnet-4-6`) |
| `ALLOWED_ORIGINS` | Comma-separated origins allowed to call /api/* |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` | Forward leads/reviews to Telegram |
| `CLIENT_CODES` | Comma-separated codes for the review form |
| `NOTION_TOKEN` | Internal integration secret for the Notion CRM |
| `NOTION_DATABASE_LEADS_ID` | Target Notion database for leads |
| `NOTION_DATABASE_REVIEWS_ID` | Target Notion database for reviews |

---

## Common tasks

### Add a new FAQ question
1. Add `faqNq` and `faqNa` keys (same N across all three locale files).
2. Append one more entry to the `items` array in
   `src/components/sections/FAQ.tsx`.
3. Extend the `faqItems` array in
   `src/components/seo/StructuredData.tsx` so Google's FAQPage JSON-LD
   picks up the new entry.

### Add a new section to the landing
1. Create the component file under `src/components/sections/NewSection.tsx`
   with its CSS module next to it.
2. Add any new i18n keys to all three locale files.
3. Import it into `src/app/page.tsx` and place it in the desired order with a
   `<SectionDivider label={...} />` above it.

### Add a new language (e.g. French)
1. Add `"fr"` to the `Locale` union and `LOCALES` array in
   `src/i18n/config.ts`. Add a label in `LOCALE_LABELS`.
2. Copy `src/i18n/locales/en.ts` to `src/i18n/locales/fr.ts` and translate.
3. Register it in `src/i18n/dictionary.ts`.
4. Add metadata entries in `src/lib/localizedMeta.ts` (main meta, privacy,
   terms).
5. Extend the `hreflang` map in `src/app/layout.tsx` and the alternates in
   `src/app/sitemap.ts`.

### Change what lands in Notion
Edit the `properties` object passed to `createPage` inside
`src/lib/notion.ts`. The shape must match the Notion database schema:
- Leads db: Name (title), Contact, Business, Request, Status (select),
  Source (select), Locale (select), Submitted (date).
- Reviews db: Name (title), Role, Location, Content, Code, Status (select),
  Submitted (date).

### Tune rate limits
`src/app/api/*/route.ts` — each route calls
`rateLimit('lead:<ip>', 5, 60 * 60_000)` style. Bump the 2nd (limit) or 3rd
(window ms) argument. In-memory store lives in `src/lib/apiGuard.ts` and is
per-Vercel-instance — switch to Upstash Redis if you need global counters.

---

## Gotchas

- **PageIntro only plays once per session**. It writes a `st-intro-seen` key
  to sessionStorage. Clear sessionStorage (or open incognito) to see it
  again. The intro also dispatches `st-intro-gone` on dismissal — hero rings
  subscribe and wait for that before animating.
- **Chat history persists** to `localStorage` under `st-chat-history-v1`,
  last 50 messages. Clear that key to wipe Tess's memory of the session.
- **GrowthSimulator** saves slider levels in `st-simulator-levels-v1`.
- **CookieConsent** stores the user's choice in `localStorage` under
  `st-cookie-consent-v1` (values `"accepted"` or `"essential"`). Gate any
  new analytics scripts on this value.
- **Honeypot field**: every form has an invisible `website` input. If a bot
  fills it, the server returns 200 and silently drops the payload — no
  Telegram, no Notion, one warn line in logs. Don't add a visible field
  named `website` without renaming the honeypot.
- **Next-image + tess.jpg**: rendered with explicit width/height because
  the source is a JPEG. Replace carefully.
- **Middleware** runs on `/` and `/api/*` only. If you add a new route
  that should be protected, update the `matcher` in `src/middleware.ts`.
- **`overrides` in `package.json`** pins `glob ≥ 10.5.0` and
  `postcss ≥ 8.5.10` to patch transitive CVEs. Keep these unless the upstream
  versions ship newer fixes — `npm audit` will flag regressions.
