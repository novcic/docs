import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {signature} from './signed-request.mjs';
const vectors=JSON.parse(readFileSync(new URL('./signing-vectors.json',import.meta.url),'utf8'));
for(const v of vectors)test(v.name,()=>{
  const args=[v.secret,v.timestamp,v.nonce,v.method,v.path,v.commandKey,v.body];
  assert.equal(signature(...args),v.signature);
  assert.notEqual(signature(...args.slice(0,6),v.body+' '),v.signature,'Body whitespace must change the signature');
});
