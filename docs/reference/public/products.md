# Instruments, tickers and pools

`GET /api/products`

Discover canonical IDs and status before trading. Perpetual symbol BTCUSDT maps to ID BTC-PERP. Last price and change may be null. IV and option marks are null when references are unsupported or stale. Index freshness threshold is five seconds.

## Authentication

No credentials required. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

## Behavior

Discover canonical IDs and status before trading. Perpetual symbol BTCUSDT maps to ID BTC-PERP. Last price and change may be null. IV and option marks are null when references are unsupported or stale. Index freshness threshold is five seconds.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/products"
```

## Response

Response type: [Products](/schemas/Products). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `index` | IndexSample or null | Yes |  |
| `priceFresh` | boolean | Yes |  |
| `instruments` | Instrument[] | Yes |  |
| `tickers` | Ticker[] | Yes |  |
| `pools` | LendingPool[] | Yes |  |
| `amm` | Amm | Yes |  |
| `optionAnalytics` | OptionAnalytics[] | Yes |  |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "index": null,
  "priceFresh": false,
  "instruments": [],
  "tickers": [],
  "pools": [],
  "amm": {
    "btc": "0",
    "usdt": "0",
    "shares": "0",
    "feesEarned": "0",
    "nav": null
  },
  "optionAnalytics": []
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
