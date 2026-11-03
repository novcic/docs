import {readdir,readFile,writeFile} from 'node:fs/promises';
async function walk(dir){const out=[];for(const f of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+f.name;if(f.isDirectory())out.push(...await walk(path));else if(/\.mdx?$/.test(path))out.push(path);}return out;}
const entries=[];for(const file of await walk('docs')){const raw=await readFile(file,'utf8'),id=file.replace(/^docs\//,'').replace(/\.mdx?$/,'');entries.push({title:raw.match(/^# (.+)/m)?.[1]||id,url:id==='guide'?'/':'/'+id,section:id.split('/')[0],text:raw.replace(/---[\s\S]*?---/,'').replace(/[`#*<>]/g,'').slice(0,24000)});}
await writeFile('src/search-index.json',JSON.stringify(entries));console.log(`Indexed ${entries.length} documentation pages.`);
