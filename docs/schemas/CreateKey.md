# CreateKey

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `name` | string | Yes | Name. |
| `scope` | string | Yes | Scope. Values: `Read`, `Trade`. |
| `products` | string[] | No | Product permissions. Omitted on creation defaults to Spot. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
