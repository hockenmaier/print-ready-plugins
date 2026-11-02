import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..'),hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const inventory=async directory=>{const files=[];async function visit(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){assert.ok(!entry.isSymbolicLink(),'Public symlink.');const file=path.join(dir,entry.name);if(entry.isDirectory())await visit(file);else{assert.ok(entry.isFile());files.push(path.relative(root,file).replaceAll('\\','/'));}}}await visit(directory);return files;};
for(const environment of ['dev','prod']){
 let receipt;try{receipt=JSON.parse(await fs.readFile(path.join(root,'releases/plugins-'+environment+'.json'),'utf8'));}catch(error){if(error.code==='ENOENT'&&environment==='dev')continue;throw error;}
 assert.equal(receipt.schema,2);assert.equal(receipt.environment,environment);assert.match(receipt.sourceCommit,/^[a-f0-9]{40}$/);assert.match(receipt.version,/^\d+\.\d+\.\d+$/);
 const endpoint=environment==='dev'?'https://dev.printreadyparts.com/mcp':'https://api.printreadyparts.com/mcp';assert.equal(receipt.endpoint,endpoint);
 const claude='plugins/claude'+(environment==='dev'?'-dev':''),gemini=environment==='dev'?'plugins/gemini-dev/':'';
 const name=environment==='dev'?'print-ready-dev':'print-ready';
 const expected=['gemini-extension.json','GEMINI.md','LICENSE','assets/icon.png'];
 if(environment==='dev')expected.push('README.md');
 const sourceKeys=Object.keys(receipt.sourceFiles);assert.ok(sourceKeys.length>=4);
 assert.ok(sourceKeys.every(file=>/^context\/skills\/[a-z0-9][a-z0-9/_.-]*$/i.test(file)&&!file.split('/').includes('..')));
 const skills=sourceKeys.map(file=>file.replace('context/',''));skills.push('skills/print-ready/references/service-menu.md');
 const allowed=[...expected.map(file=>gemini+file),...skills.map(file=>gemini+file),...[...skills,'.claude-plugin/plugin.json','.mcp.json','README.md','LICENSE','assets/icon.png'].map(file=>claude+'/'+file)];
 assert.deepEqual(Object.keys(receipt.files).sort(),allowed.slice().sort(),'Unexpected public file inventory.');
 const actual=await inventory(path.join(root,claude));
 if(environment==='dev')actual.push(...await inventory(path.join(root,'plugins/gemini-dev')));
 else actual.push(...await inventory(path.join(root,'skills')),...await inventory(path.join(root,'assets')),'gemini-extension.json','GEMINI.md','LICENSE');
 assert.deepEqual(actual.sort(),allowed.slice().sort(),'Unapproved or stale installation files.');
 for(const [file,digest]of Object.entries(receipt.files)){
   assert.ok(!path.isAbsolute(file)&&!file.includes('\\')&&!file.split('/').some(part=>!part||part==='.'||part==='..'));
   const bytes=await fs.readFile(path.join(root,file));assert.ok(bytes.length<256*1024);assert.equal(hash(bytes),digest,'Changed distribution file: '+file);
   if(!file.endsWith('.png'))assert.ok(!/-----BEGIN [A-Z ]*PRIVATE KEY-----|\bAKIA[A-Z0-9]{16}\b|\bgh[pousr]_[A-Za-z0-9]{30,}\b|X-Amz-Signature=/i.test(bytes.toString()),'Secret or signed link.');
 }
 for(const sourceFile of sourceKeys){const file=sourceFile.replace('context/','');if(file==='skills/print-ready/SKILL.md')continue;for(const prefix of [claude+'/',gemini])assert.equal(hash(await fs.readFile(path.join(root,prefix+file))),receipt.sourceFiles[sourceFile],'Shared source changed.');}
 const license=await fs.readFile(path.join(root,'LICENSE'));assert.equal(hash(license),receipt.licenseSha256);assert.deepEqual(await fs.readFile(path.join(root,claude,'LICENSE')),license);
 const manifest=JSON.parse(await fs.readFile(path.join(root,gemini+'gemini-extension.json'),'utf8'));assert.equal(manifest.name,name);assert.equal(manifest.version,receipt.version);assert.equal(manifest.contextFileName,'GEMINI.md');assert.deepEqual(manifest.mcpServers,{[name]:{httpUrl:endpoint}});
 const plugin=JSON.parse(await fs.readFile(path.join(root,claude,'.claude-plugin/plugin.json'),'utf8'));assert.equal(plugin.name,name);assert.equal(plugin.version,receipt.version);assert.deepEqual(JSON.parse(await fs.readFile(path.join(root,claude,'.mcp.json'),'utf8')),{mcpServers:{'print-ready':{type:'http',url:endpoint}}});
 console.log('Validated '+environment+' Claude and Gemini '+receipt.version+' from '+receipt.sourceCommit+'.');
}
const marketplace=JSON.parse(await fs.readFile(path.join(root,'.claude-plugin/marketplace.json'),'utf8'));assert.equal(marketplace.name,'print-ready');for(const plugin of marketplace.plugins)assert.ok(['./plugins/claude','./plugins/claude-dev'].includes(plugin.source));
try{await fs.access(path.join(root,'releases/plugins-dev.json'));}catch(error){if(error.code!=='ENOENT')throw error;await import('./validate-legacy.mjs');}
