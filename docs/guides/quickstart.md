# First integration

Start with read-only requests against a running local exchange. These commands use a POSIX shell; PowerShell users can run `curl.exe` with equivalent quoting.

```bash
export NOVCIC_URL=http://127.0.0.1:8081
curl -fsS "$NOVCIC_URL/api/health"
curl -fsS "$NOVCIC_URL/api/config"
curl -fsS "$NOVCIC_URL/api/products"
curl -fsS "$NOVCIC_URL/api/market?instrument=BTCUSDT"
```

Check `products.priceFresh`, instrument `status`, and nullable ticker prices. A quiet exchange can have a funded book and no recent executions; `lastPrice: null` does not mean a price of zero.

## Authenticate

Sign in through the exchange and create a Read key on the API page. Set credentials in your local shell environment, then run the included example:

```bash
export NOVCIC_KEY='your-key-uuid'
export NOVCIC_SECRET='your-secret-string'
node examples/signed-request.mjs GET /api/balances
python examples/signed_request.py GET /api/portfolio
```

Both examples default to the local origin, require explicit credentials, preserve response strings and fail on HTTP errors. They never fund an account or submit an order unless you explicitly pass a POST command.

## Place and reconcile an order

Use a Trade key. Ensure Unified Trading has sufficient funds. Read `/api/products` for the desired canonical instrument ID and `/api/config` for tick/step/fee settings. Persist the request UUID and exact JSON payload before sending:

```bash
export REQUEST_ID='replace-with-a-new-persisted-uuid'
node examples/signed-request.mjs POST /api/orders \
  '{"instrument":"BTCUSDT","side":"Buy","type":"Limit","quantity":"0.001000","price":"75000.00","leverage":"1","reduceOnly":false}' \
  "$REQUEST_ID"
```

The price is illustrative; choose an intentional current price. The example is capable of placing a real order on the configured exchange. On an ambiguous response, run the **same command with the same UUID**. The client creates a fresh nonce and signature automatically.

Read `/api/orders` for status and `/api/trades` for executions. A limit order may rest; a market order can partially fill and cancel its remainder. Cancel a remaining order with `POST /api/orders/{id}/cancel`, body `{}`, and another persisted command UUID. Reconcile balances and ledger rather than assuming submission success means execution success.

For a JWT workflow, login with a cookie jar, retain the returned access token, and use it in the Authorization header. Session-only operations such as transfers and withdrawals cannot be performed by a Trade key. See the full [authentication guide](./authentication.md).
