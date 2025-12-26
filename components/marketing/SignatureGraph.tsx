"use client";

import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, HelpCircle, Link2, MinusCircle } from "lucide-react";
import { useMemo, useState } from "react";

type Status = "COMPLETE" | "PARTIAL" | "NO_EVIDENCE";
type Confidence = "CONFIRMED" | "INFERRED";

type Box = {
  id: string;
  label: string;
  amount: string;
  status: Status;
};

type Node = {
  id: string;
  x: number;
  y: number;
  label: string;
  kind: "RETURN" | "COMPUTE" | "TRANSACTION_GROUP" | "EVIDENCE_GROUP" | "RULE";
};

type Edge = {
  from: string;
  to: string;
  confidence: Confidence;
};

const boxes: Box[] = [
  { id: "turnover", label: "Turnover", amount: "£128,400", status: "COMPLETE" },
  { id: "expenses", label: "Total expenses", amount: "£47,980", status: "PARTIAL" },
  { id: "rental", label: "Rental income", amount: "£21,600", status: "PARTIAL" },
  { id: "cg", label: "Capital gains", amount: "£0", status: "NO_EVIDENCE" },
];

const nodes: Node[] = [
  { id: "box", x: 120, y: 90, label: "Return box", kind: "RETURN" },
  { id: "compute", x: 330, y: 90, label: "Taxat compute", kind: "COMPUTE" },

  { id: "bank", x: 520, y: 46, label: "Bank matches", kind: "TRANSACTION_GROUP" },
  { id: "ledger", x: 520, y: 130, label: "Ledger lines", kind: "TRANSACTION_GROUP" },

  { id: "invoices", x: 650, y: 66, label: "Invoices", kind: "EVIDENCE_GROUP" },
  { id: "receipts", x: 650, y: 156, label: "Receipts", kind: "EVIDENCE_GROUP" },

  { id: "rules", x: 330, y: 240, label: "SA rules v2024-25", kind: "RULE" },
  { id: "hmrc", x: 520, y: 240, label: "Authorised HMRC data", kind: "EVIDENCE_GROUP" },
];

const edgesByBox: Record<string, Edge[]> = {
  turnover: [
    { from: "box", to: "compute", confidence: "CONFIRMED" },
    { from: "compute", to: "ledger", confidence: "CONFIRMED" },
    { from: "ledger", to: "invoices", confidence: "CONFIRMED" },
    { from: "compute", to: "bank", confidence: "CONFIRMED" },
    { from: "bank", to: "invoices", confidence: "INFERRED" },
    { from: "compute", to: "rules", confidence: "CONFIRMED" },
  ],
  expenses: [
    { from: "box", to: "compute", confidence: "CONFIRMED" },
    { from: "compute", to: "ledger", confidence: "CONFIRMED" },
    { from: "ledger", to: "receipts", confidence: "INFERRED" },
    { from: "compute", to: "rules", confidence: "CONFIRMED" },
  ],
  rental: [
    { from: "box", to: "compute", confidence: "CONFIRMED" },
    { from: "compute", to: "bank", confidence: "CONFIRMED" },
    { from: "bank", to: "hmrc", confidence: "CONFIRMED" },
    { from: "compute", to: "rules", confidence: "CONFIRMED" },
  ],
  cg: [
    { from: "box", to: "compute", confidence: "CONFIRMED" },
    { from: "compute", to: "rules", confidence: "CONFIRMED" },
  ],
};

function statusIcon(status: Status) {
  if (status === "COMPLETE") return <CheckCircle2 className="h-4 w-4 text-success" />;
  if (status === "PARTIAL") return <HelpCircle className="h-4 w-4 text-warn" />;
  return <MinusCircle className="h-4 w-4 text-danger" />;
}

export default function SignatureGraph() {
  const [selected, setSelected] = useState<Box>(boxes[0]);
  const titleId = "defence-graph-title";
  const descId = "defence-graph-desc";

  const edges = useMemo(() => edgesByBox[selected.id] ?? [], [selected.id]);
  const activeNodeIds = useMemo(() => {
    const s = new Set<string>();
    edges.forEach((e) => {
      s.add(e.from);
      s.add(e.to);
    });
    return s;
  }, [edges]);

  const score = selected.status === "COMPLETE" ? 96 : selected.status === "PARTIAL" ? 71 : 22;

  const nodeById = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), []);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)]">
      {/* Left panel: boxes */}
      <div>
        <div className="rounded-2xl border border-border/60 bg-surface/40 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-text whitespace-nowrap">Return boxes</div>
            <div className="text-xs text-muted whitespace-nowrap">Sample view</div>
          </div>

          <div className="mt-3 grid gap-2">
            {boxes.map((b) => {
              const is = b.id === selected.id;
              return (
                <button
                  key={b.id}
                  className={cn(
                    "glow-border flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left transition-colors",
                    is
                      ? "border-accent/40 bg-accent/10"
                      : "border-border/60 bg-surface/30 hover:bg-surface/50"
                  )}
                  onClick={() => setSelected(b)}
                  aria-pressed={is}
                >
                  <span className="grid">
                    <span className="flex items-center gap-2 text-sm text-text">
                      {statusIcon(b.status)}
                      {b.label}
                    </span>
                    <span className="text-xs text-muted">{b.amount}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs text-muted">
                    <Link2 className="h-3.5 w-3.5" />
                    Path
                  </span>
                </button>
              );
            })}
          </div>

          {/* Defence score */}
          <div className="mt-4 rounded-xl border border-border/60 bg-surface/30 p-3">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted whitespace-nowrap">Defence Score</div>
              <div className="text-xs text-muted whitespace-nowrap">0-100</div>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="relative grid h-12 w-12 place-items-center rounded-full border border-border/70 bg-surface/40">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(hsl(var(--accent)) ${score * 3.6}deg, hsl(var(--border) / 0.6) 0deg)`,
                    maskImage: "radial-gradient(circle at center, transparent 56%, black 57%)",
                  }}
                />
                <div className="text-sm font-semibold text-text">{score}</div>
              </div>
              <div className="text-sm leading-snug">
                <div className="font-medium text-text">
                  {selected.status === "COMPLETE"
                    ? "Enquiry‑ready"
                    : selected.status === "PARTIAL"
                      ? "Gaps to fix"
                      : "Missing evidence"}
                </div>
                <div className="text-xs text-muted">
                  {selected.status === "COMPLETE"
                    ? "All key links confirmed."
                    : selected.status === "PARTIAL"
                      ? "Some links inferred · chase documents."
                      : "No data to justify this figure."}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-muted">
            Confirmed links render as <span className="text-text/80">solid</span>. AI‑suggested links render as{" "}
            <span className="text-text/80">dashed</span> with explicit labelling.
          </p>
        </div>
      </div>

      {/* Graph */}
      <div>
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface/20 p-4">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,hsl(var(--border)/0.55)_1px,transparent_0)] [background-size:26px_26px] [mask-image:radial-gradient(60%_60%_at_55%_40%,black,transparent)]"
          />

          <svg
            viewBox="0 0 760 320"
            className="relative z-10 h-[320px] w-full"
            role="img"
            aria-labelledby={`${titleId} ${descId}`}
          >
            <title id={titleId}>Defence graph sample</title>
            <desc id={descId}>
              A sample graph linking a return box to compute steps, transaction groups, evidence groups, and rules.
            </desc>
            {/* Edges */}
            {edges.map((e, idx) => {
              const a = nodeById[e.from];
              const b = nodeById[e.to];
              if (!a || !b) return null;

              const isInferred = e.confidence === "INFERRED";
              const isActive = activeNodeIds.has(e.from) && activeNodeIds.has(e.to);

              return (
                <motion.line
                  key={`${e.from}-${e.to}-${idx}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: isActive ? 1 : 0.55 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 + idx * 0.03 }}
                  stroke={isActive ? "hsl(var(--accent))" : "hsl(var(--border) / 0.9)"}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray={isInferred ? "7 7" : "0"}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((n, idx) => {
              const active = activeNodeIds.has(n.id);
              const isBox = n.kind === "RETURN";
              const fill = active ? "hsl(var(--accent) / 0.14)" : "hsl(var(--surface) / 0.75)";
              const stroke = active ? "hsl(var(--accent))" : "hsl(var(--border) / 0.9)";

              return (
                <g key={n.id}>
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    r={isBox ? 26 : 22}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: active ? 1 : 0.98, opacity: 1 }}
                    transition={{ duration: 0.35, delay: 0.05 + idx * 0.01 }}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={2}
                  />
                  <text
                    x={n.x}
                    y={n.y + 44}
                    textAnchor="middle"
                    className={cn(
                      "select-none text-[12px] font-medium",
                      active ? "fill-[hsl(var(--text))]" : "fill-[hsl(var(--muted))]"
                    )}
                  >
                    {n.label}
                  </text>

                  {active && (n.kind === "EVIDENCE_GROUP" || n.kind === "TRANSACTION_GROUP") ? (
                    <motion.text
                      x={n.x}
                      y={n.y - 32}
                      textAnchor="middle"
                      className="select-none text-[10px] fill-[hsl(var(--muted))]"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {edges.some((e) => e.to === n.id && e.confidence === "INFERRED") ? "AI‑suggested" : "Confirmed"}
                    </motion.text>
                  ) : null}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="h-[2px] w-10 rounded-full bg-accent/80" /> Confirmed edge
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-[2px] w-10 rounded-full bg-border/80 [background-image:repeating-linear-gradient(90deg,hsl(var(--border)/0.95)_0_8px,transparent_8px_14px)]" /> Inferred edge
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="mt-3 rounded-xl border border-border/60 bg-surface/35 p-3 text-xs leading-relaxed text-muted"
            >
              <span className="font-medium text-text">{selected.label}:</span>{" "}
              {selected.status === "COMPLETE"
                ? "Evidence coverage looks solid across sources."
                : selected.status === "PARTIAL"
                  ? "Some evidence links are inferred · chase missing documents to harden the path."
                  : "No evidence path available · Taxat would block compliance-grade sign‑off until data is present."}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
