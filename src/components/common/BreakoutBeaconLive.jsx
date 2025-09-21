import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import BreakoutBeacon from './BreakoutBeacon';

/**
 * Live wrapper for BreakoutBeacon
 * - On mount: GET placeholder OHLC endpoint (NSE only if supported)
 * - Opens websocket for live updates (placeholder ws URL)
 * - Logs HTTP response and websocket messages
 */
const BreakoutBeaconLive = () => {
  const accessToken = useSelector((s) => s.vendorAuth?.accessToken);
  const [rows, setRows] = useState([]);
  const wsRef = useRef(null);

  // Helper: map various payload shapes (incl. OHLC) to beacon rows
  const mapToRows = (items) => {
    if (!Array.isArray(items)) return [];
    return items.map((it, idx) => {
      const symbol = (it.symbol || it.tradingSymbol || it.name || `SYM${idx}`).replace(/^NSE_/i, '');
      // try direct percent fields
      let changePct = (typeof it.changePct === 'number')
        ? it.changePct
        : parseFloat(it.changePct || it.pct || it.percent || 0);
      // if not available, derive from OHLC
      const o = Number(it.o ?? it.open);
      const c = Number(it.c ?? it.close);
      if (!Number.isFinite(changePct) || changePct === 0) {
        if (Number.isFinite(o) && Number.isFinite(c) && o) {
          changePct = ((c - o) / o) * 100;
        } else {
          changePct = 0;
        }
      }
      const direction = changePct >= 0 ? 'up' : 'down';
      return {
        tag: direction === 'up' ? 'BULL' : 'BEAR',
        symbol,
        percent: Math.abs(changePct) || 0,
        signal: Math.abs(changePct) || 0,
        ltp: Number(it.ltp) || Number(it.close) || 0,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dir: direction,
      };
    });
  };

  useEffect(() => {
    let alive = true;

    // Initial HTTP fetch (POST banking symbols to OHLC endpoint)
    const fetchInitial = async () => {
      try {
        const url = 'https://angelbackend-production.up.railway.app/get-ohlc-batch';
        const symbols = [
          { exchange: "NSE", tradingSymbol: "HDFCBANK-EQ", symbolToken: "1333" },
          { exchange: "NSE", tradingSymbol: "ICICIBANK-EQ", symbolToken: "4963" },
          { exchange: "NSE", tradingSymbol: "SBIN-EQ", symbolToken: "3045" },
          { exchange: "NSE", tradingSymbol: "KOTAKBANK-EQ", symbolToken: "4920" },
          { exchange: "NSE", tradingSymbol: "AXISBANK-EQ", symbolToken: "5900" },
          { exchange: "NSE", tradingSymbol: "INDUSINDBK-EQ", symbolToken: "5258" },
          { exchange: "NSE", tradingSymbol: "BANKBARODA-EQ", symbolToken: "532" },
          { exchange: "NSE", tradingSymbol: "PNB-EQ", symbolToken: "11915" },
          { exchange: "NSE", tradingSymbol: "IDFCFIRSTB-EQ", symbolToken: "11536" },
          { exchange: "NSE", tradingSymbol: "FEDERALBNK-EQ", symbolToken: "11915" },
          { exchange: "NSE", tradingSymbol: "HDFCLIFE-EQ", symbolToken: "11536" },
          { exchange: "NSE", tradingSymbol: "ICICIGI-EQ", symbolToken: "11536" },
          { exchange: "NSE", tradingSymbol: "BAJFINANCE-EQ", symbolToken: "81153" },
          { exchange: "NSE", tradingSymbol: "BAJAJFINSV-EQ", symbolToken: "11536" },
          { exchange: "NSE", tradingSymbol: "SBILIFE-EQ", symbolToken: "11536" },
        ];
        
        
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ symbols }),
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const json = await res.json();
        
        if (!alive) return;

        const fetchedData = json?.data?.fetched || [];
        
        if (!Array.isArray(fetchedData) || fetchedData.length === 0) {
          setRows([]);
          return;
        }
        
        const flat = fetchedData.map((item, idx) => {
          const processedItem = {
            symbol: item.tradingSymbol?.replace('-EQ', '') || `SYM${idx}`,
            open: Number(item.open) || 0,
            close: Number(item.close) || 0,
            high: Number(item.high) || 0,
            low: Number(item.low) || 0,
            ltp: Number(item.ltp) || 0,
          };
          return processedItem;
        });
        
        const mappedRows = mapToRows(flat);
        setRows(mappedRows);
      } catch (e) {
        console.error('Finance OHLC fetch failed', e);
        setRows([]);
      }
    };

    fetchInitial();

    // WebSocket live updates (placeholder URL & message shape)
    try {
      const url = new URL((window.location.origin.replace('http', 'ws')) + '/ws/placeholder');
      if (accessToken) url.searchParams.set('token', accessToken);
      const ws = new WebSocket(url.toString());
      wsRef.current = ws;

      ws.addEventListener('open', () => {
        try {
          // Example subscription: all sectors, NSE only
          ws.send(JSON.stringify({ action: 'subscribe', channel: 'ohlc', exchange: 'NSE', sectors: 'ALL' }));
        } catch {}
      });

      ws.addEventListener('message', (evt) => {
        // eslint-disable-next-line no-console
        console.log('WS message:', evt.data);
        try {
          const data = JSON.parse(evt.data);
          const items = Array.isArray(data) ? data : (data?.data || data?.items || []);
          if (!alive) return;
          if (Array.isArray(items) && items.length) {
            setRows((prev) => {
              const mapped = mapToRows(items);
              // Replace with latest frame; adjust if diff merging required
              return mapped.length ? mapped : prev;
            });
          }
        } catch {
          // ignore if non-JSON
        }
      });

      ws.addEventListener('error', (e) => {
        // eslint-disable-next-line no-console
        console.error('WS error:', e);
      });

      ws.addEventListener('close', () => {
        // eslint-disable-next-line no-console
        console.log('WS closed');
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Failed to open WS', e);
    }

    return () => {
      alive = false;
      try { wsRef.current && wsRef.current.close(); } catch {}
    };
  }, [accessToken]);

  // stable memo for child (slice items 0 to 10)
  const data = useMemo(() => (Array.isArray(rows) ? rows.slice(0, 10) : []), [rows]);

  return (
    <BreakoutBeacon title="FINANCE" rows={data} />
  );
};

export default BreakoutBeaconLive;


