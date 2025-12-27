/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import CookieSettingsButton from "@/components/ui/CookieSettingsButton";
import { COOKIE_DETAILS } from "@/lib/cookie-details";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Taxat Cookie Policy explaining how we use cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  const categoryLabels: Record<string, string> = {
    necessary: "Strictly necessary",
    analytics: "Analytics",
    functional: "Functional",
    marketing: "Marketing",
  };

  return (
    <main className="relative pb-24 md:pb-28">
      <Section size="lg">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Legal</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
              Cookie Policy
            </h1>
            <p className="text-sm text-muted">Last updated: 26 December 2025</p>
          </div>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted">
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">1) Who we are</h2>
              <p>
                This Cookie Policy explains how Taxat ("Taxat", "we", "us", "our") uses cookies and
                similar technologies on:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>https://www.taxat.co.uk/ and any subdomains; and</li>
                <li>
                  any related pages or services that link to this Cookie Policy (together, the
                  "Site").
                </li>
              </ul>
              <div className="space-y-2">
                <div className="font-medium text-text">Contact</div>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Email:{" "}
                    <a
                      className="text-text underline decoration-border/70 underline-offset-4"
                      href="mailto:admin@taxat.co.uk"
                    >
                      admin@taxat.co.uk
                    </a>
                  </li>
                  <li>Postal address: London, United Kingdom</li>
                  <li>Company number: available on request (if applicable)</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">2) What are cookies and similar technologies?</h2>
              <p>
                Cookies are small text files that are stored on your device (computer, phone, or tablet) when you visit a website. We may
                also use similar technologies that store information on, or access information from, your device. For simplicity, we refer
                to all of these as "cookies" in this policy.
              </p>
              <p>Cookies can be:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Session cookies: deleted when you close your browser; or</li>
                <li>Persistent cookies: remain for a set period (their "expiry").</li>
              </ul>
              <p>Cookies can be:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>First-party: set by us (taxat.co.uk); or</li>
                <li>Third-party: set by other organisations whose tools or features we use.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">3) Why we use cookies</h2>
              <p>We use cookies to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Make the Site work properly and securely (strictly necessary).</li>
                <li>Remember your preferences (for example, cookie choices, language, display settings) where applicable.</li>
                <li>Measure and improve the Site (analytics or performance), if you allow us.</li>
                <li>Help us market Taxat and measure marketing performance (marketing), if you allow us.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">4) Cookie choices and consent</h2>
              <p>When you first visit the Site, we show a cookie banner. You can:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Accept all cookies;</li>
                <li>Reject non-essential cookies; or</li>
                <li>Choose cookie types via "Cookie settings".</li>
              </ul>
              <p>
                We will not place non-essential cookies (for example, analytics or marketing) unless you choose to enable them. You can
                change your choices at any time by clicking{" "}
                <CookieSettingsButton className="text-text underline decoration-border/70 underline-offset-4">
                  Cookie settings
                </CookieSettingsButton>
                .
              </p>
              <p>Where technically possible, we apply your choices across our subdomains.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">5) Types of cookies we use</h2>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">5.1 Strictly necessary cookies (always on)</h3>
                <p>These cookies are required for the Site to function and cannot be switched off in our systems. They are typically used for:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Security and fraud prevention;</li>
                  <li>Load balancing and basic site operation; and</li>
                  <li>Remembering your cookie preferences so we do not keep asking you on every page.</li>
                </ul>
                <p>If you disable these cookies in your browser, parts of the Site may not work properly.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">5.2 Analytics cookies (optional)</h3>
                <p>
                  If you enable analytics cookies, we use them to understand how visitors use our Site (for example, which pages are visited,
                  time on page, and errors), so we can improve it. Analytics cookies may be provided by us and/or third-party analytics
                  providers.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">5.3 Functional cookies (optional)</h3>
                <p>
                  If you enable functional cookies, they help us remember choices you make to provide enhanced functionality and
                  personalisation (for example, remembering preferences).
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">5.4 Marketing cookies (optional)</h3>
                <p>
                  If you enable marketing cookies, these cookies may be used to measure the effectiveness of marketing campaigns and/or to
                  help deliver relevant ads or content (where we use such tools). We do not set marketing cookies unless you choose to enable
                  them.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">6) Cookie details (names, providers, expiry)</h2>
              <p>
                Below (and in the "Cookie settings" panel) is the list of cookies we currently set, including cookie name, provider
                (first-party or third-party), category (necessary, analytics, functional, or marketing), purpose, and expiry or duration.
                We update this list whenever our cookies change.
              </p>
              <div className="grid gap-3 text-xs text-muted">
                {COOKIE_DETAILS.map((cookie) => (
                  <div key={cookie.name} className="rounded-xl border border-border/60 bg-surface/20 p-3">
                    <div className="text-sm font-medium text-text">{cookie.name}</div>
                    <div>Provider: {cookie.provider}</div>
                    <div>Category: {categoryLabels[cookie.category] ?? cookie.category}</div>
                    <div>Purpose: {cookie.purpose}</div>
                    <div>Expiry: {cookie.expiry}</div>
                    {cookie.setOn ? <div>Set when: {cookie.setOn}</div> : null}
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">7) Managing cookies in your browser</h2>
              <p>
                You can also manage cookies using your browser settings (for example, block or delete cookies). Each browser is different;
                you can usually find these controls under "Settings" or "Privacy".
              </p>
              <p>Please note: Blocking all cookies may affect Site functionality.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">8) Third-party features and embeds</h2>
              <p>
                If we embed third-party content (for example, video players, calendars, social media links, or other widgets), those third
                parties may set cookies or use similar technologies. We aim to list these in "Cookie settings" where they apply.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">9) Changes to this Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time (for example, if we change the cookies we use or if legal requirements
                change). We will update the "Last updated" date at the top.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </main>
  );
}
