"use client";

import Image from "next/image";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { AnimatePresence, motion } from "framer-motion";
import { Play, ShieldCheck } from "lucide-react";
import { useMemo, useRef, useState } from "react";

type Tab = {
  k: string;
  label: string;
  desc: string;
  image: string;
};

const tabs: Tab[] = [
  {
    k: "mission",
    label: "Mission Control",
    desc: "Portfolio health, what’s at risk today, and where your team should focus.",
    image: "/media/ui/mission-control.jpg",
  },
  {
    k: "client",
    label: "Client Overview",
    desc: "Single‑client view: Defence Score, risk flags, and the shortest path to fix gaps.",
    image: "/media/ui/client-overview.jpg",
  },
  {
    k: "explorer",
    label: "Defence Explorer",
    desc: "Drill into a return box and see how it is derived · RETURN → COMPUTE → EVIDENCE.",
    image: "/media/ui/defence-explorer.jpg",
  },
  {
    k: "autopilot",
    label: "Nightly Autopilot",
    desc: "Action queue: chase missing documents, resolve mismatches, prioritise review.",
    image: "/media/ui/autopilot.jpg",
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(tabs[0].k);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const tab = useMemo(() => tabs.find((t) => t.k === active) ?? tabs[0], [active]);

  const onPlay = async () => {
    const v = videoRef.current;
    track("video_play", { id: "product_tour" });
    setPlaying(true);
    try {
      await v?.play();
    } catch {
      // ignore autoplay constraints
      setPlaying(false);
    }
  };

  return (
    <Section id="demo" size="lg">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Badge tone="accent">Product proof</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            A control room for enquiry readiness.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            See mismatches early, trace figures to evidence, and standardise sign‑off across the team. Taxat is designed
            for explainability and governance · so your outputs are defensible, not “black box”.
          </p>

          <div className="mt-7 grid gap-2" role="tablist" aria-label="Product screens">
            {tabs.map((t) => {
              const is = t.k === active;
              const tabId = `product-tab-${t.k}`;
              const panelId = `product-panel-${t.k}`;
              return (
                <button
                  key={t.k}
                  className={cn(
                    "glow-border flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition-colors",
                    is
                      ? "border-accent/40 bg-accent/10"
                      : "border-border/60 bg-surface/25 hover:bg-surface/40"
                  )}
                  id={tabId}
                  role="tab"
                  aria-selected={is}
                  aria-controls={panelId}
                  tabIndex={is ? 0 : -1}
                  onClick={() => {
                    setActive(t.k);
                    track("product_tab_select", { tab: t.k });
                  }}
                >
                  <div className="mt-0.5 grid h-8 w-8 place-items-center rounded-xl border border-border/60 bg-surface/40">
                    <ShieldCheck className={cn("h-4 w-4", is ? "text-accent" : "text-muted")} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text">{t.label}</div>
                    <div className="mt-1 text-xs leading-relaxed text-muted">{t.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-border/60 bg-surface/25 p-5">
            <div className="text-sm font-medium text-text">60‑sec tour clip</div>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Watch a 60‑sec walkthrough of the core screens and workflow. Tap play when you’re ready.
            </p>
            <div className="mt-4">
              <Button
                intent="secondary"
                icon={<Play className="h-4 w-4" />}
                type="button"
                onClick={() => {
                  onPlay();
                }}
              >
                {playing ? "Playing…" : "Play tour"}
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="noise overflow-hidden rounded-none border border-border/60 bg-surface/20 shadow-glow">
            <div className="border-b border-border/60 bg-surface/40 px-6 py-4">
              <div className="text-sm font-medium text-text">{tab.label}</div>
              <div className="mt-1 text-sm text-muted">{tab.desc}</div>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab.k}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  transition={{ duration: 0.35 }}
                  className="grid gap-6"
                  role="tabpanel"
                  id={`product-panel-${tab.k}`}
                  aria-labelledby={`product-tab-${tab.k}`}
                  tabIndex={0}
                >
                  <Image
                    src={tab.image}
                    alt={tab.label}
                    width={2400}
                    height={1500}
                    className="rounded-none border border-border/60 shadow-glow"
                    priority={false}
                  />

                  <div className="rounded-2xl border border-border/60 bg-surface/30 p-4">
                    <div className="text-xs font-medium text-text">Governance snapshot</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      Every run can generate a manifest (data completeness, rules version, and explainable paths). This is
                      how the same figure can be defended months later · without relying on memory.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Video overlay: non-blocking, click-to-play */}
              <div className={cn("mt-6 overflow-hidden rounded-none border border-border/60 bg-black/30", !playing && "hidden")}>
                <video
                  ref={videoRef}
                  controls
                  preload="none"
                  poster="/media/hero-poster.webp"
                  className="h-full w-full"
                  muted
                  aria-label="Product tour video (muted)"
                  playsInline
                  onEnded={() => {
                    setPlaying(false);
                    track("video_complete", { id: "product_tour" });
                  }}
                >
                  <source src="/media/product-tour.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
