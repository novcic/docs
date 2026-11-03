# ProfileUpdate

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `username` | string | Yes | Username. |
| `avatar` | string | Yes | Avatar. |
| `dateOfBirth` | string (date) or null | No | Date of birth. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
