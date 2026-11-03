# Decimal values and identifiers

Amounts, prices, ratios, counters and integer properties are serialized as **JSON strings**. Booleans remain booleans. Dates are UTC ISO 8601 strings, except candle `time`, which is Unix seconds encoded as a string. Nullable properties use JSON `null`; zero is not a substitute for unavailable data.

| Value | Precision / accepted range |
| --- | --- |
| Order quantity | Positive BTC, step `0.000001` |
| Limit price | Positive USDT per BTC, tick `0.01` |
| Internal wallet amounts, LP/Earn shares | Up to 8 decimals |
| BTC ERC-20 withdrawal | Up to 8 decimals |
| USDT ERC-20 withdrawal | Up to 6 decimals |
| DCA purchase amount | USDT, up to 6 decimals |
| Average position entry price | Up to 16 decimals |
| Interest/reserve remainder | Up to 20 decimals |
| Leverage | Integer 1–10, JSON string |
| DCA interval | `"1"`, `"24"` or `"168"` hours |

Positive validated input amounts are capped at 1,000,000,000. Wallet accounting uses PostgreSQL `numeric(28,8)` and .NET decimal arithmetic. The browser uses decimal arithmetic for financial calculations; only chart coordinates cross into JavaScript numbers.

Use decimal libraries in integrations. Never apply `parseFloat`, binary-float multiplication or numeric JSON coercion to balances, order quantities or signatures. Quantize order quantities downward to the allowed step, and choose an intentional price rounding policy. Reject invalid user input instead of silently changing a submitted intent.

```python
from decimal import Decimal, ROUND_DOWN
available = Decimal('100.00')
price = Decimal('75000.00')
quantity = (available / (price * Decimal('1.001'))).quantize(
    Decimal('0.000001'), rounding=ROUND_DOWN)
body = {'quantity': format(quantity, 'f'), 'price': format(price, 'f')}
```

The example reserves a configured-example 0.1% spot fee; read actual deployment fees from `/api/config` rather than hardcode them.

Instrument **IDs** identify execution books; symbols label them. Spot ID `BTCUSDT` and perpetual ID `BTC-PERP` both display `BTCUSDT`, with distinct kinds. Expiry and option IDs must be discovered rather than constructed from a presumed naming convention. UUID resource IDs are strings. Sequence and revision strings should be compared using integers with sufficient precision, such as JavaScript `BigInt`.
