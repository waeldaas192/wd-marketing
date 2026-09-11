/* Verify the pinned, original library files and the data rendered by LibraryIcon. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = path.resolve('src/vendor/lucide');
const sources = require(path.join(root, 'sources.json'));
const nodes = require(path.join(root, 'nodes.json'));
const report = { library: sources.library, version: sources.version, checks: [], failures: [] };
const hash = data => crypto.createHash('sha1').update(Buffer.concat([Buffer.from(`blob ${data.length}\0`), data])).digest('hex');
try {
  assert.equal(sources.library, 'Lucide');
  assert.deepEqual(Object.keys(nodes).sort(), Object.keys(sources.icons).sort());
  for (const [name, source] of Object.entries(sources.icons)) {
    const data = fs.readFileSync(path.join(root, source.path));
    assert.equal(hash(data), source.blobSha, `${name}: not the verified upstream SVG`);
    const actual = [...data.toString().matchAll(/<(path|rect|circle)\s+([^>]+?)\s*\/>/g)].map(match => [match[1], Object.fromEntries([...match[2].matchAll(/([\w-]+)="([^"]*)"/g)].map(attribute => [attribute[1], attribute[2]]))]);
    assert.deepEqual(nodes[name], actual, `${name}: rendered geometry differs from Lucide source`);
    report.checks.push({ name, sourceHashVerified: true, renderedGeometryVerified: true });
  }
  assert.equal(hash(fs.readFileSync(path.join(root, 'LICENSE'))), '718bb3f0e44153809972abed31839375804bf652');
  report.licenseVerified = true;
} catch (error) { report.failures.push(error.message); }
fs.mkdirSync('qa-results', { recursive: true });
fs.writeFileSync('qa-results/icon-source-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (report.failures.length) process.exitCode = 1;
