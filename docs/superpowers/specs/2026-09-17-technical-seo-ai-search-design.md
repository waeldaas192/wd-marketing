# WD Marketing Technical SEO + AI Search — Design Specification

**Date:** 2026-09-17  
**Status:** Approved for implementation in chat  
**Reference repository:** `waeldaas192/wd-marketing`

## Purpose

Strengthen WD Marketing's migration/indexing signals and machine-readable identity without changing the visible design or fabricating SEO claims. The first implementation should help search engines converge on the current custom-code site, preserve legacy WordPress equity, improve structured understanding of the brand and editorial content, and make public content explicitly crawlable for ChatGPT search.

## Current evidence

- The live custom-code site is crawlable and current search results already show the new homepage and service pages.
- A stale crawl of the old WordPress homepage still exists in external search/cache sources and contains placeholder contact details such as `0(800)-123-456` and `To@example.com`.
- `pageMetadata()` already emits per-page canonical URLs.
- `robots.ts` currently allows all crawlers and blocks `/api/`.
- `sitemap.ts` already lists the canonical current routes and does not fabricate `lastModified` timestamps.
- `public/_redirects` already maps the main legacy WordPress service/article paths to current destinations.
- `Breadcrumbs` already emits `BreadcrumbList` JSON-LD.
- Root layout currently emits one `ProfessionalService` JSON-LD object.

## External platform guidance that informs this design

- Google continues to recommend Organization and Article structured data where it accurately describes the page.
- Google no longer shows FAQ rich results as of May 2026, so visible FAQs should remain useful content but we will not add `FAQPage` markup merely for rich-result targeting.
- Google's June 2026 guidance says `llms.txt` is not needed for Google Search and does not positively or negatively affect Google rankings. It can still be maintained as a navigation aid for other systems that choose to use it.
- OpenAI says public content can appear in ChatGPT search when `OAI-SearchBot` is not blocked. Search discovery and GPT training are separate crawler controls.

## Goals

1. Preserve a single canonical host: `https://wdmarketing.co.uk`.
2. Preserve all existing correct 301 migration redirects.
3. Redirect old WordPress sitemap endpoints to the current `/sitemap.xml`.
4. Make `OAI-SearchBot` access explicit while keeping `/api/` blocked.
5. Keep GPTBot policy unchanged; this task does not change the site's training opt-in/opt-out policy.
6. Replace the root one-off business schema with a reusable JSON-LD system.
7. Emit accurate `Organization`, `WebSite`, and founder `Person` entities at site level.
8. Emit `BlogPosting` structured data for each insight article using the existing title, summary, date, image, canonical URL, author, and publisher data.
9. Emit accurate `Service` structured data on the four core service pages, linked back to the canonical Organization entity.
10. Add a factual `llms.txt` navigation file for systems that use it, without claiming it improves Google rankings.
11. Add automated SEO contracts so future changes cannot silently remove canonical, crawler, redirect, or structured-data requirements.
12. Add the SEO contract to the existing pre-deploy CI quality gates.
13. Use Search Console URL inspection/recrawl requests for the homepage and core service URLs after deployment when the connected GSC integration is available.

## Non-goals

- No new city/location landing pages in this phase.
- No keyword-stuffed programmatic pages.
- No fabricated reviews, ratings, awards, clients, rankings, traffic or revenue claims.
- No precise street address will be invented for local schema.
- No `LocalBusiness` rich-result implementation is required until the public business address/location model is intentionally decided.
- No `FAQPage` structured data will be added for Google rich-result targeting.
- No changes to GTM/GA4 consent behavior.
- No visible redesign.

## Structured-data architecture

### `src/components/seo/JsonLd.tsx`

A small rendering component serializes JSON-LD safely and escapes `<` to prevent script-breaking injection.

### `src/lib/structured-data.ts`

Exports reusable builders:

- `siteGraph()` -> `@graph` containing Organization, WebSite and Person.
- `serviceSchema(...)` -> one `Service` entity for a canonical service page.
- `articleSchema(...)` -> one `BlogPosting` entity for an insight page.

Canonical entity IDs:

- Organization: `https://wdmarketing.co.uk/#organization`
- WebSite: `https://wdmarketing.co.uk/#website`
- Founder: `https://wdmarketing.co.uk/#founder`

The Organization uses only facts already published on the site: WD Marketing, `hello@wdmarketing.co.uk`, London/United Kingdom service context, the site's description, social profiles, logo/brand image and founder relation.

The Person entity uses the published founder name `Wael Daas`, job title, `/about` canonical URL and the same published social profiles where applicable.

### Service schema

Each core service page gets a `Service` entity with:

- name
- description
- canonical URL / `@id`
- service type
- provider reference to `#organization`
- area served London and United Kingdom

Service markup is semantic machine-readable context, not a promise of a Google rich result.

### Article schema

Each insight page gets a `BlogPosting` entity with:

- headline
- description
- canonical mainEntityOfPage
- absolute image URL
- datePublished from existing data
- dateModified equal to published date until a real later edit date is recorded
- author reference to `#founder`
- publisher reference to `#organization`

## Crawl and migration design

`robots.ts` should retain the global rule and add an explicit `OAI-SearchBot` rule. Both allow public content and disallow `/api/`.

`public/_redirects` should add permanent redirects for common old WordPress sitemap endpoints:

- `/wp-sitemap.xml`
- `/sitemap_index.xml`
- `/post-sitemap.xml`
- `/page-sitemap.xml`
- `/category-sitemap.xml`
- `/author-sitemap.xml`

All redirect to `/sitemap.xml` with 301 status.

## `llms.txt`

`public/llms.txt` is a concise factual navigation document containing:

- canonical site URL
- one-sentence business description
- London/UK location context
- four service URLs
- `/about`
- `/work`
- `/insights`
- `/contact`
- a note that the HTML pages remain canonical

It must not contain rankings, unverifiable results, fake testimonials or hidden keyword lists.

## Automated verification

Create `qa/seo-contract.cjs` to check source-level invariants that are cheap and deterministic:

- metadata helper still provides canonical URLs;
- robots contains explicit `OAI-SearchBot`, public allow and `/api/` disallow;
- the six legacy sitemap redirects exist;
- `llms.txt` contains the canonical core URLs;
- site layout renders the reusable site graph;
- insight pages render article structured data;
- the four core service pages render Service structured data;
- no `FAQPage` markup is introduced;
- sitemap remains canonical and does not include legacy paths.

Add `test:seo` to `package.json` and run it in `.github/workflows/cloudflare.yml` before production build. Extend `qa/ci-workflow-contract.cjs` so future CI changes cannot silently remove the SEO gate.

## Search Console follow-up

After deployment, use the connected Search Console integration to inspect and request recrawl for:

- `/`
- `/services/web-conversion`
- `/services/seo`
- `/services/paid-acquisition`
- `/services/growth-infrastructure`

Confirm `/sitemap.xml` is submitted/healthy. The stale homepage cache should be resolved through recrawl of the current URL, not through a removal request, because the canonical homepage still exists and should remain indexed.
