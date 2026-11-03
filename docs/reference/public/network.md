# Supported network and tokens

`GET /api/network`

Read current generation and contract addresses before depositing. The currently implemented network is Ethereum Local, chain ID 31337, with three confirmations. BTC is an ERC-20 token here, not native Bitcoin.

## Authentication

No credentials required. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

## Behavior

Read current generation and contract addresses before depositing. The currently implemented network is Ethereum Local, chain ID 31337, with three confirmations. BTC is an ERC-20 token here, not native Bitcoin.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/network"
```

## Response

Response type: [Network](/schemas/Network). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `network` | string | Yes | Network. |
| `chainId` | string | Yes | Chain id. |
| `confirmations` | string | Yes | Confirmations. |
| `generation` | string | Yes | Generation. |
| `tokens` | object | Yes |  |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "network": "string",
  "chainId": "0",
  "confirmations": "0",
  "generation": "string",
  "tokens": {
    "BTC": {
      "address": "string",
      "decimals": "0"
    },
    "USDT": {
      "address": "string",
      "decimals": "0"
    }
  }
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
