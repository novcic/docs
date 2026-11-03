# Change password

`POST /api/profile/password`

Requires current password and a new password of 10-128 characters including a letter and digit. Atomically revokes every refresh session and API key and immediately invalidates access tokens. Sign in again. Rate limited; no idempotency receipt.

## Authentication

Bearer JWT session only. Signed API keys cannot call this operation. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

No path, query or command headers required.

### JSON body

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `currentPassword` | string | Yes | Current password. |
| `newPassword` | string | Yes | New password. |

## Behavior

Requires current password and a new password of 10-128 characters including a letter and digit. Atomically revokes every refresh session and API key and immediately invalidates access tokens. Sign in again. Rate limited; no idempotency receipt.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X POST "$NOVCIC_URL/api/profile/password" -H "Authorization: Bearer $NOVCIC_TOKEN" -H 'Content-Type: application/json' --data '{"currentPassword":"current-password-123","newPassword":"new-password-456"}'
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
