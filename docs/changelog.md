# Changelog

## 1.0.0 — 3 November 2026

Initial public documentation release, audited against the implemented REST routes and models: 41 operations, including retired/disabled routes, with request parameters, authentication, response schemas and examples.

- Documented HMAC Read/Trade keys, JWT sessions, cookie rotation and idempotent financial commands.
- Documented aggregated public depth and SignalR revision invalidation; no individual public-order endpoint.
- Added the explicit counterparty-dependent fee configuration and default five-level derivative quoting.
- Documented real-book liquidity contribution/redemption queues, Earn, loans, DCA and local ERC-20 custody.
- Adopted the shared Meadow branding specification and token release.

The API currently uses unversioned `/api` routes. Breaking changes must be called out here and coordinated with integration consumers; this documentation release number does not introduce a `/v1` URL prefix.
