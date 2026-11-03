# Integrated liquidity provision

Liquidity providers contribute assets to a shared pool that posts real orders on the exchange's **spot, perpetual, expiry-futures and options books**. There is no separate AMM instrument or standalone swap venue. Participant orders match AMM quotes through ordinary price-time matching.

## Contribution lifecycle

`POST /api/liquidity-deposit` accepts BTC, USDT or both. At least one amount must be positive; each supports eight decimal places. Funds move into request escrow. The response is a `LiquidityOperation`, initially Pending.

The pool seeks approximately equal BTC/USDT value for activation. An imbalanced contribution places spot conversion orders and waits for actual counterparties. It does not fabricate fills or issue shares before conversion completes. Balanced contributions activate at the current net asset value. Existing pool shares make new shares proportional to contributed value; the first deposit establishes initial units.

Track `/api/portfolio.liquidityRequests`. On Completed, shares appear in `liquidity.shares`. Fees and trading gains/losses change NAV after activation. Public `/api/products.amm` reports assets, total shares, feesEarned and marked NAV. Wallet assets alone are not full NAV when the pool has derivative exposure.

## Redemption lifecycle

`POST /api/liquidity-withdraw` specifies shares and desired BTC/USDT proceeds. Shares already queued cannot be queued again. Pending shares are locked economically but remain in the holding until the request completes.

The pool can redeem a small request without closing every position if it has chosen-asset liquidity and collateral headroom. Otherwise it waits for real fills, collateral release or conversion. Value is calculated at execution; the preview is not a guaranteed payout. Completed requests report received amount and completion time.

`POST /api/liquidity-cancel` cancels only Pending requests. Withdrawal cancellation unlocks shares. Deposit cancellation returns remaining escrow in its current asset composition; already-executed conversions remain final.

## Quoting and allocation

Spot quotes sample separate segments of a constant-product reserve curve, up to ten levels per side. Derivative quotes use a virtual constant-product inventory curve around reference/option values, bounded by real margin and option coverage. The default target is **five levels per side**, configurable from one to twenty. Those levels split the existing per-instrument budget; they do not multiply available collateral.

Prices are rounded to ticks and coincident levels are merged. Small pools, insufficient precision, collateral constraints, absent references or post-only crossing checks can produce fewer levels. Quotes never deliberately cross resting orders. Unchanged quotes retain sequence/time priority and receive a freshness revalidation timestamp. Stale AMM quotes cannot execute after their short validity window without revalidation.

LPs receive the configured share of AMM execution fees, currently 80% by default, already included in NAV. Returns also depend on inventory, price movement, derivative exposure and counterparty liquidity. `feesEarned` is cumulative fee income, not total investment profit. See [fees](./fees.md) for formulas.
