# OrderPreview

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `maximumQuantity` | string | Yes | Maximum quantity. |
| `quantity` | string | Yes | BTC quantity. Signed quantities on positions: positive long, negative short. |
| `fee` | string | Yes | Fee. |
| `feeAsset` | string | Yes | Fee asset. |
| `netReceipt` | string | Yes | Net receipt. |
| `orderCost` | string | Yes | Order cost. |
| `orderCostAsset` | string | Yes | Order cost asset. |
| `revision` | string | Yes | Revision. |
| `error` | string or null | No | Human-readable error; nullable on transfer history. |
| `referencePrice` | string or null | No | Reference price. |
| `priceSource` | string | Yes | Price source. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
