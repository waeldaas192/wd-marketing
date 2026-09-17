# Technical SEO + AI Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen WD Marketing's index migration signals, structured data, AI-search crawlability and automated SEO quality gates without changing the visible design.

**Architecture:** Add a reusable JSON-LD layer for site, service and article entities; harden robots and WordPress migration redirects; add a factual `llms.txt`; and protect the implementation with a deterministic source-level SEO contract that runs in the existing Cloudflare CI verify job.

**Tech Stack:** Next.js 15.5.25, TypeScript, React 19, Node 22 QA scripts, GitHub Actions, Cloudflare Workers.

**Spec:** `docs/superpowers/specs/2026-09-17-technical-seo-ai-search-design.md`

## Global Constraints

- Canonical host remains `https://wdmarketing.co.uk`.
- Preserve all existing correct redirects, metadata, measurement and deployment behavior.
- No visible redesign.
- Do not invent a street address, phone number, reviews, awards, rankings, traffic or revenue claims.
- Do not add `FAQPage` markup for Google rich-result targeting.
- Do not change GPTBot training policy in this task.
- Do not fabricate sitemap modification dates.
- Deployment remains gated by the existing `verify` job and `main`-only Cloudflare deploy condition.

---

### Task 1: Add the SEO contract in RED state

**Files:**
- Create: `qa/seo-contract.cjs`
- Modify: `package.json`
- Modify: `.github/workflows/cloudflare.yml`
- Modify: `qa/ci-workflow-contract.cjs`

**Interfaces:**
- Produces: `npm run test:seo`
- Consumes: repository source files only; no network calls.

- [ ] **Step 1: Create a failing source-level SEO contract**

Create `qa/seo-contract.cjs` with assertions for the intended final state:

```js
const fs = require('node:fs');
const assert = require('node:assert/strict');

const read = path => fs.readFileSync(path, 'utf8');
const metadata = read('src/lib/metadata.ts');
const robots = read('src/app/robots.ts');
const redirects = read('public/_redirects');
const sitemap = read('src/app/sitemap.ts');
const layout = read('src/app/layout.tsx');
const insightPage = read('src/app/insights/[slug]/page.tsx');
const llms = read('public/llms.txt');

assert.ok(metadata.includes('alternates: { canonical: pathname }'), 'canonical metadata contract missing');
assert.ok(robots.includes('OAI-SearchBot'), 'OAI-SearchBot must be explicitly allowed');
assert.ok(robots.includes('disallow:"/api/"') || robots.includes('disallow: "/api/"'), '/api must remain disallowed');

for (const path of ['/wp-sitemap.xml','/sitemap_index.xml','/post-sitemap.xml','/page-sitemap.xml','/category-sitemap.xml','/author-sitemap.xml']) {
  assert.ok(redirects.includes(`${path} /sitemap.xml 301`), `missing legacy sitemap redirect: ${path}`);
}

for (const url of ['https://wdmarketing.co.uk','/services/web-conversion','/services/seo','/services/paid-acquisition','/services/growth-infrastructure','/about','/work','/insights','/contact']) {
  assert.ok(llms.includes(url), `llms.txt missing: ${url}`);
}

assert.ok(layout.includes('siteGraph'), 'root layout must render site graph JSON-LD');
assert.ok(insightPage.includes('articleSchema'), 'insight pages must render BlogPosting JSON-LD');

for (const file of [
  'src/app/services/web-conversion/page.tsx',
  'src/app/services/seo/page.tsx',
  'src/app/services/paid-acquisition/page.tsx',
  'src/app/services/growth-infrastructure/page.tsx',
]) {
  const source = read(file);
  assert.ok(source.includes('serviceSchema'), `${file} missing Service JSON-LD`);
}

assert.ok(!read('src/app/services/seo/page.tsx').includes('FAQPage'), 'FAQPage markup must not be introduced');
assert.ok(!sitemap.includes('/wp-'), 'legacy WordPress URLs must not appear in sitemap');
console.log('WD SEO contract passed');
```

- [ ] **Step 2: Add the npm command and CI gate**

Add to `package.json` scripts:

```json
"test:seo": "node qa/seo-contract.cjs"
```

Add `- run: npm run test:seo` in the `verify` job before `npm run build`.

Extend `qa/ci-workflow-contract.cjs` required phrases with:

```js
'npm run test:seo',
```

- [ ] **Step 3: Push and verify RED**

Expected GitHub Actions result: `test:seo` fails because `public/llms.txt`, `siteGraph`, `articleSchema`, explicit `OAI-SearchBot` and service schemas do not exist yet. This confirms the new test detects the missing feature.

---

### Task 2: Add reusable structured data

**Files:**
- Create: `src/components/seo/JsonLd.tsx`
- Create: `src/lib/structured-data.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/insights/[slug]/page.tsx`
- Modify: `src/app/services/web-conversion/page.tsx`
- Modify: `src/app/services/seo/page.tsx`
- Modify: `src/app/services/paid-acquisition/page.tsx`
- Modify: `src/app/services/growth-infrastructure/page.tsx`

**Interfaces:**
- `JsonLd({ data }: { data: unknown })`
- `siteGraph(): Record<string, unknown>`
- `serviceSchema(input: { name:string; description:string; pathname:string; serviceType:string }): Record<string, unknown>`
- `articleSchema(input: { slug:string; title:string; summary:string; date:string; image:string }): Record<string, unknown>`

- [ ] **Step 1: Implement safe JSON-LD renderer**

`src/components/seo/JsonLd.tsx`:

```tsx
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
```

- [ ] **Step 2: Implement schema builders**

`src/lib/structured-data.ts` must use `site` and canonical IDs:

```ts
import { site } from '@/data/site';

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;
const founderId = `${site.url}/#founder`;

export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': orgId, name: site.name, url: site.url,
        email: site.email, description: site.description,
        logo: `${site.url}/images/brand/wd-marketing-og-cover.jpg`,
        sameAs: site.socialProfiles.map(profile => profile.href),
        founder: { '@id': founderId },
        areaServed: [{ '@type': 'City', name: 'London' }, { '@type': 'Country', name: 'United Kingdom' }],
      },
      {
        '@type': 'WebSite', '@id': websiteId, url: site.url, name: site.name,
        description: site.description, inLanguage: 'en-GB', publisher: { '@id': orgId },
      },
      {
        '@type': 'Person', '@id': founderId, name: 'Wael Daas',
        url: `${site.url}/about`, jobTitle: 'Founder / Digital Growth Strategist',
        worksFor: { '@id': orgId }, sameAs: site.socialProfiles.map(profile => profile.href),
      },
    ],
  };
}

export function serviceSchema(input: { name:string; description:string; pathname:string; serviceType:string }) {
  const url = new URL(input.pathname, site.url).toString();
  return {
    '@context':'https://schema.org', '@type':'Service', '@id':`${url}#service`,
    name:input.name, description:input.description, url, serviceType:input.serviceType,
    provider:{'@id':orgId},
    areaServed:[{'@type':'City',name:'London'},{'@type':'Country',name:'United Kingdom'}],
  };
}

export function articleSchema(input:{slug:string;title:string;summary:string;date:string;image:string}) {
  const url = `${site.url}/insights/${input.slug}`;
  return {
    '@context':'https://schema.org', '@type':'BlogPosting', '@id':`${url}#article`,
    headline:input.title, description:input.summary, mainEntityOfPage:url,
    image:[new URL(input.image, site.url).toString()],
    datePublished:input.date, dateModified:input.date,
    author:{'@id':founderId}, publisher:{'@id':orgId}, inLanguage:'en-GB',
  };
}
```

- [ ] **Step 3: Replace root one-off schema with `siteGraph()`**

Import `JsonLd` and `siteGraph` in `src/app/layout.tsx`, remove the inline `ProfessionalService` object, and render:

```tsx
<JsonLd data={siteGraph()} />
```

before the visible header.

- [ ] **Step 4: Add BlogPosting schema to insight pages**

Import `JsonLd` and `articleSchema`, then render:

```tsx
<JsonLd data={articleSchema(item)} />
```

before `Breadcrumbs`.

- [ ] **Step 5: Add Service schema to each core service page**

Each page should import `JsonLd` and `serviceSchema` and render one accurate entity using that page's existing metadata description and canonical pathname. Use service types:

- Web Design & Conversion
- SEO & Organic Growth
- Paid Acquisition
- Analytics, CRM & Automation

- [ ] **Step 6: Run `npm run test:seo` and existing TypeScript/build tests**

Expected: structured-data assertions move to green; remaining crawl/llms assertions may still fail until Task 3.

---

### Task 3: Harden crawl and migration signals

**Files:**
- Modify: `src/app/robots.ts`
- Modify: `public/_redirects`
- Create: `public/llms.txt`

- [ ] **Step 1: Make OAI-SearchBot access explicit**

Use an array of robot rules so wildcard behavior stays unchanged:

```ts
return {
  rules: [
    { userAgent: '*', allow: '/', disallow: '/api/' },
    { userAgent: 'OAI-SearchBot', allow: '/', disallow: '/api/' },
  ],
  sitemap: 'https://wdmarketing.co.uk/sitemap.xml',
};
```

Do not add a GPTBot-specific rule.

- [ ] **Step 2: Add legacy WordPress sitemap redirects**

Append a clearly labelled block in `public/_redirects`:

```text
# Legacy WordPress sitemap endpoints
/wp-sitemap.xml /sitemap.xml 301
/sitemap_index.xml /sitemap.xml 301
/post-sitemap.xml /sitemap.xml 301
/page-sitemap.xml /sitemap.xml 301
/category-sitemap.xml /sitemap.xml 301
/author-sitemap.xml /sitemap.xml 301
```

- [ ] **Step 3: Add `public/llms.txt`**

Use concise factual copy:

```text
# WD Marketing

> Founder-led digital growth studio combining high-performance websites, SEO, paid acquisition, analytics and automation.

Canonical: https://wdmarketing.co.uk
Location: London, United Kingdom
Contact: https://wdmarketing.co.uk/contact

## Services
- Web Design & Conversion: https://wdmarketing.co.uk/services/web-conversion
- SEO & Organic Growth: https://wdmarketing.co.uk/services/seo
- Paid Acquisition: https://wdmarketing.co.uk/services/paid-acquisition
- Analytics, CRM & Automation: https://wdmarketing.co.uk/services/growth-infrastructure

## Company and evidence
- About WD Marketing and founder: https://wdmarketing.co.uk/about
- Selected work: https://wdmarketing.co.uk/work
- Insights: https://wdmarketing.co.uk/insights

The canonical HTML pages above are the authoritative source for current service descriptions, project context, legal information and contact details.
```

- [ ] **Step 4: Run `npm run test:seo`**

Expected: SEO contract passes.

---

### Task 4: Lock the SEO gate into project documentation and CI

**Files:**
- Modify: `docs/QUALITY-GATES.md`
- Verify: `.github/workflows/cloudflare.yml`
- Verify: `qa/ci-workflow-contract.cjs`

- [ ] **Step 1: Document `npm run test:seo`**

Add it to the standard pre-deploy gate description with a concise definition: canonical/crawl/migration/structured-data/AI-search contract.

- [ ] **Step 2: Run the full branch CI**

Required green steps:

```text
npm ci
npm audit --omit=dev --audit-level=high
npm run test:workflow-docs
npm run test:workflow-profile
npm run test:browser-contract
npm run test:ci-workflow
npm run test:seo
npm run test:backend
npm run build
npm run test:mb-legacy
npm run typecheck
npm run test:measurement
npm run test:deployment
Cloudflare preview
Browser responsive + accessibility audit
```

- [ ] **Step 3: Review browser artifact and PR diff**

Confirm no visible redesign or layout regressions were introduced.

---

### Task 5: Search Console convergence after deployment

**Files:** None — external verification only.

- [ ] **Step 1: Connect the suggested GSC integration**

Use the connected Google Search Console property for `wdmarketing.co.uk` when available.

- [ ] **Step 2: Inspect canonical/indexing state**

Inspect:

```text
https://wdmarketing.co.uk/
https://wdmarketing.co.uk/services/web-conversion
https://wdmarketing.co.uk/services/seo
https://wdmarketing.co.uk/services/paid-acquisition
https://wdmarketing.co.uk/services/growth-infrastructure
```

- [ ] **Step 3: Request recrawl where Google still reports stale content**

The homepage stays indexed. Do not use the removal tool for `/`; request recrawl/validation of the current canonical page instead.

- [ ] **Step 4: Confirm sitemap health**

Confirm `https://wdmarketing.co.uk/sitemap.xml` is submitted and successfully read.
