const specs = {
  '15m': { interval: '15m', range: '5d' },
  '1h': { interval: '60m', range: '2mo' },
  '4h': { interval: '60m', range: '3mo' },
};

async function count(sym, interval) {
  const spec = specs[interval];
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=${spec.interval}&range=${spec.range}`;
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const d = await r.json();
  const ts = d.chart?.result?.[0]?.timestamp ?? [];
  return ts.length;
}

for (const sym of ['AAPL', 'BRK-B', 'MSFT']) {
  for (const i of ['15m', '1h', '4h']) {
    const n = await count(sym, i);
    console.log(sym, i, n);
  }
}
