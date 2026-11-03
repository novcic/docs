# AmendOrderRequest

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `instrument` | string | Yes | Instrument. |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `version` | string | Yes | Version. |
| `price` | string | Yes | USDT price per BTC. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
