"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
process.env.WD_SERVER_IMPORT_ONLY = "1";
const { guardPreview, isPreviewRequest } = require("../server.js");
const { crc32, collect, writeZip } = require("../scripts/package-cpanel.cjs");
const fs = require("node:fs"), os = require("node:os"), path = require("node:path");
function response() {
  return {
    headers: {}, status: 200, body: "",
    setHeader(key,value) { this.headers[key.toLowerCase()] = value; },
    writeHead(status, headers) { this.status=status; for (const [k,v] of Object.entries(headers)) this.setHeader(k,v); },
    end(body) { this.body=body; },
  };
}
test("Preview is the default even when NODE_ENV is production", () => {
  assert.equal(isPreviewRequest({headers:{host:"wdmarketing.co.uk"}},{NODE_ENV:"production"}),true);
});
test("Public deployment needs an explicit opt-in", () => {
  assert.equal(isPreviewRequest({headers:{host:"wdmarketing.co.uk"}},{DEPLOYMENT_ENV:"production"}),false);
});
test("The preview hostname cannot accidentally become indexable", () => {
  assert.equal(isPreviewRequest({headers:{host:"PREVIEW.WDMARKETING.CO.UK:443"}},{DEPLOYMENT_ENV:"production"}),true);
});
test("Preview HTML receives HTTP noindex", () => {
  const res=response();
  assert.equal(guardPreview({url:"/",headers:{}},res,{}),false);
  assert.match(res.headers["x-robots-tag"],/noindex/);
});
test("Production requests are not changed by the guard", () => {
  const res=response();
  assert.equal(guardPreview({url:"/robots.txt",headers:{host:"wdmarketing.co.uk"}},res,{DEPLOYMENT_ENV:"production"}),false);
  assert.deepEqual(res.headers,{});
});
test("Preview robots allows crawlers to see noindex, without advertising a sitemap", () => {
  const res=response();
  assert.equal(guardPreview({url:"/robots.txt",headers:{}},res,{}),true);
  assert.equal(res.status,200);
  assert.match(res.body,/Allow: \//); assert.doesNotMatch(res.body,/Sitemap/);
});
test("Preview form requests never invoke a real delivery handler", () => {
  for (const url of ["/api/contact","/api/contact/?test=1"]) {
    const res=response(); assert.equal(guardPreview({url,headers:{}},res,{}),true);
    assert.equal(res.status,503); assert.match(JSON.parse(res.body).error,/disabled/);
  }
});
test("ZIP checksum implements the standard CRC32 test vector", () => {
  assert.equal(crc32(Buffer.from("123456789")),0xcbf43926);
});
test("ZIP selection includes dot build files but excludes cache, environment files and dependencies", () => {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),"wd-package-test-"));
  try {
    for (const file of [".next/BUILD_ID",".next/static/app.js",".next/cache/old.bin",
      "src/app/page.tsx","src/.env.local","public/logo.svg","node_modules/library.js",".env.local"]) {
      fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true}); fs.writeFileSync(path.join(root,file),"fixture");
    }
    const files=collect(root,[".next","src","public"]).map(file=>file.relative);
    assert.deepEqual(files,[".next/BUILD_ID",".next/static/app.js","src/app/page.tsx","public/logo.svg"]);
    assert.equal(writeZip(root,path.join(root,"test.zip"),[".next","src","public"]),4);
    assert.equal(fs.readFileSync(path.join(root,"test.zip")).readUInt32LE(0),0x04034b50);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
test("Missing package inputs fail rather than silently producing an incomplete ZIP", () => {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),"wd-package-missing-"));
  try { assert.throws(()=>collect(root,["server.js"]),/Missing/); }
  finally { fs.rmSync(root,{recursive:true,force:true}); }
});
