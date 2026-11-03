# Amm

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `btc` | string | Yes | Btc. |
| `usdt` | string | Yes | Usdt. |
| `shares` | string | Yes | Product units, not necessarily token amounts. |
| `feesEarned` | string | Yes | Cumulative LP share of AMM execution fees in USDT; already reflected in pool NAV. |
| `nav` | string or null | Yes | Marked pool net asset value in USDT, including derivative positions and cash. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
