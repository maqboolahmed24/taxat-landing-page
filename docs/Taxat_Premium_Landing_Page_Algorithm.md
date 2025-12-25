# Taxat Premium Landing Page Algorithm (Design + Dev)
> **Confidential — internal working doc.**  
> Version: **v1.0** · Last updated: **2025-12-24**  
> Audience: **UK accounting & tax practices (partners/directors + senior managers)**  
> Primary conversion: **Request beta / become a design partner / book demo**

---

## Table of contents
1. [North-star outcomes](#north-star-outcomes)
2. [Positioning extracted from your business plan](#positioning-extracted-from-your-business-plan)
3. [Landing page algorithm](#landing-page-algorithm)
4. [Full landing page structure & recommended content](#full-landing-page-structure--recommended-content)
5. [External media specs (video + images)](#external-media-specs-video--images)
6. [Tech stack: modern & future-proof](#tech-stack-modern--future-proof)
7. [Performance, accessibility & trust guardrails](#performance-accessibility--trust-guardrails)
8. [Acceptance checklist (launch gates)](#acceptance-checklist-launch-gates)
9. [Recommended repo structure](#recommended-repo-structure)
10. [References (web standards)](#references-web-standards)

---

## North-star outcomes

### UX outcomes (what “great” means)
- **Frictionless first 15 seconds:** visitor understands *what Taxat is*, *who it’s for*, and *why it’s different*.
- **Trust-first conversion:** because the product touches sensitive financial/tax data, the page must front‑load confidence (security posture, governance, explainability, “not affiliated with HMRC” clarity).
- **Premium clarity:** cinematic, but never confusing. Motion should guide comprehension and create “polish”, not distract.

### Business outcomes (landing page job)
- Convert the right traffic into one of:
  - **Request beta access** (short form)
  - **Book a demo** (calendar)
  - **Join update list** (fallback CTA)
- Qualify leads by:
  - Firm size (e.g., 1–10, 10–50)
  - Volume of SA clients
  - Current stack (Xero/QBO/Sage + filing tool)
  - Pain intensity (hours spent, enquiry anxiety)

---

## Positioning extracted from your business plan

### One-sentence positioning
**Taxat gives accountants independent risk visibility before filing—highlighting cross-source mismatches and linking every return figure to evidence so you can submit with confidence.**  

### What you’re *not* (important for trust)
- Not “just another Self Assessment tool” (you **sit above** existing filing tools as a defence/risk layer).
- Not an HMRC product and **does not access HMRC internal systems** or replicate their decisioning.

### Core differentiators to showcase (must be obvious on the page)
1. **Defence Graph** — evidence-linked lineage from return figures to source records.
2. **Compliance Risk Twin** — cross-source reconciliation & explainable discrepancy flags.
3. **Defence Score (0–100)** — quantifies “enquiry readiness”.
4. **Nightly Autopilot** — prioritised action list to reduce mental load and prevent misses.
5. **Governed, replayable computation** — versioned rules + run manifests (reproducible years later).

### Who you’re for (ICP)
- UK accounting firms, especially **small-to-mid practices** managing many Self Assessment clients and feeling pressure from digital oversight / MTD shifts.

---

## Landing page algorithm

Think of this as an **execution pipeline** that turns your strategy → narrative → design system → build → measurable conversion.

### Inputs
- Business plan (positioning, ICP, proof points, roadmap, trust requirements)
- Product artefacts (screenshots, demo flow, feature definitions)
- Brand intent (premium dark theme, Apple-like polish, purposeful motion)
- Constraints (performance budget, accessibility, legal/compliance wording)

### Outputs
- Landing page (responsive, high-performance, accessible)
- Asset pack spec (video + images + typography)
- Analytics plan (events, funnels, heatmaps)
- QA gates (Core Web Vitals, accessibility, motion, SEO)

---

### Algorithm 0 — Define the conversion contract
**Goal:** decide what the page must achieve and what it must *not* do.

1. Pick **Primary CTA** (one only):
   - `Request Beta Access` (recommended)
2. Pick **Secondary CTA**:
   - `Book demo`
3. Define **qualification questions** (max 4 fields on first step).
4. Define **drop-off-safe** fallback:
   - `Join updates`

**Output:** CTA map + form schema + thank-you flow.

---

### Algorithm 1 — Map the user journey (1-page funnel)
**Goal:** ensure the page reads like a guided story with escalating proof.

Create a single narrative arc:

1. **Promise** (hero)
2. **Problem pressure** (HMRC data scrutiny + time drain)
3. **New mechanism** (Defence Graph + Risk Twin)
4. **How it works** (3 steps, concrete)
5. **Product proof** (screens + flows)
6. **Trust proof** (security + governance + disclaimers)
7. **Conversion** (CTA)

**Output:** Journey storyboard + section order + “what must be understood by section”.

---

### Algorithm 2 — Craft the messaging hierarchy
Write the page from the top down:

1. **Category** (what you are)
2. **Outcome** (what they get)
3. **Mechanism** (how it’s different)
4. **Proof** (why believe it)
5. **Next step** (CTA)

**Copy rules**
- Use *verbs* (“link”, “reconcile”, “defend”, “prioritise”).
- Avoid fluffy AI claims. Show governed artefacts: **Defence Graph, Defence Score, Run Manifest**.

**Output:** final H1, subhead, bullets, proof claims, disclaimers.

---

### Algorithm 3 — Design the premium dark theme system
**Goal:** a future-proof color system that feels high-end and remains maintainable.

1. Define **semantic tokens** (not raw colors):
   - `--surface/0..3`, `--text/primary`, `--text/secondary`, `--border/subtle`
   - `--accent/primary`, `--accent/secondary`
   - `--status/success`, `--status/warn`, `--status/danger`
2. Use modern color spaces where possible:
   - `oklch()` for perceptual consistency (with fallbacks).  
3. Generate ramps with `color-mix()` (for hover/active states).
4. Create an **“illumination model”**:
   - soft gradients + subtle noise + specular highlights.
5. Define contrast targets (AA minimum; aim for AAA in key text).

**Output:** token JSON + CSS variables + Figma styles.

*(See references for `oklch()` and `color-mix()`.)*

---

### Algorithm 4 — Build the motion system (cinematic, subtle, performant)
**Goal:** “Apple-level” polish without killing performance or accessibility.

1. Define 4 motion tiers:
   - **Tier A (micro):** hover, focus, pressed, tooltips
   - **Tier B (navigation):** section reveals, scroll progress indicators
   - **Tier C (hero):** background video + light movement
   - **Tier D (wow):** one signature interaction (e.g., interactive Defence Graph teaser)
2. Define motion principles:
   - **Purposeful:** motion always communicates hierarchy or cause/effect.
   - **Fast:** 120–240ms for micro; 400–700ms for section transitions.
   - **Reduced-motion compatible:** if user requests reduced motion, replace with fades / instant states.  
3. Use GPU-friendly transforms:
   - `transform`, `opacity` (avoid animating layout).
4. Ship a **motion budget**:
   - total JS for animation libs capped
   - prefer CSS + WAAPI for simple effects

**Output:** motion tokens (durations, easing curves), component motion recipes, reduced-motion map.

---

### Algorithm 5 — Prototype the page as “sections + components”
**Goal:** build like a product system, not a one-off marketing page.

Componentize:
- Hero, CTA, FeatureCard, ProofMetric, ScreenshotCarousel, IntegrationRow, FAQ, Footer
- “TrustStrip” (security + governance + disclaimers)
- “HowItWorksStepper” (3 steps)

**Output:** component list + props + content slots + responsive rules.

---

### Algorithm 6 — Produce the media plan (before design polish)
**Goal:** ensure the visuals are planned, not patched.

1. Decide exactly where video appears (ideally **1 hero loop + 1 product UI clip**).
2. Decide where still cinematic images appear (max 3–5).
3. Decide where screenshots appear (compressed, crisp, legible).
4. Assign each asset:
   - purpose, placement, aspect ratios, and size targets

**Output:** asset inventory + spec sheet.

---

### Algorithm 7 — Build with “performance-first” constraints
**Goal:** cinematic + fast.

1. Set **Core Web Vitals targets** (LCP, INP, CLS).  
   - Use the widely accepted thresholds from Web Vitals guidance.  
2. Prioritize:
   - SSR/SSG, minimal client JS
   - responsive images and modern formats (AVIF/WebP)
   - lazy load non-critical media

**Output:** performance budget + build plan.

---

### Algorithm 8 — Instrument the page (conversion intelligence)
**Goal:** make iteration measurable.

Events:
- `cta_primary_click`
- `cta_secondary_click`
- `form_start`, `form_submit`, `form_error`
- `video_play`, `video_complete` (only for non-background videos)
- `scroll_depth_25/50/75/90`
- `faq_open`

**Output:** analytics schema + dashboard.

---

### Algorithm 9 — QA + launch gates
**Goal:** ship the premium experience reliably.

Gates:
- Accessibility (WCAG 2.2 AA)
- Reduced motion respected
- Core Web Vitals pass on mobile
- Forms + error states polished
- SEO basics (metadata, OG, schema)
- Security basics (CSP, headers)

**Output:** signed-off QA checklist + deployment runbook.

---

## Full landing page structure & recommended content

> Below is the recommended **section-by-section structure** with copy direction. Replace bracketed parts with your final numbers/testimonials once available.

### 1) Sticky top nav (minimal)
- Logo
- Product
- How it works
- Security
- FAQ
- **Request beta** (primary button)

Micro-interaction: subtle underline glide + active section indicator.

---

### 2) Hero (cinematic, conversion-first)
**H1:** *Defence-ready Self Assessment—before you file.*  
**Subhead:** Taxat is the AI-driven audit defence layer for UK accountants: reconcile client‑authorised data across sources, surface mismatches, and link every figure to evidence.  
**Hero bullets (3):**
- **Defence Graph:** every number traceable to documents & transactions  
- **Compliance Risk Twin:** cross-source mismatches, explainable flags  
- **Nightly Autopilot:** the next-best action list for your team  

**Primary CTA:** Request beta access  
**Secondary CTA:** Watch 60‑sec product tour

Trust microcopy under CTAs:
- “Not affiliated with HMRC. Works alongside your existing filing tools.”

Visual: dark hero video loop with abstract “evidence graph” + subtle UI glints.

---

### 3) Problem pressure (make the pain feel real)
Headline: *HMRC scrutiny is rising. Defensive work is eating your week.*  
3-column proof:
- Time drain (defensive reconciliation)
- Anxiety (enquiry risk / “black box”)
- Data fragmentation (ledger + bank + docs + HMRC)

Design: cinematic still image (quiet, focused, “control room” vibe).

---

### 4) The new mechanism (make it memorable)
Headline: *Stop guessing. Build an evidence-backed return.*  
Explain the mechanism:
- “A Defence Graph is your enquiry pack—generated automatically.”
- “A Risk Twin shows mismatches early—before submission.”

Include a simple animated diagram (3 nodes → evidence links) with progressive disclosure.

---

### 5) How it works (3 steps, concrete)
Stepper:
1. **Connect sources** (ledger, bank feeds, documents, optional HMRC endpoints)
2. **Run Taxat** (reconcile + score + graph)
3. **File with confidence** (export defence pack + action list)

Add a short line under each step with “what they get”.

---

### 6) Product proof (screenshots + UI video)
Headline: *A control room for enquiry readiness.*  
Show:
- Mission Control (portfolio health + critical today)
- Client overview (badges, primary CTA)
- Defence vs Risk quadrant view
- Defence explorer (evidence drill-down)

Include:
- **30–45s UI demo clip** (no audio required, optional captions).

---

### 7) Features (premium cards)
Cards:
- Defence Score (0–100) + what “good” means
- Nightly Autopilot (prioritised to-do list)
- Audit pack export (Defence Report PDF + manifests)
- Governance (versioned rules + reproducible runs)
- Integrations (Xero/QBO/Sage; capture tools)

---

### 8) Trust & security (non-negotiable)
Headline: *Built for regulated data and firm due diligence.*  
Bullets:
- Encryption in transit + at rest
- Role-based access + audit trails
- GDPR-aligned handling

Add: “Security whitepaper available for design partners.”

---

### 9) Pricing / beta positioning
If beta is controlled:
- “Closed beta for design partners (limited seats).”
- “12‑month beta incentive + discounted early adopter pricing.”

CTA repeated.

---

### 10) FAQ (reduce objections)
Include:
- “Do we have to switch tools?” (No—Taxat sits above your stack)
- “Is this connected to HMRC?” (No—independent; uses authorised APIs only where permitted)
- “How long to onboard?” (~60 minutes initial setup; start with 10–20 clients)
- “What about security?” (controls + policies)

---

### 11) Final CTA (simple, high intent)
Headline: *Be enquiry-ready this season—without extra headcount.*  
Short form (3–4 fields) + “Request beta”.

---

### 12) Footer
- Company
- Privacy / terms
- Security
- Contact
- Social (LinkedIn)

---

## External media specs (video + images)

### Global delivery rules (all media)
- Prefer **modern formats** and **responsive delivery**.
- Use a CDN + long cache headers for hashed assets.
- Never block initial render on non-critical media.
- Provide fallbacks for older browsers and slow networks.

---

### Video assets

#### Video A — Hero cinematic loop (background)
**Purpose:** “Apple-like” premium energy + immediate category cue (defence graph / risk intelligence).  
**Placement:** hero background behind headline and CTAs.  
**Duration:** 10–14s seamless loop.  
**Frame rate:** 24–30 fps (24 preferred for cinematic feel).  
**Audio:** none (silent).  
**Aspect ratios (deliver both):**
- Desktop: **21:9** (cinematic) and safe-crop to 16:9
- Mobile: **9:16** (portrait) or **4:5** if you want less aggressive crop

**Resolutions (source masters):**
- 21:9 master: **3840×1646** (or 5120×2190 if you truly need 5K)
- 9:16 master: **2160×3840**
**Delivery encodes:**
- MP4 (H.264) baseline for widest support
- Optional WebM (VP9/AV1) for Chrome-family efficiency (feature-detect)

**Compression targets (delivery):**
- Desktop MP4: ~3–6 Mbps average (short loop)
- Mobile MP4: ~1.5–3 Mbps
- Aim for **< 2.5–4.0 MB** per encode if possible

**HTML delivery requirements:**
- `muted`, `playsinline`, `loop`, `autoplay`
- `preload="none"` or `preload="metadata"` depending on whether it’s above the fold and critical  
  (See video performance guidance.)
- Always supply a **poster** image (see Image A below)
- Lazy-load if not immediately visible

Notes:
- Modern browsers restrict autoplay with sound; keep hero video muted.  
  (See MDN video/autoplay guidance.)

---

#### Video B — Product UI “tour” clip
**Purpose:** show tangible product value quickly (mission control → client overview → defence graph).  
**Placement:** “Product proof” section.  
**Duration:** 30–60s (ideal ~45s).  
**Frame rate:** 30 fps.  
**Audio:** optional; if audio exists, provide captions.  
**Aspect ratios:**
- Desktop: 16:9
- Mobile: 9:16 cutdown (optional)

**Resolutions:**
- Desktop: 1920×1080 (master 2560×1440 if you want extra crispness)
- Mobile: 1080×1920

**Compression targets:**
- MP4 H.264 High Profile, CRF tuned for legibility (UI needs higher quality than cinematic loops)
- Target file size **< 8–12 MB** for 45s if possible (optimize aggressively)

**Playback UX:**
- Do **not** autoplay with audio.
- Use click-to-play with a premium poster frame.
- Show controls, include pause, and make it keyboard accessible.

---

#### Video C — Optional founder credibility clip (later)
**Purpose:** trust + narrative (why built, governance mindset).  
**Placement:** after trust/security.  
**Duration:** 45–75s.  
**Style:** quiet, premium, minimal cuts, clean captions.

---

### Image assets

#### Image A — Hero poster (fallback + LCP anchor)
**Purpose:** first paint image while video loads; defines the hero mood.  
**Aspect ratios:** match Video A (21:9 + 9:16).  
**Resolutions (export):**
- Desktop: 2560px wide (plus 2× variant if needed)
- Mobile: 1440px tall

**Formats:**
- AVIF primary, WebP fallback, JPEG fallback  
  (Modern image format guidance.)  
**Compression:**
- AVIF quality ~40–55 (visual inspection)
- WebP quality ~70–80
- Strip metadata

---

#### Image B — Cinematic stills (3–5 total)
**Purpose:** premium texture (non-stock-looking).  
**Style guide:**
- Dark, high contrast, subtle grain/noise
- Abstract “graph / data / defence” motifs
- Minimal literal tax imagery; avoid cliché calculators

**Formats:**
- AVIF/WebP for photos
- PNG only if transparency is required

---

#### Image C — Product screenshots
**Purpose:** clarity and proof.  
**Rules:**
- Keep UI crisp; export at 2× for retina.
- Use a subtle device frame or window chrome (consistent).
- Blur/anonymise any sensitive client data.

**Formats:**
- PNG (if sharp UI with text) or high-quality WebP
- Avoid JPEG for UI text if it introduces artifacts

---

#### Image D — Integration logos
**Format:** SVG (preferred).  
**Rules:** single-color or duotone to match dark theme.

---

#### Responsive delivery requirements (all images)
- Use `srcset` / `<picture>` for responsive images and art direction.  
- If using Next.js, prefer the `next/image` component for sizing, lazy loading, and modern formats.  

---

## Tech stack: modern & future-proof

### Recommended build
- **Next.js (App Router) + TypeScript**
- Styling: **Tailwind + CSS variables** (tokens) *or* CSS Modules with tokens
- Animation: CSS/WAAPI for micro; optional Framer Motion for section reveals
- Video: native `<video>` with careful preload/lazy-load
- Image delivery: Next.js image optimisation pipeline

### Hosting
- Vercel or equivalent CDN-backed hosting with edge caching.
- Use immutable asset URLs and cache aggressively.

---

## Performance, accessibility & trust guardrails

### Core Web Vitals targets (launch gates)
Use the established thresholds:
- **LCP ≤ 2.5s**
- **INP ≤ 200ms**
- **CLS ≤ 0.1**

### Motion accessibility
- Respect `prefers-reduced-motion` and provide reduced-motion fallbacks.
- Avoid motion that can trigger vestibular issues.

### Video performance guardrails
- Use correct preload strategies (`none` vs `metadata`) depending on usage.
- Lazy-load below-the-fold videos.

### Responsive images
- Use `srcset` / `<picture>` so browsers pick optimal resources.

---

## Acceptance checklist (launch gates)

### UX & conversion
- [ ] Primary CTA visible in hero without scrolling.
- [ ] Form completes in < 60 seconds, with perfect error states.
- [ ] Sticky CTA persists after the fold (desktop + mobile).

### Visual polish
- [ ] Typography scale feels premium (no cramped line lengths).
- [ ] Micro-interactions consistent (hover, focus, pressed).
- [ ] One signature “next-gen” detail (interactive graph teaser or light-field effect).

### Performance
- [ ] Mobile Lighthouse Performance green (target 90+).
- [ ] LCP/INP/CLS within thresholds on real devices.

### Accessibility (WCAG 2.2 AA)
- [ ] Keyboard navigation for everything.
- [ ] Visible focus states.
- [ ] Motion reduction respected.
- [ ] Video captions where needed.

### Trust
- [ ] Clear “not affiliated with HMRC” copy.
- [ ] Security posture section is concrete and specific.
- [ ] No inflated AI claims; mechanisms are explainable.

---

## Recommended repo structure

```
/app
  /(marketing)
    page.tsx
    layout.tsx
    components/
      Hero/
      Problem/
      Mechanism/
      HowItWorks/
      ProductProof/
      TrustSecurity/
      PricingBeta/
      FAQ/
      FinalCTA/
    styles/
      tokens.css
      globals.css
/public
  media/
    video/
    images/
  fonts/
/lib
  analytics/
  motion/
  seo/
```

---

## References (web standards)

Core experience targets & metrics
- Web Vitals (LCP/INP/CLS thresholds): https://web.dev/articles/vitals

Images
- MDN image format guide (AVIF/WebP overview): https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types
- Responsive images (`srcset`, `<picture>`): https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images

Next.js image optimisation
- Next.js image optimisation: https://nextjs.org/docs/14/app/building-your-application/optimizing/images

Video
- Video performance (`preload` guidance): https://web.dev/learn/performance/video-performance
- `<video>` element & autoplay considerations: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video

Accessibility & motion
- WCAG 2.2 spec: https://www.w3.org/TR/WCAG22/
- `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion

Modern color system tools
- `oklch()`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/oklch
- `color-mix()`: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix
- CSS Color 4: https://www.w3.org/TR/css-color-4/
