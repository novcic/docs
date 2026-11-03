# List API keys

`GET /api/keys`

Lists key metadata including expired/revoked keys. Secrets are never returned here. Signed API keys cannot manage keys.

## Authentication

Bearer JWT session only. Signed API keys cannot call this operation. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

## Behavior

Lists key metadata including expired/revoked keys. Secrets are never returned here. Signed API keys cannot manage keys.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/keys" -H "Authorization: Bearer $NOVCIC_TOKEN"
```

## Response

Response type: [ApiKey[]](/schemas/ApiKey). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `name` | string | Yes | Name. |
| `scope` | string | Yes | Scope. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |
| `expiresAt` | string (date-time) | Yes | UTC expiry timestamp. |
| `revoked` | boolean | Yes | Revoked. |
| `products` | string[] | Yes | Product permissions. Omitted on creation defaults to Spot. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
[]
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
