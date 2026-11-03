# Withdrawal

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `generation` | string | Yes | Generation. |
| `kind` | string | Yes | Resource or wallet kind; spelling is case-sensitive. |
| `asset` | string | Yes | BTC or USDT. |
| `amount` | string | Yes | Token amount unless the endpoint explicitly states shares. |
| `address` | string | Yes | Address. |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. |
| `hash` | string or null | Yes | On-chain transaction hash, nullable before signing. |
| `rawTransaction` | string or null | Yes | Always null in the initial queued response. Use sanitized custody/history for subsequent status; signing data is not exposed there. |
| `sender` | string or null | Yes | Sender. |
| `nonce` | string or null | Yes | Nonce. |
| `block` | string or null | Yes | On-chain block number, nullable before confirmation. |
| `blockHash` | string or null | Yes | Block hash. |
| `logIndex` | string | Yes | Log index. |
| `error` | string or null | Yes | Human-readable error; nullable on transfer history. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
