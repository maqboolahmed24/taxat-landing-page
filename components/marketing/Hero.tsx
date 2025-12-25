"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import GradientText from "@/components/ui/GradientText";
import { track } from "@/lib/analytics";
import { fadeUp, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <Section id="top" size="lg" className="relative">
      {/* Background video */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0">
          <video
            data-ambient-video="true"
            className="h-full w-full object-cover opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_35%,black,transparent)]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-poster.webp"
          >
            <source src="/media/hero-loop-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
            <source src="/media/hero-loop.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Fallback poster layer */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[url('/media/hero-poster.webp')] bg-cover bg-center opacity-70"
        />

        {/* Subtle grid + vignette */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,hsl(var(--border)/0.24)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.20)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(60%_50%_at_50%_28%,black,transparent)]"
        />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_20%,transparent,rgba(0,0,0,0.55))]" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_55%,hsl(var(--bg))_100%)]"
        />
      </div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="relative">
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
          <Badge tone="accent">Closed beta · Design partners</Badge>
          <Badge>UK accountants · Self Assessment</Badge>
          <Badge tone="success">Evidence‑linked by default</Badge>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-6 max-w-3xl font-display text-4xl font-semibold tracking-tight text-text md:text-6xl"
        >
          Defence‑ready Self Assessment · <GradientText>before you file</GradientText>.
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Taxat is the AI‑driven audit defence layer for UK accountants. Reconcile client‑authorised data across ledgers,
          bank feeds, receipts, and (when authorised) HMRC APIs · then link every return figure to evidence with a living{" "}
          <span className="text-text/90">Defence Graph</span>.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            intent="primary"
            size="lg"
            href="#beta"
            icon={<ArrowRight className="h-4 w-4" />}
            onClick={() => track("cta_primary_click", { location: "hero" })}
          >
            Request beta access
          </Button>

          <Button
            intent="secondary"
            size="lg"
            href="#demo"
            icon={<Play className="h-4 w-4" />}
            onClick={() => track("cta_secondary_click", { location: "hero" })}
          >
            Watch the product tour
          </Button>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-xs leading-relaxed text-muted">
          Not affiliated with HMRC. Taxat does not access HMRC internal systems or replicate investigation decisioning.
          It uses <span className="text-text/80">official APIs</span> only where authorised.
        </motion.p>

        {/* Hero proof cards */}
        <motion.div
          variants={fadeUp}
          className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3"
        >
          <div className="glass noise rounded-2xl p-5 shadow-glow">
            <div className="text-sm font-medium text-text">Compliance Risk Twin</div>
            <div className="mt-1 text-sm text-muted">
              Independent, explainable risk visibility via cross‑source reconciliation.
            </div>
          </div>

          <div className="glass noise rounded-2xl p-5 shadow-glow">
            <div className="text-sm font-medium text-text">Defence Graph</div>
            <div className="mt-1 text-sm text-muted">
              Every figure traceable to transactions and evidence · ready for enquiry.
            </div>
          </div>

          <div className="glass noise rounded-2xl p-5 shadow-glow">
            <div className="text-sm font-medium text-text">Nightly Autopilot</div>
            <div className="mt-1 text-sm text-muted">
              Prioritised action list so the team fixes gaps before filing season peaks.
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
