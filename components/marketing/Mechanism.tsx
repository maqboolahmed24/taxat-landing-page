import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import GradientText from "@/components/ui/GradientText";
import SignatureGraph from "./SignatureGraph";

export default function Mechanism() {
  return (
    <Section id="product" size="lg" className="relative">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Badge tone="accent">The new mechanism</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            Stop guessing.
            <br />
            <GradientText>Build an evidence‑backed return.</GradientText>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Taxat operationalises a defence‑first workflow: it reconciles client‑authorised data across sources, flags
            mismatches early, and links each return figure to its supporting evidence.
          </p>

          <div className="mt-7 grid gap-4">
            <Card>
              <div className="text-sm font-medium text-text">1) Compliance Risk Twin</div>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Independent “risk visibility” that surfaces cross‑source discrepancies and missing evidence · before you file.
              </p>
            </Card>

            <Card>
              <div className="text-sm font-medium text-text">2) Defence Graph</div>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                A living evidence map: every figure is traceable to transactions, receipts, and rules · ready for enquiry.
              </p>
            </Card>

            <Card>
              <div className="text-sm font-medium text-text">3) Defence Score + Autopilot</div>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Quantify readiness (0-100), then generate a prioritised action list so teams fix the biggest gaps first.
              </p>
            </Card>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="noise relative rounded-3xl border border-border/60 bg-surface/25 p-6 shadow-glow">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="font-medium text-text">Interactive defence graph</div>
                <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted">
                  Hover nodes to see how a single return box links to evidence groups (transactions, documents, rules).
                  Confirmed links render as solid paths; suggested links render as dashed.
                </p>
              </div>
              <Badge>Sample view</Badge>
            </div>

            <div className="mt-6">
              <SignatureGraph />
            </div>

            <div className="mt-5 text-xs leading-relaxed text-muted">
              The goal: if a figure is questioned later, you can retrieve its supporting chain in seconds · without trawling
              emails and folders.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
