import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const repository='hockenmaier/print-ready-plugins';assert.equal(process.env.GITHUB_REPOSITORY,repository);
const branch=process.env.DISTRIBUTION_BRANCH,explicit=branch?.match(/^codex\/publish-plugins-(dev|prod)-([a-f0-9-]{36})$/),generated=branch?.match(/^codex\/generated-plugins-dev-([a-f0-9]{40})$/),legacy=branch?.match(/^codex\/generated-claude-dev-([a-f0-9]{40})$/);
assert.ok(explicit||generated||legacy,'Unexpected publication branch.');
const receipt=JSON.parse(await fs.readFile(new URL('../releases/'+(explicit?'plugins-'+explicit[1]:generated?'plugins-dev':'claude-dev')+'.json',import.meta.url),'utf8'));
if(explicit){assert.equal(receipt.environment,explicit[1]);assert.equal(receipt.requestId,explicit[2]);assert.equal(receipt.ownerRequested,true);assert.match(receipt.expectedPublicCommit,/^[a-f0-9]{40}$/);assert.equal(execFileSync('git',['rev-parse','HEAD^'],{encoding:'utf8'}).trim(),receipt.expectedPublicCommit);}
else assert.equal((generated??legacy)[1],receipt.sourceCommit);
assert.ok(process.env.GH_TOKEN);const headers={Authorization:'Bearer '+process.env.GH_TOKEN,Accept:'application/vnd.github+json','Content-Type':'application/json','X-GitHub-Api-Version':'2022-11-28'},api='https://api.github.com/repos/'+repository;
const head=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const request=async(url,options={})=>{const result=await fetch(api+url,{...options,headers});assert.ok(result.ok,'GitHub publication request failed: '+result.status);return result.status===204?null:result.json();};
const existing=await request('/pulls?state=open&base=main&head='+encodeURIComponent('hockenmaier:'+branch));
const pull=existing[0]??await request('/pulls',{method:'POST',body:JSON.stringify({title:(explicit?'Publish '+receipt.environment+' plugins ':'Update Claude dev distribution to ')+receipt.version,head:branch,base:'main',body:'Import verified installation files from source '+receipt.sourceCommit+'. Public inventory, hashes, license and package checks passed on '+head+'.\n\n'+(explicit?'The owner requested this publication through the private release console. Merge only the validated head while the public base remains unchanged.':'Review and merge this development update. Production packages are unchanged.')})});
console.log(pull.html_url);
