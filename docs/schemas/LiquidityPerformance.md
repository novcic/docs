# LiquidityPerformance

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `sharePriceUsd` | string or null | No | Current pool NAV divided by total LP shares; can rise or fall. Null without a fresh valuation or outstanding supply. |
| `currentValueUsd` | string or null | No | Current marked value of all owned shares, including shares pending redemption. Zero after full exit; null when an open holding cannot be valued. |
| `totalDepositedUsd` | string or null | No | Sum of completed contributions valued in USD when originally submitted. BTC values are fixed at that historical reference; pending/cancelled contributions are excluded. |
| `totalWithdrawnUsd` | string or null | No | Sum of completed withdrawals at payout-time USD value, including BTC dust returned with a USDT withdrawal. |
| `pnlUsd` | string or null | No | Current value plus completed withdrawals minus completed deposits. Includes compounded fees and trading results; fees must not be added again. Null for missing valuation/history. |
| `returnPercent` | string or null | No | Total P&L divided by total deposited USD, times 100. Not annualized or time-weighted; null with zero or unavailable investment basis. |
| `completeHistory` | boolean | Yes | Whether completed share changes reconcile to current ownership and all historical USD values are known. Does not assert that current prices are fresh. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
