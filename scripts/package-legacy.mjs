import './validate.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const receipt=JSON.parse(await fs.readFile(path.join(root,'releases/claude-dev.json'),'utf8'));
const build=path.join(root,'build');await fs.mkdir(build,{recursive:true});
// A staging copy gives the upload ZIP the existing print-ready-dev root folder.
const staging=await fs.mkdtemp(path.join(build,'package-'));
await fs.cp(path.join(root,'plugins/claude-dev'),path.join(staging,'print-ready-dev'),{recursive:true});
const archive=path.join(build,'print-ready-claude-dev-'+receipt.version+'.zip');
if(process.platform==='win32')execFileSync('tar.exe',['-a','-cf',archive,'print-ready-dev'],{cwd:staging});
else execFileSync('zip',['-q','-r',archive,'print-ready-dev'],{cwd:staging});
const inventory=execFileSync(process.platform==='win32'?'tar.exe':'unzip',process.platform==='win32'?['-tf',archive]:['-Z1',archive],{encoding:'utf8'}).replaceAll('\\','/').trim().split(/\r?\n/).filter(name=>!name.endsWith('/'));
const expected={...receipt.sourceFiles,LICENSE:receipt.licenseSha256};
assert.deepEqual(inventory.slice().sort(),Object.keys(expected).map(file=>'print-ready-dev/'+file).sort());
for(const [file,digest]of Object.entries(expected)){
  const bytes=execFileSync(process.platform==='win32'?'tar.exe':'unzip',process.platform==='win32'?['-xOf',archive,'print-ready-dev/'+file]:['-p',archive,'print-ready-dev/'+file],{maxBuffer:1024*1024});
  assert.equal(createHash('sha256').update(bytes).digest('hex'),digest,'ZIP content mismatch: '+file);
}
const sha256=createHash('sha256').update(await fs.readFile(archive)).digest('hex');
await fs.writeFile(archive.replace(/\.zip$/,'.json'),JSON.stringify({version:receipt.version,environment:'dev',sourceCommit:receipt.sourceCommit,archiveSha256:sha256,files:expected},null,2)+'\n');
console.log(JSON.stringify({archive,sha256,files:inventory.length}));
