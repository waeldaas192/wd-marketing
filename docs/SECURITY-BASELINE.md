# WD Marketing dependency security baseline

Date: 2026-09-17

## Initial baseline

The initial full `npm audit` reported 9 findings: 4 high and 5 moderate.

## Remediated production dependency path

The production-relevant high severity path was `next -> postcss`, with Next 15.5.25 resolving a PostCSS release covered by the advisory. WD Marketing now pins PostCSS 8.5.23 through npm overrides.

CI enforces production dependency security with:

`npm audit --omit=dev --audit-level=high`

The tested final dependency tree reports zero production vulnerabilities through that audit.

## Remediated Cloudflare development tooling

The previous direct `miniflare` 4.20260730.0 dependency pulled vulnerable `sharp` and `undici` versions. The tested toolchain is now aligned to:

- `@cloudflare/workers-types` 5.20260916.1
- `miniflare` 5.20260916.0-alpha
- `wrangler` 4.133.0

The upgrade is covered by the same WD backend, build, deployment, Cloudflare preview, responsive browser and accessibility tests. The Miniflare runtime tests use a compatibility adapter so the existing v4-style test options are normalized by Miniflare 5's official conversion API when available.

## Remaining development-only findings

After the PostCSS and Cloudflare tooling remediations, the full audit reports 4 moderate findings in the Drizzle Kit development chain:

- direct `drizzle-kit` 0.31.10;
- transitive `@esbuild-kit/esm-loader`;
- transitive `@esbuild-kit/core-utils`;
- nested `esbuild` 0.18.x covered by the development-server advisory.

This chain is development-only and is not part of the deployed browser/Worker dependency set. `drizzle.config.ts` still depends on Drizzle Kit for migration tooling, so it is intentionally retained rather than downgraded or removed merely to silence the audit.

## Final security state for this change

- Production audit: 0 vulnerabilities.
- Full audit: 4 moderate, 0 high, 0 critical.
- Remaining findings: development-only Drizzle Kit chain.
- Cloudflare tooling: updated and validated through the full WD quality pipeline before commit.

## Remediation policy

- Do not use `npm audit fix --force` or `--legacy-peer-deps` to bypass dependency resolution.
- Block Critical/High findings in production dependencies before build/deploy.
- Keep the full dependency audit visible as a CI artifact and report.
- Upgrade development tooling only after its own tests and the full WD quality gates pass.
- Keep Drizzle Kit until a compatible migration-tooling update removes the remaining moderate chain.
- Weekly Dependabot PRs provide a controlled update channel and must pass the normal WD quality gates.
