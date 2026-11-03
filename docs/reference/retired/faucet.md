# Disabled development faucet

`POST /api/faucet`

Disabled in the configured exchange; returns 404. Local test funding is an operator CLI operation, not a public funding API.

## Authentication

Bearer JWT session only. Signed API keys cannot call this operation. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |


## Behavior

Disabled in the configured exchange; returns 404. Local test funding is an operator CLI operation, not a public funding API.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/faucet" -H "Authorization: Bearer $NOVCIC_TOKEN" -H 'Content-Type: application/json' --data '{}'
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

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON. Disabled in the configured exchange; returns 404. Local test funding is an operator CLI operation, not a public funding API. See [errors and limits](/guides/errors).
