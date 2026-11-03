# LendingPool

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `asset` | string | Yes | BTC or USDT. |
| `cash` | string | Yes | Cash. |
| `debt` | string | Yes | Debt. |
| `shares` | string | Yes | Product units, not necessarily token amounts. |
| `reserves` | string | Yes | Reserves. |
| `reserveRemainder` | string | Yes | Sub-ledger reserve remainder retained at up to 20 decimals. |
| `accruedAt` | string (date-time) | Yes | Accrued at. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
