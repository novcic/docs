# LiquidityOperation

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `poolId` | string | Yes | Pool id. |
| `kind` | string | Yes | Resource or wallet kind; spelling is case-sensitive. |
| `sourceAccount` | string | Yes | Deposit source account and destination for cancellation refunds. Legacy deposits default to Unified Trading; not used for withdrawals. Values: `Funding`, `Unified Trading`. |
| `asset` | string | Yes | BTC or USDT. |
| `btc` | string | Yes | Btc. |
| `usdt` | string | Yes | Usdt. |
| `shares` | string | Yes | Product units, not necessarily token amounts. |
| `received` | string | Yes | Asset amount actually received on liquidity withdrawal; zero while pending. |
| `depositValueUsd` | string or null | Yes | Original submitted contribution at request-time USD reference value. Fixed historical estimate, nullable for unsupported legacy history; included in invested totals only after completion. |
| `withdrawalValueUsd` | string or null | Yes | Completed payout at execution-time USD reference value, including any BTC dust. Null before completion or for unavailable legacy valuation. |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. |
| `detail` | string | Yes | Human-readable status detail. Do not parse as an enum. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |
| `completedAt` | string (date-time) or null | Yes | Completed at. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
