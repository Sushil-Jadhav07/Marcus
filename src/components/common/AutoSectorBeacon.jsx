import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import BreakoutBeacon from './BreakoutBeacon';

const AutoSectorBeacon = () => {
  const accessToken = useSelector((s) => s.vendorAuth?.accessToken);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const wsRef = useRef(null);

  // Auto sector symbols - Top 10 only with symbol tokens
  const autoSymbols = [
    { exchange: "NSE", tradingSymbol: "MARUTI-EQ", symbolToken: "11536" },
    { exchange: "NSE", tradingSymbol: "TATAMOTORS-EQ", symbolToken: "11536" },
    { exchange: "NSE", tradingSymbol: "M&M-EQ", symbolToken: "11536" },
    { exchange: "NSE", tradingSymbol: "BAJAJ-AUTO-EQ", symbolToken: "11536" },
    { exchange: "NSE", tradingSymbol: "HEROMOTOCO-EQ", symbolToken: "11536" },
    { exchange: "NSE", tradingSymbol: "EICHERMOT-EQ", symbolToken: "11536" },
    { exchange: "NSE", tradingSymbol: "ASHOKLEY-EQ", symbolToken: "11536" },
    { exchange: "NSE", tradingSymbol: "TVSMOTORS-EQ", symbolToken: "11536" },
    { exchange: "NSE", tradingSymbol: "BOSCHLTD-EQ", symbolToken: "11536" },
    { exchange: "NSE", tradingSymbol: "EXIDEIND-EQ", symbolToken: "11536" }
  ];

  // Helper: map various payload shapes to beacon rows
  const mapToRows = (items) => {
    if (!Array.isArray(items)) return [];
    return items.map((it, idx) => {
      const symbol = (it.symbol || it.tradingSymbol || it.name || `SYM${idx}`).replace(/^NSE_/i, '');
      let changePct = (typeof it.changePct === 'number')
        ? it.changePct
        : parseFloat(it.changePct || it.pct || it.percent || 0);
      
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

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const url = 'https://angelbackend-production.up.railway.app/get-ohlc-batch';
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbols: autoSymbols }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const json = await res.json();
      
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
      console.error('Auto sector fetch failed', e);
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let alive = true;
    fetchData();

    // WebSocket for live updates
    try {
      const url = new URL((window.location.origin.replace('http', 'ws')) + '/ws/placeholder');
      if (accessToken) url.searchParams.set('token', accessToken);
      const ws = new WebSocket(url.toString());
      wsRef.current = ws;

      ws.addEventListener('open', () => {
        try {
          ws.send(JSON.stringify({ action: 'subscribe', channel: 'ohlc', exchange: 'NSE', sector: 'AUTO' }));
        } catch {}
      });

      ws.addEventListener('message', (evt) => {
        try {
          const data = JSON.parse(evt.data);
          const items = Array.isArray(data) ? data : (data?.data || data?.items || []);
          if (!alive) return;
          if (Array.isArray(items) && items.length) {
            setRows((prev) => {
              const mapped = mapToRows(items);
              return mapped.length ? mapped : prev;
            });
          }
        } catch {}
      });
    } catch (e) {
      console.error('Failed to open WS', e);
    }

    return () => {
      alive = false;
      try { wsRef.current && wsRef.current.close(); } catch {}
    };
  }, [accessToken]);

  const data = useMemo(() => (Array.isArray(rows) ? rows.slice(0, 10) : []), [rows]);

  return (
    <BreakoutBeacon 
      title="AUTO" 
      rows={data} 
      isLoading={isLoading}
      onRefresh={fetchData}
    />
  );
};

export default AutoSectorBeacon;
