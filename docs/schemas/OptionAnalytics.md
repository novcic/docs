# OptionAnalytics

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `instrumentId` | string | Yes | Canonical instrument ID from GET /api/products. Use the ID, not the display symbol. |
| `iv` | string or null | Yes | Annualized implied volatility as a fraction, nullable without supported fresh references. |
| `mark` | string or null | Yes | Theoretical USDT option premium per BTC. |
| `delta` | string or null | Yes | Option delta, nullable without supported fresh references. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
