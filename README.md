# Taxat Premium Landing Page (Next.js)

A premium, dark, cinematic landing page scaffold for **Taxat** — designed for a high‑converting, trust‑first journey.

## Quick start

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Replace media (important)

All external media lives in `public/media/`.

### Hero background video (recommended)
Add:
- `public/media/hero-loop.mp4` (required)
- `public/media/hero-loop.webm` (optional)

Poster fallback already included:
- `public/media/hero-poster.webp`
- `public/media/hero-mobile.webp`

### Product tour clip
Add:
- `public/media/product-tour.mp4` (required)
- `public/media/product-tour.webm` (optional)

> Tip: keep it click‑to‑play (no autoplay with audio). The UI is already wired that way.

### Screenshots + stills
Replace in:
- `public/media/ui/*.webp`
- `public/media/still-1.webp`
- `public/media/still-2.webp`

## Update copy

Recommended messaging is embedded in the components, and also collected in:

- `docs/Copy.md`

## Update your domain / SEO

Edit:
- `app/layout.tsx` (`metadataBase`)
- `app/sitemap.ts` and `app/robots.ts`

## Waitlist form

The waitlist form posts to:

- `POST /api/waitlist` (stub)

Replace the stub with your real lead capture (Resend, Notion, Airtable, HubSpot, Supabase, etc.).

## Color system

The theme is tokenised in:

- `app/globals.css` (`:root` tokens)

Tailwind consumes those tokens from:

- `tailwind.config.ts`

To create a new premium palette, change tokens (not component classes).

## Docs

- `docs/Taxat_Premium_Landing_Page_Algorithm.md` (full design + dev algorithm)
- `docs/Media_Specs.md` (exact external media specs for production)
- `docs/Copy.md` (landing page structure + recommended content)

---

Made for high polish:
- Purposeful motion (Framer Motion)
- Performance‑friendly structure
- Premium dark theme with semantic tokens
