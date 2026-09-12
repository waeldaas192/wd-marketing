# Approved soft-grid and pulse direction

Implements the owner-approved image direction in the actual Next.js code. This is not a generated mockup. Preserve existing routes, contact code, image filenames and the Inter type hierarchy.

- Header: correctly aligned SVG chevron, floating 24px mega panel, no boxed service-card borders. Shared vector arrows respond to hover and keyboard focus. Primary controls use 24px corners and restrained press/hover feedback.
- Hero: masked slow-moving grid, rounded atmospheric tiles at mixed fixed blur levels. All atmospheric layers are decorative, never capture input, and stop offscreen, in a hidden tab, or when motion is paused/reduced. Static layers remain when motion is disabled.
- Growth journey: a 1.1-second pulse travels to measured icon centres after a 4.8-second reading interval. The selected stage and corresponding description change only after arrival. The mobile vertical rail uses the same measured geometry.
- Pause journey is independent of Pause motion. Hover/focus suspends autoplay. Manual icon selection stops it until explicitly played again. Inactive descriptions are inert and hidden from assistive technology, but share a grid cell to preserve shell height. Automatic changes are not announced as live alerts. Existing arrow/Home/End keyboard controls remain.
- Description: frosted 24px surface and round stage icon. No blue side border. Image assets are not required for this interface.

QA: the existing production/build, responsive, keyboard, contact, gallery and motion suites are retained. qa/fluid-hero.cjs adds actual pulse-before-description ordering, manual/hover pause, stable shell dimensions, SVG chevron checks and reduced motion. Run results must be checked for the exact published commit. No field speed score or complete WCAG conformance claim.

Implementation references: https://www.w3.org/WAI/tutorials/carousels/animations/ and https://developer.mozilla.org/en-US/docs/Web/API/Animation/finished
