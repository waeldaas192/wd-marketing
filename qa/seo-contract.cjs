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
for (const url of ['https://wdmarketing.co.uk','/services/web-conversion','/services/seo','/services/paid-acquisition','/services/growth-infrastructure','/services/meta-ads','/about','/work','/insights','/contact']) {
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

assert.ok(!read('src/app/services/seo/page.tsx').includes('FAQPage'), 'FAQPage markup must not be introduced');
assert.ok(!sitemap.includes('/wp-'), 'legacy WordPress URLs must not appear in sitemap');
console.log('WD SEO contract passed');
