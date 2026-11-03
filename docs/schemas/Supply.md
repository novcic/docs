# Supply

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `asset` | string | Yes | BTC or USDT. |
| `shares` | string | Yes | Product units, not necessarily token amounts. |
| `queuedShares` | string | Yes | Earn units requested for redemption, still included in shares until paid. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
