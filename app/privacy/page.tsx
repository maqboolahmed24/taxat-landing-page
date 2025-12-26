import type { Metadata } from "next";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "Taxat Privacy Notice explaining how we collect, use, share, and protect personal data.",
};

export default function PrivacyNoticePage() {
  return (
    <main className="relative pb-24 md:pb-28">
      <Section size="lg">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Legal</p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
              Privacy Notice
            </h1>
            <p className="text-sm text-muted">Last updated: 26 December 2025</p>
          </div>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted">
            <section className="space-y-3">
              <p>
                This Privacy Notice explains how Taxat ("Taxat", "we", "us", "our") collects, uses,
                shares and protects personal data.
              </p>
              <p>
                Taxat is an AI-driven defence and evidence-linking layer for UK accountants. It can
                reconcile client-authorised data across bookkeeping ledgers, bank feeds (via Open
                Banking), receipts/invoices, and (where authorised) HMRC APIs, and generates
                evidence-linked outputs such as a "Defence Graph", "Defence Score" and related
                discrepancy flags to support pre-filing review. (Taxat is not affiliated with HMRC.)
              </p>
              <p>This notice covers:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Visitors to our website (taxat.co.uk)</li>
                <li>People who request beta access, a demo, or join our updates list</li>
                <li>Users of the Taxat platform (e.g., accounting firm team members)</li>
                <li>
                  Individuals whose data may be processed within the Taxat platform by an accounting
                  firm (e.g., the accounting firm's end-clients)
                </li>
              </ul>
              <p>
                If you are an end-client of an accountant using Taxat: Your accountant is usually
                the organisation responsible for deciding why and how your personal data is used in
                the Taxat platform (the "controller"). Taxat generally acts as the accountant's
                service provider and processes personal data on the accountant's instructions (a
                "processor"). See Section 3 (Our role).
              </p>
              <p>If you have questions about this notice or our data practices, contact us using the details in Section 2.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">1) Key definitions</h2>
              <ul className="grid gap-2">
                <li>
                  <span className="font-medium text-text">"Personal data"</span> means information that
                  relates to an identified or identifiable individual.
                </li>
                <li>
                  <span className="font-medium text-text">"Controller"</span> means the organisation
                  that decides why and how personal data is processed.
                </li>
                <li>
                  <span className="font-medium text-text">"Processor"</span> means the organisation that
                  processes personal data on behalf of a controller.
                </li>
                <li>
                  <span className="font-medium text-text">"Platform"</span> means the Taxat web
                  application, related services, and integrations.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">2) Who we are (controller details)</h2>
              <p>Taxat is the trading name of:</p>
              <ul className="grid gap-2">
                <li>Legal name: [Taxat Ltd / full legal entity name]</li>
                <li>Company number: [TBD]</li>
                <li>Registered office: London, United Kingdom</li>
                <li>Main address (if different): London, United Kingdom</li>
                <li>
                  Email:{" "}
                  <a
                    className="text-text underline decoration-border/70 underline-offset-4"
                    href="mailto:admin@taxat.co.uk"
                  >
                    admin@taxat.co.uk
                  </a>
                </li>
              </ul>
              <p>
                If you are a regulated firm performing due diligence, we can provide security and
                governance materials on request (e.g., data flow summary, policy outlines, and
                controls), subject to appropriate confidentiality terms.
              </p>
              <div className="space-y-2">
                <div className="font-medium text-text">Data Protection Officer (DPO):</div>
                <p>
                  A) We have not appointed a DPO. Please direct privacy queries to{" "}
                  <a
                    className="text-text underline decoration-border/70 underline-offset-4"
                    href="mailto:admin@taxat.co.uk"
                  >
                    admin@taxat.co.uk
                  </a>
                  .
                </p>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-text">UK supervisory authority:</div>
                <p>
                  The Information Commissioner's Office (ICO) is the UK regulator for data
                  protection. You can complain to the ICO if you are unhappy with how we handle your
                  personal data (see Section 14).
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">
                3) Our role: when we are a controller vs a processor
              </h2>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">A) When Taxat is a controller</h3>
                <p>We are a controller for personal data we process:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>to operate and secure our website,</li>
                  <li>to respond to enquiries, beta requests and demo requests,</li>
                  <li>to manage our relationship with business contacts and platform users at accounting firms,</li>
                  <li>to administer accounts, billing, and platform access for firm users,</li>
                  <li>to market to business contacts where permitted, and</li>
                  <li>to comply with our legal obligations.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">B) When Taxat is a processor</h3>
                <p>
                  When an accounting firm uses Taxat in connection with its end-clients (taxpayers),
                  the firm typically determines:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>what client data to upload/connect,</li>
                  <li>the purpose for using Taxat (e.g., preparing/defending a Self Assessment filing),</li>
                  <li>who can access outputs,</li>
                  <li>how long data should be retained,</li>
                </ul>
                <p>
                  and Taxat processes that data on the firm's instructions under a Data Processing
                  Agreement (DPA).
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">
                  C) When Taxat may be an independent controller for limited purposes
                </h3>
                <p>In limited circumstances, we may act as an independent controller for:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>security monitoring and preventing abuse (e.g., detecting fraud or unauthorised access),</li>
                  <li>maintaining audit logs necessary to protect the service and meet legal obligations,</li>
                  <li>creating aggregated, de-identified statistics (where feasible) for product performance and improvement.</li>
                </ul>
                <p>
                  Where such data remains personal data (e.g., still identifiable), we apply safeguards
                  and lawful bases as described below.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">4) Personal data we collect</h2>
              <p>We collect different types of personal data depending on how you interact with us.</p>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">4.1 Website visitors (taxat.co.uk)</h3>
                <p>We may collect:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Device and usage data: IP address, device identifiers, browser type, operating system,
                    referral/source pages, pages viewed, time spent, and similar analytics information.
                  </li>
                  <li>Cookie and similar technology data (see Section 15).</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">4.2 Beta access / demo / updates list</h3>
                <p>If you submit a form on our website (e.g., "Request beta access", "Book a demo", "Join updates"), we may collect:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Identity and contact data: name, work email, company/firm name (if provided).</li>
                  <li>
                    Professional context: firm size, approximate number of Self Assessment clients per year,
                    your current software stack, and any notes you provide.
                  </li>
                  <li>Scheduling details: your availability or preferred contact time.</li>
                  <li>Communications: messages you send us and our responses.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">4.3 Platform users (people at accounting firms)</h3>
                <p>When your firm creates or administers your user account, we may collect:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Account details: name, work email, job title/role (if provided), firm affiliation, user ID.
                  </li>
                  <li>
                    Authentication and security data: login timestamps, IP addresses, MFA settings (if enabled),
                    password reset tokens (where applicable), and security events.
                  </li>
                  <li>
                    Activity logs: actions in the platform (e.g., access to a client file, export actions,
                    permission changes), to maintain security and provide auditability.
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">
                  4.4 Client/end-client data processed in the Platform (typically as processor)
                </h3>
                <p>Depending on what the accounting firm and/or the end-client authorises, Taxat may process (on the firm's instructions):</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Identification data: name, address, date of birth (where included in client records),
                    UTR and other tax identifiers (where included), and other identifiers required for the
                    accountant's work.
                  </li>
                  <li>
                    Financial and transaction data: bank transactions, bank statements/feeds, income/expense details,
                    ledger entries, invoices, receipts, and supporting documents.
                  </li>
                  <li>
                    Tax and compliance data: Self Assessment figures, computations, obligations/statuses (e.g., where integrated),
                    and evidence links used to support filing figures.
                  </li>
                  <li>
                    Evidence metadata: document titles, dates, suppliers/merchant names, amounts, categories,
                    and links between figures and evidence ("Defence Graph" style lineage).
                  </li>
                  <li>
                    Notes and communications uploaded by the firm: explanations, working papers, internal comments,
                    task/action items (e.g., "obtain missing receipt" workflows).
                  </li>
                  <li>Integration identifiers: IDs from connected accounting software providers and authorised data sources.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">4.5 Data from third-party sources</h3>
                <p>We may receive data from:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Accounting/ledger systems (e.g., if your firm connects them or imports exports),</li>
                  <li>Open Banking / banking data providers (if authorised by the end-client and/or the firm),</li>
                  <li>HMRC APIs (only where the taxpayer/agent authorises access using official authorisation flows),</li>
                  <li>Other sources the firm chooses to connect or upload (e.g., CSV imports).</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">4.6 Special category data and criminal offence data</h3>
                <p>
                  We do not intentionally require special category data (e.g., health, ethnicity) or data about criminal
                  convictions/offences to provide our service. However, such information could appear in free-text notes
                  or documents uploaded by the firm (for example, a document that references sensitive information). Where
                  this occurs, we expect firms to minimise such uploads and we apply access controls and security measures.
                  If we ever plan to process special category data in a structured way, we will update this notice and ensure
                  an appropriate lawful basis/condition applies.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">
                5) What we use personal data for (purposes) and our lawful bases
              </h2>
              <p>UK GDPR requires a lawful basis for processing personal data. The lawful basis depends on the context and whether we act as controller or processor.</p>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">5.1 When we act as controller (website, leads, business contacts, platform user admin)</h3>
                <p>We may process personal data for:</p>

                <div className="space-y-2">
                  <div className="font-semibold text-text">A) Providing the website and handling enquiries</div>
                  <p><span className="font-medium text-text">Purpose:</span> operate the website, respond to enquiries, handle demo/beta requests, communicate with you.</p>
                  <p><span className="font-medium text-text">Lawful basis:</span> legitimate interests (running our business and responding to enquiries), and/or steps prior to entering into a contract.</p>
                </div>

                <div className="space-y-2">
                  <div className="font-semibold text-text">B) Providing and administering the Platform for firm users</div>
                  <p><span className="font-medium text-text">Purpose:</span> create accounts, authenticate users, provide access and platform functionality, provide customer support, manage billing, and deliver services requested by the firm.</p>
                  <p><span className="font-medium text-text">Lawful basis:</span> contract (to provide the service), and legitimate interests (administering a B2B relationship).</p>
                </div>

                <div className="space-y-2">
                  <div className="font-semibold text-text">C) Security, abuse prevention, and service integrity</div>
                  <p><span className="font-medium text-text">Purpose:</span> protect accounts, prevent unauthorised access, monitor for security events, maintain audit logs, troubleshoot issues, and enforce acceptable use.</p>
                  <p><span className="font-medium text-text">Lawful basis:</span> legitimate interests (protecting the service and users), and legal obligation where applicable.</p>
                </div>

                <div className="space-y-2">
                  <div className="font-semibold text-text">D) Improving the Platform (product development, analytics)</div>
                  <p><span className="font-medium text-text">Purpose:</span> understand how the Platform is used, diagnose issues, improve performance and features, and develop new capabilities.</p>
                  <p><span className="font-medium text-text">Lawful basis:</span> legitimate interests. Where cookies/SDKs require consent (e.g., non-essential cookies), we will ask for consent (see Section 15).</p>
                </div>

                <div className="space-y-2">
                  <div className="font-semibold text-text">E) Marketing and updates to business contacts</div>
                  <p><span className="font-medium text-text">Purpose:</span> send product updates, newsletters, and information about beta availability and new features.</p>
                  <p><span className="font-medium text-text">Lawful basis:</span> consent (where required) and/or legitimate interests for B2B marketing where permitted by law. You can opt out at any time (see Section 12).</p>
                </div>

                <div className="space-y-2">
                  <div className="font-semibold text-text">F) Legal compliance and protecting our rights</div>
                  <p><span className="font-medium text-text">Purpose:</span> comply with laws, respond to lawful requests from regulators/law enforcement, handle disputes, and establish/exercise/defend legal claims.</p>
                  <p><span className="font-medium text-text">Lawful basis:</span> legal obligation; legitimate interests; and/or legal claims.</p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">5.2 When we act as processor (client/end-client data in the Platform)</h3>
                <p>
                  When we process end-client data for an accounting firm, the firm determines the lawful basis and provides privacy
                  information to its clients. Taxat processes the data only on documented instructions from the firm, as set out in the
                  DPA and service terms.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">6) Automated analysis, profiling, and "AI" features</h2>
              <p>Taxat may perform automated analysis to produce:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>discrepancy flags (e.g., cross-source mismatches),</li>
                <li>evidence linking suggestions (e.g., suggesting which transactions/documents support a figure),</li>
                <li>risk visibility indicators,</li>
                <li>a "Defence Score" reflecting evidence completeness/traceability.</li>
              </ul>
              <p className="font-medium text-text">Important:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>These outputs are designed as decision-support tools for qualified professionals.</li>
                <li>They are not intended to be the sole basis for final decisions about a person.</li>
                <li>Human review remains essential, and your accounting firm can override or confirm evidence links and decisions.</li>
              </ul>
              <p>
                If you are an end-client and you wish to understand how your accountant uses Taxat outputs in connection with your tax
                affairs, please contact your accountant directly.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">7) Who we share personal data with</h2>
              <p>We do not sell personal data.</p>
              <p>Depending on the context, we may share personal data with:</p>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">7.1 Service providers ("subprocessors")</h3>
                <p>We use trusted third parties to host and operate parts of our service, such as:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>cloud hosting and storage,</li>
                  <li>database and infrastructure providers,</li>
                  <li>email delivery and customer communications tools,</li>
                  <li>analytics and performance monitoring,</li>
                  <li>customer support tools,</li>
                  <li>identity/authentication services,</li>
                  <li>security monitoring and logging tools,</li>
                  <li>Open Banking connectivity providers,</li>
                  <li>integration partners you choose to connect (e.g., accounting software).</li>
                </ul>
                <p>We require service providers to protect personal data and only process it for specified purposes.</p>
                <p>[Optional: If you maintain a public subprocessor list, link it here]</p>
                <p>
                  Subprocessor list:{" "}
                  <a
                    className="text-text underline decoration-border/70 underline-offset-4"
                    href="https://www.taxat.co.uk/subprocessors"
                  >
                    https://www.taxat.co.uk/subprocessors
                  </a>{" "}
                  (or "available on request").
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">7.2 Your accounting firm and authorised users</h3>
                <p>
                  If you are an end-client, your data will be accessible to the accounting firm and its authorised users (as the
                  controller). Taxat is not responsible for the firm's internal access policies.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">7.3 Professional advisers and corporate transactions</h3>
                <p>
                  We may share personal data with professional advisers (lawyers, accountants, insurers) and with potential buyers/investors
                  if we are involved in a merger, acquisition, or asset sale, subject to confidentiality protections.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-semibold text-text">7.4 Legal and regulatory disclosures</h3>
                <p>We may disclose personal data where required by law or where necessary to protect rights, safety, and security.</p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">8) International transfers</h2>
              <p>We are UK-based, but some of our service providers (or their support teams) may be located outside the UK.</p>
              <p>If we transfer personal data outside the UK:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>we will ensure appropriate safeguards are in place, such as:</li>
                <li>the UK International Data Transfer Agreement (IDTA) or the UK Addendum to EU SCCs,</li>
                <li>adequacy regulations (where applicable),</li>
                <li>and/or other legally recognised safeguards.</li>
              </ul>
              <p>You can contact us to request more information about the safeguards we use.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">9) Security: how we protect personal data</h2>
              <p>We use technical and organisational measures designed to protect personal data, including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>encryption in transit (e.g., TLS) and encryption at rest where appropriate,</li>
                <li>role-based access controls and least-privilege access,</li>
                <li>tenant/firms separation controls designed to prevent cross-firm data access,</li>
                <li>audit logging for sensitive actions (e.g., access, export, permission changes),</li>
                <li>secure development practices and environment separation,</li>
                <li>incident response processes.</li>
              </ul>
              <p>
                No system is 100% secure. If you suspect any unauthorised access to your account, contact us immediately at{" "}
                <a
                  className="text-text underline decoration-border/70 underline-offset-4"
                  href="mailto:admin@taxat.co.uk"
                >
                  admin@taxat.co.uk
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">
                10) How long we keep personal data (retention)
              </h2>
              <p>We retain personal data only for as long as needed for the purposes described in this notice, unless a longer retention period is required or permitted by law.</p>
              <p>Typical retention periods (guidance - tailor to your actual policy):</p>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <span className="font-medium text-text">A) Website logs and security logs:</span> up to [30-180 days] for routine logs,
                  longer if needed for investigating security incidents.
                </li>
                <li>
                  <span className="font-medium text-text">B) Beta requests, demo enquiries, and updates list:</span> up to [12-24 months]
                  from our last interaction, unless you become a customer or request deletion sooner (subject to legal retention needs).
                </li>
                <li>
                  <span className="font-medium text-text">C) Platform user account data:</span> for the duration of the firm's contract and a
                  short period after termination (e.g., [30-90 days]) to allow data export and account closure, unless longer retention is
                  required for legal claims, security, or compliance.
                </li>
                <li>
                  <span className="font-medium text-text">D) Client/end-client data in the Platform (processor data):</span> as instructed by
                  the accounting firm and/or as set out in the DPA. After termination, we will delete or return client data within [X days]
                  (subject to backups and legal obligations).
                </li>
                <li>
                  <span className="font-medium text-text">E) Backups:</span> backups may persist for a limited period (e.g., [30-90 days])
                  before being overwritten, subject to security and continuity requirements.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">11) Your rights</h2>
              <p>Depending on the context and applicable law, you may have rights including:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>the right to be informed,</li>
                <li>the right of access,</li>
                <li>the right to rectification,</li>
                <li>the right to erasure,</li>
                <li>the right to restrict processing,</li>
                <li>the right to data portability,</li>
                <li>the right to object (including to direct marketing),</li>
                <li>the right to withdraw consent (where we rely on consent),</li>
                <li>rights related to automated decision-making/profiling (where applicable).</li>
              </ul>
              <p>How these rights work depends on whether Taxat is acting as controller or processor:</p>
              <p>
                <span className="font-medium text-text">If Taxat is the controller (e.g., your beta enquiry or your platform user account):</span>{" "}
                Contact us at{" "}
                <a
                  className="text-text underline decoration-border/70 underline-offset-4"
                  href="mailto:admin@taxat.co.uk"
                >
                  admin@taxat.co.uk
                </a>
                .
              </p>
              <p>
                <span className="font-medium text-text">If Taxat is a processor for your accountant (end-client data):</span> Please contact your
                accountant first. They are the controller and can instruct us where appropriate.
              </p>
              <p>We may ask you to verify your identity before fulfilling a request.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">12) Marketing preferences</h2>
              <p>If you receive marketing emails from us, you can opt out at any time by:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>using the "unsubscribe" link in the email, or</li>
                <li>
                  emailing{" "}
                  <a
                    className="text-text underline decoration-border/70 underline-offset-4"
                    href="mailto:admin@taxat.co.uk"
                  >
                    admin@taxat.co.uk
                  </a>
                  .
                </li>
              </ul>
              <p>Opting out will not affect service communications (e.g., security notices, contractual notices).</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">13) Cookies and similar technologies</h2>
              <p>We use cookies and similar technologies on our website to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>ensure the site works properly,</li>
                <li>maintain security and prevent abuse,</li>
                <li>understand usage and improve performance (analytics),</li>
                <li>(if used) support marketing.</li>
              </ul>
              <p>
                Where required, we will ask for your consent before placing non-essential cookies. You can manage cookie preferences via our
                cookie banner. If JavaScript is disabled, you can still manage cookies through your browser settings.
              </p>
              <p>
                Cookie Policy:{" "}
                <a
                  className="text-text underline decoration-border/70 underline-offset-4"
                  href="/cookies"
                >
                  https://www.taxat.co.uk/cookies
                </a>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">14) Complaints</h2>
              <p>If you have concerns, please contact us first at admin@taxat.co.uk and we will try to resolve the issue.</p>
              <p>You also have the right to lodge a complaint with the UK Information Commissioner's Office (ICO):</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Website:{" "}
                  <a
                    className="text-text underline decoration-border/70 underline-offset-4"
                    href="https://ico.org.uk/"
                  >
                    https://ico.org.uk/
                  </a>
                </li>
                <li>Telephone: 0303 123 1113</li>
                <li>Address: Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">15) Children</h2>
              <p>
                Taxat is intended for use by professionals (accounting firms) and is not directed at children. We do not knowingly collect
                personal data from children via our website forms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">16) Changes to this privacy notice</h2>
              <p>
                We may update this notice from time to time. We will post the updated version on our website and change the "Last updated" date.
                If changes are material, we may provide additional notice.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-text">17) Contact</h2>
              <p>For all privacy enquiries (including rights requests), contact:</p>
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
                <li>Post: INAMD96903, Wivenhoe park, Colchester, United KIngdom, CO4 3SQ</li>
              </ul>
            </section>
          </div>
        </div>
      </Section>
    </main>
  );
}
