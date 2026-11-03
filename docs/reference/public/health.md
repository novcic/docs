# Service health

`GET /api/health`

Returns ready when the API can reach its database. This does not guarantee fresh market references.

## Authentication

No credentials required. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

## Behavior

Returns ready when the API can reach its database. This does not guarantee fresh market references.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/health"
```

## Response

Response type: [Health](/schemas/Health). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "status": "string"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
