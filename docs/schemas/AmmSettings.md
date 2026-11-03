# AmmSettings

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `spotFee` | string | No | Spot fee. |
| `futuresFee` | string | No | Futures fee. |
| `optionFee` | string | No | Option fee. |
| `optionPremiumCap` | string | No | Option premium cap. |
| `lpShare` | string | No | Lp share. |
| `derivativeLevels` | string | No | Derivative levels. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
