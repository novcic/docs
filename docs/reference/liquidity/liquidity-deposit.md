# Queue liquidity contribution

`POST /api/liquidity-deposit`

Accepts either or both assets into escrow. An unbalanced contribution waits for real spot counterparties to reach approximately 50:50 value. Shares are issued only on activation at current NAV.

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
| `btc` | string | Yes | Btc. |
| `usdt` | string | Yes | Usdt. |

## Behavior

Accepts either or both assets into escrow. An unbalanced contribution waits for real spot counterparties to reach approximately 50:50 value. Shares are issued only on activation at current NAV.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/liquidity-deposit" -H "Authorization: Bearer $NOVCIC_TOKEN" -H "Idempotency-Key: $REQUEST_ID" -H 'Content-Type: application/json' --data '{"btc":"0.01000000","usdt":"750.00000000"}'
```

## Response

Response type: [LiquidityOperation](/schemas/LiquidityOperation). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `poolId` | string | Yes | Pool id. |
| `kind` | string | Yes | Resource or wallet kind; spelling is case-sensitive. |
| `asset` | string | Yes | BTC or USDT. |
| `btc` | string | Yes | Btc. |
| `usdt` | string | Yes | Usdt. |
| `shares` | string | Yes | Product units, not necessarily token amounts. |
| `received` | string | Yes | Asset amount actually received on liquidity withdrawal; zero while pending. |
| `depositValueUsd` | string or null | Yes | Original submitted contribution at request-time USD reference value. Fixed historical estimate, nullable for unsupported legacy history; included in invested totals only after completion. |
| `withdrawalValueUsd` | string or null | Yes | Completed payout at execution-time USD reference value, including any BTC dust. Null before completion or for unavailable legacy valuation. |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. |
| `detail` | string | Yes | Human-readable status detail. Do not parse as an enum. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |
| `completedAt` | string (date-time) or null | Yes | Completed at. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "id": "11111111-1111-4111-8111-111111111111",
  "userId": "11111111-1111-4111-8111-111111111111",
  "poolId": "0",
  "kind": "string",
  "asset": "string",
  "btc": "0",
  "usdt": "0",
  "shares": "0",
  "received": "0",
  "depositValueUsd": null,
  "withdrawalValueUsd": null,
  "status": "string",
  "detail": "string",
  "createdAt": "2026-11-03T12:00:00Z",
  "completedAt": null
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. A timeout or 5xx can leave the result unknown: retry the same command key, then reconcile account state.  See [errors and limits](/guides/errors).
