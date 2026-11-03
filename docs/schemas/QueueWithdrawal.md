# QueueWithdrawal

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `shares` | string | Yes | Product units, not necessarily token amounts. |
| `asset` | string | Yes | BTC or USDT. Values: `BTC`, `USDT`. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
