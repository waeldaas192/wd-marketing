const fs = require('node:fs');
const assert = require('node:assert/strict');

const read = path => fs.readFileSync(path, 'utf8');
const metadata = read('src/lib/metadata.ts');
const robots = read('src/app/robots.ts');
const redirects = read('public/_redirects');
const sitemap = read('src/app/sitemap.ts');
const layout = read('src/app/layout.tsx');
const insightPage = read('src/app/insights/[slug]/page.tsx');

assert.ok(metadata.includes('alternates: { canonical: pathname }'), 'canonical metadata contract missing');
assert.ok(robots.includes('OAI-SearchBot'), 'OAI-SearchBot must be explicitly allowed');
assert.ok(robots.includes('disallow:"/api/"') || robots.includes('disallow: "/api/"'), '/api must remain disallowed');

for (const path of ['/wp-sitemap.xml','/sitemap_index.xml','/post-sitemap.xml','/page-sitemap.xml','/category-sitemap.xml','/author-sitemap.xml']) {
  assert.ok(redirects.includes(`${path} /sitemap.xml 301`), `missing legacy sitemap redirect: ${path}`);
}

assert.ok(fs.existsSync('public/llms.txt'), 'public/llms.txt must exist');
const llms = read('public/llms.txt');
for (const url of ['https://wdmarketing.co.uk','/services/web-conversion','/services/seo','/services/paid-acquisition','/services/growth-infrastructure','/services/meta-ads','/services/conversion-rate-optimisation','/about','/work','/insights','/contact']) {
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

const metaPagePath = 'src/app/services/meta-ads/page.tsx';
assert.ok(fs.existsSync(metaPagePath), 'Meta Ads London service page must exist');
const metaPage = read(metaPagePath);
for (const phrase of ['Meta Ads Agency London', '344', '£6.06', '161', '£8.37', '1,411', 'HighLevel', 'serviceSchema']) {
  assert.ok(metaPage.includes(phrase), `Meta Ads page missing required evidence or SEO element: ${phrase}`);
}
assert.ok(sitemap.includes('/services/meta-ads'), 'Meta Ads page must be in sitemap');
for (const path of ['/2026/03/02/facebook-ads-agency-london','/facebook-ads-agency-london','/social-media-advertising','/services/paid-social']) {
  assert.ok(redirects.includes(`${path} /services/meta-ads 301`), `legacy Meta/Facebook URL must redirect to Meta Ads page: ${path}`);
}
const paidPage = read('src/app/services/paid-acquisition/page.tsx');
assert.ok(paidPage.includes('/services/meta-ads'), 'Paid Acquisition page must link to Meta Ads service');
const header = read('src/components/layout/Header.tsx');
assert.ok(header.includes('href: "/services/meta-ads"'), 'Primary Services navigation must expose the Meta Ads service');
assert.ok(header.includes('label: "Meta Ads & Social"'), 'Primary Services navigation must label the Meta Ads service clearly');

const croPagePath = 'src/app/services/conversion-rate-optimisation/page.tsx';
assert.ok(fs.existsSync(croPagePath), 'CRO London service page must exist');
const croPage = read(croPagePath);
for (const phrase of [
  'Conversion Rate Optimisation Agency London',
  'qualified enquiries',
  'A/B testing',
  'Low traffic',
  'High traffic',
  'GA4',
  'GTM',
  'serviceSchema',
]) {
  assert.ok(croPage.includes(phrase), `CRO page missing required strategy or SEO element: ${phrase}`);
}
assert.ok(sitemap.includes('/services/conversion-rate-optimisation'), 'CRO page must be in sitemap');
for (const path of ['/conversion-rate-optimization','/conversion-rate-optimization/','/conversion-rate-optimisation','/conversion-rate-optimisation/']) {
  assert.ok(redirects.includes(`${path} /services/conversion-rate-optimisation 301`), `legacy CRO URL must redirect to CRO service: ${path}`);
}
for (const file of [
  'src/app/services/web-conversion/page.tsx',
  'src/app/services/paid-acquisition/page.tsx',
  'src/app/services/growth-infrastructure/page.tsx',
]) {
  assert.ok(read(file).includes('/services/conversion-rate-optimisation'), `${file} must link to CRO service`);
}
for (const href of ['/services/web-conversion','/services/paid-acquisition','/services/meta-ads','/services/growth-infrastructure']) {
  assert.ok(croPage.includes(href), `CRO page must link to connected service: ${href}`);
}
assert.ok(header.includes('href: "/services/conversion-rate-optimisation"'), 'Primary Services navigation must expose the CRO service');
assert.ok(header.includes('label: "Conversion Optimisation"'), 'Primary Services navigation must label the CRO service clearly');
const webNavIndex = header.indexOf('href: "/services/web-conversion"');
const croNavIndex = header.indexOf('href: "/services/conversion-rate-optimisation"');
const seoNavIndex = header.indexOf('href: "/services/seo"');
assert.ok(webNavIndex !== -1 && croNavIndex > webNavIndex && seoNavIndex > croNavIndex, 'CRO service must appear between Web & Conversion and SEO in the Services navigation');

const localSeoPagePath = 'src/app/services/local-seo-london/page.tsx';
assert.ok(fs.existsSync(localSeoPagePath), 'Local SEO London service page must exist');
const localSeoPage = read(localSeoPagePath);
for (const phrase of [
  'Local SEO London',
  'Google Business Profile',
  'Google Maps',
  'qualified enquiries',
  'serviceSchema',
]) {
  assert.ok(localSeoPage.includes(phrase), `Local SEO page missing required strategy or SEO element: ${phrase}`);
}
assert.ok(sitemap.includes('/services/local-seo-london'), 'Local SEO London page must be in sitemap');
assert.ok(read('src/app/services/seo/page.tsx').includes('/services/local-seo-london'), 'SEO pillar page must link to Local SEO London');
for (const blankProofAsset of [
  '/images/projects/sma-marble/sma-marble-london-case-study.webp',
  '/images/projects/roofing/mb-legacy-roofing-london-case-study.webp',
  '/images/seo-london/london-marble-stone-website-seo.webp',
]) {
  assert.ok(!localSeoPage.includes(blankProofAsset), `Local SEO proof section must not reuse visually blank asset: ${blankProofAsset}`);
}
assert.ok(!localSeoPage.includes('hf_20260918_215914_610f2c6c-85a5-41e7-9fdf-b7685658b495.png'), 'Local SEO page must not use the visually blank local-business image');
const localSeoCss = read('src/app/services/local-seo-london/local-seo.module.css');
assert.ok(!localSeoCss.includes('\\n.'), 'Local SEO CSS must not contain literal escaped newlines between rules');

assert.ok(!read('src/app/services/seo/page.tsx').includes('FAQPage'), 'FAQPage markup must not be introduced');
const highValueLegacyRedirects = [
  ['/HOME', '/'],
  ['/2026/03/02/affordable-web-design-london', '/services/web-conversion'],
  ['/2026/03/02/best-web-design-company-london', '/services/web-conversion'],
  ['/2026/03/02/facebook-ads-agency-london', '/services/meta-ads'],
  ['/2026/03/02/google-ads-agency-london', '/services/paid-acquisition'],
  ['/2026/03/02/seo-services-london', '/services/seo'],
  ['/conversion-rate-optimization', '/services/conversion-rate-optimisation'],
];
for (const [from, to] of highValueLegacyRedirects) {
  assert.ok(redirects.includes(`${from} ${to} 301`), `high-value legacy URL must redirect directly: ${from}`);
  assert.ok(redirects.includes(`${from}/ ${to} 301`), `trailing-slash legacy URL must redirect directly: ${from}/`);
}

const technicalSeoPagePath = 'src/app/services/technical-seo-london/page.tsx';
assert.ok(fs.existsSync(technicalSeoPagePath), 'Technical SEO London service page must exist');
const technicalSeoPage = read(technicalSeoPagePath);
for (const phrase of [
  'Technical SEO London',
  'crawl',
  'index',
  'canonical',
  'structured data',
  'Core Web Vitals',
  'serviceSchema',
]) {
  assert.ok(technicalSeoPage.toLowerCase().includes(phrase.toLowerCase()), `Technical SEO page missing required strategy or SEO element: ${phrase}`);
}
assert.ok(sitemap.includes('/services/technical-seo-london'), 'Technical SEO London page must be in sitemap');
assert.ok(read('src/app/services/seo/page.tsx').includes('/services/technical-seo-london'), 'SEO pillar page must link to Technical SEO London');
assert.ok(localSeoPage.includes('/services/technical-seo-london'), 'Local SEO page must link to Technical SEO London');
assert.ok(read('src/lib/measurement.ts').includes('/services/technical-seo-london'), 'Technical SEO route must be allowed in measurement');
for (const href of ['/services/seo','/services/local-seo-london','/services/web-conversion']) {
  assert.ok(technicalSeoPage.includes(href), `Technical SEO page must link to connected service: ${href}`);
}
assert.ok(!technicalSeoPage.includes('FAQPage'), 'Technical SEO page must not introduce FAQPage markup');

const technicalChecklistSlug = 'technical-seo-audit-checklist-london';
const insightsData = read('src/data/insights.ts');
const insightContentData = read('src/data/insight-content.ts');
assert.ok(insightsData.includes(technicalChecklistSlug), 'Technical SEO audit checklist insight must exist');
assert.ok(insightContentData.includes(technicalChecklistSlug), 'Technical SEO audit checklist content must exist');
for (const phrase of [
  'Technical SEO Audit Checklist for London Businesses',
  'robots.txt',
  'XML sitemap',
  'canonical',
  'Core Web Vitals',
  'structured data',
  'redirects',
]) {
  assert.ok((insightsData + insightContentData).toLowerCase().includes(phrase.toLowerCase()), `Technical SEO checklist missing required topic: ${phrase}`);
}
const insightPageSource = read('src/app/insights/[slug]/page.tsx');
assert.ok(insightPageSource.includes('article-checklist'), 'Insight template must render checklist bullets');
assert.ok(insightPageSource.includes('section.links'), 'Insight template must render contextual resource links');
assert.ok(insightContentData.includes('/services/technical-seo-london'), 'Technical SEO checklist must link to Technical SEO London');
assert.ok(insightContentData.includes('/services/seo'), 'Technical SEO checklist must link to SEO service');
assert.ok(insightContentData.includes('/services/web-conversion'), 'Technical SEO checklist must link to Web & Conversion');
assert.ok(technicalSeoPage.includes('/insights/technical-seo-audit-checklist-london'), 'Technical SEO service must link back to its audit checklist');
assert.ok(read('src/lib/measurement.ts').includes('/insights/technical-seo-audit-checklist-london'), 'Technical SEO checklist route must be allowed in measurement');

assert.ok(!sitemap.includes('/wp-'), 'legacy WordPress URLs must not appear in sitemap');

const localHeroPath = 'src/components/seo/HeroCentralLondonMap.tsx';
assert.ok(fs.existsSync(localHeroPath), 'Local SEO hero animation component must exist');
const localHero = read(localHeroPath);
for (const area of ['Central London','Westminster','Mayfair','Soho','Covent Garden','Marylebone','Holborn','City of London','South Bank']) {
  assert.ok(localHero.includes(area), `Local SEO hero missing Central London area: ${area}`);
}
for (const oldArea of ['Ealing','Northolt','Greenford','Harrow','Hounslow','Uxbridge']) {
  assert.ok(!localHero.includes(oldArea), `Local SEO hero must not use outer-west London label: ${oldArea}`);
}
assert.ok(localHero.includes('<svg'), 'Local SEO hero must render SVG routes');
assert.ok(localHero.includes('routeFlow'), 'Local SEO hero must include animated route flow');
const localHeroCssPath = 'src/components/seo/HeroCentralLondonMap.module.css';
assert.ok(fs.existsSync(localHeroCssPath), 'Local SEO hero animation stylesheet must exist');
const localHeroCss = read(localHeroCssPath);
assert.ok(localHeroCss.includes('@keyframes drawRoute'), 'Local SEO hero must animate route drawing');
assert.ok(localHeroCss.includes('@keyframes flowDash'), 'Local SEO hero must animate route flow');
assert.ok(localHeroCss.includes('prefers-reduced-motion'), 'Local SEO hero must respect reduced motion');
assert.ok(localSeoPage.includes('HeroCentralLondonMap'), 'Local SEO page must use the animated Central London hero');
console.log('WD SEO contract passed');
