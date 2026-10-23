import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const provenance=JSON.parse(await fs.readFile(path.join(root,'releases/claude-dev.json'),'utf8'));
assert.equal(provenance.schema,1);assert.equal(provenance.environment,'dev');assert.equal(provenance.host,'claude');
assert.match(provenance.sourceCommit,/^[a-f0-9]{40}$/);assert.match(provenance.verifiedSourceArchiveSha256,/^[a-f0-9]{64}$/);
assert.equal(provenance.endpoint,'https://dev.printreadyparts.com/mcp');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const dest=path.join(root,'plugins/claude-dev');
const actual=[];
async function visit(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){
  assert.ok(!entry.isSymbolicLink(),'Symlinks are not distributable.');
  const file=path.join(dir,entry.name);
  if(entry.isDirectory())await visit(file);else{assert.ok(entry.isFile());actual.push(path.relative(dest,file).replaceAll('\\','/'));}
}}
await visit(dest);
const sourcePaths=['.claude-plugin/plugin.json','.mcp.json','README.md','assets/icon.png','skills/print-ready/SKILL.md','skills/print-ready/references/service-menu.md','skills/welcome/SKILL.md'];
assert.deepEqual(Object.keys(provenance.sourceFiles).sort(),sourcePaths.slice().sort());
assert.deepEqual(actual.sort(),[...sourcePaths,'LICENSE'].sort(),'Plugin contains unapproved files.');
for(const [file,expected]of Object.entries(provenance.sourceFiles)){
  const bytes=await fs.readFile(path.join(dest,file));assert.ok(bytes.length<256*1024,'Oversized file.');
  assert.equal(hash(bytes),expected,'Shared file changed: '+file);
  if(!file.endsWith('.png'))assert.ok(!/-----BEGIN [A-Z ]*PRIVATE KEY-----|\bAKIA[A-Z0-9]{16}\b|\bgh[pousr]_[A-Za-z0-9]{30,}\b|X-Amz-Signature=/i.test(bytes.toString()),'Unexpected secret or signed link in '+file);
}
const license=await fs.readFile(path.join(dest,'LICENSE'));
assert.equal(hash(license),provenance.licenseSha256);
assert.deepEqual(license,await fs.readFile(path.join(root,'LICENSE')));
const manifest=JSON.parse(await fs.readFile(path.join(dest,'.claude-plugin/plugin.json'),'utf8'));
assert.equal(manifest.name,'print-ready-dev');assert.equal(manifest.version,provenance.version);
assert.ok(manifest.author?.name&&manifest.description);assert.equal(manifest.icon,'./assets/icon.png');
assert.deepEqual(JSON.parse(await fs.readFile(path.join(dest,'.mcp.json'),'utf8')),{mcpServers:{'print-ready':{type:'http',url:provenance.endpoint}}});
for(const skill of ['print-ready','welcome'])assert.match(await fs.readFile(path.join(dest,'skills',skill,'SKILL.md'),'utf8'),/^---\r?\nname: /);
assert.ok((await fs.readFile(path.join(dest,'README.md'),'utf8')).split(/\s+/).length>=40);
console.log('Validated Claude dev '+provenance.version+': inventory, source hashes, license, manifest, endpoint and shared skills. Actual host acceptance remains required.');
