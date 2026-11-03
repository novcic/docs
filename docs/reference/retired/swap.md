# Retired swap

`POST /api/swap`

Returns 410 Gone. Use liquidity-deposit/liquidity-withdraw, or place ordinary spot orders against the integrated AMM.

## Authentication

Bearer JWT session only. Signed API keys cannot call this operation. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |


## Behavior

Returns 410 Gone. Use liquidity-deposit/liquidity-withdraw, or place ordinary spot orders against the integrated AMM.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/swap" -H "Authorization: Bearer $NOVCIC_TOKEN" -H 'Content-Type: application/json' --data '{}'
```

## Response

Response type: [Error](/schemas/Error). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `error` | string | Yes | Human-readable error; nullable on transfer history. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "error": "string"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON. Returns 410 Gone. Use liquidity-deposit/liquidity-withdraw, or place ordinary spot orders against the integrated AMM. See [errors and limits](/guides/errors).
