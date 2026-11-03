# DepthLevel

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `price` | string | Yes | USDT price per BTC. |
| `quantity` | string | Yes | BTC quantity. Signed quantities on positions: positive long, negative short. |
| `total` | string | Yes | Cumulative BTC quantity from the best price through this level. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
