# WD Marketing interface rules

`src/styles/design-tokens.css` is the shared source of truth. Use Satoshi for HTML text, as approved by the owner on 8 November 2026; the logo is separate brand artwork.

## Typography

- Headings: `--weight-heading: 700`; body copy: `--weight-body: 400`; navigation, buttons and action links: `--weight-control: 500`.
- Keep the existing type sizes and responsive spacing. Use the shared `--font-body` and `--font-display` variables; avoid component-specific font families.
- The 42.6 kB variable WOFF2 supports weights 300–900. `next/font/local` preloads it, serves it from the website's own origin and adjusts the Arial fallback metrics with `font-display: swap`.
- `npm run dev`, `npm run dev:turbo` and `npm run build` prepare the unmodified font from Fontshare's official CDN, verify its SHA-256, and reuse a matching local copy.
- Downloaded font files stay in ignored `src/app/fonts/`. The ITF Free Font License permits website self-hosting but not font redistribution through a public source repository. Do not commit, subset or convert the font file. Source and licence: https://www.fontshare.com/fonts/satoshi and https://www.fontshare.com/licenses/itf-ffl.

## Hierarchy

- Homepage H1: 40–72 CSS px at default root size. Page H1: at most 64 px.
- Section H2: 30–48 px. Narrow-column headings: 30–40 px.
- Cards: 22–28 px, project names may reach 36 px. Body: 16 px. UI labels: at least 12 px.
- Section heading line-height: 1.14. Body: 1.7. Never clip text to enforce equal height.
- Use SectionHeading, shared containers and spacing tokens instead of independent viewport scales.
- Keep all process stages fully opaque. Use background and an accent line for the active stage.
- White backgrounds, dark readable copy, borderless desktop navigation, keyboard-operable disclosure and native mobile dialog.
- Honour reduced motion and the pause control; do not hide content behind animation.

## Verification

The UI and build audit workflow runs locked dependencies, TypeScript, production build, then Playwright/axe against the production preview. The browser script covers eleven viewport widths, 200% root-text enlargement (not browser zoom), actual Satoshi loading and role weights, heading sizes/overflow, navigation interactions, motion preferences, automated accessibility and sitemap-route status/metadata checks. Artifacts include screenshots and report.json. Visual review is required; automated checks alone are not complete WCAG conformance and do not establish Lighthouse or field Core Web Vitals scores.

References: https://www.w3.org/TR/WCAG22/ and https://playwright.dev/docs/accessibility-testing

## Launch gates

Founder images are placeholders. A typographic identity card is displayed until approved portraits replace the existing files and assets.founder.portraitsReady becomes true. Project/insight imagery and legal/editorial drafts still need approval.

The contact endpoint previously logged personal data and falsely returned success without delivering enquiries. It now returns 503 until a real email/CRM delivery integration is configured and verified. The form preserves input on failure and provides a mailto alternative. Do not launch publicly before resolving this gate.

Do not invent results, testimonials, awards, social profile URLs or performance scores. Do not merge into main without reviewing tests and screenshots.
