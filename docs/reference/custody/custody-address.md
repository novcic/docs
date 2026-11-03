# Deposit address

`POST /api/custody/address`

Returns the account deposit address, creating it once if needed. The same address is used for supported ERC-20 tokens. This route is naturally idempotent and does not use command receipts.

## Authentication

Bearer JWT session only. Signed API keys cannot call this operation. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |


## Behavior

Returns the account deposit address, creating it once if needed. The same address is used for supported ERC-20 tokens. This route is naturally idempotent and does not use command receipts.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/custody/address" -H "Authorization: Bearer $NOVCIC_TOKEN" -H 'Content-Type: application/json' --data '{}'
```

## Response

Response type: [Address](/schemas/Address). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `address` | string | Yes | Address. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "address": "string"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
