# WD Development Workflow

This is the default delivery standard for WD Marketing web projects. It complements project-specific documentation and does not replace stricter repository rules.

A successful build is not a finished project. The standard path is:

`Requirements → Design direction → Architecture → Implementation → Responsive QA → Accessibility → SEO → Measurement → Performance → Security review → Automated verification → Deployment → Production verification`

## 1. Requirements and scope

**Objective:** establish the business and technical constraints before implementation.

**Required checks:** business objective, primary conversion, target service/location/product pages, framework, hosting, stable URLs, integrations, launch blockers, client-supplied claims/assets and migration constraints.

**Evidence:** approved spec, issue, project brief or equivalent written scope.

**Completion gate:** no material architectural decision remains ambiguous.

## 2. Design direction

**Objective:** establish a coherent visual and interaction direction before component work.

**Required checks:** typography hierarchy, spacing rhythm, image treatment, component density, desktop/mobile behaviour, interaction/motion behaviour, accessibility implications and brand consistency.

Avoid generic AI layouts, decorative motion without purpose, oversized mobile typography, unnecessary gradients and fixed CTA bars on premium editorial layouts unless specifically required.

**Evidence:** approved design direction, existing project design system or reviewed implementation references.

**Completion gate:** visual direction is clear enough that components do not need to invent styling independently.

## 3. Architecture

**Objective:** use the minimum architecture that supports the requirement reliably.

Preferred defaults for custom WD sites are TypeScript, Next.js or Astro according to rendering/application needs, Tailwind and/or project design tokens, custom components first, accessible primitives where they improve behaviour, responsive AVIF/WebP images and Cloudflare where it matches the existing platform.

**Required checks:** rendering model, client/server boundary, data flow, integrations, caching, error handling, URL structure and deployment target.

**Evidence:** architecture notes in the spec or existing repository conventions.

**Completion gate:** the implementation path is compatible with the current repository and avoids unnecessary dependencies.

## 4. Implementation

**Objective:** build the approved behaviour while preserving maintainability and semantic output.

**Required checks:** existing component boundaries and naming, semantic HTML, server-side secret handling, limited client JavaScript, stable layout, correct loading behaviour, canonical URL preservation and migration redirects where required.

Important content must remain available without animation. Do not hide critical content behind hover-only or JS-only interaction.

**Evidence:** code diff and targeted tests.

**Completion gate:** implementation matches the approved scope with no unrelated refactor.

## 5. Responsive QA

**Objective:** make layout and interaction reliable across real device classes rather than one desktop and one phone width.

Minimum representative widths: 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 CSS pixels. A repository may test additional widths.

**Required checks:** no horizontal overflow, readable typography, usable navigation, accessible forms/controls, stable galleries, no unexpected scroll jumps, correctly sized/sharp images and 200% text enlargement without critical breakage.

**Evidence:** browser automation plus representative screenshots or manual device review.

**Completion gate:** changed UI flows work on mobile and desktop and visual evidence has been reviewed.

## 6. Accessibility

**Objective:** include accessibility as a delivery requirement rather than a later repair task.

**Required checks:** keyboard-operable navigation/dialogs, visible focus, semantic landmarks/headings, accessible names, readable contrast, reduced-motion support and no information available only through hover or animation.

Automated axe-style checks are useful evidence but do not establish full WCAG conformance.

**Evidence:** automated accessibility report plus interaction review for changed components.

**Completion gate:** no known blocking accessibility regression from the change.

## 7. SEO and AI-search readiness

**Objective:** keep marketing pages technically crawlable, indexable where intended, truthful and easy to understand by search engines and AI systems.

**Required checks:** unique titles/descriptions, clear page topic, self-canonicals where appropriate, correct robots directives, clean sitemap, correct HTTP status codes, preview/staging noindex where required, valid structured data matching visible content, intentional internal linking and important content available in rendered HTML.

Never fabricate FAQ, review, organization or performance claims for schema. AI-search readiness extends technical/content SEO; it does not replace it.

**Evidence:** route/metadata tests, rendered HTML, sitemap/robots checks and production verification.

**Completion gate:** indexable routes expose the intended canonical metadata and truthful crawlable content.

## 8. Measurement

**Objective:** measure business actions without violating the consent design or leaking enquiry data.

**Required checks:** GTM/GA4 IDs and flags, analytics blocked before required consent, one intended page view per route transition, lead events only after confirmed success, no enquiry fields sent to analytics, accept/reject/withdrawal behaviour and documented account-side steps.

**Evidence:** automated regression tests plus Tag Assistant/DebugView/browser evidence when account-side activation is in scope.

**Completion gate:** code-side behaviour is verified and any unobserved account-side configuration is clearly labelled unverified.

## 9. Performance

**Objective:** keep experience fast while preserving design and conversion quality.

**Required checks:** image sizing/formats, fonts, shipped JavaScript, third-party scripts, caching, below-fold lazy loading, layout stability, animation cost and API latency on conversion paths.

Healthy field-data targets, when real-user data exists at the 75th percentile: LCP <= 2.5 s, INP <= 200 ms and CLS <= 0.1. Lab scores are diagnostic evidence, not field performance claims.

**Evidence:** bundle/build checks, browser evidence and field data where available.

**Completion gate:** no unexplained regression in known performance-sensitive areas.

## 10. Security review

**Objective:** prevent a normal feature change from weakening the public attack surface.

**Required checks:** secret/environment separation, server validation, user-controlled HTML/URL handling, authentication/authorization where present, file upload restrictions, abuse/rate controls where appropriate, safe error responses and dependency risk.

**Evidence:** code review and relevant tests.

**Completion gate:** no credentials are committed and no known critical security regression remains.

## 11. Automated verification

**Objective:** make completion evidence repeatable.

Minimum evidence for a substantive code change:

1. type validation passes;
2. production build passes;
3. relevant repository tests pass;
4. changed user flows are manually or browser-automation tested;
5. UI changes have responsive visual evidence;
6. no new blocking console/runtime errors appear;
7. SEO-critical route/metadata behaviour is checked for marketing changes.

**Evidence:** command output, CI and artifacts.

**Completion gate:** all required project quality gates are green or an explicit unresolved blocker is recorded.

## 12. Deployment and production verification

**Objective:** prove the intended code reached the intended production environment and still behaves correctly there.

For Cloudflare projects verify the expected repository/ref, Worker/Pages target, apex/www routing, key route status codes, primary conversion path, consented analytics behaviour, canonical/robots/sitemap behaviour and deployed commit SHA where practical.

A green deployment job alone does not close the task.

**Evidence:** production requests/browser checks and deployment/commit reference.

**Completion gate:** production behaviour is verified for the changed critical paths, with external/account-side limitations explicitly stated.
