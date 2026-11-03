# Account executions

`GET /api/trades`

Latest 200 account trades across instruments, descending sequence. buyerId and sellerId determine your side. Public /market strips counterparty identity.

## Authentication

Bearer JWT or an HMAC-signed Read/Trade API key. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

## Behavior

Latest 200 account trades across instruments, descending sequence. buyerId and sellerId determine your side. Public /market strips counterparty identity.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/trades" -H "Authorization: Bearer $NOVCIC_TOKEN"
```

## Response

Response type: [Trade[]](/schemas/Trade). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `instrumentId` | string | Yes | Canonical instrument ID from GET /api/products. Use the ID, not the display symbol. |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `sequence` | string | Yes | Monotonic database sequence represented as a string. Gaps are valid. |
| `buyerFee` | string or null | Yes | Buyer fee. |
| `sellerFee` | string or null | Yes | Seller fee. |
| `buyerFeeAsset` | string or null | Yes | Buyer fee asset. |
| `sellerFeeAsset` | string or null | Yes | Seller fee asset. |
| `makerOrderId` | string (uuid) | Yes | Maker order id. |
| `takerOrderId` | string (uuid) | Yes | Taker order id. |
| `buyerId` | string (uuid) | Yes | Buyer id. |
| `sellerId` | string (uuid) | Yes | Seller id. |
| `takerSide` | string | Yes | Taker side. |
| `price` | string | Yes | USDT price per BTC. |
| `quantity` | string | Yes | BTC quantity. Signed quantities on positions: positive long, negative short. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
[]
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
