# Idempotency and safe retries

Financial POSTs require `Idempotency-Key`, a UUID unique to the account's command intent. Create it before submission and persist it with the method, path and body. The server commits the financial mutation, journal entries, revision update and command receipt atomically under a database transaction lock.

| Result | Client action |
| --- | --- |
| 200 with parsed result | Record the result and reconcile the relevant account snapshot |
| 400 domain validation | Correct the rejected intent; use a new key for a changed command |
| 401 authentication failure | Repair credentials; retry the original key and body if the intent is unchanged |
| Timeout, disconnect, 502/503/other 5xx | Outcome is unknown; retry the original key and unchanged body |
| Same key with changed request | Server returns 400; do not reuse keys for different operations |

A repeated committed command returns the saved original response, not a newly calculated account state. An order can fill after that saved response; query orders and executions for its current state.

For HMAC retries, generate a **new timestamp, nonce and signature** for each HTTP attempt while preserving the idempotency key and JSON body. The signature prevents HTTP replay; the command key prevents duplicate financial effects. They solve different problems.

```text
Persist intent + key
  → sign with fresh nonce
  → submit
  → if outcome unknown, submit the same intent/key with another fresh nonce
  → save receipt
  → refresh orders, executions and balances
```

Command receipts have no configured TTL in this implementation. Do not rely on deleting or recycling keys. Parallel submissions are serialized at the matching authority; clients should bound concurrency and back off on failures rather than flood the server.

Session login/refresh/logout, key creation/revocation and deposit-address creation do not use financial command receipts. Address creation returns the same account address. Key creation can produce another key when repeated, so inspect existing keys after an ambiguous response. `toggle-dca` **does** use a receipt: changing its command key on retry could undo the intended pause or resume.

See [authentication](./authentication.md) for signed headers and [errors](./errors.md) for response formats.
