const fs = require('node:fs');
const assert = require('node:assert/strict');

for (const file of ['docs/PROJECT-PROFILE.md', 'docs/QUALITY-GATES.md']) {
  assert.ok(fs.existsSync(file), `${file} must exist`);
}

const profile = fs.readFileSync('docs/PROJECT-PROFILE.md', 'utf8');
for (const phrase of [
  'Next.js 15.5.25',
  'Cloudflare Workers',
  'D1',
  'docs/UI-SYSTEM.md',
  'docs/MEASUREMENT-SETUP.md',
  'Founder images',
  'contact endpoint',
]) assert.ok(profile.includes(phrase), `PROJECT-PROFILE missing: ${phrase}`);

const gates = fs.readFileSync('docs/QUALITY-GATES.md', 'utf8');
for (const command of [
  'npm run test:backend',
  'npm run build',
  'npm run test:mb-legacy',
  'npm run typecheck',
  'npm run test:measurement',
  'npm run test:deployment',
]) assert.ok(gates.includes(command), `QUALITY-GATES missing: ${command}`);

for (const phrase of ['qa-results/report.json', 'CLOUDFLARE_DEPLOY_ENABLED', 'main']) {
  assert.ok(gates.includes(phrase), `QUALITY-GATES missing: ${phrase}`);
}

console.log('WD project profile contract passed');
