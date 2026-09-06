/* Real production-route layout audit; no screenshot or video deliverable. */
const fs = require('node:fs');
const path = require('node:path');
const tools = process.env.QA_NODE_MODULES;
const { chromium } = require(tools ? path.join(tools, 'playwright') : 'playwright');
const AxeBuilder = require(tools ? path.join(tools, '@axe-core/playwright') : '@axe-core/playwright').default;
const nodes = require(path.resolve('src/vendor/lucide/nodes.json'));
const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const report = { checks: [], measurements: [], failures: [], notes: ['Automated layout/axe checks are not full WCAG certification or physical-device testing.'] };
function check(ok, name) { report.checks.push({name, passed: !!ok}); if (!ok) report.failures.push(name); }
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', error => report.failures.push(error.message));
  try {
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.documentElement.dataset.uiReady === 'true');
    await page.evaluate(() => document.fonts.ready);
    const cards = page.locator('#services [data-studio-card]');
    const icons = cards.locator('[data-icon-library="lucide"]');
    check(await icons.count() === 4, 'Four original library icons in service cards');
    check((await icons.evaluateAll(els => els.map(el => el.dataset.iconName))).join(',') === 'panels-top-left,search,megaphone,workflow', 'Icons match each service, not generic floating ornaments');
    check((await cards.evaluateAll(els => els.map(el => el.getAttribute('href')))).join(',') === '/services/web-conversion,/services/seo,/services/paid-acquisition,/services/growth-infrastructure', 'All existing service destinations retained');
    check(await page.locator('.studio-object,[data-studio-object],[data-studio-cta-orb]').count() === 0, 'No former sculptures, satellites or pseudo-3D objects in page HTML');
    for (const icon of await page.locator('[data-icon-library="lucide"]').all()) {
      const name = await icon.getAttribute('data-icon-name');
      const actual = await icon.evaluate(el => [...el.children].map(child => [child.tagName.toLowerCase(), Object.fromEntries([...child.attributes].map(a => [a.name, a.value]))]));
      check(JSON.stringify(actual) === JSON.stringify(nodes[name]), `Rendered ${name} is exact original Lucide geometry`);
    }
    for (const width of [320, 390, 680, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      const data = await cards.evaluateAll(els => els.map(el => {
        const frame = el.querySelector('[data-service-icon]');
        const svg = frame.querySelector('svg');
        const heading = el.querySelector('h3');
        const top = el.querySelector('[data-studio-service-top]');
        const f = frame.getBoundingClientRect(), i = svg.getBoundingClientRect(), h = heading.getBoundingClientRect();
        return { width: f.width, height: f.height, glyph: i.width, glyphHeight: i.height, stroke: svg.getAttribute('stroke-width'), viewBox: svg.getAttribute('viewBox'), left: Math.abs(f.left - h.left), cx: Math.abs(f.left + f.width/2 - i.left - i.width/2), cy: Math.abs(f.top + f.height/2 - i.top - i.height/2), headingGap: h.top - f.bottom, topHeight: top.getBoundingClientRect().height, transform: getComputedStyle(svg).transform, hidden: svg.getAttribute('aria-hidden'), pointer: getComputedStyle(svg).pointerEvents };
      }));
      report.measurements.push({ width, cards: data });
      check(data.every(d => d.width === 56 && d.height === 56 && d.glyph === 32 && d.glyphHeight === 32), `${width}: all four fixed-size aligned icon frames`);
      check(data.every(d => d.left < 1 && d.cx < 1 && d.cy < 1 && d.headingGap >= 20 && d.headingGap <= 26 && d.topHeight <= 60), `${width}: icons aligned with heading, no large floating-art gap`);
      check(data.every(d => d.stroke === '1.75' && d.viewBox === '0 0 24 24' && d.transform === 'none'), `${width}: matching weight, grid and stable orientation`);
      check(data.every(d => d.hidden === 'true' && d.pointer === 'none'), `${width}: decorative icons do not steal focus or clicks`);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 2), `${width}: no horizontal overflow`);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await cards.first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    const box = await icons.first().boundingBox();
    await cards.first().hover(); await page.waitForTimeout(250);
    const after = await icons.first().boundingBox();
    check(Math.abs(after.x-box.x)<1 && Math.abs(after.y-box.y)<1, 'Service glyph remains seated on hover instead of floating/rotating');
    check(await icons.evaluateAll(els => els.every(el => el.getAnimations({subtree:true}).length===0)), 'No looping icon bounce or rotation');
    await cards.first().focus();
    check(await cards.first().evaluate(el => el===document.activeElement && getComputedStyle(el).outlineStyle!=='none'), 'Keyboard link focus remains visible');
    await page.getByRole('button', { name: 'Pause motion', exact: true }).click();
    check(await page.locator('.library-icon-frame').first().evaluate(el => getComputedStyle(el).transitionDuration==='0s'), 'Global pause disables icon colour transitions');
    await page.setViewportSize({ width: 1280, height: 1000 });
    await page.evaluate(() => document.documentElement.style.fontSize='200%');
    check(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth+2), 'Enlarged root text still fits beside library icons');
    await page.evaluate(() => document.documentElement.style.fontSize='');
    const axe = await new AxeBuilder({ page }).include('#services').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    report.accessibility = axe.violations;
    check(axe.violations.length===0, 'No detected accessibility violations in service cards');
    const noJS = await browser.newContext({ javaScriptEnabled: false, viewport:{width:1280,height:900} });
    const plain = await noJS.newPage(); await plain.goto(base,{waitUntil:'domcontentloaded'});
    check(await plain.locator('#services [data-icon-library="lucide"]').count()===4, 'Library icons are in server HTML; no CDN script or JavaScript required');
    await noJS.close();
  } catch (error) { report.failures.push(error.stack || error.message); }
  finally {
    await browser.close(); fs.mkdirSync('qa-results',{recursive:true});
    fs.writeFileSync('qa-results/library-icons-report.json',JSON.stringify(report,null,2));
    console.log(JSON.stringify({checks:report.checks.length,failures:report.failures},null,2));
    if(report.failures.length) process.exitCode=1;
  }
})();
