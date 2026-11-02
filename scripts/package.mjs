import './validate.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..'),build=path.join(root,'build');await fs.mkdir(build,{recursive:true});
for(const environment of ['dev','prod']){
 let receipt;try{receipt=JSON.parse(await fs.readFile(path.join(root,'releases/plugins-'+environment+'.json'),'utf8'));}catch(error){if(error.code==='ENOENT')continue;throw error;}
 for(const host of ['claude','gemini']){
  const prefix=host==='claude'?'plugins/claude'+(environment==='dev'?'-dev':'')+'/':environment==='dev'?'plugins/gemini-dev/':'';
  const staging=await fs.mkdtemp(path.join(build,'package-')),name=environment==='dev'?'print-ready-dev':'print-ready',wrapper=host==='claude'?name+'/':'';
  const files=Object.entries(receipt.files).filter(([file])=>host==='gemini'&&environment==='prod'?!file.startsWith('plugins/'):file.startsWith(prefix));
  for(const [file]of files){const relative=wrapper+file.slice(prefix.length),dest=path.join(staging,relative);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.copyFile(path.join(root,file),dest);}
  const archive=path.join(build,'print-ready-'+host+'-'+environment+'-'+receipt.version+'.zip');
  if(process.platform==='win32')execFileSync('tar.exe',['-a','-cf',archive,'.'],{cwd:staging});else execFileSync('zip',['-q','-r',archive,'.'],{cwd:staging});
  const inventory=execFileSync(process.platform==='win32'?'tar.exe':'unzip',process.platform==='win32'?['-tf',archive]:['-Z1',archive],{encoding:'utf8'}).replaceAll('\\','/').trim().split(/\r?\n/).filter(file=>!file.endsWith('/'));
  assert.deepEqual(inventory.map(file=>file.replace(/^\.\//,'')).sort(),files.map(([file])=>wrapper+file.slice(prefix.length)).sort());
  for(const [file,digest]of files){const entry=inventory.find(value=>value.replace(/^\.\//,'')===wrapper+file.slice(prefix.length));const bytes=execFileSync(process.platform==='win32'?'tar.exe':'unzip',process.platform==='win32'?['-xOf',archive,entry]:['-p',archive,entry],{maxBuffer:1024*1024});assert.equal(createHash('sha256').update(bytes).digest('hex'),digest,'ZIP mismatch.');}
  console.log('Verified '+path.basename(archive)+' with '+files.length+' files.');
 }
}
