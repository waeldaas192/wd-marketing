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
const gscObservedLegacyRedirects = [
  ['/HOME', '/'],
  ['/about-us', '/about'],
  ['/ai-seo-organic-growth', '/services/seo'],
  ['/category/business', '/insights'],
  ['/conversion-rate-optimization', '/services/conversion-rate-optimisation'],
  ['/e-commerce-marketing', '/services/paid-acquisition'],
  ['/e-commerce-website-development', '/services/web-conversion'],
  ['/google-ads-ppc', '/services/paid-acquisition'],
  ['/graphic-design-branding', '/services'],
  ['/portfolio', '/work'],
  ['/product-seo-optimization', '/services/seo'],
  ['/social-media-advertising', '/services/meta-ads'],
  ['/web-design-development', '/services/web-conversion'],
  ['/2026/03/02/affordable-web-design-london', '/services/web-conversion'],
  ['/2026/03/02/best-web-design-company-london', '/services/web-conversion'],
  ['/2026/03/02/facebook-ads-agency-london', '/services/meta-ads'],
  ['/2026/03/02/google-ads-agency-london', '/services/paid-acquisition'],
  ['/2026/03/02/professional-web-design-london', '/services/web-conversion'],
  ['/2026/03/02/seo-services-london', '/services/seo'],
];
for (const [from, to] of gscObservedLegacyRedirects) {
  assert.ok(redirects.includes(`${from} ${to} 301`), `GSC-observed legacy URL must redirect directly: ${from}`);
  assert.ok(redirects.includes(`${from}/ ${to} 301`), `trailing-slash legacy URL must redirect directly: ${from}/`);
}

const canonicalSlashRedirects = [
  ['/cookies/', '/cookies'],
  ['/services/conversion-rate-optimisation/', '/services/conversion-rate-optimisation'],
  ['/services/local-seo-london/', '/services/local-seo-london'],
  ['/services/technical-seo-london/', '/services/technical-seo-london'],
  ['/insights/canonical-tags-duplicate-urls/', '/insights/canonical-tags-duplicate-urls'],
  ['/insights/core-web-vitals-website-speed-seo/', '/insights/core-web-vitals-website-speed-seo'],
  ['/insights/technical-seo-audit-checklist-london/', '/insights/technical-seo-audit-checklist-london'],
  ['/insights/why-google-is-not-indexing-my-website/', '/insights/why-google-is-not-indexing-my-website'],
  ['/work/amici-executive-assistants/', '/work/amici-executive-assistants'],
  ['/work/floor-care-london/', '/work/floor-care-london'],
  ['/work/km-capital-roofing/', '/work/km-capital-roofing'],
  ['/work/london-marble-stone/', '/work/london-marble-stone'],
  ['/work/marble-stone-polishing/', '/work/marble-stone-polishing'],
  ['/work/naranj-glasgow/', '/work/naranj-glasgow'],
  ['/work/prestige-painters/', '/work/prestige-painters'],
  ['/work/sma-marble/', '/work/sma-marble'],
  ['/work/tim-paints-tiles/', '/work/tim-paints-tiles'],
];
for (const [from, to] of canonicalSlashRedirects) {
  assert.ok(redirects.includes(`${from} ${to} 301`), `canonical trailing-slash redirect missing: ${from}`);
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

const indexingGuideSlug = 'why-google-is-not-indexing-my-website';
assert.ok(insightsData.includes(indexingGuideSlug), 'Google indexing diagnostic insight must exist');
assert.ok(insightContentData.includes(indexingGuideSlug), 'Google indexing diagnostic content must exist');
for (const phrase of [
  'Why Is Google Not Indexing My Website?',
  'Crawled - currently not indexed',
  'Discovered - currently not indexed',
  'noindex',
  'robots.txt',
  'Google chose different canonical',
  'soft 404',
  'URL Inspection',
]) {
  assert.ok((insightsData + insightContentData).toLowerCase().includes(phrase.toLowerCase()), `Google indexing guide missing required topic: ${phrase}`);
}
for (const href of ['/services/technical-seo-london','/services/seo','/insights/technical-seo-audit-checklist-london']) {
  assert.ok(insightContentData.includes(href), `Google indexing guide must link to cluster resource: ${href}`);
}
assert.ok(technicalSeoPage.includes('/insights/why-google-is-not-indexing-my-website'), 'Technical SEO service must link to Google indexing guide');
assert.ok(read('src/lib/measurement.ts').includes('/insights/why-google-is-not-indexing-my-website'), 'Google indexing guide route must be allowed in measurement');

const canonicalGuideSlug = 'canonical-tags-duplicate-urls';
assert.ok(insightsData.includes(canonicalGuideSlug), 'Canonical tags and duplicate URLs insight must exist');
assert.ok(insightContentData.includes(canonicalGuideSlug), 'Canonical tags and duplicate URLs content must exist');
for (const phrase of [
  'Canonical Tags & Duplicate URLs',
  'self-referencing canonical',
  'Google chose different canonical',
  'HTTP and HTTPS',
  'www and non-www',
  'parameters',
  'redirect',
  'XML sitemap',
]) {
  assert.ok((insightsData + insightContentData).toLowerCase().includes(phrase.toLowerCase()), `Canonical guide missing required topic: ${phrase}`);
}
for (const href of ['/services/technical-seo-london','/insights/technical-seo-audit-checklist-london','/insights/why-google-is-not-indexing-my-website']) {
  assert.ok(insightContentData.includes(href), `Canonical guide must link to cluster resource: ${href}`);
}
assert.ok(technicalSeoPage.includes('/insights/canonical-tags-duplicate-urls'), 'Technical SEO service must link to canonical guide');
assert.ok(read('src/lib/measurement.ts').includes('/insights/canonical-tags-duplicate-urls'), 'Canonical guide route must be allowed in measurement');

const webVitalsGuideSlug = 'core-web-vitals-website-speed-seo';
assert.ok(insightsData.includes(webVitalsGuideSlug), 'Core Web Vitals and website speed insight must exist');
assert.ok(insightContentData.includes(webVitalsGuideSlug), 'Core Web Vitals and website speed content must exist');
for (const phrase of [
  'Core Web Vitals & Website Speed for SEO',
  'Largest Contentful Paint',
  'Interaction to Next Paint',
  'Cumulative Layout Shift',
  '75th percentile',
  'field data',
  'lab data',
  'PageSpeed Insights',
]) {
  assert.ok((insightsData + insightContentData).toLowerCase().includes(phrase.toLowerCase()), `Core Web Vitals guide missing required topic: ${phrase}`);
}
for (const href of ['/services/technical-seo-london','/insights/technical-seo-audit-checklist-london','/insights/why-google-is-not-indexing-my-website','/insights/canonical-tags-duplicate-urls']) {
  assert.ok(insightContentData.includes(href), `Core Web Vitals guide must link to cluster resource: ${href}`);
}
assert.ok(technicalSeoPage.includes('/insights/core-web-vitals-website-speed-seo'), 'Technical SEO service must link to Core Web Vitals guide');
assert.ok(read('src/lib/measurement.ts').includes('/insights/core-web-vitals-website-speed-seo'), 'Core Web Vitals guide route must be allowed in measurement');

const coreIndexableRoutes = [
  '/services/web-conversion',
  '/services/seo',
  '/services/local-seo-london',
  '/services/technical-seo-london',
  '/services/paid-acquisition',
  '/services/meta-ads',
  '/services/conversion-rate-optimisation',
  '/services/growth-infrastructure',
];
for (const route of coreIndexableRoutes) {
  assert.ok(sitemap.includes(`"${route}"`), `core indexable route missing from sitemap source: ${route}`);
}

const servicePageTemplate = read('src/components/ui/ServicePage.tsx');
const footerDiscovery = read('src/components/layout/Footer.tsx');
const servicesDiscovery = read('src/components/sections/Services.tsx');
for (const route of coreIndexableRoutes) {
  assert.ok(header.includes(route), `core indexable route missing from primary navigation: ${route}`);
  assert.ok(footerDiscovery.includes(route), `core indexable route missing from footer navigation: ${route}`);
  assert.ok(servicesDiscovery.includes(route), `core indexable route missing from services discovery surface: ${route}`);
}
for (const href of ['/services/web-conversion','/services/seo','/services/paid-acquisition','/services/growth-infrastructure']) {
  assert.ok(servicePageTemplate.includes(href), `shared service template must preserve connected capability link: ${href}`);
}

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
const footer = read('src/components/layout/Footer.tsx');
for (const href of ['/services/local-seo-london','/services/technical-seo-london']) {
  assert.ok(header.includes(`href: "${href}"`), `Primary Services navigation must expose ${href}`);
  assert.ok(footer.includes(href), `Footer services must expose ${href}`);
}
const webConversionPage = read('src/app/services/web-conversion/page.tsx');
assert.ok(webConversionPage.includes('"Web Design Agency London | Enquiry-Focused"'), 'Web & Conversion title must stay concise');
assert.ok(metaPage.includes('"Meta Ads Agency London | Facebook Ads"'), 'Meta Ads title must stay concise');
assert.ok(technicalSeoPage.includes('"Technical SEO London | Audits & Fixes"'), 'Technical SEO title must stay concise');
assert.ok(fs.existsSync('src/data/project-service-links.ts'), 'case-study service-link map must exist');
const projectServiceLinks = read('src/data/project-service-links.ts');
const selectedWork = read('src/components/sections/SelectedWork.tsx');
for (const slug of ['floor-care-london','london-marble-stone','stone-pro-worktops','exp-auto-parts']) {
  assert.ok(projectServiceLinks.includes(`"${slug}"`), `authority-priority case study missing from project service map: ${slug}`);
}
for (const href of ['/services/web-conversion','/services/seo','/services/local-seo-london','/services/technical-seo-london','/services/growth-infrastructure']) {
  assert.ok(projectServiceLinks.includes(href), `project service map missing connected service: ${href}`);
}
assert.ok(selectedWork.includes('orderProjectsForAuthority(projects)'), 'Work hub must prioritise authority case studies');
assert.ok(projectServiceLinks.indexOf('"floor-care-london"') < projectServiceLinks.indexOf('"london-marble-stone"'), 'Floor Care London must lead authority priority');
assert.ok(projectServiceLinks.indexOf('"london-marble-stone"') < projectServiceLinks.indexOf('"stone-pro-worktops"'), 'London Marble Stone must precede Stone Pro Worktops in authority priority');
assert.ok(projectServiceLinks.indexOf('"stone-pro-worktops"') < projectServiceLinks.indexOf('"exp-auto-parts"'), 'Stone Pro Worktops must precede EXP Auto Parts in authority priority');

const workPageTemplate = read('src/app/work/[slug]/page.tsx');
assert.ok(workPageTemplate.includes('`${project.name} Case Study`'), 'Case studies must use descriptive SEO titles');
assert.ok(workPageTemplate.includes('getProjectServiceLinks(slug)'), 'Case studies must expose connected service links');
assert.ok(workPageTemplate.includes('case-service-links'), 'Case-study service links must render in the template');
assert.ok(read('src/app/work/page.tsx').includes('"Web Design & SEO Case Studies"'), 'Work index title must describe the content');
assert.ok(read('src/app/insights/page.tsx').includes('"SEO & Digital Marketing Insights"'), 'Insights index title must describe the content');
assert.ok(insightPageSource.includes('item.seoTitle || item.title'), 'Insight metadata must support concise SEO titles');
assert.ok(read('src/app/privacy/page.tsx').includes('"Privacy Policy & Data Use"'), 'Privacy metadata title must be descriptive');
assert.ok(read('src/app/terms/page.tsx').includes('"Website Terms & Conditions"'), 'Terms metadata title must be descriptive');
assert.ok(read('src/app/cookies/page.tsx').includes('"Cookie Policy & Analytics"'), 'Cookie metadata title must be descriptive');
const servicesHub = read('src/components/sections/Services.tsx');
for (const href of ['/services/conversion-rate-optimisation','/services/local-seo-london','/services/technical-seo-london','/services/meta-ads']) {
  assert.ok(servicesHub.includes(href), `Services hub must link directly to specialist service: ${href}`);
}
console.log('WD SEO contract passed');
