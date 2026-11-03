# Session

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `accessToken` | string | Yes | Access token. |
| `expiresAt` | string (date-time) | Yes | UTC expiry timestamp. |
| `user` | User | Yes |  |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
