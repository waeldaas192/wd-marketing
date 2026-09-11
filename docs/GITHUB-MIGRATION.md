# GitHub + independent Cloudflare migration

GitHub holds the code. WD Marketing's Cloudflare account holds the Worker, assets and new D1 database. Namecheap remains the domain registrar/mailbox provider. Resend and Ideal Postcodes remain the external integrations.

## Sequence

1. Prepare and verify this branch.
2. Authenticate to Cloudflare from the terminal and create D1 using the README commands.
3. Deploy with `DEPLOY_CUSTOM_DOMAINS=false` to the returned workers.dev URL.
4. Configure secrets, preserve historical enquiries, and verify the real form/email journey.
5. Reproduce and verify the complete existing DNS zone in Cloudflare.
6. Activate custom domains, verify the public site, then retire the old Sites attachment after observing stable service and preserving the old data.

This branch has not disconnected production. A successful local test is not a DNS or inbox-delivery test.

## Runtime secrets

The generated Wrangler file contains real account/database IDs, not secrets. It refuses missing or malformed IDs. After the first deployment, set Worker secrets interactively:

```bash
npx wrangler secret put CONTACT_FORM_SECRET --config wrangler.generated.json
npx wrangler secret put RESEND_API_KEY --config wrangler.generated.json
npx wrangler secret put IDEAL_POSTCODES_API_KEY --config wrangler.generated.json
```

Use at least 32 random characters for CONTACT_FORM_SECRET. Preserve its existing value when migrating active idempotency hashes. If it cannot be recovered, retain historical requests separately and document the treatment of pre-cutover retries. Masked settings do not expose secret values.

Use the Resend key for the verified WD Marketing sender. Ideal Postcodes enables full address selection; without it postcode lookup/manual entry remains available. If Turnstile is used, set TURNSTILE_SECRET_KEY as a secret and TURNSTILE_SITE_KEY as a configuration value. Configure both or neither and allow the actual test and production hostnames.

Set `CONTACT_EMAIL_ENABLED=true` and redeploy when ready to test sending. Use an owner-controlled recipient and confirm the notification, customer confirmation, reply-to and logo. Provider acceptance does not prove inbox delivery. Secrets stay outside Git.

## Preserve enquiries and email state

The old live database has `contact_enquiries`, `contact_email_outbox` and `form_rate_limits`. New D1 starts empty; creating the schema does not migrate data.

- Export enquiries and outbox through the authenticated Sites database interface or an available provider export. Keep customer data in restricted storage, never in GitHub or public assets.
- Record snapshot time and counts. Preserve IDs, references and payload hashes; validate fields against `drizzle/`.
- Rehearse a data-only import into isolated D1, checking foreign keys, counts and sample references. Do not replay duplicate CREATE TABLE statements over an existing schema.
- Keep destination email disabled during import. Preserve accepted/review statuses. Reconcile pending/sending jobs against provider records before replay; do not reset jobs blindly or resend outside the provider deduplication window.
- Rate-limit records are temporary and can start empty on the new host.
- Snapshot again before cutover. During DNS overlap monitor both databases. After propagation and observation, collect the final delta keyed by enquiry ID so no request is lost.
- If export is unavailable, keep the old database as a protected historical archive and document how staff access it. Do not delete the old Sites project before preserving history.

Back up independent D1 after setup and before database changes:

```bash
mkdir -p backups
npx wrangler d1 export DB --remote --output backups/enquiries.sql --config wrangler.generated.json
```

`backups/` is ignored by Git. Rehearse restore into a separate database. Review provider recovery retention for the selected account.

## DNS and mailbox preservation

Workers Custom Domains require an active Cloudflare zone. There is no universal Worker IP to paste into Namecheap.

Export the **entire** Namecheap/cPanel zone, including all pages of records and client subdomains. Compare A/AAAA/CNAME/MX/TXT/SRV/CAA and DNSSEC before changing nameservers. Preserve mail records, SPF, existing DKIM, Resend DKIM, DMARC, send/verification records, FTP and all client services. Mail/FTP records that connect to Namecheap must remain DNS-only where appropriate.

Do not cancel Namecheap hosting while mailboxes or client services depend on it. The website move does not migrate IMAP/SMTP mailboxes.

After comparing the full zone, use the exact nameservers Cloudflare assigns at Namecheap. Preserve the old website answers while the zone activates. When ready, remove only conflicting old apex/www website records and set:

```bash
export DEPLOY_CUSTOM_DOMAINS=true
npm run deploy
```

Wrangler applies both custom domains. Check apex, www, HTTPS, preserved query/path redirects, old articles, images and form submission. Remove the old Sites attachment only after the new origin serves correctly. Never delete DNS records with a wildcard.

## GitHub Actions settings

Repository Settings → Secrets and variables → Actions:

| Setting | Type | Value |
| --- | --- | --- |
| CLOUDFLARE_API_TOKEN | Secret | Scoped to required Workers/D1 and domain operations in this account |
| CLOUDFLARE_ACCOUNT_ID | Repository variable | Actual account ID |
| CLOUDFLARE_D1_DATABASE_ID | Repository variable | Actual new database ID |
| CLOUDFLARE_DEPLOY_ENABLED | Repository variable | true after initial setup |
| DEPLOY_CUSTOM_DOMAINS | Repository variable | false until cutover, then true |
| CONTACT_EMAIL_ENABLED | Repository variable | true after sender/recipient verification |
| TURNSTILE_SITE_KEY | Repository variable | Only if the paired secret is configured |

Runtime provider secrets remain on the Worker. Review the `production` GitHub environment settings. Merge this branch only after reviewing it. A push to main then invokes `.github/workflows/cloudflare.yml`; other branches/PRs do not deploy. The old UI workflow depended on next start with a static export and is replaced by tests against the actual Worker runtime.

## Acceptance and rollback

Local: install, backend tests, TypeScript, build, standalone routing test, Wrangler dry run. The tests use synthetic enquiries and mocked external providers. They verify pages, static bundles, redirects, 404s, D1 and form contracts, not real email delivery.

Remote: health reports database/form readiness; the real address key works; a unique owner test produces one saved enquiry and two intended emails; retry does not duplicate it; sitemap URLs and legacy redirects work; existing email remains operational.

Record old DNS answers, old deployment, new deployment ID and snapshot times. On lost submissions or production failures restore the recorded old website route/DNS/attachment and verify recovery, keeping any new enquiries for reconciliation. DNS rollback takes propagation time. Code rollback does not undo a database migration. Keep both databases until reconciliation is complete. Later code-only rollback may use the previous Worker version when schema-compatible.

## Official references

- [Workers + GitHub Actions](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)
- [Static asset bindings](https://developers.cloudflare.com/workers/static-assets/binding/)
- [Custom Domains requirements](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [D1 migration/export commands](https://developers.cloudflare.com/d1/wrangler-commands/)
