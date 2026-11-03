# Trade

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `instrumentId` | string | Yes | Canonical instrument ID from GET /api/products. Use the ID, not the display symbol. |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `sequence` | string | Yes | Monotonic database sequence represented as a string. Gaps are valid. |
| `makerOrderId` | string (uuid) | Yes | Maker order id. |
| `takerOrderId` | string (uuid) | Yes | Taker order id. |
| `buyerId` | string (uuid) | Yes | Buyer id. |
| `sellerId` | string (uuid) | Yes | Seller id. |
| `takerSide` | string | Yes | Taker side. |
| `price` | string | Yes | USDT price per BTC. |
| `quantity` | string | Yes | BTC quantity. Signed quantities on positions: positive long, negative short. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
