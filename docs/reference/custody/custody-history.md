# Deposit and withdrawal history

`GET /api/custody/history`

Latest 100 deposits and withdrawals. Private signing keys, raw transactions and internal sweep/gas jobs are excluded. Poll this endpoint for finality.

## Authentication

Bearer JWT or an HMAC-signed Read/Trade API key. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

## Behavior

Latest 100 deposits and withdrawals. Private signing keys, raw transactions and internal sweep/gas jobs are excluded. Poll this endpoint for finality.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/custody/history" -H "Authorization: Bearer $NOVCIC_TOKEN"
```

## Response

Response type: [ChainTransfer[]](/schemas/ChainTransfer). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string (uuid) | Yes | Stable identifier for this resource. |
| `kind` | string | Yes | Resource or wallet kind; spelling is case-sensitive. |
| `asset` | string | Yes | BTC or USDT. |
| `amount` | string | Yes | Token amount unless the endpoint explicitly states shares. |
| `address` | string | Yes | Address. |
| `status` | string | Yes | Current lifecycle state. See the relevant guide for transitions. |
| `hash` | string or null | Yes | On-chain transaction hash, nullable before signing. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |
| `block` | string or null | Yes | On-chain block number, nullable before confirmation. |
| `error` | string or null | Yes | Human-readable error; nullable on transfer history. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
[]
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
