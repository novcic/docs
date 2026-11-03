# Risk and product positions

`GET /api/portfolio`

A consistent account snapshot. Includes all positions, loans, supplies and DCA schedules; latest 100 risk events and liquidity requests. Funding balances are outside cross-margin equity.

## Authentication

Bearer JWT or an HMAC-signed Read/Trade API key. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

## Behavior

A consistent account snapshot. Includes all positions, loans, supplies and DCA schedules; latest 100 risk events and liquidity requests. Funding balances are outside cross-margin equity.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/portfolio" -H "Authorization: Bearer $NOVCIC_TOKEN"
```

## Response

Response type: [Portfolio](/schemas/Portfolio). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `risk` | RiskSnapshot | Yes |  |
| `positions` | Position[] | Yes |  |
| `loans` | Loan[] | Yes |  |
| `supplies` | Supply[] | Yes |  |
| `liquidity` | LiquidityShare or null | Yes |  |
| `liquidityRequests` | LiquidityOperation[] | Yes |  |
| `schedules` | DcaSchedule[] | Yes |  |
| `events` | RiskEvent[] | Yes |  |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
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
    "restricted": false
  },
  "positions": [],
  "loans": [],
  "supplies": [],
  "liquidity": null,
  "liquidityRequests": [],
  "schedules": [],
  "events": []
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
