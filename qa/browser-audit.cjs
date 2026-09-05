/* Production-browser regression audit. No user data and no external form delivery. */
const fs = require('node:fs');
const path = require('node:path');
const tools = process.env.QA_NODE_MODULES;
const { chromium } = require(tools ? path.join(tools, 'playwright') : 'playwright');
const AxeBuilder = require(tools ? path.join(tools, '@axe-core/playwright') : '@axe-core/playwright').default;
const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const out = path.resolve('qa-results');
fs.mkdirSync(out, { recursive: true });
const report = { generatedAt: new Date().toISOString(), viewports: [], accessibility: [], routes: [], interactions: [], failures: [], notes: ['Automated checks are not complete WCAG conformance.', 'Root-text enlargement is not browser zoom.', 'No Lighthouse or field Core Web Vitals score is claimed.'] };
const check = (condition, message) => { if (!condition) report.failures.push(message); };
async function ready(page, route='/') {
  // Prefetch and lazy-image requests need not be idle for the UI to be ready.
  // Wait for the actual document, main heading and font layout instead.
  const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.locator('main h1').waitFor({state:'visible'});
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  return response;
}
async function layout(page, label, scale=1) {
  const data = await page.evaluate(() => {
    const visible = el => !!el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden';
    const width = document.documentElement.clientWidth;
    const overflow = [...document.querySelectorAll('body *')].filter(el => visible(el) && !el.closest('.site-squares') && !el.classList.contains('skip-link')).filter(el => { const r=el.getBoundingClientRect(); return r.width && (r.right > width + 2 || r.left < -2); }).slice(0,15).map(el => ({tag:el.tagName,cls:el.className,text:el.textContent.slice(0,80)}));
    const headings = [...document.querySelectorAll('main h1,main h2,main h3')].filter(visible).map(el => { const s=getComputedStyle(el); return {level:el.tagName,text:el.textContent,fontSize:parseFloat(s.fontSize),lineHeight:parseFloat(s.lineHeight),width:el.clientWidth,scrollWidth:el.scrollWidth}; });
    const small = [...document.querySelectorAll('main p,main small,main strong,main li,header button,header a,footer a')].filter(visible).map(el => ({text:el.textContent.slice(0,70),size:parseFloat(getComputedStyle(el).fontSize)})).filter(item => item.size < 11.9);
    return {width,scrollWidth:document.documentElement.scrollWidth,overflow,headings,small,bodyFont:getComputedStyle(document.body).fontFamily};
  });
  check(data.scrollWidth <= data.width + 2, `${label}: horizontal page overflow`);
  check(data.overflow.length === 0, `${label}: element overflow ${JSON.stringify(data.overflow)}`);
  check(data.small.length === 0, `${label}: labels smaller than 12px`);
  check(/Inter/i.test(data.bodyFont), `${label}: Inter not applied`);
  for (const h of data.headings) {
    check(h.scrollWidth <= h.width + 2, `${label}: clipped heading: ${h.text}`);
    const max = h.level==='H1' ? 72 : h.level==='H2' ? 48 : 36;
    check(h.fontSize <= max*scale + 1, `${label}: oversized ${h.level}: ${h.text}`);
    check(h.lineHeight >= h.fontSize, `${label}: compressed heading line-height: ${h.text}`);
  }
  return data;
}
async function axe(page,label) {
  const result = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
  const violations = result.violations.map(v => ({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n => ({target:n.target,summary:n.failureSummary}))}));
  report.accessibility.push({label,violations,incomplete:result.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});
  check(violations.length === 0, `${label}: accessibility violations ${violations.map(v=>v.id).join(', ')}`);
}
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({reducedMotion:'reduce'});
  const page = await context.newPage();
  page.on('pageerror', error => report.failures.push(`Browser runtime error: ${error.message}`));
  page.setDefaultTimeout(15000);
  try {
    for (const width of [320,360,390,430,640,768,1024,1280,1440,1920]) {
      await page.setViewportSize({width,height:900});
      await ready(page);
      await page.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=700) { window.scrollTo(0,y); await new Promise(r=>setTimeout(r,30)); } window.scrollTo(0,0); });
      await page.waitForTimeout(150);
      report.viewports.push({label:`home-${width}`, ...await layout(page,`home-${width}`)});
      await page.screenshot({path:path.join(out,`home-${width}.png`),fullPage:true});
      if (width===390 || width===1440) await axe(page,`home-${width}`);
    }
    await page.setViewportSize({width:1440,height:1000}); await ready(page);
    for (const id of ['standard','services','process','about']) {
      const el = page.locator(`#${id}`); await el.scrollIntoViewIfNeeded();
      await el.screenshot({path:path.join(out,`${id}-1440.png`)});
    }
    await page.evaluate(() => window.scrollTo(0,0));
    const trigger=page.getByRole('button',{name:'Services',exact:true});
    await trigger.focus(); await page.keyboard.press('Enter');
    check(await page.locator('#services-menu').isVisible(), 'Desktop services disclosure did not open');
    await axe(page,'desktop-mega-open');
    await page.screenshot({path:path.join(out,'desktop-menu.png')});
    await page.keyboard.press('Escape');
    check(!await page.locator('#services-menu').isVisible(),'Escape did not close mega menu');
    check(await trigger.evaluate(el=>el===document.activeElement),'Escape did not restore trigger focus');
    await trigger.focus(); await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    check(await page.locator('#services-menu').evaluate(el=>el.contains(document.activeElement)),'ArrowDown did not move focus into services');
    await page.keyboard.press('Escape'); report.interactions.push('Desktop disclosure: Enter, ArrowDown, Escape, focus restore');
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.getByRole('button',{name:'Pause motion',exact:true}).click();
    check(await page.evaluate(()=>document.documentElement.dataset.motion==='paused'),'Motion pause control failed');
    check(await page.locator('.site-squares i').first().evaluate(el=>getComputedStyle(el).animationPlayState==='paused'),'Decorative motion not paused');
    await page.getByRole('button',{name:'Resume motion',exact:true}).click();
    await page.emulateMedia({reducedMotion:'reduce'});
    check(await page.locator('.site-squares i').first().evaluate(el=>getComputedStyle(el).animationName==='none'),'Reduced motion ignored');
    report.interactions.push('Pause / resume and prefers-reduced-motion');
    await page.setViewportSize({width:390,height:844}); await ready(page);
    await page.getByRole('button',{name:'Open menu',exact:true}).click();
    check(await page.locator('#mobile-navigation').evaluate(el=>el.open),'Mobile dialog did not open');
    await axe(page,'mobile-menu-open'); await page.screenshot({path:path.join(out,'mobile-menu.png')});
    await page.keyboard.press('Escape');
    check(!await page.locator('#mobile-navigation').evaluate(el=>el.open),'Escape did not close mobile dialog');
    check(await page.evaluate(()=>document.body.style.overflow!=='hidden'),'Body scrolling remained locked');
    report.interactions.push('Native mobile dialog: open, Escape, scroll unlock');
    await page.setViewportSize({width:1280,height:1000}); await ready(page);
    await page.evaluate(()=>document.documentElement.style.fontSize='200%');
    report.viewports.push({label:'home-text-200',...await layout(page,'home-text-200',2)});
    await page.screenshot({path:path.join(out,'home-text-200.png'),fullPage:true});
    await page.evaluate(()=>document.documentElement.style.fontSize='');
    const xml=await (await context.request.get(base+'/sitemap.xml')).text();
    const routes=[...new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname))];
    check(routes.length>=11,'Sitemap is incomplete');
    await page.setViewportSize({width:1280,height:900});
    for (const route of routes) {
      const response=await ready(page,route);
      const item={route,status:response.status(),title:await page.title(),description:await page.locator('meta[name="description"]').getAttribute('content'),h1:await page.locator('main h1').count(),canonical:await page.locator('link[rel="canonical"]').count()};
      report.routes.push(item); check(item.status===200,`${route}: not HTTP 200`);check(item.title.length>0,`${route}: missing title`);check(!!item.description,`${route}: missing description`);check(item.h1===1,`${route}: needs exactly one main H1`);
      check(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2),`${route}: desktop overflow`);
    }
    for (const route of ['/services/web-conversion','/work','/about','/insights','/contact']) {
      await page.setViewportSize({width:390,height:844}); await ready(page,route);
      await axe(page,`route-${route}`);
      check(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2),`${route}: mobile overflow`);
    }
    const invalid=await context.request.post(base+'/api/contact',{data:{}});
    check(invalid.status()===400,'Invalid contact brief not rejected');
    const valid=await context.request.post(base+'/api/contact',{data:{name:'UI Audit',email:'audit@example.com',service:'SEO',budget:'Not sure',message:'Automated launch-gate test. Do not send.'}});
    check(valid.status()===503,'Unconfigured contact endpoint must not claim successful delivery');
    report.interactions.push('Contact endpoint validation / truthful unconfigured-delivery gate');
  } catch(error) { report.failures.push(error.stack || error.message); }
  finally { await browser.close(); fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2)); console.log(JSON.stringify({viewports:report.viewports.length,routes:report.routes.length,accessibilityScans:report.accessibility.length,failures:report.failures},null,2)); if(report.failures.length) process.exitCode=1; }
})();
