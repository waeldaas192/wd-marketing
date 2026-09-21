const fs = require('node:fs');
const assert = require('node:assert/strict');
const pkg = require('../package.json');

assert.equal(pkg.scripts['test:browser'], 'node qa/browser-audit.cjs');
assert.equal(pkg.scripts['test:browser-contract'], 'node qa/browser-audit-contract.cjs');

const audit = fs.readFileSync('qa/browser-audit.cjs', 'utf8');
for (const phrase of [
  'playwright',
  '@axe-core/playwright',
  '320,360,375,390,430,640,768,1024,1280,1440,1920',
  'home-text-200',
  'sitemap.xml',
  'qa-results',
  '/services/meta-ads',
  'meta-ads-mobile',
  'meta-ads-desktop',
  'data-meta-brand-icon',
  'work-authority',
  'floor-case',
  '/work/floor-care-london',
  'case-service-links',
]) assert.ok(audit.includes(phrase), `browser audit missing expected coverage: ${phrase}`);

const workflow = fs.readFileSync('.github/workflows/cloudflare.yml', 'utf8');
for (const phrase of [
  'playwright@1.63.0',
  '@axe-core/playwright@4.13.0',
]) assert.ok(workflow.includes(phrase), `browser QA dependency is not pinned in CI: ${phrase}`);

const interactiveArrowFiles = [
  'src/app/insights/[slug]/page.tsx',
  'src/app/about/page.tsx',
  'src/app/work/[slug]/page.tsx',
  'src/app/services/paid-acquisition/page.tsx',
  'src/components/ui/CaseGallery.tsx',
];
for (const file of interactiveArrowFiles) {
  const source = fs.readFileSync(file, 'utf8');
  for (const glyph of ['↗','➡']) {
    assert.ok(!source.includes(glyph), `${file} must not use emoji-prone arrow glyph: ${glyph}`);
  }
}
const insightPage = fs.readFileSync('src/app/insights/[slug]/page.tsx', 'utf8');
assert.ok(!insightPage.includes('← All insights'), 'Insight back link must use SVG arrow');
assert.ok(!insightPage.includes('Discuss your project ↗'), 'Insight CTA must use SVG arrow');
const workPage = fs.readFileSync('src/app/work/[slug]/page.tsx', 'utf8');
assert.ok(!workPage.includes('Next project: {next.name} →'), 'Case study next-project link must use SVG arrow');
const gallery = fs.readFileSync('src/components/ui/CaseGallery.tsx', 'utf8');
for (const phrase of ['Enlarge ↗','← Previous','Next →']) {
  assert.ok(!gallery.includes(phrase), `Case gallery must use SVG arrows instead of: ${phrase}`);
}
const icons = fs.readFileSync('src/components/ui/Icons.tsx', 'utf8');
assert.ok(icons.includes('"up-right"'), 'Shared ArrowIcon must support an up-right direction');
const globalCss = fs.readFileSync('src/app/globals.css', 'utf8');
assert.ok(globalCss.includes('.wd-arrow-up-right'), 'Global arrow CSS must style the up-right SVG direction');

console.log('WD browser audit contract passed');
