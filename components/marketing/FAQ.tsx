import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import Accordion, { type FAQItem } from "@/components/ui/Accordion";

const items: FAQItem[] = [
  {
    q: "Do we have to switch tools to use Taxat?",
    a: "No. Taxat is designed to sit above your existing stack. You keep your filing and bookkeeping tools · Taxat provides a defence/risk layer before submission.",
  },
  {
    q: "Is Taxat connected to HMRC Connect?",
    a: "No. Taxat is not affiliated with HMRC and does not access HMRC internal systems or models. Where permitted, it can use official HMRC APIs that the taxpayer/agent authorises.",
  },
  {
    q: "How long does onboarding take?",
    a: "Most firms can start with a small cohort (10-20 clients) and expand. Initial setup depends on data sources, but the goal is a smooth onboarding that fits peak season.",
  },
  {
    q: "What does the Defence Score mean?",
    a: "A 0-100 indicator of how well supported a return is by evidence and reconciled sources. Lower scores highlight what to fix before filing · missing documents, mismatches, or incomplete data.",
  },
  {
    q: "How do you handle inferred links vs confirmed evidence?",
    a: "Confirmed links are shown as solid paths. Any inferred connection is clearly labelled as AI‑suggested, with explainability. In compliance‑grade mode, policy can require confirmed evidence only.",
  },
];

export default function FAQ() {
  return (
    <Section id="faq" size="lg">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Badge tone="accent">FAQ</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            Answers to the real objections.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Taxat touches sensitive workflows. We keep expectations clear on HMRC affiliation, explainability, and how it
            fits alongside your existing tools.
          </p>
        </div>

        <div className="md:col-span-7">
          <Accordion items={items} />
        </div>
      </div>
    </Section>
  );
}
