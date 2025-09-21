import { useEffect, useMemo, useRef, useState } from 'react';

// Build minute bucket epoch aligned to timeframe
function bucketStart(tsMs, minutes) {
  const m = minutes || 1;
  const d = new Date(tsMs);
  d.setSeconds(0, 0);
  const mins = d.getMinutes();
  d.setMinutes(mins - (mins % m));
  return d.getTime();
}

// Try to extract price, volume, timestamp and instrument_key from various WS payload shapes
function extractTick(frame, desiredKey) {
  if (!frame) return null;
  try {
    // Case: feeds keyed by instrument
    if (frame.feeds && desiredKey && frame.feeds[desiredKey]) {
      const f = frame.feeds[desiredKey];
      const price = Number(f.ltp ?? f.last_traded_price ?? f.price ?? f.close);
      const vol = Number(f.volume ?? f.vol ?? f.volume_traded_today ?? 0);
      const ts = Number(f.exchange_timestamp ?? f.ts ?? f.tt ?? Date.now());
      return { instrument_key: desiredKey, price, volume: vol, ts: ts > 1e12 ? ts : ts * 1000 };
    }
    // Case: array of quotes
    if (Array.isArray(frame.data)) {
      for (const q of frame.data) {
        const ik = q.instrument_key || q.instrumentKey || q.symbol || desiredKey;
        if (!desiredKey || ik === desiredKey) {
          const price = Number(q.ltp ?? q.last_traded_price ?? q.price ?? q.close);
          const vol = Number(q.volume ?? q.vol ?? q.volume_traded_today ?? 0);
          const ts = Number(q.exchange_timestamp ?? q.ts ?? q.tt ?? Date.now());
          return { instrument_key: ik, price, volume: vol, ts: ts > 1e12 ? ts : ts * 1000 };
        }
      }
    }
    // Case: single object
    const ik = frame.instrument_key || frame.instrumentKey || desiredKey;
    if (ik) {
      const price = Number(frame.ltp ?? frame.last_traded_price ?? frame.price ?? frame.close);
      const vol = Number(frame.volume ?? frame.vol ?? frame.volume_traded_today ?? 0);
      const ts = Number(frame.exchange_timestamp ?? frame.ts ?? frame.tt ?? Date.now());
      return { instrument_key: ik, price, volume: vol, ts: ts > 1e12 ? ts : ts * 1000 };
    }
  } catch {}
  return null;
}

export default function useUpstoxLiveCandles({
  wsUrl,
  accessToken,
  instrumentKey,
  interval = '1minute',
  maxCandles = 500,
  bootstrapHistory = true,
}) {
  const [candles, setCandles] = useState([]); // [{x: Date, y: [o,h,l,c]}]
  const [volumes, setVolumes] = useState([]); // [{x: Date, y: number}]
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState('');
  const wsRef = useRef(null);
  const mapRef = useRef(new Map()); // bucketTs -> {o,h,l,c,v}
  const volPrevRef = useRef(0);

  const minutes = useMemo(() => {
    const m = String(interval).replace('minute', '');
    const n = parseInt(m, 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [interval]);

  // Bootstrap today history via REST if available (best-effort)
  useEffect(() => {
    if (!bootstrapHistory || !accessToken || !instrumentKey) return;
    const controller = new AbortController();
    const tryEndpoints = async () => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const d = new Date();
      const to = d.toISOString().slice(0, 10);
      const from = to;
      const endpoints = [
        `https://api.upstox.com/v2/market/historical-candle/intraday/${encodeURIComponent(instrumentKey)}/${interval}?to=${to}&from=${from}`,
        `https://api.upstox.com/v2/historical-candle/intraday/${encodeURIComponent(instrumentKey)}/${interval}?to=${to}&from=${from}`,
        `https://api.upstox.com/v2/historical-candle/${encodeURIComponent(instrumentKey)}/${interval}?to=${to}&from=${from}`,
      ];
      for (const url of endpoints) {
        try {
          const res = await fetch(url, { headers, signal: controller.signal });
          if (!res.ok) continue;
          const json = await res.json();
          const arr = json?.data || json;
          if (Array.isArray(arr) && arr.length) {
            // Expecting [[ts, o, h, l, c, v], ...] or objects
            const rows = arr.map((r) => (
              Array.isArray(r)
                ? { ts: (r[0] > 1e12 ? r[0] : r[0] * 1000), o: +r[1], h: +r[2], l: +r[3], c: +r[4], v: +r[5] || 0 }
                : { ts: +(r.ts || r.time || Date.now()), o: +r.o || +r.open, h: +r.h || +r.high, l: +r.l || +r.low, c: +r.c || +r.close, v: +r.v || +r.volume || 0 }
            ));
            // Seed mapRef
            const m = new Map();
            for (const k of rows) {
              const b = bucketStart(k.ts, minutes);
              m.set(b, { o: k.o, h: k.h, l: k.l, c: k.c, v: k.v });
            }
            mapRef.current = m;
            volPrevRef.current = 0;
            const sorted = Array.from(m.entries()).sort((a, b) => a[0] - b[0]);
            setCandles(sorted.map(([t, v]) => ({ x: new Date(t), y: [v.o, v.h, v.l, v.c] })));
            setVolumes(sorted.map(([t, v]) => ({ x: new Date(t), y: v.v })));
            break;
          }
        } catch (e) {
          // non-fatal
        }
      }
    };
    tryEndpoints();
    return () => controller.abort();
  }, [bootstrapHistory, accessToken, instrumentKey, interval, minutes]);

  useEffect(() => {
    if (!wsUrl || !accessToken || !instrumentKey) return;
    let alive = true;
    setError('');
    try {
      const url = new URL(wsUrl);
      // Upstox WS typically expects Authorization as query param
      // e.g., wss://api.upstox.com/feed/market-data-feed?Authorization=Bearer <token>
      url.searchParams.set('Authorization', `Bearer ${accessToken}`);
      // Also add token as fallback for older gateways
      url.searchParams.set('token', accessToken);
      const ws = new WebSocket(url.toString());
      wsRef.current = ws;

      ws.addEventListener('open', () => {
        setConnected(true);
        // Try authorize payload (defensive) then subscribe
        const payloads = [
          { method: 'authorize', params: { token: accessToken } },
          { method: 'subscribe', params: { instrument_key: [instrumentKey], feed_type: 'full' } },
          { method: 'subscribe', params: { instrument_keys: [instrumentKey], feed_type: 'full' } },
          { action: 'subscribe', symbols: [instrumentKey], feed: 'full' },
        ];
        for (const p of payloads) {
          try { ws.send(JSON.stringify(p)); } catch {}
        }
      });

      ws.addEventListener('message', (evt) => {
        try {
          const data = JSON.parse(evt.data);
          if (data?.error || data?.code === 401 || /unauthor/i.test(String(data?.message || ''))) {
            setError('Unauthorized: Upstox token invalid or expired');
            return;
          }
          const tick = extractTick(data, instrumentKey);
          if (!tick || !alive) return;
          const { price, volume, ts } = tick;
          if (!Number.isFinite(price)) return;
          const bucket = bucketStart(ts, minutes);
          const cur = mapRef.current.get(bucket);
          if (!cur) {
            mapRef.current.set(bucket, { o: price, h: price, l: price, c: price, v: volume || 0 });
          } else {
            cur.h = Math.max(cur.h, price);
            cur.l = Math.min(cur.l, price);
            cur.c = price;
            if (Number.isFinite(volume)) {
              cur.v = Math.max(cur.v || 0, volume); // if cumulative
            }
          }
          // Emit sorted arrays
          const sorted = Array.from(mapRef.current.entries()).sort((a, b) => a[0] - b[0]).slice(-maxCandles);
          setCandles(sorted.map(([t, v]) => ({ x: new Date(t), y: [v.o, v.h, v.l, v.c] })));
          setVolumes(sorted.map(([t, v]) => ({ x: new Date(t), y: v.v || 0 })));
        } catch {
          // ignore non-JSON
        }
      });

      ws.addEventListener('close', () => {
        setConnected(false);
      });

      ws.addEventListener('error', (e) => {
        setError('WebSocket connection failed');
      });

      return () => {
        alive = false;
        try { ws.close(); } catch {}
      };
    } catch (e) {
      setError(e?.message || 'Failed to open WebSocket');
    }
  }, [wsUrl, accessToken, instrumentKey, interval, minutes, maxCandles]);

  return { candles, volumes, connected, error };
}
