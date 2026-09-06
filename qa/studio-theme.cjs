/* The owner's 3D/glass reference is translated into actual HTML/CSS, not a mockup. */
const fs = require('node:fs');
const path = require('node:path');
const tools = process.env.QA_NODE_MODULES;
const { chromium } = require(tools ? path.join(tools,'playwright') : 'playwright');
const AxeBuilder = require(tools ? path.join(tools,'@axe-core/playwright') : '@axe-core/playwright').default;
const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const output = path.resolve('qa-results');
fs.mkdirSync(output,{recursive:true});
const report = {checks:[],accessibility:[],failures:[],notes:['Vector objects have simulated depth; they are decorative, not a WebGL scene.','Visual inspection is separate from automated accessibility testing.','No owner photograph, screenshot, font file or reference advertising graphic is added to the repository.']};
const check = (ok,name) => {report.checks.push({name,passed:!!ok}); if(!ok)report.failures.push(name);};
(async()=>{
 const browser=await chromium.launch();
 const context=await browser.newContext({reducedMotion:'reduce',viewport:{width:1440,height:1000}});
 const page=await context.newPage();
 page.on('pageerror',error=>report.failures.push(error.message));
 try {
  await page.goto(base,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.documentElement.dataset.uiReady==='true');
  await page.evaluate(()=>document.fonts.ready);
  check(await page.locator('[data-studio-page]').count()===1,'Homepage-scoped theme root exists');
  const sections=['standard','work','services','process','founder','insights','faq','contact'];
  for(const name of sections){
   const selector=`[data-studio-section="${name}"]`;
   const section=page.locator(selector);
   check(await section.count()===1,`${name}: exactly one themed section`);
   const colourSurface=name==='contact'?section.locator('[data-studio-cta-panel]'):section;
   check(await colourSurface.evaluate(el=>getComputedStyle(el).backgroundImage!=='none'),`${name}: actual gradient background`);
   await section.scrollIntoViewIfNeeded();
   const result=await new AxeBuilder({page}).include(selector).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
   report.accessibility.push({label:name,violations:result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),incomplete:result.incomplete.map(v=>v.id)});
   check(result.violations.length===0,`${name}: no violations in configured axe checks`);
  }
  check(await page.locator('[data-studio-section="services"] [data-studio-object]').count()===4,'Four service-specific vector sculptures');
  check(await page.locator('[data-studio-cta-scene] [data-studio-object="plane"]').count()===1,'Closing panel has the plane composition');
  check(await page.locator('.studio-object').evaluateAll(elements=>elements.every(el=>el.getAttribute('aria-hidden')==='true'&&getComputedStyle(el).pointerEvents==='none')),'Objects are decorative and do not intercept controls');
  const ids=await page.locator('.studio-object [id]').evaluateAll(elements=>elements.map(el=>el.id));
  check(ids.length===new Set(ids).size,'Sculpture filter/gradient IDs are unique');
  check(await page.locator('[data-studio-card]').evaluateAll(elements=>elements.every(el=>getComputedStyle(el).borderRadius==='24px')),'24px glass-card corners');
  check(await page.locator('[data-studio-section="process"] [data-step]').evaluateAll(elements=>elements.every(el=>getComputedStyle(el,'::before').display==='none')),'No coloured side stripes on process cards');
  check(await page.locator('header').evaluate(el=>!el.closest('[data-studio-page]')),'Header remains outside the homepage theme');
  check(await page.locator('[data-growth-engine]').getAttribute('data-transfer-ms')==='1800','Existing slow connection transfer is retained');
  for(const width of [320,390,680,768,1024,1440,1920]){
   await page.setViewportSize({width,height:1000});
   const box=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));
   check(box.scroll<=box.width+2,`Theme: no page overflow at ${width}px`);
   const columns=await page.locator('[data-studio-section="services"] [data-studio-grid]').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length);
   check(columns===(width<=680?1:2),`Service columns adapt at ${width}px`);
  }
  await page.setViewportSize({width:390,height:844});
  check(await page.locator('[data-studio-card]').first().evaluate(el=>getComputedStyle(el).backdropFilter==='none'),'Mobile glass uses the lightweight opaque fallback');
  await page.locator('[data-studio-section="faq"] summary').first().click();
  check(await page.locator('[data-studio-section="faq"] details').first().evaluate(el=>el.open),'Restyled native FAQ still opens');
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.getByRole('button',{name:'Pause motion',exact:true}).click();
  check(await page.locator('.studio-object-body').first().evaluate(el=>getComputedStyle(el).transitionDuration==='0s'),'Global motion pause removes decorative hover transitions');
  await page.goto(base+'/contact',{waitUntil:'domcontentloaded'});
  check(await page.locator('[data-studio-page]').count()===0,'Internal form route does not inherit homepage glass overrides');
  check(await page.locator('[data-project-wizard]').isVisible(),'Internal project brief remains available');
 }catch(error){report.failures.push(error.stack||error.message);}
 finally{await browser.close();fs.writeFileSync(path.join(output,'studio-theme-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.failures.length)process.exitCode=1;}
})();
