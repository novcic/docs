# Order

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

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

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
