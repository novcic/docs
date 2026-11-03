# ProtectionRequest

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `instrument` | string | Yes | Instrument. |
| `lifecycleId` | string (uuid) | Yes | Lifecycle id. |
| `positionVersion` | string | Yes | Position version. |
| `protectionVersion` | string | Yes | Protection version. |
| `takeProfit` | string or null | No | Optional positive trigger price, tick 0.01. Null removes this leg; both null remove protection. Must be on the appropriate side of current last trade. |
| `stopLoss` | string or null | No | Optional positive trigger price, tick 0.01. Null removes this leg; both null remove protection. Must be on the appropriate side of current last trade. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
