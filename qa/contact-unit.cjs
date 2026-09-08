/* Test the actual TypeScript contact code with a mocked transport. Sends no real email. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),ts=require('typescript');
const cache=new Map();
function load(file){file=path.resolve(file);if(cache.has(file))return cache.get(file).exports;const module={exports:{}};cache.set(file,module);const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const scoped=id=>id.startsWith('.')?load(path.resolve(path.dirname(file),id+'.ts')):require(id);new Function('require','module','exports',code)(scoped,module,module.exports);return module.exports;}
const {handleContact}=load('src/lib/contact-handler.ts');
const {validateBrief}=load('src/lib/contact-validation.ts');
let seq=0;const results=[];
const env={CONTACT_ENABLED:'true',RESEND_API_KEY:'unit-test-not-a-key',CONTACT_FROM:'WD <sender@example.com>',CONTACT_TO:'owner@example.com',TURNSTILE_SECRET_KEY:'unit-test',TURNSTILE_EXPECTED_HOSTNAME:'example.com'};
const valid=()=>({name:'Test Business',email:`test${++seq}@example.com`,company:'Company',website:'https://example.com',service:'SEO / Organic Growth',budget:'Not sure yet',message:'Please review our website and enquiry journey.',turnstileToken:'test-token',requestId:'unit-test-request-0001'});
const request=(body,headers={})=>new Request('https://example.com/api/contact',{method:'POST',headers:{'Content-Type':'application/json',origin:'https://example.com',...headers},body:typeof body==='string'?body:JSON.stringify(body)});
const mock=(overrides={})=>async(url,options)=>{if(String(url).includes('siteverify'))return Response.json({success:true,hostname:'example.com',action:'project-brief',...overrides.verification});if(overrides.failSend)throw new Error('Simulated timeout');return Response.json(overrides.email||{id:'provider-unit-id'},{status:overrides.status||200});};
async function test(name,fn){await fn();results.push(name);console.log('PASS',name);}
(async()=>{
 await test('valid brief, trimmed and whitelisted',()=>assert.equal(validateBrief(valid()).valid,true));
 await test('reject object values',()=>assert.equal(validateBrief({...valid(),message:{bad:true}}).valid,false));
 await test('reject non-http website',()=>assert.equal(validateBrief({...valid(),website:'javascript:alert(1)'}).valid,false));
 await test('reject website credentials',()=>assert.equal(validateBrief({...valid(),website:'https://u:p@example.com'}).valid,false));
 await test('reject unknown service',()=>assert.equal(validateBrief({...valid(),service:'arbitrary'}).valid,false));
 await test('reject malformed JSON',async()=>assert.equal((await handleContact(request('{'),{},mock())).status,400));
 await test('reject array payload',async()=>assert.equal((await handleContact(request([]),{},mock())).status,400));
 await test('reject oversized byte body',async()=>assert.equal((await handleContact(request({message:'a'.repeat(25000)}),{},mock())).status,413));
 await test('reject wrong content type',async()=>assert.equal((await handleContact(request(valid(),{'Content-Type':'text/plain'}),env,mock())).status,415));
 await test('reject cross-origin request',async()=>assert.equal((await handleContact(request(valid(),{origin:'https://attacker.example'}),env,mock())).status,403));
 await test('unconfigured delivery cannot succeed',async()=>assert.equal((await handleContact(request(valid()),{},async()=>{throw new Error('Must not call a provider');})).status,503));
 await test('honeypot is rejected',async()=>assert.equal((await handleContact(request({...valid(),websiteCheck:'spam'}),env,mock())).status,400));
 await test('missing security token is rejected',async()=>assert.equal((await handleContact(request({...valid(),turnstileToken:''}),env,mock())).status,400));
 await test('failed security check is rejected',async()=>assert.equal((await handleContact(request(valid()),env,mock({verification:{success:false}}))).status,400));
 await test('wrong verification hostname is rejected',async()=>assert.equal((await handleContact(request(valid()),env,mock({verification:{hostname:'attacker.example'}}))).status,400));
 await test('wrong verification action is rejected',async()=>assert.equal((await handleContact(request(valid()),env,mock({verification:{action:'other'}}))).status,400));
 await test('provider rejection is not success',async()=>assert.equal((await handleContact(request(valid()),env,mock({status:422,email:{error:'not sent'}}))).status,502));
 await test('provider response needs an acknowledgement ID',async()=>assert.equal((await handleContact(request(valid()),env,mock({email:{}}))).status,502));
 await test('provider timeout preserves uncertainty',async()=>{const response=await handleContact(request(valid()),env,mock({failSend:true}));assert.equal(response.status,502);assert.match((await response.json()).error,/could not confirm/i);});
 await test('provider acceptance, fixed recipient and reply-to',async()=>{const data=valid();let sent;const response=await handleContact(request({...data,to:'attacker@example.com'}),env,async(url,options)=>{if(String(url).includes('siteverify'))return mock()(url,options);sent=JSON.parse(options.body);return Response.json({id:'test-id'});});assert.equal(response.status,200);assert.deepEqual(sent.to,['owner@example.com']);assert.equal(sent.reply_to,data.email);assert.equal('html' in sent,false);});
 await test('idempotent retries reuse the provider key',async()=>{const data=valid(),keys=[];const transport=async(url,options)=>{if(String(url).includes('/emails'))keys.push(options.headers['Idempotency-Key']);return mock()(url,options);};await handleContact(request(data),env,transport);await handleContact(request(data),env,transport);assert.equal(keys.length,2);assert.equal(keys[0],keys[1]);assert.ok(!keys[0].includes(data.email));});
 await test('per-process email throttle is bounded',async()=>{const data=valid();for(let i=0;i<5;i++)assert.equal((await handleContact(request(data),env,mock())).status,200);const response=await handleContact(request(data),env,mock());assert.equal(response.status,429);assert.equal(response.headers.get('Retry-After'),'600');});
 fs.mkdirSync('qa-results',{recursive:true});fs.writeFileSync('qa-results/contact-unit.json',JSON.stringify({passed:results.length,tests:results,note:'Provider calls were mocked; no live delivery tested.'},null,2));
})().catch(error=>{console.error(error);process.exitCode=1;});
