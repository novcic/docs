# Sign in

`POST /api/auth/login`

Returns access token and refresh cookie. Invalid credentials return 401. Registration, login and refresh share a fixed-window limit of 30 requests per minute per IP.

## Authentication

No credentials required. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `email` | string | Yes | Email. |
| `password` | string | Yes | Password. |

## Behavior

Returns access token and refresh cookie. Invalid credentials return 401. Registration, login and refresh share a fixed-window limit of 30 requests per minute per IP.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/auth/login" -H 'Content-Type: application/json' --data '{"email":"trader@example.com","password":"your-password"}'
```

## Response

Response type: [Session](/schemas/Session). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `accessToken` | string | Yes | Access token. |
| `expiresAt` | string (date-time) | Yes | UTC expiry timestamp. |
| `user` | User | Yes |  |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "accessToken": "string",
  "expiresAt": "2026-11-03T12:00:00Z",
  "user": {
    "id": "11111111-1111-4111-8111-111111111111",
    "email": "string",
    "country": "string"
  }
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
