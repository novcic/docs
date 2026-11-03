# Candle

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `time` | string | Yes | UTC timestamp; Candle.time is Unix seconds encoded as a string. |
| `open` | string | Yes | Open. |
| `high` | string | Yes | High. |
| `low` | string | Yes | Low. |
| `close` | string | Yes | Close. |
| `volume` | string | Yes | Volume. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
