# Petr Hummel — Personal Website

A flagship personal site for **Petr Hummel** — cybersecurity, cyber resilience
and AI safety. Concept: a calm command-center ("Signal Room") — restrained,
instrumented, fast. Dark deep-space palette, one electric-blue accent, refined
typography, and a single quiet node-network engraving behind the hero.

Built with **Vite · React · TypeScript (strict) · Tailwind CSS · Framer Motion**.

## Run it

```bash
npm install      # already done in this folder
npm run dev      # start the dev server  → http://localhost:5173
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build locally
npm run lint     # eslint
npm run assets   # regenerate favicon / app icons / OG image into public/
```

## Project structure

```
index.html                 SEO, Open Graph, Twitter, icons, manifest
tailwind.config.ts         ALL design tokens (colors, fonts, scale, radii, shadows)
vercel.json                security headers for Vercel
scripts/make-assets.mjs    generates PNG icons + og.png from on-brand SVGs
public/                    favicon, icons, og.png, robots.txt, sitemap.xml,
                           site.webmanifest, _headers (Netlify security headers)
src/
  data/content.ts          ← SINGLE SOURCE OF TRUTH for all real content
  theme.ts                 motion tokens (easing, durations, variants)
  index.css                Tailwind layers + base styles + a few utilities
  lib/        sections.ts (section registry), icons.tsx, cn.ts
  hooks/      useActiveSection, useMediaQuery
  components/
    Nav, StatusRail, Hero, About, Focus, Work, Timeline, Contact, Footer
    layout/   Container, Section
    ui/       Button, AnimatedLink, Reveal, SocialIcons
    background/ NodeNetwork
```

## Editing content

Everything real lives in **`src/data/content.ts`** — edit that one file. Search
it for `PLACEHOLDER` to find everything that still needs your input (see the
list below). Links must be full, valid URLs (placeholders render as muted,
non-interactive, so nothing broken ships).

## Placeholders to fill in

These are everywhere the source material didn't provide a fact. All live in
`src/data/content.ts` unless noted.

1. **Contact email** — `site.email` (and the `Email` entry in `socials`).
2. **LinkedIn profile URL** — `socials[0].href`.
3. **ABsec website URL** — `socials` (ABsec) and the ABsec `affiliations` entry.
4. **Portrait photo** — currently a "PH" placeholder card in About.
5. **Talk / event links** — each `work[].link` (recording, slides, or event page).
6. **Canonical title + URL of the LinkedIn essay** — `work` essay item.
7. **Prague Cyber Security Conference exact date** — `work` featured item `date`.
8. **Production domain** — replace `https://CHANGE-ME.example` in `index.html`
   (canonical + OG/Twitter URLs), `public/robots.txt`, and `public/sitemap.xml`.

## Changing colors / fonts

- **Colors, type scale, radii, shadows:** `tailwind.config.ts` (`theme.extend`).
  The palette is named: `bg`, `surface`, `surface-2`, `ink`/`ink-muted`,
  `accent`, `violet`, `line`.
- **Fonts:** swap the `@fontsource` imports in `src/main.tsx` and the
  `fontFamily` entries in `tailwind.config.ts`. Fonts are self-hosted (no CDN).
- **Motion:** timings / easing / variants in `src/theme.ts`.

## Deploy

Static site — deploy `dist/` to any host.

- **Vercel:** import the repo; framework preset **Vite**. Security headers are in
  `vercel.json`.
- **Netlify:** build command `npm run build`, publish directory `dist`. Security
  headers are in `public/_headers` (copied into `dist/` on build).

Before going live, set your real domain (placeholder #8) and run `npm run build`.

## Notes

- Respects `prefers-reduced-motion` (transforms / parallax disabled, content
  stays instant and accessible).
- No analytics, trackers, or third-party scripts. No secrets in the bundle.
- `FLUX.html` and the game project are unrelated — this is a standalone repo.
