# Market data and SignalR

Use `/api/products` for instrument discovery, best bid/ask, recent exchange tickers, external index freshness, option analytics and pool values. Use `/api/market?instrument=...` for a consistent snapshot of aggregated depth and the latest executions for one book.

Bids are ordered highest first; asks lowest first. `quantity` is BTC at that price; `total` is cumulative BTC from the best price. Public depth exposes neither individual orders nor order counts. Rows at the same tick are merged, regardless of participant or AMM origin.

`lastPrice`, 24-hour high/low/change and volume derive from actual exchange trades. The external reference index is separate. `/api/market` last price can predate the last 24 hours; `/api/products` ticker last price is restricted to the last 24 hours. Null prices/changes are valid. Quote availability is not evidence of a trade.

Candles use `/api/candles?instrument=BTCUSDT&interval=1m`. Supported intervals are 1m, 5m, 15m and 1h. The open is the prior known close; high/low include that open and bucket executions. Quiet buckets carry the close with zero volume. With no known executions, the response is empty.

## Live invalidation

`/hubs/market` is an ASP.NET Core **SignalR** hub, not a raw JSON WebSocket feed. Use a SignalR client, which negotiates the transport and handles the protocol handshake. No login is required.

Server event: `MarketChanged`

```json
{"revision":"12345"}
```

The revision is a durable database revision. Notifications contain no order-book delta, symbol-specific payload, private balance or execution data. They can be coalesced or missed during reconnects. Never reconstruct a book by treating this event as a delta.

```javascript
import {HubConnectionBuilder} from '@microsoft/signalr';
const hub = new HubConnectionBuilder()
  .withUrl('/hubs/market').withAutomaticReconnect().build();
let running = false, queued = false;
async function refresh() {
  if (running) { queued = true; return; }
  running = true;
  try {
    do {
      queued = false;
      const response = await fetch('/api/market?instrument=BTCUSDT');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const snapshot = await response.json();
      renderSnapshot(snapshot); // retain all decimal strings
    } while (queued);
  } finally { running = false; }
}
hub.on('MarketChanged', () => refresh().catch(reportError));
hub.onreconnected(() => refresh().catch(reportError));
await hub.start(); // retry initial connection failures explicitly
await refresh();
```

`renderSnapshot` and `reportError` are application callbacks. Fetch an initial snapshot after connection, refresh on reconnection, and keep a low-frequency polling fallback. Preserve the previous snapshot during loading; indicate stale data after failures. Private account state still requires authenticated REST reads. No private subscriptions, order submission over WebSocket, sequence-gap recovery protocol or symbol subscription method is implemented.
