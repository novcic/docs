# Stop automatic closing

`POST /api/stop-closing`

Stops this owned lifecycle protection atomically. Requires current id/version and instrument permission. Already committed fills remain final; remaining position stays open. Read current protection from portfolio before requesting.

## Authentication

Bearer JWT or an HMAC-signed Trade API key. Read keys cannot submit this command. See [authentication](/guides/authentication).

**Idempotency-Key is required.** Retrying the same operation must reuse the key and unchanged payload. See [safe retries](/guides/retries).

## Parameters

| Parameter | Location | Required | Meaning |
| --- | --- | --- | --- |
| `Idempotency-Key` | header | Yes | Reuse unchanged for retries of this operation. |

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `instrument` | string | Yes | Instrument. |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `version` | string | Yes | Version. |

## Behavior

Stops this owned lifecycle protection atomically. Requires current id/version and instrument permission. Already committed fills remain final; remaining position stays open. Read current protection from portfolio before requesting.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/stop-closing" -H "Authorization: Bearer $NOVCIC_TOKEN" -H "Idempotency-Key: $REQUEST_ID" -H 'Content-Type: application/json' --data '{"instrument":"BTC-PERP","id":"11111111-1111-4111-8111-111111111111","version":"2"}'
```

## Response

Response type: [PositionProtection](/schemas/PositionProtection). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `instrumentId` | string | Yes | Canonical instrument ID from GET /api/products. Use the ID, not the display symbol. |
| `lifecycleId` | string (uuid) | Yes | Lifecycle id. |
| `version` | string | Yes | Version. |
| `direction` | string | Yes | Direction. |
| `takeProfit` | string or null | Yes | Take profit. |
| `stopLoss` | string or null | Yes | Stop loss. |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. Values: `Armed`, `Closing`, `Completed`, `Cancelled`. |
| `triggerLeg` | string or null | Yes | Trigger leg. |
| `triggerSequence` | string or null | Yes | Instrument trade sequence that atomically triggered the first leg; sibling is cancelled. |
| `attempts` | string | Yes | Durable count of market-close attempts, including waits caused by domain restrictions. |
| `nextAttemptAt` | string (date-time) | Yes | Next attempt at. |
| `detail` | string or null | Yes | Human-readable status detail. Do not parse as an enum. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "id": "11111111-1111-4111-8111-111111111111",
  "userId": "11111111-1111-4111-8111-111111111111",
  "instrumentId": "string",
  "lifecycleId": "11111111-1111-4111-8111-111111111111",
  "version": "0",
  "direction": "0",
  "takeProfit": null,
  "stopLoss": null,
  "status": "Armed",
  "triggerLeg": null,
  "triggerSequence": null,
  "attempts": "0",
  "nextAttemptAt": "2026-11-03T12:00:00Z",
  "detail": null
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. A timeout or 5xx can leave the result unknown: retry the same command key, then reconcile account state.  See [errors and limits](/guides/errors).
