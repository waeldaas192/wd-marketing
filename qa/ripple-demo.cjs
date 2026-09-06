/* Continuous, real-time recording of the production page. No paused timelines. */
const path=require('node:path');
const tools=process.env.QA_NODE_MODULES;
const {chromium}=require(tools?path.join(tools,'playwright'):'playwright');
(async()=>{
 const browser=await chromium.launch();
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference',recordVideo:{dir:'qa-results/ripple-demo',size:{width:1440,height:1000}}});
 const page=await context.newPage();
 try{
  await page.goto(process.env.QA_BASE_URL||'http://localhost:3000',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.documentElement.dataset.uiReady==='true');await page.evaluate(()=>document.fonts.ready);
  await page.mouse.move(140,300);
  for(let i=0;i<100;i++){
   const t=i/99;await page.mouse.move(140+410*t,300+90*Math.sin(t*Math.PI*2));await page.waitForTimeout(24);
  }
  await page.mouse.move(0,0);await page.waitForTimeout(10000);
  await page.screenshot({path:'qa-results/ripple-final-desktop.png'});
 }finally{
  const video=page.video();await context.close();
  if(video) await video.saveAs('qa-results/ripple-normal-playback.webm');
  await browser.close();
 }
})().catch(error=>{console.error(error);process.exitCode=1;});
