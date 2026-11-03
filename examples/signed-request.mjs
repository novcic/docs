import {createHmac, randomUUID} from 'node:crypto';
import {pathToFileURL} from 'node:url';

export function signature(secret,timestamp,nonce,method,path,commandKey='',body='') {
  return createHmac('sha256',secret).update([timestamp,nonce,method.toUpperCase(),path,commandKey,body].join('\n'),'utf8').digest('hex');
}
export async function signedRequest(method,path,body='',commandKey='') {
  method=method.toUpperCase();
  if(!path.startsWith('/api/'))throw new Error('Use an exact /api/ path, including the raw query.');
  if(method==='POST'&&!commandKey)throw new Error('Persist and pass a command UUID before submitting a financial POST.');
  const key=process.env.NOVCIC_KEY,secret=process.env.NOVCIC_SECRET;
  if(!key||!secret)throw new Error('Set NOVCIC_KEY and NOVCIC_SECRET in your environment.');
  const timestamp=Date.now().toString(),nonce=randomUUID();
  const headers={'X-Api-Key':key,'X-Api-Timestamp':timestamp,'X-Api-Nonce':nonce,'X-Api-Signature':signature(secret,timestamp,nonce,method,path,commandKey,body)};
  if(commandKey)headers['Idempotency-Key']=commandKey;
  if(body)headers['Content-Type']='application/json';
  const response=await fetch((process.env.NOVCIC_URL||'http://127.0.0.1:8081').replace(/\/$/,'')+path,{method,headers,body:body||undefined,signal:AbortSignal.timeout(15000)});
  const text=await response.text();
  if(!response.ok)throw new Error(`HTTP ${response.status}: ${text||response.statusText}`);
  return text?JSON.parse(text):null;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const [method='GET',path='/api/balances',body='',commandKey='']=process.argv.slice(2);
  try{console.log(JSON.stringify(await signedRequest(method,path,body,commandKey),null,2));}
  catch(error){console.error(error.message);if(method.toUpperCase()==='POST')console.error('If the outcome is unknown, retry the same key and exact body. Do not generate a new command key.');process.exitCode=1;}
}
