# Profile and security

Registration assigns a unique, non-sequential User######## username and default avatar. GET /api/profile is JWT-only and includes username, avatar and private optional dateOfBirth (YYYY-MM-DD). Session/current-account responses omit birth date.

POST /api/profile accepts username (3-24 ASCII letters/digits/underscores, case-insensitive unique), avatar (default, fern, sunrise, river, mountain, moon, oak, meadow or fox), and nullable birth date. Future dates and external image URLs are rejected. The profile editor provides bundled avatars; image uploads are not supported.

POST /api/profile/password requires currentPassword and newPassword. Passwords require 10-128 characters with a letter and digit. POST /api/profile/email requires currentPassword and newEmail. Email is normalized, must differ from the existing address, and must be unique. Ownership verification is not implemented: this immediately changes the sign-in address.

Both security actions atomically revoke all refresh sessions and API keys and increment the access-token security version. Existing access tokens fail immediately. Clear local authentication and sign in again. Do not automatically retry security changes after an ambiguous response: try signing in with the intended new credentials to reconcile the result.

Profile routes share the authentication rate limit of 30 requests per minute per IP. These routes do not use financial command receipts or require Idempotency-Key.
