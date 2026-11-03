# Wallet

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `kind` | string | Yes | Resource or wallet kind; spelling is case-sensitive. |
| `asset` | string | Yes | BTC or USDT. |
| `available` | string | Yes | Available asset amount; derivative transfer limits are in portfolio.risk. |
| `locked` | string | Yes | Asset amount reserved for outstanding operations. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
