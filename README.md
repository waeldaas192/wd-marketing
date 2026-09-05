# WD Marketing — Premium Website

Production-minded Next.js website for WD Marketing.

## Current build

- Premium responsive homepage
- Sticky desktop navigation
- Fullscreen animated mobile navigation
- Large multi-column footer
- Work index
- 3 structured case-study routes
- 4 dedicated service pages
- About/founder page
- Insights index + 3 starter article routes
- Project enquiry funnel
- Functional `/api/contact` validation endpoint
- Privacy and Terms draft routes
- Global metadata
- JSON-LD ProfessionalService schema
- sitemap.xml + robots.txt
- Responsive design system
- reduced-motion support
- AVIF/WebP-ready Next Image config

## Stack

- Next.js 16.3.3
- React 19.2
- TypeScript
- Tailwind CSS 4.3
- App Router

## Run

```bash
npm install
npm run dev
```

## Before public launch

1. Replace the temporary WD brand mark with final SVG assets.
2. Add Wael's editorial founder photography in `public/images/founder/`.
3. Add verified project screenshots to the project asset folders.
4. Replace all evidence-pending case-study notes with verified metrics only.
5. Connect `/api/contact` server-side to Resend and/or the chosen CRM. The current endpoint validates and accepts form submissions but deliberately does not send them externally.
6. Add GA4/GTM/Google Ads/Meta tags only after consent and tracking architecture are finalised.
7. Review Privacy/Terms with appropriate UK legal guidance before launch.
8. Add final Open Graph image, favicon and social profile URLs.
9. Run Lighthouse, accessibility, device and browser QA on the deployed build.

## Asset map

```text
public/
  images/
    brand/
    hero/
    founder/
    projects/
      stone-pro/
      roofing/
      exp-auto-parts/
  videos/
  icons/
```


## Global Phase
Signature hero upgraded to the WD Growth Engine: search → traffic → experience → lead → revenue, with pointer depth, animated flow, editorial typography, reduced-motion support, and no fabricated metrics.
