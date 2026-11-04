# RiskSnapshot

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `equity` | string | Yes | Legacy RiskSnapshot alias of marginBalance; on AccountAsset, signed coin equity including unsettled cash and mark-based P&L/option value. |
| `initialMargin` | string | Yes | USDT initial margin required by positions and resting derivative orders. |
| `maintenanceMargin` | string | Yes | USDT maintenance margin required by futures positions. |
| `transferableUsdt` | string | Yes | USDT that can leave Unified Trading under current risk checks. |
| `transferableBtc` | string | Yes | BTC that can leave Unified Trading under current risk checks. |
| `unrealizedPnl` | string | Yes | Mark-to-market USDT unrealized P&L, including option value. |
| `realizedCash` | string | Yes | Signed USDT settlement claim/obligation, including realized P&L and unfunded reduce-only execution fees; a positive claim may await funded settlement. |
| `indexPrice` | string | Yes | Index price. |
| `priceFresh` | boolean | Yes | Whether required price references are fresh. |
| `restricted` | boolean | Yes | Whether maintenance or covered-option constraints are breached. |
| `totalWalletBalance` | string or null | No | Unified Trading coins including reserved balances valued at the reference index, before collateral haircuts; null when reference pricing is stale. |
| `totalEquity` | string or null | No | Unified Trading wallet value plus unsettled realized cash and mark-based unrealized P&L/option value, before collateral haircuts. May be negative; null with stale pricing. |
| `marginBalance` | string | Yes | Collateral-adjusted risk balance in USD (USDT at par), after BTC haircut, reservations and option coverage. Same value as legacy equity. |
| `availableBalance` | string or null | Yes | Signed marginBalance minus initialMargin, in USD. Negative values show the margin deficit; null when required references are stale. Order sizing and transferable amounts remain nonnegative; opening fees and option cover still require the settlement asset; reduce-only fee shortfalls accrue as USDT settlement liabilities. |
| `initialMarginRate` | string or null | Yes | Account IMR percentage: initialMargin / marginBalance * 100. Zero for zero requirement; null for stale pricing or nonpositive denominator with positive requirement. |
| `maintenanceMarginRate` | string or null | Yes | Account MMR percentage: maintenanceMargin / marginBalance * 100. Liquidation starts at >= 100%. Zero for zero requirement; null for stale pricing or nonpositive denominator with positive requirement. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
