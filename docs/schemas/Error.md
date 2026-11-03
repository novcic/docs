# Error

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `error` | string | Yes | Human-readable error; nullable on transfer history. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
