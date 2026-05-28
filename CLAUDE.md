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
| AI chat | `@anthropic-ai/sdk` (server-side only, streaming) |
| CRM fan-out | Telegram Bot API + Notion REST API |
| Hosting | Vercel |

---

## File tree (what lives where)

```
src/
├── app/                          Next.js App Router
│   ├── api/
│   │   ├── chat/route.ts         /api/chat — streaming Anthropic proxy for Tess
│   │   ├── lead/route.ts         /api/lead — lead form → Telegram + Notion
│   │   ├── review/route.ts       /api/review — review form → Telegram + Notion
│   │   └── error/route.ts        /api/error — sink for client-side errors
│   ├── [locale]/                 Every public URL is locale-prefixed
│   │   │                         (/en, /ru, /de + their subpages)
│   │   ├── layout.tsx            Validates the :locale segment, no-op wrapper
│   │   ├── page.tsx              Landing — composes all sections
│   │   ├── about/                /<locale>/about
│   │   ├── cases/[slug]/         /<locale>/cases/<id> — per-case page
│   │   │                         (CaseDetail uses CaseCard from sections/cases)
│   │   ├── services/[slug]/      /<locale>/services/<id> — per-service page
│   │   ├── privacy/              /<locale>/privacy
│   │   └── terms/                /<locale>/terms
│   ├── layout.tsx                Root: <html lang>, fonts, JSON-LD, metadata,
│   │                             mounts I18nProvider + decor + overlays
│   ├── globals.css               Design tokens + reset + skip-link
│   ├── not-found.tsx             Branded localized 404
│   ├── global-error.tsx          Last-resort React error boundary
│   ├── feed.xml/route.ts         RSS feed (cases now, blog later)
│   ├── manifest.ts               PWA web-app manifest
│   ├── opengraph-image.tsx       Dynamic OG card at /opengraph-image
│   ├── robots.ts                 /robots.txt
│   └── sitemap.ts                /sitemap.xml — every locale × page × case × service
│
├── components/
│   ├── chrome/                   Always-visible page chrome
│   │   ├── Nav.tsx               Top bar, language switcher, CTA, mobile menu
│   │   └── Footer.tsx            Footer columns, contact links, disclaimer
│   ├── overlays/                 Anything that pops up over the page
│   │   ├── PageIntro.tsx         Once-per-session cinematic intro
│   │   ├── ClientOverlays.tsx    next/dynamic({ ssr: false }) wrapper for
│   │   │                         all the overlays below — keeps them out of
│   │   │                         the SSR'd HTML
│   │   ├── chat/ChatWidget.tsx   Floating Tess chat (token streaming)
│   │   ├── forms/LeadForm.tsx    3-step lead modal (#lead hash trigger)
│   │   ├── forms/ReviewForm.tsx  Review modal with code gate (#review hash)
│   │   ├── CookieConsent.tsx     Cookie banner (gates analytics)
│   │   ├── MobileStickyCta.tsx   Sticky "Get a quote" pill on phones
│   │   └── ExitIntent.tsx        Desktop exit-intent prompt (once / session)
│   ├── system/                   Headless utilities, no UI
│   │   ├── ServiceWorkerRegister Registers /sw.js for offline + cache
│   │   └── ErrorReporter         window.error / unhandledrejection → /api/error
│   ├── sections/                 Landing sections in scroll order:
│   │   │                         Hero, MarqueeStack, GrowthMachine, Services,
│   │   │                         Comparison, Process, ChatDemo, Testimonials,
│   │   │                         Cases, GrowthSimulator, FAQ, CTA
│   │   ├── cases/                Sub-components used by Cases + case pages
│   │   │   ├── CaseCard.tsx
│   │   │   └── PlaceholderCard.tsx
│   │   └── services/
│   │       └── ServiceCard.tsx   Used by Services on the landing
│   ├── decor/                    Non-content visuals: AnimatedBackground,
│   │                             FloatingGlyphs, ScrollProgress, SmoothScroll,
│   │                             SectionDivider, SectionWatermark
│   ├── ui/                       Reusable primitives: Reveal, Magnetic,
│   │                             AnimatedText, RingCounter, Counter,
│   │                             ContactIcons, ServiceIcons, Logo
│   ├── legal/                    Shared shell for /privacy + /terms
│   └── seo/StructuredData.tsx    Client-rendered FAQPage + Service JSON-LD
│
├── data/                         Static content (single source of truth)
│   ├── siteConfig.ts             Brand name, URL, contacts, hero stats
│   ├── cases.ts                  Portfolio cases (id + i18n keys + status)
│   └── services.ts               Service catalogue (key + slug + i18n keys)
│
├── i18n/
│   ├── config.ts                 Locale list + isLocale + localizedPath()
│   ├── context.tsx               I18nProvider + useT() (locale, t, setLocale,
│   │                             localePath)
│   ├── dictionary.ts             Aggregates the three locale files,
│   │                             infers the Dictionary type from ru.ts
│   └── locales/{en,ru,de}.ts     Translation tables (must stay in sync — TS
│                                 will complain if a key is missing)
│
├── lib/                          Server-side / pure utilities
│   ├── apiGuard.ts               Origin check, rate limit, honeypot
│   ├── telegram.ts               Telegram MarkdownV2 escape
│   ├── notion.ts                 Notion REST helpers (lead + review create)
│   ├── localizedMeta.ts          Per-locale metadata getters
│   ├── systemPrompt.ts           Tess's Claude system prompt
│   ├── contactValidation.ts      isPlausibleContact() shared by forms
│   ├── leadDraft.ts              localStorage helpers for the lead form
│   └── reviewDraft.ts            Same, for the review form
│
└── middleware.ts                 Locale-prefix detection + redirect of /
                                  always to /en, ?lang= → 308 to /<locale>,
                                  sets x-locale header, refreshes cookie,
                                  blocks scanner UAs.
public/
├── tess.jpg                      Tess portrait (next/image, fixed size)
├── sw.js                         Stale-while-revalidate service worker
└── favicon.svg
```

Repository root: `CLAUDE.md`, `README.md`, `package.json`, `tsconfig.json`,
`next.config.mjs`, `next-env.d.ts`, `.env.example`, `.gitignore` — and
nothing else.

---

## Key concepts

### Routing & i18n
- Three locales: `en` (default), `ru`, `de`. Defined in `src/i18n/config.ts`.
- **Every public URL is locale-prefixed**: `/en`, `/ru/about`, `/de/cases/X`.
  Each `(locale × page)` is statically pre-rendered at build time via
  `generateStaticParams`.
- Bare `/` always 307s to `/en`. Browser `Accept-Language` is intentionally
  ignored — the agency operates in English first; RU and DE are opt-in.
- `?lang=ru|de|en` 308-redirects to `/<locale>` and sets the cookie. Lets
  shared / hreflang links land on the right language without a query string.
- Middleware sets an `x-locale` header on every request based on the URL
  prefix (or the default). `app/layout.tsx` reads it via `headers()` and
  renders `<html lang>`, metadata, and the I18nProvider with that locale.
- Client components call `useT()` → `{ locale, t, setLocale, localePath }`.
  Use `localePath("/about")` to build any internal URL — never hard-code
  `/about` because it'll lose the locale prefix.

### Dictionary shape
- `Dictionary` type is inferred from `locales/ru.ts`.
- Adding a new key or renaming an existing one **must be done in all three
  files** — TypeScript errors out otherwise.

### API routes
All four routes (`/api/chat`, `/api/lead`, `/api/review`, `/api/error`)
share a guard stack from `lib/apiGuard.ts`, applied in this order:
1. `checkOrigin(req)` — must come from an allowed host (env `ALLOWED_ORIGINS`
   plus automatic `*.vercel.app` and www/non-www tolerance).
2. `rateLimit(key, limit, windowMs)` — in-memory sliding window.
3. Body parse + validation.
4. Honeypot check (`isHoneypotTripped`) for form routes — if tripped,
   return a fake `{ ok: true }` and silently drop the payload.
5. Business logic.

### Error responses
On non-2xx, every route returns `{ error: "<CODE>" }` with one of:
`INVALID_JSON`, `MISSING_FIELDS`, `TOO_LONG`, `INVALID_CODE`, `RATE_LIMITED`,
`FORBIDDEN`, `NOT_CONFIGURED`, `MISSING_MESSAGES`, `EMPTY_REPLY`,
`UPSTREAM_ERROR`. Codes are English and stable; the client maps them to
localized strings via the dictionary (e.g. `401 → t.reviewInvalidCode`,
`429 → t.leadTooMany`). Server text is never displayed directly to the user.

### Lead / review fan-out
`POST /api/lead` and `POST /api/review` send to **both** Telegram and Notion
in parallel via `Promise.allSettled`. Either channel failing does not block
the user's success response. See `lib/notion.ts` and the `notifyTelegram`
function inside each route.

### Streaming chat
`POST /api/chat` returns `application/x-ndjson`: one JSON object per
newline (`{"text":"..."}` per token, `{"done":true}` at the end, or
`{"error":"UPSTREAM_ERROR"}` on failure). The widget reads the body via a
`ReadableStream` reader and appends each text delta to the live assistant
bubble.

### Form draft persistence
`LeadForm` autosaves every keystroke (everything except the honeypot) to
`localStorage` under `st-lead-draft-v1`. `ReviewForm` does the same under
`st-review-draft-v1`. Both keys are wiped on a successful submit. Helpers
live in `lib/leadDraft.ts` and `lib/reviewDraft.ts`.

### Hero ring animation
`components/ui/RingCounter.tsx` drives the four hero stats. It writes to
the SVG circle's `stroke-dashoffset` and the number's `textContent`
**directly via refs** — React state is not used in the animation loop, so
every rAF tick paints a frame. The rings wait for a `st-intro-gone` event
dispatched by `PageIntro` before starting.

### Security headers
`next.config.mjs → headers()` returns CSP, HSTS, X-Frame-Options,
Referrer-Policy, Permissions-Policy, and X-Content-Type-Options for all
routes. CSP allows `unsafe-inline` / `unsafe-eval` on scripts because
Framer Motion injects inline styles and Next.js needs inline scripts;
tighten later with nonces if needed.

---

## SEO playbook (what the site does and why)

The whole point of the locale-prefixed routing + per-case + per-service
pages is to give Google distinct, indexable URLs for every meaningful
concept on the site.

| Surface | URL pattern | What gets indexed |
|---|---|---|
| Landing | `/<locale>` | Brand + all four service tags + FAQ |
| About | `/<locale>/about` | Team / mission |
| Case study | `/<locale>/cases/<slug>` | Each portfolio project |
| Service | `/<locale>/services/<slug>` | Each service offering |
| Legal | `/<locale>/{privacy,terms}` | Trust signals |

**JSON-LD already wired:**
- `Organization` (root layout, server-rendered)
- `FAQPage` with all 13 questions (`StructuredData.tsx`, client-rendered)
- `Service` × 3 on the landing + per-page `Service` on each `/services/<slug>`
- `BreadcrumbList` on every case + service page

**Sitemap (`app/sitemap.ts`):** every (locale × page) and (locale × case)
and (locale × service) URL with `hreflang` alternates and `x-default`
pointing to the English version.

**Robots (`app/robots.ts`):** allow everything, point to the sitemap,
disallow `/api/*` (no value to crawlers).

**Open Graph + Twitter cards:** `app/layout.tsx` declares `og:image` /
`twitter:image` pointing at `/opengraph-image` (dynamic, locale-aware
via cookie/header). Width/height/alt are explicit so Slack and Telegram
preview renderers don't have to guess.

**RSS:** `/feed.xml` ships the cases as items so feed aggregators have
something today; once we add a blog, prepend posts.

**`Accept-Language`** is deliberately *not* used for redirects (would
fragment the canonical and confuse analytics). Locale always comes from
the URL prefix.

**When you add a new page or section**, update three places:
1. The page itself (under `app/[locale]/...`).
2. `app/sitemap.ts` so search engines discover it.
3. If it has a CTA into `#lead` or `#chat`, the anchor pattern still
   works — `LeadForm`/`ChatWidget` listen to hash + the
   `open-tess` event globally.

---

## Environment variables

All optional except `ANTHROPIC_API_KEY`. See `.env.example` for full setup.

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
   `components/sections/FAQ.tsx`.
3. Extend `faqItems` in `components/seo/StructuredData.tsx` so the
   FAQPage JSON-LD picks up the new entry.

### Add a new section to the landing
1. Create `components/sections/NewSection.tsx` with its CSS module.
2. Add any new i18n keys to all three locale files.
3. Import it in `app/[locale]/page.tsx`, place it in scroll order, and
   add a `<SectionDivider labelKey="divNew" />` above it.

### Add a new case
1. Append to `CASES` in `data/cases.ts` with id + i18n key bindings.
2. Add the four content keys (`caseNTitle / caseNTag / caseNSummary /
   caseNMetrics`) in all three locale files.
3. Sitemap and the per-case route pick it up automatically — `[slug]`
   uses `generateStaticParams` over `CASES`.

### Add a new service
1. Append to `SERVICES` in `data/services.ts` with key + slug + i18n
   bindings.
2. Add `svcNTitle / svcNTag / svcNNote / svcNInc / svcNAdd` keys in
   all three locale files.
3. Sitemap, the per-service route, and the landing card grid pick it
   up automatically.

### Add a new language (e.g. French)
1. Add `"fr"` to `Locale` and `LOCALES` in `i18n/config.ts`. Add a
   label in `LOCALE_LABELS`.
2. Copy `locales/en.ts` to `locales/fr.ts` and translate.
3. Register it in `i18n/dictionary.ts`.
4. Add metadata getters in `lib/localizedMeta.ts`.
5. Sitemap + middleware + layout pick it up automatically because they
   all read from `LOCALES`.

### Tune rate limits
`app/api/*/route.ts` — each route calls `rateLimit('lead:<ip>', 5, 60 *
60_000)` style. Bump the 2nd (limit) or 3rd (window ms) argument. The
in-memory store lives in `lib/apiGuard.ts` and is per-Vercel-instance —
switch to Upstash Redis if you need global counters.

---

## Styling — mobile-first convention

CSS modules are written **mobile-first**. The rules outside of any
`@media` query describe the layout at the smallest supported viewport
(~375 px). Larger layouts are layered on with `@media (min-width: ...)`
queries.

```css
/* Base — mobile (no media query). */
.grid { grid-template-columns: 1fr; gap: 12px; }

/* Tablet and up. */
@media (min-width: 768px) { .grid { gap: 18px; } }

/* Desktop and up. */
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(4, 1fr); } }
```

Breakpoint constants live in `globals.css` as `--bp-tablet (768)`,
`--bp-desktop (1024)`, `--bp-wide (1280)` — copy the px value into the
query directly (CSS custom properties can't be used inside `@media`).
Older components still use `@media (max-width: ...)` overrides; they
get converted phase-by-phase, not all at once.

---

## Gotchas

- **Chat history persists** to `localStorage` under `st-chat-history-v1`,
  last 50 messages. Clear that key to wipe Tess's session memory.
- **GrowthSimulator** saves slider levels in `st-simulator-levels-v1`.
- **CookieConsent** stores the user's choice in `localStorage` under
  `st-cookie-consent-v1` (`"accepted"` or `"essential"`). Gate any new
  analytics scripts on this value.
- **LeadForm draft** persists in `localStorage` under `st-lead-draft-v1`
  (everything except the honeypot). Wiped on a successful submit.
- **Lead form mode** (3-step wizard vs all-fields) is stored under
  `st-lead-mode-v1`.
- **Honeypot field**: every form has an invisible `website` input. Bots
  fill it → server returns 200 and silently drops, one warn line in
  logs. Don't add a visible field named `website` without renaming the
  honeypot.
- **Next-image + tess.jpg**: rendered with explicit width/height because
  the source is a JPEG. Replace carefully.
- **Middleware** runs on every page route (locale routing) and `/api/*`.
  Static assets and the file-based prerender outputs are excluded by
  the `matcher`.
- **`overrides` in `package.json`** pin `glob ≥ 10.5.0` and
  `postcss ≥ 8.5.10` to patch transitive CVEs. Keep them unless the
  upstream versions ship newer fixes — `npm audit` flags regressions.
- **Service worker** caches same-origin GETs stale-while-revalidate.
  Local dev is intentionally skipped (skipped on `localhost`) so
  hot-reload isn't cached into oblivion.
