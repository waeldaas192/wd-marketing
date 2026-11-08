/* Obtain the unmodified webfont from its publisher for this site's build.
 * Fontshare permits self-hosting, but not redistributing font files in a public
 * source repository. Keep the downloaded asset ignored and verify its bytes.
 */
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');

const FONT_URL = 'https://cdn.fontshare.com/wf/NWBQYJIM7GCZ5XWD7D26ARB3VDY55ZRT/K63EV2KZIGKLE7RANQ2U42S6SVHU5RJ7/X6XYTKIVDUW7GZTZPZNN4EUM5KH54KHF.woff2';
const FONT_SHA256 = 'e739aff9b4d02c264341d6d4872edcda28e79373aeda936f659566a1cd3eb47f';
const FONT_PATH = path.resolve(__dirname, '../src/app/fonts/Satoshi-Variable.woff2');
const matchesFont = data => data.subarray(0, 4).toString() === 'wOF2'
  && createHash('sha256').update(data).digest('hex') === FONT_SHA256;

async function prepareSatoshi(destination = FONT_PATH, fetchFont = fetch) {
  try {
    if (matchesFont(await fs.readFile(destination))) return 'cached';
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const response = await fetchFont(FONT_URL, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`Satoshi download failed: HTTP ${response.status}`);
  const font = Buffer.from(await response.arrayBuffer());
  if (!matchesFont(font)) throw new Error('Satoshi checksum mismatch; refusing an unverified font.');

  await fs.mkdir(path.dirname(destination), { recursive: true });
  const temporary = `${destination}.${process.pid}.tmp`;
  try {
    await fs.writeFile(temporary, font);
    await fs.rename(temporary, destination);
  } finally {
    await fs.rm(temporary, { force: true });
  }
  return 'downloaded';
}

if (require.main === module) {
  prepareSatoshi().then(status => console.log(`Satoshi webfont: ${status} and verified (42.6 kB).`))
    .catch(error => { console.error(error.message); process.exitCode = 1; });
}

module.exports = { prepareSatoshi, FONT_PATH, FONT_SHA256 };
