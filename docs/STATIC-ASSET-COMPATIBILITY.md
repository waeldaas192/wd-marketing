# Keeping hashed CSS available across Cloudflare releases

## Incident and evidence (2026-11-05)
An iPhone browser tab rendered the WD Marketing homepage as unstyled HTML immediately after the V2 release. A GitHub-hosted external HTTP probe showed that the former CSS path `/_next/static/css/516b8c03cb8f3e95.css` was returning **404 HTML** while newly deployed CSS paths were returning **200 text/css**. Recovering the old CSS restored that path to **200 text/css**. A second unrelated production deployment subsequently removed another V2 CSS hash (`518dd2ae1a262d6e.css`).

This is consistent with an open mobile browser tab using previously cached HTML after Cloudflare static assets have been replaced. It does **not** prove that fresh HTML or current stylesheets are broken.

## Prevention
- `compat-assets/_next/static/css` contains known older hash-named stylesheets.
- `scripts/build-worker.cjs` copies that archive into `dist/client/_next/static/css`, without replacing current-build CSS.
- On **verified main-branch releases only**, the CI job runs `scripts/retain-live-css.cjs` after the production build but before the browser, Worker and deployment tests. The script fetches the currently published homepage from one fixed trusted origin (`https://wdmarketing.co.uk`) and copies only same-origin, lowercase hexadecimal hash-named CSS, with strict MIME, response-size and count checks, into the new verified artifact.
- This preserves CSS for any page using the immediately previous deployment while keeping source and destination versions independently testable.
- Failures retrieving prior CSS block the new deployment rather than silently dropping assets.
- Old JS is **not** retained: this deliberately avoids publishing obsolete Next.js runtime code. A user with a stale tab must still refresh it for current client-side interactions.

## Release validation
- `npm run test:deployment` verifies older known CSS is served as CSS by the Cloudflare Worker fixture.
- `node qa/retain-live-css.cjs` runs as an isolated unit test.
- After a deployment, use a read-only HTTP probe to verify the prior CSS and all current HTML-linked CSS return HTTP 200 with `text/css`.
- Do not publish actual client information in incident logs.

## Cleanup
Review the compatibility archive periodically. Remove entries only after the corresponding cached HTML has reasonably expired, and only with a passing mobile QA and rollback plan. Avoid keeping very old styles indefinitely.
