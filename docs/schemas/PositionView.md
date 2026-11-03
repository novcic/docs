# PositionView

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `instrumentId` | string | Yes | Canonical instrument ID from GET /api/products. Use the ID, not the display symbol. |
| `kind` | string | Yes | Resource or wallet kind; spelling is case-sensitive. |
| `quantity` | string | Yes | BTC quantity. Signed quantities on positions: positive long, negative short. |
| `entryPrice` | string | Yes | Average entry price; up to 16 decimal places. |
| `cost` | string | Yes | Signed USDT position cost basis, used for exact realized P&L. |
| `leverage` | string | Yes | Integer leverage 1 through 10, serialized as a string. |
| `realizedPnl` | string | Yes | Realized closing-trade P&L before fees/funding. Options use weighted remaining premium basis, not premium cash flows. |
| `lifecycleId` | string (uuid) | Yes | Unique non-flat position lifetime. Changes after flat or direction reversal; never reuse a prior lifetime for protection. |
| `version` | string | Yes | Optimistic concurrency counter as a string. Refresh after a rejected stale edit. |
| `lastPrice` | string or null | No | Last executed price of this instrument; TP/SL trigger reference. Nullable if no trades. |
| `priceChangePercent` | string or null | No | Raw last-price movement from weighted entry, (last / entry - 1) * 100; not direction-adjusted profit. |
| `markPrice` | string or null | No | Risk valuation price. Null when account pricing inputs are unavailable or stale. |
| `positionValue` | string or null | No | Absolute quantity times mark in USDT; null if pricing unavailable. |
| `unrealizedPnl` | string or null | No | Signed quantity times mark minus remaining signed cost basis. USDT; excludes fees/funding. |
| `returnOnMarginPercent` | string or null | No | 100 * unrealizedPnl / entryMargin. Null if pricing or positive basis unavailable. |
| `entryMargin` | string or null | No | Remaining entry notional / account leverage for futures; paid premium for long options, strike cover for short puts, BTC cover valued at current index for short calls. |
| `liquidationPrice` | string or null | No | Approximate selected-position mark where equity reaches maintenance, holding other marks and collateral value constant. Null for options, stale inputs or no positive solution. |
| `liquidationStatus` | string | Yes | Explanation for the estimate or null liquidationPrice. |
| `protection` | PositionProtection or null | No | Protection for this position lifecycle; null if none. Closing status survives browser/service restarts. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `reserved` | string | Yes | Funds reserved by this resource. |
| `updatedAt` | string (date-time) | Yes | Updated at. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
