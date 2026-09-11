# WD Marketing — independent GitHub deployment

Current website source, images, static Next.js pages and the form Worker. This branch prepares deployment into **WD Marketing's own Cloudflare account**, with no ChatGPT build or deployment step.

**Status:** migration preparation, not a completed production cutover. Hosting login, runtime secrets, historical data reconciliation and DNS activation are still required. The old website continues to receive live enquiries until cutover.

## Develop and verify

Use Node.js 22 or later.

```bash
git clone https://github.com/waeldaas192/wd-marketing.git
cd wd-marketing
git switch codex/independent-cloudflare
npm ci
npm run dev
```

The development server previews the frontend. Verification exercises the actual Worker with local D1 and mocked providers:

```bash
npm run test:backend
npm run typecheck
npm run build
npm run test:deployment
```

## Deploy from the terminal

Follow [the migration runbook](docs/GITHUB-MIGRATION.md) before changing DNS. Replace the two ID placeholders with the real values from your own account.

```bash
npx wrangler login
npx wrangler d1 create wd-marketing-enquiries
export CLOUDFLARE_ACCOUNT_ID='YOUR_ACCOUNT_ID'
export CLOUDFLARE_D1_DATABASE_ID='YOUR_NEW_DATABASE_ID'
export DEPLOY_CUSTOM_DOMAINS=false
export CONTACT_EMAIL_ENABLED=false
npm run build
npm run configure:cloudflare
npm run deploy
```

Wrangler returns the actual testing URL. Initial deployment does not change the production domain. Complete runtime secrets and real email verification using the runbook.

For a local full-stack preview: copy `.dev.vars.example` to `.dev.vars`, generate the configuration, run `npx wrangler d1 migrations apply DB --local --config wrangler.generated.json`, then `npm start`.

## Publish updates through GitHub

After this branch is merged into `main`, and the repository settings below are configured, pushing to `main` runs tests, builds, applies additive migrations and deploys the tested artifact.

```bash
git switch main
git pull --ff-only origin main
# Edit the intended files, then:
git add <changed-files>
git commit -m "Update website content"
git push origin main
```

The workflow checks pull requests and this migration branch without deploying. Deployment remains disabled until `CLOUDFLARE_DEPLOY_ENABLED=true` is configured. Direct `npm run deploy` is also available after a fresh successful build.

## Runtime

- `dist/client`: HTML, CSS, JS and website images.
- `dist/worker/index.js`: independent routing, form, address lookup and email integration.
- `drizzle/`: enquiries, rate limits and email-outbox schema migrations.
- `public/_redirects`: 84 existing mappings compiled into the Worker. Editorial SEO equivalence remains a separate review.
- `/api/health`: database and form readiness without exposing private data.
- `/api/contact/config`, `/api/contact`, `/api/address-lookup`: existing form contracts.
- Mail: branded notification to `hello@wdmarketing.co.uk` and confirmation to the customer, preserving reply-to behaviour.

The canonical host is `https://wdmarketing.co.uk`; `www` redirects to it. Test hosts return `X-Robots-Tag: noindex, nofollow`.

Older cPanel/Sites documents are historical references. Use `docs/GITHUB-MIGRATION.md` for this deployment.
