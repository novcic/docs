# LiquidityFeeEarnings

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `btc` | string or null | No | Cumulative BTC fee income attributed by historical LP ownership, rounded down to eight decimals after summation. Includes unfunded USDT closing-fee claims at accrual, without counting their later settlement again. Already compounded, possibly partly withdrawn; not separately claimable. Null when ownership cannot be reconciled. |
| `usdt` | string or null | No | Cumulative USDT fee income attributed by historical LP ownership, rounded down to eight decimals after summation. Includes unfunded USDT closing-fee claims at accrual, without counting their later settlement again. Already compounded, possibly partly withdrawn; not separately claimable. Null when ownership cannot be reconciled. |
| `since` | string (date-time) or null | No | UTC beginning of reported ownership/fee coverage; nullable before any attributable fee history. |
| `completeHistory` | boolean | Yes | False when legacy share changes require a historical cutoff or attribution is unavailable. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
