# DcaRequest

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `amount` | string | Yes | Token amount unless the endpoint explicitly states shares. |
| `hours` | string | Yes | DCA interval: 1, 24 or 168. |
| `budget` | string or null | No | Optional total USDT DCA spend cap. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
