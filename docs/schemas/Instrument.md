# Instrument

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string | Yes | Stable identifier for this resource. |
| `kind` | string | Yes | Resource or wallet kind; spelling is case-sensitive. |
| `expiry` | string (date-time) or null | Yes | Contract expiry in UTC; null for spot/perpetual. |
| `strike` | string or null | Yes | USDT option strike; null for other products. |
| `optionSide` | string or null | Yes | Call or Put; null for other products. |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. |
| `settlementPrice` | string or null | Yes | Final settlement index; null before settlement. |
| `symbol` | string | No | Display symbol; perpetual BTCUSDT is distinct from the spot ID BTCUSDT. |
| `baseAsset` | string | No | Base asset. |
| `quoteAsset` | string | No | Quote asset. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
