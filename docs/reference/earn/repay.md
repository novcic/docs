# Repay loan

`POST /api/repay`

Pays accrued interest before principal. Requested amount is capped at total debt; proportional collateral returns. Full repayment marks Repaid.

## Authentication

Bearer JWT session only. Signed API keys cannot call this operation. See [authentication](/guides/authentication).

**Idempotency-Key is required.** Retrying the same operation must reuse the key and unchanged payload. See [safe retries](/guides/retries).

## Parameters

| Parameter | Location | Required | Meaning |
| --- | --- | --- | --- |
| `Idempotency-Key` | header | Yes | Reuse unchanged for retries of this operation. |

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `loanId` | string (uuid) | Yes | Loan id. |
| `amount` | string | Yes | Repay: loan asset amount. Add collateral: collateralAsset amount. Positive, up to eight decimal places. |

## Behavior

Pays accrued interest before principal. Requested amount is capped at total debt; proportional collateral returns. Full repayment marks Repaid.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/repay" -H "Authorization: Bearer $NOVCIC_TOKEN" -H "Idempotency-Key: $REQUEST_ID" -H 'Content-Type: application/json' --data '{"loanId":"11111111-1111-4111-8111-111111111111","amount":"100.00000000"}'
```

## Response

Response type: [Loan](/schemas/Loan). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `asset` | string | Yes | BTC or USDT. |
| `collateralAsset` | string | Yes | Collateral asset. |
| `principal` | string | Yes | Outstanding principal in the loan asset. |
| `interest` | string | Yes | Accrued debt in the loan asset. |
| `interestRemainder` | string | Yes | Sub-ledger interest remainder, retained at up to 20 decimals. |
| `badDebt` | string | Yes | Recognized unrecovered debt in the loan asset. |
| `collateral` | string | Yes | Pledged amount in collateralAsset. |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "id": "11111111-1111-4111-8111-111111111111",
  "userId": "11111111-1111-4111-8111-111111111111",
  "asset": "string",
  "collateralAsset": "string",
  "principal": "0",
  "interest": "0",
  "interestRemainder": "0",
  "badDebt": "0",
  "collateral": "0",
  "status": "string",
  "createdAt": "2026-11-03T12:00:00Z"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. A timeout or 5xx can leave the result unknown: retry the same command key, then reconcile account state.  See [errors and limits](/guides/errors).
