# PnlRow

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string | Yes | Stable identifier for this resource. |
| `instrumentId` | string | Yes | Canonical instrument ID from GET /api/products. Use the ID, not the display symbol. |
| `kind` | string | Yes | Derivative product: Perpetual, Future or Option. |
| `direction` | string | Yes | Long or Short. Reversing direction closes the old lifecycle and opens a new one. |
| `quantity` | string | Yes | Total BTC quantity opened and closed during this completed lifecycle, including additions; positive for both directions. |
| `averageEntry` | string | Yes | Total opening notional / total quantity, in USDT per BTC. No fee adjustment; up to decimal precision. |
| `averageExit` | string | Yes | Total closing notional / total quantity, in USDT per BTC. Expiry uses actual rounded settlement cash and basis. |
| `grossPnl` | string | Yes | Signed trading P&L before execution fees and funding, in USDT. |
| `openingFee` | string | Yes | Actual opening execution fees allocated to this lifecycle, in USDT. |
| `closingFee` | string | Yes | Actual closing execution fees allocated to this lifecycle, in USDT. No invented fee on expiry. |
| `funding` | string | Yes | Signed actual funding in USDT: positive received, negative paid. Delayed boundary processing may update an already closed row. |
| `netPnl` | string | Yes | grossPnl - openingFee - closingFee + funding, in USDT. A cash claim need not be immediately available to withdraw. |
| `openedAt` | string (date-time) | Yes | UTC time of the first opening fill in this direction. |
| `closedAt` | string (date-time) | Yes | UTC time when this direction becomes flat, reverses or settles. |
| `durationSeconds` | string | Yes | Whole elapsed seconds from openedAt to closedAt, serialized as an integer string. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
