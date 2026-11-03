# ApiKey

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `name` | string | Yes | Name. |
| `scope` | string | Yes | Scope. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |
| `expiresAt` | string (date-time) | Yes | UTC expiry timestamp. |
| `revoked` | boolean | Yes | Revoked. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
