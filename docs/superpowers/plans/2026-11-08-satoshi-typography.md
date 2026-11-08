# Satoshi Typography Implementation Plan

> **For agentic workers:** Apply the approved scope below with the existing verification gates and a final independent review.

**Goal:** Apply the owner's approved Satoshi design to WD Marketing's public website, then verify and deploy it.

**Architecture:** Retain the shared `--font-body` variable and use `next/font/local` with one unmodified, preloaded variable WOFF2. A build preparation script downloads and verifies the publisher's original file; font binaries remain outside the public Git repository.

**Tech Stack:** Existing Next.js, TypeScript, CSS modules, Node.js, Cloudflare Workers, Playwright and axe.

**Spec:** Owner's approval on 8 November 2026; the Typography section of `docs/UI-SYSTEM.md` records the accepted Satoshi family and 700/400/500 role weights.

## Global Constraints

- Headings 700; body 400; navigation and controls 500.
- Preserve content, URLs, metadata, images, layout, sizes, consent and contact behaviour.
- Use the existing shared styling and Cloudflare deployment pipeline.
- Keep the publisher's font bytes unchanged and outside public source control.

## Review Focus

- Missing/incorrect font download must fail the build rather than silently ship a fallback.
- A verified cached font must allow subsequent builds without another network request.
- Component-specific weights and `font: inherit` must not defeat the approved hierarchy.
- Mobile widths and 200% text enlargement must keep headings and navigation readable.
- The live site must serve the font from its own origin with successful font loading.

## Task 1: Apply the approved family and role weights

- [x] Inspect the current main branch, project instructions and successful baseline CI.
- [x] Download the official font and verify its provenance, format, size and SHA-256.
- [x] Add `scripts/prepare-satoshi.cjs`, build/development hooks and the ignored font directory.
- [x] Switch `src/app/layout.tsx` to the local Satoshi font and add shared weight tokens.
- [x] Update existing component typography overrides without changing layouts or copy.
- [x] Verify download/cache/integrity behaviour and run the existing build/static gates.

## Task 2: Verify and release

- [x] Update the browser audit to assert the actual loaded Satoshi face and role weights.
- [x] Run the production-style preview audit across all existing viewport, route, keyboard, motion and accessibility coverage.
- [ ] Review representative mobile/desktop screenshots and the independent code review.
- [ ] Publish through the existing verified GitHub/Cloudflare workflow.
- [ ] Verify production font loading, representative routes and responsive rendering.

## Execution notes

- The prior Inter family instruction is superseded by the owner's explicit approval of Satoshi.
- Styling uses existing browser audits; no tests duplicating individual CSS declarations are added.
- This task adds no database migrations or changes to deployment permissions.
- Local browser validation passed: 11 viewport widths plus 200% text, 37 sitemap routes and 22 automated accessibility scans, with no failures. The audit checks the actual loaded font, heading weights and representative desktop/mobile/form controls.
- The local browser used the environment's configured HTTPS proxy and its supplied certificate authority for external assets; no application asset URLs or CI network settings changed.
