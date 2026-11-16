# SH Truck Bodies — website

Premium B2B site for **SH Truck Bodies LLC** (formerly Swampy Hollow Manufacturing), Honey Brook, PA —
wholesale truck body manufacturer selling exclusively to truck equipment distributors & upfitters.

> **Build status:** Steps 1–2 of 5 complete — design system, layout, all public pages & animations.
> Step 3 (backend & forms) · Step 4 (admin CMS) · Step 5 (mobile & perf polish).

## Pages

| Route | Notes |
| --- | --- |
| `/` | Hero (morphing blueprint) → pinned horizontal showcase → featured gallery → why us → warranty → dealer CTA → videos |
| `/standard-truck-bodies` | Overview of the four families |
| `/standard-truck-bodies/[slug]` | Dump · Landscape · Platform · Chipper — models, spec tables, options, gallery, videos, related. Card → hero **shared-element morph** |
| `/standard-truck-bodies/[slug]/spec-sheet` | Printable spec sheet (Print → Save as PDF) |
| `/custom-truck-bodies` | Examples + process |
| `/gallery` | Filterable masonry, swipeable lightbox, `#photo-<id>` deep links (Back closes) |
| `/where-to-buy` | Dealer locator: ZIP/state/city search, geolocation, Leaflet map with clustering, list/map toggle |
| `/where-to-buy/become-a-dealer`, `/warranty`, `/contact`, `/catalog`, `/request-a-quote` | Content complete; forms are wired in step 3 |
| `/configurator` | Body / length / height / paint / options with live morphing preview → "Send to quote" |
| `/privacy-policy`, `/styleguide` | Legal page (needs counsel review), design-system reference (noindex) |

Old WordPress URLs (`/warranty-claims`, `/where-to-buy/find-a-dealer`, `/become-distributor`, …) 301-redirect in `next.config.ts`.

## Content & media

- `src/content/products.ts` — every spec, table and option transcribed from the old site (moves to the CMS in step 4).
- `src/content/gallery.ts`, `src/content/photos.json` — 79 client photos from the old media library, EXIF-rotated and
  resized to ≤2400px masters in `public/images/photos` (181 MB → 26 MB); `next/image` serves AVIF/WebP with blur placeholders.
- `src/content/dealers.ts` — **sample data** (the old site loads dealers via a WordPress plugin, so they couldn't be migrated).
- Map tiles: OpenStreetMap + CSS dark filter by default; set `NEXT_PUBLIC_MAP_TILE_URL` for a keyed provider (see `.env.example`).
- YouTube videos load as lightweight facades (youtube-nocookie iframe only after "play").

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack, Cache Components + Partial Prefetching) |
| UI | React 19.3 · TypeScript · Tailwind CSS 4.3 |
| Motion | `motion` (Framer Motion) · React `<ViewTransition>` · Lenis · GSAP ScrollTrigger (step 2, lazy) |
| Fonts | Space Grotesk (display) · Inter Tight (text) · JetBrains Mono (technical) via `next/font` |

## Getting started

Requires Node 20.9+ (tested on Node 26).

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config) |
| `npx tsc --noEmit` | Typecheck |

Design-system reference page: **`/styleguide`** (noindex).

> **OneDrive note:** this folder lives inside OneDrive. Syncing `node_modules/` and `.next/` is slow and can
> lock files. Either mark them "Free up space / don't sync" or move the project outside OneDrive.

## Project structure

```
src/
  app/                    routes (App Router) + globals.css (design tokens)
    styleguide/           living design-system page
  components/
    brand/Logo.tsx        logo + hoisting SVG-morph mark
    layout/               Header (mega menu), MobileMenu, Footer, MobileCtaBar
    motion/               SmoothScroll, Cursor, Magnetic, RevealObserver, SplitText,
                          Counter, MorphDivider, PageTransition
    illustrations/        TruckShowcase (morphing blueprint), BodyGlyph, MorphPlates
    sections/home/        Hero (+ step 2 sections)
    ui/                   Button, Layout primitives, Form controls, ProductCard, Marquee
    icons.tsx             inline 1.5px icon set
  hooks/useMotionTier.ts  full / lite / reduced motion tiers
  lib/
    site.ts               company facts, nav, contact — single source of truth
    bodies.ts             body silhouette geometry (morph-compatible paths)
  styles/components.css   component + motion CSS (cascade layer `components`)
```

## Design system

**Identity — "cut plate".** Graphite & steel base, one signal-orange accent, chamfered corners like
laser-cut steel, technical mono labels, blueprint grid lines, film grain.

- **Tokens** live in `src/app/globals.css`: raw palette → semantic tokens (`--bg`, `--surface`, `--fg`,
  `--fg-muted`, `--line`, `--accent`…) → Tailwind theme (`bg-surface`, `text-muted`, `border-line`…).
- **Light sections:** add `.theme-paper` to any section; components read semantic tokens, so nothing else changes.
- **Type scale:** fluid `text-display-2xl … display-sm`, `text-lead`, `eyebrow` (mono caps).
- **Contrast:** primary text 16.9:1, muted 6.6:1, accent text 7.6:1, button ink on orange 6.3:1 (WCAG AA+).
- **Component CSS** is imported with `layer(components)` so Tailwind utilities always override it.
  (Don't put component rules in an inline `@layer components {}` block in `globals.css` — the build flattens it.)

## Motion architecture

| Effect | Implementation |
| --- | --- |
| Page transitions & shared-element morphs | React `<ViewTransition>` (View Transitions API). `PageTransition` wraps each page; `ProductCard` names `product-media-{slug}` / `product-title-{slug}` for card → hero morphs |
| Above-the-fold reveals | Pure CSS (`SplitText trigger="load"`, `.load-in`, `.plot-in`) — no hydration wait, LCP-safe |
| Scroll reveals | `data-reveal` / `SplitText trigger="view"` + **one** shared IntersectionObserver (`RevealObserver`) running Web Animations — no class/attribute mutation, so no hydration mismatches |
| Pinned horizontal showcase | GSAP ScrollTrigger (code-split, synced to Lenis), per-panel parallax via `containerAnimation`; native scroll-snap on touch |
| SVG morphs | Identical-structure paths animated via `motion` (logo hoist, burger, dividers, hero plates, truck bodies) |
| Cursor, magnetic, tilt | Motion values + springs, zero React renders per frame; desktop "full" tier only |
| Smooth scroll | Lenis (desktop only, singleton `getLenis()`), native on touch |

**Motion tiers** (`useMotionTier`, mirrored to `<html data-motion>`):
`full` (fine pointer, capable device) · `lite` (touch / ≤4 cores / ≤4 GB / Save-Data) · `reduced` (`prefers-reduced-motion`).

## Content notes

All company facts come from the current shtruckbodies.com. Items marked `TODO(client)` in `src/lib/site.ts`
need confirmation (e.g. exact plant coordinates). No founding year / bodies-built / dealer counts were
published on the old site — counters will use client-supplied numbers in step 2.
