# Cancel all open orders

`POST /api/cancel-all`

Cancels your open and partially-filled orders across every instrument and releases reserved spot funds.

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


## Behavior

Cancels your open and partially-filled orders across every instrument and releases reserved spot funds.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/cancel-all" -H "Authorization: Bearer $NOVCIC_TOKEN" -H "Idempotency-Key: $REQUEST_ID" -H 'Content-Type: application/json' --data '{}'
```

## Response

Response type: [CancelAll](/schemas/CancelAll). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `cancelled` | string | Yes | Cancelled. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "cancelled": "0"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. A timeout or 5xx can leave the result unknown: retry the same command key, then reconcile account state.  See [errors and limits](/guides/errors).
