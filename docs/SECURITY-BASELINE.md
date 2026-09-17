# WD Marketing dependency security baseline

Date: 2026-09-17

## Baseline

The initial full `npm audit` reported 9 findings: 4 high and 5 moderate.

### Production dependency path

The production-relevant high severity path was `next -> postcss`, with Next 15.5.25 resolving PostCSS 8.5.22 or earlier. PostCSS 8.5.23 contains the upstream security fix. WD Marketing now pins PostCSS 8.5.23 through npm overrides and verifies production dependencies with `npm audit --omit=dev --audit-level=high`.

### Development-only paths

The remaining findings were in development/test tooling:

- direct `miniflare` 4.20260730.0, via vulnerable `sharp` and `undici` versions;
- direct `drizzle-kit` 0.31.10, via deprecated `@esbuild-kit/esm-loader` -> `@esbuild-kit/core-utils` -> `esbuild` 0.18.x.

These packages are not part of the deployed browser bundle. They are still tracked because developer and CI tooling should be maintained securely.

## Remediation policy

- Do not use `npm audit fix --force`.
- Block Critical/High findings in production dependencies.
- Keep the full dependency audit visible as evidence in CI.
- Upgrade development tooling only after its own tests pass.
- Keep Drizzle Kit until migration generation is intentionally replaced; `drizzle.config.ts` depends on it.
- Weekly Dependabot PRs provide a controlled update channel and must pass the normal WD quality gates.
