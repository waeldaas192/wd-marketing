// Read-only asset inventory; no image generation or file replacement.
const fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const originals=require('../src/data/placeholder-hashes.json');
const items=Object.entries(originals).map(([src,placeholderHash])=>{let status='missing',bytes=0;try{const buffer=fs.readFileSync(path.join(process.cwd(),'public',src));bytes=buffer.length;status=createHash('sha256').update(buffer).digest('hex')===placeholderHash?'placeholder':'replaced';}catch{}return {file:src,status,kb:Math.round(bytes/1024),optional:src.startsWith('/images/hero/')};});
for(const file of ['/images/brand/wd-marketing-logo.svg','/images/brand/wd-marketing-mark.svg'])items.push({file,status:fs.existsSync(path.join(process.cwd(),'public',file))?'present':'missing',kb:0,optional:false});
console.table(items);console.log('Replaced means different file bytes, not approval of image content or dimensions. See ASSET-MANIFEST.md for sizes.');
fs.mkdirSync('qa-results',{recursive:true});fs.writeFileSync('qa-results/assets-status.json',JSON.stringify(items,null,2));
if(process.argv.includes('--strict')&&items.some(item=>!item.optional&&['missing','placeholder'].includes(item.status)))process.exitCode=1;
