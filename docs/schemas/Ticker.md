# Ticker

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `instrumentId` | string | Yes | Canonical instrument ID from GET /api/products. Use the ID, not the display symbol. |
| `lastPrice` | string or null | Yes | Last executed exchange price; null when unavailable. Not the external index. |
| `change` | string or null | Yes | Percentage change over exchange trades in the last 24 hours; null with no trades. |
| `volume` | string | Yes | Volume. |
| `bid` | DepthLevel or null | Yes |  |
| `ask` | DepthLevel or null | Yes |  |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
