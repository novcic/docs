# Subscribe to Earn

`POST /api/supply`

Moves Unified Trading funds to the lending pool and issues shares at the current pool unit value. Interest accrues before subscription.

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
| `asset` | string | Yes | BTC or USDT. Values: `BTC`, `USDT`. |
| `amount` | string | Yes | Supply: asset units. Redeem: share units. Positive, up to eight decimal places. |

## Behavior

Moves Unified Trading funds to the lending pool and issues shares at the current pool unit value. Interest accrues before subscription.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/supply" -H "Authorization: Bearer $NOVCIC_TOKEN" -H "Idempotency-Key: $REQUEST_ID" -H 'Content-Type: application/json' --data '{"asset":"USDT","amount":"100.00000000"}'
```

## Response

Response type: [Supply](/schemas/Supply). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `asset` | string | Yes | BTC or USDT. |
| `shares` | string | Yes | Product units, not necessarily token amounts. |
| `queuedShares` | string | Yes | Earn units requested for redemption, still included in shares until paid. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "userId": "11111111-1111-4111-8111-111111111111",
  "asset": "string",
  "shares": "0",
  "queuedShares": "0"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. A timeout or 5xx can leave the result unknown: retry the same command key, then reconcile account state.  See [errors and limits](/guides/errors).
