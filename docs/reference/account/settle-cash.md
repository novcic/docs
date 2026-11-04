# Settle derivative cash

`POST /api/settle-cash`

Transfers signed USDT settlement claims, including fee receivables, from funded clearing liquidity. Can settle partially; pending remains in risk.realizedCash. No cash is created to satisfy an unfunded profit claim.

## Authentication

Bearer JWT session only. Signed API keys cannot call this operation. See [authentication](/guides/authentication).

**Idempotency-Key is required.** Retrying the same operation must reuse the key and unchanged payload. See [safe retries](/guides/retries).

## Parameters

| Parameter | Location | Required | Meaning |
| --- | --- | --- | --- |
| `Idempotency-Key` | header | Yes | Reuse unchanged for retries of this operation. |

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |


## Behavior

Transfers signed USDT settlement claims, including fee receivables, from funded clearing liquidity. Can settle partially; pending remains in risk.realizedCash. No cash is created to satisfy an unfunded profit claim.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/settle-cash" -H "Authorization: Bearer $NOVCIC_TOKEN" -H "Idempotency-Key: $REQUEST_ID" -H 'Content-Type: application/json' --data '{}'
```

## Response

Response type: [Settlement](/schemas/Settlement). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `message` | string | Yes | Message. |
| `amount` | string | No | Token amount unless the endpoint explicitly states shares. |
| `pending` | string | No | Pending. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "message": "string",
  "amount": "0",
  "pending": "0"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. A timeout or 5xx can leave the result unknown: retry the same command key, then reconcile account state.  See [errors and limits](/guides/errors).
