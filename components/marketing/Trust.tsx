import Image from "next/image";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import GradientText from "@/components/ui/GradientText";
import { Lock, Shield, FileCheck2, Waves } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "Not an HMRC product",
    desc: "Taxat is independent. It does not access HMRC internal systems or reproduce investigation decisioning.",
  },
  {
    icon: Lock,
    title: "Encryption & access control",
    desc: "Built for sensitive financial data: encrypted transport, encrypted storage, and role‑based access.",
  },
  {
    icon: FileCheck2,
    title: "Governed outputs",
    desc: "Evidence links, rule versions, and explainable paths support firm due diligence and consistent sign‑off.",
  },
  {
    icon: Waves,
    title: "Reduced‑risk workflow",
    desc: "Autopilot highlights missing evidence and anomalies early · so nothing slips through peak season.",
  },
];

export default function Trust() {
  return (
    <Section id="security" size="lg" className="relative">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Badge tone="accent">Trust & security</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            Built for regulated data and firm due diligence.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Taxat is designed for explainability and governance. The outputs are evidence‑linked and reproducible · so your
            firm can defend filings without over‑claiming how HMRC works.
          </p>

          <p className="mt-6 text-sm text-muted">
            <GradientText>Security materials are available on request</GradientText> (policy outline, data flows, and
            controls).
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="noise relative overflow-hidden rounded-3xl border border-border/60 bg-surface/30 shadow-glow">
            <Image
              src="/media/still-2.webp"
              alt=""
              aria-hidden
              width={2400}
              height={1350}
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.65),transparent_55%)]" />

            <div className="relative grid gap-4 p-6 md:grid-cols-2">
              {items.map((it) => {
                const Icon = it.icon;
                return (
                  <Card key={it.title} className="bg-surface/55" hover={false}>
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-surface/40">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-text">{it.title}</div>
                        <div className="mt-1 text-sm leading-relaxed text-muted">{it.desc}</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="relative px-6 pb-6 text-xs leading-relaxed text-muted">
              Compliance‑grade views are available when data is complete. If data is incomplete, previews are clearly
              labelled as analysis‑only.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
