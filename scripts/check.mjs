import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const manifest=JSON.parse(await readFile('branding/manifest.json','utf8'));
for(const [file,hash] of Object.entries(manifest.files))assert.equal(createHash('sha256').update((await readFile(file,'utf8')).replaceAll('\r\n','\n')).digest('hex'),hash,`Branding drift: ${file}. Synchronize from the exchange.`);
const spec=JSON.parse(await readFile('api/openapi.json','utf8')),routes=JSON.parse(await readFile('api/endpoints.json','utf8'));
assert.equal(await readFile('api/openapi.json','utf8'),await readFile('static/openapi.json','utf8'),'Downloadable contract drift');
for(const e of routes){assert(spec.paths[e.path]?.[e.method.toLowerCase()],`${e.method} ${e.path} missing`);assert(spec.components.schemas[e.response.replace('[]','')]);}
function refs(x){if(!x||typeof x!=='object')return;if(x.$ref)assert(spec.components.schemas[x.$ref.split('/').pop()],`Unresolved ${x.$ref}`);for(const v of Object.values(x))refs(v);}refs(spec);
const files=[];async function walk(dir){for(const f of await readdir(dir,{withFileTypes:true})){const p=dir+'/'+f.name;if(f.isDirectory())await walk(p);else if(p.endsWith('.md'))files.push(p);}}await walk('docs/reference');assert.equal(files.length,routes.length,'Every operation needs an endpoint page.');
console.log(`Contract: ${routes.length} operations; branding ${manifest.version} verified.`);
