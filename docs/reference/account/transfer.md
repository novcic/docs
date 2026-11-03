# Transfer between accounts

`POST /api/transfer`

Atomic wallet transfer. From and to must differ. Unified Trading outflows respect margin and option coverage; Funding-to-Trading top-ups remain possible during stale prices.

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
| `asset` | string | Yes | BTC or USDT. Values: `BTC`, `USDT`. |
| `from` | string | Yes | From. Values: `Funding`, `Unified Trading`. |
| `to` | string | Yes | To. Values: `Funding`, `Unified Trading`. |
| `amount` | string | Yes | Token amount unless the endpoint explicitly states shares. |

## Behavior

Atomic wallet transfer. From and to must differ. Unified Trading outflows respect margin and option coverage; Funding-to-Trading top-ups remain possible during stale prices.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/transfer" -H "Authorization: Bearer $NOVCIC_TOKEN" -H "Idempotency-Key: $REQUEST_ID" -H 'Content-Type: application/json' --data '{"asset":"USDT","from":"Funding","to":"Unified Trading","amount":"100.00"}'
```

## Response

Response type: [Transfer](/schemas/Transfer). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `reference` | string (uuid) | Yes | Reference. |
| `message` | string | Yes | Message. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "reference": "11111111-1111-4111-8111-111111111111",
  "message": "string"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. A timeout or 5xx can leave the result unknown: retry the same command key, then reconcile account state.  See [errors and limits](/guides/errors).
