# Integrated liquidity provision

Liquidity providers contribute assets to a shared pool that posts real orders on the exchange's **spot, perpetual, expiry-futures and options books**. There is no separate AMM instrument or standalone swap venue. Participant orders match AMM quotes through ordinary price-time matching.

## Contribution lifecycle

`POST /api/liquidity-deposit` accepts BTC, USDT or both. At least one amount must be positive; each supports eight decimal places. Set optional `sourceAccount` to `Funding` or `Unified Trading` (case-sensitive). Omitted or null defaults to Unified Trading for existing clients. Both assets move directly from that account into request escrow in one idempotent transaction. Funding contributions are independent of trading margin; Unified Trading contributions retain collateral checks. The deposit form displays balances and Max for the selected account. The response is a `LiquidityOperation`, initially Pending.

The pool seeks approximately equal BTC/USDT value for activation. An imbalanced contribution places spot conversion orders and waits for actual counterparties. It does not fabricate fills or issue shares before conversion completes. Balanced contributions activate at the current net asset value. Existing pool shares make new shares proportional to contributed value; the first deposit establishes initial units.

Track `/api/portfolio.liquidityRequests`. On Completed, shares appear in `liquidity.shares`. Fees and trading gains/losses change NAV after activation. Public `/api/products.amm` reports assets, total shares, feesEarned and marked NAV. Wallet assets alone are not full NAV when the pool has derivative exposure.

## Redemption lifecycle

`POST /api/liquidity-withdraw` specifies shares and desired BTC/USDT proceeds. Shares already queued cannot be queued again. Pending shares are locked economically but remain in the holding until the request completes.

The pool can redeem a small request without closing every position if it has chosen-asset liquidity and collateral headroom. Otherwise it waits for real fills, collateral release or conversion. Value is calculated at execution; the preview is not a guaranteed payout. Completed requests report received amount and completion time.

`POST /api/liquidity-cancel` cancels only Pending requests. Withdrawal cancellation unlocks shares. Deposit cancellation returns remaining escrow to the original `sourceAccount` in its current asset composition; already-executed conversions remain final.

## Quoting and allocation

If the pool holds a contract that expired during downtime, quoting pauses while its original settlement window is recovered automatically. Positions and collateral stay reserved. Once the expired positions settle and current reference prices are fresh, quoting resumes without a manual pool reset. Missing historical data remains pending and retries; see [expiry recovery](./risk.md#expiry-recovery-after-downtime). A pending expired position makes investment-performance valuation unavailable until settlement.

Spot quotes sample separate segments of a constant-product reserve curve, up to ten levels per side. Derivative quotes use a virtual constant-product inventory curve around reference/option values, bounded by real margin and option coverage. The default target is **five levels per side**, configurable from one to twenty. Those levels split the existing per-instrument budget; they do not multiply available collateral.

Prices are rounded to ticks and coincident levels are merged. Small pools, insufficient precision, collateral constraints, absent references or post-only crossing checks can produce fewer levels. Quotes never deliberately cross resting orders. Unchanged quotes retain sequence/time priority and receive a freshness revalidation timestamp. Stale AMM quotes cannot execute after their short validity window without revalidation.

For perpetuals and expiry futures, the AMM caps bids at 109% of the index and floors asks at 91%, leaving a buffer inside the exchange's 110% buy cap and 90% sell floor. Inventory-skewed lower bids and higher asks retain their curve prices; the opposite-side bound does not clamp them. These price rules do not increase the quoting budget or release collateral committed to existing positions.

LPs receive the configured share of AMM execution fees, currently 80% by default, already included in NAV. Returns also depend on inventory, price movement, derivative exposure and counterparty liquidity. `feesEarned` is cumulative fee income, not total investment profit. See [fees](./fees.md) for formulas.

## Your fee earnings and request history

`GET /api/portfolio.liquidityPerformance` reports the current LP unit price (pool NAV / total shares) and current value of your holding. Both can increase or decrease with asset prices and the pool's trading results. **Total P&L = current holding value + completed withdrawals - total completed contributions.** Compounded fees are already in NAV and are not added a second time. Return is this P&L divided by total contributed USD, without annualizing or adjusting for cash-flow timing.

`depositValueUsd` fixes each original contribution's USD value at submission, including any subsequent conversion gains/losses in overall performance. `withdrawalValueUsd` fixes each completed payout's USD value at execution, including any BTC dust. Pending/cancelled operations are excluded from the investment and withdrawal totals; pending redemption shares remain part of current value. The calculation reads all completed operations, not just the latest 100 request rows. Supported older BTC valuations use the latest reference no more than five seconds before the event; absent references or unreconciled legacy share changes make P&L unavailable. Stale current prices make open-holding value and P&L unavailable, while known historical totals stay visible.

`GET /api/portfolio.liquidityFees` reports cumulative BTC and USDT fee earnings attributed using your ownership **when each fee was credited**, rather than applying your current ownership to all past fees. A new contribution earns nothing before activation; a pending withdrawal retains ownership until completion. Earnings remain in pool assets or settlement receivables and compound in LP share value. Unfunded reduce-only closing fees are attributed once when accrued as USDT receivables; later cash settlement does not create a second fee reward. Receivables are included in NAV but are not spendable until funded. They are not an additional unclaimed balance, and past redemptions may already have realized some of them. For example, 20% ownership receives 20% of the pool's 80% fee portion: 16% of the customer fee.

Use **Remove liquidity** and choose USDT to realize current share value as USDT. Redemption includes reinvested fees and trading P&L, can wait for liquidity, and does not guarantee payment of the historical fee total separately. BTC fee income stays BTC in the pool until assets are converted through actual counterparties.

Attribution reconciles current holdings with completed share changes and the actual LP fee ledger and tagged settlement-accrual journal. `since` identifies the beginning of reported coverage. If legacy direct share changes prevent earlier reconstruction, reporting starts after the latest such change and `completeHistory` is false. Inconsistent ownership produces null earnings rather than a fabricated amount. Fractional ledger-unit allocations are summed exactly before truncating the final totals to eight decimals. Reporting makes no wallet, share, or accounting mutations.

Liquidity request rows identify the deposit source account and distinguish submitted deposit BTC/USDT from actual completed withdrawal receipts and estimated pending payouts. The USD column uses the current index, not an invented historical valuation; stale BTC valuation is unavailable. LP share counts identify issued, redeemed, or requested shares, with UTC request/completion times.

Execution fees accrue in their received asset: BTC for spot buys, USDT otherwise. A final all-share USDT redemption returns any BTC remainder smaller than 0.000001 BTC in kind, with a separate balance entry and withdrawal detail. Tradable balances still require actual counterparty conversion.
