# Design — HyperFrames Promo: "HTML is the new video format"

Cinematic dark tech promo for the HyperFrames product itself. Sixty seconds.
Premium / cinematic / developer-credible. The frame should feel like the
opening title card of a feature film, not a SaaS dashboard.

## Palette

Dark canvas with one warm focal accent and one cold structural accent.
Eye lands on the ember-orange first, the cyan reads as "data".

| Token         | Hex       | Role                                                         |
| ------------- | --------- | ------------------------------------------------------------ |
| `--bg-deep`   | `#070710` | Composition background. Near-black with a hint of indigo.    |
| `--bg-panel`  | `#0F1018` | Surface for stacked panels / code blocks.                    |
| `--bg-rim`    | `#1A1B26` | Hairline divider / panel border / inset.                     |
| `--fg-bright` | `#F2EDE4` | Hero copy. Warm cream, never #FFFFFF.                        |
| `--fg-mid`    | `#A8A29E` | Body copy, labels.                                           |
| `--fg-dim`    | `#5C5A56` | Captions, footnotes, metadata.                               |
| `--ember`     | `#FF6A1A` | Primary accent. Brand ember. Used on ONE focal point/scene.  |
| `--ember-hot` | `#FFB347` | Ember highlight / hover state.                               |
| `--cyan`      | `#7EC4CF` | Cold secondary accent. Used on data / structural rules only. |
| `--green-ok`  | `#9FC089` | Sparingly — terminal success states only.                    |

WCAG: `--fg-bright` on `--bg-deep` = 14.5:1. `--ember` on `--bg-deep` = 5.1:1
(passes AA for normal text). `--cyan` on `--bg-deep` = 7.6:1.

## Typography

Cross-boundary: one condensed display sans + one monospace. Both ship with
the HyperFrames compiler.

- **Display** — `Bebas Neue` (weight 400). Hero headlines only. The
  expressive voice. Condensed, cinematic, ~110–180px in this composition.
- **Mono** — `JetBrains Mono` (weights 400 / 500 / 700). Everything that
  isn't a hero headline: body copy, code, data labels, counters, captions,
  metadata, CTA. The workhorse voice.

Rationale: the content is about HTML — a structured, monospaced source
format — becoming video. The mono font carries that "view source" register
through every scene. Bebas Neue cuts in only when a single phrase needs to
own the frame.

### Weight & size

| Slot               | Font           | Weight  | Size       | Tracking  |
| ------------------ | -------------- | ------- | ---------- | --------- |
| Hero display       | Bebas Neue     | 400     | 140–180px  | -0.02em   |
| Hero secondary     | JetBrains Mono | 500     | 56–72px    | -0.02em   |
| Body / narration   | JetBrains Mono | 400     | 32–40px    | -0.01em   |
| Data values        | JetBrains Mono | 700     | 96–140px   | -0.03em   |
| Data labels        | JetBrains Mono | 500     | 20–24px    | +0.08em   |
| Code spans         | JetBrains Mono | 500     | 32–44px    | 0         |
| Captions (subs)    | JetBrains Mono | 500–700 | 48–62px    | -0.01em   |
| Metadata / corners | JetBrains Mono | 500     | 16–20px    | +0.12em uc|

Data labels and metadata are uppercase + tracked. Body and headlines stay
in normal case.

### Dark-background compensation

- Body weight is 400 (light-on-dark reads ~50 weight heavier).
- Line-height +0.05 over web defaults (1.35 for body, 1.05 for display).
- `font-variant-numeric: tabular-nums` on every numeric column / counter.

## Corners & rules

- **Square corners** for video panels (code blocks, data cards). `border-radius: 0`
  reads as "system / serious / unbranded-in-a-good-way". No 12px Stripe-style
  pill corners — those scream SaaS marketing.
- **Soft corners** (`border-radius: 4px`) only on subtle pill labels.
- **Hairlines** are 1px `--bg-rim` at 100% opacity, or 2px `--cyan` at 30%
  opacity for structural emphasis.
- Registration marks `+` in corners — 16px JetBrains Mono `--fg-dim`, sits at
  60px inset from each frame edge.

## Depth & shadows

Flat-but-glowing. No web-style `box-shadow: 0 2px 4px rgba(0,0,0,0.06)` —
invisible at 30fps after H.264 compression.

- **Ember glow** for the focal accent: `filter: drop-shadow(0 0 24px rgba(255,106,26,0.55))`
- **Cold glow** for data lines: `box-shadow: 0 0 24px rgba(126,196,207,0.25)`
- **Background atmospherics** — one radial gradient at 12% opacity from
  `--ember` in the lower-left, one cooler radial at 8% from `--cyan` in the
  upper-right. Both breathe (1.0 → 1.04 scale over 8s, sine).
- Grain overlay at 4% opacity on top of everything — film-stock feel.

## Motion vocabulary

- **Eases** — `power3.out` for hero entrances, `expo.out` for snap reveals,
  `sine.inOut` for ambient drift, `back.out(1.4)` for counters landing.
- **Durations** — 0.4–0.7s for entrances, 0.3s for accents, 2.5s+ for
  counters / data fills.
- **Stagger** — 0.08–0.14s for word entrances, 0.05s for code character
  reveals.
- **Direction** — vary per scene. Don't use `y: 30, opacity: 0` everywhere.
  Use slide-from-left, scale-from-0.92, blur-fade, clip-path wipe.
- **Ambient** — every decorative element drifts/breathes/pulses at 4–8s
  cycles. Never static.

## Transitions

CSS-only (no shaders here — keeps the contract simple and aligns with the
"HTML in, video out" thesis). Primary: **blur crossfade** at 0.5s with 18px
peak blur. Used 3 of 4 scene changes. Accent: **velocity-matched zoom**
into Scene 3 (the 3D moment) — the camera flies into the cube.

## Captions

Auto-generated from `transcript.json`. Tone is launch/cinematic — heavy
weight, brand accent, small group size.

- Position: 120px from bottom, full-width container, centered text.
- Group size: 2–3 words. High-energy delivery.
- Per-word emphasis: brand names (`HyperFrames`, `HTML`) get `--ember` and
  a 1.08x scale boost. Stats get `700` weight and `--ember-hot`.
- Entry: `scale: 0.94 → 1, opacity: 0 → 1, duration: 0.18, back.out(1.4)`.
- Exit: hard `tl.set({opacity:0, visibility:"hidden"})` at `group.end`.

## What NOT to do

- No gradient text. No `background-clip: text` + linear-gradient. Use solid
  `--ember` on focal words; if you need richness, use `text-shadow` instead.
- No left-edge accent stripes on cards. The whole frame is the canvas.
- No purple-to-blue or cyan-to-pink gradients. The palette is ember-warm
  vs cyan-cold and nothing else.
- No pie charts, no chart libraries, no dashboards. Stats fill the frame.
- No `#000` or `#fff` literal. Use `--bg-deep` and `--fg-bright`.
- No banned fonts (Inter / Roboto / Outfit / Sora / Playfair / Cinzel / Syne).
- No center-floating, equal-weight layouts. Anchor to corners; create paths
  for the eye.
- No `border-radius: 12px`. Square corners.
- No exit animations except in the final scene — every transition handles
  scene handoff.
