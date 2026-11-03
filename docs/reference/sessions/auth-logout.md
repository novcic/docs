# Sign out

`POST /api/auth/logout`

Revokes the refresh session family, if present, and clears its cookie. Already-issued access tokens expire normally.

## Authentication

Send the HttpOnly `novcic_refresh` cookie from login/register. Logout also succeeds without a cookie. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |


## Behavior

Revokes the refresh session family, if present, and clears its cookie. Already-issued access tokens expire normally.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/auth/logout" -b cookies.txt -c cookies.txt -H 'Content-Type: application/json' --data '{}'
```

## Response

Response type: [Message](/schemas/Message). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `message` | string | Yes | Message. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "message": "string"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
