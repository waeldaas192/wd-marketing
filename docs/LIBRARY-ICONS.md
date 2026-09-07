# Professional icon-library replacement

Replaces the handmade simulated-3D browser, magnifier, paper plane and layers after owner feedback. These are original Lucide library glyphs, not newly generated drawings styled to resemble a library.

## Source and licensing

A five-icon subset is vendored locally from `lucide-icons/lucide` tag `1.41.0`: panels-top-left, search, megaphone, workflow, send. Exact unmodified upstream SVGs and blob hashes are retained in `src/vendor/lucide/icons` and `sources.json`. The complete upstream ISC/Feather MIT license is in `src/vendor/lucide/LICENSE`. `nodes.json` reproduces the geometry; `qa/icon-source.cjs` verifies each hash and the rendered geometry data against the original SVG.

`LibraryIcon` renders this subset inline in React with a shared 24-unit grid, 1.75 stroke, round caps and joins. No icon font, CDN, new runtime package or generated artwork is used. This is a pinned local subset of the Lucide library, not an installation of the entire lucide-react package. Add future glyphs from the same upstream release with provenance/license verification.

## Placement

- Services: all four glyphs are 32px, optically centred in identical 56px frames. Frames align with the heading's left edge; the index sits at the opposite edge. The old 132–180px artwork area and its decorative dots/shadows are removed.
- Icons do not float, rotate or bounce on hover. Only the frame tint changes, and global/system motion settings disable this transition. Card links and their existing vector arrows remain usable.
- Process and the closing CTA use the same library instead of duplicate handmade layers/paper-plane illustrations. Their oversized illustration areas are reduced.
- The approved gradients, 24px cards, Inter type scale, original image filenames, header, hero ripple, connection bead, description slider and form logic are unchanged.

## Verification

New source-provenance and production-browser audits cover actual SVG geometry, seven viewport widths, alignment and centring, standard stroke, service destinations, hover stability, keyboard focus, motion pause, 200% root text, scoped axe and no-JavaScript rendering. Legacy studio tests were updated only where the owner explicitly replaced sculpture-specific expectations. The broader existing suites remain enabled.

Do not claim a new run has passed until the exact published commit is checked. No main merge, deployment or real email delivery is authorised by this icon change.

Official reference: https://lucide.dev/guide/react/getting-started
