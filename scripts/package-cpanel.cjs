"use strict";

// Build and package on the owner's machine, without extra dependencies.
// Usage: node scripts/package-cpanel.cjs
const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");
const { spawnSync } = require("node:child_process");

const required = ["server.js", "package.json", "package-lock.json", "next.config.ts",
  "tsconfig.json", "next-env.d.ts", "postcss.config.mjs", "src", "public", ".next"];
const crcTable = Array.from({ length: 256 }, (_, index) => {
  let c = index;
  for (let bit = 0; bit < 8; bit++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(data) {
  let c = 0xffffffff;
  for (const byte of data) c = crcTable[(c ^ byte) & 255] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function collect(root, entries = required) {
  const files = [];
  function walk(relative) {
    if (/^\.next\/(?:cache|dev|standalone)(?:\/|$)/.test(relative)) return;
    const base = path.posix.basename(relative);
    if (base.startsWith(".env") || /\.(?:zip|log|tsbuildinfo)$/i.test(base)) return;
    const absolute = path.join(root, relative);
    const info = fs.lstatSync(absolute);
    if (info.isSymbolicLink()) throw new Error(`Unexpected symlink: ${relative}. Do not package node_modules.`);
    if (info.isDirectory()) {
      for (const name of fs.readdirSync(absolute).sort()) walk(`${relative}/${name}`);
    } else if (info.isFile()) files.push({ relative, absolute });
  }
  for (const name of entries) {
    if (!fs.existsSync(path.join(root, name))) throw new Error(`Missing deployment input: ${name}`);
    walk(name);
  }
  return files;
}
function writeZip(root, destination, entries = required) {
  const files = collect(root, entries);
  if (files.length >= 65535) throw new Error("Too many files for this deployment archive.");
  const local = [], central = [];
  let offset = 0, centralSize = 0;
  for (const { relative, absolute } of files) {
    const data = fs.readFileSync(absolute);
    if (data.length > 256 * 1024 * 1024) throw new Error(`Deployment file is unexpectedly large: ${relative}`);
    const name = Buffer.from(relative, "utf8");
    const compressed = zlib.deflateRawSync(data);
    const crc = crc32(data);
    // UTF-8 names, DEFLATE, deterministic DOS date 1980-01-01.
    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50, 0); header.writeUInt16LE(20, 4);
    header.writeUInt16LE(0x800, 6); header.writeUInt16LE(8, 8); header.writeUInt16LE(33, 12);
    header.writeUInt32LE(crc, 14); header.writeUInt32LE(compressed.length, 18);
    header.writeUInt32LE(data.length, 22); header.writeUInt16LE(name.length, 26);
    local.push(header, name, compressed);
    const record = Buffer.alloc(46);
    record.writeUInt32LE(0x02014b50, 0); record.writeUInt16LE(20, 4); record.writeUInt16LE(20, 6);
    record.writeUInt16LE(0x800, 8); record.writeUInt16LE(8, 10); record.writeUInt16LE(33, 14);
    record.writeUInt32LE(crc, 16); record.writeUInt32LE(compressed.length, 20);
    record.writeUInt32LE(data.length, 24); record.writeUInt16LE(name.length, 28);
    record.writeUInt32LE(offset, 42); central.push(record, name);
    centralSize += record.length + name.length;
    offset += header.length + name.length + compressed.length;
    if (offset + centralSize >= 0xffffffff) throw new Error("Archive exceeds the supported ZIP size.");
  }
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10); end.writeUInt32LE(centralSize, 12); end.writeUInt32LE(offset, 16);
  const temporary = destination + ".tmp";
  fs.writeFileSync(temporary, Buffer.concat([...local, ...central, end]));
  fs.renameSync(temporary, destination);
  return files.length;
}
function main() {
  const root = path.resolve(__dirname, "..");
  const nextCli = require.resolve("next/dist/bin/next", { paths: [root] });
  const result = spawnSync(process.execPath, [nextCli, "build"], {
    cwd: root, stdio: "inherit",
    env: { ...process.env, NODE_ENV: "production", DEPLOYMENT_ENV: "preview", CONTACT_ENABLED: "false" },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error("Build failed. No deployment archive was created.");
  if (!fs.existsSync(path.join(root, ".next", "BUILD_ID"))) throw new Error("Build did not produce .next/BUILD_ID.");
  const destination = path.join(root, "wd-marketing-cpanel-preview.zip");
  const count = writeZip(root, destination);
  console.log(`\nCreated ${destination}\n${count} files; no node_modules, .git or .env files.`);
  console.log("Upload into wd-marketing-app, not public_html. Install Linux dependencies on cPanel.");
}
module.exports = { crc32, collect, writeZip };
if (require.main === module) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
