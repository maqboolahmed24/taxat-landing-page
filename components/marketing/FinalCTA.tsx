"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import { Field, TextAreaField } from "@/components/ui/Field";
import { track } from "@/lib/analytics";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export default function FinalCTA() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setState("loading");
    setError(null);
    track("form_start", { form: "beta" });

    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      setState("success");
      track("form_submit", { form: "beta" });
    } catch (e: any) {
      setState("error");
      setError("Something went wrong. Please try again or email admin@taxat.co.uk");
      track("form_error", { form: "beta" });
    }
  }

  return (
    <Section id="beta" size="lg">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Badge tone="accent">Request beta access</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
            Be enquiry‑ready this season · <GradientText>without extra headcount</GradientText>.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Join the closed beta as a design partner. We’ll prioritise firms that handle high Self Assessment volumes and
            want a repeatable, evidence‑linked sign‑off process.
          </p>

          <div className="mt-6 rounded-2xl border border-border/60 bg-surface/25 p-5">
            <div className="text-sm font-medium text-text">Prefer a demo first?</div>
            <p className="mt-1 text-sm leading-relaxed text-muted">Add your details and we’ll reach out to schedule a demo.</p>
            <div className="mt-4">
              <Button
                intent="secondary"
                href="mailto:admin@taxat.co.uk?subject=Taxat%20Demo%20Request"
                onClick={() => track("cta_secondary_click", { location: "finalcta_email" })}
              >
                Email for a demo
              </Button>
            </div>
          </div>

          <p className="mt-6 text-xs leading-relaxed text-muted">
            Not affiliated with HMRC. Taxat does not access HMRC internal systems or replicate investigation decisioning.
          </p>
        </div>

        <div className="md:col-span-7">
          <Card className="p-7">
            {state === "success" ? (
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                  <div className="font-medium text-text">Request received</div>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  Thanks · we’ll review your request and get back to you. If you’d like to speed things up, send any
                  screenshots of your current workflow and stack to{" "}
                  <a className="text-text underline decoration-border/70 underline-offset-4" href="mailto:admin@taxat.co.uk">
                    admin@taxat.co.uk
                  </a>
                  .
                </p>
                <Button intent="secondary" onClick={() => setState("idle")}>
                  Submit another response
                </Button>
              </div>
            ) : (
              <form
                className="grid gap-4"
                action={(fd) => {
                  // Next.js server actions not required here; keep it simple for portability.
                  void onSubmit(fd);
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-text">Beta request</div>
                    <div className="mt-1 text-sm text-muted">Short form · under a minute</div>
                  </div>
                  <Button
                    intent="primary"
                    size="sm"
                    icon={<ArrowRight className="h-4 w-4" />}
                    disabled={state === "loading"}
                    type="submit"
                  >
                    {state === "loading" ? "Sending…" : "Request beta"}
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field name="name" label="Name" placeholder="Your name" required />
                  <Field name="email" type="email" label="Work email" placeholder="name@firm.co.uk" required />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    <span className="text-text/90">Firm size</span>
                    <select
                      name="firmSize"
                      required
                      className="h-11 rounded-xl border border-border/80 bg-surface/40 px-4 text-text"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      <option>Solo</option>
                      <option>2-4 staff</option>
                      <option>5-10 staff</option>
                      <option>11-50 staff</option>
                      <option>50+ staff</option>
                    </select>
                    <span className="text-xs text-muted">We prioritise practices with repeatable workflows to validate.</span>
                  </label>

                  <label className="grid gap-2 text-sm">
                    <span className="text-text/90">Self Assessment clients / year</span>
                    <select
                      name="saVolume"
                      required
                      className="h-11 rounded-xl border border-border/80 bg-surface/40 px-4 text-text"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      <option>&lt; 100</option>
                      <option>100-250</option>
                      <option>250-500</option>
                      <option>500-1000</option>
                      <option>1000+</option>
                    </select>
                    <span className="text-xs text-muted">Rough estimate is fine.</span>
                  </label>
                </div>

                <Field name="stack" label="Current stack" placeholder="e.g., Xero + Dext + TaxCalc" />
                <TextAreaField
                  name="notes"
                  label="What would make Taxat a no-brainer for you?"
                  placeholder="Biggest pain, missing evidence problems, enquiry anxiety, peak season bottlenecks..."
                />

                {state === "error" && error ? (
                  <p className="text-sm text-danger">{error}</p>
                ) : null}

                <p className="text-xs leading-relaxed text-muted">
                  By submitting, you agree to be contacted about the beta. No spam. No HMRC affiliation implied.
                </p>
              </form>
            )}
          </Card>
        </div>
      </div>
    </Section>
  );
}
