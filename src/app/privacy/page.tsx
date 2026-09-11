import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { legal } from "@/data/legal";
import { LegalPage } from "@/components/privacy/LegalPage";
export const metadata = pageMetadata("Privacy Policy", "How WD Marketing uses enquiry information, operates website analytics and respects your privacy choices.", "/privacy");
export default function Privacy() {
  return <LegalPage title="Privacy policy" intro="This policy explains how we handle personal information when you visit wdmarketing.co.uk, send a project enquiry or contact us about our services.">
    <h2>1. Who is responsible for your information?</h2>
    <p>{legal.operator}{legal.operator !== "WD Marketing" ? ", trading as WD Marketing," : ""} is responsible for deciding how information collected through this website is used. For privacy questions or requests, email <a href={"mailto:" + legal.email}>{legal.email}</a>. Our contact details appear below.</p>
    <h2>2. Information we collect</h2>
    <ul><li><strong>Enquiry information:</strong> your name, email, selected service, project description and indicative budget. Telephone number, company, website and business address are optional.</li><li><strong>Correspondence:</strong> emails, project discussions and records needed to respond or provide agreed services.</li><li><strong>Security information:</strong> technical request information used to deliver and protect the site. The form uses a request reference to prevent duplicate submissions and a keyed hash of the requesting IP address for rate limiting.</li><li><strong>Optional analytics:</strong> when enabled and accepted, page visits, device and browser characteristics, form interactions and successful submissions. Our website measurement events exclude your name, email, phone, address, enquiry text and enquiry reference.</li></ul>
    <p>Please do not include passwords, payment card details or sensitive personal information in a project brief.</p>
    <h2>3. Purposes and lawful bases</h2>
    <ul><li><strong>Enquiries and proposals:</strong> taking steps at your request before entering a contract, or our legitimate interest in responding to business enquiries when you act for an organisation.</li><li><strong>Agreed services:</strong> performing a contract with you, or our legitimate interest in managing a relationship with your organisation.</li><li><strong>Operation, security and administration:</strong> our legitimate interests in maintaining the site, preventing misuse, handling correspondence and keeping appropriate records.</li><li><strong>Analytics:</strong> your consent. Optional measurement remains blocked unless you accept it.</li><li><strong>Legal and accounting requirements:</strong> compliance with obligations applicable to our business.</li></ul>
    <p>Submitting an enquiry does not subscribe you to marketing emails. Any separate marketing subscription must explain its purpose and how to unsubscribe.</p>
    <h2>4. Forms, email and address lookup</h2>
    <p>Project briefs are stored in our Cloudflare-hosted database for review and response. A successful submission displays a reference after storage is confirmed. Where enquiry email delivery is enabled, Resend processes information needed for notification and acknowledgement emails.</p>
    <p>If you choose postcode search, the postcode is sent to Postcodes.io to check the area, or to Ideal Postcodes when property-address lookup is enabled. A selected address identifier may also be sent to Ideal Postcodes. Your other form answers are not sent to the lookup provider. You can enter an address manually or omit it.</p>
    <p>When enabled, Cloudflare Turnstile processes security signals to distinguish genuine requests from automated abuse. Essential security does not depend on accepting optional analytics.</p>
    <h2>5. Analytics and cookies</h2>
    <p>Our optional measurement setup uses Google Analytics 4 through Google Tag Manager to understand page use and improve the enquiry journey. You can refuse analytics and still use the site and submit a brief. Use <strong>Cookie settings</strong> in the footer to change or withdraw your choice.</p>
    <p>The current setup does not enable advertising personalisation or remarketing tags. See our <Link href="/cookies">cookie policy</Link> for browser storage details and duration.</p>
    <h2>6. Recipients and external services</h2>
    <p>Providers involved in the relevant feature include Cloudflare for hosting, database and security; our business email provider and Resend for correspondence and enquiry email delivery; the address lookup providers when requested; and Google for analytics when enabled and accepted. Information is shared according to the function used.</p>
    <p>We may also disclose information to professional advisers or public authorities where necessary for advice, legal obligations or the establishment, exercise or defence of legal rights. External websites and social networks have their own policies.</p>
    <h2>7. International processing</h2>
    <p>Some providers operate outside the UK. Where an international transfer requires safeguards, the relevant arrangements may include UK adequacy regulations or approved contractual safeguards. Contact us for information about arrangements relevant to your data.</p>
    <p>See the <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare privacy policy</a>, <a href="https://resend.com/legal/privacy-policy">Resend privacy policy</a> and <a href="https://policies.google.com/privacy">Google privacy policy</a>.</p>
    <h2>8. Retention</h2>
    <p>Retention is assessed according to whether an enquiry remains active, work has been agreed, a record is required for accounting or legal obligations, or information is necessary to resolve a dispute. Enquiry records should not be retained indefinitely simply because storage is available. Contact us to ask about a record or request deletion.</p>
    <p>Your browser cookie choice expires after 180 days. Analytics cookie duration and the retention of event data in Google Analytics are separate settings. Google Analytics event retention depends on the property configuration.</p>
    <h2>9. Your rights</h2>
    <p>Depending on the circumstances, you can request access, correction, erasure, restriction or portability of your information. You can object to processing based on legitimate interests and withdraw consent for future processing. Withdrawal does not change the lawfulness of earlier processing. Some rights are subject to conditions or legal exceptions.</p>
    <p>Email <a href={"mailto:" + legal.email}>{legal.email}</a> with your request. We may need information to verify your identity. You can also complain to the UK Information Commissioner’s Office at <a href="https://ico.org.uk/make-a-complaint/">ico.org.uk/make-a-complaint</a>.</p>
    <h2>10. Changes</h2><p>We may update this policy as services or data practices change. The date above identifies the current wording. Material changes to optional tracking require appropriate updates to the information and choices provided.</p>
  </LegalPage>;
}
