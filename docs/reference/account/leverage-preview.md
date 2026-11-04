# Preview account leverage

`POST /api/leverage-preview`

Read or Trade keys require both futures permissions. Rollback-only evaluation of the proposed account leverage and margin. No receipt or account change. Insufficient margin returns 400.

## Authentication

Bearer JWT or an HMAC-signed Read/Trade API key. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `leverage` | string | Yes | Integer leverage 1 through 10, serialized as a string. |

## Behavior

Read or Trade keys require both futures permissions. Rollback-only evaluation of the proposed account leverage and margin. No receipt or account change. Insufficient margin returns 400.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/leverage-preview" -H "Authorization: Bearer $NOVCIC_TOKEN" -H 'Content-Type: application/json' --data '{"leverage":"5"}'
```

## Response

Response type: [LeverageResult](/schemas/LeverageResult). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `leverage` | string | Yes | Integer leverage 1 through 10, serialized as a string. |
| `risk` | RiskSnapshot | Yes |  |

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
  }
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
