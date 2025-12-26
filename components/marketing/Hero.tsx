"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import GradientText from "@/components/ui/GradientText";
import { track } from "@/lib/analytics";
import { fadeUp, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [poster, setPoster] = useState("/media/hero-mobile.webp");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const updatePoster = () => {
      setPoster(mq.matches ? "/media/hero-poster.webp" : "/media/hero-mobile.webp");
    };
    updatePoster();
    mq.addEventListener("change", updatePoster);
    return () => mq.removeEventListener("change", updatePoster);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(motionQuery.matches);
    update();
    if ("addEventListener" in motionQuery) {
      motionQuery.addEventListener("change", update);
      return () => motionQuery.removeEventListener("change", update);
    }
    motionQuery.addListener(update);
    return () => motionQuery.removeListener(update);
  }, []);

  const showVideo = !reducedMotion && !videoFailed;

  const toggleVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (videoPaused) {
      try {
        await video.play();
        setVideoPaused(false);
      } catch {
        // ignore play errors
      }
      return;
    }
    video.pause();
    setVideoPaused(true);
  };

  return (
    <Section id="top" size="lg" className="relative">
      {/* Background video */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0">
          {showVideo ? (
            <video
              ref={videoRef}
              data-ambient-video="true"
              aria-hidden
              className="h-full w-full object-cover opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_35%,black,transparent)]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
              onError={() => setVideoFailed(true)}
              onPause={() => setVideoPaused(true)}
              onPlay={() => setVideoPaused(false)}
            >
              <source src="/media/hero-loop-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
              <source src="/media/hero-loop.mp4" type="video/mp4" />
            </video>
          ) : (
            <picture aria-hidden className="absolute inset-0 -z-10 opacity-70">
              <source srcSet="/media/hero-mobile.webp" media="(max-width: 768px)" />
              <img src="/media/hero-poster.webp" alt="" className="h-full w-full object-cover" />
            </picture>
          )}
        </div>

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

      {showVideo ? (
        <button
          type="button"
          onClick={toggleVideo}
          aria-pressed={videoPaused}
          aria-label={videoPaused ? "Play background video" : "Pause background video"}
          className="absolute right-4 top-4 z-10 rounded-full border border-border/70 bg-surface/60 px-3 py-1 text-xs text-muted backdrop-blur transition-colors hover:text-text"
        >
          {videoPaused ? "Play motion" : "Pause motion"}
        </button>
      ) : null}

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
