# Cancel order

`POST /api/orders/{id}/cancel`

Only your own open or partially-filled order may be cancelled. A new cancel intent for a closed order returns 400. Replaying the same successful command key returns its original receipt. A fill may win the race before cancellation.

## Authentication

Bearer JWT or an HMAC-signed Trade API key. Read keys cannot submit this command. See [authentication](/guides/authentication).

**Idempotency-Key is required.** Retrying the same operation must reuse the key and unchanged payload. See [safe retries](/guides/retries).

## Parameters

| Parameter | Location | Required | Meaning |
| --- | --- | --- | --- |
| `Idempotency-Key` | header | Yes | Reuse unchanged for retries of this operation. |
| `id` | path | Yes | Resource UUID. |

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |


## Behavior

Only your own open or partially-filled order may be cancelled. A new cancel intent for a closed order returns 400. Replaying the same successful command key returns its original receipt. A fill may win the race before cancellation.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/orders/11111111-1111-4111-8111-111111111111/cancel" -H "Authorization: Bearer $NOVCIC_TOKEN" -H "Idempotency-Key: $REQUEST_ID" -H 'Content-Type: application/json' --data '{}'
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
| `filledNotional` | string | Yes | Cumulative executed notional in USDT across all fills. |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. |
| `cancelReason` | string or null | Yes | Cancel reason. |
| `quoteValidatedAt` | string (date-time) or null | Yes | Internal maker quote freshness timestamp, nullable for participant orders. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |
| `averageExecutionPrice` | string or null | Yes | All execution notional divided by filled quantity, excluding fees; null when unfilled. |

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
  "filledNotional": "0",
  "status": "string",
  "cancelReason": null,
  "quoteValidatedAt": null,
  "createdAt": "2026-11-03T12:00:00Z",
  "averageExecutionPrice": null
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. A timeout or 5xx can leave the result unknown: retry the same command key, then reconcile account state.  See [errors and limits](/guides/errors).
