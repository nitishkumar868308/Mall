# American Dream — Interactive Sales Deck

**Date:** 2026-05-18
**Status:** Approved design
**Owner:** Kumar
**Purpose:** Replace the fragmented "YouTube + PDF + spreadsheet" sales pitch with a single browser-based, video-first, cinematic interactive deck that drives leasing, sponsorship, and venue-booking inquiries for American Dream (East Rutherford, NJ).

---

## 1. Goals

1. **Emotional buy-in in 10 seconds.** Open with cinematic full-bleed video and kinetic typography that immediately conveys scale and ambition.
2. **Self-guided story.** Non-linear navigation; the viewer controls pacing. Works for a screen-shared sales call AND for a prospect exploring alone.
3. **Drive 3 commercial actions.** Every chapter terminates in (or supports) one of: Lease · Sponsor · Book a Venue.
4. **Showcase architecture for expansion.** Phase 2 sub-modules must be additive — no rewrite.
5. **Hit Lighthouse 95+ performance, 100 accessibility.** Premium feel must not cost performance.

## 2. Non-goals

- Not a static website. Not a slide deck export.
- No CMS. Content is statically authored in TypeScript data files.
- No backend services in Phase 1 (forms post to a console-logged stub / mailto in dev; Phase 2 wires real submission).
- Mobile is **bonus**, not required — primary targets desktop (1440+) and tablet (1024).

## 3. Subject: American Dream (NJ)

- 3M sq ft mixed-use destination, East Rutherford NJ, ~12 min from Midtown Manhattan.
- Components: DreamWorks Water Park, Nickelodeon Universe theme park, Big SNOW (only indoor real-snow ski slope in N. America), Sea Life Aquarium, The Avenue (luxury wing — Hermès, Saks, Tiffany, etc.), CMX Dine-In Cinemas, Tilt Arcade, mini golf, NHL-size rink, food halls, event venues.
- Audience proxy for deck: prospective tenants, corporate sponsors, event promoters / production companies.

## 4. Brand & Visual Direction

- **Tone:** Modern. Confident. High-energy. Cinematic. Never cute.
- **Reference blend:** Apple's restraint × Hermès's polish × SoFi Stadium / Sphere's scale × DigiDeck's interaction pattern.
- **Type system:**
  - Display: editorial serif — `PP Editorial New` or fallback `Fraunces` (Google Fonts). Large, tracked tight.
  - UI/body: `Inter` (variable, self-hosted, subset).
- **Color tokens:**
  - `--ink: #0A0A0B` (background base)
  - `--ivory: #F6F1E7` (foreground)
  - `--gilt: #C9A24A` (accent / CTA)
  - `--muted: #8B8B90`
  - `--surface: #14141A` (cards)
- **Motion language:** Slow, intentional easing curves (`cubic-bezier(0.22, 1, 0.36, 1)` standard). Generous negative space. No bounce, no spring. Reveals are scroll-triggered fades + 24px Y-translates.

## 5. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript | App Router maps cleanly to Phase 2 sub-routes; Server Components keep JS shipped low; first-class image/font/video optimization |
| Styling | Tailwind CSS v4 + CSS variables for tokens | Fast, zero-runtime, token-driven |
| Components | shadcn/ui (Dialog, Tabs, Sheet, Button, Slider) | Accessible primitives, copy-in source so we own it |
| Motion | Framer Motion (UI) + GSAP ScrollTrigger (scroll sequences) + Lenis (smooth scroll) | FM for component-level, GSAP for cinematic scroll-tied timelines |
| Icons | lucide-react | Consistent, tree-shakeable |
| Video | Native `<video>` w/ poster + `preload="metadata"` + IntersectionObserver lazy-mount | Avoids next/video lock-in; full control over loading |
| Images | `next/image` (AVIF → WebP fallback) | Auto responsive, blur placeholders |
| Forms (Phase 2 events module) | react-hook-form + zod | Type-safe, accessible |
| Deploy target | Vercel (default) or Netlify / GitHub Pages with static export | Decide at end |

## 6. Information Architecture

```
app/
  layout.tsx                # Fonts, providers, smooth-scroll wrapper, base nav
  page.tsx                  # Phase 1 main deck (composed of chapter components)
  events/page.tsx           # Phase 2 working module
  sponsorship/page.tsx      # Phase 2 placeholder ("Coming soon" with brand polish)
  leasing/page.tsx          # Phase 2 placeholder (segments grid → details)
  api/inquire/route.ts      # POST stub that logs payload (Phase 2 wires real send)

components/
  deck/
    Hero.tsx
    WhyHere.tsx
    Retail.tsx
    Luxury.tsx
    DiningLifestyle.tsx
    Attractions.tsx
    EventsPlatform.tsx
    Close.tsx
  nav/
    ChapterRail.tsx         # Side-rail dots + chapter titles
    DeckHeader.tsx          # Logo + Inquire CTA
    InquireDialog.tsx       # Tabs: Lease | Sponsor | Book Venue
    ProgressBar.tsx
  motion/
    Reveal.tsx              # Scroll-reveal wrapper
    KineticType.tsx         # Headline word-by-word reveal
    Parallax.tsx
    LazyVideo.tsx           # IO-mounted <video> with poster
    Counter.tsx             # Animated number ticker
  ui/                        # shadcn primitives

lib/
  data/
    metrics.ts              # Property-level stats
    tenants.ts              # Logos, names, category
    venues.ts               # Event venues w/ capacity ranges
    attractions.ts
    events.ts               # Past activations highlights
  hooks/
    useChapterObserver.ts   # IO that tracks active chapter
    useReducedMotion.ts
  config/
    chapters.ts             # Single source of truth for chapter order + ids

public/
  videos/                   # Optimized .mp4 + .webm dual encodes
  images/                   # AVIF + WebP
  fonts/                    # Self-hosted woff2 subsets
```

## 7. Navigation Pattern

**Non-linear, persistent.**

- **Right-side rail** (desktop ≥ 1024px): 8 chapter dots, each labeled on hover. Click → smooth-scroll to chapter via Lenis. Active dot fills with `--gilt`.
- **Top-right Inquire button** (always visible, sticky): opens `InquireDialog` with three tabs. Each tab renders a different CTA-tailored form/payload.
- **Top-left wordmark** (links to `/`).
- **Bottom progress bar**: thin line bottom of viewport, tracks total scroll.
- **Keyboard:** ↑/↓ jump to prev/next chapter; numeric keys 1–8 jump to chapter N; Esc closes dialog.
- **Mobile (<1024px):** chapter rail collapses into a hamburger sheet (shadcn Sheet) triggered by bottom-right floating button.

## 8. Phase 1 Chapter Specs

Each chapter is a `<section>` with `id` matching `lib/config/chapters.ts`. Each terminates in a transition cue (subtle ↓ glyph or kinetic text) leading the eye to the next.

### 8.1 Hero — "Where retail becomes a destination."
- Full-bleed muted autoplay reel (montage of property exteriors, DreamWorks, Big SNOW, luxury wing). Poster image while loading.
- Center-stage kinetic headline (word-by-word reveal on mount).
- Sub-deck (single line): "American Dream · East Rutherford, NJ · 12 minutes from Manhattan"
- Bottom ticker: 3 stats animate in — **3M sq ft · 40M+ annual visitors · 450+ tenants** (Counter component).
- Down-glyph + "Begin tour" microcopy → click scrolls to next chapter.

### 8.2 Why Here
- Layout: 60/40 split — left animated SVG map of NY metro w/ pulse over American Dream pin + driving radii (15 / 30 / 60 min) labeled with reachable population, right side stat bento (5 cards: 22M people within 30 min · $85k median HHI · 65M annual NY-NJ-PA visitors · 12 min Midtown · 7 min Newark airport — *placeholder stats; will sub real public numbers during build*).
- Reveal-on-scroll for each bento card with stagger.

### 8.3 Retail
- Full-width auto-marquee of tenant logos (CSS-only marquee, two rows opposite directions).
- Category split: 3 columns — Anchor / Lifestyle / Specialty — with counts.
- Growth chart: small embedded bar/area chart (Recharts or hand-rolled SVG) showing tenant growth over recent years.

### 8.4 The Avenue (Luxury)
- Color shift: slightly warmer ivory tones, more negative space, larger type.
- Cinematic background video of marble walks (loop, slow).
- Pull-quote with editorial serif: *"The only place outside Fifth Avenue where luxury feels at home."*
- Tenant logo strip: Hermès, Saks Fifth Avenue, Tiffany & Co., Louis Vuitton, Mulberry, etc.

### 8.5 Dining & Lifestyle
- Bento grid (3×2): hero food hall + 5 highlights (Korean food hall · kosher food hall · Carpaccio · Saddle River Café · Toastique · Shake Shack).
- Day-to-night gradient overlay subtly shifts as user scrolls past.
- Tagline: "Dining as destination."

### 8.6 Attractions & Entertainment
- 4 hero tiles in a 2×2 grid (becomes 1×4 on tablet):
  - DreamWorks Water Park
  - Nickelodeon Universe (largest indoor theme park in the Western Hemisphere)
  - Big SNOW
  - Sea Life Aquarium + Angry Birds Mini Golf (combined)
- Each tile: poster image; on hover, autoplay muted preview video. Click → full-screen lightbox with deeper detail + stats (capacity, opening year, marquee feature) + ESC/× to close.
- Section header: "An entire city of experiences."

### 8.7 Events & Platform
- Headline: "A stage built for global moments."
- Stats bar: venue count · max single-event capacity · sponsorship slots filled YTD (placeholder).
- Past activations roster: 6-tile grid of branded photo cards (concert · product launch · convention · activation · celebrity appearance · holiday programming).
- Three primary CTAs side-by-side: **Book a Concert · Activate Your Brand · Plan a Convention** — each opens InquireDialog pre-set to the relevant tab.

### 8.8 Close
- Cinematic full-bleed final frame (slow zoom on hero shot).
- Kinetic headline: *"Build your next chapter here."*
- Three primary buttons stacked horizontally on desktop: Lease · Sponsor · Book a Venue.
- Footer line below: contact email, phone, links to Phase 2 deeper modules.

## 9. Phase 2 Working Module — `/events`

Live page accessible from Events chapter and top nav.

**Sections:**

1. Hero with venue compilation video.
2. **Venue capacity calculator** — slider control (50 → 25,000 attendees). As the slider moves, the venue cards below filter live to show matching options (e.g. The Court @ 3,500 · Plaza @ 8,000 · Outdoor Festival Grounds @ 25,000). Each venue card shows capacity range, dimensions, features, sample fit.
3. Past events highlight reel.
4. Inquiry form (react-hook-form + zod): name, company, event type, expected attendees, target date range, message. On submit → POST to `/api/inquire` stub which `console.log`s and returns 200. Success state shows confirmation.

## 10. Phase 2 Placeholder Modules

- `/sponsorship` and `/leasing` render branded "coming soon" pages with: hero, single paragraph of intent, and CTA back to main deck or to `/events`. Demonstrates architecture without padding scope.

## 11. Inquire Dialog

Triggered from:
- Top-right Inquire button
- Each chapter's CTA buttons
- Close chapter's three primary buttons

Three tabs:
1. **Lease** — segments: Luxury / Retail / F&B / Pop-up. Selecting a segment swaps copy in dialog header.
2. **Sponsor** — partnership tiers list + form.
3. **Book a Venue** — links into `/events` calculator.

Form submission stub → console-log; we'll wire to a real endpoint when deployment is sorted.

## 12. Performance Plan

- **Hero video** ≤ 1.5 MB. Dual-encode AV1 + H.264 (`<source>` order). 1080p max. ~10s loop.
- **Below-fold videos** lazy-mounted via `LazyVideo` (IntersectionObserver, `rootMargin: 200px`).
- **Images** — `next/image`, AVIF first, blur placeholder, sized correctly per viewport breakpoint.
- **Fonts** — self-host, subset to Latin, preload display font, `font-display: swap`.
- **JS bundle** — only Lenis + Framer Motion + GSAP. Code-split heavy modules. No moment.js, no lodash.
- **Reduced motion** — respect `prefers-reduced-motion`; replace cinematic reveals with instant opacity changes; replace looping video with poster image only.
- **Lighthouse target** — Perf 95 / A11y 100 / BP 100 / SEO 100.

## 13. Accessibility

- All interactive elements keyboard-focusable; visible `:focus-visible` ring in `--gilt`.
- Videos muted by default with captions track where dialog is present (Hero, Luxury, Close); decorative videos marked `aria-hidden`.
- Color contrast: ivory on ink ≥ 14:1; gilt on ink ≥ 6:1 (verified at build).
- Skip-to-content link on first Tab.
- Chapter rail dots are buttons with `aria-label="Chapter N: <title>"`.

## 14. AI Tooling Plan

To be documented in README:
- **Midjourney / Flux Pro** for aspirational imagery where official assets thin (luxury wing at golden hour, brand activation hero renders, abstract texture backgrounds).
- **Topaz / ffmpeg** to upscale + dual-encode public footage. Standard `ffmpeg -i in.mp4 -c:v libx264 -crf 23 -preset slow -movflags +faststart out.mp4` + AV1 variant.
- **Claude (this assistant)** for component implementation, copy iteration, README drafting.
- **ElevenLabs** (optional) for hero VO scratch track (default: no VO — music + ambience).

Asset attribution & licensing notes in `README.md` and `public/CREDITS.md`.

## 15. Project Structure & Conventions

- **TypeScript strict mode** on.
- **ESLint + Prettier** with project defaults.
- Components are **server-by-default**; opt into client (`"use client"`) only where motion / state needed.
- Imports ordered: react/next → libs → local (paths via `@/*`).
- Tailwind tokens via `tailwind.config.ts` extend; raw colors only in token file.
- Each chapter component owns its data import; data lives in `lib/data/*.ts` and is fully typed.

## 16. Out of Scope (explicit YAGNI)

- CMS / admin UI
- Internationalization
- Analytics integration (left as a stub interface)
- E2E test suite (smoke Playwright only, optional)
- Server-side form submission to real email service (stub now, wire later)
- Auth, accounts, user state

## 17. Risks & Open Questions

1. **Real public stats** for American Dream may differ from placeholders — we'll source from press kits during implementation and update `lib/data/metrics.ts`.
2. **Official video clips** may be limited; we'll mix short, optimized public footage with AI-rendered/Midjourney imagery and motion graphics. No copyrighted assets included without attribution disclosure in README.
3. **Performance on hero video** is the single biggest LCP risk — mitigation is dual-encode, low bitrate, AVIF poster, and `preload="metadata"` not `auto`.
4. **Tablet landscape (1024)** layout — we'll QA explicitly because it's a primary target.

## 18. Success Criteria

- All 8 chapters render and animate as specified on Chrome (latest), Safari (latest), Firefox (latest).
- Lighthouse mobile + desktop both ≥ 90 perf, 100 a11y.
- `/events` module: capacity slider filters venue cards live with no jank.
- Phase 2 placeholder routes load and are visually consistent.
- README documents: stack, setup, design decisions, AI tools used, deploy steps.
- Repo is publicly deployable in one command (`vercel`, `netlify deploy`, or `next build && next export`).
