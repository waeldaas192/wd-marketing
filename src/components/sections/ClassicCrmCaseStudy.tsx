import Link from "next/link";
import { resolveMedia } from "@/lib/media";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ArrowIcon } from "@/components/ui/Icons";
import styles from "./ClassicCrmCaseStudy.module.css";

const IMG = "/images/projects/classic-kitchens-bathrooms/";
const shot = (file: string, alt: string) => resolveMedia({ src: IMG + file, alt, width: 1800, height: 1200 });

type Step = { no: string; kicker: string; title: string; body: string; points: string[]; image: ReturnType<typeof shot> };

const steps: Step[] = [
  {
    no: "01", kicker: "Lead capture", title: "Every enquiry lands in one place, automatically",
    body: "Website quote forms and Facebook and Instagram Lead Ads now arrive in the dashboard on their own. Meta leads are delivered through a signed webhook the moment someone submits an Instant Form, with the campaign, ad and form answers stored alongside the enquiry. Leads that reached Meta before the dashboard existed were imported with their original dates, without re-contacting anyone.",
    points: ["Meta Lead Ads webhook with signature verification", "Campaign, ad set and ad recorded on every lead", "Duplicate protection when Meta resends a lead", "One-click import of past leads (Meta keeps about 90 days)"],
    image: shot("classic-crm-enquiries.webp", "Classic Kitchens and Bathrooms CRM enquiries table with stage, source and project filters and bulk actions"),
  },
  {
    no: "02", kicker: "Sales pipeline", title: "A pipeline that mirrors how a kitchen company really sells",
    body: "Enquiries move from Cold lead to Warm lead, Quotation, Invoice, Installation and Closed. The team drags a card to the next stage or changes it from any list, and the value of quoted, invoiced and installing work is totalled at the top. Filters by source show at a glance which channel is producing real projects.",
    points: ["Seven stages including Lost", "Drag-and-drop or one-click stage changes", "Source filters: Facebook, Instagram, Meta Ads, WhatsApp, phone, website", "Test leads hidden from the numbers"],
    image: shot("classic-crm-pipeline.webp", "Sales pipeline board in the custom CRM with cold, warm, quotation, invoice and installation columns"),
  },
  {
    no: "03", kicker: "Customer 360", title: "The whole customer on one screen",
    body: "Clicking any customer, from any page, opens the same profile: Call, WhatsApp, SMS and Email buttons, the current stage, project details, form answers, campaign, contact details, internal notes, a full activity timeline and every quotation and invoice. Nobody has to search three different apps before calling a customer back.",
    points: ["One customer panel used everywhere", "Activity timeline: enquiries, stage changes, calls, WhatsApp, documents", "Prepare a quotation or invoice directly from the enquiry", "Editable contact details and notes"],
    image: shot("classic-crm-customer-profile.webp", "Customer profile panel with call, WhatsApp, SMS and email buttons, pipeline stage and enquiry details"),
  },
  {
    no: "04", kicker: "WhatsApp Business", title: "WhatsApp from the business number, inside the dashboard",
    body: "Using the official WhatsApp Business Cloud API, the team replies from the company number rather than personal phones. Conversations are linked to the customer and enquiry, delivery and read receipts are shown, and Meta-approved templates are used when the 24-hour customer-service window has closed. A WhatsApp message from a new number creates a Cold lead automatically.",
    points: ["Official Cloud API with a verified business number", "Messages linked to customer, enquiry and pipeline stage", "Approved templates outside the 24-hour window", "New WhatsApp contacts become leads automatically"],
    image: shot("classic-crm-whatsapp.webp", "WhatsApp Business inbox inside the CRM showing a customer conversation about a kitchen survey"),
  },
  {
    no: "05", kicker: "Calling", title: "Call customers from the browser, never miss a call",
    body: "A built-in softphone (Twilio Voice) lets the team call customers from the dashboard, showing the business number. Incoming calls ring the dashboard first and then forward to the owner's mobile. Every call is logged against the customer with its outcome and duration, and missed calls are flagged for a call-back.",
    points: ["Browser calling with the business number", "Incoming calls: dashboard first, then the owner's mobile", "Call log with answered, missed and duration", "Unknown callers saved as new leads"],
    image: shot("classic-crm-calls.webp", "Call log in the CRM with inbound and outbound calls, answered and missed outcomes and call-back buttons"),
  },
  {
    no: "06", kicker: "Automation", title: "Automations that reply in seconds, and know when to stop",
    body: "New leads receive a WhatsApp reply within seconds of enquiring. If WhatsApp cannot be delivered, an SMS is sent from the alphanumeric sender name instead. The owner gets a WhatsApp alert with the lead's details, missed callers get a text-back, and gentle follow-ups go out if a lead stays cold or a quotation goes unanswered, skipped automatically as soon as someone moves the deal forward. Quiet hours keep follow-ups out of the evening.",
    points: ["Instant WhatsApp reply to every new lead", "SMS fallback when WhatsApp is not available", "Owner alerts and missed-call text-back", "Cold-lead and quotation follow-ups with quiet hours and an activity log"],
    image: shot("classic-crm-automations.webp", "Automation settings for new-lead replies, SMS fallback, owner alerts and follow-ups, on desktop and mobile"),
  },
  {
    no: "07", kicker: "Email", title: "Branded email, written and answered from the CRM",
    body: "The company inbox is readable inside the dashboard, and every email the team sends goes out on a branded letterhead with the logo, a personal signature and the company's legal details. A live preview shows exactly what the customer will receive, replies quote the original message, and ready-made templates cover the most common replies.",
    points: ["Inbox, reply and forward inside the dashboard", "Branded letterhead and personal signatures", "Live preview of the customer's view", "Reusable templates for common replies"],
    image: shot("classic-crm-email.webp", "Email composer in the CRM with a live preview of the branded email letterhead and signature"),
  },
  {
    no: "08", kicker: "Everyday speed", title: "Software-grade tools, on desktop and phone",
    body: "Customers, enquiries, quotations and invoices live in proper data tables with search, filters, sorting, column choice and CSV export. A command menu (Ctrl or ⌘ + K) finds any customer, enquiry or action in a keystroke. The same dashboard works on a phone, and a dark mode is available for late evenings.",
    points: ["Data tables with filters, bulk actions and CSV export", "Command menu for customers, enquiries and actions", "Responsive layout for phones and tablets", "Light and dark themes"],
    image: shot("classic-crm-dashboard.webp", "Classic Kitchens and Bathrooms CRM dashboard on a laptop with WhatsApp open on a mobile phone"),
  },
];

const comparison: [string, string, string][] = [
  ["Licence", "Monthly or yearly fee, often per user", "No CRM licence or per-user subscription"],
  ["Fit", "You adapt your process to the software", "Built around your stages, documents and team"],
  ["Lead sources", "Extra connectors or add-on tiers", "Meta Lead Ads, website, WhatsApp and calls built in"],
  ["Your data", "Stored in the vendor's platform", "Your own database, exportable at any time"],
  ["Changes", "Feature requests wait on the vendor", "New features added to your own system"],
];

const questions: { q: string; a: string }[] = [
  { q: "Do I need a monthly CRM subscription?", a: "No. There is no CRM licence or per-user fee. You only pay the usage costs of the services you choose to use, such as WhatsApp conversation charges from Meta, call and SMS minutes, and hosting, which are typically small for a local business." },
  { q: "Can it connect to my Facebook and Instagram lead ads?", a: "Yes. Leads from Meta Instant Forms arrive automatically through a signed webhook, with the campaign and ad recorded. Recent leads that arrived before the connection can be imported too." },
  { q: "Can my team use it on their phones?", a: "Yes. The dashboard is responsive, so WhatsApp replies, customer profiles, the pipeline and automations can all be managed from a phone, with staff access controlled by role." },
  { q: "How is customer data protected and backed up?", a: "Sign-in uses a dedicated authentication provider with role-based permissions, webhooks are signature-checked, connection secrets are encrypted, and the database supports point-in-time recovery with a backup taken before every structural change." },
  { q: "Can it grow with the business?", a: "Yes. Because the system is yours, new stages, automations, reports or integrations can be added as the business changes, without moving to a bigger subscription tier." },
];

export function ClassicCrmCaseStudy() {
  return <>
    <section className="section" aria-labelledby="crm-intro-heading" data-reveal>
      <div className={`container ${styles.narrow}`}>
        <p className="eyebrow">Custom CRM for a London kitchen company · Project insight</p>
        <h2 id="crm-intro-heading" className="h2">A CRM built around how a kitchen and bathroom business actually sells</h2>
        <p className={styles.lede}>Classic Kitchens &amp; Bathrooms was generating enquiries from its website and from Facebook and Instagram lead ads, but following them up meant moving between a phone, WhatsApp, an email inbox and separate documents. There was no single view of a customer, no shared pipeline, and no way to reply automatically the moment a lead arrived.</p>
        <p>Rather than adding another monthly CRM subscription and bending the business around it, WD Marketing designed and built a private dashboard on the company&apos;s own website. It brings lead capture, the sales pipeline, WhatsApp, phone calls, SMS, email, quotations, invoices and automation into one fast system that belongs to the business and is set up around its exact process.</p>
      </div>
    </section>

    <section className={`section ${styles.stepsSection}`} aria-labelledby="crm-steps-heading">
      <div className="container">
        <div className={styles.sectionHead}>
          <p className="eyebrow">What we built, step by step</p>
          <h2 id="crm-steps-heading" className="h2">Eight connected parts, one dashboard</h2>
        </div>
        <ol className={styles.steps}>
          {steps.map((step, i) => <li key={step.no} className={`${styles.step} ${i % 2 ? styles.flip : ""}`} data-reveal>
            <div className={styles.stepCopy}>
              <p className={styles.stepKicker}><span>{step.no}</span>{step.kicker}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <ul className={styles.points}>{step.points.map(point => <li key={point}>{point}</li>)}</ul>
            </div>
            <div className={styles.stepMedia}><MediaFrame asset={step.image} label={step.title} sizes="(max-width: 980px) calc(100vw - 40px), 720px"/></div>
          </li>)}
        </ol>
      </div>
    </section>

    <section className="section" aria-labelledby="crm-compare-heading" data-reveal>
      <div className={`container ${styles.narrow}`}>
        <p className="eyebrow">No CRM subscription</p>
        <h2 id="crm-compare-heading" className="h2">Your own system instead of another monthly bill</h2>
        <p>Off-the-shelf CRMs are built for everyone, so you pay for features you never use, per user, every month, while the parts you actually need, such as Meta lead ads, WhatsApp from the business number or a kitchen-specific pipeline, often sit behind higher tiers or third-party connectors. A custom dashboard turns that around.</p>
        <div className={styles.tableWrap}>
          <table className={styles.compare}>
            <caption className={styles.srOnly}>Subscription CRM compared with a custom CRM built by WD Marketing</caption>
            <thead><tr><th scope="col"></th><th scope="col">Typical subscription CRM</th><th scope="col">Custom CRM by WD Marketing</th></tr></thead>
            <tbody>{comparison.map(([label, saas, custom]) => <tr key={label}><th scope="row">{label}</th><td>{saas}</td><td>{custom}</td></tr>)}</tbody>
          </table>
        </div>
        <p className={styles.note}>Running costs are pay-as-you-go: WhatsApp conversation charges set by Meta, call and SMS usage, email sending and hosting. There is no CRM licence on top.</p>
      </div>
    </section>

    <section className={`section ${styles.trustSection}`} aria-labelledby="crm-trust-heading" data-reveal>
      <div className="container">
        <div className={styles.sectionHead}>
          <p className="eyebrow">Secure, backed up and fast</p>
          <h2 id="crm-trust-heading" className="h2">Customer data treated like the asset it is</h2>
        </div>
        <div className={styles.cards}>
          <article className={styles.card}>
            <h3>Security</h3>
            <ul className={styles.points}>
              <li>Private sign-in with staff roles and permissions</li>
              <li>Meta, WhatsApp and Twilio webhooks verified by signature</li>
              <li>Connection tokens encrypted; secrets kept server-side</li>
              <li>Audit trail of important actions</li>
            </ul>
          </article>
          <article className={styles.card}>
            <h3>Backups</h3>
            <ul className={styles.points}>
              <li>Database point-in-time recovery</li>
              <li>A backup is taken before every structural change</li>
              <li>Guarded, confirm-to-apply database updates</li>
              <li>Full export of customers and enquiries to CSV</li>
            </ul>
          </article>
          <article className={styles.card}>
            <h3>Speed</h3>
            <ul className={styles.points}>
              <li>Runs on Cloudflare&apos;s global edge network</li>
              <li>Instant search, filters and sorting in the browser</li>
              <li>Command menu to reach anything in a keystroke</li>
              <li>Lightweight pages that stay quick on mobile data</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="crm-grow-heading" data-reveal>
      <div className={`container ${styles.narrow}`}>
        <p className="eyebrow">Built to grow</p>
        <h2 id="crm-grow-heading" className="h2">Set up for this business, ready for what comes next</h2>
        <p>Every part was configured around Classic&apos;s requirements: its pipeline stages, its quotation and invoice documents, its WhatsApp templates, its working hours and its team. Because the system is theirs, it can keep evolving, whether that means new automations, reporting, more team members or new lead sources, without migrating data or upgrading a plan.</p>
        <p>The same approach suits other trade and home-improvement businesses that live on fast replies: kitchen and bathroom fitters, stone and worktop specialists, builders, roofers and installers.</p>
      </div>
    </section>

    <section className={`section ${styles.faqSection}`} aria-labelledby="crm-faq-heading" data-reveal>
      <div className={`container ${styles.narrow}`}>
        <p className="eyebrow">Questions business owners ask</p>
        <h2 id="crm-faq-heading" className="h2">About a custom CRM</h2>
        <div className={styles.faq}>
          {questions.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}
        </div>
        <div className={styles.cta}>
          <Link href="/contact" className="button button-primary">Discuss a custom CRM<ArrowIcon direction="up-right" size={18}/></Link>
          <Link href="/services/growth-infrastructure" className="button button-ghost">CRM &amp; automation services<ArrowIcon size={18}/></Link>
          <Link href="/services/meta-ads">Meta Ads management<ArrowIcon size={16}/></Link>
        </div>
      </div>
    </section>
  </>;
}
