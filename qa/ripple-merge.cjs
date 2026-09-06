/* Actual production-route geometry and interaction checks; no image-generation assets. */
const fs = require('node:fs');
const path = require('node:path');
const tools = process.env.QA_NODE_MODULES;
const { chromium } = require(tools ? path.join(tools,'playwright') : 'playwright');
const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const out = path.resolve('qa-results'); fs.mkdirSync(out,{recursive:true});
const report = { checks:[], failures:[], notes:['Chromium, not a physical-device or full WCAG audit.','Intermediate screenshot checks pause real browser animations at the measured midpoint; the recorded demo uses normal playback.'] };
const check=(condition,name)=>{report.checks.push({name,passed:!!condition});if(!condition)report.failures.push(name);};
async function ready(page){await page.goto(base,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>document.documentElement.dataset.uiReady==='true');await page.evaluate(()=>document.fonts.ready);}
(async()=>{
 const browser=await chromium.launch();
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
 const page=await context.newPage();page.setDefaultTimeout(15000);page.on('pageerror',e=>report.failures.push(e.message));
 try {
  await ready(page);
  const engine=page.locator('[data-growth-engine]');
  await page.waitForFunction(()=>document.querySelector('[data-hero-atmosphere]').dataset.gridReady==='true');
  const original=await page.locator('[data-ripple-grid]').evaluate(c=>c.toDataURL());
  await page.mouse.move(140,290);await page.mouse.move(490,365,{steps:22});
  await page.waitForFunction(()=>Number(document.querySelector('[data-ripple-grid]').dataset.displacement)>2);
  const warped=await page.locator('[data-ripple-grid]').evaluate(c=>({pixels:c.toDataURL(),displacement:Number(c.dataset.displacement),pixelsCount:c.width*c.height}));
  check(warped.pixels!==original,'Pointer changes the drawn grid pixels, not just a CSS glow');
  check(warped.displacement>2&&warped.displacement<26,'Grid has measurable bounded line displacement');
  check(warped.pixelsCount<=3010000,'Canvas backing store is capped near three million pixels');
  await page.screenshot({path:path.join(out,'ripple-grid-desktop.png')});
  await page.mouse.move(0,0);
  await page.waitForFunction(()=>document.querySelector('[data-ripple-grid]').dataset.rippleState==='idle');
  check(true,'Pointer departure settles and stops the requestAnimationFrame loop');
  await page.waitForFunction(()=>document.querySelector('[data-growth-engine]').dataset.phase==='reading');
  const before=await engine.getAttribute('data-selected');
  await page.waitForFunction(()=>document.querySelector('[data-growth-engine]').dataset.phase==='travelling');
  const pulse=await page.evaluate(()=>{const a=document.getAnimations().find(a=>a.id==='wd-journey-pulse');return a?{duration:a.effect.getTiming().duration,frames:a.effect.getKeyframes().length}:null;});
  check((pulse?.duration===1800||pulse?.duration===2600)&&pulse.frames>=30,'Slower transfer lasts 1800ms (2600ms return) with a smooth sampled magnetic path');
  check(await engine.getAttribute('data-selected')===before,'Outgoing description remains active until absorption completes');
  check(await engine.locator('feGaussianBlur').count()===1&&await engine.locator('feColorMatrix').count()===1,'Liquid connection uses a blur/alpha-threshold surface filter');
  check(await page.evaluate(()=>document.getAnimations().some(a=>a.id==='wd-icon-attraction')&&document.getAnimations().some(a=>a.id==='wd-liquid-stretch')),'Receiving icon attraction and droplet elongation actually animate');
  await page.waitForFunction(old=>document.querySelector('[data-growth-engine]').dataset.selected!==old,before);
  const movement=await page.evaluate(()=>{
    const anims=document.getAnimations().filter(a=>a.id.startsWith('wd-description-'));
    anims.forEach(a=>{a.pause();a.currentTime=280;});
    return anims.map(a=>({id:a.id,x:new DOMMatrix(getComputedStyle(a.effect.target).transform).m41,hidden:a.effect.target.getAttribute('aria-hidden'),inert:a.effect.target.inert}));
  });
  check(movement.some(a=>a.id==='wd-description-exit'&&a.x<0&&a.hidden==='true'&&a.inert),'Outgoing slide travels left and cannot receive focus');
  check(movement.some(a=>a.id==='wd-description-enter'&&a.x>0&&!a.inert),'Incoming slide travels from the right');
  check(await engine.getByRole('region').getByRole('link').count()===1,'Only one slide link is accessible while slides overlap');
  await page.screenshot({path:path.join(out,'description-slider-midpoint.png')});
  await page.evaluate(()=>document.getAnimations().filter(a=>a.id.startsWith('wd-description-')).forEach(a=>a.play()));
  await page.waitForTimeout(650);
  await engine.getByRole('button',{name:'Revenue',exact:true}).click();
  const height=await engine.locator('[data-journey-detail]').evaluate(el=>el.getBoundingClientRect().height);
  for(const name of ['Traffic','Search','Enquiry']) {await engine.getByRole('button',{name,exact:true}).click();await page.waitForTimeout(50);}
  await page.waitForTimeout(650);
  check(await engine.getAttribute('data-selected')==='3'&&await engine.locator('[data-exiting]').count()===0,'Rapid manual selection cancels stale transitions and settles on the last request');
  check(Math.abs(await engine.locator('[data-journey-detail]').evaluate(el=>el.getBoundingClientRect().height)-height)<1,'Description shell height stays fixed across all stacked slides');
  await engine.getByRole('button',{name:'Traffic',exact:true}).click();
  await page.getByRole('button',{name:'Pause motion',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('[data-hero-atmosphere]').dataset.gridReady!=='true');
  check(!await page.evaluate(()=>document.getAnimations().some(a=>a.playState==='running'&&/^wd-(description|journey|liquid|icon)/.test(a.id))),'Global pause cancels pulse, merge and slide work');
  await page.getByRole('button',{name:'Resume motion',exact:true}).click();
  await page.emulateMedia({reducedMotion:'reduce'});
  await engine.getByRole('button',{name:'Experience',exact:true}).click();
  check(await engine.getByRole('region',{name:'Experience',exact:true}).isVisible(),'Reduced motion leaves descriptions immediately usable');
  check(!await page.evaluate(()=>document.getAnimations().some(a=>a.id.startsWith('wd-description-'))),'Reduced motion creates no slide animations');
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'no-preference'});
  const mp=await mobile.newPage();await ready(mp);
  check(await mp.locator('[data-hero-atmosphere]').getAttribute('data-grid-ready')!=='true','Touch-only devices use the light CSS grid, not mouse physics');
  await mp.locator('[data-growth-engine]').scrollIntoViewIfNeeded();
  await mp.getByRole('button',{name:'Revenue',exact:true}).click();await mp.waitForTimeout(650);
  check(await mp.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+2),'Mobile slider has no horizontal page overflow');
  await mp.screenshot({path:path.join(out,'ripple-mobile.png')});await mobile.close();
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:1280,height:900}});
  const np=await nojs.newPage();await np.goto(base);
  check(await np.locator('h1').isVisible()&&await np.getByRole('region',{name:'Search',exact:true}).isVisible(),'Hero and initial description remain visible without JavaScript');
  await nojs.close();
 }catch(e){report.failures.push(e.stack||e.message);}
 finally{await context.close();await browser.close();fs.writeFileSync(path.join(out,'ripple-merge-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.failures.length)process.exitCode=1;}
})();
