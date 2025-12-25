# External Media Specs (Video + Images)

These specs are tuned for a **premium, dark, cinematic** landing page that must remain **fast**.

> You can use these as a production checklist for your motion designer / 3D artist / editor.

---

## Delivery fundamentals

### Formats
- **Images:** AVIF (primary) → WebP (fallback) → JPG (last resort)
- **UI screenshots:** PNG or high‑quality WebP (avoid JPEG artifacts on text)
- **Video:** MP4 (H.264) as baseline; optional WebM (VP9/AV1) for efficiency

### Compression targets
- Ship the smallest file size that passes visual inspection on:
  - a MacBook Retina screen
  - an average Windows laptop
  - a mid‑range Android phone

### CDN + caching
- Serve from a CDN
- Use immutable caching (hash filenames) for long cache lifetimes

---

## Video assets

### Video A — Hero cinematic loop (background)

**Purpose:** immediate “premium” energy + data/graph motif.  
**Where:** hero section background.  
**Duration:** 10–14s seamless loop.  
**Frame rate:** 24 fps preferred (cinematic), 30 fps acceptable.  
**Audio:** none (muted).

**Aspect ratios (deliver both if possible):**
- Desktop: **21:9** master with safe crop to 16:9
- Mobile: **9:16** (or 4:5 if you prefer less aggressive crop)

**Master resolutions:**
- Desktop 21:9 master: **3840×1646** (4K wide)
- Mobile 9:16 master: **2160×3840**

**Delivery encodes:**
- `hero-loop.mp4` (H.264, High profile)
- `hero-loop.webm` (optional)

**Bitrate guidance (delivery):**
- Desktop: ~3–6 Mbps average
- Mobile: ~1.5–3 Mbps

**File size goal:**
- Aim for **< 4 MB** per encode if possible

**Implementation requirements:**
- `autoplay`, `muted`, `loop`, `playsinline`
- Provide a poster:
  - `hero-poster.avif/webp`
  - `hero-mobile.avif/webp`

---

### Video B — Product UI tour (click‑to‑play)

**Purpose:** tangible proof (mission control → client overview → explorer).  
**Where:** Product proof section.  
**Duration:** 30–60s (ideal ~45s).  
**Frame rate:** 30 fps.  
**Audio:** optional. If audio exists, provide captions.

**Aspect ratios:**
- Desktop: 16:9
- Mobile cutdown: 9:16 (optional)

**Resolutions:**
- Desktop: 1920×1080 (master 2560×1440 if you want extra crisp UI)
- Mobile: 1080×1920

**Compression guidance:**
- UI needs higher quality than cinematic footage.
- Optimise for legibility (text clarity) over grain.

**File size goal:**
- **< 8–12 MB** for ~45s

---

## Image assets

### Image A — Hero poster (LCP anchor)
**Purpose:** first paint while video loads.  
**Match:** Video A framing.  

**Exports:**
- Desktop: 2560px wide (WebP/AVIF)
- Mobile: 1440px tall (WebP/AVIF)

---

### Image B — Cinematic stills (3–5 total)
**Purpose:** premium texture across sections.  

**Aesthetic guide:**
- Dark, high contrast
- Abstract “graph / data / defence” motifs
- Subtle grain/noise (avoid stock clichés like calculators)

---

### Image C — Product screenshots
**Purpose:** clarity + credibility.  

**Rules:**
- Export at 2× for retina
- Use consistent window chrome / frame
- Blur/anonymise sensitive client data

---

### Image D — Integration logos
**Preferred:** SVG, single‑color or duotone.

---

## Current placeholders in this repo

Replace these files when ready:
- `public/media/hero-loop.mp4` *(missing; add yours)*
- `public/media/product-tour.mp4` *(missing; add yours)*
- `public/media/hero-poster.webp` *(placeholder; replace)*
- `public/media/still-1.webp`, `public/media/still-2.webp` *(placeholder; replace)*
- `public/media/ui/*.jpg` *(placeholder; replace)*

