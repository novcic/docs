# NewApiKey

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `secret` | string | Yes | Secret. |
| `scope` | string | Yes | Scope. |
| `expiresAt` | string (date-time) | Yes | UTC expiry timestamp. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
