# Trading configuration

`GET /api/config`

Read configured ticks and AMM fees. Legacy fees is user-to-user only; use amm for execution fees. DerivativeLevels is the maximum per-side target before tick collisions and risk constraints.

## Authentication

No credentials required. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

## Behavior

Read configured ticks and AMM fees. Legacy fees is user-to-user only; use amm for execution fees. DerivativeLevels is the maximum per-side target before tick collisions and risk constraints.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/config"
```

## Response

Response type: [Config](/schemas/Config). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `symbol` | string | Yes | Display symbol; perpetual BTCUSDT is distinct from the spot ID BTCUSDT. |
| `quantityStep` | string | Yes | Quantity step. |
| `priceTick` | string | Yes | Price tick. |
| `fees` | string | Yes | Fees. |
| `feeModel` | string | Yes | Fee model. |
| `userToUserFee` | string | Yes | User to user fee. |
| `amm` | AmmSettings | Yes |  |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "symbol": "string",
  "quantityStep": "0",
  "priceTick": "0",
  "fees": "0",
  "feeModel": "string",
  "userToUserFee": "0",
  "amm": {
    "spotFee": "0",
    "futuresFee": "0",
    "optionFee": "0",
    "optionPremiumCap": "0",
    "lpShare": "0",
    "derivativeLevels": "0"
  }
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
