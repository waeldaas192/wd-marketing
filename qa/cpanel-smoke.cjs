"use strict";
const { spawn } = require("node:child_process");
const { once } = require("node:events");
const fs = require("node:fs");
const { setTimeout: wait } = require("node:timers/promises");
const assert = require("node:assert/strict");
(async () => {
  const report={checks:[],failures:[],scope:"Real production Next.js through server.js on Linux; not the owner's Passenger/SSL host."};
  const child=spawn(process.execPath,["server.js"],{
    env:{...process.env,NODE_ENV:"production",DEPLOYMENT_ENV:"preview",CONTACT_ENABLED:"false",PORT:"3107"},
    stdio:["ignore","pipe","pipe"]
  });
  let logs="";
  child.stdout.on("data",chunk=>{logs+=chunk;}); child.stderr.on("data",chunk=>{logs+=chunk;});
  child.on("error",error=>report.failures.push(error.message));
  const base="http://127.0.0.1:3107";
  async function check(path,status) {
    const res=await fetch(base+path,{signal:AbortSignal.timeout(20000)});
    assert.equal(res.status,status,`${path} response`);
    assert.match(res.headers.get("x-robots-tag")||"",/noindex/,`${path} preview noindex`);
    report.checks.push(`${path}: HTTP ${status}, noindex`);
    return res;
  }
  try {
    let ready=false;
    for(let i=0;i<150;i++) {
      if(child.exitCode!==null) throw new Error("Custom server exited before becoming ready.");
      if(logs.includes("[wd-server] Ready")){ready=true;break;}
      await wait(200);
    }
    assert.ok(ready,"server startup");
    const html=await (await check("/",200)).text();
    assert.match(html,/WD Marketing/); assert.match(html,/data-growth-engine/);
    report.checks.push("Rendered the real homepage and GrowthEngine, not a placeholder server");
    await check("/services/seo",200); await check("/a-path-that-does-not-exist",404);
    await check("/images/brand/wd-marketing-ribbon-mark.png",200);
    await check("/images/brand/wd-marketing-favicon.png",200);
    const robots=await (await check("/robots.txt",200)).text();
    assert.doesNotMatch(robots,/Sitemap/); report.checks.push("Preview robots does not advertise a sitemap");
    const api=await fetch(base+"/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}",signal:AbortSignal.timeout(10000)});
    assert.equal(api.status,503); assert.match((await api.json()).error,/disabled/);
    report.checks.push("Preview enquiry delivery stays disabled");
    const asset=html.match(/src="([^"]*\/_next\/static\/[^"]+\.js)"/);
    assert.ok(asset,"compiled JS asset found"); await check(asset[1].replaceAll("&amp;","&"),200);
  } catch(error) { report.failures.push(error.stack||error.message); }
  finally {
    if(child.exitCode===null) {
      const exited=once(child,"exit"); child.kill("SIGTERM");
      await Promise.race([exited,wait(12000)]);
      if(child.exitCode===null) child.kill("SIGKILL");
    }
    fs.mkdirSync("qa-results",{recursive:true});
    fs.writeFileSync("qa-results/cpanel-server-report.json",JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
    if(report.failures.length){console.error(logs);process.exitCode=1;}
  }
})();
