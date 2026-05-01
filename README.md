# Seventy Times

Marketing site for **Seventy Times** — a US-based AI + performance-marketing
agency. Single-page landing with deep-link case studies, per-service detail
pages, a streaming Claude-powered chat assistant ("Tess"), a multi-step
lead form, and full trilingual coverage (English / Russian / German).

> **For developers / AI agents working on this repo:** the orientation
> document is **[`CLAUDE.md`](./CLAUDE.md)** — start there. This README
> is the short product-and-ops view; CLAUDE.md is the architecture map.

---

## Live

- Production: <https://seventy-times.com>
- Default landing language is **English**. `/ru` and `/de` are opt-in
  via the language switcher in the top nav.

## Tech stack

| | |
|---|---|
| Framework | Next.js 14 (App Router, statically generated) |
| Language | TypeScript (strict mode) |
| Styling | CSS Modules + design tokens in `globals.css` |
| Animation | Framer Motion + Lenis |
| AI chat | `@anthropic-ai/sdk` — server-side, streaming |
| CRM fan-out | Telegram Bot API + Notion REST API |
| Hosting | Vercel |

## Features

- **Locale-prefixed URLs** (`/en`, `/ru`, `/de`) — every locale × page
  is statically pre-rendered, fully indexable.
- **Per-case study pages** at `/<locale>/cases/<slug>` with
  breadcrumbs, related-projects rail, and BreadcrumbList JSON-LD.
- **Per-service pages** at `/<locale>/services/<slug>` with full
  "Included / Optional add-ons" breakdown.
- **Streaming Tess chat** — Claude Sonnet 4.6 reply, token-by-token,
  via NDJSON over `fetch`'s `ReadableStream`. Quick-prompt chips on
  fresh chats.
- **Multi-step lead form** — three small screens (who you are → what
  you do → what you need) with progress bar and a "show all fields at
  once" escape hatch. Drafts auto-save to `localStorage` so a closed
  tab doesn't lose work.
- **Review form** with one-off client codes, mirror-image draft
  persistence.
- **Lead + review fan-out** — Telegram + Notion in parallel
  (`Promise.allSettled`); either failing doesn't block the user.
- **Honest comparison table** — Seventy Times vs classic agency vs
  solo freelancer.
- **Trust marquee** — two opposite-direction scrolling rows with our
  real tools, languages, and platforms (no fake partner badges).
- **PWA-lite** — web app manifest + a stale-while-revalidate service
  worker for fast repeat visits and offline fallback.
- **Lightweight error tracking** — global `window.error` /
  `unhandledrejection` listeners ship to `/api/error`, which logs
  into Vercel runtime logs. No third-party SDK.
- **Mobile sticky CTA** + **desktop exit-intent prompt** for
  conversion.
- **Cookie consent banner** gating any future analytics.

## Project structure (short)

```
src/
├── app/             Next.js routes, layouts, API endpoints, sitemap, etc.
│   └── [locale]/    All public pages (home, about, cases, services, legal)
├── components/
│   ├── chrome/      Always-visible Nav + Footer
│   ├── overlays/    Pop-ups, modals, banners (chat, forms, cookies, …)
│   ├── system/      Headless utilities (SW register, error reporter)
│   ├── sections/    Landing sections (Hero, Services, Comparison, FAQ, …)
│   ├── decor/       Background visuals + dividers
│   ├── ui/          Reusable primitives (Reveal, Magnetic, Counter, …)
│   ├── legal/       Shared shell for /privacy + /terms
│   └── seo/         JSON-LD output
├── data/            siteConfig, cases, services
├── i18n/            Locale config + dictionary + per-locale strings
├── lib/             Server / pure helpers (apiGuard, notion, drafts, …)
└── middleware.ts    Locale routing + scanner blocks
```

Full annotated tree, key concepts, and the SEO playbook are in
[`CLAUDE.md`](./CLAUDE.md).

## Local development

Requires Node ≥ 20 and npm 10+.

```bash
npm install
cp .env.example .env.local      # then fill in at minimum ANTHROPIC_API_KEY
npm run dev                      # http://localhost:3000
```

The middleware redirects bare `/` to `/en` — if you want to test a
specific locale, navigate to `http://localhost:3000/ru` or `/de`
directly.

### Useful scripts

| Command | Does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build (validates types + creates SSG output) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Next.js ESLint preset |

### Environment variables

All optional except `ANTHROPIC_API_KEY`. Full list with setup
instructions in [`.env.example`](./.env.example):

| Variable | Required? | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | yes | Powers the Tess chat |
| `ANTHROPIC_MODEL` | no | Override Claude model id |
| `ALLOWED_ORIGINS` | recommended | Lock /api/* to known hosts |
| `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` | optional | Forward submissions to Telegram |
| `CLIENT_CODES` | optional | Comma-separated codes that unlock the review form |
| `NOTION_TOKEN` + `NOTION_DATABASE_LEADS_ID` + `NOTION_DATABASE_REVIEWS_ID` | optional | Forward submissions into Notion CRM |

Without Telegram / Notion env vars submissions still succeed for the
user — they're just logged to Vercel runtime logs and not forwarded.

## Deployment

Push to `main`. Vercel rebuilds and rolls out automatically. Every PR
gets a preview deployment with its own URL (the bot posts a comment).

The build is fully static for content pages: every locale × page,
every case, every service is generated at build time. The four API
routes and the OG-image route are server-rendered on demand.

## SEO

Mostly automatic — locale-prefixed URLs + sitemap entries with
`hreflang` alternates + JSON-LD on every meaningful page surface
(Organization, FAQPage, Service, BreadcrumbList).

When adding new content (case, service, language, FAQ entry), follow
the "Common tasks" recipes in [`CLAUDE.md`](./CLAUDE.md) — they cover
everything that needs to be touched in lock-step (data file + locale
strings + JSON-LD if applicable).

## Legal

- `/<locale>/privacy` — privacy policy
- `/<locale>/terms` — terms of use
- `/<locale>/about` — about the agency

All three are working drafts for the early stage of the business and
are explicitly flagged as such; they'll be revised with legal counsel
once the company is formally registered.

## License

Proprietary. All rights reserved by Seventy Times.
