# Changelog

## 1.2.0 - Profiles, product permissions and live estimates

Added private profiles, random usernames, preset avatars, birth dates and password/email changes with immediate session/key revocation. API keys now enforce product permissions. Market sizing and estimates use last traded price with reference fallback, without liquidity caps or matching simulation. Existing keys retain their prior access across all products; newly created keys default to Spot when products is omitted.


## 1.1.0 - Execution fees and account leverage

All customer fills now pay execution fees; spot fees are deducted from received assets. Added account leverage and rollback-only order/leverage previews, per-execution fee fields, average execution prices and BTC pool-fee reporting. Balance activity omits zero-net reservations/releases. Meadow 1.1 adds padded tabs and accessible notifications.

## 1.0.0 — 3 November 2026

Initial public documentation release, audited against the implemented REST routes and models: 41 operations, including retired/disabled routes, with request parameters, authentication, response schemas and examples.

- Documented HMAC Read/Trade keys, JWT sessions, cookie rotation and idempotent financial commands.
- Documented aggregated public depth and SignalR revision invalidation; no individual public-order endpoint.
- Added the explicit counterparty-dependent fee configuration and default five-level derivative quoting.
- Documented real-book liquidity contribution/redemption queues, Earn, loans, DCA and local ERC-20 custody.
- Adopted the shared Meadow branding specification and token release.

The API currently uses unversioned `/api` routes. Breaking changes must be called out here and coordinated with integration consumers; this documentation release number does not introduce a `/v1` URL prefix.
