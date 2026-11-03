# Create API key

`POST /api/keys`

Name is required, maximum 60 characters. Scope is Read (Read-Only) or Trade (Read-Write). products selects Spot, Perpetual, Future and/or Option; omitted defaults to Spot. Permissions are immutable. Maximum ten unexpired active keys. Expiry is 90 days. Store secret from this one response; a retry creates another key.

## Authentication

Bearer JWT session only. Signed API keys cannot call this operation. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `name` | string | Yes | Name. |
| `scope` | string | Yes | Scope. Values: `Read`, `Trade`. |
| `products` | string[] | No | Product permissions. Omitted on creation defaults to Spot. |

## Behavior

Name is required, maximum 60 characters. Scope is Read (Read-Only) or Trade (Read-Write). products selects Spot, Perpetual, Future and/or Option; omitted defaults to Spot. Permissions are immutable. Maximum ten unexpired active keys. Expiry is 90 days. Store secret from this one response; a retry creates another key.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/keys" -H "Authorization: Bearer $NOVCIC_TOKEN" -H 'Content-Type: application/json' --data '{"name":"Trading integration","scope":"Trade"}'
```

## Response

Response type: [NewApiKey](/schemas/NewApiKey). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `secret` | string | Yes | Secret. |
| `scope` | string | Yes | Scope. |
| `expiresAt` | string (date-time) | Yes | UTC expiry timestamp. |
| `products` | string[] | Yes | Product permissions. Omitted on creation defaults to Spot. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "id": "11111111-1111-4111-8111-111111111111",
  "secret": "string",
  "scope": "string",
  "expiresAt": "2026-11-03T12:00:00Z",
  "products": []
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
