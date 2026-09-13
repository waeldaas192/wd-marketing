const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const placeholders = require('../src/data/placeholder-hashes.json');
const page = path.join(root, 'out/work/mb-legacy-roofing.html');

const assets = [
  ['/images/projects/roofing/mb-legacy-roofing-london-case-study.webp', 1800, 1200],
  ['/images/projects/roofing/mb-legacy-roofing-website-desktop.webp', 1800, 1200],
  ['/images/projects/roofing/mb-legacy-roofing-local-seo-structure.webp', 1800, 1200],
  ['/images/projects/roofing/mb-legacy-roofing-mobile-lead-page.webp', 1200, 1500],
];

async function main() {
  const html = fs.readFileSync(page, 'utf8');

  assert(html.includes('data-case-metrics="true"'), 'Case study must render verified project metrics');
  for (const value of ['99', '90', '100', '47']) {
    assert(html.includes(`>${value}<`), `Case study must render the verified metric ${value}`);
  }
  assert(html.includes('data-case-technology="true"'), 'Case study must explain the production technology');
  for (const label of ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Cloudflare Workers + D1']) {
    assert(html.includes(label), `Case study must render ${label}`);
  }
  assert(html.includes('13 September 2026'), 'Performance evidence must state the snapshot date');
  for (const result of ['97 accessibility', '96 best practices']) {
    assert(html.includes(result), `Performance evidence must retain ${result}`);
  }
  assert(html.includes('Lab scores can vary by run'), 'Performance evidence must explain lab-score variability');
  for (const caveat of ['lead', 'revenue', 'ranking guarantees']) {
    assert(html.includes(caveat), `Performance evidence must retain the ${caveat} caveat`);
  }

  for (const [src, width, height] of assets) {
    assert(html.includes(src), `Case study must render ${src}`);
    const bytes = fs.readFileSync(path.join(root, 'public', src));
    const metadata = await sharp(bytes).metadata();
    assert.equal(metadata.format, 'webp');
    assert.equal(metadata.width, width);
    assert.equal(metadata.height, height);
    assert(bytes.length < 300 * 1024, `${src} exceeds the 300 KB image budget`);
    assert.notEqual(
      createHash('sha256').update(bytes).digest('hex'),
      placeholders[src],
      `${src} must not remain a placeholder`,
    );
  }

  console.log('PASS MB Legacy case study: verified metrics, production stack and four optimised assets.');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
