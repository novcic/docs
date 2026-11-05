# QueueDeposit

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `btc` | string | Yes | Btc. |
| `usdt` | string | Yes | Usdt. |
| `sourceAccount` | string or null | No | Account debited for both assets. Omitted or null preserves Unified Trading. Funding contributions do not consume trading collateral. Values: `Funding`, `Unified Trading`, `null`. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
