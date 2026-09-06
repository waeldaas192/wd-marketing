/* User-provided FAQ scroller integration, against the real production homepage. */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(path.join(process.env.QA_NODE_MODULES, 'playwright'));
const AxeBuilder = require(path.join(process.env.QA_NODE_MODULES, '@axe-core/playwright')).default;
const report = { checks: [], failures: [], accessibility: [], measurements: [], notes: ['Automated tests are not full WCAG certification or physical-device testing. No screenshots or video are produced by this suite.'] };
const check = (ok, name) => { report.checks.push({ name, passed: !!ok }); if (!ok) report.failures.push(name); };
const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const originals = '[data-faq-sequence]:not([data-faq-clone]) .faq-card';
async function ready(page) {
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.querySelector('[data-faq-section]')?.dataset.enhanced === 'true');
  await page.evaluate(() => document.fonts.ready);
}
const time = track => track.evaluate(el => el.getAnimations()[0]?.currentTime ?? -1);
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => report.failures.push(error.message));
  try {
    await ready(page);
    const faq = page.locator('[data-faq-section]'), rows = faq.locator('[data-faq-row]');
    check(await faq.count() === 1, 'One integrated FAQ section in the homepage');
    check(await rows.count() === 3, 'Three horizontal rows');
    check(await faq.getByRole('heading', { level: 2 }).count() === 1, 'One visible section heading');
    check(await faq.getByRole('article').count() === 6, 'Six accessible cards; cloned cards excluded');
    const text = await faq.locator(originals).allTextContents();
    check(text.some(t => t.includes('rankings or revenue')) && text.every(t => !/track a new habit|Team.*plan|7 days|streak/i.test(t)), 'Existing agency content, no habit-app or fabricated trial claims');
    check(await faq.locator('a[href="/contact"]').count() === 1, 'Contact destination preserved');
    check(await faq.locator('[data-faq-clone]').evaluateAll(els => els.every(el => el.inert && el.getAttribute('aria-hidden') === 'true')), 'Every visual repeat is inert and hidden from assistive technology');
    const expected = [['left', '60s'], ['right', '45s'], ['left', '70s']];
    for (let i = 0; i < 3; i++) {
      const row = rows.nth(i); await row.scrollIntoViewIfNeeded(); await page.mouse.move(0, 0);
      await page.waitForFunction(index => document.querySelectorAll('[data-faq-row]')[index].dataset.running === 'true', i);
      const track = row.locator('.faq-scroller-track');
      const measure = await row.evaluate(el => {
        const track = el.querySelector('.faq-scroller-track'), groups = [...el.querySelectorAll('[data-faq-loop-group]')];
        return { direction: el.dataset.direction, duration: getComputedStyle(track).animationDuration, animation: getComputedStyle(track).animationName, viewport: el.clientWidth, track: track.getBoundingClientRect().width, groups: groups.map(group => group.getBoundingClientRect().width) };
      });
      report.measurements.push(measure);
      check(measure.direction === expected[i][0] && measure.duration === expected[i][1], `Row ${i + 1} retains specified speed/direction`);
      check(measure.animation === (i === 1 ? 'scroll-horizontal-reverse' : 'scroll-horizontal'), `Row ${i + 1} has actual compiled Tailwind animation`);
      check(Math.abs(measure.groups[0] - measure.groups[1]) < 1 && Math.abs(measure.track / 2 - measure.groups[0]) < 1 && measure.groups[0] >= measure.viewport, `Row ${i + 1}: equal full-width halves for seamless loops`);
      const before = await track.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41);
      await page.waitForTimeout(200);
      const after = await track.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41);
      check(i === 1 ? after > before : after < before, `Row ${i + 1} moves in the correct direction`);
      await row.hover(); await page.waitForTimeout(50); const held = await time(track); await page.waitForTimeout(160);
      check(Math.abs((await time(track)) - held) < 2, `Row ${i + 1} pauses at its current position on hover`);
    }
    await faq.getByRole('button', { name: 'Pause FAQ scrolling', exact: true }).click();
    const row = rows.first(); await row.scrollIntoViewIfNeeded(); await page.mouse.move(0, 0);
    check(await rows.evaluateAll(els => els.every(el => getComputedStyle(el.querySelector('.faq-scroller-track')).animationPlayState === 'paused')), 'Explicit pause stops every row');
    const held = await time(row.locator('.faq-scroller-track')); await page.waitForTimeout(180);
    check(Math.abs((await time(row.locator('.faq-scroller-track'))) - held) < 2, 'Pause does not reset the loop');
    await faq.getByRole('button', { name: 'Resume FAQ scrolling', exact: true }).click();
    await row.scrollIntoViewIfNeeded(); await page.mouse.move(0, 0);
    await page.waitForFunction(() => document.querySelector('[data-faq-row]').dataset.running === 'true');
    check(true, 'Resume restores automatic scrolling');
    const all = faq.getByRole('button', { name: 'Read all questions', exact: true }); await all.focus(); await page.keyboard.press('Enter');
    check(await all.getAttribute('aria-pressed') === 'true', 'Keyboard activates Read all questions');
    check(await rows.evaluateAll(els => els.every(el => el.dataset.layout === 'static' && getComputedStyle(el.querySelector('.faq-scroller-track')).animationName === 'none')), 'Still reading mode removes all scrolling');
    check(await faq.locator(originals).evaluateAll(els => els.every(el => el.scrollWidth <= el.clientWidth + 1)), 'Every answer remains complete, without clipped text');
    check(await faq.getByRole('article').count() === 6, 'Read-all mode shows each question only once');
    let axe = await new AxeBuilder({ page }).include('[data-faq-section]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    report.accessibility.push({ label: 'still', violations: axe.violations }); check(axe.violations.length === 0, 'Still view: no detected axe violations');
    await all.click();
    for (const width of [320, 390, 640, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 }); await page.waitForTimeout(100);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 2), `${width}px: no page overflow`);
      check(await faq.locator(originals).evaluateAll(els => els.every(el => getComputedStyle(el).borderRadius === '24px')), `${width}px: existing 24px card design retained`);
    }
    await page.setViewportSize({ width: 1440, height: 1000 }); await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForFunction(() => [...document.querySelectorAll('[data-faq-row]')].every(el => el.dataset.running === 'false'));
    check(true, 'Offscreen FAQ loops are suspended');
    await page.getByRole('button', { name: 'Pause motion', exact: true }).click();
    await page.waitForFunction(() => [...document.querySelectorAll('[data-faq-row]')].every(el => el.dataset.layout === 'static'));
    check(await faq.getByRole('article').count() === 6, 'Global motion pause exposes all questions in a static layout');
    await page.getByRole('button', { name: 'Resume motion', exact: true }).click();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => [...document.querySelectorAll('[data-faq-row]')].every(el => el.dataset.layout === 'static'));
    check(await rows.evaluateAll(els => els.every(el => getComputedStyle(el.querySelector('.faq-scroller-track')).animationName === 'none')), 'System reduced motion has a static complete layout');
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    check(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 2), '200% root text: no horizontal page overflow');
    check(await faq.locator(originals).evaluateAll(els => els.every(el => el.scrollWidth <= el.clientWidth + 1)), '200% root text: full answers fit');
    await page.evaluate(() => document.documentElement.style.fontSize = '');
    const touch = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, reducedMotion: 'no-preference' });
    const mobile = await touch.newPage(); await ready(mobile);
    const mobileRow = mobile.locator('[data-faq-row]').first(); await mobileRow.scrollIntoViewIfNeeded();
    await mobile.waitForFunction(() => document.querySelector('[data-faq-row]').dataset.layout === 'manual');
    check(await mobileRow.evaluate(el => el.scrollWidth > el.clientWidth && getComputedStyle(el).overflowX === 'auto'), 'Touch view provides native swipe without forced autoplay');
    await mobileRow.evaluate(el => { el.scrollLeft = 100; });
    check(await mobileRow.evaluate(el => el.scrollLeft > 0), 'Mobile row really scrolls horizontally');
    await mobile.getByRole('button', { name: 'Read all questions', exact: true }).click();
    check(await mobile.locator('[data-faq-section]').getByRole('article').count() === 6, 'Touch reader can show all questions at once');
    axe = await new AxeBuilder({ page: mobile }).include('[data-faq-section]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    report.accessibility.push({ label: 'mobile', violations: axe.violations }); check(axe.violations.length === 0, 'Mobile view: no detected axe violations');
    await touch.close();
    const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const plain = await noJS.newPage(); await plain.goto(base, { waitUntil: 'domcontentloaded' });
    check(await plain.locator('[data-faq-section]').getByRole('article').count() === 6, 'All original FAQ answers present without JavaScript');
    check(await plain.locator('#faq-heading').evaluate(el => getComputedStyle(el).opacity === '1'), 'Heading is not left invisible awaiting an entrance animation');
    check(await plain.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 2), 'No-JavaScript mobile layout fits');
    await noJS.close();
  } catch (error) { report.failures.push(error.stack || error.message); }
  finally { await browser.close(); fs.mkdirSync('qa-results', { recursive: true }); fs.writeFileSync('qa-results/faq-scroller-report.json', JSON.stringify(report, null, 2)); console.log(JSON.stringify({ checks: report.checks.length, failures: report.failures }, null, 2)); if (report.failures.length) process.exitCode = 1; }
})();
