const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const Module = require('node:module');
const ts = require('typescript');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const manifest = require('../assets/project-screenshots/manifest.json');
const placeholders = require('../src/data/placeholder-hashes.json');

function loadData(name) {
  const filename = path.join(root, `src/data/${name}.ts`);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  const ordinaryRequire = mod.require.bind(mod);
  mod.require = request => request.startsWith('./') ? loadData(request.slice(2)) : ordinaryRequire(request);
  mod._compile(code, filename);
  return mod.exports;
}

async function main() {
  const { projects } = loadData('projects');
  assert.equal(projects.length, 12);
  assert.equal(new Set(projects.map(p => p.slug)).size, projects.length);
  const exportIndex = new Map(manifest.records.flatMap(c => c.outputs.map(o => [o.path, o])));
  for (const record of manifest.records) {
    const raw = path.join(root, 'assets/project-screenshots', record.sourceFile);
    assert(fs.statSync(raw).size > 0);
    assert.equal(new URL(record.url).protocol, 'https:');
    for (const output of record.outputs) {
      const bytes = fs.readFileSync(path.join(root, 'public', output.path));
      const metadata = await sharp(bytes).metadata();
      assert.equal(metadata.format, 'webp');
      assert.equal(metadata.width, output.width);
      assert.equal(metadata.height, output.height);
      assert(bytes.length < 300 * 1024, `${output.path} exceeds the image budget`);
      assert.notEqual(createHash('sha256').update(bytes).digest('hex'), placeholders[output.path]);
    }
  }
  const sitemap = fs.readFileSync(path.join(root, 'out/sitemap.xml'), 'utf8');
  const work = fs.readFileSync(path.join(root, 'out/work.html'), 'utf8');
  for (const project of projects) {
    const html = fs.readFileSync(path.join(root, `out/work/${project.slug}.html`), 'utf8');
    assert(work.includes(`/work/${project.slug}`));
    assert(sitemap.includes(`/work/${project.slug}`));
    if (project.website) assert(html.includes(project.website));
    for (const asset of [{ src: project.image, width: 1800, height: 1200 }, ...project.gallery]) {
      if (project.slug === 'stone-pro-worktops') continue; // Explicit pending capture, not silently approved.
      const filename = path.join(root, 'public', asset.src);
      assert(fs.statSync(filename).size > 0);
      const exported = exportIndex.get(asset.src);
      if (exported) {
        assert.equal(asset.width, exported.width);
        assert.equal(asset.height, exported.height);
      }
      assert(html.includes(asset.src), `${project.slug} does not render ${asset.src}`);
    }
  }
  const home = fs.readFileSync(path.join(root, 'out/index.html'), 'utf8');
  assert(home.includes('Explore all '));
  assert(!home.includes('href="/work/prestige-painters"'), 'Home should retain four selected projects');
  assert(work.includes('>10</span>') && !work.includes('>010</span>'));
  console.log(`PASS: ${projects.length} project pages, ${manifest.records.length} captures, ${exportIndex.size} image exports, sitemap and live-site links.`);
  console.log('Pending: Stone Pro Worktops approved current-version imagery.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
