# Changelog

## 1.6.3 - Liquidity deposits from Funding

- Liquidity contributions accept optional `sourceAccount`: Funding or Unified Trading. Existing requests default to Unified Trading. Deposits debit the selected account directly and atomically.
- Requests retain their source account; cancellation refunds remaining assets to that account, including assets from completed conversions. Older deposits remain Unified Trading.
- The deposit dialog shows both asset balances and percentage/Max controls for the selected account. History shows the source. Meadow branding is 1.6.5.

## 1.6.2 - Reduce-only closing fee settlement

- Reduce-only derivative orders no longer require cash USDT for fees or reserve new margin/fee capacity. Unfunded fees become signed settlement liabilities with matching fee claims; fees remain charged and funds conserved. Both makers and takers, manual closes and TP/SL use this behavior.
- Reduce-only Max uses the remaining opposite position even with zero USDT or negative available margin. Opening orders retain their ordinary checks.
- LP USDT earnings include fee claims once at accrual, without counting later funded settlement twice.
- Fixed the liquidity summary grid leaving an empty third column on wide screens; the two cards fill the row and stack on narrow screens.

## 1.6.1 - LP performance and bounded TP/SL retry storage

- Portfolio adds `liquidityPerformance`: current LP share price/value, completed deposits and withdrawals at historical USD values, signed total P&L and return on total invested. Compounded fees remain included in share value.
- Liquidity requests expose fixed `depositValueUsd` and completed `withdrawalValueUsd`; supported historical values are backfilled from event-time references. Unreconstructable investment history shows unavailable P&L.
- Empty automatic TP/SL checks update the existing closing job without inserting orders. Retries back off to one second and reset to 100 ms after fills, preserving durable protection without a five-attempt cutoff. Executed orders and ordinary manual attempts remain audited.
- Liquidity shows invested capital, payouts, current unit price and signed P&L. Removed the requested payout hint. Meadow branding is 1.6.4.

## 1.6.0 - Liquidity request details and compounded fee earnings

- Fixed order-history timeouts after repeated TP/SL closing attempts with an indexed latest-attempt lookup. Abandoned order-history requests now cancel database work; the response still includes all active orders and up to 200 history entries, grouped by closing job.
- Portfolio adds read-only `liquidityFees`, attributing BTC/USDT fee income by ownership at accrual with explicit history coverage. No separate claim balance or change to compounding.
- Liquidity shows current position value, ownership, personal fee earnings, and how to redeem shares in USDT. Pool-wide fee totals remain separate.
- Requests now identify Add/Remove, asset amounts, current USD estimates, LP shares, UTC times and status. Meadow branding is 1.6.3.

## 1.5.2 - Directional futures price limits

- Perpetual and expiry-futures limits now cap buys at 110% of the reference index and floor sells at 90%. Favourable-side lower buys and higher sells are accepted, including amendments and reduce-only orders, with ordinary collateral and precision checks.
- Matching preserves valid passive orders, cancels resting orders that breach their own side's current limit, and stops market execution before an adverse out-of-limit fill.
- AMM futures quotes cap bids at 109% and floor asks at 91%; the passive side retains its inventory-curve price. The Trading Rules page describes placement and execution separately.

## 1.5.1 - Signed available balance

- Available balance now preserves negative margin deficits and is null for stale pricing, instead of returning zero. Order sizing and transfers retain their existing risk checks.
- The cross-margin panel ends with a compact Available balance row; routine hint paragraphs and the balance subtitle are removed. Meadow branding is version 1.6.1.

## 1.5.0 - Mark prices and cross-margin balances

- Market snapshots now expose the derivative mark price used for risk. The terminal shows it below the last trade.
- Portfolio adds per-coin wallet balances, signed equity, unrealized P&L, unsettled cash and transferable amounts. Negative USDT equity is visible without changing wallet coins.
- Risk separates total equity, collateral-adjusted margin balance and available balance, plus IMR/MMR percentages. The legacy equity field retains its meaning. Liquidation includes the exact 100% MMR boundary.
- Assets totals include marked P&L and use the reference index. Shared Meadow branding is version 1.6.0.

## 1.4.0 - Completed-position PnL history

- Added paginated `/api/pnl-history` for complete derivative lifecycles, with product/instrument/UTC closing-date filters and product authorization before pagination.
- Includes weighted entry/exit, total quantity, gross and final net PnL, actual opening/closing fees, signed funding, UTC times and duration.
- Reversals split lifecycles and fees; settlement uses actual rounded cash. Legacy rows without verifiable fees/funding/settlement are omitted.
- Refined Positions labels and action placement; added the PnL history terminal tab with live refresh and detailed net breakdown. Shared Meadow branding is version 1.5.0.

## 1.3.0 - Position protection and chart trading

- Added versioned entire-position TP/SL OCO, durable reduce-only closing, stop-closing and atomic limit-price amendments.
- Added lifecycle-aware position valuation, unrealized P&L/return, weighted option entry and approximate cross-margin liquidation metrics.
- All active orders are returned; repeated closing attempts are grouped by job. Added order version, replacement and closing-job fields.
- TP/SL and limit-price changes are available on charts with confirmation, with a selected-contract options chart and keyboard alternatives.


## 1.2.0 - Profiles, product permissions and live estimates

Added private profiles, random usernames, preset avatars, birth dates and password/email changes with immediate session/key revocation. API keys now enforce product permissions. Market sizing and estimates use last traded price with reference fallback, without liquidity caps or matching simulation. Existing keys retain their prior access across all products; newly created keys default to Spot when products is omitted.


## 1.1.0 - Execution fees and account leverage

All customer fills now pay execution fees; spot fees are deducted from received assets. Added account leverage and rollback-only order/leverage previews, per-execution fee fields, average execution prices and BTC pool-fee reporting. Balance activity omits zero-net reservations/releases. Meadow 1.1 adds padded tabs and accessible notifications.

## 1.0.0 — 3 November 2026

Initial public documentation release, audited against the implemented REST routes and models: 41 operations, including retired/disabled routes, with request parameters, authentication, response schemas and examples.

- Documented HMAC Read/Trade keys, JWT sessions, cookie rotation and idempotent financial commands.
- Documented aggregated public depth and SignalR revision invalidation; no individual public-order endpoint.
- Added the explicit counterparty-dependent fee configuration and default five-level derivative quoting.
- Documented real-book liquidity contribution/redemption queues, Earn, loans, DCA and local ERC-20 custody.
- Adopted the shared Meadow branding specification and token release.

The API currently uses unversioned `/api` routes. Breaking changes must be called out here and coordinated with integration consumers; this documentation release number does not introduce a `/v1` URL prefix.
