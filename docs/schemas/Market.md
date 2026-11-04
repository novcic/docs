# Market

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `symbol` | string | Yes | Display symbol; perpetual BTCUSDT is distinct from the spot ID BTCUSDT. |
| `revision` | string | Yes | Revision. |
| `quantityAsset` | string | Yes | Quantity asset. |
| `markPrice` | string or null | Yes | Derivative mark used for P&L and liquidation risk; null for spot, unknown instruments or unavailable reference pricing. |
| `lastPrice` | string or null | Yes | Last executed exchange price; null when unavailable. Not the external index. |
| `high` | string or null | Yes | High. |
| `low` | string or null | Yes | Low. |
| `volume` | string | Yes | Volume. |
| `change` | string or null | Yes | Percentage change over exchange trades in the last 24 hours; null with no trades. |
| `serverTime` | string (date-time) | Yes | Server time. |
| `bids` | DepthLevel[] | Yes |  |
| `asks` | DepthLevel[] | Yes |  |
| `trades` | PublicTrade[] | Yes |  |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
