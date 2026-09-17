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
  '/services/conversion-rate-optimisation',
  'cro-mobile',
  'cro-desktop',
  'data-cro-journey',
]) assert.ok(audit.includes(phrase), `browser audit missing expected coverage: ${phrase}`);

const workflow = fs.readFileSync('.github/workflows/cloudflare.yml', 'utf8');
for (const phrase of [
  'playwright@1.63.0',
  '@axe-core/playwright@4.13.0',
]) assert.ok(workflow.includes(phrase), `browser QA dependency is not pinned in CI: ${phrase}`);

console.log('WD browser audit contract passed');
