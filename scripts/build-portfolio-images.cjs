// Reproducible technical exports of real screenshots. No screenshot content
// is generated, retouched, removed or replaced.
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');
const manifest = require('../assets/project-screenshots/manifest.json');
const root = path.resolve(__dirname, '..');
const rawDir = path.join(root, 'assets/project-screenshots');

async function main() {
  const importDir = process.argv[2];
  let count = 0;
  for (const capture of manifest.records) {
    if (!/^wd-portfolio-[a-z-]+-\d+\.jpg$/.test(capture.sourceFile)) throw new Error('Invalid source filename');
    const input = path.join(rawDir, capture.sourceFile);
    if (importDir) await fs.copyFile(path.join(importDir, capture.sourceFile), input);
    const bytes = await fs.readFile(input);
    const meta = await sharp(bytes).metadata();
    if (meta.width !== 1348 || meta.height !== 926) throw new Error(`Unexpected viewport: ${capture.sourceFile}`);
    for (const output of capture.outputs) {
      if (!output.path.startsWith('/images/') || output.path.includes('..')) throw new Error('Invalid export path');
      const target = path.join(root, 'public', output.path);
      await fs.mkdir(path.dirname(target), { recursive: true });
      await sharp(bytes)
        .extract({ left: 0, top: 0, width: 1333, height: 926 })
        .resize(output.width, output.height, { fit: 'contain', background: '#f5f5fc' })
        .webp({ quality: 88, effort: 6 })
        .toFile(target);
      count++;
    }
  }
  console.log(`Exported ${count} optimised images from ${manifest.records.length} real screenshots.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
