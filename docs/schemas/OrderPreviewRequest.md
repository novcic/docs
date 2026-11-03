# OrderPreviewRequest

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `side` | string | Yes | Side. |
| `type` | string | Yes | Type. |
| `price` | string or null | No | USDT price per BTC. |
| `instrument` | string | No | Instrument. |
| `reduceOnly` | boolean | No | If true, execution must reduce an existing derivative position. |
| `quantity` | string | No | BTC quantity. Signed quantities on positions: positive long, negative short. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
