const fs = require('node:fs');
const assert = require('node:assert/strict');

for (const file of ['AGENTS.md', 'docs/WD-DEVELOPMENT-WORKFLOW.md']) {
  assert.ok(fs.existsSync(file), `${file} must exist`);
  assert.ok(fs.readFileSync(file, 'utf8').length > 600, `${file} is unexpectedly small`);
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
  'Requirements',
  'Design direction',
  'Responsive QA',
  'Accessibility',
  'SEO and AI-search readiness',
  'Measurement',
  'Performance',
  'Security review',
  'Automated verification',
  'Production verification',
]) assert.ok(workflow.includes(phase), `workflow doc missing phase: ${phase}`);

for (const target of ['320', '375', '390', '430', '768', '1024', '1280', '1440', '1920']) {
  assert.ok(workflow.includes(target), `workflow doc missing responsive target: ${target}`);
}

console.log('WD workflow documentation contract passed');
