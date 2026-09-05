/* User-approved liquid-grid/pulse design, tested against the actual production route. */
const fs = require('node:fs');
const path = require('node:path');
const tools = process.env.QA_NODE_MODULES;
const { chromium } = require(tools ? path.join(tools,'playwright') : 'playwright');
const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const out = path.resolve('qa-results'); fs.mkdirSync(out,{recursive:true});
const report = {checks:[],failures:[],notes:['Actual Chromium rendering, not an image-generation mockup.','Viewport emulation is not a physical device audit.']};
function check(ok,name) { report.checks.push({name,passed:!!ok});if(!ok) report.failures.push(name); }
(async()=>{
  const browser = await chromium.launch();
  const context = await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference',recordVideo:{dir:path.join(out,'fluid-video'),size:{width:1440,height:1000}}});
  const page = await context.newPage(); page.setDefaultTimeout(18000);
  page.on('pageerror',err=>report.failures.push(err.message));
  try {
    await page.goto(base,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>document.documentElement.dataset.uiReady==='true');
    await page.evaluate(()=>document.fonts.ready);
    await page.mouse.move(0,0);
    const engine=page.locator('[data-growth-engine]');
    await page.waitForFunction(()=>document.querySelector('[data-growth-engine]').dataset.phase==='reading');
    const initial=await engine.getAttribute('data-selected');
    await page.waitForFunction(()=>document.querySelector('[data-growth-engine]').dataset.phase==='travelling');
    check(await engine.getAttribute('data-selected')===initial,'Description remains unchanged while pulse travels');
    check(await page.evaluate(()=>document.getAnimations().some(a=>a.id==='wd-journey-pulse')),'Pulse is a real animation');
    await page.screenshot({path:path.join(out,'fluid-pulse-in-flight.png')});
    await page.waitForFunction(()=>document.querySelector('[data-growth-engine]').dataset.selected==='1');
    check(await engine.getByRole('button',{name:'Traffic',exact:true}).getAttribute('aria-pressed')==='true','Next icon activates after pulse arrival');
    check(await engine.getByRole('region',{name:'Traffic',exact:true}).isVisible(),'Matching description opens after arrival');
    const dimensions=await engine.locator('[data-journey-detail]').evaluate(el=>{const s=getComputedStyle(el);return{radius:s.borderRadius,left:s.borderLeftWidth,right:s.borderRightWidth,height:el.getBoundingClientRect().height};});
    check(dimensions.radius==='24px'&&dimensions.left==='0px'&&dimensions.right==='0px','24px description with no coloured side border');
    await engine.hover();
    const hovered=await engine.getAttribute('data-selected');await page.waitForTimeout(6200);
    check(await engine.getAttribute('data-selected')===hovered,'Hover holds description for reading');
    await engine.getByRole('button',{name:'Revenue',exact:true}).click();
    const after=await engine.locator('[data-journey-detail]').evaluate(el=>el.getBoundingClientRect().height);
    check(Math.abs(after-dimensions.height)<1,'Description shell height remains stable across stages');
    check(await engine.getByRole('button',{name:'Play journey',exact:true}).isVisible(),'Manual selection stops auto rotation until explicitly resumed');
    await page.mouse.move(0,0); await page.waitForTimeout(6200);
    check(await engine.getAttribute('data-selected')==='4','Manual selection remains stable');
    const serviceTrigger=page.getByRole('button',{name:'Services',exact:true});
    check(await serviceTrigger.locator('svg').count()===1,'Services uses an aligned SVG chevron, not a font glyph');
    await serviceTrigger.click(); await page.screenshot({path:path.join(out,'fluid-desktop-menu.png')});await page.keyboard.press('Escape');
    await page.getByRole('button',{name:'Pause motion',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('[data-hero-atmosphere]').dataset.animate==='off');
    check(await engine.getAttribute('data-animate')==='off','Global pause stops the pulse scene');
    await page.screenshot({path:path.join(out,'fluid-hero-desktop.png')});
    await page.emulateMedia({reducedMotion:'reduce'});
    for(const width of [320,390,768,1280]) {
      await page.setViewportSize({width,height:1000});
      check(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2),`No page overflow at ${width}px`);
      if(width===390) await page.screenshot({path:path.join(out,'fluid-hero-mobile.png'),fullPage:false});
    }
    check(await page.locator('[data-hero-atmosphere] i').first().evaluate(el=>getComputedStyle(el).animationName==='none'),'System reduced motion removes atmospheric loops');
    check(await engine.locator('[data-journey-detail]').isVisible(),'Description available with motion disabled');
  } catch(error) {report.failures.push(error.stack||error.message);}
  finally { await context.close();await browser.close();fs.writeFileSync(path.join(out,'fluid-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.failures.length)process.exitCode=1; }
})();
