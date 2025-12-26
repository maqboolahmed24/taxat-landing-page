import Image from "next/image";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import GradientText from "@/components/ui/GradientText";

export default function Problem() {
  return (
    <Section size="lg" className="relative">
      <div className="grid items-start gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            HMRC scrutiny is rising.
            <br />
            <span className="text-muted">Defensive work is eating your week.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Accountants are forced into manual cross‑checks because enquiry risk feels like a black box. The result is
            time pressure, stress, and fragile evidence when a figure is questioned months later.
          </p>

          <div className="mt-6 grid gap-4">
            <Card>
              <div className="text-sm font-medium text-text">Time drain</div>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Defensive reconciliation, spreadsheet checks, and document chasing · repeated client‑by‑client.
              </p>
            </Card>
            <Card>
              <div className="text-sm font-medium text-text">Anxiety</div>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Even when you’re diligent, you can’t see what data mismatches might look suspicious across sources.
              </p>
            </Card>
            <Card>
              <div className="text-sm font-medium text-text">Fragmented evidence</div>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Ledger, bank feed, receipts, and emails live in different systems · so “prove it” becomes a scramble.
              </p>
            </Card>
          </div>

          <p className="mt-6 text-sm text-muted">
            <GradientText>Taxat turns defensive work into a governed system</GradientText> · so enquiry readiness becomes a
            repeatable sign‑off, not a late‑night checklist.
          </p>
        </div>

        <div className="md:col-span-6 md:mt-[19.55rem]">
          <div className="noise relative overflow-hidden rounded-3xl border border-border/60 bg-surface/30 shadow-glow">
            <Image
              src="/media/still-1.webp"
              alt=""
              aria-hidden
              width={2400}
              height={1350}
              className="h-full w-full object-cover opacity-90"
              priority={false}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,hsl(var(--accent)/0.20),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent_55%)]" />

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-border/60 bg-surface/60 p-5 backdrop-blur">
              <div className="text-sm font-medium text-text">The cost of “just in case”</div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Manual defensive checks scale linearly with clients · and peak season amplifies everything. Taxat aims to
                reduce the cognitive load by turning evidence and reconciliation into an automated graph.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
