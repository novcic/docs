# LedgerEntry

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `wallet` | string | Yes | Wallet. |
| `asset` | string | Yes | BTC or USDT. |
| `availableDelta` | string | Yes | Available delta. |
| `lockedDelta` | string | Yes | Locked delta. |
| `reason` | string | Yes | Reason. |
| `referenceId` | string (uuid) | Yes | Reference id. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
