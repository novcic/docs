# PlaceOrder

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `side` | string | Yes | Side. Values: `Buy`, `Sell`. |
| `type` | string | Yes | Type. Values: `Limit`, `Market`. |
| `quantity` | string | Yes | Positive BTC quantity in multiples of 0.000001. |
| `price` | string or null | No | Positive USDT price in multiples of 0.01 for Limit; null for Market. |
| `instrument` | string | No | Canonical products.instruments[].id. Default BTCUSDT (spot). Perpetual uses BTC-PERP internally; display symbol BTCUSDT. |
| `leverage` | string or null | No | Deprecated optional assertion: must match account leverage for futures. Omit to use account setting. Spot permits null or 1; options use covered collateral. |
| `reduceOnly` | boolean | No | If true, execution must reduce an existing derivative position. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
