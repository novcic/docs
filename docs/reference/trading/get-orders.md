# Account orders

`GET /api/orders`

Latest 200 account orders, descending sequence, then filtered to API-key product permissions. Includes closed orders. No cursor, offset or history export endpoint is implemented.

## Authentication

Bearer JWT or an HMAC-signed Read/Trade API key. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

## Behavior

Latest 200 account orders, descending sequence, then filtered to API-key product permissions. Includes closed orders. No cursor, offset or history export endpoint is implemented.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/orders" -H "Authorization: Bearer $NOVCIC_TOKEN"
```

## Response

Response type: [Order[]](/schemas/Order). No envelope or `retCode` wrapper is added.

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
[]
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
