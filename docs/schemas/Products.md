# Products

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `index` | IndexSample or null | Yes |  |
| `priceFresh` | boolean | Yes |  |
| `instruments` | Instrument[] | Yes |  |
| `tickers` | Ticker[] | Yes |  |
| `pools` | LendingPool[] | Yes |  |
| `amm` | Amm | Yes |  |
| `optionAnalytics` | OptionAnalytics[] | Yes |  |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
