# Blue/violet glass and dimensional objects

Owner direction: the supplied business-icon reference combines a blue/cyan/violet background, softly lit 3D-looking objects and a translucent rounded panel. Apply that visual language below the existing header, without copying the reference's promotional lettering or uploading the screenshot as a website asset.

## Scope

- Homepage uses `data-studio-page` and named section hooks. `studio-theme.css` is isolated from the header and internal-page forms. Shared footer uses its own explicit hook.
- The Standard, Selected Work, Services, Process, Founder, Insights, FAQ and final conversion section have a connected blue/violet palette, frosted 20–24px surfaces and gentle ambient colour. Dark coloured sections have light headings; pale cards have separate dark text tokens.
- Four service-specific SVG sculptures and a larger closing paper-plane composition are decorative vector illustrations with simulated depth, not WebGL or photorealistic renders. Geometry, gradients and reflections are code; no new image/font/dependency is shipped. Their hover response is finite, respects pause/reduction and never intercepts input.
- The reference's glossy object + frosted copy composition is used for the final CTA. Actual project/founder images and existing asset paths are not replaced, tinted or cropped differently. Unfilled image slots remain explicitly labelled placeholders.
- Existing header source, five-stage bead timing/arrival, pointer-warped grid logic, description slider and reduced-motion preferences are preserved. Hero atmosphere colours are adjusted without changing its geometry or interaction.
- Existing form, gallery, routing, metadata and email-delivery configuration are not modified. Nothing is merged into main or deployed by this styling increment.

## Engineering and verification

Semi-opaque surfaces remain legible without `backdrop-filter`; smaller layouts use that lighter fallback. There is no section-wide animated blur, external image request, third-party runtime or auto-changing content added. Explicit hooks avoid substring selectors against generated CSS-module classnames.

Run the existing production/browser/contact/gallery/motion audits without removing coverage. `qa/studio-theme.cjs` adds all eight section hooks, actual backgrounds, decorative SVG semantics/unique IDs, 24px surfaces, seven responsive widths, native FAQ, motion-pause and internal-route isolation checks, plus eight section-scoped axe scans. Results must be recorded for the actual pushed commit in PR #2. Syntax transpilation alone is not a successful build.

Manual visual review and actual-device testing are separate from automated checks. The owner's reference is aesthetic direction, not a promise of exact pixel matching or improved conversions. Photography, legal copy, email setup and production launch review remain outstanding as already documented in CODE-COMPLETION.md.

Primary reference: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter
