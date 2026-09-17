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
