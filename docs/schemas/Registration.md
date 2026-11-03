# Registration

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `email` | string | Yes | Email. |
| `password` | string | Yes | Password. |
| `country` | string | Yes | Country. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
