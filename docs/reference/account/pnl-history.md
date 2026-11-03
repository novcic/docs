# Closed-position PnL history

`GET /api/pnl-history`

Verified completed derivative lifecycles, ordered by closedAt descending then id descending. Partial exits accumulate until flat; reversal closes one row and starts another. All monetary values and counters are JSON strings. Actual opening/closing fees and signed funding are included. Owner and API-key product permissions apply before filters and pagination. Default 50 rows, maximum 100. Keep filters unchanged when following nextCursor; a cursor outside this account or filter returns 400. from/to are inclusive UTC closing dates. Older lifecycles with missing fees or untraceable funding/settlement are omitted rather than assigned estimated net P&L. New fills, funding and settlements update history atomically with accounting; delayed funding can update a closed row.

## Authentication

Bearer JWT or an HMAC-signed Read/Trade API key. See [authentication](/guides/authentication).

This endpoint does not use the financial command receipt mechanism.

## Parameters

| Parameter | Location | Required | Meaning |
| --- | --- | --- | --- |
| `instrument` | query | No | Optional canonical instrument ID; omitted means all permitted derivatives. |
| `product` | query | No | Optional product filter; cannot expand key permissions. |
| `from` | query | No | Inclusive UTC closing date, YYYY-MM-DD. |
| `to` | query | No | Inclusive UTC closing date, YYYY-MM-DD; at most 9999-12-30. |
| `cursor` | query | No | Copy nextCursor unchanged; keep account, permissions and filters unchanged. |
| `limit` | query | No | Maximum rows per page; product authorization is applied first. Default: `50`. |

## Behavior

Verified completed derivative lifecycles, ordered by closedAt descending then id descending. Partial exits accumulate until flat; reversal closes one row and starts another. All monetary values and counters are JSON strings. Actual opening/closing fees and signed funding are included. Owner and API-key product permissions apply before filters and pagination. Default 50 rows, maximum 100. Keep filters unchanged when following nextCursor; a cursor outside this account or filter returns 400. from/to are inclusive UTC closing dates. Older lifecycles with missing fees or untraceable funding/settlement are omitted rather than assigned estimated net P&L. New fills, funding and settlements update history atomically with accounting; delayed funding can update a closed row.

## Request example

Set `NOVCIC_URL=http://127.0.0.1:8081`. Private examples use a current session access token. For commands, create and persist a UUID `REQUEST_ID` once per intent. Placeholder values below are illustrative.

```bash
curl -sS -X GET "$NOVCIC_URL/api/pnl-history" -H "Authorization: Bearer $NOVCIC_TOKEN"
```

## Response

Response type: [PnlPage](/schemas/PnlPage). No envelope or `retCode` wrapper is added.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `items` | PnlRow[] | Yes |  |
| `nextCursor` | string or null | Yes | Opaque continuation cursor for the same account, permissions and filters. Null ends the result. |

Illustrative structure (zero values and identifiers are placeholders, not market data):

```json
{
  "items": [],
  "nextCursor": null
}
```

## Errors and recovery

Validation/domain failures return HTTP 400 with `{"error":"..."}`. Authentication may return an empty 401; never assume every error has JSON. Read the response status before parsing JSON.  See [errors and limits](/guides/errors).
