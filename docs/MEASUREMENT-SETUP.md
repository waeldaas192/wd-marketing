# WD Marketing — consent, GA4, GTM and search readiness

Prepared 11 September 2026 against `codex/independent-cloudflare` commit `0d1864d`.
This change prepares website code. The owner supplied GTM container `GTM-MJL3LG77` and GA4 Measurement ID `G-P2D95M1T98`, now set as website defaults and in the environment example. The GA4 import files use these same IDs. The owner has imported the configuration and tested it against `localhost:3010` using GTM Preview. Production publication of this update has not been confirmed; measurement still requires an explicit build-time enable flag.

## Owner-assisted browser verification

The following evidence was supplied in screenshots from the owner's browser; it was not obtained through direct access to their Google account:

- GTM accepted the import: 24 added entities, zero modified/deleted. The workspace contains eight tags including the manually created native consent tag.
- The consent tag was corrected from All Pages to **Consent Initialization – All Pages**. The saved configuration used once per page and no additional consent requirement.
- A local Preview session connected to both supplied IDs. Initial page load after consent fired the consent tag, Google tag and page-view event tag once each. A later navigation fired its page-view event tag successfully.
- At a consented page view, `analytics_storage` changed from default denied to granted. `ad_storage`, `ad_user_data` and `ad_personalization` stayed denied; `security_storage` stayed granted.
- GA4 Realtime received one test user, two page views (one for each displayed page title), two `form_step`, one `form_start`, one `contact_cta_click`, one `first_visit` and one `session_start`.
- The screenshot supplied for the withdrawal test shows an analytics consent update to **denied**, with the three advertising consent states also denied. It confirms the state update; it does not by itself show the subsequent network requests or cookie jar.

Remaining browser evidence: the local Next.js **1 Issue** details; confirmed successful form submission producing `generate_lead`; final post-withdrawal navigation/request and cookie checks. No DebugView event-parameter screenshot was supplied. Keep the existing isolated code-test results separate from these browser observations. Operator/address/provider details, Search Console ownership, and production deployment are still outstanding.

## What is implemented

- Essential preference storage plus optional analytics consent. Accept and reject have equal prominence; a native modal supports customisation and a persistent footer button reopens it.
- Versioned 180-day preference expiry; invalid/future/expired records default to denial. Cross-tab changes and withdrawal apply immediately. Known accessible GA cookies are cleared when analytics is refused.
- Basic loading: no GTM request before analytics permission. Without both valid IDs AND `NEXT_PUBLIC_MEASUREMENT_ENABLED=true`, Google measurement stays disabled.
- GTM native Consent Mode v2 template (not Custom HTML). Website events wait for its registration. Google is installed only through GTM; the GA4 ID in the site is used for the disable switch, not a second installation.
- All advertising consent remains denied; no advertising or remarketing tags are added. Add a separate choice and policy update before adding them.
- Manual page views for Next.js route navigation, form funnel events and a successful-submission event after `/api/contact` confirms storage. No past activity from before consent is replayed.
- Analytics gets no enquiry answers or reference. Known page paths, restricted UTM source/medium/campaign/id labels and origin-only external referrers are used. Never put personal information in campaign names.
- `/privacy`, `/terms`, `/cookies`; common policy navigation and footer links. Existing URLs are retained. Cookie policy included in sitemap; `/api/` excluded from robots crawling. Existing canonical and production/staging noindex rules retained.

## 1. Confirm business details before publishing policies

The owner has specified that WD Marketing operates as a **sole trader**. The policy contact blocks, privacy controller wording and website terms now reflect that structure. Set build-time values for `WD_LEGAL_NAME` (the individual's full legal name) and `WD_CORRESPONDENCE_ADDRESS` (the sole trader's business correspondence address). Neither value has been supplied yet. `hello@wdmarketing.co.uk` is the existing contact email in the source.

The owner separately mentioned transferring payments to **Excellence Prime Ltd**. That statement does not establish whether clients pay the company directly, whether it collects payments on the sole trader's behalf, or whether the owner transfers funds after receiving them. No collection agency, data-processing or contracting relationship has been asserted in the public policies. The company's name, number and registered office must not substitute for the sole trader's identity or address. Any client-facing payment arrangement must be described accurately in the relevant proposal or invoice after its actual role is confirmed. The website terms ask clients to check supplier and payee details before paying.

The prepared policy uses the WD Marketing brand as a fallback until the individual's legal name is provided; it is not a completed operator disclosure. These source changes do not register the business with HMRC or change its legal structure. Confirm the business email provider, current hosting/security settings, Resend/address lookup usage, provider transfer arrangements and the real retention process. The criteria-based retention text does not install automated deletion. Do not publish as a verified compliance certification.

The terms concern website use. Paid service scope, deposits, cancellation and refund terms belong in the actual client service agreement; they have not been invented here.

## 2. Configure GA4

Use the existing WD Marketing property if it is the correct one; avoid creating a duplicate property.

- Web stream: `https://wdmarketing.co.uk`; owner-supplied Measurement ID: `G-P2D95M1T98`.
- Reporting time zone: Europe/London; currency: GBP.
- Turn OFF Enhanced Measurement for this initial release, including history-change page views, form interactions, outbound clicks and site search. These would duplicate the explicit events or collect uncontrolled URL values. Re-enable only individually after a scoped review.
- Leave Google Signals, user-provided data collection, enhanced conversions and advertising personalisation off for this release.
- Proposed user/event data retention: 2 months. This is an account setting to apply, not something changed by the code; it is distinct from 180-day cookie expiry.
- Define internal/test traffic. Test a filter before activating it so genuine data is not permanently discarded. Do not mark traffic as internal based on an invented IP address.
- Mark only `generate_lead` as the initial primary key event. Do not mark `contact_click` or `contact_cta_click` as completed leads.

## 3. Configure the existing Web GTM container

Use the owner-supplied Web container `GTM-MJL3LG77`. Export the current container as a backup and review existing tags first. Remove duplicate GA4 installations only after identifying them. Do not replace an existing container with a blanket import.

### Prepared imports (recommended)

These files are generated locally with `node scripts/build-gtm-import.cjs`. Their structure, references, consent rules and event parameters are checked locally. The owner has now successfully imported them and run the Preview checks recorded above; this is not confirmation of production publication.

1. **Templates → Tag Templates → New → top-right menu → Import**: select `docs/gtm/WD-Marketing-consent.tpl`. Save as **WD Marketing - consent**. The permissions below are included.
2. **Tags → New**: select that template, name the tag **WD - Consent**, and choose **Consent Initialization – All Pages**. Advanced Settings → Tag firing options → **Once per page**. Consent settings → **No additional consent required**. Save. This is the only tag added manually.
3. **Admin → Import Container**: choose `docs/gtm/WD-Marketing-GA4-import.json`, select the workspace and **Merge**. The clean-container preview should add **7 tags, 7 triggers and 10 variables**, and delete nothing. Inspect detailed changes. If WD-named items already exist, review the conflict; avoid keeping duplicates by automatic renaming. Confirm the import only when the preview matches the intended changes.
4. The workspace should now have **8 WD tags total**: one consent tag, one Google tag and six event tags. The import includes the actual Measurement ID; it does not include an account ID or impersonate another container. Two small Custom JavaScript variables return a literal `false` and `15552000` so configuration retains boolean/number types; they make no requests and read no visitor information.
5. Use Preview and the checks in section 5 with a build that has measurement enabled. Keep Enhanced Measurement off in GA4. Publish the GTM workspace only after the checks pass; importing alone does not publish it or change the website deployment.

If GTM rejects a generated file, retain the existing workspace and use the manual specification below; the import has not been presented as an account-validated export. Do not add the manual Google/event tags as well as the imported versions.

### Consent template

GTM → Templates → Tag Templates → New. Name it **WD Marketing — consent** and paste `docs/gtm/consent-template.js` into Code. No template fields are needed.

Permissions:

- **Accesses consent state**: write `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`, `functionality_storage`, `personalization_storage`, `security_storage`.
- **Accesses global variables**: execute only `wdOnConsentChange` and `wdMeasurementContext`.
- **Writes data layer**: allow the exact keys passed to `gtagSet`: `ads_data_redaction`, `url_passthrough`, `allow_google_signals`, `allow_ad_personalization_signals`, `send_page_view`, `cookie_expires`, `cookie_update`, `page_location`, `page_referrer`.

Save the template, create a tag using it, and trigger **Consent Initialization – All Pages**, once per page. This consent tag needs no additional consent. It sets native defaults, applies the visitor choice via `updateConsentState` and registers the future-change callback. It does not send analytics itself.

### Variables and triggers

Create Version 2 Data Layer Variables for: `page_location`, `page_path`, `page_referrer`, `form_id`, `step`, `lead_method`, `contact_method`. Create one Constant with `G-P2D95M1T98`.

Create a Custom Event trigger for each exact website event in the table below, plus `wd_analytics_ready`. Do not use an all-events wildcard.

### Google tag

Create one **Google tag** using the GA4 ID. Fire it on `wd_analytics_ready`, once per page. Configure these parameters explicitly (keep the boolean/number types):

| Parameter | Value |
| --- | --- |
| `send_page_view` | false |
| `cookie_expires` | 15552000 |
| `cookie_update` | false |
| `allow_google_signals` | false |
| `allow_ad_personalization_signals` | false |
| `page_location` | DLV page_location |
| `page_referrer` | DLV page_referrer |

**Consent settings → Require additional consent → analytics_storage.** Built-in consent adaptation alone is not the chosen basic implementation.

### GA4 event tags

Create a separate GA4 Event tag for every row. Use the same Measurement ID. Set **additional consent: analytics_storage** on every analytics event tag. Each event gets `page_location`, `page_path`, `page_referrer` from its Data Layer Variables; add only the row-specific parameters below.

| Website custom event | GA4 event name | Additional parameters | Meaning |
| --- | --- | --- | --- |
| `wd_page_view` | `page_view` | none | One current page view after consent, then one per pathname change |
| `wd_form_start` | `form_start` | `form_id` | First field interaction during a consented brief |
| `wd_form_step` | `form_step` | `form_id`, `step` | A validated step transition, including revisits |
| `wd_generate_lead` | `generate_lead` | `form_id`, `lead_method` | Server confirmed the brief was saved |
| `wd_contact_click` | `contact_click` | `contact_method` | Email/phone/WhatsApp link click if such a link exists |
| `wd_contact_cta_click` | `contact_cta_click` | none | Internal link to the contact page |

For deterministic initialization, set the Google tag as a setup tag for the event tags, keeping **Once per page** on that Google tag. Do not add another automatic page-view tag. Do not send arbitrary `Click URL`, form fields, enquiry references, full referrer or current raw Page URL. No lead value is assigned because a defensible value is not supplied. Define event-scoped custom dimensions only for parameters needed in reporting (`form_id`, `step`, `lead_method`, `contact_method`).

## 4. Enable the website integration

In `.env.local` for local builds, or repository Actions variables for the existing build workflow:

```dotenv
NEXT_PUBLIC_MEASUREMENT_ENABLED=true
NEXT_PUBLIC_GTM_ID=GTM-MJL3LG77
NEXT_PUBLIC_GA4_ID=G-P2D95M1T98
WD_LEGAL_NAME=YOUR_CONFIRMED_LEGAL_NAME
WD_CORRESPONDENCE_ADDRESS=YOUR_BUSINESS_CORRESPONDENCE_ADDRESS
```

Both identifiers above were supplied by the owner. Configure and validate the GTM workspace before enabling production measurement. Public tracking IDs are not passwords. Rebuild after changes: Next embeds public configuration in exported assets. Runtime Worker variables alone cannot change the already-built client. Keep a single GTM installation and no unconditional noscript iframe or independent gtag.js snippet.

The Actions workflow now passes the configured build values to the build job. Existing deployment conditions remain unchanged.

## 5. Verify before activating production measurement

In GTM Preview / Tag Assistant and GA4 DebugView, inspect the browser's requests and cookies:

1. Fresh browser: no GTM/GA request and no GA cookie; forms remain available.
2. Reject: still no Google request after navigation or reload. Reopen settings from footer.
3. Accept: one container; consent defaults denied, then analytics granted, with all three advertising signals denied. Google tag initializes once; one page_view for the current page.
4. Navigate with Next links, back and forward: one page_view per pathname change. Confirm no duplicate automatic/history event.
5. Invalid form, failed response and send click: no generate_lead. One saved submission: one generate_lead. A retry of the same receipt within the current document does not duplicate it.
6. Inspect every GA request: no enquiry fields/reference or unapproved query strings. Check origin-only referrer and valid UTM attribution.
7. Withdraw while staying on the page: new app events stop, the GA4 disable flag is true, native analytics consent is denied, accessible known GA cookies are removed. Reload: no Google request. Check another tab also updates.
8. Expired/corrupt storage prompts again and blocks analytics. Closing settings without saving changes nothing. Check keyboard focus, Escape, mobile overflow and 200% zoom.
9. The real lead endpoint must be tested with permission for the test enquiry, or using isolated test data. Code tests do not prove email delivery or real GA collection.

The included automated test uses isolated stubs and does not send enquiries or data to Google. The separate owner-assisted browser results are recorded above; unverified account settings and the remaining checks still need completion.

## 6. Search Console and technical SEO

- Verify the Domain property for `wdmarketing.co.uk` via the Google-issued DNS TXT value in Cloudflare. If a URL-prefix property is chosen instead, the optional `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` meta value is supported.
- Submit `https://wdmarketing.co.uk/sitemap.xml`; link the right Search Console property to GA4.
- Check production apex returns 200, www redirects once to apex, main routes have self-canonicals, sitemap URLs return 200, and unknown paths return real 404. Confirm no production `X-Robots-Tag: noindex`.
- Staging/workers.dev URLs retain noindex; API endpoints are not marketing landing pages. robots.txt is not an access control.
- Resolve Cloudflare 1034 routing/DNS separately. The text “Please enable cookies” in that error page is not the website consent UI. Do not alter unrelated mail DNS records.
- Record a baseline of indexed pages, Search Console clicks/impressions, consented organic sessions and confirmed form leads. No historic traffic, rankings or lead data has been available in this task.

## Official references

- [GTM container export and import](https://support.google.com/tagmanager/answer/6106997?hl=en)
- [Google GTM boilerplate export schema](https://github.com/google-marketing-solutions/gtm-boilerplate/blob/544385db21a16cfd3b15a38631abf526d4ae8e69/google_tag_manager_web/src/web-container.json)
- [Cloudflare error 1034](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1034/)
- [Google basic and advanced consent](https://developers.google.com/tag-platform/security/concepts/consent-mode)
- [GTM native consent APIs](https://developers.google.com/tag-platform/tag-manager/templates/consent-apis)
- [Template permissions](https://developers.google.com/tag-platform/tag-manager/templates/permissions)
- [GA4 recommended events](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [ICO privacy information](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/what-privacy-information-should-we-provide/)
- [GOV.UK invoice details, including sole traders](https://www.gov.uk/invoicing-and-taking-payment-from-customers/invoices-what-they-must-include)
