# Crypto RSI Heatmap

A professional real-time cryptocurrency heatmap dashboard inspired by Coinglass, built with React + Vite (JSX). Tracks top 100 USDT pairs on Binance with live price updates via WebSocket, RSI across 4 timeframes, advanced technical indicators, AI-based signals, and a composite Trend Score.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port from env)
- `pnpm --filter @workspace/crypto-heatmap run dev` — run the frontend (port from env)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, TailwindCSS, React Query
- Data: Binance Public API + Binance WebSocket Streams
- Indicators: custom RSI/EMA/MACD/BB/ATR/StochRSI implementations

## Where things live

- `artifacts/crypto-heatmap/src/` — main frontend app
- `artifacts/crypto-heatmap/src/services/binanceApi.ts` — Binance REST API
- `artifacts/crypto-heatmap/src/websocket/BinanceWebSocket.ts` — WS manager
- `artifacts/crypto-heatmap/src/indicators/` — all technical indicator logic
- `artifacts/crypto-heatmap/src/context/MarketContext.tsx` — global state + data fetching
- `artifacts/crypto-heatmap/src/components/` — UI components
- `artifacts/crypto-heatmap/src/pages/HomePage.tsx` — main page

## Architecture decisions

- All indicator calculations are done client-side using raw Binance kline data — no paid APIs
- Klines are fetched in batches of 5 concurrent requests with 150ms delay to avoid rate limits
- WebSocket uses `!miniTicker@arr` stream (all symbols, 1s updates) then filters to tracked coins
- Price flash animations (green/red) on WebSocket updates use CSS keyframes + cleanup timers
- MarketContext holds all state; `filteredCoins` is a `useMemo` derivative for performance
- `HeatmapRow` uses deep `React.memo` comparison to prevent unnecessary re-renders

## Product

- Real-time heatmap for top 100 USDT pairs on Binance
- RSI 15m / 1H / 4H / 1D with color-coded cells (oversold green → overbought red)
- EMA 20/50/200 position indicators
- MACD histogram, Bollinger Band %, ATR %, Stochastic RSI K/D
- Composite Trend Score 0–100 per coin
- AI signal system (STRONG BUY → STRONG SELL) with rule-based logic
- Sort by any column, filter by signal/RSI/volume/gainers/losers, live search

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Binance WebSocket `!miniTicker@arr` floods all symbols; filter to tracked coins client-side
- kline batch fetching takes ~30–40s for 100 coins × 4 timeframes on first load — skeleton UI shown
- Do not change the Vite config PORT/BASE_PATH handling — workflow env vars inject these

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
