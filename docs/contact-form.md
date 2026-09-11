# Interactive project enquiry form

The contact page keeps the existing Next.js static export. A small Cloudflare Worker handles the form and postcode APIs; D1 stores project enquiries. Build with `npm run build`. Sites receives `dist/server/index.js`, `dist/client` and the generated migrations. The static website, portfolio pages and `_redirects` remain in the asset bundle.

## Customer flow
1. Choose a service, choose a budget (or keep “Not sure yet”) and describe the goal.
2. Supply a name and email. Phone, business, website and business location are optional.
3. Review/edit answers, submit and receive a storage-confirmed reference.

The form keeps its current values after lookup or submission failures. Retrying an unchanged brief reuses the request ID and cannot create a duplicate. Refreshing the page starts a fresh form; personal information is not stored in browser localStorage.

## Runtime settings
Set these in the Site environment settings, never in client code or the hosting manifest:

| Setting | Purpose |
| --- | --- |
| CONTACT_FORM_SECRET | Required, at least 32 random characters; HMAC for abuse-control identifiers and payload matching. Configured as a secret. |
| IDEAL_POSTCODES_API_KEY | Optional secret from Ideal Postcodes, with a valid address-lookup plan/balance. Enables a property-address selection list. |
| TURNSTILE_SITE_KEY | Optional public key, paired with the secret below. Served at runtime through the config endpoint. |
| TURNSTILE_SECRET_KEY | Optional secret. When configured, submissions require a valid project-brief challenge for the current hostname. Configure both Turnstile keys together. |
| RESEND_API_KEY | Optional sending-only secret scoped to the verified WD Marketing domain in Resend. Never use a Namecheap mailbox password here. |
| CONTACT_EMAIL_ENABLED | Set to `true` only when sender verification and the API key are ready. Otherwise the form continues to store requests without sending or queuing email. |

Without an Ideal Postcodes key, the form checks UK postcodes and their administrative areas through Postcodes.io. This is **not** a property-address database: street, building and town remain manually editable. Postcode search is optional; international addresses are entered manually. No provider key is included in HTML, browser JavaScript or public configuration.

A saved version must be deployed for runtime setting changes to apply. The normal Next development server alone serves the frontend, not the Worker APIs; unavailable online sending is shown honestly with a prefilled email alternative.

## Stored requests
The owner can review `contact_enquiries` through the Site database viewer. It contains the reference, time and submitted fields. There is no public list/read endpoint. The form confirms database storage; it never presents provider acceptance as inbox delivery. The separate email link opens the customer's email app.

## Branded email delivery (prepared; activation required)

The live version before this change stores requests only. This change adds two HTML/plain-text emails, with the existing WD logo, indigo accents and an enquiry reference:

- Owner notification to `hello@wdmarketing.co.uk`, containing the brief. Reply-To is the customer's submitted address.
- Customer acknowledgement to the submitted email, from `WD Marketing <hello@wdmarketing.co.uk>`. Replies reach `hello@wdmarketing.co.uk`. It acknowledges receipt without promising a response deadline or commercial outcome.

Templates live in `src/lib/contact-emails.ts`; Worker delivery is in `worker/contact-mail.ts`. The acknowledgement deliberately excludes arbitrary names, messages and website links, so a public form cannot relay attacker-written content to another person. Owner HTML escapes user content. No marketing subscription, tracking pixel, recipient-list API or public resend endpoint is added.

### Activation

1. Verify `wdmarketing.co.uk` as a sending domain in Resend. Use its exact generated DNS records; preserve the existing Namecheap/Jellyfish mailbox routing. Mailbox creation does not itself configure application sending.
2. Add a sending-only `RESEND_API_KEY` as a Site secret and set `CONTACT_EMAIL_ENABLED=true`. Sites requires an HTTP mail API; raw SMTP sockets are unavailable. Existing cPanel-only `CONTACT_FROM`/`CONTACT_TO` settings do not control this Worker.
3. Deploy this saved version so the additive `0001_contact_email_outbox.sql` migration and settings apply together. Do not edit the already-applied `0000` migration.
4. With approval for the named test recipient, submit one clearly labelled test brief. Verify both rows become `accepted`, review the provider delivery status, and confirm both actual mailboxes receive the branded content. Mocked tests are not proof of real inbox delivery. Sender DNS verification and a real delivery test remain outstanding until credentials are configured.

Keep `CONTACT_EMAIL_ENABLED` unset/false until activation. Previously saved enquiries are not backfilled or automatically emailed when this flag changes. Disabling the flag pauses all sending, including pending jobs.

### Reliability and operations

When enabled, D1 atomically saves an enquiry and both immutable email payloads. Sending runs via `waitUntil`, after the storage response. `contact_email_outbox` provides per-message states `pending`, `sending`, `accepted`, `review`. `accepted` means Resend accepted the request, not that it reached the inbox. There is no delivery/bounce webhook in this change; use the provider dashboard to investigate the stored `provider_id`.

Two due jobs are processed on a successful form submission or form-config request. Recovery is traffic-driven, not a scheduled queue: if there are no further form visits, pending retries wait. Claims use a 60-second database lease. Each HTTPS attempt has an 8-second timeout and a stable provider idempotency key. Lost responses, 408/429 and server errors retry after 60 then 300 seconds, with three attempts maximum. Authentication, validation and redirect failures go to `review`. Jobs older than 23 hours, or outside 23 hours from their first attempt, also require review. This is deliberately shorter than Resend's 24-hour deduplication window.

Review pending/failed rows through the authenticated Site database viewer. Check the provider dashboard before manually contacting a customer or replaying a failed message; never reset an old accepted/ambiguous job or invent a fresh idempotency key, which could duplicate mail. There is no automated historical resend or always-on scheduler. Successful rows clear their copied JSON payload; the original enquiry remains. Delete associated outbox records when deleting an enquiry (enforced by its foreign key). Logs contain only fixed error categories and numeric status, never customer fields or API secrets. Monitor the outbox/provider dashboard after activation; sustained failures require operator attention.

Official provider contracts: [send email](https://resend.com/docs/api-reference/emails/send-email) and [idempotency keys](https://resend.com/docs/dashboard/emails/idempotency-keys).

`form_rate_limits` contains only HMAC identifiers, counters and expiry times. Limits apply across Worker instances. No raw IP is persisted. Expired counters are removed in bounded background batches. Baseline limits: 10 form attempts per IP / 10 minutes, 5 new enquiries per email / 10 minutes, 200 new enquiries / hour; address lookup 20 per IP / 10 minutes and a global ceiling (300/day with the licensed provider, 1,000/day otherwise). Turnstile can be enabled without rebuilding the frontend.

There is no automatic deletion policy for enquiry records in this change. Set retention and review operational/privacy copy with the business before deciding what to retain; do not use the rate-limit cleanup as an enquiry retention policy.

## Schema and checks
`db/schema.ts` is the schema source. Use `npx drizzle-kit generate --name=descriptive_change` for later changes; do not edit an applied migration or create tables inside a request handler.

- `node qa/contact-worker.cjs`: actual Worker handlers, generated schema in SQLite, controlled providers; verifies atomic mail intent, safe templates, concurrent duplicates, partial failures, retry limits and disabled behaviour. No external submissions.
- `node qa/contact-runtime.cjs`: native workerd fetch, response streams and D1; verifies address lookup, email background dispatch, actual D1 batches, and that redirects cannot forward provider credentials. Uses synthetic credentials and mocked outbound requests.
- `node qa/contact-unit.cjs`: existing cPanel/email-handler regression checks with mocked delivery.
- `npm run build`: frontend type/build checks plus Worker bundle.
- Existing portfolio and icon checks remain applicable to `out`.

Provider references: https://postcodes.io/docs/api/ and https://docs.ideal-postcodes.co.uk/docs/api/postcodes/ . The licensed lookup maps line_1, line_2/line_3, post_town and postcode, with a maximum of 100 choices and a manual-entry option if an address is not listed.

Outbound provider requests use `redirect: "manual"` and reject redirects: the deployed Workers runtime does not accept `redirect: "error"`. Provider failures log only fixed diagnostic categories and numeric response codes, never credentials, postcode/address values, response messages or exception text.
