# Section motion update

Extends current source f229896 on feature/interactive-growth-navigation. A newer code-completion update arrived during preparation, so its media resolver, CaseGallery, contact implementation, routes and existing audits are retained. No older layout or duplicate gallery component is copied over them.

One PageMotion controller enhances headings, principle cards, service cards, project articles, founder copy and the final CTA. Standard HTML remains fully visible without JavaScript. Text is never faded below its designed contrast. Entry uses 20px of travel / 640ms on fine pointers and 10px / 380ms on coarse pointers, with a bounded optional stagger.

Pause, system reduction, tab hiding, route cleanup or keyboard focus cancel active animations to their fully visible base styles. Nested reveal markers are ignored to prevent doubled transforms. Above-the-fold content is never delayed. The supplemental audit records actual browser motion and checks pause/focus, reduced motion, and no-JavaScript content.

No public image path, logo, data manifest, package version or email configuration is modified. Main remains unchanged. This is an incremental interaction update, not a live-site launch or a performance/WCAG certification.

References:
- https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
- https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
