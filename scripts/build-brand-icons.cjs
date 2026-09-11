/* Technical exports only: the master artwork is generated, not redrawn here.
 * Run from any directory with: node scripts/build-brand-icons.cjs
 * Sharp is already supplied by this project's pinned Next.js dependency.
 */
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const directory = path.join(root, 'public/images/brand/icons');
const source = path.join(directory, 'wd-icon-master-v2.png');
const sizes = [16, 32, 48, 192, 512];

// ICO supports multiple PNG frames. Include native small sizes rather than
// asking every browser to shrink the large Apple touch image itself.
async function icoFile() {
  const frameSizes = [16, 32, 48, 256];
  const frames = await Promise.all(frameSizes.map(size =>
    sharp(source).resize(size, size).ensureAlpha()
      .png({ palette: true, compressionLevel: 9, effort: 10 }).toBuffer()
  ));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);
  let offset = 6 + frames.length * 16;
  const entries = frames.map((frame, index) => {
    const entry = Buffer.alloc(16);
    const size = frameSizes[index];
    entry[0] = entry[1] = size === 256 ? 0 : size;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(frame.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += frame.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...frames]);
}

async function main() {
  const metadata = await sharp(source).metadata();
  assert.equal(metadata.width, metadata.height, 'Icon master must be square');
  assert.ok(metadata.width >= 512, 'Icon master must be at least 512px');
  assert.ok((await sharp(source).stats()).isOpaque, 'Icon master must be opaque');
  for (const size of sizes) {
    await sharp(source).resize(size, size, { kernel: 'lanczos3' })
      .removeAlpha().png({ palette: true, compressionLevel: 9, effort: 10 })
      .toFile(path.join(directory, `wd-icon-v2-${size}.png`));
  }
  const apple = path.join(directory, 'wd-apple-touch-v2.png');
  await sharp(source).resize(180, 180, { kernel: 'lanczos3' })
    .removeAlpha().png({ palette: true, compressionLevel: 9, effort: 10 }).toFile(apple);
  const ico = await icoFile();
  await fs.writeFile(path.join(directory, 'wd-favicon-v2.ico'), ico);
  // Conventional root fallbacks for browsers that do not consult <head>.
  await fs.writeFile(path.join(root, 'public/favicon.ico'), ico);
  await fs.copyFile(apple, path.join(root, 'public/apple-touch-icon.png'));
  console.log('Exported WD favicon sizes 16/32/48/192/512, Apple 180, and multi-size ICO.');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
