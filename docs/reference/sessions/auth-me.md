# Current account

`GET /api/auth/me`

Returns account ID, email, country, username and avatar.

## Authentication

Bearer JWT or an HMAC-signed Read/Trade API key. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

## Behavior

Returns account ID, email, country, username and avatar.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/auth/me" -H "Authorization: Bearer $NOVCIC_TOKEN"
```

## Response

Response type: [User](/schemas/User). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `email` | string | Yes | Email. |
| `country` | string | Yes | Country. |
| `username` | string | Yes | Username. |
| `avatar` | string | Yes | Avatar. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "id": "11111111-1111-4111-8111-111111111111",
  "email": "string",
  "country": "string",
  "username": "string",
  "avatar": "string"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
