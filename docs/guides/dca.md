# Recurring BTC purchases

`POST /api/dca` creates a recurring spot BTC purchase using Unified Trading USDT. Supply `amount` in USDT per run, `hours` as 1/24/168, and an optional total `budget`. Amount supports six decimals; budget must cover at least one run.

The first run is scheduled one interval in the future. Creating a plan does not reserve its future budget. The execution worker uses the real spot book; it cannot buy without available funds and counterparties. A run can fill partially or record a skipped/failure outcome. The schedule tracks actual spent value and its latest human-readable `lastOutcome`.

Read `/api/portfolio.schedules` for nextRun, paused state, spent, budget and outcome. Budget is a cumulative cap, not a wallet allocation. Keep sufficient trading funds available while accounting for concurrent orders and margin requirements.

`POST /api/toggle-dca` toggles pause/resume for a schedule ID. Resume schedules the next attempt one interval from now. Persist the idempotency key: a retry with a new key could toggle the schedule back. There is no update/delete endpoint or catch-up promise for every missed interval.
