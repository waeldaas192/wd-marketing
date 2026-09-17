# WD Development Workflow — Design Specification

**Date:** 2026-09-17  
**Status:** Design approved in chat; implementation pending written-spec review  
**Reference repository:** `waeldaas192/wd-marketing`

## 1. Purpose

Create one reusable delivery standard for WD Marketing web projects so design quality, SEO, measurement, accessibility, performance, testing, security, Cloudflare deployment and post-deployment verification are handled consistently instead of being re-specified for every repository.

This standard must work for Next.js and Astro marketing sites first, while allowing project-specific extensions for ecommerce, dashboards, WordPress migrations and Cloudflare-backed applications.

## 2. Guiding principle

A successful build is not a finished project.

The default delivery path is:

`Requirements → Design direction → Architecture → Implementation → Responsive QA → Accessibility → SEO → Measurement → Performance → Security review → Automated tests → Deployment → Production verification`

A project may not be marked complete merely because TypeScript compiles or the production build succeeds.

## 3. Existing WD Marketing constraints to preserve

The workflow must build on the current repository rather than replace its working conventions.

- Keep `src/styles/design-tokens.css` as the visual source of truth where the project uses it.
- Preserve the current UI rules in `docs/UI-SYSTEM.md` unless a later approved design spec explicitly supersedes them.
- Preserve existing measurement and consent behaviour documented in `docs/MEASUREMENT-SETUP.md`.
- Preserve existing Cloudflare deployment scripts and Wrangler-based runtime.
- Reuse current scripts such as `typecheck`, `build`, `test:backend`, `test:deployment`, `test:measurement` and project-specific QA scripts.
- Never invent testimonials, awards, performance results, rankings, social URLs, client results or business claims.

## 4. Workflow architecture

The standard has three layers.

### Layer A — Repository instructions

Every participating repository receives an `AGENTS.md` at its root. It contains mandatory delivery rules for coding agents and humans, including:

- read project-specific docs before modifying code;
- inspect existing patterns before introducing libraries;
- preserve URLs and SEO-critical behaviour during migrations;
- use the project design system instead of ad-hoc styling;
- prefer simple motion and honour `prefers-reduced-motion`;
- never declare completion without verification evidence;
- do not expose secrets or place secret values in browser bundles;
- run the project-specific quality gates before merge/deployment.

### Layer B — Reusable WD workflow document

Create `docs/WD-DEVELOPMENT-WORKFLOW.md` as the human-readable operating standard. It defines the phases, acceptance gates and evidence required for completion.

### Layer C — Machine-checkable quality gates

Where the repository supports them, add package scripts and CI steps for:

- TypeScript/type validation;
- production build;
- lint/static checks when configured;
- route and metadata checks;
- responsive browser tests;
- accessibility automation;
- analytics/consent regression checks;
- backend/API tests;
- deployment smoke tests.

The workflow must use existing scripts before adding overlapping ones.

## 5. Phase requirements

### Phase 1 — Requirements and scope

Before implementation, record:

- business objective;
- primary conversion;
- target service/location/product pages;
- framework and hosting target;
- existing URLs that must remain stable;
- required integrations;
- launch blockers;
- claims or assets that require client approval.

No implementation starts from an ambiguous design request when a material architectural choice is unresolved.

### Phase 2 — Design direction

For visual work, establish the direction before component implementation.

Required checks:

- typography hierarchy;
- spacing rhythm;
- image treatment;
- component density;
- desktop/mobile behaviour;
- interaction/motion behaviour;
- accessibility implications;
- visual consistency with the brand.

Avoid generic AI-generated layouts, excessive gradients, decorative motion without purpose, oversized typography that harms mobile usability, and fixed CTA bars on premium editorial layouts unless explicitly required.

### Phase 3 — Architecture

Use the minimum architecture that supports the requirement.

Preferred defaults for custom WD sites:

- TypeScript;
- Next.js or Astro according to rendering/application needs;
- Tailwind CSS and/or project design tokens;
- custom components first;
- Radix primitives only where they improve accessibility/interaction;
- Lucide or the existing project icon system;
- AVIF/WebP responsive images;
- Cloudflare where it matches the existing hosting architecture.

Do not add a dependency when the platform or current codebase already provides the required capability cleanly.

### Phase 4 — Implementation

Implementation must:

- follow existing component boundaries and naming;
- keep files focused by responsibility;
- preserve semantic HTML;
- keep important content available without animation;
- avoid layout shift from late-loading UI;
- keep client-side JavaScript proportional to the interaction need;
- preserve canonical URLs and redirects during migrations;
- keep secrets server-side.

### Phase 5 — Responsive QA

Responsive review is required at minimum across representative widths:

- 320px;
- 375px;
- 390px;
- 430px;
- 768px;
- 1024px;
- 1280px;
- 1440px;
- 1920px.

Check:

- no horizontal overflow;
- readable typography;
- usable navigation;
- forms and controls remain accessible;
- galleries do not flash, jump or crop unpredictably;
- menus do not unexpectedly alter scroll position;
- images remain appropriately sized and sharp;
- 200% text enlargement does not break critical content.

### Phase 6 — Accessibility

Automated accessibility checks are required where browser testing is available, but they are not treated as proof of full conformance.

Required behaviour includes:

- keyboard-operable navigation and dialogs;
- visible focus state;
- semantic landmarks and heading hierarchy;
- accessible names for controls;
- sufficient readable contrast;
- reduced-motion support;
- no essential information hidden behind hover or animation only.

### Phase 7 — SEO and AI-search readiness

Every marketing launch must verify:

- unique titles and descriptions for indexable pages;
- one clear primary page topic;
- self-referencing canonicals where appropriate;
- correct robots directives;
- sitemap contains intended canonical URLs only;
- production routes return correct status codes;
- staging/preview environments remain non-indexable when required;
- structured data is valid and matches visible content;
- internal links connect service, location, case-study and supporting pages intentionally;
- important content exists in rendered HTML and is not dependent on client-only interaction;
- no fabricated FAQ, review or organization claims are added solely for schema.

AI-search readiness is treated as an extension of technical/content SEO, not a replacement for it. Pages should provide clear entities, concise factual passages, strong supporting detail and crawlable HTML.

### Phase 8 — Measurement

Before production activation:

- confirm GTM/GA4 IDs and environment flags;
- confirm consent behaviour before analytics loads;
- verify one intended page-view event per route change;
- verify lead events only after confirmed successful submission;
- ensure no personal enquiry content is sent to analytics;
- test accept, reject and withdrawal paths;
- document account-side steps that code alone cannot verify.

For `wd-marketing`, the existing consent and measurement specification remains authoritative.

### Phase 9 — Performance

Performance review must consider:

- image dimensions and formats;
- font loading;
- JavaScript shipped to the browser;
- third-party scripts;
- caching;
- lazy loading below the fold;
- layout stability;
- animation cost;
- API latency for conversion paths.

Internal targets for healthy field data are LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1 at the 75th percentile where real-user data exists. Lab scores are diagnostic evidence, not a substitute for field data.

### Phase 10 — Security review

Before deployment, review at minimum:

- secret/environment separation;
- server-side validation;
- user-controlled HTML/URL handling;
- authentication/authorization when present;
- file upload restrictions when present;
- rate limiting/abuse controls for public endpoints where appropriate;
- error responses that do not leak internals;
- dependency changes that materially expand attack surface.

Never commit credentials, API secrets, private keys or production tokens.

### Phase 11 — Automated verification

Minimum merge/deploy evidence for a code change is:

1. typecheck passes;
2. production build passes;
3. relevant automated tests pass;
4. changed user flows are manually or browser-automation tested;
5. responsive screenshots or equivalent visual evidence are reviewed for UI changes;
6. no new blocking console/runtime errors appear;
7. SEO-critical route/metadata behaviour is checked for marketing changes.

Existing project-specific tests remain mandatory.

### Phase 12 — Deployment and production verification

For Cloudflare-backed projects:

- deploy only from the expected repository/ref;
- verify the deployment reached the intended Worker/Pages project;
- verify apex/www routing behaviour;
- verify key routes return expected status codes;
- test the primary conversion path on production;
- verify analytics only when consented;
- verify canonical/robots/sitemap behaviour on the live host;
- record the deployed commit SHA when practical.

A successful CI deployment alone does not close the task.

## 6. Completion evidence

A task can be described as complete only when the response or PR records what was actually verified.

For substantial website changes, report:

- files/areas changed;
- commands/tests run;
- production build result;
- responsive/interaction checks performed;
- known limitations or unverified external systems;
- deployment commit or PR when applicable.

Do not claim account-side Google, email, Stripe, CRM or Cloudflare configuration was verified unless it was actually observed through an authorized source.

## 7. Project profiles

The common workflow remains stable, while each repository can add a short profile for its own constraints.

Examples:

- **Marketing site:** SEO, schema, location/service architecture, contact conversion, GA4/GTM.
- **Ecommerce:** product/catalog integrity, checkout, payments, shipping, product schema, feed quality.
- **Dashboard/app:** authentication, authorization, state changes, error handling, auditability, accessibility.
- **WordPress migration:** URL parity, redirects, content extraction, media optimization, schema parity, analytics parity.

A project profile may add stricter gates but should not weaken the common ones without an explicit documented reason.

## 8. Proposed repository files

Implementation for the reference repository will create or update:

- `AGENTS.md` — compact mandatory instructions for coding agents.
- `docs/WD-DEVELOPMENT-WORKFLOW.md` — full operating standard.
- `docs/PROJECT-PROFILE.md` — WD Marketing-specific constraints and launch gates.
- `docs/QUALITY-GATES.md` — exact commands and acceptance evidence for this repository.
- `package.json` — only if a small number of non-overlapping convenience scripts are useful.
- `.github/workflows/cloudflare.yml` — only if current CI is missing required pre-deploy gates; existing deployment behaviour must be preserved.

The implementation must not rewrite the application or redesign the live website as part of this task.

## 9. Rollout to other repositories

After the reference implementation is accepted:

1. copy the common workflow and agent rules;
2. create a repository-specific profile;
3. map existing test/build/deploy commands;
4. remove instructions that reference WD-Marketing-only implementation details;
5. add project-specific gates;
6. verify the workflow on one real change before treating the repository as migrated.

The first rollout candidates are the active custom-code WD projects using GitHub/Cloudflare; WordPress-only projects receive a separate profile rather than forced Next.js assumptions.

## 10. Success criteria

The workflow succeeds when:

- a new coding session can understand the project delivery rules without repeated prompting;
- visual changes are reviewed on mobile and desktop before completion;
- SEO/measurement/security checks are part of delivery rather than afterthoughts;
- deploys include production verification;
- claims of completion are backed by evidence;
- the same core standard can be reused across WD Marketing client repositories with only a small project profile changing.
