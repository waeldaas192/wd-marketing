# Visible, unhurried connection and confident arrival

This replaces the previous 720ms transfer / 3600ms invisible dwell at the owner's request. Changes are scoped to the existing feature branch; no merge/deployment, images, dependencies or credentials are involved.

- A solid high-contrast 16px flight core is drawn independently of the liquid filter. It remains visible as a smaller docked bead at the active icon's edge, including hover, manual selection and reduced motion. It is never hidden during the ordinary reading interval.
- Neighbour transfers last 1800ms and the longer end-to-start return lasts 2600ms. A 900ms docked interval replaces the long empty wait. One description remains active throughout the transfer, with pause/hover controls available for reading.
- The path releases around the current symbol rather than through it, and the destination leans towards the drop before contact. After actual arrival, a 460ms compression/settle provides a finite receipt cue, not a spring loop.
- The icon receives its own short motion: lens focus, rising chart bars, screen settle, message-line movement or a small upward trend stroke response. All settle to their original geometry. No icon wiggles indefinitely.
- Stable description height and the existing left-out/right-in slider remain unchanged. Symbols and text are not goo-filtered. Measurement uses layout offsets so hover/receipt transforms cannot corrupt the next trajectory.
- The new production test samples actual marker visibility across an entire cycle and the mobile vertical rail, checks real attraction and settle/glyph animations, verifies arrival ordering and pause/reduced-motion cancellation. It produces JSON only, no screenshots or videos.

Timing in src/lib/journey-motion.ts is the source of truth. Previous test assertions for the old 720ms requirement were updated, not removed. Automated browser tests are not physical-device testing or full accessibility certification. Email/artwork/legal/hosting launch gates remain unchanged.

References: https://developer.mozilla.org/en-US/docs/Web/API/Animation and https://www.w3.org/WAI/tutorials/carousels/animations/
