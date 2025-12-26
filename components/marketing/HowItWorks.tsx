"use client";

import Image from "next/image";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

type Step = {
  k: string;
  title: string;
  desc: string;
  bullets: string[];
  image: string;
};

const steps: Step[] = [
  {
    k: "connect",
    title: "Connect sources",
    desc: "Bring together the evidence you already have · without changing your filing tool.",
    bullets: [
      "Ledger exports/APIs (Xero, QBO, Sage)",
      "Bank feeds via Open Banking",
      "Receipts + invoices (capture tools or uploads)",
      "Optional HMRC endpoints where authorised",
    ],
    image: "/media/ui/client-overview.jpg",
  },
  {
    k: "run",
    title: "Run Taxat",
    desc: "Taxat reconciles, flags mismatches, and builds a defence graph in minutes.",
    bullets: [
      "Compliance Risk Twin (explainable discrepancy flags)",
      "Defence Graph linking each return figure to evidence",
      "Defence Score (0-100) to quantify readiness",
    ],
    image: "/media/ui/defence-explorer.jpg",
  },
  {
    k: "file",
    title: "File with confidence",
    desc: "Export a defence pack and action list · so your sign‑off is repeatable and defensible.",
    bullets: [
      "Nightly Autopilot tasks for missing evidence",
      "Audit pack / Defence report export (PDF)",
      "Governed, replayable computation (versioned rules)",
    ],
    image: "/media/ui/mission-control.jpg",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(steps[0].k);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const step = useMemo(() => steps.find((s) => s.k === active) ?? steps[0], [active]);
  const moveFocus = (nextIndex: number) => {
    const next = steps[nextIndex];
    setActive(next.k);
    requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveFocus((idx + 1) % steps.length);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus((idx - 1 + steps.length) % steps.length);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      moveFocus(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      moveFocus(steps.length - 1);
    }
  };

  return (
    <Section id="how" size="lg">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Badge tone="accent">How it works</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            A defence workflow your team can repeat.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Taxat is designed to sit above your practice stack. It turns evidence and reconciliation into a system that
            scales with clients · without adding headcount.
          </p>

          <div
            className="mt-7 grid gap-2"
            role="tablist"
            aria-label="How it works steps"
            aria-orientation="vertical"
          >
            {steps.map((s, idx) => {
              const is = s.k === active;
              const tabId = `how-tab-${s.k}`;
              const panelId = `how-panel-${s.k}`;
              return (
                <button
                  key={s.k}
                  className={cn(
                    "group glow-border flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition-colors",
                    is
                      ? "border-accent/40 bg-accent/10"
                      : "border-border/60 bg-surface/25 hover:bg-surface/40"
                  )}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  id={tabId}
                  role="tab"
                  aria-selected={is}
                  aria-controls={panelId}
                  tabIndex={is ? 0 : -1}
                  onKeyDown={(event) => onKeyDown(event, idx)}
                  onClick={() => {
                    setActive(s.k);
                    track("how_step_select", { step: s.k });
                  }}
                >
                  <div className="mt-0.5 grid h-6 w-6 place-items-center rounded-lg border border-border/60 bg-surface/40 text-xs text-muted group-hover:text-text">
                    {idx + 1}
                  </div>
                  <div>
                    <div className={cn("text-sm font-medium", is ? "text-text" : "text-text/90")}>{s.title}</div>
                    <div className="mt-1 text-xs leading-relaxed text-muted">{s.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            <Button
              intent="primary"
              href="#beta"
              icon={<ArrowRight className="h-4 w-4" />}
              onClick={() => track("cta_primary_click", { location: "how_it_works" })}
            >
              Request beta
            </Button>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="noise overflow-hidden rounded-none border border-border/60 bg-surface/20 shadow-glow">
            <div className="border-b border-border/60 bg-surface/40 px-6 py-4">
              <div className="text-sm font-medium text-text">{step.title}</div>
              <div className="mt-1 text-sm text-muted">{step.desc}</div>
            </div>

            <div className="p-6">
              <div className="relative">
                {steps.map((s) => {
                  const isActive = s.k === active;
                  return (
                    <motion.div
                      key={s.k}
                      initial={false}
                      animate={
                        isActive
                          ? { opacity: 1, y: 0, filter: "blur(0px)" }
                          : { opacity: 0, y: 10, filter: "blur(8px)" }
                      }
                      transition={{ duration: 0.35 }}
                      className={cn(
                        "grid gap-6 lg:grid-cols-12",
                        isActive ? "relative" : "pointer-events-none absolute inset-0"
                      )}
                      role="tabpanel"
                      id={`how-panel-${s.k}`}
                      aria-labelledby={`how-tab-${s.k}`}
                      aria-hidden={!isActive}
                      tabIndex={isActive ? 0 : -1}
                    >
                      <div className="lg:col-span-7">
                        <Image
                          src={s.image}
                          alt={s.title}
                          width={2400}
                          height={1500}
                          className="rounded-none border border-border/60 shadow-glow"
                          sizes="(min-width: 1024px) 58vw, 100vw"
                        />
                      </div>
                      <div className="lg:col-span-5">
                        <div className="text-sm font-medium text-text">You get</div>
                        <ul className="mt-3 grid gap-2 text-sm text-muted">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex gap-2">
                              <span className="mt-2 h-1 w-1 rounded-full bg-accent/80" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 rounded-2xl border border-border/60 bg-surface/30 p-4">
                          <div className="text-xs font-medium text-text">Clarity by design</div>
                          <div className="mt-1 text-xs leading-relaxed text-muted">
                            Confirmed and inferred links are clearly labelled so reviewers know what’s verified.
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
