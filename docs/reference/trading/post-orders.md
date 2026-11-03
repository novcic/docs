# Place order

`POST /api/orders`

Price-time matching on the canonical instrument. A successful HTTP response is not a guarantee of a full fill: inspect status, remaining and cancelReason. Market remainders cancel; no fabricated liquidity. Self-trade prevention cancels the incoming remainder.

## Authentication

Bearer JWT or an HMAC-signed Trade API key. Read keys cannot submit this command. See [authentication](/guides/authentication).

**Idempotency-Key is required.** Retrying the same operation must reuse the key and unchanged payload. See [safe retries](/guides/retries).

## Parameters

| Parameter | Location | Required | Meaning |
| --- | --- | --- | --- |
| `Idempotency-Key` | header | Yes | Reuse unchanged for retries of this operation. |

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `side` | string | Yes | Side. Values: `Buy`, `Sell`. |
| `type` | string | Yes | Type. Values: `Limit`, `Market`. |
| `quantity` | string | Yes | Positive BTC quantity in multiples of 0.000001. |
| `price` | string or null | No | Positive USDT price in multiples of 0.01 for Limit; null for Market. |
| `instrument` | string | No | Canonical products.instruments[].id. Default BTCUSDT (spot). Perpetual uses BTC-PERP internally; display symbol BTCUSDT. |
| `leverage` | string | No | Integer leverage 1 through 10, serialized as a string. |
| `reduceOnly` | boolean | No | If true, execution must reduce an existing derivative position. |

## Behavior

Price-time matching on the canonical instrument. A successful HTTP response is not a guarantee of a full fill: inspect status, remaining and cancelReason. Market remainders cancel; no fabricated liquidity. Self-trade prevention cancels the incoming remainder.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/orders" -H "Authorization: Bearer $NOVCIC_TOKEN" -H "Idempotency-Key: $REQUEST_ID" -H 'Content-Type: application/json' --data '{"side":"Buy","type":"Limit","quantity":"0.001000","price":"75000.00","instrument":"BTCUSDT","leverage":"1","reduceOnly":false}'
```

## Response

Response type: [Order](/schemas/Order). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `instrumentId` | string | Yes | Canonical instrument ID from GET /api/products. Use the ID, not the display symbol. |
| `leverage` | string | Yes | Integer leverage 1 through 10, serialized as a string. |
| `reduceOnly` | boolean | Yes | If true, execution must reduce an existing derivative position. |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `sequence` | string | Yes | Monotonic database sequence represented as a string. Gaps are valid. |
| `side` | string | Yes | Side. |
| `type` | string | Yes | Type. |
| `price` | string or null | Yes | USDT price per BTC. |
| `quantity` | string | Yes | BTC quantity. Signed quantities on positions: positive long, negative short. |
| `remaining` | string | Yes | Unfilled BTC quantity. |
| `reserved` | string | Yes | Funds reserved by this resource. |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. |
| `cancelReason` | string or null | Yes | Cancel reason. |
| `quoteValidatedAt` | string (date-time) or null | Yes | Internal maker quote freshness timestamp, nullable for participant orders. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "instrumentId": "string",
  "leverage": "0",
  "reduceOnly": false,
  "id": "11111111-1111-4111-8111-111111111111",
  "userId": "11111111-1111-4111-8111-111111111111",
  "sequence": "0",
  "side": "string",
  "type": "string",
  "price": null,
  "quantity": "0",
  "remaining": "0",
  "reserved": "0",
  "status": "string",
  "cancelReason": null,
  "quoteValidatedAt": null,
  "createdAt": "2026-11-03T12:00:00Z"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. A timeout or 5xx can leave the result unknown: retry the same command key, then reconcile account state.  See [errors and limits](/guides/errors).
