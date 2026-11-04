# Execution fees

Read `/api/config` for configured rates. `feeModel` is `execution`. Both customer makers and takers pay on every fill, including customer-to-customer executions. Unfilled quantity pays no fee.

| Product | Default rate | Fee asset |
| --- | --- | --- |
| Spot buy | Received BTC × 0.001 (0.10%) | BTC, deducted from receipt |
| Spot sell | Received USDT × 0.001 (0.10%) | USDT, deducted from receipt |
| Perpetual / expiry futures | Executed notional × 0.00055 (0.055%) | USDT |
| Options | min(quantity × index × 0.0003, premium notional × 0.07) | USDT |

On a customer fill against the AMM, 80% of the fee goes to the pool in the same asset and 20% to the exchange. Customer-to-customer fees go entirely to the exchange. Internal AMM, conversion and liquidation accounts are exempt from customer fees. Pool BTC and USDT fees are reported separately as `feesEarnedBtc` and `feesEarned`; both are already included in NAV.

Personal `portfolio.liquidityFees` reports historically attributed BTC/USDT fee income. It is compounded in LP shares, not an extra claimable reward. Removing liquidity realizes share value, including fee income and trading gains/losses. See [liquidity reporting](./liquidity.md#your-fee-earnings-and-request-history) for coverage and valuation rules.

Fees round down to eight decimal places per fill. The pool share rounds down again; the exchange receives the remainder. Settlement, fees and allocations commit atomically with the order receipt.

For example, buying 0.001 BTC at 75,000 USDT spends 75 USDT and receives 0.000999 BTC after a 0.000001 BTC fee. If the seller is the AMM, the pool receives 0.00000080 BTC and the exchange 0.00000020 BTC. An ordinary customer seller instead pays 0.075 USDT from their sale proceeds.

Private execution responses include `buyerFee`, `sellerFee`, `buyerFeeAsset`, and `sellerFeeAsset`. Historical executions predating these fields return null; use their historical ledger entries for reconciliation. Average execution price excludes fees. Wallet activity calls fees `Execution fee`; older raw entries can retain `AMM execution fee`.

Use `POST /api/order-preview` for maximum quantity and estimates. Spot Max does not reserve an extra input-asset fee. Estimates use last traded price, with labeled reference fallback; book liquidity never caps market sizing. Opening derivative sizing includes fees and collateral obligations, and resting opening orders reserve fee capacity. Reduce-only orders reserve neither new margin nor fee capacity; their Max is the opposite position size even when cash USDT or available margin is zero or negative. A preview is a snapshot, not a promise: submission rechecks prices, balances and margin atomically.

Reduce-only derivative fills still pay the full execution fee. Available USDT is debited first; a shortfall becomes a negative signed settlement balance, with matching exchange/LP receivables. Existing debt collection can use available USDT and executable free-BTC conversion; positive claims become wallet funds only when clearing liquidity funds them. This applies to incoming and resting reduce-only orders, manual closes and TP/SL. Opening orders retain their cash-fee checks. Fees are recorded once on the trade and in closed-position P&L, including when paid later.
