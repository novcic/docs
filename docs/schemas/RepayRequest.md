# RepayRequest

Fields are case-sensitive. Numeric amounts and integer counters are JSON strings; dates are UTC ISO 8601 unless noted. Nullable fields are explicitly marked.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `loanId` | string (uuid) | Yes | Loan id. |
| `amount` | string | Yes | Repay: loan asset amount. Add collateral: collateralAsset amount. Positive, up to eight decimal places. |

Nested types are defined in the response schema navigation and the [OpenAPI contract](/openapi.json).
