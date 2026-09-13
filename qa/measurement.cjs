const assert = require('node:assert/strict');
const { buildSync } = require('esbuild');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const template = fs.readFileSync(path.join(root, 'docs/gtm/consent-template.js'), 'utf8');
function bundle(file, enabled = true) {
  return buildSync({entryPoints:[path.join(root,file)],bundle:true,format:'cjs',platform:'browser',write:false,
    define:{'process.env.NEXT_PUBLIC_MEASUREMENT_ENABLED':JSON.stringify(String(enabled)), 'process.env.NEXT_PUBLIC_GTM_ID':'"GTM-TEST123"','process.env.NEXT_PUBLIC_GA4_ID':'"G-TEST123"'}}).outputFiles[0].text;
}
function harness(enabled = true) {
  const scripts=[], microtasks=[], states=[], globals={}, timers=[], removed=[];
  const jar=new Map([['_ga','legacy'],['_ga_TEST123','legacy'],['cf_clearance','essential'],['session','essential']]);
  const document={referrer:'https://www.google.com/search?q=private@example.com',head:{appendChild:s=>scripts.push(s)},createElement:()=>({remove(){removed.push(this)}})};
  Object.defineProperty(document,'cookie',{get:()=>[...jar].map(([k,v])=>k+'='+v).join('; '),set:v=>{const key=v.split('=')[0]; if(v.includes('Max-Age=0'))jar.delete(key);}});
  const location={hostname:'wdmarketing.co.uk',pathname:'/contact',protocol:'https:',search:'?email=private@example.com&utm_source=google&utm_campaign=seo_london&gclid=secret&message=private'};
  const window={}; const sandbox={exports:{},module:{exports:{}},document,location,window,URL,URLSearchParams,Date,Set,Event,queueMicrotask:f=>microtasks.push(f),setTimeout:(f,delay)=>{timers.push({f,delay});return timers.length;},clearTimeout:()=>{}};
  sandbox.exports=sandbox.module.exports; vm.runInNewContext(bundle('src/lib/measurement.ts',enabled),sandbox);
  const flush=()=>{while(microtasks.length)microtasks.shift()();};
  const native=()=>vm.runInNewContext(template,{data:{gtmOnSuccess:()=>{}},require:name=>({
    setDefaultConsentState:s=>states.push({kind:'default',...s}),updateConsentState:s=>states.push({kind:'update',...s}),
    gtagSet:(key,value)=>globals[key]=value,callInWindow:(key,...args)=>window[key](...args)
  })[name]});
  return {api:sandbox.module.exports,window,document,location,scripts,jar,flush,native,states,globals,timers};
}
const consentModule={exports:{}};
vm.runInNewContext(bundle('src/lib/consent.ts'),{module:consentModule,exports:consentModule.exports,Date,Number,JSON});
const c=consentModule.exports, now=Date.now();
for(const raw of [null,'broken','{}',JSON.stringify({version:2,analytics:true,savedAt:now}),JSON.stringify({version:1,analytics:'true',savedAt:now}),JSON.stringify({version:1,analytics:true,savedAt:now+1}),JSON.stringify({version:1,analytics:true,savedAt:now-c.CONSENT_MAX_AGE})]) assert.equal(c.parseConsent(raw,now),null);
assert.equal(c.parseConsent(JSON.stringify({version:1,analytics:false,savedAt:now}),now).analytics,false);
const accepted={version:1,analytics:true,savedAt:now}, rejected={...accepted,analytics:false};
const off=harness(false); off.api.applyConsent(accepted); off.api.trackPage('/contact'); assert.equal(off.scripts.length,0); assert.equal(off.window.dataLayer,undefined);
const h=harness(); h.api.trackPage('/contact'); h.api.applyConsent(null); h.api.trackLead('before-consent'); assert.equal(h.scripts.length,0); assert.equal(h.window.dataLayer,undefined);
h.api.applyConsent(rejected); assert.equal(h.scripts.length,0); assert.equal(h.jar.has('_ga'),false); assert.equal(h.jar.has('cf_clearance'),true);
h.api.applyConsent(accepted); h.api.trackFormStart(); assert.equal(h.scripts.length,1); assert.equal(h.window.dataLayer.filter(x=>x.event.startsWith('wd_')).length,0,'missing template must not release events');
h.native(); h.flush(); assert.equal(h.states[0].analytics_storage,'denied'); assert.equal(h.states[1].analytics_storage,'granted');
for(const key of ['ad_storage','ad_user_data','ad_personalization'])assert.ok(h.states.every(x=>x[key]==='denied'));
assert.equal(h.globals.cookie_expires,15552000); assert.equal(h.globals.cookie_update,false); assert.equal(h.globals.send_page_view,false);
assert.equal(h.globals.page_location,'https://wdmarketing.co.uk/contact?utm_source=google&utm_campaign=seo_london');
assert.equal(h.globals.page_referrer,'https://www.google.com/');
const events=()=>h.window.dataLayer.filter(x=>x.event.startsWith('wd_'));
assert.equal(events().filter(x=>x.event==='wd_page_view').length,1);
assert.equal(events()[0].event,'wd_analytics_ready'); assert.equal(events()[1].event,'wd_page_view');
h.api.trackPage('/contact'); assert.equal(events().filter(x=>x.event==='wd_page_view').length,1);
h.location.search='';h.location.pathname='/services/seo';h.api.trackPage('/services/seo');h.api.trackPage('/contact'); assert.equal(events().filter(x=>x.event==='wd_page_view').length,3);
h.api.trackLead('internal-reference');h.api.trackLead('internal-reference'); assert.equal(events().filter(x=>x.event==='wd_generate_lead').length,1);
h.api.trackContactClick('email'); assert.equal(events().at(-1).contact_method,'email');
assert.ok(!JSON.stringify(events()).includes('private'));assert.ok(!JSON.stringify(events()).includes('internal-reference'));assert.ok(!JSON.stringify(events()).includes('gclid'));
const count=events().length; h.api.applyConsent(rejected); h.api.trackPage('/about'); h.api.trackLead('after-withdrawal'); h.api.trackContactClick('phone');h.flush(); assert.equal(events().length,count); assert.equal(h.window['ga-disable-G-TEST123'],true); assert.equal(h.states.at(-1).analytics_storage,'denied');
h.api.applyConsent(accepted);h.flush();assert.equal(h.scripts.length,1);assert.equal(h.window['ga-disable-G-TEST123'],false);assert.equal(events().at(-1).page_path,'/about');
assert.equal(h.api.safePath('/work/private-person'),'/other');assert.equal(h.api.safePath('/work/stone-pro-worktops'),'/work/stone-pro-worktops');
assert.equal(h.api.safePageLocation('/contact','?utm_source=private%40example.com&utm_campaign=customer123456789'),'https://wdmarketing.co.uk/contact');
assert.ok(h.timers.every(t=>t.delay>=1&&t.delay<=2147483647));
const expires=harness();expires.api.applyConsent({...accepted,savedAt:now-c.CONSENT_MAX_AGE});assert.equal(expires.scripts.length,0);
const sitemap=fs.readFileSync(path.join(root,'out/sitemap.xml'),'utf8');
for(const [,url] of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) { const p=new URL(url).pathname; assert.equal(h.api.safePath(p),p,'new routes need a safe measurement path'); }
// Check the deliverable's wiring, not just the site's event producer.
const imported=JSON.parse(fs.readFileSync(path.join(root,'docs/gtm/WD-Marketing-GA4-import.json'),'utf8')).containerVersion;
assert.equal(imported.container.publicId,'GTM-MJL3LG77');
const names=new Set(imported.variable.map(v=>v.name));
const triggers=new Map(imported.trigger.map(t=>[t.triggerId,t]));
const param=(item,key)=>item.parameter.find(p=>p.key===key);
const constant=imported.variable.find(v=>v.name==='WD - GA4 Measurement ID');
assert.equal(param(constant,'value').value,'G-P2D95M1T98');
assert.equal(imported.tag.length,7); assert.equal(imported.trigger.length,7);
for(const tag of imported.tag) {
  assert.equal(tag.consentSettings.consentStatus,'NEEDED');
  assert.deepEqual(tag.consentSettings.consentType.list,[{type:'TEMPLATE',value:'analytics_storage'}]);
  assert.equal(tag.firingTriggerId.length,1);
  const trigger=triggers.get(tag.firingTriggerId[0]);assert.ok(trigger);
  assert.equal(trigger.type,'CUSTOM_EVENT');assert.equal(trigger.customEventFilter[0].type,'EQUALS');
  const source=trigger.customEventFilter[0].parameter.find(p=>p.key==='arg1').value;
  if(tag.type==='gaawe') {
    assert.equal(source,'wd_'+param(tag,'eventName').value);
    assert.equal(tag.setupTag[0].tagName,'WD - Google tag - GA4');assert.equal(tag.setupTag[0].stopOnSetupFailure,true);
    const allowed=new Set(['page_location','page_path','page_referrer','form_id','step','lead_method','contact_method']);
    for(const row of param(tag,'eventParameters').list)assert.ok(allowed.has(row.map.find(p=>p.key==='name').value));
  } else {assert.equal(tag.type,'googtag');assert.equal(source,'wd_analytics_ready');assert.equal(tag.tagFiringOption,'ONCE_PER_LOAD');}
}
for(const [,name] of JSON.stringify(imported).matchAll(/\{\{([^}]+)\}\}/g))assert.ok(name==='_event'||names.has(name),'unresolved GTM variable: '+name);
const tpl=fs.readFileSync(path.join(root,'docs/gtm/WD-Marketing-consent.tpl'),'utf8');
assert.equal(tpl.split('___SANDBOXED_JS_FOR_WEB_TEMPLATE___')[1].split('___WEB_PERMISSIONS___')[0].trim(),template.trim(),'imported consent code must match tested code');
const permissions=JSON.parse(tpl.split('___WEB_PERMISSIONS___')[1].split('___TESTS___')[0]);
assert.deepEqual(permissions.map(p=>p.instance.key.publicId).sort(),['access_consent','access_globals','write_data_layer']);
console.log('PASS GTM import references, native consent permissions, explicit events, setup sequencing and approved parameters. Live GTM import/Preview still required.');
console.log('PASS consent validation, expiry, disabled config, no pre-consent requests, GTM native bridge, consent order, page-view dedupe, lead dedupe, PII filtering, withdrawal, cookie cleanup, route allowlist. No Google requests or real enquiries sent.');
