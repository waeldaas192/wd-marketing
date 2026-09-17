# WD Marketing Project Profile

This file applies the shared WD Development Workflow to `waeldaas192/wd-marketing`.

## Application and runtime

- Application: Next.js 15.5.25 + React 19.2.0 + TypeScript.
- Styling: shared design tokens in `src/styles/design-tokens.css` plus existing project styles/components.
- Hosting/runtime: Cloudflare Workers through Wrangler.
- Data: Cloudflare D1 with Drizzle where used by contact/runtime flows.
- Deployment source: `.github/workflows/cloudflare.yml` and `npm run deploy`.

## Authoritative project documents

- UI and interaction rules: `docs/UI-SYSTEM.md`.
- Measurement/consent/search readiness: `docs/MEASUREMENT-SETUP.md`.
- Shared delivery standard: `docs/WD-DEVELOPMENT-WORKFLOW.md`.
- Exact verification commands: `docs/QUALITY-GATES.md`.

When this profile conflicts with a generic workflow example, the stricter project-specific rule wins unless an approved newer specification explicitly supersedes it.

## UI constraints

`src/styles/design-tokens.css` remains the visual source of truth. Preserve the current semantic navigation, keyboard behaviour, reduced-motion support and existing visual system. Do not introduce an unrelated visual redesign while implementing infrastructure or workflow work.

Responsive QA must preserve all current browser-audit coverage and include the shared workflow's 375px requirement. Automated checks do not replace human screenshot review.

## SEO constraints

Preserve existing URLs, canonicals, sitemap intent, production/staging indexing rules and truthful structured data. Marketing changes must not fabricate testimonials, FAQs, rankings, awards, client results, performance scores or social URLs.

## Measurement and privacy constraints

`docs/MEASUREMENT-SETUP.md` remains authoritative for consent and analytics behaviour. Do not send enquiry content or personal data to analytics. Account-side GA4, GTM, Search Console, email provider and Cloudflare settings are not considered verified merely because code exists for them.

## Contact and data flow

The contact endpoint must preserve server-side validation and truthful delivery status. Do not return a success state when delivery/storage has not actually succeeded. D1 and email/CRM delivery behaviour must be tested with isolated or authorised test data.

## Current launch blockers carried forward

The following items come from the existing project documentation and remain blockers until separately verified:

- Founder images are placeholders until approved portraits replace them and the project-specific readiness flag is intentionally enabled.
- The contact endpoint requires real, verified delivery integration before a public launch can claim the enquiry path is fully operational.
- Project/insight imagery and legal/editorial drafts that are marked as requiring approval remain subject to that approval.

This workflow implementation does not claim any of those blockers are resolved.

## Deployment constraints

The production deploy job must remain dependent on the `verify` job, must remain restricted to the `main` branch, and must continue to require the existing Cloudflare deployment enable flag. Browser QA artifacts are evidence only; production deployment must continue using the verified build artifact from `dist/`.

## External verification boundary

Do not claim any of the following are verified unless observed through an authorised source or production test:

- GA4/GTM account configuration;
- Search Console ownership/indexing;
- email/CRM delivery;
- Stripe or payment-provider state if later added;
- Cloudflare dashboard/DNS settings not visible through the current deployment evidence;
- field Core Web Vitals.
