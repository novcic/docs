# PnlPage

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `items` | PnlRow[] | Yes |  |
| `nextCursor` | string or null | Yes | Opaque continuation cursor for the same account, permissions and filters. Null ends the result. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
