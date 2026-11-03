# IndexSample

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string | Yes | Stable identifier for this resource. |
| `time` | string (date-time) | Yes | UTC timestamp; Candle.time is Unix seconds encoded as a string. |
| `price` | string | Yes | USDT price per BTC. |
| `spot` | string | Yes | Spot. |
| `perpetual` | string or null | Yes | Perpetual. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
