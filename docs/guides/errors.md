# Errors and limits

Responses use ordinary HTTP status codes. There is no Bybit-style `retCode` envelope and no stable numeric application error taxonomy. Domain errors usually contain `{"error":"Human-readable reason"}`. Treat the message as display text, not a machine-readable enum.

| Status | Meaning | Recovery |
| --- | --- | --- |
| 200 | Request processed; inspect resource status | Reconcile fills, queues or settlement separately |
| 400 | Invalid input, precision, insufficient funds/collateral, stale reference or idempotency conflict | Inspect error and current state before a corrected intent |
| 401 | Missing/invalid/expired credentials, signature or scope | Reauthenticate or correct signing; body may be empty |
| 403 | POST Origin authority mismatch | Use same-origin session requests or a server integration |
| 404 | Unknown route/resource routing, or disabled faucet | Check path and deployment capabilities |
| 410 | Retired standalone liquidity/swap route | Use queued liquidity or ordinary spot orders |
| 429 | Authentication rate limit exceeded | Back off; body may be empty |
| 5xx / timeout | Service/downstream failure or ambiguous network result | Retry financial commands with the same command key |

Domain “not found” conditions can return 400 rather than 404. ASP.NET request-binding errors may use a framework response instead of the domain error shape. Always inspect status and content type before parsing JSON, and tolerate an empty error body.

## Current limits

- Register, login and refresh share a fixed window of **30 requests per minute per remote IP**. There are no published per-key trading quotas or rate-limit response headers in this implementation.
- API proxy POST bodies are limited to 8,192 bytes when content length is known; signed requests also enforce the limit after reading the body. Keep payloads small.
- HMAC timestamps have a ±30-second window. Each attempt needs a new nonce.
- Maximum ten active unexpired keys; keys expire after 90 days.
- Orders and executions: latest 200 each. Ledger and custody history: latest 100 each. Portfolio risk events and LP requests: latest 100 each.
- Candles: up to 500 buckets. There are no cursor/offset history parameters.

Do not assume an absent explicit trading quota means unlimited capacity. Coalesce market refreshes, use bounded request concurrency and exponential backoff with jitter. No rate-limit headers, retry-after promise, bulk order endpoint, private event stream or historical export endpoint is currently part of the public contract.
