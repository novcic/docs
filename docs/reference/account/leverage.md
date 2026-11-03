# Update account leverage

`POST /api/leverage`

Integer 1-10. Applies immediately to all perpetual and expiry-futures positions and open orders. Insufficient margin rejects the entire change.

## Authentication

Bearer JWT or an HMAC-signed Trade API key. Read keys cannot submit this command. See [authentication](/guides/authentication).

**Idempotency-Key is required.** Retrying the same operation must reuse the key and unchanged payload. See [safe retries](/guides/retries).

## Parameters

| Parameter | Location | Required | Meaning |
| --- | --- | --- | --- |
| `Idempotency-Key` | header | Yes | Reuse unchanged for retries of this operation. |

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `leverage` | string | Yes | Integer leverage 1 through 10, serialized as a string. |

## Behavior

Integer 1-10. Applies immediately to all perpetual and expiry-futures positions and open orders. Insufficient margin rejects the entire change.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/leverage" -H "Authorization: Bearer $NOVCIC_TOKEN" -H "Idempotency-Key: $REQUEST_ID" -H 'Content-Type: application/json' --data '{"leverage":"5"}'
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
    "restricted": false
  }
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. A timeout or 5xx can leave the result unknown: retry the same command key, then reconcile account state.  See [errors and limits](/guides/errors).
