# Transfer

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `reference` | string (uuid) | Yes | Reference. |
| `message` | string | Yes | Message. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
