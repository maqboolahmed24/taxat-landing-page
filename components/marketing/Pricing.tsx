import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { Check } from "lucide-react";

const included = [
  "Compliance Risk Twin (cross‑source flags)",
  "Defence Graph evidence linking",
  "Defence Score (0-100) per client",
  "Nightly Autopilot action queue",
  "Audit pack / defence report export",
  "Governed runs (rules + manifests)",
];

export default function Pricing() {
  return (
    <Section size="lg">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Badge tone="accent">Beta programme</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            Closed beta for select firms.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            We’re onboarding a limited number of UK practices to validate workflow fit, calibrate risk rules, and ship the
            best possible “defence-first” UX before broad release.
          </p>

          <p className="mt-6 text-sm text-muted">
            <GradientText>Early adopters</GradientText> typically receive onboarding support and preferential pricing once
            the beta closes (exact terms depend on cohort and integrations).
          </p>
        </div>

        <div className="md:col-span-7">
          <Card className="p-7">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-sm font-medium text-text">Design partner seat</div>
                <div className="mt-1 text-sm text-muted">Limited beta access · Feedback loop · Priority roadmap input</div>
              </div>
              <div className="rounded-2xl border border-border/60 bg-surface/40 px-4 py-2 text-sm text-muted">
                Invite only
              </div>
            </div>

            <div className="mt-6 grid gap-2 text-sm text-muted sm:grid-cols-2">
              {included.map((item) => (
                <div key={item} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button intent="primary" href="#beta">
                Request beta
              </Button>
              <Button intent="secondary" href="#demo">
                View product
              </Button>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted">
              Note: Taxat is independent and not affiliated with HMRC. It uses authorised HMRC APIs only where permitted
              by the user.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}
