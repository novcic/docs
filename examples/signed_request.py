"""Python 3 standard-library client. Default request is read-only."""
import hashlib,hmac,json,os,sys,time,uuid,urllib.request,urllib.error

def signature(secret,timestamp,nonce,method,path,command_key='',body=''):
    canonical='\n'.join([timestamp,nonce,method.upper(),path,command_key,body])
    return hmac.new(secret.encode('utf-8'),canonical.encode('utf-8'),hashlib.sha256).hexdigest()

def request(method='GET',path='/api/balances',body='',command_key=''):
    method=method.upper()
    if not path.startswith('/api/'):raise ValueError('Use an exact /api/ path including its raw query.')
    if method=='POST' and not command_key:raise ValueError('Persist and supply a command UUID for POST.')
    timestamp=str(time.time_ns()//1_000_000);nonce=str(uuid.uuid4())
    headers={'X-Api-Key':os.environ['NOVCIC_KEY'],'X-Api-Timestamp':timestamp,'X-Api-Nonce':nonce,'X-Api-Signature':signature(os.environ['NOVCIC_SECRET'],timestamp,nonce,method,path,command_key,body)}
    if command_key:headers['Idempotency-Key']=command_key
    if body:headers['Content-Type']='application/json'
    url=os.environ.get('NOVCIC_URL','http://127.0.0.1:8081').rstrip('/')+path
    req=urllib.request.Request(url,data=body.encode('utf-8') if body else None,headers=headers,method=method)
    with urllib.request.urlopen(req,timeout=15) as response:return json.load(response)

if __name__=='__main__':
    try:print(json.dumps(request(*sys.argv[1:]),indent=2))
    except Exception as error:
        print(str(error),file=sys.stderr)
        print('For an unknown POST outcome, retry the same command key and exact body.',file=sys.stderr)
        sys.exit(1)
