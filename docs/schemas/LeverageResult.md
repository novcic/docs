# LeverageResult

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `leverage` | string | Yes | Integer leverage 1 through 10, serialized as a string. |
| `risk` | RiskSnapshot | Yes |  |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
