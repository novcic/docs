# Create recurring purchase

`POST /api/dca`

amount is positive USDT per purchase, up to six decimals. hours is 1, 24 or 168. Optional budget must cover at least one run. First run is scheduled one interval ahead; funds are not reserved.

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
| `amount` | string | Yes | Token amount unless the endpoint explicitly states shares. |
| `hours` | string | Yes | DCA interval: 1, 24 or 168. |
| `budget` | string or null | No | Optional total USDT DCA spend cap. |

## Behavior

amount is positive USDT per purchase, up to six decimals. hours is 1, 24 or 168. Optional budget must cover at least one run. First run is scheduled one interval ahead; funds are not reserved.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/dca" -H "Authorization: Bearer $NOVCIC_TOKEN" -H "Idempotency-Key: $REQUEST_ID" -H 'Content-Type: application/json' --data '{"amount":"10.000000","hours":"24","budget":"100.000000"}'
```

## Response

Response type: [DcaSchedule](/schemas/DcaSchedule). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `amount` | string | Yes | Token amount unless the endpoint explicitly states shares. |
| `budget` | string or null | Yes | Optional total USDT DCA spend cap. |
| `spent` | string | Yes | Actual cumulative USDT spend. |
| `hours` | string | Yes | DCA interval: 1, 24 or 168. |
| `nextRun` | string (date-time) | Yes | Next scheduled UTC execution time. |
| `paused` | boolean | Yes | Paused. |
| `lastOutcome` | string or null | Yes | Human-readable latest execution outcome, nullable before first run. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "id": "11111111-1111-4111-8111-111111111111",
  "userId": "11111111-1111-4111-8111-111111111111",
  "amount": "0",
  "budget": null,
  "spent": "0",
  "hours": "0",
  "nextRun": "2026-11-03T12:00:00Z",
  "paused": false,
  "lastOutcome": null
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. A timeout or 5xx can leave the result unknown: retry the same command key, then reconcile account state.  See [errors and limits](/guides/errors).
