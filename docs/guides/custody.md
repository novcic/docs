# Deposits and withdrawals

The configured custody network is a local Ethereum chain, ID **31337**, with ERC-20 BTC (8 decimals) and USDT (6 decimals). Read `/api/network` for the current contract addresses, chain generation and confirmation requirement. No native Bitcoin deposit address or mainnet deposit network is implemented.

## Deposit

1. Authenticate with a JWT session and POST `{}` to `/api/custody/address`.
2. Query `/api/network`; use the current token contract and matching local chain.
3. Send the supported ERC-20 token to the returned address from your wallet.
4. Poll `/api/custody/history` and `/api/balances`.

The address is stable for an account. Deposit discovery reads ERC-20 Transfer logs; confirmations are checked against canonical block hashes. A deposit normally progresses **Pending → Confirmed → Credited**. The configured requirement is three confirmations. The balance credit lands in Funding exactly once. Duplicate log processing and credit retries cannot mint another balance credit.

Custody may sweep deposits after crediting. Sweeps and gas-management jobs are internal and do not appear as customer withdrawals. Reorganizations or a changed chain generation can pause/quarantine processing; read status/error and avoid assuming a timeout means a lost transfer.

## Withdraw

`POST /api/withdraw` requires a JWT, an idempotency key, supported asset, positive amount and nonzero Ethereum address. Funds must be in Funding. The command moves available funds into locked withdrawal reserves, then returns the queued transfer.

Normal lifecycle: **Requested → Signed → Broadcast → Confirmed → Completed**. A definitive reverted receipt produces **Reverted → Failed** and releases the reserved funds. An ambiguous broadcast or RPC failure remains pending for reconciliation; funds are not refunded merely because a response timed out. The same signed transaction can be rebroadcast safely.

Use `/api/custody/history` for current status and transaction hash. Request receipts contain the initial state and do not update when the chain transaction progresses. Signed API keys cannot request withdrawals. There is no public withdrawal-cancel, address-whitelist, arbitrary-chain or native-ETH transfer endpoint.

## Local provisioning

The exchange repository owns `chain/setup.mjs` and the local deployment scripts. Re-running normal bootstrap reuses the existing chain deployment when valid; deliberate chain resets require the documented reset workflow and a new generation. Token addresses are deployment data, not constants to copy from a documentation example. Never point these local-chain tokens or addresses at an unrelated network.
