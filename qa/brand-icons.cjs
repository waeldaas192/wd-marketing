// Run after npm run build. Checks the exported pages, not only TS metadata.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'out');
const base = '/images/brand/icons/';
const sizes = [16, 32, 48, 192, 512];

async function main() {
  const pages = fs.readdirSync(output, { recursive: true })
    .filter(file => file.endsWith('.html'));
  assert.ok(pages.length, 'Expected exported HTML pages');
  for (const file of pages) {
    const html = fs.readFileSync(path.join(output, file), 'utf8');
    const links = html.match(/<link\b[^>]*>/g) || [];
    const icons = links.filter(link => /rel="(?:icon|shortcut icon|apple-touch-icon)"/.test(link));
    assert.equal(icons.length, 7, `${file}: expected the single explicit icon set`);
    for (const size of sizes) {
      assert.ok(icons.some(link => link.includes(`${base}wd-icon-v2-${size}.png`)
        && link.includes(`sizes="${size}x${size}"`)), `${file}: missing ${size}px icon`);
    }
    assert.ok(icons.some(link => link.includes('rel="apple-touch-icon"')
      && link.includes(`${base}wd-apple-touch-v2.png`)
      && link.includes('sizes="180x180"')), `${file}: Apple icon`);
    for (const link of icons) {
      const href = link.match(/href="([^"]+)"/)[1];
      assert.ok(fs.existsSync(path.join(output, href)), `${file}: missing ${href}`);
    }
  }
  for (const size of [...sizes, 180]) {
    const name = size === 180 ? 'wd-apple-touch-v2.png' : `wd-icon-v2-${size}.png`;
    const image = sharp(path.join(output, base, name));
    const metadata = await image.metadata();
    assert.equal(metadata.width, size);
    assert.equal(metadata.height, size);
    assert.ok((await image.stats()).isOpaque, `${name}: must not be transparent`);
  }
  const ico = fs.readFileSync(path.join(output, 'favicon.ico'));
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 4);
  for (let index = 0; index < 4; index++) {
    const offset = 6 + index * 16;
    const length = ico.readUInt32LE(offset + 8);
    const start = ico.readUInt32LE(offset + 12);
    assert.ok(start + length <= ico.length);
    const frame = await sharp(ico.subarray(start, start + length)).metadata();
    assert.equal(frame.width, [16, 32, 48, 256][index]);
    assert.equal(frame.height, frame.width);
  }
  assert.deepEqual(fs.readFileSync(path.join(output, 'apple-touch-icon.png')),
    fs.readFileSync(path.join(output, base, 'wd-apple-touch-v2.png')));
  console.log(`PASS: ${pages.length} exported pages, 7 correct icon links each, opaque PNGs, 4 ICO frames and root fallbacks.`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
