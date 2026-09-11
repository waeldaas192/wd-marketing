# WD Marketing — Asset Manifest

Replace the placeholder files with your final assets using the **same filename and path**. The code is already linked to these files.

## Brand

| File | Size | Format | Use |
|---|---:|---|---|
| `public/images/brand/wd-marketing-ribbon-mark.png` | 720×356 | PNG transparent | Ribbon mark in the header + footer lockups |
| `public/images/brand/wd-marketing-favicon.png` | 512×512 | PNG transparent | Browser icon / compact brand use |
| `public/images/brand/wd-marketing-og-cover.jpg` | 1200×630 | JPG | Open Graph / WhatsApp / LinkedIn share image |

### Logo rules
- Keep transparent background.
- The horizontal lockup pairs the ribbon mark with live `WD Marketing` typography so it stays sharp and readable at every breakpoint.
- Preserve the magenta and purple ribbon colours and transparent background.
- Do not bake glow, shadow or background into the logo file.

## Hero

| File | Size | Format | Use |
|---|---:|---|---|
| `public/images/hero/wd-marketing-growth-dashboard.webp` | 1600×1100 | WebP | Desktop/tablet hero Growth System visual |
| `public/images/hero/wd-marketing-growth-dashboard-mobile.webp` | 900×1100 | WebP | Mobile hero art-direction version |

**Composition:** dark premium analytics/growth visual. Keep key UI content inside the central 80% so cropping stays safe. Avoid tiny text that becomes unreadable.

## Founder

| File | Size | Format | Use |
|---|---:|---|---|
| `public/images/founder/wael-digital-growth-strategist.webp` | 1400×1750 | WebP | Portrait section on homepage (4:5) |
| `public/images/founder/wael-wd-marketing-founder.webp` | 1800×1200 | WebP | About page wide editorial image (3:2) |

**Photography direction:** dark editorial portrait, natural skin tone, controlled key light, clean background, black/navy wardrobe, enough negative space for responsive crops.

## Stone Pro Worktops

| File | Size | Format | Use |
|---|---:|---|---|
| `public/images/projects/stone-pro/stone-pro-worktops-london-case-study.webp` | 1800×1200 | WebP | Project cover / selected work / case-study hero |
| `public/images/projects/stone-pro/stone-pro-worktops-website-desktop.webp` | 1800×1125 | WebP | Desktop website presentation |
| `public/images/projects/stone-pro/stone-pro-worktops-mobile-experience.webp` | 1200×1500 | WebP | Mobile screens / UI montage |
| `public/images/projects/stone-pro/stone-pro-worktops-colour-gallery.webp` | 1800×1125 | WebP | Colour catalogue / gallery interface |

## SMA Marble

| File | Size | Format | Use |
|---|---:|---|---|
| `public/images/projects/sma-marble/sma-marble-london-case-study.webp` | 1800×1125 | WebP | Project cover / selected work / case-study hero |
| `public/images/projects/sma-marble/sma-marble-worktop-services.webp` | 1800×1125 | WebP | Premium worktop range presentation |
| `public/images/projects/sma-marble/sma-marble-project-gallery.webp` | 1800×1125 | WebP | Craftsmanship, trust and completed projects |

## MB Legacy Roofing

| File | Size | Format | Use |
|---|---:|---|---|
| `public/images/projects/roofing/mb-legacy-roofing-london-case-study.webp` | 1800×1200 | WebP | Project cover / case-study hero |
| `public/images/projects/roofing/mb-legacy-roofing-website-desktop.webp` | 1800×1125 | WebP | Main website presentation |
| `public/images/projects/roofing/mb-legacy-roofing-local-seo-structure.webp` | 1800×1125 | WebP | Service/location architecture visual |
| `public/images/projects/roofing/mb-legacy-roofing-mobile-lead-page.webp` | 1200×1500 | WebP | Mobile conversion landing page |

## EXP Auto Parts

| File | Size | Format | Use |
|---|---:|---|---|
| `public/images/projects/exp-auto-parts/exp-auto-parts-uk-case-study.webp` | 1800×1200 | WebP | Project cover / case-study hero |
| `public/images/projects/exp-auto-parts/exp-auto-parts-ecommerce-desktop.webp` | 1800×1125 | WebP | Ecommerce desktop interface |
| `public/images/projects/exp-auto-parts/exp-auto-parts-product-catalogue.webp` | 1800×1125 | WebP | Product/category catalogue visual |
| `public/images/projects/exp-auto-parts/exp-auto-parts-mobile-shopping.webp` | 1200×1500 | WebP | Mobile ecommerce experience |

## Insights

| File | Size | Format | Use |
|---|---:|---|---|
| `public/images/insights/seo-lead-generation-strategy.webp` | 1600×1000 | WebP | SEO article card + article hero |
| `public/images/insights/google-ads-landing-page-conversion.webp` | 1600×1000 | WebP | Paid acquisition article |
| `public/images/insights/local-service-growth-system.webp` | 1600×1000 | WebP | Growth systems article |

## Export settings

- Photographic/UI images: WebP, quality 80–88.
- Keep each normal image ideally below **250–350 KB**; hero images ideally below **450 KB** after optimisation.
- Use sRGB.
- Do not export text-heavy screenshots at low resolution.
- Do not put filenames such as `final-2`, `img001`, `screenshot-new`; keep the exact SEO-friendly names above.
- The project code contains descriptive `alt` text separately; do not burn SEO text into the image.

## Where the code is linked

- Brand + hero + founder assets: `src/data/assets.ts`
- Project assets + alt text + galleries: `src/data/projects.ts`
- Insight assets + alt text: `src/data/insights.ts`
