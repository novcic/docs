# Settlement

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `message` | string | Yes | Message. |
| `amount` | string | No | Token amount unless the endpoint explicitly states shares. |
| `pending` | string | No | Pending. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
