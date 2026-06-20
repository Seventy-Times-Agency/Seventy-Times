# Seventy Times — developer & AI guide

Marketing landing for **Seventy Times**, a US-based AI + performance-marketing
agency. Single page with a lead form, a callback form, a review form, and a
live Claude-powered chat assistant named Vanessa. Four languages
(en / ru / de / uk).

This file is the short orientation map. Read it first when opening the repo.

---

## Tech stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | CSS Modules + `src/app/globals.css` design tokens |
| Animation | Framer Motion + Lenis smooth scroll |
| AI chat | `@anthropic-ai/sdk` (server-side only, streaming) |
| CRM fan-out | Telegram Bot API + Notion REST API + Resend email |
| Hosting | Vercel |

---

## File tree (what lives where)

```
src/
├── app/                          Next.js App Router
│   ├── api/
│   │   ├── chat/route.ts         /api/chat — streaming Anthropic proxy for
│   │   │                         Vanessa + tool use (submit_lead /
│   │   │                         open_lead_form) so she can close & hand off
│   │   ├── lead/route.ts         /api/lead — lead + callback form → Telegram
│   │   │                         + Notion + email
│   │   ├── review/route.ts       /api/review — review form → Telegram + Notion
│   │   └── error/route.ts        /api/error — sink for client-side errors
│   ├── [locale]/                 Every public URL is locale-prefixed
│   │   │                         (/en, /ru, /de, /uk + their subpages)
│   │   ├── layout.tsx            THE root layout (there is no app/layout.tsx):
│   │   │                         <html lang>, fonts, JSON-LD, metadata,
│   │   │                         I18nProvider + decor + overlays
│   │   ├── page.tsx              Landing — composes all sections
│   │   ├── [...rest]/            Catch-all → notFound() for unknown URLs
│   │   ├── not-found.tsx         Branded localized 404
│   │   ├── about/                /<locale>/about
│   │   ├── team/                 /<locale>/team
│   │   ├── cases/[slug]/         /<locale>/cases/<id> — per-case page
│   │   │                         (CaseDetail uses CaseCard from sections/cases)
│   │   ├── services/[slug]/      /<locale>/services/<id> — per-service page
│   │   ├── privacy/              /<locale>/privacy
│   │   └── terms/                /<locale>/terms
│   │   ├── opengraph-image.tsx   Localized OG card at
│   │   │                         /<locale>/opengraph-image/og
│   ├── globals.css               Design tokens + reset + skip-link
│   ├── global-error.tsx          Last-resort React error boundary
│   │                             (renders its own <html>)
│   ├── feed.xml/route.ts         RSS feed (cases now, blog later)
│   ├── manifest.webmanifest/     PWA manifest, localized by the lang
│   │   route.ts                  cookie (linked via metadata.manifest)
│   ├── robots.ts                 /robots.txt
│   ├── sitemap.ts                /sitemap.xml — every locale × page × case × service
│   └── sw.js/route.ts            Serves the service worker with a per-deploy
│                                 cache version (VERCEL_GIT_COMMIT_SHA)
│
├── components/
│   ├── chrome/                   Always-visible page chrome
│   │   ├── Nav.tsx               Top bar, language switcher, CTA, mobile menu
│   │   └── Footer.tsx            Footer columns, contact links, disclaimer
│   ├── overlays/                 Anything that pops up over the page
│   │   ├── ClientOverlays.tsx    next/dynamic({ ssr: false }) wrapper for
│   │   │                         all the overlays below — keeps them out of
│   │   │                         the SSR'd HTML
│   │   ├── chat/ChatWidget.tsx   Floating Vanessa chat (token streaming)
│   │   ├── forms/LeadForm.tsx    3-step lead modal (#lead hash trigger)
│   │   ├── forms/CallbackForm.tsx Compact "request a call" modal (#callback),
│   │   │                         posts to /api/lead with kind="callback"
│   │   ├── forms/ReviewForm.tsx  Review modal with code gate (#review hash)
│   │   ├── forms/useHashModal.ts Shared modal lifecycle: hash trigger,
│   │   │                         scroll lock, Escape, post-close reset
│   │   ├── CookieConsent.tsx     Cookie banner (gates analytics)
│   │   ├── MobileStickyCta.tsx   Sticky "Get a quote" pill on phones
│   │   └── ExitIntent.tsx        Desktop exit-intent prompt (once / session)
│   ├── system/                   Headless utilities, no UI
│   │   ├── ServiceWorkerRegister Registers /sw.js for offline + cache
│   │   └── ErrorReporter         window.error / unhandledrejection → /api/error
│   ├── sections/                 Landing sections in scroll order:
│   │   │                         Hero, MarqueeStack, GrowthMachine, Services,
│   │   │                         Comparison, Process, ChatDemo, Testimonials
│   │   │                         (falls back to Principles when no approved
│   │   │                         reviews), Cases, GrowthSimulator, FAQ, CTA
│   │   ├── cases/                Sub-components used by Cases + case pages
│   │   │   ├── CaseCard.tsx
│   │   │   └── PlaceholderCard.tsx
│   │   └── services/
│   │       └── ServiceCard.tsx   Used by Services on the landing
│   ├── decor/                    Non-content visuals: AnimatedBackground,
│   │                             FloatingGlyphs, ScrollProgress, SmoothScroll,
│   │                             SectionDivider, SectionWatermark
│   ├── ui/                       Reusable primitives: Reveal, Magnetic,
│   │                             AnimatedText, RingCounter,
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
│   ├── config.ts                 Locale list + isLocale + localizedPath() +
│   │                             LOCALE_LANG (URL slug → ISO 639-1 code)
│   ├── context.tsx               I18nProvider + useT() (locale, t, setLocale,
│   │                             localePath)
│   ├── dictionary.ts             Aggregates the four locale files,
│   │                             infers the Dictionary type from ru.ts
│   └── locales/{en,ru,de,uk}.ts  Translation tables (must stay in sync — TS
│                                 will complain if a key is missing)
│
├── lib/                          Server-side / pure utilities
│   ├── apiGuard.ts               Origin check, rate limit, honeypot, dedup
│   ├── fetchWithTimeout.ts       fetch() with an enforced timeout
│   ├── telegram.ts               Telegram MarkdownV2 escape + sendMessage
│   ├── notion.ts                 Notion REST helpers (lead/review/chat create,
│   │                             approved-reviews query)
│   ├── email.ts                  Resend email fallback for leads/reviews
│   ├── leadDelivery.ts           Shared deliverLead() fan-out (Telegram +
│   │                             Notion + email) used by /api/lead and the
│   │                             /api/chat submit_lead tool
│   ├── localizedMeta.ts          Per-locale metadata getters +
│   │                             languageAlternates() hreflang helper
│   ├── systemPrompt.ts           Vanessa's Claude system prompt (consultant
│   │                             + soft-closer sales playbook)
│   ├── contactValidation.ts      isPlausibleContact() shared by forms
│   ├── leadDraft.ts              localStorage helpers + LeadPackage/LeadBudget
│   │                             types & validators (also used by /api/lead
│   │                             and notion.ts)
│   └── reviewDraft.ts            Same, for the review form
│
└── middleware.ts                 Locale-prefix detection + redirect of /
                                  always to /en, ?lang= → 308 to /<locale>,
                                  sets x-locale header (read by not-found),
                                  refreshes cookie, blocks scanner UAs.
public/
├── vanessa.jpg                   Vanessa portrait (next/image, fixed size)
├── sw.js                         Static fallback service worker
└── favicon.svg
```

Repository root: `CLAUDE.md`, `README.md`, `package.json`, `tsconfig.json`,
`next.config.mjs`, `next-env.d.ts`, `.env.example`, `.gitignore` — and
nothing else.

---

## Key concepts

### Routing & i18n
- Four locales: `en` (default), `ru`, `de`, `uk`. Defined in
  `src/i18n/config.ts`. Slugs match ISO 639-1 codes; `LOCALE_LANG`
  in `i18n/config.ts` keeps the slug→code mapping for `<html lang>`,
  hreflang and JSON-LD in case they ever diverge again.
- **Legacy `/ua` URLs** (the Ukrainian locale was originally named
  after the country code) 301-redirect to `/uk` in middleware; the
  `lang=ua` cookie/query/body value is accepted everywhere as an alias
  for `uk` because cookies persist for a year. The switcher still
  *displays* "UA" (`LOCALE_LABELS`) — that's what Ukrainians expect to
  see, and a "UK" label would read as United Kingdom.
- **Every public URL is locale-prefixed**: `/en`, `/ru/about`, `/de/cases/X`.
  Each `(locale × page)` is statically pre-rendered at build time via
  `generateStaticParams`.
- Bare `/` always 307s to `/en`. Browser `Accept-Language` is intentionally
  ignored — the agency operates in English first; ru / de / uk are opt-in.
- `?lang=ru|de|en|uk` 308-redirects to `/<locale>` and sets the cookie
  (`?lang=ua` is a legacy alias for `uk`). Lets
  shared / hreflang links land on the right language without a query string.
- **`app/[locale]/layout.tsx` is the root layout** (there is no
  `app/layout.tsx`). It renders `<html lang>` from the URL's locale
  param, so every statically generated page ships the right `lang`
  without client-side patching. Unknown paths fall through middleware's
  redirect into `app/[locale]/[...rest]` → the branded 404.
- Client components call `useT()` → `{ locale, t, setLocale, localePath }`.
  Use `localePath("/about")` to build any internal URL — never hard-code
  `/about` because it'll lose the locale prefix.

### Dictionary shape
- `Dictionary` type is inferred from `locales/ru.ts`.
- `dictionary.ts` types the locale map as `Record<Locale, Dictionary>`
  **without casts** — that annotation is the safety net. Adding a new key
  or renaming an existing one **must be done in all four files**;
  TypeScript errors out otherwise. Don't reintroduce `as Dictionary`,
  it silences exactly the mismatch this is meant to catch.

### API routes
All four routes (`/api/chat`, `/api/lead`, `/api/review`, `/api/error`)
share a guard stack from `lib/apiGuard.ts`, applied in this order:
1. `checkOrigin(req)` — must come from an allowed host (env `ALLOWED_ORIGINS`,
   this project's own Vercel deployment URLs via `VERCEL_URL` /
   `VERCEL_BRANCH_URL` / `VERCEL_PROJECT_PRODUCTION_URL`, and www/non-www
   tolerance). Arbitrary `*.vercel.app` hosts are NOT trusted.
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
`POST /api/lead` and `POST /api/review` fan out to Telegram, Notion and
email (Resend) in parallel via `Promise.allSettled`, **after** the
response is sent (`after()` from `next/server`). A failing channel never
blocks the user's success response; each helper returns a boolean and
the route logs per-channel failures plus a loud
`ALL channels failed` error when nothing got through. All upstream
calls go through `fetchWithTimeout` with a 7s ceiling.

### Streaming chat
`POST /api/chat` returns `application/x-ndjson`: one JSON object per
newline (`{"text":"..."}` per token, `{"done":true}` at the end,
`{"error":"UPSTREAM_ERROR"}` on failure, or `{"action":"open_form"}` /
`{"action":"lead_captured"}` for tool side-effects). The widget reads the
body via a `ReadableStream` reader and appends each text delta to the live
assistant bubble. Turns are logged to the Notion chats database when
configured.

**Vanessa is a closer, not just a consultant.** The chat route gives
Claude two tools and runs an agent loop (stream → if `stop_reason` is
`tool_use`, run the tool, feed the `tool_result` back, re-stream; capped
at `MAX_TOOL_ROUNDS`):
- `submit_lead` — captures a contact mid-conversation and fans it out
  through the **same** `deliverLead()` pipeline the forms use (so chat
  leads land in Telegram/Notion/email, tagged `source: "chat"` /
  "Vanessa chat"). Validated like `/api/lead` (plausible contact, length
  caps, dedup); the widget reflects `{"action":"lead_captured"}`.
- `open_lead_form` — emits `{"action":"open_form"}`; the widget sets
  `location.hash = "#lead"` to open the existing modal for visitors who'd
  rather use a form.
Vanessa's sales behaviour (qualify → pain → result → soft hand-off, never
quote a price) lives in `lib/systemPrompt.ts`.

### Lead delivery (shared fan-out)
`lib/leadDelivery.ts` owns the Telegram + Notion + email fan-out via
`deliverLead(lead, { duplicate, kind, locale, source })`. Both `/api/lead`
(`source: "website"`, fired in `after()`) and the `/api/chat` `submit_lead`
tool (`source: "chat"`, awaited so Vanessa can confirm or fall back) call
it. Telegram + email always fire; Notion is skipped on a duplicate. Returns
whether any channel succeeded.

### Form draft persistence
`LeadForm` autosaves every keystroke (everything except the honeypot) to
`localStorage` under `st-lead-draft-v1`. `ReviewForm` does the same under
`st-review-draft-v1`. Both keys are wiped on a successful submit. Helpers
live in `lib/leadDraft.ts` and `lib/reviewDraft.ts`.

### Hero ring animation
`components/ui/RingCounter.tsx` drives the four hero stats. It writes to
the SVG circle's `stroke-dashoffset` and the number's `textContent`
**directly via refs** — React state is not used in the animation loop, so
every rAF tick paints a frame.

### Security headers
`next.config.mjs → headers()` returns CSP, HSTS, X-Frame-Options,
Referrer-Policy, Permissions-Policy, and X-Content-Type-Options for all
routes. `script-src` allows `unsafe-inline` (Next.js inlines its
bootstrap; nonces would force every page dynamic and kill SSG) but
`unsafe-eval` only in dev (HMR needs it — production does not).

---

## SEO playbook (what the site does and why)

The whole point of the locale-prefixed routing + per-case + per-service
pages is to give Google distinct, indexable URLs for every meaningful
concept on the site.

| Surface | URL pattern | What gets indexed |
|---|---|---|
| Landing | `/<locale>` | Brand + all four service tags + FAQ |
| About | `/<locale>/about` | Team / mission |
| Team | `/<locale>/team` | Team bios |
| Case study | `/<locale>/cases/<slug>` | Each portfolio project |
| Service | `/<locale>/services/<slug>` | Each service offering |
| Legal | `/<locale>/{privacy,terms}` | Trust signals |

**Canonical + hreflang rules:**
- Canonical always carries the locale prefix (`https://…/en`, never the
  bare domain — that's a redirect).
- hreflang maps come from `languageAlternates()` in `lib/localizedMeta.ts`
  so every surface (layout metadata, per-page metadata, sitemap) emits
  the same set, keyed by ISO codes (`en`, `ru`, `de`, `uk`) with
  `x-default` → the English URL.

**JSON-LD already wired:**
- `Organization` + `ProfessionalService` + `WebSite` graph
  (`[locale]/layout.tsx`, server-rendered)
- `FAQPage` (`StructuredData.tsx`, client-rendered)
- `Service` on the landing + per-page `Service` on each `/services/<slug>`
- `BreadcrumbList` on every case + service page

**Sitemap (`app/sitemap.ts`):** every (locale × page) and (locale × case)
and (locale × service) URL with `hreflang` alternates and `x-default`
pointing to the English version.

**Robots (`app/robots.ts`):** allow everything, point to the sitemap,
disallow `/api/*` (no value to crawlers).

**Open Graph + Twitter cards:** the card is generated per locale by
`app/[locale]/opengraph-image.tsx` (file convention → og:image with
explicit width/height + localized alt via `generateImageMetadata`);
`[locale]/layout.tsx` points `twitter:image` at the same
`/<locale>/opengraph-image/og` URL.

**RSS:** `/feed.xml` ships the cases as items so feed aggregators have
something today; once we add a blog, prepend posts.

**`Accept-Language`** is deliberately *not* used for redirects (would
fragment the canonical and confuse analytics). Locale always comes from
the URL prefix.

**When you add a new page or section**, update three places:
1. The page itself (under `app/[locale]/...`).
2. `app/sitemap.ts` so search engines discover it.
3. If it has a CTA into `#lead`, `#callback`, `#review` or the chat,
   the anchor pattern still works — the overlays listen to hash changes
   + the `open-chat` event globally.

---

## Environment variables

All optional except `ANTHROPIC_API_KEY`. See `.env.example` for full setup.

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Claude Sonnet 4.6 for Vanessa (required) |
| `ANTHROPIC_MODEL` | Override model id (default: `claude-sonnet-4-6`) |
| `ALLOWED_ORIGINS` | Comma-separated origins allowed to call /api/* |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` | Forward leads/reviews to Telegram |
| `CLIENT_CODES` | Comma-separated codes for the review form |
| `NOTION_TOKEN` | Internal integration secret for the Notion CRM |
| `NOTION_DATABASE_LEADS_ID` | Target Notion database for leads |
| `NOTION_DATABASE_REVIEWS_ID` | Target Notion database for reviews |
| `NOTION_DATABASE_CHATS_ID` | Target Notion database for chat-turn logging |
| `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` (+ `RESEND_FROM`) | Email fallback channel |
| `VERCEL_URL` / `VERCEL_BRANCH_URL` / `VERCEL_PROJECT_PRODUCTION_URL` | Auto-set by Vercel; origin checks trust these hostnames |
| `VERCEL_GIT_COMMIT_SHA` / `NEXT_PUBLIC_BUILD_ID` | Auto-set / optional; versions the service-worker cache |

---

## Common tasks

### Add a new FAQ question
1. Add `faqNq` and `faqNa` keys (same N across all four locale files).
2. Append one more entry to the `items` array in
   `components/sections/FAQ.tsx`.
3. Extend `faqItems` in `components/seo/StructuredData.tsx` so the
   FAQPage JSON-LD picks up the new entry.

### Add a new section to the landing
1. Create `components/sections/NewSection.tsx` with its CSS module.
2. Add any new i18n keys to all four locale files.
3. Import it in `app/[locale]/page.tsx`, place it in scroll order, and
   add a `<SectionDivider labelKey="divNew" />` above it.

### Add a new case
1. Append to `CASES` in `data/cases.ts` with id + i18n key bindings.
2. Add the four content keys (`caseNTitle / caseNTag / caseNSummary /
   caseNMetrics`) in all four locale files.
3. Sitemap and the per-case route pick it up automatically — `[slug]`
   uses `generateStaticParams` over `CASES`.

### Add a new service
1. Append to `SERVICES` in `data/services.ts` with key + slug + i18n
   bindings.
2. Add `svcNTitle / svcNTag / svcNNote / svcNInc / svcNAdd` keys in
   all four locale files.
3. Sitemap, the per-service route, and the landing card grid pick it
   up automatically.

### Add a new language (e.g. French)
1. Add `"fr"` to `Locale` and `LOCALES` in `i18n/config.ts`. Add a
   label in `LOCALE_LABELS` and the ISO 639-1 code in `LOCALE_LANG`
   (slug and code should match; the map exists in case they diverge).
2. Copy `locales/en.ts` to `locales/fr.ts` and translate.
3. Register it in `i18n/dictionary.ts`.
4. Add metadata getters in `lib/localizedMeta.ts`.
5. Add the locale to the cookie-regex in `app/api/lead/route.ts` and
   `app/api/chat/route.ts`, and a `LOCALE_INSTRUCTION` entry in
   `lib/systemPrompt.ts` so Vanessa answers in it.
6. Sitemap + middleware + layout pick it up automatically because they
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
Every module is mobile-first now (the only remaining `max-width` query
is the intentional `(max-width: 900px) and (prefers-reduced-motion)`
a11y override in Principles). In converted files, blocks commented
"formerly @media (max-width: N)" hold the mobile values and the
`@media (min-width: N+1)` blocks at the bottom restore desktop — when
touching one, prefer folding your change into that structure rather
than adding a new `max-width` block.

---

## Gotchas

- **Chat history persists** to `localStorage` under `st-chat-history-v1`,
  last 50 messages. Clear that key to wipe Vanessa's session memory.
- **GrowthSimulator** saves slider levels in `st-simulator-levels-v1`.
- **Chat nudge** (proactive teaser bubble) shows once per browser session
  after ~18s on the page while the chat is closed; the spent flag lives in
  `sessionStorage` under `st-chat-nudge-v1`.
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
- **Next-image + vanessa.jpg**: rendered with explicit width/height
  because the source is a JPEG. Replace carefully.
- **Middleware** runs on every page route (locale routing) and `/api/*`.
  Static assets and the file-based prerender outputs are excluded by
  the `matcher`.
- **`overrides` in `package.json`** pin `glob ≥ 10.5.0` and
  `postcss ≥ 8.5.10` to patch transitive CVEs. Keep them unless the
  upstream versions ship newer fixes — `npm audit` flags regressions.
- **Service worker** caches same-origin GETs stale-while-revalidate.
  Local dev is intentionally skipped (skipped on `localhost`) so
  hot-reload isn't cached into oblivion.
