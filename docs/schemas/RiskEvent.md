# RiskEvent

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `type` | string | Yes | Type. |
| `detail` | string | Yes | Human-readable status detail. Do not parse as an enum. |
| `time` | string (date-time) | Yes | UTC timestamp; Candle.time is Unix seconds encoded as a string. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
