# WD Marketing Technical SEO + Index Cleanup — Design Specification

**Date:** 2026-09-17  
**Status:** Approved for implementation in chat  
**Property:** `sc-domain:wdmarketing.co.uk`

## Goal

Help Google consolidate legacy WordPress URLs into the current site, improve discoverability of the new service pages, strengthen machine-readable entity/service signals, and keep WD Marketing eligible for ChatGPT Search discovery without inventing claims or adding unsupported SEO gimmicks.

## Evidence

Search Console, through 2026-09-14, reports 706 impressions and 4 clicks in the last 28 settled days. The current home page is indexed, and `/services/paid-acquisition` is indexed. `/services/seo` and `/contact` are discovered but currently not indexed, while `/services/web-conversion` is unknown to Google.

Several legacy WordPress URLs are still indexed and receiving impressions, including dated March 2026 web-design and Google Ads articles and `/social-media-advertising/`. The current site already returns permanent redirects for most of these legacy paths, so the job is to make the migration signals complete and consistent rather than recreate the old pages.

The live technical audit found all seven audited priority pages indexable with self canonicals, exactly one H1, structured data, valid viewport and no critical/high/medium on-page issues. Only low-severity issues remain, primarily two missing image alt values per audited template and one long web-design title.

## Principles

1. Preserve the current canonical URL structure and existing permanent redirects.
2. Add missing legacy aliases only when supported by Search Console evidence.
3. Do not create doorway/thin pages to preserve obsolete WordPress URLs.
4. Keep one canonical URL per intent and let redirects consolidate the old URLs into the strongest current destination.
5. Keep `OAI-SearchBot` crawlable. OpenAI states that allowing OAI-SearchBot makes public pages eligible for inclusion in ChatGPT Search; no separate `llms.txt` requirement exists.
6. Do not change GPTBot training policy as part of this task; search discoverability and model-training controls are separate decisions.
7. Use structured data only for facts already present on the site: WD Marketing, Wael Daas as founder, London/UK service area, and the actual service pages.
8. No fabricated reviews, ratings, addresses, awards, prices, phone numbers, performance claims or opening hours.
9. Keep the existing WD quality gates and Cloudflare deployment workflow unchanged except for adding SEO-specific contract coverage if needed.

## Changes

### Migration/index cleanup

- Add explicit permanent redirects for uppercase `/HOME` and `/HOME/` to `/` because Search Console still reports that historical path.
- Preserve existing legacy WordPress redirect mappings.
- Keep `www` canonicalisation and trailing-slash rules as currently implemented.

### Robots and AI search eligibility

- Keep the general `User-agent: *` rule allowing the public site and blocking `/api/`.
- Add an explicit `OAI-SearchBot` rule allowing public content while blocking `/api/`. This is intentionally redundant with the wildcard rule so future generic crawler changes cannot accidentally remove ChatGPT Search eligibility.
- Do not add unsupported crawler directives or an `llms.txt` file as a ranking mechanism.

### Structured data

Replace the single flat `ProfessionalService` JSON-LD object with an `@graph` that makes relationships explicit:

- `Organization` / `ProfessionalService` entity for WD Marketing.
- `Person` entity for Wael Daas as founder.
- `WebSite` entity published by WD Marketing.
- `Service` entity on each principal service page, linked to the WD Marketing provider entity and the canonical service URL.

Keep partial London/GB location wording only; do not invent a street address.

### Search Console monitoring

- Track the principal current URLs in GSC Wizard.
- Record the 2026-09-17 migration/security/SEO cleanup as a Search Console annotation after deployment.
- Reinspect the priority new URLs and representative legacy redirects after deployment to watch Google consolidate them.

## Success criteria

- All existing WD CI gates pass.
- New SEO contract passes.
- Priority pages keep self canonicals and remain indexable.
- Legacy `/HOME` permanently redirects to `/`.
- `robots.txt` explicitly allows OAI-SearchBot to public pages and blocks `/api/`.
- JSON-LD exposes stable IDs for the organization, founder and website; principal service pages expose a `Service` entity.
- Search Console monitoring is configured for current priority URLs.
- No production deployment happens before PR verification.