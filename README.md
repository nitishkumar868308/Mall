# American Dream — Interactive Sales Deck

A luxury, video-first, non-linear sales deck for **American Dream** (East Rutherford, NJ). Built as a self-contained browser experience that replaces fragmented PDF + YouTube + spreadsheet pitches with a single interactive tool — designed to work both screen-shared on a live sales call AND as a standalone link a prospect can explore alone.

> **Live demo:** _add URL once deployed_

## What this is

A purpose-built interactive sales tool — not a website, not a slide deck. Eight non-linear chapters with cinematic motion, scroll-triggered video, kinetic typography, light + dark themes, and a working Phase 2 sub-module (`/events`) that proves the architecture is expansion-ready.

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

- **Light + Dark themes** via a token-swap on `<html>` — every color, contrast, grain blend mode, and gradient remaps automatically. Persisted to `localStorage`; pre-hydration boot script eliminates the light-to-dark flash on first paint.
- **Non-linear chapter navigation** — persistent right-side rail on desktop with the active chapter highlighted via `IntersectionObserver`; a floating chapter menu on mobile; keyboard shortcuts (↑/↓ and 1–8) work everywhere.
- **Cinematic motion language** — `Reveal` (scroll-triggered fade-up), `KineticType` (word-by-word reveal), `Counter` (number ticker that animates on intersection), `LazyVideo` (poster-first, intersection-mounted), `Spotlight` (gilt cursor glow on desktop, gracefully skipped on touch + reduced motion).
- **Premium texture** — full-screen SVG noise grain overlay with theme-aware blend mode (overlay in dark, multiply in light).
- **Live capacity calculator** in `/events` — slide attendee count 50 → 25,000 and venue cards filter live, sorted by midpoint-closeness via a pure, unit-tested function.
- **Reduced motion respected** — Lenis disables, every Framer Motion reveal collapses to opacity-only, the marquee freezes.
- **Custom monogram logo** — SVG diamond mark + AMERICAN DREAM wordmark; currentColor + theme-aware.

## Project structure

```
app/
  layout.tsx              # Root layout, fonts, nav shell, theme boot script, grain
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
                          # InquireDialog, Logo, ThemeToggle,
                          # ProgressBar, KeyboardNav, SkipLink
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
  images.ts               # Curated Unsplash photo URLs themed per chapter
  types.ts
  utils.ts                # cn helper

docs/superpowers/         # Design spec + implementation plan
```

## Design decisions

- **Token-driven theming.** All colors, fonts, easings, and radii are CSS variables exposed via `@theme` in `app/globals.css`. The `.light` class on `<html>` swaps the variable values; every component automatically re-skins because it consumes semantic names (`bg-ink`, `text-ivory`, `text-gilt`, `border-ivory/10`). No component-level theme conditionals anywhere.
- **Video-first with graceful fallback.** Each `LazyVideo` references both a poster URL (real Unsplash image) and a local `/videos/*.mp4`. The poster paints immediately; the video lazy-mounts on `IntersectionObserver` when ready. If the video 404s or is missing, the poster stays — so the deck is **always** beautiful, even before official footage is dropped in.
- **Performance-first.** Below-the-fold media only loads when within 200 px of the viewport. Fonts (Fraunces, Inter) self-hosted by `next/font`, subsetted, `font-display: swap`. Images served by `next/image` (responsive AVIF/WebP via Next.js' optimizer for Unsplash URLs).
- **Modular routes.** Phase 2 sub-modules live as siblings under `app/`. Adding a new sub-deck is one new folder; the layout + nav shell automatically wraps it. `lib/config/chapters.ts` is the single source of truth for chapter ordering — change order there and nav, keyboard shortcuts, and observer all follow.
- **Tested where it matters.** UI motion is verified by eye; the one piece of real logic (venue capacity matching) has full unit coverage in Vitest.

## The 8 chapters

1. **Hero** — full-bleed poster with layered overlays; kinetic headline; 3-stat ticker.
2. **Why Here** — animated NY-metro map with driving-radius population callouts; demographic bento.
3. **Retail** — dual-row tenant marquee; category breakdown; tenant-growth bar chart with SVG.
4. **The Avenue (Luxury)** — slowed cinematic treatment; pull-quote; luxury-house roster.
5. **Dining & Lifestyle** — bento grid of food halls + restaurants, each with photography.
6. **Attractions** — 4 hero tiles (DreamWorks · Nickelodeon · Big SNOW · Sea Life) with hover-video preview and full-screen lightbox.
7. **Events & Platform** — venue stats, past activation roster with imagery, 3 segmented CTAs.
8. **Close** — cinematic CTA, three primary actions (Lease · Sponsor · Book a Venue), contact footer.

## Phase 2 working module — `/events`

- Hero with kinetic headline + photography.
- **Live capacity calculator** — slider from 50 → 25,000 attendees. As you drag, venue cards filter in real time, sorted by the closeness of each venue's midpoint to the headcount. Animated with Framer Motion's layout transitions.
- Inquiry form opens directly from the calculator CTA.

`/sponsorship` and `/leasing` are scaffolded with a shared `ComingSoonPage` — same nav shell, design system, kinetic typography. Demonstrates the architecture extends without rewrites.

## Adding real video assets

The deck currently uses curated Unsplash photography as the visual layer. To layer real motion in:

1. Drop encoded clips into `public/videos/` matching these file names referenced by the components:
   - `hero.mp4`, `luxury.mp4`, `close.mp4`, `events-hero.mp4`
   - `dreamworks.mp4`, `nickelodeon.mp4`, `big-snow.mp4`, `sea-life.mp4`
2. The `LazyVideo` components will automatically detect them and play on top of the existing posters.

Recommended encoding per clip (target ≤ 1.5 MB hero / ≤ 800 KB tile):

```bash
ffmpeg -i source.mp4 \
  -t 12 -vf "scale='min(1920,iw)':-2,fps=30" \
  -c:v libx264 -crf 24 -preset slow -profile:v high -pix_fmt yuv420p \
  -an -movflags +faststart public/videos/hero.mp4
```

Source from the official American Dream press kit, vendor channels (DreamWorks, Nickelodeon, etc.), and AI-generated B-roll for gaps.

## AI tools used

- **Claude (Opus 4.7)** — end-to-end code authoring, motion design, copy iteration, architectural decisions. Built via a structured workflow: design spec (`docs/superpowers/specs/`) → phased implementation plan (`docs/superpowers/plans/`) → execution → polish.
- **Unsplash** — curated photography (themed per chapter) loaded through Next.js' image optimizer.
- **Midjourney / Flux** (recommended for production) — AI imagery to fill gaps where official assets are limited (luxury wing at golden hour, brand activation hero shots).
- **ffmpeg / Squoosh CLI** (recommended for production) — dual-encoding videos (H.264 / AV1), generating posters, converting stills to AVIF.

## Accessibility

- All interactive elements keyboard-focusable, with a visible gilt `:focus-visible` ring.
- Skip-to-content link appears on first Tab.
- Dialog has trapped focus + ESC + a labeled close button.
- Decorative videos and overlays are `aria-hidden`; chapter rail dots are labeled by chapter + roman numeral.
- `prefers-reduced-motion` disables smooth scroll, Lenis, motion reveals, and the gilt cursor spotlight.
- Color contrast: ivory ↔ ink ≥ 14:1 in both modes; gilt is darkened in light mode for AA contrast on cream.

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

## Project docs

- `docs/superpowers/specs/2026-05-18-american-dream-sales-deck-design.md` — full design spec.
- `docs/superpowers/plans/2026-05-18-american-dream-sales-deck.md` — phased implementation plan.

## What I'd do with more time

- Real CMS (Sanity / Payload) so the sales team can edit copy without a deploy.
- Real form backend (Resend / Postmark) instead of the console stub.
- Build out `/sponsorship` and `/leasing` to match `/events` in depth.
- Per-chapter analytics events to surface funnel drop-off.
- Producer-facing **presenter mode** (hotkey-driven beats, side notes, laser pointer) for live sales calls.
- Real footage from the American Dream press kit, plus AI-generated B-roll for any gaps.
