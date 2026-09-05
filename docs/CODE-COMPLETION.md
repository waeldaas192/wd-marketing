# Code completion — images may be supplied later

## Development branch

Continue on `feature/interactive-growth-navigation` (PR #2). This branch includes the design-system work from PR #1. Neither main nor the live domain is changed by this update.

## Image replacement, no component edits

Keep every filename in ASSET-MANIFEST.md. At build/render time, src/lib/media.ts compares each asset with the original placeholder fingerprint. Missing or unchanged sample assets render intentional typographic placeholders; a changed file is selected automatically. A content fingerprint is added to the image URL so rebuilt pages do not reuse the previous image cache key. The original file path stays unchanged.

1. Replace the appropriate file inside public/images with a real image of the same filename and format.
2. For the founder, supply only an approved real portrait. No portraitsReady flag is required anymore. The wide portrait remains an optional separate asset.
3. Restart `npm run dev` after replacement. For a deployed static page, rebuild/redeploy with `npm run build`.
4. Review the crop, alt text and mobile layout. A changed checksum is NOT an approval of accuracy, ownership or quality.

The hero is interactive code, not an image. Its two reserved hero artwork paths remain optional. Logo, mark and social cover retain their original paths. Gallery thumbnails, lightbox, next/previous, Escape and zoom activate when real project images are supplied. No font files are included or redistributed.

## Completed code paths

- Image fallback/versioning; project gallery/lightbox and founder replacement detection.
- Services overview and existing four service pages; complete canonicals for sitemap routes; breadcrumbs on work/services/contact/articles.
- Search/topic filtering for Insights, distinct article bodies and calculated reading-time estimates, homepage insights and native FAQ.
- Progressive on-scroll reveals using native Web Animations. Respect system reduced motion and the existing pause control; server HTML stays visible without animation.
- Three-step brief wizard with validation, back navigation, review summary, duplicate-submit prevention, preserved errors, clipboard and email fallback.
- Server contact handler: bounded JSON reading, field/URL checks, origin checks, honeypot, server-side Turnstile hostname/action verification, timeout handling and Resend adapter with idempotency. No PII logging or fake delivery success.

## Enable real contact delivery

Copy `.env.example` to `.env.local` (or enter variables securely in hosting settings). Set a restricted Resend sending API key, a sender on a verified domain, the real receiving mailbox, a Turnstile site/secret pair and expected hostname. Confirm the mailbox exists. Rebuild for NEXT_PUBLIC_TURNSTILE_SITE_KEY. Enable CONTACT_ENABLED only after configuration and an end-to-end owner-approved test.

The application rate limit is only a bounded per-process/per-email backstop, not a distributed firewall. Add an edge rate limit for `/api/contact` on the eventual host. Turnstile tokens are verified on the server. Provider acknowledgement confirms acceptance, not inbox delivery. A timeout remains explicitly unconfirmed. No automatic public-facing acknowledgement email is sent to a visitor-provided address.

No credentials are needed in the repository or chat. CRM and analytics are not activated by this update. No consent-dependent tracking scripts load by default.

## Tests

`qa/contact-unit.cjs` tests actual TypeScript using mocked providers (never real email). The production browser audit covers responsive layout, menus/motion and route metadata. `qa/completion-browser.cjs` adds wizard, search, FAQ and canonical checks. The gallery fixture uses the actual components with a mocked next/image adapter to exercise controls without waiting for the owner's photography. That test does not substitute for real image/crop QA.

## Launch review still required

Replace/approve images and copy, review the legal placeholder pages and document the actual processors, activate/test contact delivery, choose hosting and review production security/caching/tracking settings. This code update is not a full WCAG certification, physical-device audit, Lighthouse result or business-outcome guarantee.

Official implementation references:
- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/emails/idempotency-keys
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://www.w3.org/WAI/tutorials/carousels/
- https://nextjs.org/docs/app/getting-started/metadata-and-og-images
