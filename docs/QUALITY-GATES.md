# WD Marketing Quality Gates

These are the exact verification gates for this repository. They complement `docs/WD-DEVELOPMENT-WORKFLOW.md` and the project-specific rules in `docs/PROJECT-PROFILE.md`.

## Existing CI sequence to preserve

The current pre-deploy verification order is:

```text
npm ci
npm run test:seo
npm run test:backend
npm run build
npm run test:mb-legacy
npm run typecheck
npm run test:measurement
npm run test:deployment
```

The workflow implementation may add contract/browser/security checks around this sequence, but it must not silently remove any of the existing gates.

## Gate matrix

| Gate | Command / evidence | Required for |
| --- | --- | --- |
| Dependency install | `npm ci` | every CI verification |
| Technical SEO / migration / AI-search contract | `npm run test:seo` | indexable, metadata, crawler, redirect, structured-data and AI-search changes; also CI |
| Backend/contact regression | `npm run test:backend` | backend/contact changes and CI |
| Production build | `npm run build` | every deployable change |
| MB Legacy case-study regression | `npm run test:mb-legacy` | CI while this route/test remains part of production coverage |
| TypeScript | `npm run typecheck` | every deployable code change |
| Consent/analytics regression | `npm run test:measurement` | measurement or shared frontend changes and CI |
| Deployment bundle/runtime | `npm run test:deployment` | every deployment candidate |
| Workflow documentation contract | `npm run test:workflow-docs` | workflow/instruction changes |
| Project-profile contract | `npm run test:workflow-profile` | workflow/profile changes |
| Browser audit contract | `npm run test:browser-contract` | browser QA infrastructure changes |
| CI workflow contract | `npm run test:ci-workflow` | GitHub Actions changes |
| Responsive/accessibility browser QA | `QA_BASE_URL=http://127.0.0.1:8787 npm run test:browser` | UI changes and CI after browser gate is enabled |

## Browser evidence

The browser audit uses `qa/browser-audit.cjs`. It must preserve existing responsive, keyboard, reduced-motion, sitemap/route and accessibility coverage and include the shared workflow's 375px viewport requirement.

Expected evidence:

- `qa-results/report.json`;
- full-page responsive screenshots;
- `mobile-menu.png`;
- `desktop-menu.png`;
- `home-text-200.png`;
- relevant section/interaction screenshots produced by the audit.

Reviewing only the exit code is insufficient for visual changes. Representative screenshots must be inspected for layout quality and regressions.

## UI-change completion gate

For a substantive UI change, completion requires:

1. relevant static/backend tests pass;
2. production build passes;
3. browser audit passes against the production-style preview;
4. representative mobile and desktop screenshots are reviewed;
5. no known blocking console/runtime error is introduced;
6. reduced-motion and keyboard paths remain usable where affected.

## SEO-change completion gate

For an indexable marketing change, also verify:

- `npm run test:seo` passes;
- intended route returns the correct status;
- title/description exist and match the page topic;
- one primary H1 remains;
- canonical behaviour is correct;
- sitemap/robots intent is preserved;
- legacy redirects remain deliberate and permanent where migration requires them;
- structured data remains truthful and matches visible content;
- internal links are deliberate;
- no preview/staging host is accidentally indexable;
- external Search Console indexing state is recorded separately when account-side inspection is in scope.

## Measurement-change completion gate

Preserve `docs/MEASUREMENT-SETUP.md`. Code-side tests do not prove account-side GA4/GTM delivery. When account-side activation is in scope, record actual Tag Assistant/DebugView evidence separately.

## Security-change completion gate

For public endpoints, authentication, uploads or data-handling changes, review server validation, abuse controls, secret separation, error disclosure and user-controlled HTML/URL handling. Never commit credentials.

## Deployment gate

Production deployment must continue to require:

- a green `verify` job;
- `main` branch;
- the existing `CLOUDFLARE_DEPLOY_ENABLED == 'true'` condition;
- the verified build artifact, not a fresh untested rebuild.

A successful deploy job is followed by Production verification of critical routes and conversion behaviour when deployment is in scope.

## Reporting standard

When a task is described as complete, record:

- files/areas changed;
- commands/tests actually run;
- build result;
- responsive/interaction checks performed when applicable;
- deployment commit/PR when applicable;
- external systems that were not observed or remain unverified.
