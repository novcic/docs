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

Contracts settle in USDT under cross margin. Leverage is 1–10. Perpetual and expiry-futures price limits are directional: **buy limits must not exceed 110% of the fresh reference index; sell limits must not fall below 90%**. Lower buys and higher sells are allowed, subject to ordinary precision, collateral and fee checks. This applies to amendments and reduce-only orders too. An adverse limit is rejected without silently repricing it. With an index of 50,000 USDT, a buy at 25,000 or sell at 75,000 is permitted; a buy at 75,000 or sell at 25,000 is rejected.

Matching rechecks each resting order against its own side's current limit and cancels it if that limit is breached. A valid high sell or low buy stays on the book when it would breach the incoming side's execution limit: matching stops, and an unfilled market remainder is cancelled with `Futures price limit reached`. Market orders, including reduce-only closes, cannot buy above 110% or sell below 90% of the reference. Partial fills within the limit remain final. These index-relative limits do not apply to spot or option premiums.

Perpetual funding runs at UTC eight-hour boundaries; settlement and funding rely on supported price windows. Expiry futures and options stop trading at their discovered expiry, even if the exchange was offline. They become `AwaitingSettlement` until the original settlement window is available; resting orders and position protection are cancelled, while positions and collateral remain. See [downtime recovery](./risk.md#expiry-recovery-after-downtime).

`reduceOnly: true` requires an existing opposite position and quantity no greater than that position. It cannot open a new position. Reduce-only orders reserve no new initial margin or fee capacity. Fees still apply: available USDT pays first, and a shortfall stays in signed USDT settlement instead of blocking the close. This applies to makers, takers and automatic TP/SL, while fresh prices, execution limits and genuine liquidity remain required. Cancel/fill races can change the remaining position after you read it; inspect the command result and refresh risk.

## Options

Options are European and cash-settled in USDT. Quantity is BTC exposure; price is premium per BTC. Buyers pay premium. Short calls require BTC cover and short puts require strike-value USDT cover. Coverage cannot also be withdrawn or reused for another obligation. Option mark/IV/delta depend on fresh, supported reference inputs; missing values remain null and new risk can pause.

Keep positions, realized cash claims, wallet balances and execution history distinct. A realized profit is not immediately withdrawable unless clearing liquidity has funded it. See [risk](./risk.md) and [fees](./fees.md).

## Affordability, fills and activity

`POST /api/order-preview` accepts side, type, price (null for Market), instrument, reduceOnly and optional quantity. Set quantity to zero to estimate Max. It returns maximumQuantity, quantity, fee, feeAsset, netReceipt, orderCost, orderCostAsset, revision, error, referencePrice and priceSource.

Estimates use last traded price for Market and the entered price for Limit. With no last trade, they use reference index for spot/futures or theoretical option premium. Missing prices disable estimates. Market size is not capped by book depth, self-trade liquidity, or current available counterparties. Opening Max uses spendable balances, margin and fees. Reduce-only Max uses the opposite position size without a cash-USDT or available-margin cap. Actual execution can differ or remain unfilled.

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

The server persists one closing job for the current entire position. Empty automatic attempts update that job without creating order rows. The delay backs off to 200, 400, 800, then 1000 ms when nothing fills, and resets to 100 ms after a fill. `attempts` counts checks; `retryDelayMs` reports the next delay. There is no hard attempt cutoff. Workers serialize with financial commands, never overlap the same job or catch up with bursts; scheduling starts after each attempt completes. No liquidity, stale reference prices, execution price limits, or other ordinary restrictions leave a visible waiting reason. Actual fills, fees, execution orders and job progress commit atomically. Restarts resume Closing jobs and their backoff. A gap can execute far from the trigger; TP/SL does not guarantee price or completion.

Other trading remains enabled during closing. Adding in the same direction increases the quantity to close. Manual reduction changes the next attempt; reaching zero or reversing cancels the old lifecycle, so a reopened position is never closed by its predecessor. Expired instruments stop accepting retries. `POST /api/stop-closing` requires instrument, protection id and current version; it stops future attempts and preserves already committed fills.

`Market Close` in the UI submits one reduce-only market order. It does not create a persistent job. Chart entry-line drags propose TP/SL without changing entry; trigger and owned limit lines open confirmations before submission. The table's Set TP/SL and Edit actions provide keyboard alternatives. Options start on Chain and offer Chart for the selected contract.

All three commands require a session or a Trade HMAC key permitted for the instrument's product, plus a persisted UUID Idempotency-Key. Read keys cannot mutate protection or prices.


## Closed-position PnL history

`GET /api/pnl-history` returns `{items, nextCursor}` for verified completed perpetual, expiry-futures and option lifecycles. One lifecycle starts at the first fill from flat and ends when flat, reversed or settled. Partial reductions and same-direction additions accumulate into that row. A reversal closes the old direction and opens a new one; its actual execution fee is allocated between them without losing a rounding remainder. Spot trades are not position history.

`quantity` is total quantity opened over the lifecycle, not peak exposure or the last remaining position. `averageEntry` and `averageExit` divide total opening/closing notional by that quantity. Expiry uses actual rounded settlement cash and remaining basis for the closing notional, including zero intrinsic value for an option. It adds no synthetic execution fee.

Final `netPnl = grossPnl - openingFee - closingFee + funding`. All amounts are exact decimal strings in USDT; quantity is BTC. Positive funding was received; negative funding was paid. Opening and closing fees come from actual fills. A delayed funding run can update a closed row belonging to its boundary. This economic result is separate from withdrawable cash: a clearing claim may await funded settlement.

### Filtering and pagination

Optional `instrument` is a canonical ID; `product` is `Perpetual`, `Future` or `Option`. `from` and `to` are inclusive UTC **closing dates** in `YYYY-MM-DD` form. `limit` defaults to 50 and accepts 1-100. Ownership and API-key product permissions apply before filters and pagination; a Spot-only key receives an empty list. Both Read and Trade keys can read permitted history.

Rows sort by `closedAt` descending then `id` descending. Copy `nextCursor` into the next request, retaining filters and account. Null means the end. A foreign, filtered-out or invalid cursor returns 400. Each page is a live read: newly closed rows appear at the front on refresh, while delayed funding may change values. Refresh loaded pages when reconciling results; do not treat them as an immutable export snapshot.

```bash
curl -sS "$NOVCIC_URL/api/pnl-history?product=Perpetual&from=2026-11-01&to=2026-11-30&limit=50" \
  -H "Authorization: Bearer $NOVCIC_TOKEN"
```

`openedAt` and `closedAt` are UTC ISO timestamps; `durationSeconds` is whole elapsed seconds encoded as a string. The browser's PnL history tab offers product/instrument/date filters, fee/funding breakdowns and Load more, preserving scroll and edits during refresh.

### Historical coverage

New history is written in the same transaction as matching, funding or settlement. Startup reconstruction does not alter balances. Older lifecycles lacking recorded execution fees or spanning unlinked legacy funding/settlement are omitted from this endpoint rather than given estimated net results. An open lifecycle with incomplete old records remains unverified when it eventually closes. Existing trades and ledger entries remain available through their own endpoints; absence from PnL history does not mean there was no trading.
