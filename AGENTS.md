# WD Marketing repository instructions

Before modifying code, read `docs/UI-SYSTEM.md`, `docs/MEASUREMENT-SETUP.md`, `docs/PROJECT-PROFILE.md`, `docs/QUALITY-GATES.md`, and any feature-specific document touching the requested area.

Preserve existing component, routing, measurement and Cloudflare patterns unless an approved spec requires a change. `src/styles/design-tokens.css` is the visual source of truth. Do not add a library when current code or platform APIs solve the requirement cleanly.

For UI work, verify mobile and desktop behaviour, keyboard access, reduced motion, scroll stability, image loading and responsive overflow. Important content must not depend on animation. Review real screenshots or browser evidence before calling a visual change complete.

For SEO work, preserve valid existing URLs, canonicals, redirects, sitemap intent, robots behaviour and truthful structured data. Never fabricate reviews, FAQs, awards, rankings, client results or performance claims.

For analytics work, preserve the consent model in `docs/MEASUREMENT-SETUP.md`; never send enquiry content or personal data to analytics. Do not claim account-side Google settings are verified unless they were actually observed through an authorised source.

Never commit credentials, API secrets, private keys or production tokens. Keep secrets server-side and outside browser bundles.

Minimum code gates before claiming implementation complete:

- `npm run typecheck`
- `npm run build`
- relevant repository QA scripts from `docs/QUALITY-GATES.md`
- browser/responsive evidence for user-interface changes
- Production verification after deployment when deployment is in scope

A successful build alone is not completion. Report what was actually tested, identify any external system that was not observed, and keep known launch blockers explicit.
