# Wallet balances

`GET /api/balances`

Returns BTC and USDT wallets for Funding and Unified Trading. available plus locked is wallet total. Use risk.transferable values before transferring collateral out.

## Authentication

Bearer JWT or an HMAC-signed Read/Trade API key. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

## Behavior

Returns BTC and USDT wallets for Funding and Unified Trading. available plus locked is wallet total. Use risk.transferable values before transferring collateral out.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/balances" -H "Authorization: Bearer $NOVCIC_TOKEN"
```

## Response

Response type: [Wallet[]](/schemas/Wallet). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `userId` | string (uuid) | Yes | Owning account UUID. |
| `kind` | string | Yes | Resource or wallet kind; spelling is case-sensitive. |
| `asset` | string | Yes | BTC or USDT. |
| `available` | string | Yes | Available asset amount; derivative transfer limits are in portfolio.risk. |
| `locked` | string | Yes | Asset amount reserved for outstanding operations. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
[]
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
