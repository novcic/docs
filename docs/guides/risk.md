# Cross margin and settlement

`GET /api/portfolio` returns `risk` alongside positions and product holdings. Unified Trading USDT contributes at 100%; unencumbered BTC contributes at 90% of the reference index. Funding wallets are excluded. Option cover is removed from reusable collateral.

Initial margin includes futures positions and open derivative orders. Maintenance margin for futures positions is 0.5% of marked notional. Options are covered: short calls consume BTC and short puts consume full strike-value USDT. Signed realized cash and marked P&L affect equity.

Use `transferableUsdt` and `transferableBtc`, not raw wallet availability, for possible outflows. These values are snapshots; the final command rechecks risk atomically. An amount that was transferable a moment ago can be rejected after prices, orders or positions change.

When a required price is stale, `priceFresh` is false. The index must be at most five seconds old. Option exposure additionally requires usable option references. Risk-increasing actions are blocked; cancellation and Funding-to-Trading collateral top-ups remain available. A restricted account requires attention to maintenance/coverage constraints; the lifecycle worker can cancel orders and attempt liquidation against real counterparties.

## Realized cash

Derivative P&L and option premiums flow through a clearing cash ledger. A positive `realizedCash` is a claim; it is not permission to mint wallet funds. `POST /api/settle-cash` settles available funded clearing cash, possibly partially, and leaves the rest pending. A negative claim is an obligation collected from available trading collateral.

Track the returned `amount` and `pending`, then refresh balances and portfolio. When no cash needs settlement, the response can contain only `message`. A profitable position can coexist with an unwithdrawable claim if the other side has not funded settlement.

No endpoint changes margin mode, establishes isolated margin, sets risk tiers or submits a liquidation command for another account. Displaying a slider in a client must not imply capabilities absent from the API.

## Account-wide leverage

`portfolio.leverage` is the Unified Trading setting for all perpetual and expiry futures. `POST /api/leverage` accepts an integer string from 1 through 10 and requires an Idempotency-Key. It updates active futures positions and open orders together and rejects changes when margin is insufficient or required pricing is unavailable. Options remain covered; leverage does not reduce their collateral requirements.

`POST /api/leverage-preview` accepts the same body, checks the proposed account and returns its risk snapshot without committing changes. It requires no idempotency key. Trade HMAC keys and JWT sessions can use both endpoints.

New accounts default to 1?. Migrated accounts use the highest leverage among their active futures positions/orders; this avoids raising margin requirements on migration. The per-order `leverage` field is deprecated: omit it. A supplied futures value must equal the account setting or the order is rejected.
