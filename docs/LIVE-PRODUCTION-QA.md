# Read-only production QA

Run `npm run audit:production` from a trusted machine, or manually dispatch `Read-only live production QA` from GitHub Actions.

- Checks selected live HTTPS routes, self-canonicals, the robots response header, representative legacy redirects, sitemap inclusion, and the non-sensitive readiness/config response.
- Does **not** send a form, request a private key, read any client data, send email, or mutate D1.
- Writes `qa-results/live-production-audit.json` with PASS / FAIL / UNKNOWN and limited status details; no customer data or secret key values.
- A GitHub-hosted runner might receive a Cloudflare challenge or transient network error. Treat any such result as **UNKNOWN**, not as evidence the public website is broken.
- After a production deployment, carry out one agreed, labelled enquiry test in a browser with the owner; then check Resend, D1 and GA4 with proper consent. This script cannot verify those systems.
- Search Console indexing, Google-selected canonicals and organic ranking data are separate external observations.
