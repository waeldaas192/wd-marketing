const miniflare = require('miniflare');

function createMiniflare(options) {
  const normalized = typeof miniflare.convertV4MiniflareOptions === 'function'
    ? miniflare.convertV4MiniflareOptions(options)
    : options;
  return new miniflare.Miniflare(normalized);
}

module.exports = { createMiniflare };
