# Trade candles

`GET /api/candles`

instrument defaults to BTCUSDT; interval is 1m, 5m, 15m or 1h. Up to 500 candles. time is Unix seconds as a string. Candles derive from exchange executions, not external index prices; quiet periods may carry forward the last known close.

## Authentication

No credentials required. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

| Parameter | Location | Required | Meaning |
| --- | --- | --- | --- |
| `instrument` | query | No | See behavior below. Default: `BTCUSDT`. |
| `interval` | query | No | See behavior below. Default: `1m`. |

## Behavior

instrument defaults to BTCUSDT; interval is 1m, 5m, 15m or 1h. Up to 500 candles. time is Unix seconds as a string. Candles derive from exchange executions, not external index prices; quiet periods may carry forward the last known close.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/candles"
```

## Response

Response type: [Candle[]](/schemas/Candle). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `time` | string | Yes | UTC timestamp; Candle.time is Unix seconds encoded as a string. |
| `open` | string | Yes | Open. |
| `high` | string | Yes | High. |
| `low` | string | Yes | Low. |
| `close` | string | Yes | Close. |
| `volume` | string | Yes | Volume. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
[]
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
