# Config

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `symbol` | string | Yes | Display symbol; perpetual BTCUSDT is distinct from the spot ID BTCUSDT. |
| `quantityStep` | string | Yes | Quantity step. |
| `priceTick` | string | Yes | Price tick. |
| `fees` | string | Yes | Fees. |
| `feeModel` | string | Yes | Fee model. |
| `userToUserFee` | string | Yes | User to user fee. |
| `amm` | AmmSettings | Yes |  |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
