# Request withdrawal

`POST /api/withdraw`

Debits Funding atomically and queues signing/broadcast. BTC supports eight decimals; USDT six. Destination must be a nonzero 0x address with 40 hexadecimal digits. Final status appears in custody/history.

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
| `address` | string | Yes | Address. |
| `amount` | string | Yes | Token amount unless the endpoint explicitly states shares. |

## Behavior

Debits Funding atomically and queues signing/broadcast. BTC supports eight decimals; USDT six. Destination must be a nonzero 0x address with 40 hexadecimal digits. Final status appears in custody/history.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/withdraw" -H "Authorization: Bearer $NOVCIC_TOKEN" -H "Idempotency-Key: $REQUEST_ID" -H 'Content-Type: application/json' --data '{"asset":"USDT","address":"0x1111111111111111111111111111111111111111","amount":"10.000000"}'
```

## Response

Response type: [Withdrawal](/schemas/Withdrawal). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `generation` | string | Yes | Generation. |
| `kind` | string | Yes | Resource or wallet kind; spelling is case-sensitive. |
| `asset` | string | Yes | BTC or USDT. |
| `amount` | string | Yes | Token amount unless the endpoint explicitly states shares. |
| `address` | string | Yes | Address. |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. |
| `hash` | string or null | Yes | On-chain transaction hash, nullable before signing. |
| `rawTransaction` | string or null | Yes | Always null in the initial queued response. Use sanitized custody/history for subsequent status; signing data is not exposed there. |
| `sender` | string or null | Yes | Sender. |
| `nonce` | string or null | Yes | Nonce. |
| `block` | string or null | Yes | On-chain block number, nullable before confirmation. |
| `blockHash` | string or null | Yes | Block hash. |
| `logIndex` | string | Yes | Log index. |
| `error` | string or null | Yes | Human-readable error; nullable on transfer history. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "id": "11111111-1111-4111-8111-111111111111",
  "userId": "11111111-1111-4111-8111-111111111111",
  "generation": "string",
  "kind": "string",
  "asset": "string",
  "amount": "0",
  "address": "string",
  "status": "string",
  "hash": null,
  "rawTransaction": null,
  "sender": null,
  "nonce": null,
  "block": null,
  "blockHash": null,
  "logIndex": "0",
  "error": null,
  "createdAt": "2026-11-03T12:00:00Z"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. A timeout or 5xx can leave the result unknown: retry the same command key, then reconcile account state.  See [errors and limits](/guides/errors).
