/* Run with: node qa/seo-motion.cjs. No browser or runtime dependency required. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../src/lib/seo-motion.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
const context = { exports: {} };
vm.runInNewContext(compiled.outputText, context);
const { seoMotionFrame, SEO_CHART, SEO_MOTION_DURATION, chartPath, impressionSeries } = context.exports;

const start = seoMotionFrame(0), end = seoMotionFrame(10_000);
assert.equal(start.impressions, 0);
assert.equal(start.clicks, 0);
assert.equal(start.averagePosition, '—');
assert.equal(start.position, 4);
assert.equal(start.rank, 5);
assert.equal(start.x, SEO_CHART.left);
assert.equal(start.y, SEO_CHART.bottom);
assert.equal(end.impressions, 120000);
assert.equal(end.clicks, 3200);
assert.equal(end.visibility, 82);
assert.equal(end.averagePosition, '3.2');
assert.equal(end.position, 0);
assert.equal(end.rank, 1);
assert.equal(end.complete, true);
assert.equal(end.targetX, 0);
assert.equal(end.targetAngle, 0);
assert.equal(end.x, SEO_CHART.right);
assert.equal(end.y, SEO_CHART.top);
assert.equal(chartPath(impressionSeries, SEO_CHART.max).includes('NaN'), false);

let previous = start;
const ranks = new Set();
let dips = 0;
for (let time = 0; time < SEO_MOTION_DURATION; time += 16) {
  const frame = seoMotionFrame(time);
  assert.ok(frame.progress >= 0 && frame.progress <= 1);
  assert.ok(frame.x >= previous.x, 'Chart should draw left to right');
  assert.ok(frame.position <= previous.position, 'Target overtakes in order');
  assert.ok(Math.abs(frame.position - previous.position) < .04, 'No jump between ranking steps');
  assert.ok(frame.y >= SEO_CHART.top && frame.y <= SEO_CHART.bottom);
  assert.ok(frame.otherPositions.every((position, index) => position >= index && position <= index + 1));
  assert.ok(frame.otherPositions.every((position, index, positions) => index === 0 || position > positions[index - 1]), 'Other results preserve order');
  assert.ok(Number.isFinite(frame.angle));
  ranks.add(frame.rank);
  if (frame.impressions < previous.impressions) dips++;
  previous = frame;
}
assert.equal(ranks.size, 5, 'All five ranking positions appear');
assert.ok(dips > 0, 'Growth includes natural dips, not a straight guarantee');
const settled = seoMotionFrame(12900);
assert.equal(settled.position, 0, 'Final first-place frame holds before replay');
assert.equal(settled.impressions, 120000);
const component = fs.readFileSync(path.join(__dirname, '../src/components/seo/SeoGrowthMotion.tsx'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '../src/components/seo/SeoGrowthMotion.module.css'), 'utf8');
for (const [, name] of component.matchAll(/styles\.(\w+)/g)) {
  assert.ok(new RegExp('\\.' + name + '(?![\\w-])').test(css), `Missing CSS module class: ${name}`);
}
assert.ok(component.includes('useMotionPreference'), 'Share the site motion control');
assert.ok(component.includes('cancelAnimationFrame'), 'Cancel animation while not running');
assert.ok(component.includes('IntersectionObserver'), 'Suspend off-screen motion');
assert.ok(component.includes('document.hidden'), 'Suspend hidden-tab motion');
assert.ok(component.includes('not client results or a forecast'), 'Illustrations need a visible disclaimer');
assert.ok(css.includes('max-width:760px'), 'Mobile layout exists');
assert.ok(css.includes('prefers-reduced-motion:reduce'), 'Reduced-motion styling exists');
console.log('SEO motion checks passed: chart bounds, figures, four smooth overtakes, five ranks, honest dips, final hold.');
