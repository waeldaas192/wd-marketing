# WD Marketing Technical SEO + Index Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate indexed WordPress-era URLs into the current WD Marketing pages, add durable search/AI crawler eligibility, and strengthen machine-readable entity/service relationships without changing the approved site design.

**Architecture:** Keep URL migration logic in `public/_redirects`, crawler policy in Next metadata `robots.ts`, and structured-data generation in one reusable library rendered through a small JSON-LD component. Add a source-level SEO contract and run it in the existing GitHub Actions `verify` job before backend/build/browser gates.

**Tech Stack:** Next.js 15.5.25, TypeScript, React 19, Cloudflare Workers, GitHub Actions, Node QA scripts, Google Search Console / GSC Wizard.

**Spec:** `docs/superpowers/specs/2026-09-17-technical-seo-index-cleanup-design.md`

## Global Constraints

- Preserve existing canonical current URLs and legacy redirect mappings.
- No doorway/thin replacement pages for obsolete WordPress URLs.
- No invented address, ratings, reviews, prices, phone numbers, awards, performance claims or hours.
- Keep `/api/` unavailable to crawlers.
- Explicitly allow `OAI-SearchBot` for public content; do not alter GPTBot training policy in this task.
- Do not add `llms.txt` as a ranking mechanism.
- Keep all existing WD quality gates and main-only Cloudflare deployment behavior.

---

### Task 1: Add a machine-checkable SEO migration contract

**Files:**
- Create: `qa/seo-index-contract.cjs`
- Modify: `package.json`
- Modify: `.github/workflows/cloudflare.yml`
- Modify: `qa/ci-workflow-contract.cjs`

**Interfaces:**
- Consumes: `public/_redirects`, `src/app/robots.ts`, `src/lib/structured-data.ts`, principal service page source files.
- Produces: `npm run test:seo-index`, required by CI.

- [ ] **Step 1: Create the failing SEO contract**

Create `qa/seo-index-contract.cjs` with checks that require:

```js
const assert = require('node:assert/strict');
const fs = require('node:fs');

const redirects = fs.readFileSync('public/_redirects', 'utf8');
const robots = fs.readFileSync('src/app/robots.ts', 'utf8');
const schema = fs.readFileSync('src/lib/structured-data.ts', 'utf8');
const layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
const servicePages = [
  'src/app/services/web-conversion/page.tsx',
  'src/app/services/seo/page.tsx',
  'src/app/services/paid-acquisition/page.tsx',
  'src/app/services/growth-infrastructure/page.tsx',
].map(file => fs.readFileSync(file, 'utf8'));

assert.match(redirects, /^\/HOME \/ 301$/m);
assert.match(redirects, /^\/HOME\/ \/ 301$/m);
assert.match(robots, /OAI-SearchBot/);
assert.match(robots, /disallow:\s*"\/api\/"/);
for (const id of ['#organization', '#founder', '#website']) assert.ok(schema.includes(id), `missing ${id}`);
assert.ok(schema.includes('serviceStructuredData'));
assert.ok(layout.includes('rootStructuredData'));
for (const source of servicePages) {
  assert.ok(source.includes('serviceStructuredData'), 'service page missing Service JSON-LD');
}
console.log('WD technical SEO/index contract passed');
```

- [ ] **Step 2: Register and run the test before implementation**

Add to `package.json` scripts:

```json
"test:seo-index": "node qa/seo-index-contract.cjs"
```

Run `npm run test:seo-index`. Expected: FAIL because the new redirects, explicit OAI rule and structured-data helper are not implemented yet.

- [ ] **Step 3: Add the gate to CI and its CI contract**

In `.github/workflows/cloudflare.yml`, run `npm run test:seo-index` after `test:ci-workflow` and before backend/build. Update `qa/ci-workflow-contract.cjs` to require the phrase `npm run test:seo-index`.

- [ ] **Step 4: Commit the RED contract**

Commit message: `test: define technical SEO index contract`.

### Task 2: Complete legacy URL consolidation and crawler policy

**Files:**
- Modify: `public/_redirects`
- Modify: `src/app/robots.ts`
- Test: `qa/seo-index-contract.cjs`

**Interfaces:**
- Produces: permanent uppercase HOME aliases; explicit OAI-SearchBot policy.

- [ ] **Step 1: Add Search Console-supported legacy aliases**

Under the legacy WordPress home redirects add:

```text
/HOME / 301
/HOME/ / 301
```

Do not change the existing dated-article, category, tag or service redirects.

- [ ] **Step 2: Make ChatGPT Search crawler eligibility explicit**

Change `robots.ts` so rules include both the general crawler and OAI-SearchBot:

```ts
rules: [
  { userAgent: "*", allow: "/", disallow: "/api/" },
  { userAgent: "OAI-SearchBot", allow: "/", disallow: "/api/" },
]
```

Keep the sitemap at `https://wdmarketing.co.uk/sitemap.xml`.

- [ ] **Step 3: Run the SEO contract**

Run `npm run test:seo-index`. Expected: still FAIL only on structured-data requirements.

- [ ] **Step 4: Commit URL/crawler changes**

Commit message: `fix: consolidate legacy URLs and AI crawler access`.

### Task 3: Strengthen organization, founder, website and service structured data

**Files:**
- Create: `src/components/seo/JsonLd.tsx`
- Create: `src/lib/structured-data.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/services/web-conversion/page.tsx`
- Modify: `src/app/services/seo/page.tsx`
- Modify: `src/app/services/paid-acquisition/page.tsx`
- Modify: `src/app/services/growth-infrastructure/page.tsx`
- Test: `qa/seo-index-contract.cjs`

**Interfaces:**
- `JsonLd({ value }: { value: unknown })` renders escaped JSON-LD.
- `rootStructuredData()` returns an `@graph` with stable `#organization`, `#founder`, `#website` IDs.
- `serviceStructuredData({ name, description, pathname, serviceType })` returns a `Service` linked to `#organization`.

- [ ] **Step 1: Add reusable JSON-LD renderer**

Create `src/components/seo/JsonLd.tsx`:

```tsx
export function JsonLd({ value }: { value: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }} />;
}
```

- [ ] **Step 2: Add structured-data builders**

Create `src/lib/structured-data.ts` using `site` and returning only documented site facts. Root graph must include:

```ts
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      email: site.email,
      areaServed: [
        { "@type": "City", name: "London" },
        { "@type": "Country", name: "United Kingdom" },
      ],
      founder: { "@id": `${site.url}/#founder` },
      sameAs: site.socialProfiles.map(profile => profile.href),
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#founder`,
      name: "Wael Daas",
      jobTitle: "Founder",
      url: `${site.url}/about`,
      worksFor: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      inLanguage: "en-GB",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
}
```

`serviceStructuredData()` must create a canonical `Service` URL and set `provider` to `#organization`, `areaServed` to London/United Kingdom, and use the caller-supplied truthful service name/description/type.

- [ ] **Step 3: Replace the flat root schema**

Update `layout.tsx` to import `JsonLd` and `rootStructuredData`, remove the inline flat schema object and render `<JsonLd value={rootStructuredData()} />` before the header.

- [ ] **Step 4: Add Service JSON-LD to the four principal service pages**

Use the existing metadata copy, not new claims:

- Web: name `Web Design & Conversion`, serviceType `Web design and development`.
- SEO: name `SEO Services`, serviceType `Search engine optimization`.
- Paid: name `Google Ads & Paid Acquisition`, serviceType `Paid search advertising management`.
- Infrastructure: name `Growth Infrastructure`, serviceType `Analytics, CRM and marketing automation`.

Each page imports `JsonLd` + `serviceStructuredData` and renders the JSON-LD alongside its current visual content.

- [ ] **Step 5: Run focused gates**

Run:

```text
npm run test:seo-index
npm run typecheck
npm run test:backend
npm run build
npm run test:deployment
```

Expected: all PASS.

- [ ] **Step 6: Commit structured-data implementation**

Commit message: `feat: strengthen search entity and service schema`.

### Task 4: Verify with WD CI and Search Console monitoring

**Files:**
- No production source files beyond Tasks 1-3.
- GSC Wizard tracker/annotation is external operational state.

**Interfaces:**
- Consumes: deployed/current canonical URLs and Search Console property `sc-domain:wdmarketing.co.uk`.
- Produces: CI evidence, indexing tracker baseline, post-deployment inspection evidence.

- [ ] **Step 1: Open a draft PR from `seo/technical-index-cleanup` to `main`**

PR body must record the GSC baseline: current home indexed; paid-acquisition indexed; SEO/contact discovered-not-indexed; web-conversion unknown; representative legacy WordPress URLs still indexed.

- [ ] **Step 2: Require full CI**

Verify GitHub Actions succeeds for security, workflow contracts, SEO contract, backend, build, TypeScript, measurement, deployment, Cloudflare preview, responsive and accessibility browser QA.

- [ ] **Step 3: Configure tracking for current priority URLs**

Add at least these URLs to the GSC Wizard indexing tracker:

```text
https://wdmarketing.co.uk/
https://wdmarketing.co.uk/services/web-conversion
https://wdmarketing.co.uk/services/seo
https://wdmarketing.co.uk/services/paid-acquisition
https://wdmarketing.co.uk/services/growth-infrastructure
https://wdmarketing.co.uk/about
https://wdmarketing.co.uk/contact
```

- [ ] **Step 4: After merge/deployment, annotate and reinspect**

Create a Search Console annotation dated 2026-09-17 named `Technical SEO index consolidation` describing legacy redirect completion, OAI-SearchBot explicit access and structured-data graph rollout. Reinspect the seven priority current URLs plus representative old indexed URLs to monitor consolidation.

- [ ] **Step 5: Keep the known moderate dev-only security baseline separate**

Do not mix the remaining Drizzle Kit development-only moderate findings into the SEO PR unless an SEO change directly touches those dependencies.
