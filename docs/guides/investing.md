# Earn and collateralized loans

Earn subscriptions and loans use **Unified Trading** balances and JWT session authentication. All commands require stable idempotency keys. Read public lending-pool state from `/api/products` and account holdings from `/api/portfolio`.

## Earn shares

`POST /api/supply` accepts asset and token amount. It accrues interest first, transfers funds to pool cash and issues proportional shares. Pool unit value is `(cash + debt − reserves) / shares`; the initial unit is one token per share. A share balance is not necessarily the current redeemable token amount.

`POST /api/redeem` accepts the same request shape, but **amount means shares**. It increases `queuedShares`. The queue pays as pool cash becomes available, updating shares and queued shares together. Lending utilization can prevent immediate full redemption. Pending shares remain part of the holding until payment. There is no guaranteed liquidity or fixed advertised yield.

## Borrowing

`POST /api/borrow` borrows BTC against USDT or USDT against BTC. The two assets must differ. Initial LTV is capped at 60%, using a fresh index, and the lending pool must have available cash. Collateral moves out of available Unified Trading funds into loan collateral accounting.

The annualized borrowing rate is `0.02 + 0.10 × utilization`, where utilization is debt divided by cash plus debt. Interest accrues against principal plus accrued interest over elapsed time; 10% of booked interest accrues to reserves. Decimal remainder accounting retains sub-ledger fractions. Rates vary with utilization; the formula is not a promised investment return.

`POST /api/add-collateral` uses `loanId` and amount in the existing collateral asset. `POST /api/repay` uses amount in the loan asset, pays interest first, caps payment at debt, and releases proportional collateral. Full repayment sets `Repaid`. Repayments can release cash to queued Earn redemptions.

The lifecycle worker monitors collateral and can liquidate through the actual spot book. Insufficient counterparties can delay liquidation or leave bad debt; loans and pool claims retain that economic outcome. Inspect loan status, collateral, principal, interest and badDebt rather than assuming collateral always covers debt.
