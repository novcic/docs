# Amend a limit price

`POST /api/amend-order`

Atomically cancels/replaces the remaining quantity of an owned open/partially filled limit order. Uses opaque Order.version and matching instrument permission. Preserves prior fills; replacement has a new ID/priority and replacesId. Crossing price may execute immediately. Opening orders retain ordinary balance, margin and fee checks; reduce-only replacements use the same no-new-margin and fee-accrual rules as reduce-only placement. Futures replacements use the same directional limits as placement: buys at most 110% of the reference index; sells at least 90%; the passive side is not capped by this band. Failure leaves original order unchanged; same price is a no-op.

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
| `instrument` | string | Yes | Instrument. |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `version` | string | Yes | Version. |
| `price` | string | Yes | USDT price per BTC. |

## Behavior

Atomically cancels/replaces the remaining quantity of an owned open/partially filled limit order. Uses opaque Order.version and matching instrument permission. Preserves prior fills; replacement has a new ID/priority and replacesId. Crossing price may execute immediately. Opening orders retain ordinary balance, margin and fee checks; reduce-only replacements use the same no-new-margin and fee-accrual rules as reduce-only placement. Futures replacements use the same directional limits as placement: buys at most 110% of the reference index; sells at least 90%; the passive side is not capped by this band. Failure leaves original order unchanged; same price is a no-op.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/amend-order" -H "Authorization: Bearer $NOVCIC_TOKEN" -H "Idempotency-Key: $REQUEST_ID" -H 'Content-Type: application/json' --data '{"instrument":"BTCUSDT","id":"11111111-1111-4111-8111-111111111111","version":"123:0.01000000:Open","price":"75000.00"}'
```

## Response

Response type: [Order](/schemas/Order). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `closingJobId` | string (uuid) or null | Yes | Closing job id. |
| `replacesId` | string (uuid) or null | Yes | Replaces id. |
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
| `filledNotional` | string | Yes | Cumulative executed notional in USDT across all fills. |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. |
| `cancelReason` | string or null | Yes | Cancel reason. |
| `quoteValidatedAt` | string (date-time) or null | Yes | Internal maker quote freshness timestamp, nullable for participant orders. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |
| `averageExecutionPrice` | string or null | Yes | All execution notional divided by filled quantity, excluding fees; null when unfilled. |
| `version` | string | Yes | Opaque optimistic concurrency token. Send unchanged to amend-order; fills/cancellation invalidate it. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "closingJobId": null,
  "replacesId": null,
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
  "filledNotional": "0",
  "status": "string",
  "cancelReason": null,
  "quoteValidatedAt": null,
  "createdAt": "2026-11-03T12:00:00Z",
  "averageExecutionPrice": null,
  "version": "string"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. A timeout or 5xx can leave the result unknown: retry the same command key, then reconcile account state.  See [errors and limits](/guides/errors).
