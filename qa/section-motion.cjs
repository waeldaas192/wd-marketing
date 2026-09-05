/* Supplemental checks for real section animation; no customer data or provider calls. */
const fs=require('node:fs'),path=require('node:path');
const tools=process.env.QA_NODE_MODULES;
const {chromium}=require(tools?path.join(tools,'playwright'):'playwright');
const out=path.resolve('qa-results');fs.mkdirSync(out,{recursive:true});
const base=process.env.QA_BASE_URL||'http://localhost:3000';
const report={checks:[],failures:[],notes:['Automated browser checks, not physical-device/assistive-technology certification or field performance metrics.']};
const check=(ok,label)=>{report.checks.push({label,passed:!!ok});if(!ok)report.failures.push(label);};
async function ready(page){await page.goto(base,{waitUntil:'domcontentloaded'});await page.locator('main h1').waitFor({state:'visible'});await page.waitForFunction(()=>document.documentElement.dataset.uiReady==='true');await page.evaluate(()=>document.fonts.ready);}
async function scroll(page,id){await page.evaluate(id=>document.getElementById(id).scrollIntoView({behavior:'instant',block:'start'}),id);}
(async()=>{
 const browser=await chromium.launch();
 try {
  const context=await browser.newContext({viewport:{width:1280,height:800},reducedMotion:'no-preference',recordVideo:{dir:path.join(out,'section-motion-video'),size:{width:1280,height:800}}});
  const page=await context.newPage();page.on('pageerror',e=>report.failures.push(e.message));
  await ready(page);
  check(await page.locator('[data-reveal]').count()>=10,'Headings and content cards are wired to one reveal system');
  await scroll(page,'work');
  await page.waitForFunction(()=>document.getAnimations().some(a=>a.id==='wd-section-reveal'&&a.playState==='running'),undefined,{timeout:5000});
  check(true,'Actual Web Animations run when project section enters view');
  await page.locator('#work article').first().locator('a').first().focus();
  check(await page.locator('#work article').first().evaluate(el=>!el.getAnimations().some(a=>a.id==='wd-section-reveal'&&a.playState==='running')),'Keyboard focus removes movement from the focused project card');
  await scroll(page,'services');
  await page.waitForFunction(()=>document.getAnimations().some(a=>a.id==='wd-section-reveal'&&a.playState==='running'),undefined,{timeout:5000});
  await page.getByRole('button',{name:'Pause motion',exact:true}).click();
  await page.waitForFunction(()=>!document.getAnimations().some(a=>a.id==='wd-section-reveal'&&a.playState==='running'));
  check(await page.locator('[data-reveal]').evaluateAll(items=>items.every(el=>getComputedStyle(el).opacity==='1')),'Pause leaves all copy at full contrast');
  await page.getByRole('button',{name:'Resume motion',exact:true}).click();
  for(const id of ['process','about','insights','contact']){
   if(await page.locator('#'+id).count()){await scroll(page,id);await page.waitForTimeout(900);}
  }
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>!document.getAnimations().some(a=>a.id==='wd-section-reveal'&&a.playState==='running'));
  check(true,'System reduction disables active section animations');
  await scroll(page,'work');await page.waitForTimeout(200);
  await page.screenshot({path:path.join(out,'section-motion-work.png')});
  await context.close();

  const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:1440,height:900}});const fallback=await noJS.newPage();
  await fallback.goto(base,{waitUntil:'domcontentloaded'});
  check(await fallback.locator('main h1').isVisible(),'Hero is visible without JavaScript');
  check(await fallback.locator('[data-reveal]').evaluateAll(items=>items.every(el=>getComputedStyle(el).opacity==='1'&&getComputedStyle(el).visibility!=='hidden')),'All reveal content remains visible without JavaScript');
  await noJS.close();
 }catch(error){report.failures.push(error.stack||error.message);}
 finally {await browser.close();fs.writeFileSync(path.join(out,'section-motion-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(report.failures.length)process.exitCode=1;}
})();
