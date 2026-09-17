const fs = require('node:fs');
const assert = require('node:assert/strict');
const yaml = fs.readFileSync('.github/workflows/cloudflare.yml', 'utf8');

for (const phrase of [
  'npm run test:workflow-docs',
  'npm run test:workflow-profile',
  'npm run test:browser-contract',
  'npm run test:ci-workflow',
  'playwright@1.63.0',
  '@axe-core/playwright@4.13.0',
  'npx playwright install --with-deps chromium',
  'Generate local Cloudflare preview configuration',
  'CLOUDFLARE_ACCOUNT_ID: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  'CLOUDFLARE_D1_DATABASE_ID: 11111111-2222-4333-8444-555555555555',
  'npm run configure:cloudflare',
  'QA_BASE_URL=http://127.0.0.1:8787 npm run test:browser',
  'browser-qa-${{ github.sha }}',
  'qa-results/',
]) assert.ok(yaml.includes(phrase), `cloudflare.yml missing: ${phrase}`);

assert.ok(yaml.indexOf('npm run configure:cloudflare') < yaml.indexOf('npm run start -- --ip 127.0.0.1 --port 8787'), 'preview config must be generated before Wrangler starts');
assert.ok(yaml.includes('needs: verify'), 'deploy must remain gated by verify');
assert.ok(yaml.includes("github.ref == 'refs/heads/main'"), 'production deploy must remain main-only');
assert.ok(yaml.includes("vars.CLOUDFLARE_DEPLOY_ENABLED == 'true'"), 'production deploy enable flag must remain required');
assert.ok(yaml.includes('verified-site-${{ github.sha }}'), 'verified deployment artifact must remain present');

console.log('WD CI workflow contract passed');
