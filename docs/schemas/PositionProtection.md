# PositionProtection

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `instrumentId` | string | Yes | Canonical instrument ID from GET /api/products. Use the ID, not the display symbol. |
| `lifecycleId` | string (uuid) | Yes | Lifecycle id. |
| `version` | string | Yes | Version. |
| `direction` | string | Yes | Direction. |
| `takeProfit` | string or null | Yes | Take profit. |
| `stopLoss` | string or null | Yes | Stop loss. |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. Values: `Armed`, `Closing`, `Completed`, `Cancelled`. |
| `triggerLeg` | string or null | Yes | Trigger leg. |
| `triggerSequence` | string or null | Yes | Instrument trade sequence that atomically triggered the first leg; sibling is cancelled. |
| `attempts` | string | Yes | Durable count of market-close attempts, including waits caused by domain restrictions. |
| `nextAttemptAt` | string (date-time) | Yes | Next attempt at. |
| `detail` | string or null | Yes | Human-readable status detail. Do not parse as an enum. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
