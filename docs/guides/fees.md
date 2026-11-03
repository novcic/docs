# Execution fees

Read `/api/config` for deployment-configured values. `feeModel` is `counterparty-dependent`. The legacy `fees: "0"` field describes user-to-user trading only; it does not mean every execution is free.

| Counterparty / product | Default charge |
| --- | --- |
| User-to-user | Zero |
| AMM spot fill | Quantity × execution price × 0.001 |
| AMM futures fill | Quantity × execution price × 0.00055 |
| AMM option fill | Minimum of quantity × index × 0.0003 and premium notional × 0.07 |
| LP share of charged AMM fees | 80% |

Fees are charged in **USDT** to the ordinary participant executing against the AMM. The LP share is credited into the pool, increasing NAV; the remainder goes to exchange fee accounting. Internal conversion/liquidation strategy accounts are exempt. Fees and their allocation are quantized to eight decimals; no fee is charged for an unfilled order.

Example with default spot rate: a 0.001 BTC AMM fill at 75,000 USDT has notional 75 USDT and a 0.075 USDT fee. The LP allocation is 0.06 USDT and exchange allocation 0.015 USDT. These are illustrative calculations, not a price quote.

Reserve fee headroom before placing an order. A spot sell against the AMM also incurs a USDT fee, normally payable from its sale proceeds. Portfolio, execution and ledger reconciliation should include fees; the Trade object does not include a separate fee field. Relevant ledger reasons include `AMM execution fee`; do not assume fees can be inferred from every counterparty ID without configuration and precision rules.
