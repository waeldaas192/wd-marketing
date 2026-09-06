# Pointer ripple, liquid transfer and horizontal descriptions

This increment updates the owner's existing branch, not main. No image assets, routes, form integrations or credentials are changed.

- The grid lines are actually displaced on a 2D canvas around a smoothed pointer and a bounded six-wave trail. It is not a circular spotlight over straight grid lines. The canvas renders only on fine-pointer devices, with a capped backing store; its frame loop sleeps after the pointer/ripples settle. A more visible CSS grid remains available without JavaScript, on touch devices, and with reduced/paused motion.
- The coloured pulse crosses in 720ms (previously 1100ms). Its shape stretches along the path and a separate receiving surface blends through an SVG alpha-threshold filter. Icon strokes and labels are never blurred. Description activation waits for actual arrival. The reading interval is 3600ms, separate from transfer speed.
- Descriptions including their action link slide left-out/right-in over 560ms using cubic-bezier(.65,0,.35,1). All slides share one grid cell, reserving the largest natural height at each breakpoint. Only the active slide is exposed to assistive technology; the outgoing slide is inert even while visible during exit. Rapid selection cancels old transitions. There is no arbitrary text clipping or fixed pixel height.
- Global pause, OS reduced motion, offscreen/hidden-tab handling, manual selection, focus, and the existing Play/Pause journey control are preserved. No new animation dependency.

The existing build/contact/browser/gallery/section/fluid checks are retained. `qa/ripple-merge.cjs` adds real pixel changes, geometric displacement, canvas bounds/idle, pulse timing/arrival/filter, slide directions, rapid selection, fixed shell height, accessible link count, pause/reduced/touch/no-JavaScript checks. It is not a physical-device or full WCAG certification. Live email and final artwork remain separate launch items.

Implementation references:
- https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
- https://developer.mozilla.org/en-US/docs/Web/API/Animation/finished
- https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feColorMatrix
- https://www.w3.org/WAI/tutorials/carousels/animations/
