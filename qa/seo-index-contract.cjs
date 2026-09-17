const assert = require('node:assert/strict');
const fs = require('node:fs');

const redirects = fs.readFileSync('public/_redirects', 'utf8');
const robots = fs.readFileSync('src/app/robots.ts', 'utf8');
assert.ok(fs.existsSync('src/lib/structured-data.ts'), 'structured-data helper missing');
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
