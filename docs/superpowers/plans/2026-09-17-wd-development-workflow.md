# WD Development Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved WD Development Workflow specification into repository instructions, project-specific quality gates, browser QA automation, and CI enforcement for `waeldaas192/wd-marketing` without changing the live website design or deployment architecture.

**Architecture:** Keep the current Next.js + Cloudflare build/deploy path and existing QA scripts. Add a thin documentation/instruction layer plus machine-checkable contract tests, then wire the existing `qa/browser-audit.cjs` into the existing GitHub Actions `verify` job so deploy still depends on verified artifacts. Browser QA runs against the built Cloudflare preview and uploads `qa-results/` evidence separately from `dist/`.

**Tech Stack:** Next.js 15.5.25, React 19.2.0, TypeScript 5.9.x, Node.js 22, Cloudflare Wrangler 4.131.0, existing CommonJS QA scripts, Playwright 1.63.0, `@axe-core/playwright` 4.13.0, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-17-wd-development-workflow-design.md`

## Global Constraints

- Preserve `src/styles/design-tokens.css` as the visual source of truth for this repository.
- Preserve `docs/UI-SYSTEM.md` and `docs/MEASUREMENT-SETUP.md` as authoritative project-specific rules unless a later approved spec supersedes them.
- Preserve the existing Wrangler/Cloudflare deployment path and `deploy` job dependency on the `verify` job.
- Reuse existing commands: `typecheck`, `build`, `test:backend`, `test:deployment`, `test:measurement`, `test:mb-legacy`.
- Do not redesign the website or change public copy/content as part of this implementation.
- Do not invent testimonials, awards, performance scores, rankings, social URLs, results or business claims.
- Do not expose secrets or copy production credentials into source-controlled files.
- Browser automation is evidence, not a claim of complete WCAG conformance or field Core Web Vitals.
- Use exact pinned browser QA versions: `playwright` `1.63.0` and `@axe-core/playwright` `4.13.0`.

---

### Task 1: Add Repository Instructions and Operating Standard

**Files:**
- Create: `AGENTS.md`
- Create: `docs/WD-DEVELOPMENT-WORKFLOW.md`
- Create: `qa/workflow-docs-contract.cjs`
- Modify: `package.json`
- Test: `qa/workflow-docs-contract.cjs`

**Interfaces:**
- Consumes: approved spec and existing `docs/UI-SYSTEM.md`, `docs/MEASUREMENT-SETUP.md`.
- Produces: repository-wide agent instructions, human operating standard, and npm command `test:workflow-docs`.

- [ ] **Step 1: Write the failing documentation contract test**

Create `qa/workflow-docs-contract.cjs`:

```js
const fs = require('node:fs');
const assert = require('node:assert/strict');

const required = [
  'AGENTS.md',
  'docs/WD-DEVELOPMENT-WORKFLOW.md',
];
for (const file of required) {
  assert.ok(fs.existsSync(file), `${file} must exist`);
  const text = fs.readFileSync(file, 'utf8');
  assert.ok(text.length > 600, `${file} is unexpectedly small`);
}

const agents = fs.readFileSync('AGENTS.md', 'utf8');
for (const phrase of [
  'docs/UI-SYSTEM.md',
  'docs/MEASUREMENT-SETUP.md',
  'npm run typecheck',
  'npm run build',
  'Production verification',
]) assert.ok(agents.includes(phrase), `AGENTS.md missing: ${phrase}`);

const workflow = fs.readFileSync('docs/WD-DEVELOPMENT-WORKFLOW.md', 'utf8');
for (const phase of [
  'Requirements', 'Design direction', 'Responsive QA', 'Accessibility',
  'SEO and AI-search readiness', 'Measurement', 'Performance',
  'Security review', 'Automated verification', 'Production verification'
]) assert.ok(workflow.includes(phase), `workflow doc missing phase: ${phase}`);

console.log('WD workflow documentation contract passed');
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
node qa/workflow-docs-contract.cjs
```

Expected: FAIL because `AGENTS.md` and `docs/WD-DEVELOPMENT-WORKFLOW.md` do not yet exist.

- [ ] **Step 3: Create `AGENTS.md` with mandatory repository rules**

The file must state, in compact form:

```markdown
# WD Marketing repository instructions

Before modifying code, read `docs/UI-SYSTEM.md`, `docs/MEASUREMENT-SETUP.md`, `docs/PROJECT-PROFILE.md`, `docs/QUALITY-GATES.md`, and any feature-specific doc touching the requested area.

Preserve existing component, routing, measurement and Cloudflare patterns unless an approved spec requires a change. `src/styles/design-tokens.css` is the visual source of truth. Do not introduce a new library when existing code or platform APIs solve the requirement cleanly.

For UI work, verify mobile and desktop behaviour, keyboard access, reduced motion, scroll stability, image loading and responsive overflow. Important content must not depend on animation.

For SEO work, preserve valid existing URLs, canonicals, redirects, sitemap intent, robots behaviour and structured-data truthfulness. Never fabricate reviews, FAQs, awards, rankings, client results or performance claims.

For analytics work, preserve the consent model in `docs/MEASUREMENT-SETUP.md`; never send enquiry content or personal data to analytics.

Never commit credentials, API secrets, private keys or production tokens.

Minimum code gates before claiming implementation complete:
- `npm run typecheck`
- `npm run build`
- relevant repository QA scripts from `docs/QUALITY-GATES.md`
- browser/responsive evidence for user-interface changes
- production verification after deployment when deployment is in scope

A successful build alone is not completion. Report what was actually tested and identify any external system that was not observed.
```

- [ ] **Step 4: Create `docs/WD-DEVELOPMENT-WORKFLOW.md`**

Use the approved spec as the source, preserving the phase order exactly:

1. Requirements and scope
2. Design direction
3. Architecture
4. Implementation
5. Responsive QA
6. Accessibility
7. SEO and AI-search readiness
8. Measurement
9. Performance
10. Security review
11. Automated verification
12. Deployment and production verification

For each phase, include: objective, required checks, evidence expected, and explicit completion gate. Include the approved field-performance targets: LCP <= 2.5 s, INP <= 200 ms and CLS <= 0.1 at the 75th percentile when field data exists.

- [ ] **Step 5: Add the npm script and run the contract test**

Add to `package.json` scripts:

```json
"test:workflow-docs": "node qa/workflow-docs-contract.cjs"
```

Run:

```bash
npm run test:workflow-docs
```

Expected: PASS with `WD workflow documentation contract passed`.

- [ ] **Step 6: Commit**

```bash
git add AGENTS.md docs/WD-DEVELOPMENT-WORKFLOW.md qa/workflow-docs-contract.cjs package.json package-lock.json
git commit -m "docs: add WD development operating standard"
```

---

### Task 2: Add WD Marketing Project Profile and Exact Quality Gates

**Files:**
- Create: `docs/PROJECT-PROFILE.md`
- Create: `docs/QUALITY-GATES.md`
- Create: `qa/workflow-profile-contract.cjs`
- Modify: `package.json`
- Test: `qa/workflow-profile-contract.cjs`

**Interfaces:**
- Consumes: current package scripts, `docs/UI-SYSTEM.md`, `docs/MEASUREMENT-SETUP.md`, `.github/workflows/cloudflare.yml`.
- Produces: repository-specific launch constraints and a canonical command/evidence matrix; npm command `test:workflow-profile`.

- [ ] **Step 1: Write the failing project-profile contract**

Create `qa/workflow-profile-contract.cjs`:

```js
const fs = require('node:fs');
const assert = require('node:assert/strict');

for (const file of ['docs/PROJECT-PROFILE.md', 'docs/QUALITY-GATES.md']) {
  assert.ok(fs.existsSync(file), `${file} must exist`);
}

const profile = fs.readFileSync('docs/PROJECT-PROFILE.md', 'utf8');
for (const phrase of [
  'Next.js 15.5.25', 'Cloudflare Workers', 'D1',
  'docs/UI-SYSTEM.md', 'docs/MEASUREMENT-SETUP.md',
  'Founder images', 'contact endpoint'
]) assert.ok(profile.includes(phrase), `PROJECT-PROFILE missing: ${phrase}`);

const gates = fs.readFileSync('docs/QUALITY-GATES.md', 'utf8');
for (const command of [
  'npm run test:backend', 'npm run build', 'npm run test:mb-legacy',
  'npm run typecheck', 'npm run test:measurement', 'npm run test:deployment'
]) assert.ok(gates.includes(command), `QUALITY-GATES missing: ${command}`);

console.log('WD project profile contract passed');
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
node qa/workflow-profile-contract.cjs
```

Expected: FAIL because the two documents do not exist.

- [ ] **Step 3: Create `docs/PROJECT-PROFILE.md`**

Document exact repository facts and gates:

- App: Next.js 15.5.25 + React 19.2.0 + TypeScript.
- Hosting/runtime: Cloudflare Workers via Wrangler.
- Data: Cloudflare D1/Drizzle where used by contact/runtime flows.
- UI authority: `docs/UI-SYSTEM.md` + `src/styles/design-tokens.css`.
- Measurement authority: `docs/MEASUREMENT-SETUP.md`.
- Deployment authority: `.github/workflows/cloudflare.yml` and `npm run deploy`.
- Preserve the current contact, consent and canonical behaviours.
- Carry forward existing launch blockers from `docs/UI-SYSTEM.md`, including founder imagery approval and real contact delivery verification, without claiming they are resolved.
- Do not treat account-side GA4, GTM, Search Console, email or Cloudflare settings as verified from code alone.

- [ ] **Step 4: Create `docs/QUALITY-GATES.md`**

Include a table mapping each gate to command and evidence. The mandatory pre-deploy command order must match current CI:

```text
npm ci
npm run test:backend
npm run build
npm run test:mb-legacy
npm run typecheck
npm run test:measurement
npm run test:deployment
```

Also document browser QA as a mandatory UI-change gate once Task 3 is implemented, and state that `qa-results/report.json` plus screenshots are the evidence artifact.

- [ ] **Step 5: Add and run the profile contract script**

Add:

```json
"test:workflow-profile": "node qa/workflow-profile-contract.cjs"
```

Run:

```bash
npm run test:workflow-profile
```

Expected: PASS with `WD project profile contract passed`.

- [ ] **Step 6: Commit**

```bash
git add docs/PROJECT-PROFILE.md docs/QUALITY-GATES.md qa/workflow-profile-contract.cjs package.json package-lock.json
git commit -m "docs: define WD project quality gates"
```

---

### Task 3: Make Existing Browser Audit Reproducible from npm

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Use existing: `qa/browser-audit.cjs`
- Create: `qa/browser-audit-contract.cjs`
- Test: `qa/browser-audit-contract.cjs`

**Interfaces:**
- Consumes: existing `qa/browser-audit.cjs`, built local Cloudflare preview at `QA_BASE_URL`.
- Produces: pinned Playwright/axe dependencies and npm command `test:browser`.

- [ ] **Step 1: Write the failing browser-audit contract**

Create `qa/browser-audit-contract.cjs`:

```js
const fs = require('node:fs');
const assert = require('node:assert/strict');
const pkg = require('../package.json');

assert.equal(pkg.devDependencies.playwright, '1.63.0');
assert.equal(pkg.devDependencies['@axe-core/playwright'], '4.13.0');
assert.equal(pkg.scripts['test:browser'], 'node qa/browser-audit.cjs');

const audit = fs.readFileSync('qa/browser-audit.cjs', 'utf8');
for (const phrase of [
  'playwright', '@axe-core/playwright',
  '320,360,390,430,640,768,1024,1280,1440,1920',
  'home-text-200', 'sitemap.xml', 'qa-results'
]) assert.ok(audit.includes(phrase), `browser audit missing expected coverage: ${phrase}`);

console.log('WD browser audit contract passed');
```

- [ ] **Step 2: Run it and verify it fails**

```bash
node qa/browser-audit-contract.cjs
```

Expected: FAIL because Playwright, axe and `test:browser` are not yet declared in `package.json`.

- [ ] **Step 3: Install pinned browser QA dependencies**

Run:

```bash
npm install --save-dev --save-exact playwright@1.63.0 @axe-core/playwright@4.13.0
```

Expected: `package.json` and `package-lock.json` contain those exact versions.

- [ ] **Step 4: Add the browser npm command**

Add:

```json
"test:browser": "node qa/browser-audit.cjs",
"test:browser-contract": "node qa/browser-audit-contract.cjs"
```

- [ ] **Step 5: Run the static browser contract**

```bash
npm run test:browser-contract
```

Expected: PASS with `WD browser audit contract passed`.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json qa/browser-audit-contract.cjs
git commit -m "test: make browser audit reproducible"
```

---

### Task 4: Enforce Browser QA and Workflow Contracts in GitHub Actions

**Files:**
- Modify: `.github/workflows/cloudflare.yml`
- Create: `qa/ci-workflow-contract.cjs`
- Modify: `package.json`
- Test: `qa/ci-workflow-contract.cjs`

**Interfaces:**
- Consumes: `npm run build`, `npm run start`, `npm run test:browser`, existing `verify`/`deploy` jobs.
- Produces: CI that blocks deployment on workflow-contract or browser-QA failure and uploads browser evidence.

- [ ] **Step 1: Write the failing CI contract test**

Create `qa/ci-workflow-contract.cjs`:

```js
const fs = require('node:fs');
const assert = require('node:assert/strict');
const yaml = fs.readFileSync('.github/workflows/cloudflare.yml', 'utf8');

for (const phrase of [
  'npm run test:workflow-docs',
  'npm run test:workflow-profile',
  'npm run test:browser-contract',
  'npx playwright install --with-deps chromium',
  'QA_BASE_URL=http://127.0.0.1:8787 npm run test:browser',
  'browser-qa-${{ github.sha }}',
  'qa-results/'
]) assert.ok(yaml.includes(phrase), `cloudflare.yml missing: ${phrase}`);

assert.ok(yaml.includes('needs: verify'), 'deploy must remain gated by verify');
assert.ok(yaml.includes("github.ref == 'refs/heads/main'"), 'production deploy must remain main-only');

console.log('WD CI workflow contract passed');
```

- [ ] **Step 2: Run it and verify it fails**

```bash
node qa/ci-workflow-contract.cjs
```

Expected: FAIL because browser QA/workflow contract steps are not in CI yet.

- [ ] **Step 3: Add contract tests early in the existing `verify` job**

After `npm ci`, add:

```yaml
      - run: npm run test:workflow-docs
      - run: npm run test:workflow-profile
      - run: npm run test:browser-contract
```

Keep the existing backend/build/measurement/deployment commands and their current semantics.

- [ ] **Step 4: Install the pinned Chromium runtime in CI**

After `npm ci` and before launching the browser audit, add:

```yaml
      - run: npx playwright install --with-deps chromium
```

This installs the browser runtime matching the package-lock-pinned Playwright version.

- [ ] **Step 5: Start the built Cloudflare preview and wait for readiness**

After `npm run build`, add:

```yaml
      - name: Start verified Cloudflare preview
        run: |
          npm run start -- --ip 127.0.0.1 --port 8787 > /tmp/wd-preview.log 2>&1 &
          echo $! > /tmp/wd-preview.pid
          for i in $(seq 1 45); do
            if curl --fail --silent http://127.0.0.1:8787/ > /dev/null; then
              exit 0
            fi
            sleep 1
          done
          cat /tmp/wd-preview.log
          exit 1
```

- [ ] **Step 6: Run browser QA against the built preview**

Add:

```yaml
      - name: Run browser responsive and accessibility audit
        run: QA_BASE_URL=http://127.0.0.1:8787 npm run test:browser
```

- [ ] **Step 7: Upload browser evidence even when the audit fails**

Add after the browser-audit step:

```yaml
      - name: Upload browser QA evidence
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: browser-qa-${{ github.sha }}
          path: qa-results/
          retention-days: 7
          if-no-files-found: warn
```

Do not replace the existing `verified-site-${{ github.sha }}` artifact. `deploy` must continue downloading only the tested `dist/` artifact.

- [ ] **Step 8: Add the CI contract npm command and run it**

Add:

```json
"test:ci-workflow": "node qa/ci-workflow-contract.cjs"
```

Run:

```bash
npm run test:ci-workflow
```

Expected: PASS with `WD CI workflow contract passed`.

- [ ] **Step 9: Run the complete non-browser local regression set**

```bash
npm run test:workflow-docs
npm run test:workflow-profile
npm run test:browser-contract
npm run test:ci-workflow
npm run test:backend
npm run build
npm run test:mb-legacy
npm run typecheck
npm run test:measurement
npm run test:deployment
```

Expected: all commands exit 0.

- [ ] **Step 10: Run browser QA locally against a production-style preview**

Terminal 1:

```bash
npm run start -- --ip 127.0.0.1 --port 8787
```

Terminal 2:

```bash
QA_BASE_URL=http://127.0.0.1:8787 npm run test:browser
```

Expected: exit 0, `qa-results/report.json` generated, screenshots generated for responsive widths and interaction states, and report contains no failures.

- [ ] **Step 11: Commit**

```bash
git add .github/workflows/cloudflare.yml qa/ci-workflow-contract.cjs package.json package-lock.json
git commit -m "ci: enforce WD quality gates and browser audit"
```

---

### Task 5: Final Verification and Pull Request Evidence

**Files:**
- Review: all files changed by Tasks 1-4
- Update: PR #7 description
- No application source changes expected.

**Interfaces:**
- Consumes: completed implementation and all test outputs.
- Produces: reviewable PR with exact verification evidence and no unsupported completion claims.

- [ ] **Step 1: Verify the diff scope**

Run:

```bash
git diff --stat main...HEAD
git diff --check main...HEAD
```

Expected: only workflow/documentation/QA/package files from this plan; no whitespace errors; no website redesign/application-content edits.

- [ ] **Step 2: Re-run the full verification sequence**

```bash
npm run test:workflow-docs
npm run test:workflow-profile
npm run test:browser-contract
npm run test:ci-workflow
npm run test:backend
npm run build
npm run test:mb-legacy
npm run typecheck
npm run test:measurement
npm run test:deployment
```

Then start the built preview and run:

```bash
QA_BASE_URL=http://127.0.0.1:8787 npm run test:browser
```

Expected: all pass.

- [ ] **Step 3: Inspect browser evidence manually**

Open `qa-results/report.json` and representative screenshots for 390, 768, 1440 and 1920 widths plus `mobile-menu.png`, `desktop-menu.png` and `home-text-200.png`. Confirm no obvious layout regression, broken image, stuck scroll lock, unreadable typography or unexpected flashing/jumping.

- [ ] **Step 4: Confirm CI architecture was preserved**

Confirm `.github/workflows/cloudflare.yml` still has:

```yaml
deploy:
  needs: verify
```

and still deploys only on `refs/heads/main` when `CLOUDFLARE_DEPLOY_ENABLED == 'true'`.

- [ ] **Step 5: Update PR #7 description with evidence**

The PR description must state:

- files added/changed;
- exact commands run and their results;
- browser QA artifact name;
- that no live-site design/content changes were made;
- any known external/account-side items not verified;
- that deployment still requires the existing production gate.

- [ ] **Step 6: Keep PR as draft until CI is green and evidence reviewed**

Do not merge solely because the files exist. Mark ready for review only after GitHub Actions `verify` passes and browser evidence has been inspected.
