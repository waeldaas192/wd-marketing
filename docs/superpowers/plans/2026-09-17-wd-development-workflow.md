# WD Development Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the approved WD Development Workflow specification into repository instructions, project-specific quality gates, browser QA automation, and CI enforcement for `waeldaas192/wd-marketing` without changing the live website design or deployment architecture.

**Architecture:** Preserve the current Next.js + Cloudflare build/deploy path and existing QA scripts. Add a thin documentation/instruction layer plus machine-checkable contract tests, then wire the existing `qa/browser-audit.cjs` into the current GitHub Actions `verify` job so production deployment still depends on a verified build artifact. Browser QA runs against the built Cloudflare preview and uploads `qa-results/` evidence separately from `dist/`.

**Tech Stack:** Next.js 15.5.25, React 19.2.0, TypeScript 5.9.x, Node.js 22, Cloudflare Wrangler 4.131.0, CommonJS QA scripts, Playwright 1.63.0, `@axe-core/playwright` 4.13.0, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-17-wd-development-workflow-design.md`

## Global Constraints

- Preserve `src/styles/design-tokens.css` as this repository's visual source of truth.
- Preserve `docs/UI-SYSTEM.md` and `docs/MEASUREMENT-SETUP.md` as authoritative project-specific rules unless a later approved spec supersedes them.
- Preserve the Wrangler/Cloudflare runtime and the `deploy` job dependency on the `verify` job.
- Reuse existing commands: `typecheck`, `build`, `test:backend`, `test:deployment`, `test:measurement`, `test:mb-legacy`.
- Do not redesign the website or change public marketing copy as part of this implementation.
- Never invent testimonials, awards, performance scores, rankings, social URLs, client results or business claims.
- Never commit credentials, API secrets, private keys or production tokens.
- Browser automation is evidence, not a claim of complete WCAG conformance or field Core Web Vitals.
- Pin browser QA to `playwright` `1.63.0` and `@axe-core/playwright` `4.13.0`.
- Preserve all existing browser-audit viewport coverage and add the spec-required 375px viewport.

---

### Task 1: Add Repository Instructions and Operating Standard

**Files:**
- Create: `AGENTS.md`
- Create: `docs/WD-DEVELOPMENT-WORKFLOW.md`
- Create: `qa/workflow-docs-contract.cjs`
- Modify: `package.json`
- Test: `qa/workflow-docs-contract.cjs`

**Interfaces:**
- Consumes: approved spec plus `docs/UI-SYSTEM.md` and `docs/MEASUREMENT-SETUP.md`.
- Produces: repository-wide agent rules, the human operating standard, and `npm run test:workflow-docs`.

- [ ] **Step 1: Write the failing documentation contract**

Create `qa/workflow-docs-contract.cjs`:

```js
const fs = require('node:fs');
const assert = require('node:assert/strict');

for (const file of ['AGENTS.md', 'docs/WD-DEVELOPMENT-WORKFLOW.md']) {
  assert.ok(fs.existsSync(file), `${file} must exist`);
  assert.ok(fs.readFileSync(file, 'utf8').length > 600, `${file} is unexpectedly small`);
}

const agents = fs.readFileSync('AGENTS.md', 'utf8');
for (const phrase of [
  'docs/UI-SYSTEM.md', 'docs/MEASUREMENT-SETUP.md',
  'npm run typecheck', 'npm run build', 'Production verification'
]) assert.ok(agents.includes(phrase), `AGENTS.md missing: ${phrase}`);

const workflow = fs.readFileSync('docs/WD-DEVELOPMENT-WORKFLOW.md', 'utf8');
for (const phase of [
  'Requirements', 'Design direction', 'Responsive QA', 'Accessibility',
  'SEO and AI-search readiness', 'Measurement', 'Performance',
  'Security review', 'Automated verification', 'Production verification'
]) assert.ok(workflow.includes(phase), `workflow doc missing phase: ${phase}`);

console.log('WD workflow documentation contract passed');
```

- [ ] **Step 2: Verify the contract fails before implementation**

```bash
node qa/workflow-docs-contract.cjs
```

Expected: FAIL because the two target documents do not yet exist.

- [ ] **Step 3: Create `AGENTS.md`**

Use these exact operating rules as the minimum content:

```markdown
# WD Marketing repository instructions

Before modifying code, read `docs/UI-SYSTEM.md`, `docs/MEASUREMENT-SETUP.md`, `docs/PROJECT-PROFILE.md`, `docs/QUALITY-GATES.md`, and any feature-specific document touching the requested area.

Preserve existing component, routing, measurement and Cloudflare patterns unless an approved spec requires a change. `src/styles/design-tokens.css` is the visual source of truth. Do not add a library when current code or platform APIs solve the requirement cleanly.

For UI work, verify mobile and desktop behaviour, keyboard access, reduced motion, scroll stability, image loading and responsive overflow. Important content must not depend on animation.

For SEO work, preserve valid existing URLs, canonicals, redirects, sitemap intent, robots behaviour and truthful structured data. Never fabricate reviews, FAQs, awards, rankings, client results or performance claims.

For analytics work, preserve the consent model in `docs/MEASUREMENT-SETUP.md`; never send enquiry content or personal data to analytics.

Never commit credentials, API secrets, private keys or production tokens.

Minimum code gates before claiming implementation complete:
- `npm run typecheck`
- `npm run build`
- relevant repository QA scripts from `docs/QUALITY-GATES.md`
- browser/responsive evidence for user-interface changes
- Production verification after deployment when deployment is in scope

A successful build alone is not completion. Report what was actually tested and identify any external system that was not observed.
```

- [ ] **Step 4: Create `docs/WD-DEVELOPMENT-WORKFLOW.md`**

Preserve the spec's exact phase order:

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

For every phase include four fields: objective, required checks, evidence, completion gate. Include the approved field targets: LCP <= 2.5 s, INP <= 200 ms and CLS <= 0.1 at the 75th percentile when real-user data exists.

- [ ] **Step 5: Add and run the documentation contract npm script**

Add to `package.json`:

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
- Produces: repository-specific launch constraints, command/evidence matrix, and `npm run test:workflow-profile`.

- [ ] **Step 1: Write the failing profile contract**

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

- [ ] **Step 2: Verify the profile contract fails**

```bash
node qa/workflow-profile-contract.cjs
```

Expected: FAIL because the two documents do not exist.

- [ ] **Step 3: Create `docs/PROJECT-PROFILE.md`**

Document these exact repository facts and constraints:

- Next.js 15.5.25 + React 19.2.0 + TypeScript.
- Cloudflare Workers/Wrangler runtime.
- Cloudflare D1/Drizzle where used by contact/runtime flows.
- UI authority: `docs/UI-SYSTEM.md` + `src/styles/design-tokens.css`.
- Measurement authority: `docs/MEASUREMENT-SETUP.md`.
- Deployment authority: `.github/workflows/cloudflare.yml` + `npm run deploy`.
- Preserve current contact, consent and canonical behaviour.
- Carry forward the existing `docs/UI-SYSTEM.md` launch blockers, including Founder images approval and real contact endpoint delivery verification, without claiming they are resolved.
- Account-side GA4, GTM, Search Console, email and Cloudflare settings are not considered verified from code alone.

- [ ] **Step 4: Create `docs/QUALITY-GATES.md`**

Include a table mapping each gate to its command and evidence. Preserve the existing pre-deploy order:

```text
npm ci
npm run test:backend
npm run build
npm run test:mb-legacy
npm run typecheck
npm run test:measurement
npm run test:deployment
```

Also document browser QA as mandatory for UI changes after Task 3, with `qa-results/report.json` and screenshots as the evidence artifact.

- [ ] **Step 5: Add and run the profile npm script**

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

### Task 3: Make the Existing Browser Audit Reproducible and Spec-Complete

**Files:**
- Modify: `qa/browser-audit.cjs`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `qa/browser-audit-contract.cjs`
- Test: `qa/browser-audit-contract.cjs`

**Interfaces:**
- Consumes: existing `qa/browser-audit.cjs` and a built Cloudflare preview at `QA_BASE_URL`.
- Produces: pinned Playwright/axe dependencies, `test:browser`, and viewport coverage including 375px while retaining every existing viewport.

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
  '320,360,375,390,430,640,768,1024,1280,1440,1920',
  'home-text-200', 'sitemap.xml', 'qa-results'
]) assert.ok(audit.includes(phrase), `browser audit missing expected coverage: ${phrase}`);

console.log('WD browser audit contract passed');
```

- [ ] **Step 2: Verify it fails before implementation**

```bash
node qa/browser-audit-contract.cjs
```

Expected: FAIL because the dependencies/script are undeclared and 375px is not yet in the viewport array.

- [ ] **Step 3: Add the missing 375px viewport without removing existing coverage**

In `qa/browser-audit.cjs`, change only the viewport array from:

```js
[320,360,390,430,640,768,1024,1280,1440,1920]
```

to:

```js
[320,360,375,390,430,640,768,1024,1280,1440,1920]
```

No other browser-audit behaviour is changed in this task.

- [ ] **Step 4: Install pinned browser QA dependencies**

```bash
npm install --save-dev --save-exact playwright@1.63.0 @axe-core/playwright@4.13.0
```

Expected: `package.json` and `package-lock.json` contain those exact versions.

- [ ] **Step 5: Add browser scripts**

Add:

```json
"test:browser": "node qa/browser-audit.cjs",
"test:browser-contract": "node qa/browser-audit-contract.cjs"
```

- [ ] **Step 6: Run the browser contract**

```bash
npm run test:browser-contract
```

Expected: PASS with `WD browser audit contract passed`.

- [ ] **Step 7: Commit**

```bash
git add qa/browser-audit.cjs qa/browser-audit-contract.cjs package.json package-lock.json
git commit -m "test: make browser audit reproducible"
```

---

### Task 4: Enforce Workflow Contracts and Browser QA in GitHub Actions

**Files:**
- Modify: `.github/workflows/cloudflare.yml`
- Create: `qa/ci-workflow-contract.cjs`
- Modify: `package.json`
- Test: `qa/ci-workflow-contract.cjs`

**Interfaces:**
- Consumes: `npm run build`, `npm run start`, `npm run test:browser`, existing `verify` and `deploy` jobs.
- Produces: CI that blocks deployment on workflow-contract/browser-QA failure and uploads browser evidence.

- [ ] **Step 1: Write the failing CI contract**

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

- [ ] **Step 2: Verify it fails before CI changes**

```bash
node qa/ci-workflow-contract.cjs
```

Expected: FAIL because the new workflow and browser steps are not yet present.

- [ ] **Step 3: Add workflow contract checks after `npm ci`**

Add to the existing `verify` job:

```yaml
      - run: npm run test:workflow-docs
      - run: npm run test:workflow-profile
      - run: npm run test:browser-contract
```

Keep every existing backend/build/measurement/deployment test.

- [ ] **Step 4: Install the Chromium runtime matching the lockfile-pinned Playwright**

Add:

```yaml
      - run: npx playwright install --with-deps chromium
```

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

- [ ] **Step 6: Run browser QA**

Add:

```yaml
      - name: Run browser responsive and accessibility audit
        run: QA_BASE_URL=http://127.0.0.1:8787 npm run test:browser
```

- [ ] **Step 7: Upload browser evidence even on audit failure**

Add immediately after browser QA:

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

Do not replace the current `verified-site-${{ github.sha }}` artifact. The `deploy` job must continue downloading only `dist/` from that verified-site artifact.

- [ ] **Step 8: Add and run the CI contract npm script**

Add:

```json
"test:ci-workflow": "node qa/ci-workflow-contract.cjs"
```

Run:

```bash
npm run test:ci-workflow
```

Expected: PASS with `WD CI workflow contract passed`.

- [ ] **Step 9: Run the complete non-browser regression set**

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

Expected: every command exits 0.

- [ ] **Step 10: Run browser QA locally against the built preview**

Terminal 1:

```bash
npm run start -- --ip 127.0.0.1 --port 8787
```

Terminal 2:

```bash
QA_BASE_URL=http://127.0.0.1:8787 npm run test:browser
```

Expected: exit 0, `qa-results/report.json` generated, screenshots generated for all viewport and interaction states, and the report contains no failures.

- [ ] **Step 11: Commit**

```bash
git add .github/workflows/cloudflare.yml qa/ci-workflow-contract.cjs package.json package-lock.json
git commit -m "ci: enforce WD quality gates and browser audit"
```

---

### Task 5: Final Verification and PR Evidence

**Files:**
- Review: all files changed by Tasks 1-4
- Update: PR #7 description
- No application source changes expected.

**Interfaces:**
- Consumes: completed implementation and test outputs.
- Produces: a reviewable PR with exact verification evidence and no unsupported completion claims.

- [ ] **Step 1: Verify diff scope and whitespace**

```bash
git diff --stat main...HEAD
git diff --check main...HEAD
```

Expected: only docs/instructions/QA/package/workflow files from this plan; no website redesign or marketing-content edits; no whitespace errors.

- [ ] **Step 2: Re-run all static/backend/build gates**

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

Expected: all exit 0.

- [ ] **Step 3: Re-run browser QA**

With the built preview running on `127.0.0.1:8787`:

```bash
QA_BASE_URL=http://127.0.0.1:8787 npm run test:browser
```

Expected: exit 0.

- [ ] **Step 4: Inspect visual evidence manually**

Review `qa-results/report.json` plus representative screenshots for 375, 390, 768, 1440 and 1920 widths and the interaction evidence `mobile-menu.png`, `desktop-menu.png`, `home-text-200.png`. Confirm no obvious layout regression, broken image, stuck scroll lock, unreadable typography or flashing/jumping regression.

- [ ] **Step 5: Confirm production deployment architecture is unchanged**

Verify `.github/workflows/cloudflare.yml` still includes:

```yaml
deploy:
  needs: verify
```

and the deploy condition still requires `github.ref == 'refs/heads/main'` and `CLOUDFLARE_DEPLOY_ENABLED == 'true'`.

- [ ] **Step 6: Update PR #7 description with evidence**

Record:

- files added/changed;
- exact commands run and results;
- browser artifact name `browser-qa-${{ github.sha }}`;
- confirmation that no live-site design/content change was part of this implementation;
- any external/account-side systems not verified;
- the preserved production deployment gate.

- [ ] **Step 7: Keep the PR draft until CI and visual review are complete**

Do not merge solely because files exist. Mark ready for review only after the GitHub Actions `verify` job passes and browser evidence is reviewed.
