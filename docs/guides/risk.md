# Cross margin and settlement

`GET /api/portfolio` returns `risk` alongside positions and product holdings. Unified Trading USDT contributes at 100%; unencumbered BTC contributes at 90% of the reference index. Funding wallets are excluded. Option cover is removed from reusable collateral.

Initial margin includes futures positions and open derivative orders. Maintenance margin for futures positions is 0.5% of marked notional. Options are covered: short calls consume BTC and short puts consume full strike-value USDT. Signed realized cash and marked P&L affect margin balance.

Use `transferableUsdt` and `transferableBtc`, not raw wallet availability, for possible outflows. These values are snapshots; the final command rechecks risk atomically. An amount that was transferable a moment ago can be rejected after prices, orders or positions change.

When a required price is stale, `priceFresh` is false. The index must be at most five seconds old. Option exposure additionally requires usable option references. Risk-increasing actions are blocked; cancellation and Funding-to-Trading collateral top-ups remain available. A restricted account requires attention to maintenance/coverage constraints; the lifecycle worker can cancel orders and attempt liquidation against real counterparties.

## Realized cash

Derivative P&L and option premiums flow through a clearing cash ledger. A positive `realizedCash` is a claim; it is not permission to mint wallet funds. `POST /api/settle-cash` settles available funded clearing cash, possibly partially, and leaves the rest pending. A negative claim is an obligation collected from available trading collateral.

Track the returned `amount` and `pending`, then refresh balances and portfolio. When no cash needs settlement, the response can contain only `message`. A profitable position can coexist with an unwithdrawable claim if the other side has not funded settlement.

No endpoint changes margin mode, establishes isolated margin, sets risk tiers or submits a liquidation command for another account. Displaying a slider in a client must not imply capabilities absent from the API.

## Account-wide leverage

`portfolio.leverage` is the Unified Trading setting for all perpetual and expiry futures. `POST /api/leverage` accepts an integer string from 1 through 10 and requires an Idempotency-Key. It updates active futures positions and open orders together and rejects changes when margin is insufficient or required pricing is unavailable. Options remain covered; leverage does not reduce their collateral requirements.

`POST /api/leverage-preview` accepts the same body, checks the proposed account and returns its risk snapshot without committing changes. It requires no idempotency key. Trade HMAC keys and JWT sessions can use both endpoints.

New accounts default to 1x. Migrated accounts use the highest leverage among their active futures positions/orders; this avoids raising margin requirements on migration. The per-order `leverage` field is deprecated: omit it. A supplied futures value must equal the account setting or the order is rejected.


## Position metrics

`portfolio.positions` contains positions, including historical flat rows, with `lifecycleId`, `version`, weighted entry and remaining signed cost. `lastPrice` and `priceChangePercent = 100 * (last / entry - 1)` describe price movement without adjusting for long/short direction. `markPrice` is the risk valuation. `unrealizedPnl = quantity * mark - cost` is signed USDT before fees/funding. `positionValue = abs(quantity) * mark`.

`returnOnMarginPercent = 100 * unrealizedPnl / entryMargin`. For futures the denominator is remaining entry notional divided by current account leverage, so changing leverage changes the reported percentage. For long options it is remaining paid premium; for short puts full strike cover; for short calls BTC cover valued at the current index. This percentage is not a wallet return or a forecast. Realized P&L uses closing-trade basis; option premium cash flows and settlement cash remain separate. Values requiring unavailable/stale prices return null, not zero.

`liquidationPrice` is an approximate scenario for the selected futures position: change only that position's mark, hold all other marks and collateral values constant, and solve equity = maintenance. With signed quantity q, current mark m, account equity E and maintenance M, it is `(M - E + (q - abs(q)*0.005)*m) / (q - abs(q)*0.005)`. It returns null without a positive solution or fresh inputs. BTC collateral values, other positions, orders, funding and fees can change actual risk; the threshold is not a guaranteed execution or liquidation price. Covered options return null / Not applicable, since the current liquidation engine liquidates futures, not covered option positions.


The terminal labels `returnOnMarginPercent` as ROI, shows Entry / Current last-trade movement, and separates Unrealized and Realized USDT lines. Liquidation price shows `-` when unavailable; the estimate retains the cross-account assumptions above. These live gross position metrics differ from the net completed lifecycle in [PnL history](./trading.md#closed-position-pnl-history), which includes actual fees and funding.


## Equity, available balance and account margin rates

`risk.totalWalletBalance` values Unified Trading coins, including reservations, at the reference index before collateral haircuts. `risk.totalEquity` adds unsettled realized cash and marked derivative P&L/option value. `risk.marginBalance` is the collateral-adjusted balance actually used by the engine; the existing `risk.equity` field remains its compatibility alias.

`availableBalance = marginBalance - initialMargin`, retaining negative values to show a margin deficit. It is null when required references are stale. The signed balance is an account metric; order sizing and transferable amounts stay nonnegative, and all admission and coverage checks still apply. It is not spendable settlement-coin inventory. Opening execution fees require actual USDT; reduce-only fees use available USDT first and accrue any shortfall in signed settlement. Reduce-only orders reserve no new margin or fee capacity. Options retain their full-cover rules for new exposure.

`initialMarginRate = 100 * initialMargin / marginBalance` and `maintenanceMarginRate = 100 * maintenanceMargin / marginBalance`. These are account usage percentages, distinct from the 0.5% futures maintenance requirement. Risk-increasing orders must leave IMR at or below 100%; existing positions can have IMR above 100% without liquidation. Liquidation begins at MMR **100% or higher**, provided references are fresh, and attempts partial reductions against real liquidity. No-position, zero-margin accounts are not liquidated. For positive requirements and nonpositive margin balance the rates are null rather than negative/infinite; clients should display a breached threshold. Stale rates are null; zero requirements with fresh prices produce 0%.

`portfolio.assets` provides each Funding/Unified Trading coin's `walletBalance`, `locked`, `unrealizedPnl`, `realizedCash`, signed `equity`, `transferable`, and index-valued `usdValue`. All derivative settlement is in USDT. Thus a zero-USDT wallet with a losing USDT perpetual has negative USDT equity while BTC collateral can keep total equity positive. Unrealized losses do not rewrite physical wallet balances. `unrealizedPnl` includes option value; do not add position-level option P&L again. Negative and unpriced equity rows must not be hidden by a zero-balance filter.

The Assets summary adds Funding and Unified Trading equity and excludes separately committed investment holdings. `GET /api/market` exposes `markPrice` using the same mark calculation as position risk, even without an owned position. It is null for spot or unavailable references. Last trade remains independent and drives TP/SL.

The terminology and separation of wallet balance, total equity and collateral-adjusted margin follow [Bybit's account overview](https://www.bybit.com/en/help-center/article/Unified-Trading-Account-Asset-Page) and [account formula glossary](https://www.bybit.com/en/help-center/article/Glossary-Unified-Trading-Account). Novcic retains its documented collateral ratios, covered options, fixed maintenance requirement, transfer policy and real-liquidity execution; this release does not implement Bybit's borrowing, tiered risk, or full order-loss/haircut-loss model.
