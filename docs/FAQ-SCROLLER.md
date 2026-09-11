# FAQ scroller integration

The supplied FaqCard / HorizontalScroller / FaqSection composition is integrated into the existing homepage FAQ location, before the closing CTA. It is not an unrelated habit-app demo page.

## Project structure and dependencies

- Next.js App Router, TypeScript strict mode and Tailwind v4 already exist. No framework migration or second Tailwind entry point is needed.
- The project maps `@/*` to `src/*`. Its correct UI directory is therefore `src/components/ui`, imported as `@/components/ui`. Creating another root `components/ui` would create two incompatible locations, not improve shadcn compatibility.
- `components.json` records these paths, `rsc: true`, `tsx: true`, the current `src/app/globals.css` entry point and an empty Tailwind config path (v4). `cssVariables: false` avoids silently replacing the site's existing theme with new global shadcn colours. This prepares CLI paths; it does not install every shadcn component or a new provider.
- `src/lib/utils.ts` supplies the standard typed `cn` helper with pinned clsx and tailwind-merge dependencies. `tw-animate-css` is installed and imported once in the existing stylesheet, as requested. Its dependency lock was generated with npm, not guessed. Existing package versions remain unchanged.
- For a new unrelated app, the normal starting point is `npx shadcn@latest init`; existing projects can add individual components using `npx shadcn@latest add <component>`. Do not run init/overwrite on this existing design without a separate review. This component needs no additional context provider, image, stock-photo request, icon font or new SVG library.

## Files and props

- `src/components/ui/habit-faq-scroller.tsx`: named FaqCard and HorizontalScroller exports and default FaqSection. Props and custom CSS properties are strictly typed, with direction/duration types and a safe invalid-duration fallback.
- `src/components/ui/habit-faq-scroller.demo.tsx`: local DemoOne example using the actual business data; not exposed as a public route.
- `src/data/faqs.ts`: editable heading, subtitle and three rows, with the same data/rows/faqItems shape as the supplied snippet. Rows move left/right/left at 60s, 45s and 70s per full loop.
- `src/components/sections/FAQ.tsx`: homepage integration. Existing five questions are retained; the existing enquiry/payment explanation is split into a sixth card, not a new commercial promise. No fictional free trial, subscription plan or data-security guarantees have been imported from the habit demo.
- `src/styles/faq-scroller.css`: scoped masks, card layout and responsive/readable modes. Existing Inter scale, 24px corners and the established background remain. `globals.css` defines both keyframes AND the Tailwind animation utilities missing from the original snippet. The snippet's fadeInUp keyframe is available, but headings are never hidden by an inline opacity:0 rule; the existing progressive reveal system handles their entry.

## Motion and reading

Desktop rows use two equal repeated groups, repeating a short source sequence enough times to span wide screens. The animation moves exactly half the complete track width. Copies are inert and aria-hidden; only the original questions are accessible. Keep FaqCard text-only when reusing it to avoid duplicated DOM IDs or interactive elements.

Hover pauses an individual row at its current position. Pause FAQ scrolling stops all rows without resetting them; Read all questions switches to a stationary complete layout. Global pause/reduced-motion and no-JavaScript contexts expose all original cards without clipping or duplicated answers. Touch/small screens use native swipe instead of autoplay, with the same Read all option. No answers have a fixed clipping height or line clamp. Loops suspend offscreen and when the document is hidden.

## Verification

`qa/faq-scroller.cjs` checks actual CSS motion/directions/durations, equal group widths and wide-screen fill, accessible copy count, hover and explicit pause, keyboard read-all, responsive/manual swipe, global/reduced-motion, root text and no-JavaScript fallbacks. Only obsolete accordion assertions are replaced in existing tests; header, hero, icons, routes, gallery and form coverage remain intact. Results must be verified for the exact new commit. No launch/deployment, live email or image changes are part of this request.

Official implementation references:
- https://ui.shadcn.com/docs/components-json
- https://tailwindcss.com/docs/animation
- https://github.com/Wombosvideo/tw-animate-css
- https://www.w3.org/WAI/tutorials/carousels/animations/
