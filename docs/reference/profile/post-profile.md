# Update profile

`POST /api/profile`

Username: 3-24 ASCII letters, digits or underscores, case-insensitive unique. Avatar: default, fern, sunrise, river, mountain, moon, oak, meadow or fox. Birth date is optional, private and cannot be future. No command receipt required.

## Authentication

Bearer JWT session only. Signed API keys cannot call this operation. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `username` | string | Yes | Username. |
| `avatar` | string | Yes | Avatar. |
| `dateOfBirth` | string (date) or null | No | Date of birth. |

## Behavior

Username: 3-24 ASCII letters, digits or underscores, case-insensitive unique. Avatar: default, fern, sunrise, river, mountain, moon, oak, meadow or fox. Birth date is optional, private and cannot be future. No command receipt required.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/profile" -H "Authorization: Bearer $NOVCIC_TOKEN" -H 'Content-Type: application/json' --data '{"username":"Trader_123","avatar":"fern","dateOfBirth":null}'
```

## Response

Response type: [Profile](/schemas/Profile). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `email` | string | Yes | Email. |
| `country` | string | Yes | Country. |
| `username` | string | Yes | Username. |
| `avatar` | string | Yes | Avatar. |
| `dateOfBirth` | string (date) or null | Yes | Date of birth. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "id": "11111111-1111-4111-8111-111111111111",
  "email": "string",
  "country": "string",
  "username": "string",
  "avatar": "string",
  "dateOfBirth": null
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
