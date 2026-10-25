import assert from 'node:assert/strict';

export function sourceFiles(version){
  assert.match(version,/^\d+\.\d+\.\d+$/);
  const [major,minor,patch]=version.split('.').map(Number);
  const references=major>0||minor>7||(minor===7&&patch>=31);
  return ['.claude-plugin/plugin.json','.mcp.json','README.md','assets/icon.png',
    'skills/print-ready/SKILL.md','skills/print-ready/references/service-menu.md','skills/welcome/SKILL.md',
    ...(references?['skills/openscad-cheatsheet/SKILL.md','skills/openscad-cheatsheet/references/cheatsheet.md',
      'skills/openscad-cheatsheet/references/cheatsheet.html','skills/bosl2-cheatsheet/SKILL.md',
      'skills/bosl2-cheatsheet/references/bosl2-basics.md']:[])];
}
