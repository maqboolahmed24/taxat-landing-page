import Section from "@/components/ui/Section";
import GradientText from "@/components/ui/GradientText";
import CurrentYear from "@/components/ui/CurrentYear";
import CookieSettingsButton from "@/components/ui/CookieSettingsButton";

export default function Footer() {
  return (
    <footer className="border-t border-border/60">
      <Section size="sm" className="py-10">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-display text-lg font-semibold text-text">Taxat</div>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              <GradientText>Defence‑ready returns</GradientText> · evidence‑linked, explainable, and designed for UK
              accounting practices.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Not affiliated with HMRC. Taxat uses authorised HMRC APIs only where permitted by the user.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid items-start gap-6 sm:grid-cols-3">
              <div className="grid gap-2 text-sm">
                <div className="font-medium text-text">Product</div>
                <a className="text-muted hover:text-text" href="#product">
                  Overview
                </a>
                <a className="text-muted hover:text-text" href="#how">
                  How it works
                </a>
                <a className="text-muted hover:text-text" href="#demo">
                  Product tour
                </a>
              </div>

              <div className="grid gap-2 text-sm">
                <div className="font-medium text-text">Trust</div>
                <a className="text-muted hover:text-text" href="#security">
                  Security
                </a>
                <a className="text-muted hover:text-text" href="#faq">
                  FAQ
                </a>
                <a className="text-muted hover:text-text" href="/privacy">
                  Privacy notice
                </a>
                <a className="text-muted hover:text-text" href="/cookies">
                  Cookie policy
                </a>
                <CookieSettingsButton className="text-left" />
                <a className="text-muted hover:text-text" href="#beta">
                  Request beta
                </a>
              </div>

              <div className="grid gap-2 text-sm">
                <div className="font-medium text-text">Contact</div>
                <a className="text-muted hover:text-text" href="mailto:admin@taxat.co.uk">
                  admin@taxat.co.uk
                </a>
                <a
                  className="text-muted hover:text-text"
                  href="https://www.linkedin.com/company/taxatdefence/"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px w-full hairline" />

        <div className="mt-6 flex flex-col gap-2 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <div>© <CurrentYear /> Taxat. All rights reserved.</div>
        </div>
      </Section>
    </footer>
  );
}
