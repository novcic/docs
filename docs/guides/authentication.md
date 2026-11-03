# Authentication

## Permissions

| Credential | Read account data | Orders, previews, leverage | Transfers, custody writes, Earn, LP, DCA | Manage keys |
| --- | --- | --- | --- | --- |
| Public | Public routes only | No | No | No |
| Read HMAC key | Yes | No | No | No |
| Trade HMAC key | Yes | Yes | No | No |
| JWT session | Yes | Yes | Yes | Yes |

Create keys through the exchange API access page or `POST /api/keys` with a JWT session. Names are limited to 60 characters. At most ten active, unexpired keys are allowed per account. Keys expire after 90 days. The secret is returned only at creation; list responses contain metadata only. Revoking a key prevents subsequent authentication.

## HMAC headers

| Header | Value |
| --- | --- |
| `X-Api-Key` | Key UUID returned at creation |
| `X-Api-Timestamp` | UTC Unix time in milliseconds as decimal text |
| `X-Api-Nonce` | Fresh UUID per HTTP attempt |
| `X-Api-Signature` | Hex-encoded HMAC-SHA256 digest |
| `Idempotency-Key` | Stable command UUID on financial POSTs |
| `Content-Type` | `application/json` when sending a JSON body |

The timestamp must be within 30 seconds of server time in either direction. Synchronize your host clock. Nonces cannot be replayed within their validity window, even if the signature is otherwise correct.

Construct exactly six lines, joined with LF (`\n`), with **no additional trailing newline**:

```text
timestamp
nonce
UPPERCASE_HTTP_METHOD
/api/path?raw=query
idempotency-key-or-empty
exact-request-body-or-empty
```

The path includes the original query string in its transmitted order and encoding, but excludes origin and fragment. Serialize JSON once and sign the same UTF-8 bytes you send. Whitespace, property order, escaping and query ordering matter to signatures. GET normally has an empty fifth and sixth line.

**Use the returned secret string as UTF-8 text. Do not hex-decode it before using it as the HMAC key.** The secret looks hexadecimal, but the server signs with its literal UTF-8 representation.

```javascript
import {createHmac, randomUUID} from 'node:crypto';
const timestamp = Date.now().toString();
const nonce = randomUUID();
const method = 'GET', path = '/api/balances', body = '', commandKey = '';
const canonical = [timestamp, nonce, method, path, commandKey, body].join('\n');
const signature = createHmac('sha256', process.env.NOVCIC_SECRET)
  .update(canonical, 'utf8').digest('hex');
```

Complete runnable [JavaScript](https://github.com/novcic/docs/blob/master/examples/signed-request.mjs) and [Python](https://github.com/novcic/docs/blob/master/examples/signed_request.py) examples include response handling and deterministic test vectors. Keep keys in server-side environment variables; never embed them in browser bundles or documentation URLs.

## JWT sessions

Register or log in to receive `accessToken`, `expiresAt`, and a minimal `user`. Send `Authorization: Bearer <accessToken>` for private requests. Access tokens last ten minutes. Login and registration also set the HttpOnly `novcic_refresh` cookie, scoped to `/api/auth`, with SameSite Strict and a seven-day lifetime. Secure-cookie behavior is deployment-configured; deployed HTTPS environments should enable it.

`POST /api/auth/refresh` rotates the refresh token. Serialize refresh calls: replaying an already-used refresh token revokes the whole session family. Logout revokes that family and clears the cookie; an already-issued access JWT remains valid until expiry. Non-browser clients must maintain a cookie jar for session refresh.

Send same-origin requests from the exchange browser application. Cross-origin POSTs with a mismatched `Origin` authority are rejected. The documentation site does not collect or store credentials, and there is no browser trading console in these docs.

## Diagnose authentication failures

For 401, check key expiry/revocation, scope, clock skew, nonce reuse, path encoding, exact body, and secret encoding. Some 401 responses have no JSON body. Public routes do not require signed headers. `/api/keys` explicitly requires JWT even when the operation is GET.
