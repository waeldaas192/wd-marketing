const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'assets/project-screenshots');
const output = path.join(root, 'public/images/projects/roofing');
const brandLogo = fs.readFileSync(path.join(root, 'public/images/brand/wd-marketing-logo.svg'));

const coverSource = path.join(source, 'mb-legacy-white-thumbnail-2026-09-13.webp');
const desktopSource = path.join(source, 'mb-legacy-live-desktop-2026-09-13.jpg');
const mobileEvidence = path.join(source, 'mb-legacy-pagespeed-mobile-2026-09-13.webp');

const logo = sharp(brandLogo).resize({ width: 390 }).png().toBuffer();

function roundedMask(width, height, radius) {
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/></svg>`);
}

function labelSvg(width, height, text) {
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="28" fill="#d69a6a" font-family="Arial,Helvetica,sans-serif" font-size="22" font-weight="700" letter-spacing="4">${text}</text>
  </svg>`);
}

function gridBackground(width, height) {
  const lines = [];
  for (let x = 0; x <= width; x += 120) lines.push(`<path d="M${x} 0V${height}"/>`);
  for (let y = 0; y <= height; y += 120) lines.push(`<path d="M0 ${y}H${width}"/>`);
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#06111e"/><stop offset="1" stop-color="#10283a"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <g fill="none" stroke="#7ea0b8" stroke-opacity=".09" stroke-width="1">${lines.join('')}</g>
    <circle cx="1500" cy="130" r="360" fill="#b97042" opacity=".08"/>
  </svg>`);
}

async function buildCover() {
  const canvas = await sharp(coverSource)
    .resize(1800, 1200, { fit: 'cover', position: 'centre' })
    .webp({ quality: 84, effort: 6 })
    .toBuffer();
  await fs.promises.writeFile(path.join(output, 'mb-legacy-roofing-london-case-study.webp'), canvas);
}

async function buildDesktop() {
  const logoPng = await logo;
  const screen = await sharp(desktopSource)
    .resize(1500, 1030, { fit: 'cover', position: 'top' })
    .composite([{ input: roundedMask(1500, 1030, 18), blend: 'dest-in' }])
    .png()
    .toBuffer();
  const chrome = Buffer.from(`<svg width="1540" height="1080" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="1524" height="1064" rx="30" fill="#000" opacity=".3"/>
    <rect x="0" y="0" width="1540" height="1070" rx="26" fill="#eff2f5"/>
    <circle cx="34" cy="28" r="7" fill="#d57965"/><circle cx="58" cy="28" r="7" fill="#d2a05d"/><circle cx="82" cy="28" r="7" fill="#79a77c"/>
  </svg>`);
  const image = await sharp(gridBackground(1800, 1200))
    .composite([
      { input: chrome, left: 130, top: 78 },
      { input: screen, left: 150, top: 118 },
      { input: logoPng, left: 84, top: 10 },
      { input: labelSvg(540, 54, 'LIVE WEBSITE · DESKTOP'), left: 1180, top: 38 },
    ])
    .webp({ quality: 84, effort: 6 })
    .toBuffer();
  await fs.promises.writeFile(path.join(output, 'mb-legacy-roofing-website-desktop.webp'), image);
}

async function buildArchitecture() {
  const logoPng = await logo;
  const architecture = Buffer.from(`<svg width="1800" height="1200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#06111e"/><stop offset="1" stop-color="#133145"/></linearGradient></defs>
    <rect width="1800" height="1200" fill="url(#bg)"/>
    <g fill="none" stroke="#94a8b8" stroke-opacity=".08">${Array.from({length:16},(_,i)=>`<path d="M${i*120} 0V1200"/>`).join('')}${Array.from({length:11},(_,i)=>`<path d="M0 ${i*120}H1800"/>`).join('')}</g>
    <text x="84" y="250" fill="#f5f7fa" font-family="Arial,Helvetica,sans-serif" font-size="64" font-weight="700" letter-spacing="-2">A roofing platform built as</text>
    <text x="84" y="326" fill="#f5f7fa" font-family="Arial,Helvetica,sans-serif" font-size="64" font-weight="700" letter-spacing="-2">one connected system.</text>
    <text x="84" y="380" fill="#aebdca" font-family="Arial,Helvetica,sans-serif" font-size="24">Fast pages, structured search coverage and protected enquiries at the edge.</text>
    <g font-family="Arial,Helvetica,sans-serif">
      <g transform="translate(84 490)"><rect width="370" height="270" rx="24" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-opacity=".16"/><text x="28" y="50" fill="#d69a6a" font-size="18" font-weight="700" letter-spacing="3">01 · EXPERIENCE</text><text x="28" y="112" fill="#fff" font-size="38" font-weight="700">Next.js 16</text><text x="28" y="154" fill="#aebdca" font-size="22">App Router · React 19</text><text x="28" y="190" fill="#aebdca" font-size="22">Responsive conversion UX</text><text x="28" y="226" fill="#aebdca" font-size="22">Optimised image delivery</text></g>
      <path d="M454 625H502" stroke="#d69a6a" stroke-width="3"/><path d="m492 615 10 10-10 10" fill="none" stroke="#d69a6a" stroke-width="3"/>
      <g transform="translate(514 490)"><rect width="370" height="270" rx="24" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-opacity=".16"/><text x="28" y="50" fill="#d69a6a" font-size="18" font-weight="700" letter-spacing="3">02 · DISCOVERY</text><text x="28" y="112" fill="#fff" font-size="38" font-weight="700">47 routes</text><text x="28" y="154" fill="#aebdca" font-size="22">Services · roof types</text><text x="28" y="190" fill="#aebdca" font-size="22">London area pages</text><text x="28" y="226" fill="#aebdca" font-size="22">Metadata · schema · canonicals</text></g>
      <path d="M884 625H932" stroke="#d69a6a" stroke-width="3"/><path d="m922 615 10 10-10 10" fill="none" stroke="#d69a6a" stroke-width="3"/>
      <g transform="translate(944 490)"><rect width="370" height="270" rx="24" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-opacity=".16"/><text x="28" y="50" fill="#d69a6a" font-size="18" font-weight="700" letter-spacing="3">03 · DELIVERY</text><text x="28" y="112" fill="#fff" font-size="38" font-weight="700">Cloudflare</text><text x="28" y="154" fill="#aebdca" font-size="22">Worker and static assets</text><text x="28" y="190" fill="#aebdca" font-size="22">84 legacy redirects</text><text x="28" y="226" fill="#aebdca" font-size="22">Edge-first production runtime</text></g>
      <path d="M1314 625H1362" stroke="#d69a6a" stroke-width="3"/><path d="m1352 615 10 10-10 10" fill="none" stroke="#d69a6a" stroke-width="3"/>
      <g transform="translate(1374 490)"><rect width="342" height="270" rx="24" fill="#fff" fill-opacity=".06" stroke="#fff" stroke-opacity=".16"/><text x="28" y="50" fill="#d69a6a" font-size="18" font-weight="700" letter-spacing="3">04 · ENQUIRY</text><text x="28" y="112" fill="#fff" font-size="38" font-weight="700">D1 database</text><text x="28" y="154" fill="#aebdca" font-size="22">Prepared statements</text><text x="28" y="190" fill="#aebdca" font-size="22">Rate limits · consent</text><text x="28" y="226" fill="#aebdca" font-size="22">Idempotent submissions</text></g>
      <g transform="translate(84 850)" font-size="21" fill="#d9e2e9"><rect width="1632" height="160" rx="24" fill="#fff" fill-opacity=".045" stroke="#fff" stroke-opacity=".12"/><text x="34" y="55" fill="#d69a6a" font-size="17" font-weight="700" letter-spacing="3">MIGRATION SAFEGUARDS</text><text x="34" y="108">Unique metadata</text><text x="290" y="108">Structured data</text><text x="545" y="108">Canonical URLs</text><text x="785" y="108">Legacy redirects</text><text x="1035" y="108">Protected forms</text><text x="1280" y="108">No invented claims</text></g>
    </g>
  </svg>`);
  const image = await sharp(architecture)
    .composite([{ input: logoPng, left: 84, top: 58 }])
    .webp({ quality: 88, effort: 6 })
    .toBuffer();
  await fs.promises.writeFile(path.join(output, 'mb-legacy-roofing-local-seo-structure.webp'), image);
}

async function buildMobileEvidence() {
  const logoPng = await logo;
  const phoneCrop = await sharp(mobileEvidence)
    .extract({ left: 730, top: 532, width: 160, height: 320 })
    .resize(456, 912, { kernel: sharp.kernel.lanczos3 })
    .composite([{ input: roundedMask(456, 912, 28), blend: 'dest-in' }])
    .png()
    .toBuffer();
  const board = Buffer.from(`<svg width="1200" height="1500" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#06111e"/><stop offset="1" stop-color="#14364b"/></linearGradient></defs>
    <rect width="1200" height="1500" fill="url(#bg)"/>
    <g fill="none" stroke="#a9bdcb" stroke-opacity=".08">${Array.from({length:11},(_,i)=>`<path d="M${i*120} 0V1500"/>`).join('')}${Array.from({length:14},(_,i)=>`<path d="M0 ${i*120}H1200"/>`).join('')}</g>
    <text x="70" y="214" fill="#d69a6a" font-family="Arial,Helvetica,sans-serif" font-size="20" font-weight="700" letter-spacing="4">GOOGLE PAGESPEED INSIGHTS · 13 SEPTEMBER 2026</text>
    <text x="70" y="292" fill="#f5f7fa" font-family="Arial,Helvetica,sans-serif" font-size="58" font-weight="700">Built for every screen.</text>
    <text x="70" y="344" fill="#aebdca" font-family="Arial,Helvetica,sans-serif" font-size="23">A verified lab snapshot of the new live experience.</text>
    <rect x="56" y="410" width="520" height="1010" rx="42" fill="#02070c" opacity=".45"/>
    <rect x="76" y="430" width="480" height="970" rx="34" fill="#0b1016" stroke="#8399a8" stroke-opacity=".55" stroke-width="3"/>
    <g font-family="Arial,Helvetica,sans-serif">
      <g transform="translate(640 445)"><rect width="480" height="190" rx="26" fill="#fff" fill-opacity=".065" stroke="#fff" stroke-opacity=".14"/><circle cx="94" cy="94" r="54" fill="none" stroke="#17c86b" stroke-width="9"/><text x="94" y="108" text-anchor="middle" fill="#fff" font-size="42" font-weight="700">99</text><text x="180" y="84" fill="#fff" font-size="28" font-weight="700">Desktop</text><text x="180" y="121" fill="#aebdca" font-size="21">Performance</text></g>
      <g transform="translate(640 665)"><rect width="480" height="190" rx="26" fill="#fff" fill-opacity=".065" stroke="#fff" stroke-opacity=".14"/><circle cx="94" cy="94" r="54" fill="none" stroke="#17c86b" stroke-width="9"/><text x="94" y="108" text-anchor="middle" fill="#fff" font-size="42" font-weight="700">90</text><text x="180" y="84" fill="#fff" font-size="28" font-weight="700">Mobile</text><text x="180" y="121" fill="#aebdca" font-size="21">Performance</text></g>
      <g transform="translate(640 885)"><rect width="230" height="190" rx="26" fill="#fff" fill-opacity=".065" stroke="#fff" stroke-opacity=".14"/><text x="28" y="78" fill="#fff" font-size="48" font-weight="700">97</text><text x="28" y="123" fill="#aebdca" font-size="19">Accessibility</text></g>
      <g transform="translate(890 885)"><rect width="230" height="190" rx="26" fill="#fff" fill-opacity=".065" stroke="#fff" stroke-opacity=".14"/><text x="28" y="78" fill="#fff" font-size="48" font-weight="700">96</text><text x="28" y="120" fill="#aebdca" font-size="18">Best practices</text></g>
      <g transform="translate(640 1095)"><rect width="480" height="190" rx="26" fill="#fff" fill-opacity=".065" stroke="#fff" stroke-opacity=".14"/><text x="32" y="88" fill="#17c86b" font-size="64" font-weight="700">100</text><text x="190" y="82" fill="#fff" font-size="30" font-weight="700">SEO</text><text x="190" y="122" fill="#aebdca" font-size="20">Technical audit score</text></g>
      <text x="640" y="1360" fill="#8fa4b3" font-size="18">Lab scores can vary by run. No ranking or revenue guarantee.</text>
    </g>
  </svg>`);
  const image = await sharp(board)
    .composite([
      { input: logoPng, left: 70, top: 52 },
      { input: phoneCrop, left: 88, top: 458 },
    ])
    .webp({ quality: 86, effort: 6 })
    .toBuffer();
  await fs.promises.writeFile(path.join(output, 'mb-legacy-roofing-mobile-lead-page.webp'), image);
}

async function main() {
  fs.mkdirSync(output, { recursive: true });
  await Promise.all([buildCover(), buildDesktop(), buildArchitecture(), buildMobileEvidence()]);
  const expected = new Map([
    ['mb-legacy-roofing-london-case-study.webp', [1800, 1200]],
    ['mb-legacy-roofing-website-desktop.webp', [1800, 1200]],
    ['mb-legacy-roofing-local-seo-structure.webp', [1800, 1200]],
    ['mb-legacy-roofing-mobile-lead-page.webp', [1200, 1500]],
  ]);
  for (const [name, dimensions] of expected) {
    const metadata = await sharp(path.join(output, name)).metadata();
    const size = fs.statSync(path.join(output, name)).size;
    if (metadata.format !== 'webp' || metadata.width !== dimensions[0] || metadata.height !== dimensions[1]) {
      throw new Error(`${name} has unexpected output metadata`);
    }
    if (size >= 300 * 1024) throw new Error(`${name} exceeds the 300 KB image budget`);
    console.log(`${name}: ${metadata.width}x${metadata.height}, ${Math.round(size / 1024)} KB`);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
