# DcaSchedule

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `amount` | string | Yes | Token amount unless the endpoint explicitly states shares. |
| `budget` | string or null | Yes | Optional total USDT DCA spend cap. |
| `spent` | string | Yes | Actual cumulative USDT spend. |
| `hours` | string | Yes | DCA interval: 1, 24 or 168. |
| `nextRun` | string (date-time) | Yes | Next scheduled UTC execution time. |
| `paused` | boolean | Yes | Paused. |
| `lastOutcome` | string or null | Yes | Human-readable latest execution outcome, nullable before first run. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
