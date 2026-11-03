# Execution fees

Read `/api/config` for configured rates. `feeModel` is `execution`. Both customer makers and takers pay on every fill, including customer-to-customer executions. Unfilled quantity pays no fee.

| Product | Default rate | Fee asset |
| --- | --- | --- |
| Spot buy | Received BTC × 0.001 (0.10%) | BTC, deducted from receipt |
| Spot sell | Received USDT × 0.001 (0.10%) | USDT, deducted from receipt |
| Perpetual / expiry futures | Executed notional × 0.00055 (0.055%) | USDT |
| Options | min(quantity × index × 0.0003, premium notional × 0.07) | USDT |

On a customer fill against the AMM, 80% of the fee goes to the pool in the same asset and 20% to the exchange. Customer-to-customer fees go entirely to the exchange. Internal AMM, conversion and liquidation accounts are exempt from customer fees. Pool BTC and USDT fees are reported separately as `feesEarnedBtc` and `feesEarned`; both are already included in NAV.

Fees round down to eight decimal places per fill. The pool share rounds down again; the exchange receives the remainder. Settlement, fees and allocations commit atomically with the order receipt.

For example, buying 0.001 BTC at 75,000 USDT spends 75 USDT and receives 0.000999 BTC after a 0.000001 BTC fee. If the seller is the AMM, the pool receives 0.00000080 BTC and the exchange 0.00000020 BTC. An ordinary customer seller instead pays 0.075 USDT from their sale proceeds.

Private execution responses include `buyerFee`, `sellerFee`, `buyerFeeAsset`, and `sellerFeeAsset`. Historical executions predating these fields return null; use their historical ledger entries for reconciliation. Average execution price excludes fees. Wallet activity calls fees `Execution fee`; older raw entries can retain `AMM execution fee`.

Use `POST /api/order-preview` for maximum quantity and estimates. Spot Max does not reserve an extra input-asset fee. Derivative sizing includes fees and collateral obligations, and resting derivative orders reserve fee capacity. A preview is a snapshot, not a promise: submission rechecks prices, balances and margin atomically.
