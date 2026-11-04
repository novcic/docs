# Preview order affordability

`POST /api/order-preview`

Price-based estimates with no depth cap or simulated execution. Market pricing uses last trade, otherwise reference index/theoretical option premium. Limit uses entered price. quantity=0 estimates Max. Reduce-only Max is the opposite open position size and is not capped by cash USDT or new margin; its fee estimate remains payable through settlement. Returns referencePrice and priceSource. No writes, sequence allocation or Idempotency-Key. Actual fills and risk revalidate on execution. HMAC keys require instrument product permission.

## Authentication

Bearer JWT or an HMAC-signed Read/Trade API key. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `side` | string | Yes | Side. |
| `type` | string | Yes | Type. |
| `price` | string or null | No | USDT price per BTC. |
| `instrument` | string | No | Instrument. |
| `reduceOnly` | boolean | No | If true, execution must reduce an existing derivative position. |
| `quantity` | string | No | BTC quantity. Signed quantities on positions: positive long, negative short. |

## Behavior

Price-based estimates with no depth cap or simulated execution. Market pricing uses last trade, otherwise reference index/theoretical option premium. Limit uses entered price. quantity=0 estimates Max. Reduce-only Max is the opposite open position size and is not capped by cash USDT or new margin; its fee estimate remains payable through settlement. Returns referencePrice and priceSource. No writes, sequence allocation or Idempotency-Key. Actual fills and risk revalidate on execution. HMAC keys require instrument product permission.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/order-preview" -H "Authorization: Bearer $NOVCIC_TOKEN" -H 'Content-Type: application/json' --data '{"side":"Buy","type":"Market","price":null,"instrument":"BTCUSDT","quantity":"0","reduceOnly":false}'
```

## Response

Response type: [OrderPreview](/schemas/OrderPreview). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `maximumQuantity` | string | Yes | Maximum quantity. |
| `quantity` | string | Yes | BTC quantity. Signed quantities on positions: positive long, negative short. |
| `fee` | string | Yes | Fee. |
| `feeAsset` | string | Yes | Fee asset. |
| `netReceipt` | string | Yes | Net receipt. |
| `orderCost` | string | Yes | Order cost. |
| `orderCostAsset` | string | Yes | Order cost asset. |
| `revision` | string | Yes | Revision. |
| `error` | string or null | No | Human-readable error; nullable on transfer history. |
| `referencePrice` | string or null | No | Reference price. |
| `priceSource` | string | Yes | Price source. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "maximumQuantity": "0",
  "quantity": "0",
  "fee": "0",
  "feeAsset": "string",
  "netReceipt": "0",
  "orderCost": "0",
  "orderCostAsset": "string",
  "revision": "0",
  "error": null,
  "referencePrice": null,
  "priceSource": "string"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
