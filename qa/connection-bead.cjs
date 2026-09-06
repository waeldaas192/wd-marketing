/* Production DOM/animation checks only. No screenshots, videos, emails or user data. */
const fs = require('node:fs');
const path = require('node:path');
const tools = process.env.QA_NODE_MODULES;
const { chromium } = require(tools ? path.join(tools, 'playwright') : 'playwright');
const out = path.resolve('qa-results');
const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const report = { checks: [], failures: [], samples: [], notes: ['Programmatic Chromium checks, not physical-device or full accessibility certification.', 'No screenshots or video are captured by this test.'] };
function check(ok, name) { report.checks.push({ name, passed: !!ok }); if (!ok) report.failures.push(name); }
async function ready(page) {
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.documentElement.dataset.uiReady === 'true' && document.querySelector('[data-connection-signal]')?.dataset.ready === 'true');
  await page.evaluate(() => document.fonts.ready);
}
async function visibleBead(page) {
  return page.locator('[data-connection-marker]').evaluate(el => {
    const circle = el.querySelectorAll('circle')[1];
    const r = circle.getBoundingClientRect();
    let shown = r.width >= 7 && r.height >= 7;
    for (let node = circle; node && node !== document.body; node = node.parentElement) {
      const s = getComputedStyle(node);
      if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) < .8) shown = false;
    }
    return { shown, width: r.width, height: r.height, fill: getComputedStyle(circle).fill };
  });
}
async function normalTrace(page, ms) {
  return page.evaluate(ms => new Promise(resolve => {
    const start = performance.now(), samples = [];
    const sample = now => {
      const engine = document.querySelector('[data-growth-engine]');
      const marker = engine.querySelector('[data-connection-marker]');
      const circle = marker.querySelectorAll('circle')[1];
      const r = circle.getBoundingClientRect();
      let visible = r.width >= 7 && r.height >= 7;
      for (let n = circle; n && n !== document.body; n = n.parentElement) {
        const s = getComputedStyle(n);
        if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) < .8) visible = false;
      }
      samples.push({ t: Math.round(now-start), selected: engine.dataset.selected, phase: engine.dataset.phase,
        x: r.x, y: r.y, width: r.width, visible });
      if (now-start < ms) requestAnimationFrame(sample); else resolve(samples);
    };
    requestAnimationFrame(sample);
  }), ms);
}
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
  const page = await context.newPage(); page.setDefaultTimeout(20000);
  page.on('pageerror', e => report.failures.push(e.message));
  try {
    await ready(page); await page.mouse.move(0, 0);
    const engine = page.locator('[data-growth-engine]');
    check((await visibleBead(page)).shown, 'Connection has a solid visible bead before the first transition');
    check(await engine.getAttribute('data-transfer-ms') === '1800', 'Transfer is deliberately slower: 1800ms');
    check(await engine.getAttribute('data-dwell-ms') === '900', 'No multi-second empty wait: 900ms docked interval');
    const trace = await normalTrace(page, 15600); report.samples = trace;
    check(trace.length > 100 && trace.every(s => s.visible), 'Bead remains visible in every sampled frame across a complete cycle');
    check(new Set(trace.map(s => s.selected)).size === 5, 'All five icon destinations receive the connection during normal playback');
    check(trace.filter(s => s.phase === 'reading').every(s => s.visible), 'Point remains visible while docked instead of disappearing between transfers');
    check(trace.some((s,i) => i && s.phase === 'travelling' && Math.hypot(s.x-trace[i-1].x,s.y-trace[i-1].y) > .1), 'Visible point actually moves, not just a stationary availability indicator');

    await page.waitForFunction(() => document.querySelector('[data-growth-engine]').dataset.phase === 'travelling');
    const old = await engine.getAttribute('data-selected');
    const flight = await page.evaluate(() => {
      const a = document.getAnimations().find(a => a.id === 'wd-journey-pulse');
      const related = document.getAnimations().filter(a => /^wd-(journey-pulse|connection-core|connection-stretch|liquid|icon-attraction)/.test(a.id));
      related.forEach(a => { a.pause(); a.currentTime = Number(a.effect.getTiming().duration) * .86; });
      const target = document.querySelector('[data-stage-icon][data-receiving="true"]');
      return { duration: a.effect.getTiming().duration, frames: a.effect.getKeyframes(), targetTransform: getComputedStyle(target).transform };
    });
    check([1800,2600].includes(flight.duration) && flight.frames.every(f => Number(f.opacity) === 1), 'The flight path never fades the travelling point to zero');
    const matrix = flight.targetTransform.match(/matrix\(([^)]+)\)/)?.[1].split(',').map(Number);
    check(matrix && Math.abs(matrix[0]-1) > .02 && Math.hypot(matrix[4],matrix[5]) > 2, 'Receiver visibly leans toward the approaching connection');
    check(await engine.getAttribute('data-selected') === old, 'The outgoing description is retained until real arrival');
    await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'paused' && /^wd-/.test(a.id)).forEach(a => a.play()));
    await page.waitForFunction(old => document.querySelector('[data-growth-engine]').dataset.selected !== old, old);
    const arrival = await page.evaluate(() => {
      const all = document.getAnimations();
      const settle = all.find(a => a.id === 'wd-icon-settle');
      return { settle: settle?.effect.getKeyframes().map(f => ({ sx: new DOMMatrix(f.transform).a, sy: new DOMMatrix(f.transform).d })),
        duration: settle?.effect.getTiming().duration, glyph: all.some(a => a.id === 'wd-icon-glyph'),
        parts: all.filter(a => a.id.startsWith('wd-icon-part-')).length,
        contraction: all.some(a => a.id === 'wd-connection-settle') };
    });
    check(arrival.settle?.some(f => f.sx < .97) && arrival.duration === 460, 'Arrival compresses the receiver then settles within 460ms');
    check(arrival.contraction && arrival.glyph && arrival.parts > 0, 'Bead contraction and internal icon motion are actual independent animations');
    await page.waitForTimeout(650);
    check(await page.evaluate(() => !document.getAnimations().some(a => /^wd-icon-(settle|glyph|part)/.test(a.id) && a.playState === 'running')), 'The icon rests firmly after arrival without a looping wobble');
    check((await visibleBead(page)).shown, 'Settled connection is still visible after the glyph animation ends');

    await engine.hover();
    const held = await engine.getAttribute('data-selected'); await page.waitForTimeout(2000);
    check(held === await engine.getAttribute('data-selected') && (await visibleBead(page)).shown, 'Hover preserves a readable stage and a visible stationary point');
    for (const name of ['Search','Traffic','Experience','Enquiry','Revenue']) {
      await engine.getByRole('button', { name, exact:true }).click();
      check(await engine.getByRole('region',{name,exact:true}).isVisible() && (await visibleBead(page)).shown, `Manual ${name} selection retains description and connection`);
    }
    await page.getByRole('button',{name:'Pause motion',exact:true}).click();
    await page.waitForTimeout(100);
    check(!await page.evaluate(() => document.getAnimations().some(a => /^wd-(connection|icon-|journey-pulse)/.test(a.id) && a.playState === 'running')), 'Global pause removes all new movement work');
    check((await visibleBead(page)).shown, 'Global pause leaves the static connection visible');
    await page.getByRole('button',{name:'Resume motion',exact:true}).click();
    await page.emulateMedia({reducedMotion:'reduce'});
    await engine.getByRole('button',{name:'Experience',exact:true}).click();
    check(!await page.evaluate(() => document.getAnimations().some(a => /^wd-(connection|icon-|journey-pulse)/.test(a.id))) && (await visibleBead(page)).shown, 'System reduced motion keeps a static bead and creates no new icon/pulse animations');

    const mobile = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'no-preference'});
    const mp = await mobile.newPage(); mp.on('pageerror',e=>report.failures.push(e.message)); await ready(mp);
    await mp.locator('[data-growth-engine]').scrollIntoViewIfNeeded();
    const mt = await normalTrace(mp,6500);
    check(mt.every(s=>s.visible) && new Set(mt.map(s=>s.selected)).size >= 2, 'Vertical mobile rail has continuous visible travel and arrival');
    check(await mp.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2),'New marker introduces no mobile horizontal overflow');
    await mobile.close();
  } catch (e) { report.failures.push(e.stack || e.message); }
  finally {
    await context.close(); await browser.close(); fs.mkdirSync(out,{recursive:true});
    fs.writeFileSync(path.join(out,'connection-bead-report.json'), JSON.stringify(report,null,2));
    console.log(JSON.stringify({checks:report.checks,failures:report.failures},null,2)); if(report.failures.length)process.exitCode=1;
  }
})();
