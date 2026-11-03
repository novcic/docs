# Cross margin and settlement

`GET /api/portfolio` returns `risk` alongside positions and product holdings. Unified Trading USDT contributes at 100%; unencumbered BTC contributes at 90% of the reference index. Funding wallets are excluded. Option cover is removed from reusable collateral.

Initial margin includes futures positions and open derivative orders. Maintenance margin for futures positions is 0.5% of marked notional. Options are covered: short calls consume BTC and short puts consume full strike-value USDT. Signed realized cash and marked P&L affect equity.

Use `transferableUsdt` and `transferableBtc`, not raw wallet availability, for possible outflows. These values are snapshots; the final command rechecks risk atomically. An amount that was transferable a moment ago can be rejected after prices, orders or positions change.

When a required price is stale, `priceFresh` is false. The index must be at most five seconds old. Option exposure additionally requires usable option references. Risk-increasing actions are blocked; cancellation and Funding-to-Trading collateral top-ups remain available. A restricted account requires attention to maintenance/coverage constraints; the lifecycle worker can cancel orders and attempt liquidation against real counterparties.

## Realized cash

Derivative P&L and option premiums flow through a clearing cash ledger. A positive `realizedCash` is a claim; it is not permission to mint wallet funds. `POST /api/settle-cash` settles available funded clearing cash, possibly partially, and leaves the rest pending. A negative claim is an obligation collected from available trading collateral.

Track the returned `amount` and `pending`, then refresh balances and portfolio. When no cash needs settlement, the response can contain only `message`. A profitable position can coexist with an unwithdrawable claim if the other side has not funded settlement.

No endpoint changes margin mode, establishes isolated margin, sets risk tiers or submits a liquidation command for another account. Displaying a slider in a client must not imply capabilities absent from the API.
