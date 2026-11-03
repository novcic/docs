# Position

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `instrumentId` | string | Yes | Canonical instrument ID from GET /api/products. Use the ID, not the display symbol. |
| `quantity` | string | Yes | BTC quantity. Signed quantities on positions: positive long, negative short. |
| `entryPrice` | string | Yes | Average entry price; up to 16 decimal places. |
| `cost` | string | Yes | Signed USDT position cost basis, used for exact realized P&L. |
| `leverage` | string | Yes | Integer leverage 1 through 10, serialized as a string. |
| `realizedPnl` | string | Yes | Realized pnl. |
| `reserved` | string | Yes | Funds reserved by this resource. |
| `updatedAt` | string (date-time) | Yes | Updated at. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
