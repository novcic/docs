# RiskSnapshot

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `equity` | string | Yes | Cross-margin equity in USDT after collateral haircuts and option coverage. |
| `initialMargin` | string | Yes | USDT initial margin required by positions and resting derivative orders. |
| `maintenanceMargin` | string | Yes | USDT maintenance margin required by futures positions. |
| `transferableUsdt` | string | Yes | USDT that can leave Unified Trading under current risk checks. |
| `transferableBtc` | string | Yes | BTC that can leave Unified Trading under current risk checks. |
| `unrealizedPnl` | string | Yes | Mark-to-market USDT unrealized P&L, including option value. |
| `realizedCash` | string | Yes | Signed realized USDT cash claim/obligation; a positive claim may await funded settlement. |
| `indexPrice` | string | Yes | Index price. |
| `priceFresh` | boolean | Yes | Whether required price references are fresh. |
| `restricted` | boolean | Yes | Whether maintenance or covered-option constraints are breached. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
