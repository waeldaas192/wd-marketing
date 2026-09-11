# Interactive growth system and navigation update

Based on feature/global-experience-v1 at fd2a264; published separately on feature/interactive-growth-navigation so concurrent design-system work is not overwritten. Main and the base feature branch are untouched. Preserve the existing white/Inter tokens, original page routes and asset filenames. This is an additive interaction update, not a return to the older dark starter.

## Implemented in this update

- Five keyboard-operable growth-stage buttons. Each reveals explanatory copy and links to the corresponding service page. No invented analytics, testimonials or auto-advancing copy.
- Decorative signal motion runs only while the figure and browser tab are visible, system reduction is off and the user has not paused. The title and CTA are never hidden behind an introduction.
- Shared SSR-safe motion preference store with session persistence. Blocking session storage does not break the pause control. System reduced motion always wins over resume.
- Services disclosure placed directly after its trigger in DOM order. Enter/Space, Tab/Shift+Tab, ArrowDown/ArrowUp and Escape are supported. Moving focus outside closes it.
- Mobile navigation preserves scroll state, uses native modal keyboard containment, closes on same-page links and avoids explicitly restoring focus to a hidden trigger on breakpoint/navigation changes.
- Original image paths and logo references retained. No font binaries committed or redistributed.
- Ignore rules exclude environment files, audit output and accidental nested setup repositories.

## Validation

The base branch now uses document/heading/font readiness rather than networkidle. This update keeps that approach, adds an explicit hydrated-header check and verifies image loading. It does not mask broken-image or build failures.

The production workflow runs npm ci, TypeScript, build and Playwright/axe. Expanded coverage includes ten viewport widths, root text at 200%, all five growth controls, menu Tab order and focus containment, motion persistence/offscreen suspension, sitemap routes and the contact delivery launch gate. Record results for the new commit only; the base branch's passing run is not proof this update passed.

Manual screen-reader testing and physical iOS/Android testing remain separate. Do not claim full WCAG conformance, Lighthouse scores or field Core Web Vitals based on these automated checks.

## Still not launch approval

Email/CRM delivery is unconfigured; the endpoint intentionally returns 503 rather than claiming to deliver an enquiry. Project/insight images, approved founder photography and legal/editorial content still need review. Do not merge or deploy without review.

References:
- https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
- https://nextjs.org/docs/app/api-reference/functions/use-pathname
- https://playwright.dev/docs/accessibility-testing
