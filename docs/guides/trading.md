# Order lifecycle and products

The exchange supports spot, perpetual futures, expiry futures and European options on actual separate instrument books. Discover each `id`, `kind`, `status`, expiry and strike through `/api/products`. The perpetual displays `BTCUSDT`; its API ID remains `BTC-PERP` to distinguish it from spot.

## Submit an order

`POST /api/orders` accepts case-sensitive `Buy`/`Sell` and `Limit`/`Market`. Quantity is BTC, step 0.000001. Limit price is USDT per BTC, tick 0.01. Use `price: null` for Market. Orders execute against price-time priority; a resting maker sets the execution price.

| Status | Meaning |
| --- | --- |
| `Open` | No fill yet; remaining quantity rests |
| `PartiallyFilled` | Some quantity filled; remaining quantity rests |
| `Filled` | Entire requested quantity filled |
| `Cancelled` | No further fills; may already have partial executions |

A market order never rests its remainder. Spot rejects an entirely unexecutable market order; derivative market orders can return Cancelled with their entire quantity remaining. A cancellation reason can identify self-trade prevention, unfilled market remainder, stale AMM quote or risk restrictions. Reasons are human-readable strings.

Crossing your own resting order stops execution of the incoming remainder. There are no public batch, amend, stop, trigger, time-in-force or user post-only parameters. Cancel then place a new intent to replace an order; the new order receives new queue priority and can race with fills on the old one.

## Spot

Buy limits reserve quote funds; sells reserve BTC. Fills and wallet/journal movements commit atomically. Integrated AMM orders participate in this same book and matching rules. Every customer fill pays a fee deducted from its received asset. Funding wallets cannot trade directly; transfer to Unified Trading first.

## Perpetual and expiry futures

Contracts settle in USDT under cross margin. Leverage is 1–10. New non-option derivative limit prices must be within 10% of the fresh reference index. Perpetual funding runs at UTC eight-hour boundaries; settlement and funding rely on supported price windows. Expiry futures settle at their discovered expiry, when the required settlement window is available.

`reduceOnly: true` requires an existing opposite position and quantity no greater than that position. It cannot open a new position. Cancel/fill races can change the remaining position after you read it; inspect the command result and refresh risk.

## Options

Options are European and cash-settled in USDT. Quantity is BTC exposure; price is premium per BTC. Buyers pay premium. Short calls require BTC cover and short puts require strike-value USDT cover. Coverage cannot also be withdrawn or reused for another obligation. Option mark/IV/delta depend on fresh, supported reference inputs; missing values remain null and new risk can pause.

Keep positions, realized cash claims, wallet balances and execution history distinct. A realized profit is not immediately withdrawable unless clearing liquidity has funded it. See [risk](./risk.md) and [fees](./fees.md).

## Affordability, fills and activity

`POST /api/order-preview` accepts side, type, price (null for Market), instrument, reduceOnly and optional quantity. Set quantity to zero to estimate Max. It returns maximumQuantity, quantity, fee, feeAsset, netReceipt, orderCost, orderCostAsset, revision, error, referencePrice and priceSource.

Estimates use last traded price for Market and the entered price for Limit. With no last trade, they use reference index for spot/futures or theoretical option premium. Missing prices disable estimates. Market size is not capped by book depth, self-trade liquidity, or current available counterparties. Max uses spendable balances, margin, fees and reduce-only limits. Actual execution can differ or remain unfilled.

Order cost is the input asset amount for spot (BTC for sells, USDT for buys), and estimated margin plus fee for derivatives. Option fees retain the underlying index basis and premium cap. Fee estimates round once for the requested quantity; actual fees round per execution. No matching simulation, writes, identity allocation or idempotency key is involved. The exchange UI computes the same decimal formulas immediately on every quantity/slider input, updating as price and account snapshots arrive.

Order responses include filledNotional and averageExecutionPrice. Average is all fill notional divided by executed quantity, including fills outside the recent-trades window; null means no fills. A partially executed market order can be Cancelled with a nonzero average and remaining quantity.

Browser Cancel all applies across the entire account. HMAC Cancel all is restricted to selected products. The response cancelled count is authoritative. Balance activity excludes zero-net reserve/release entries before selecting the latest 100; the internal ledger retains them for audit.
