# LiquidityShare

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `shares` | string | Yes | Product units, not necessarily token amounts. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
