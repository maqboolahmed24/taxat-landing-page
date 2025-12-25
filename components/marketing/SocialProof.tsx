import Image from "next/image";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";

const logos = [
  { src: "/media/logos/xero.svg", alt: "Xero" },
  { src: "/media/logos/quickbooks.svg", alt: "QuickBooks" },
  { src: "/media/logos/sage.svg", alt: "Sage" },
  { src: "/media/logos/taxcalc.svg", alt: "TaxCalc" },
  { src: "/media/logos/openbanking.svg", alt: "Open Banking" },
  { src: "/media/logos/hmrcapi.svg", alt: "HMRC APIs" },
];

export default function SocialProof() {
  return (
    <Section className="pt-6 md:pt-10" size="sm">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <div className="text-sm text-muted">Built to sit above your existing stack</div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge tone="accent">Integrations-first</Badge>
            <Badge>Works alongside filing tools</Badge>
            <Badge tone="warn">No rip-and-replace</Badge>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:w-auto md:grid-cols-6">
          {logos.map((l) => (
            <div
              key={l.alt}
              className="rounded-2xl border border-border/60 bg-surface/25 p-3 shadow-glow"
            >
              <Image src={l.src} alt={l.alt} width={220} height={64} className="h-10 w-auto opacity-90" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
