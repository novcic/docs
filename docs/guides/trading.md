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

Crossing your own resting order stops execution of the incoming remainder. There are no general batch, time-in-force or user post-only parameters. Use the versioned amend endpoint for atomic limit-price replacement, and position protection for derivative TP/SL (described below).

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


## Amend an owned limit order

Read `id`, `instrumentId`, `version` and `remaining` from `/api/orders`. Submit `POST /api/amend-order` with `instrument`, `id`, the unchanged opaque `version`, and a new `price` (positive, tick 0.01). The remaining quantity becomes a new order with fresh time priority and `replacesId` pointing to the old ID. Existing fills remain on the original order. If the price crosses, the replacement can immediately execute. An unchanged price is a no-op.

Cancellation, replacement, collateral checks and the idempotency receipt commit together. An invalid price, changed version, insufficient balance/margin, or wrong owner/product rolls back the whole command. After a stale-version 400, refresh and review a new intent. For a timeout or 5xx, retry the same UUID and unchanged payload before doing anything else.

`GET /api/orders` returns every active order plus the latest 200 closed orders. TP/SL retry orders share `closingJobId`; this endpoint returns only the latest closed attempt per job. Read aggregate attempts and remaining position from `portfolio.positions[].protection`, and actual executions from trades. No public order identity appears in market depth.

## Entire-position TP/SL and OCO

Perpetuals, expiry futures and options support `POST /api/position-protection`. Read a current position, then send its `instrument`, `lifecycleId`, `version` as `positionVersion`, existing protection `version` as `protectionVersion` (or `"0"` if absent), and optional `takeProfit` / `stopLoss` prices. Prices have tick 0.01. Both null remove the protection. For a long, TP must be above the current last trade and SL below it; reverse these conditions for a short. A last trade is required. Already crossed prices are rejected, rather than silently activated.

Protection is tied to one uninterrupted position direction. Adds and reductions retain it; flat, reversal or expiry ends it. Changes to size/entry or protection invalidate a stale edit. Only one pair exists per lifecycle. It can be edited while Armed, or rearmed after cancellation. Stop an active Closing job before editing.

Each committed trade on that instrument is checked atomically in sequence. The first reached leg switches Armed to Closing and cancels its sibling, even if price moves back before the worker runs. The trigger is **last trade**, including an option's premium; it is not the index or risk mark. `triggerSequence` and `triggerLeg` identify the trigger.

The server persists the job and attempts a reduce-only market order for the current entire position roughly every 100 ms. Workers serialize with all financial commands, never overlap the same job or catch up with bursts. The cadence is a target under available capacity, not a hard real-time promise. No liquidity, stale reference prices, insufficient execution fees, or other ordinary restrictions leave a visible waiting reason and defer another attempt. Fills, fees and job progress commit atomically. Restarts resume Closing jobs. A gap can execute far from the trigger; TP/SL does not guarantee price or completion.

Other trading remains enabled during closing. Adding in the same direction increases the quantity to close. Manual reduction changes the next attempt; reaching zero or reversing cancels the old lifecycle, so a reopened position is never closed by its predecessor. Expired instruments stop accepting retries. `POST /api/stop-closing` requires instrument, protection id and current version; it stops future attempts and preserves already committed fills.

`Market Close` in the UI submits one reduce-only market order. It does not create a persistent job. Chart entry-line drags propose TP/SL without changing entry; trigger and owned limit lines open confirmations before submission. The table's Set TP/SL and Edit actions provide keyboard alternatives. Options start on Chain and offer Chart for the selected contract.

All three commands require a session or a Trade HMAC key permitted for the instrument's product, plus a persisted UUID Idempotency-Key. Read keys cannot mutate protection or prices.
