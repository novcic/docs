# User

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `email` | string | Yes | Email. |
| `country` | string | Yes | Country. |
| `username` | string | Yes | Username. |
| `avatar` | string | Yes | Avatar. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
