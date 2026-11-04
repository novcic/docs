# AccountAsset

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `kind` | string | Yes | Resource or wallet kind; spelling is case-sensitive. |
| `asset` | string | Yes | BTC or USDT. |
| `walletBalance` | string | Yes | Actual coins available plus reserved; excludes unsettled cash and unrealized P&L. |
| `locked` | string | Yes | Asset amount reserved for outstanding operations. |
| `unrealizedPnl` | string or null | No | Mark-to-market USDT unrealized P&L, including option value. |
| `realizedCash` | string | Yes | Signed USDT settlement claim/obligation, including realized P&L and unfunded reduce-only execution fees; a positive claim may await funded settlement. |
| `equity` | string or null | No | Legacy RiskSnapshot alias of marginBalance; on AccountAsset, signed coin equity including unsettled cash and mark-based P&L/option value. |
| `transferable` | string | Yes | Coins available to transfer out after account risk limits, not the wallet balance or shared available margin. |
| `usdValue` | string or null | No | Signed coin equity valued in USD at the reference index (USDT = 1). Null when required pricing is unavailable. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
