import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {sourceFiles} from './distribution-files.mjs';

const root=path.resolve(import.meta.dirname,'..');
const [archive,receiptPath,...extra]=process.argv.slice(2);
assert.ok(archive&&receiptPath&&!extra.length,'Usage: node scripts/import-verified.mjs <verified Claude dev ZIP> <receipt.json>');
const receipt=JSON.parse(await fs.readFile(receiptPath,'utf8'));
const allowed=sourceFiles(receipt.version).sort();
assert.equal(receipt.host,'claude');
assert.equal(receipt.environment,'dev');
assert.equal(receipt.deploymentVerified,true);
assert.equal(receipt.endpoint,'https://dev.printreadyparts.com/mcp');
assert.match(receipt.serviceSha,/^[a-f0-9]{40}$/);
assert.match(receipt.version,/^\d+\.\d+\.\d+$/);
assert.deepEqual(Object.keys(receipt.files).sort(),allowed);
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
assert.equal(hash(await fs.readFile(archive)),receipt.archiveSha256,'Archive hash differs from verified receipt.');
const zip=path.resolve(archive),prefix='print-ready-dev/';
const inventory=execFileSync(process.platform==='win32'?'tar.exe':'unzip',process.platform==='win32'?['-tf',zip]:['-Z1',zip],{encoding:'utf8'}).replaceAll('\\','/').trim().split(/\r?\n/);
const files=inventory.filter(name=>!name.endsWith('/'));
assert.deepEqual(files.slice().sort(),allowed.map(name=>prefix+name).sort(),'Unexpected archive files.');
assert.equal(new Set(inventory).size,inventory.length,'Duplicate archive entries.');
const contents=new Map();
for(const file of allowed){
  const bytes=execFileSync(process.platform==='win32'?'tar.exe':'unzip',process.platform==='win32'?['-xOf',zip,prefix+file]:['-p',zip,prefix+file],{maxBuffer:1024*1024});
  assert.equal(hash(bytes),receipt.files[file],'File hash mismatch: '+file);
  contents.set(file,bytes);
}
const manifest=JSON.parse(contents.get('.claude-plugin/plugin.json').toString());
assert.equal(manifest.name,'print-ready-dev');
assert.equal(manifest.version,receipt.version);
const mcp=JSON.parse(contents.get('.mcp.json').toString());
assert.deepEqual(mcp,{mcpServers:{'print-ready':{type:'http',url:receipt.endpoint}}});
const dest=path.join(root,'plugins/claude-dev');
for(const [file,bytes]of contents){
  const target=path.join(dest,file);await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,bytes);
}
const license=await fs.readFile(path.join(root,'LICENSE'));
await fs.writeFile(path.join(dest,'LICENSE'),license);
const provenance={schema:1,host:'claude',environment:'dev',version:receipt.version,sourceCommit:receipt.serviceSha,endpoint:receipt.endpoint,verifiedSourceArchiveSha256:receipt.archiveSha256,sourceFiles:receipt.files,licenseSha256:hash(license)};
await fs.mkdir(path.join(root,'releases'),{recursive:true});
await fs.writeFile(path.join(root,'releases/claude-dev.json'),JSON.stringify(provenance,null,2)+'\n');
console.log('Imported verified Claude dev '+receipt.version+'; '+allowed.length+' original files preserved, license added.');
