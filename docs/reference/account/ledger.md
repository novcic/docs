# Account ledger

`GET /api/ledger`

Latest 100 net wallet movements, descending ledger ID; zero-net reservations and releases are excluded before the limit. Signed deltas are exact decimal strings. Use referenceId to associate movements with operations; historical pagination is not implemented.

## Authentication

Bearer JWT or an HMAC-signed Read/Trade API key. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

## Behavior

Latest 100 net wallet movements, descending ledger ID; zero-net reservations and releases are excluded before the limit. Signed deltas are exact decimal strings. Use referenceId to associate movements with operations; historical pagination is not implemented.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/ledger" -H "Authorization: Bearer $NOVCIC_TOKEN"
```

## Response

Response type: [LedgerEntry[]](/schemas/LedgerEntry). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `id` | string | Yes | Stable identifier for this resource. |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `wallet` | string | Yes | Wallet. |
| `asset` | string | Yes | BTC or USDT. |
| `availableDelta` | string | Yes | Available delta. |
| `lockedDelta` | string | Yes | Locked delta. |
| `reason` | string | Yes | Reason. |
| `referenceId` | string (uuid) | Yes | Reference id. |
| `createdAt` | string (date-time) | Yes | UTC creation timestamp. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
[]
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
