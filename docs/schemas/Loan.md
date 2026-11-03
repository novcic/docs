# Loan

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `asset` | string | Yes | BTC or USDT. |
| `collateralAsset` | string | Yes | Collateral asset. |
| `principal` | string | Yes | Outstanding principal in the loan asset. |
| `interest` | string | Yes | Accrued debt in the loan asset. |
| `interestRemainder` | string | Yes | Sub-ledger interest remainder, retained at up to 20 decimals. |
| `badDebt` | string | Yes | Recognized unrecovered debt in the loan asset. |
| `collateral` | string | Yes | Pledged amount in collateralAsset. |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
