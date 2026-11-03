# SwapRequest

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `asset` | string | Yes | BTC or USDT. |
| `amount` | string | Yes | Token amount unless the endpoint explicitly states shares. |
| `minimumReceived` | string | Yes | Minimum received. |
| `deadline` | string (date-time) | Yes | Deadline. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
