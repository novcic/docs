# PasswordChange

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `currentPassword` | string | Yes | Current password. |
| `newPassword` | string | Yes | New password. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
