# Aggregated order book

`GET /api/market`

instrument defaults to BTCUSDT. Bids descend, asks ascend. Each row is one aggregated price level, with cumulative BTC total. No individual public orders. Latest 100 trades; market high/low/volume/change use executed exchange trades over 24 hours.

## Authentication

No credentials required. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

| Parameter | Location | Required | Meaning |
| --- | --- | --- | --- |
| `instrument` | query | No | See behavior below. Default: `BTCUSDT`. |

## Behavior

instrument defaults to BTCUSDT. Bids descend, asks ascend. Each row is one aggregated price level, with cumulative BTC total. No individual public orders. Latest 100 trades; market high/low/volume/change use executed exchange trades over 24 hours.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/market"
```

## Response

Response type: [Market](/schemas/Market). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `symbol` | string | Yes | Display symbol; perpetual BTCUSDT is distinct from the spot ID BTCUSDT. |
| `revision` | string | Yes | Revision. |
| `quantityAsset` | string | Yes | Quantity asset. |
| `lastPrice` | string or null | Yes | Last executed exchange price; null when unavailable. Not the external index. |
| `high` | string or null | Yes | High. |
| `low` | string or null | Yes | Low. |
| `volume` | string | Yes | Volume. |
| `change` | string or null | Yes | Percentage change over exchange trades in the last 24 hours; null with no trades. |
| `serverTime` | string (date-time) | Yes | Server time. |
| `bids` | DepthLevel[] | Yes |  |
| `asks` | DepthLevel[] | Yes |  |
| `trades` | PublicTrade[] | Yes |  |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "symbol": "string",
  "revision": "0",
  "quantityAsset": "string",
  "lastPrice": null,
  "high": null,
  "low": null,
  "volume": "0",
  "change": null,
  "serverTime": "2026-11-03T12:00:00Z",
  "bids": [],
  "asks": [],
  "trades": []
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
