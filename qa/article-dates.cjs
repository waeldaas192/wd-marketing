const assert = require('node:assert/strict');
const { buildSync } = require('esbuild');
const { runInNewContext } = require('node:vm');

const compiled = buildSync({ entryPoints: ['src/lib/structured-data.ts'], bundle: true, platform: 'node', format: 'cjs', write: false });
const context = { module: { exports: {} }, URL };
runInNewContext(compiled.outputFiles[0].text, context);
const { articleSchema } = context.module.exports;
const article = { slug: 'example', title: 'Example', summary: 'Example guide', date: '2026-09-05', image: '/images/example.webp' };

assert.equal(articleSchema(article).dateModified, article.date, 'An unchanged article retains its original date');
const updated = articleSchema({ ...article, modified: '2026-09-25' });
assert.equal(updated.datePublished, article.date, 'Updating an article must not reset its publication date');
assert.equal(updated.dateModified, '2026-09-25', 'Article schema must expose the actual editorial update date');
console.log('Article publication/update dates: PASS');
