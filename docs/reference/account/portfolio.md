# Risk and product positions

`GET /api/portfolio`

A consistent account snapshot. assets includes Funding and Unified Trading coin wallet balances, signed equity, mark-based P&L/option value, unsettled cash, transferable amounts and index-valued USD equity. risk distinguishes totalEquity from marginBalance, availableBalance and IMR/MMR percentages. Includes positions (including flat rows) with valuation, lifecycle and protection details, loans, supplies and DCA schedules; latest 100 risk events and liquidity requests. liquidityFees attributes actual BTC/USDT pool fee income using ownership at accrual, not current ownership. Fees remain compounded in NAV; this is cumulative reporting, not an unclaimed balance. Null amounts indicate unreconstructable history; since and completeHistory identify coverage. liquidityPerformance reports current share price/value, historical completed deposit and withdrawal USD totals, total P&L (current value + withdrawals - deposits), and nonannualized return on total deposits. Fees are included in NAV, not added again. Pending/cancelled requests are excluded. Missing historical values or unreconciled legacy shares make P&L unavailable. Funding balances are outside cross-margin equity.

## Authentication

Bearer JWT or an HMAC-signed Read/Trade API key. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

## Behavior

A consistent account snapshot. assets includes Funding and Unified Trading coin wallet balances, signed equity, mark-based P&L/option value, unsettled cash, transferable amounts and index-valued USD equity. risk distinguishes totalEquity from marginBalance, availableBalance and IMR/MMR percentages. Includes positions (including flat rows) with valuation, lifecycle and protection details, loans, supplies and DCA schedules; latest 100 risk events and liquidity requests. liquidityFees attributes actual BTC/USDT pool fee income using ownership at accrual, not current ownership. Fees remain compounded in NAV; this is cumulative reporting, not an unclaimed balance. Null amounts indicate unreconstructable history; since and completeHistory identify coverage. liquidityPerformance reports current share price/value, historical completed deposit and withdrawal USD totals, total P&L (current value + withdrawals - deposits), and nonannualized return on total deposits. Fees are included in NAV, not added again. Pending/cancelled requests are excluded. Missing historical values or unreconciled legacy shares make P&L unavailable. Funding balances are outside cross-margin equity.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/portfolio" -H "Authorization: Bearer $NOVCIC_TOKEN"
```

## Response

Response type: [Portfolio](/schemas/Portfolio). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `leverage` | string | Yes | Integer leverage 1 through 10, serialized as a string. |
| `risk` | RiskSnapshot | Yes |  |
| `assets` | AccountAsset[] | Yes |  |
| `positions` | PositionView[] | Yes |  |
| `loans` | Loan[] | Yes |  |
| `supplies` | Supply[] | Yes |  |
| `liquidity` | LiquidityShare or null | Yes |  |
| `liquidityFees` | LiquidityFeeEarnings | Yes |  |
| `liquidityPerformance` | LiquidityPerformance | Yes |  |
| `liquidityRequests` | LiquidityOperation[] | Yes |  |
| `schedules` | DcaSchedule[] | Yes |  |
| `events` | RiskEvent[] | Yes |  |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "leverage": "0",
  "risk": {
    "equity": "0",
    "initialMargin": "0",
    "maintenanceMargin": "0",
    "transferableUsdt": "0",
    "transferableBtc": "0",
    "unrealizedPnl": "0",
    "realizedCash": "0",
    "indexPrice": "0",
    "priceFresh": false,
    "restricted": false,
    "totalWalletBalance": null,
    "totalEquity": null,
    "marginBalance": "0",
    "availableBalance": null,
    "initialMarginRate": null,
    "maintenanceMarginRate": null
  },
  "assets": [],
  "positions": [],
  "loans": [],
  "supplies": [],
  "liquidity": null,
  "liquidityFees": {
    "btc": null,
    "usdt": null,
    "since": null,
    "completeHistory": false
  },
  "liquidityPerformance": {
    "sharePriceUsd": null,
    "currentValueUsd": null,
    "totalDepositedUsd": null,
    "totalWithdrawnUsd": null,
    "pnlUsd": null,
    "returnPercent": null,
    "completeHistory": false
  },
  "liquidityRequests": [],
  "schedules": [],
  "events": []
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
