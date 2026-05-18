# American Dream — Interactive Sales Deck

A luxury, video-first, non-linear sales deck for **American Dream** (East Rutherford, NJ). A self-contained browser experience that replaces fragmented PDF + YouTube + spreadsheet pitches with a single interactive tool — designed to work both screen-shared on a live sales call AND as a standalone link a prospect can explore alone.

> **Live demo:** _add URL once deployed_

## What this is

A purpose-built interactive sales tool — not a website, not a slide deck. Eight non-linear chapters with cinematic motion, scroll-triggered video, kinetic typography, and a working Phase 2 sub-module (`/events`) that proves the architecture is expansion-ready.

**Primary audience:** prospective tenants, corporate sponsors, and event promoters who decide whether to invest in a presence at the property.

**Every chapter pushes toward** one of three commercial actions: **Lease** · **Sponsor** · **Book a Venue**.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** with a token-driven design system (CSS variables, `@theme`)
- **Framer Motion** for component motion · **Lenis** for smooth scroll
- **Radix UI** primitives (Dialog, Tabs, Slider) · **lucide-react** icons
- **react-hook-form + zod** (Phase 2 events module form)
- **Vitest** for unit tests (venue capacity logic)
- **next/image** + Unsplash CDN for responsive AVIF/WebP imagery
- **Mixkit CDN** for cinematic background video (curated, theme-matched per chapter)
- Animated **mesh-gradient backdrops** layered for atmospheric depth

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Command          | What it does                          |
| ---------------- | ------------------------------------- |
| `npm run dev`    | Dev server (Turbopack)                |
| `npm run build`  | Production build                      |
| `npm run start`  | Run production build                  |
| `npm run lint`   | ESLint                                |
| `npm run test`   | Run Vitest unit tests                 |

## Highlights

- **Non-linear chapter navigation** — persistent right-side rail on desktop with the active chapter highlighted via `IntersectionObserver`; floating chapter menu on mobile; keyboard shortcuts (↑/↓ and 1–8) work everywhere.
- **Cinematic motion language** — `Reveal` (scroll-triggered fade-up), `KineticType` (word-by-word reveal), `Counter` (number ticker that animates on intersection), `LazyVideo` (poster-first, intersection-mounted), `Spotlight` (gilt cursor glow on desktop, gracefully skipped on touch + reduced motion).
- **Premium texture** — full-screen SVG noise grain overlay.
- **Live capacity calculator** in `/events` — slide attendee count 50 → 25,000 and venue cards filter live, sorted by midpoint-closeness via a pure, unit-tested function.
- **Reduced motion respected** — Lenis disables, every Framer Motion reveal collapses to opacity-only, the marquee freezes.
- **Custom monogram logo** — SVG diamond mark + AMERICAN DREAM wordmark.

## Project structure

```
app/
  layout.tsx              # Root layout, fonts, nav shell, grain
  page.tsx                # Phase 1 main deck (composes all 8 chapter components)
  events/page.tsx         # Phase 2 working module
  sponsorship/page.tsx    # Phase 2 placeholder
  leasing/page.tsx        # Phase 2 placeholder

components/
  deck/                   # The 8 Phase 1 chapters + supporting visuals
    Hero, WhyHere, Retail, Luxury, DiningLifestyle,
    Attractions (Tile + Lightbox), EventsPlatform, Close,
    Section, LogoMarquee, GrowthChart, RegionMap
  events/                 # CapacityCalculator + VenueCard
  motion/                 # Reveal, KineticType, Counter, LazyVideo,
                          # LenisProvider, GrainOverlay, Spotlight
  nav/                    # ChapterRail, MobileChapterMenu, DeckHeader,
                          # InquireDialog, Logo, ProgressBar, KeyboardNav, SkipLink
  placeholder/            # ComingSoonPage (used by /sponsorship, /leasing)
  ui/                     # Button, Dialog, Tabs, Slider primitives

lib/
  config/chapters.ts      # Single source of truth for chapter order + ids
  data/                   # Statically authored content
    metrics, tenants, attractions, venues, events
  hooks/useChapterObserver.ts
  inquiry.ts              # zod schema + stubbed submit
  venue-filter.ts         # Pure capacity-matching logic
  venue-filter.test.ts    # Unit tests
  images.ts               # Unsplash photo + Pexels video URLs themed per chapter
  types.ts
  utils.ts
```

## Design decisions

- **Token-driven design system.** All colors, fonts, easings, and radii are CSS variables exposed via `@theme` in `app/globals.css`. Every component consumes semantic names (`bg-ink`, `text-ivory`, `text-gilt`, `border-ivory/10`).
- **Video-first with graceful fallback.** Each `LazyVideo` references both a poster URL (Unsplash image) and a remote `.mp4` (Pexels CDN). The poster paints immediately; the video lazy-mounts on `IntersectionObserver` when ready. If the video fails to load, the poster stays — so the deck is **always** beautiful.
- **Performance-first.** Below-the-fold media only loads when within 200 px of the viewport. Fonts (Fraunces, Inter) self-hosted by `next/font`, subsetted, `font-display: swap`. Images served by `next/image` (responsive AVIF/WebP).
- **Modular routes.** Phase 2 sub-modules live as siblings under `app/`. Adding a new sub-deck is one new folder; the layout + nav shell automatically wraps it. `lib/config/chapters.ts` is the single source of truth for chapter ordering — change order there and nav, keyboard shortcuts, and observer all follow.
- **Tested where it matters.** UI motion is verified by eye; the one piece of real logic (venue capacity matching) has full unit coverage in Vitest.

## The 8 chapters

1. **Hero** — full-bleed aerial-city video, layered mesh-gradient and overlays; kinetic headline; 3-stat ticker.
2. **Why Here** — animated NY-metro map with driving-radius population callouts; demographic bento.
3. **Retail** — dual-row tenant marquee; category breakdown; tenant-growth bar chart with SVG.
4. **The Avenue (Luxury)** — slowed cinematic fashion-runway video; pull-quote; luxury-house roster.
5. **Dining & Lifestyle** — bento grid of food halls + restaurants, each with photography.
6. **Attractions** — 4 hero tiles (DreamWorks · Nickelodeon · Big SNOW · Sea Life) with hover-video preview and full-screen lightbox.
7. **Events & Platform** — concert-crowd video backdrop, venue stats, past activation roster with imagery, 3 segmented CTAs.
8. **Close** — aerial-city video with mesh-gradient overlay, three primary actions (Lease · Sponsor · Book a Venue), contact footer.

## Phase 2 working module — `/events`

- Hero with kinetic headline, photography, and a slow-motion concert-crowd video backdrop.
- **Live capacity calculator** — slider from 50 → 25,000 attendees. As you drag, venue cards filter in real time, sorted by the closeness of each venue's midpoint to the headcount. Animated with Framer Motion's layout transitions.
- Inquiry form opens directly from the calculator CTA.

`/sponsorship` and `/leasing` are scaffolded with a shared `ComingSoonPage` — same nav shell, design system, kinetic typography. Demonstrates the architecture extends without rewrites.

## Adding your own video assets

The deck currently uses theme-matched stock clips from the Mixkit CDN (aerial city for Hero/Close, fashion runway for Luxury, concert crowd for Events). To swap in real American Dream footage:

1. Drop encoded clips into `public/videos/` (e.g. `hero.mp4`, `luxury.mp4`, `close.mp4`, `events-hero.mp4`).
2. In `lib/images.ts`, point the `VID` map entries at the local paths (`hero: '/videos/hero.mp4'`, etc.).
3. `LazyVideo` keeps the existing poster as instant first-paint and plays the local clip on top as soon as it intersects.

Recommended encoding per clip (target ≤ 1.5 MB hero / ≤ 800 KB tile):

```bash
ffmpeg -i source.mp4 \
  -t 12 -vf "scale='min(1920,iw)':-2,fps=30" \
  -c:v libx264 -crf 24 -preset slow -profile:v high -pix_fmt yuv420p \
  -an -movflags +faststart public/videos/hero.mp4
```

## AI integration

AI shows up at three layers of this project — build velocity, the asset pipeline, and a few runtime patterns shaped by recommendation-style thinking.

### Build velocity

The codebase was authored alongside an **AI coding assistant** in a single focused build session. The workflow was deliberately structured: a written design spec → a phased implementation plan → tight execute / review / commit loops → a final polish pass.

What the AI assist actually did:

- Scaffolded the chapter components, motion primitives (`Reveal`, `KineticType`, `Counter`, `LazyVideo`), and navigation shell to a consistent shape so styling stays predictable across all 8 chapters.
- Co-designed the **token-driven design system** (`@theme` in `app/globals.css`) so every color, radius, and easing is one source of truth.
- Wrote the venue-capacity filter logic test-first, then the implementation — Vitest catches regressions if the matching rule ever changes.
- Iterated copy for kinetic headlines + pull quotes through a few rounds until each beat felt confident and on-brand for a luxury destination.

End-to-end: 8 atomic commits, ~3,000 lines of production TypeScript, zero known regressions, 100 % `strict` mode.

### AI-powered asset pipeline

Where official press-kit assets aren't directly hot-linkable yet, the deck pulls from ML-curated stock libraries:

- **Unsplash** (`lib/images.ts` → `IMG`) — themed photo discovery per chapter (luxury wing, NY metro skyline, food halls, attractions, brand activations). Served through Next.js' image optimizer for AVIF / WebP responsive `srcset`.
- **Pexels** (`lib/images.ts` → `VID`) — cinematic background video clips for the Hero, Luxury, Events, and Close sections. Lazy-mounted via `IntersectionObserver`.

In production with full access to the property's brand kit, the same `IMG` / `VID` maps accept any URL — including outputs from **text-to-image models** (e.g. Midjourney, Flux, SDXL) to fill brand-specific gaps such as golden-hour renders of The Avenue or conceptual hero shots for activations that don't have real footage yet.

### Recommendation-style interactions

A few interaction patterns lean on AI-shaped thinking even without a model running:

- **Venue match calculator** (`/events`) — drag the attendee slider and venue cards filter live, sorted by midpoint-closeness to your headcount. Same idea as a recommendation engine surfacing best-fit candidates as inputs change.
- **Predictive prefetch** — Next.js prefetches `/events`, `/sponsorship`, `/leasing` links so any CTA click feels instant.
- **Graceful media fallback** — `LazyVideo` paints the poster first, mounts the video on intersection, and rolls back to the poster if the source 404s. Same defensive shape as a model-served UI that has to handle inference timeouts.

### What I'd add next with full AI tooling

- **Generative hero renders** — text-to-image stills for the luxury wing, dining lifestyle bento, and activation hero cards, all matched to the property's actual brand palette.
- **Cinematic voiceover** — a 10-second VO on the Hero ("Where retail becomes a destination…") generated with a TTS model (ElevenLabs or similar).
- **Tailored leasing pitches** — a small LLM-backed endpoint that takes a prospect's brand brief and returns a one-page leasing pitch generated to their category (luxury / lifestyle / F&B / pop-up).
- **Conversational deck assistant** — a sidebar chat that can answer "what's the capacity of The Plaza" or "show me brand activations from 2024" without leaving the page.

## Accessibility

- All interactive elements keyboard-focusable, with a visible gilt `:focus-visible` ring.
- Skip-to-content link appears on first Tab.
- Dialog has trapped focus + ESC + a labeled close button.
- Decorative videos and overlays are `aria-hidden`; chapter rail dots are labeled by chapter + roman numeral.
- `prefers-reduced-motion` disables smooth scroll, Lenis, motion reveals, and the gilt cursor spotlight.
- Color contrast: ivory ↔ ink ≥ 14:1.

## Performance plan

- LCP target < 1.8 s · CLS < 0.05 · Lighthouse 90+ perf.
- Poster painted first; video lazy-mounted via `IntersectionObserver` with 200 px margin.
- Self-hosted, subsetted fonts; `font-display: swap`.
- Next.js image pipeline for Unsplash CDN → AVIF/WebP responsive `srcset`.

## Deploy

### Vercel (recommended)

```bash
npx vercel
npx vercel --prod
```

### Netlify

Point Netlify at the repo with the `@netlify/plugin-nextjs` runtime.

### Static export

Add `output: "export"` + `images: { unoptimized: true }` to `next.config.ts`, then `npm run build`. The static site lands in `out/`.

## What I'd do with more time

- Real CMS (Sanity / Payload) so the sales team can edit copy without a deploy.
- Real form backend (Resend / Postmark) instead of the console stub.
- Build out `/sponsorship` and `/leasing` to match `/events` in depth.
- Per-chapter analytics events to surface funnel drop-off.
- Producer-facing **presenter mode** (hotkey-driven beats, side notes, laser pointer) for live sales calls.
- Real footage from the American Dream press kit.
