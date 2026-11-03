# Revoke API key

`POST /api/keys/{id}/revoke`

Revokes a key owned by the session account. Returns success even when no matching owned key exists. Naturally idempotent.

## Authentication

Bearer JWT session only. Signed API keys cannot call this operation. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

| Parameter | Location | Required | Meaning |
| --- | --- | --- | --- |
| `id` | path | Yes | Resource UUID. |

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |


## Behavior

Revokes a key owned by the session account. Returns success even when no matching owned key exists. Naturally idempotent.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/keys/11111111-1111-4111-8111-111111111111/revoke" -H "Authorization: Bearer $NOVCIC_TOKEN" -H 'Content-Type: application/json' --data '{}'
```

## Response

Response type: [Message](/schemas/Message). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `message` | string | Yes | Message. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "message": "string"
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
