const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { Miniflare } = require('miniflare');
const { config } = require('../scripts/cloudflare-config.cjs');
const root = path.resolve(__dirname, '..');
async function main() {
  assert.throws(() => config({}), /ACCOUNT_ID/);
  const inputs = { CLOUDFLARE_ACCOUNT_ID: 'a'.repeat(32), CLOUDFLARE_D1_DATABASE_ID: '11111111-2222-4333-8444-555555555555' };
  assert.equal(config(inputs).routes, undefined);
  assert.equal(config(inputs).vars.CONTACT_EMAIL_ENABLED, 'false');
  assert.equal(config({ ...inputs, DEPLOY_CUSTOM_DOMAINS: 'true' }).routes.length, 2);
  assert.throws(() => config({ ...inputs, CONTACT_EMAIL_ENABLED: 'yes' }), /true or false/);
  const runtime = new Miniflare({
    modules: true, scriptPath: path.join(root, 'dist/worker/index.js'), compatibilityDate: '2026-07-01',
    assets: { directory: path.join(root, 'dist/client'), binding: 'ASSETS', routerConfig: { has_user_worker: true, invoke_user_worker_ahead_of_assets: true }, assetConfig: { html_handling: 'drop-trailing-slash', not_found_handling: '404-page' } },
    d1Databases: ['DB'], bindings: { DEPLOYMENT_STAGE: 'production', CONTACT_FORM_SECRET: 'local-only-test-secret-32-characters-long', CONTACT_EMAIL_ENABLED: 'false' },
    outboundService: () => { throw new Error('Unexpected external provider call'); },
  });
  try {
    assert.equal((await runtime.dispatchFetch('https://wdmarketing.co.uk/api/health')).status, 503);
    const db = await runtime.getD1Database('DB');
    for (const file of fs.readdirSync(path.join(root, 'drizzle')).filter(x => x.endsWith('.sql')).sort()) {
      for (const sql of fs.readFileSync(path.join(root, 'drizzle', file), 'utf8').split('--> statement-breakpoint').filter(x => x.trim())) await db.prepare(sql).run();
    }
    const health = await runtime.dispatchFetch('https://wdmarketing.co.uk/api/health');
    assert.equal(health.status, 200); assert.equal((await health.json()).form, true);
    const urls = [...fs.readFileSync(path.join(root, 'dist/client/sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(x => x[1]);
    for (const url of urls) {
      const response = await runtime.dispatchFetch(url, { redirect: 'manual' });
      assert.equal(response.status, 200, url); assert.equal(response.headers.get('x-robots-tag'), null, url);
      assert.match(await response.text(), /<html/);
    }
    const rules = fs.readFileSync(path.join(root, 'public/_redirects'), 'utf8').split(/\r?\n/).map(x => x.trim()).filter(x => x && !x.startsWith('#'));
    for (const rule of rules) {
      const [from, to, status] = rule.split(/\s+/);
      const response = await runtime.dispatchFetch('https://wdmarketing.co.uk' + from.replace('*', 'migration-check') + '?utm_source=qa', { redirect: 'manual' });
      assert.equal(response.status, Number(status), from);
      assert.equal(response.headers.get('location'), 'https://wdmarketing.co.uk' + to + '?utm_source=qa', from);
      assert.equal((await runtime.dispatchFetch(response.headers.get('location'), { redirect: 'manual' })).status, 200, to);
    }
    const www = await runtime.dispatchFetch('https://www.wdmarketing.co.uk/contact?ref=test', { redirect: 'manual' });
    assert.equal(www.status, 308); assert.equal(www.headers.get('location'), 'https://wdmarketing.co.uk/contact?ref=test');
    assert.equal((await runtime.dispatchFetch('https://wd-marketing.example.workers.dev/')).headers.get('x-robots-tag'), 'noindex, nofollow');
    assert.equal((await runtime.dispatchFetch('https://wdmarketing.co.uk/does-not-exist')).status, 404);
    assert.equal((await runtime.dispatchFetch('https://wdmarketing.co.uk/api/unknown')).status, 404);
    const home = fs.readFileSync(path.join(root, 'dist/client/index.html'), 'utf8');
    const resources = [...new Set([...home.matchAll(/(?:src|href)="(\/_next\/static\/[^"?#]+)[^"]*"/g)].map(x => x[1]))];
    assert.ok(resources.length > 0);
    for (const resource of resources) assert.equal((await runtime.dispatchFetch('https://wdmarketing.co.uk' + resource)).status, 200, resource);
    const data = { requestId: '80000000-0000-4000-8000-000000000001', service: 'SEO', budget: 'Not sure', name: 'Migration Test', email: 'client@example.test', message: 'A synthetic local migration verification enquiry.' };
    const response = await runtime.dispatchFetch('https://wdmarketing.co.uk/api/contact', { method: 'POST', headers: { origin: 'https://wdmarketing.co.uk', 'content-type': 'application/json', 'cf-connecting-ip': '192.0.2.10' }, body: JSON.stringify(data) });
    assert.equal(response.status, 200); assert.equal((await response.json()).ok, true);
    assert.equal((await db.prepare('SELECT COUNT(*) n FROM contact_enquiries').first()).n, 1);
    assert.equal((await db.prepare('SELECT COUNT(*) n FROM contact_email_outbox').first()).n, 0);
    console.log(`PASS standalone: ${urls.length} pages, ${rules.length} redirects, ${resources.length} assets; 404s, www, noindex, D1 health and form persistence.`);
  } finally { await runtime.dispose(); }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
