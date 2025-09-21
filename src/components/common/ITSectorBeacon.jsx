import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import BreakoutBeacon from './BreakoutBeacon';

const ITSectorBeacon = () => {
  const accessToken = useSelector((s) => s.vendorAuth?.accessToken);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const wsRef = useRef(null);

  // IT sector symbols - Top 10 only with symbol tokens
  const itSymbols = [
    { exchange: "NSE", tradingSymbol: "TCS-EQ", symbolToken: "2880" },
    { exchange: "NSE", tradingSymbol: "INFY-EQ", symbolToken: "4087" },
    { exchange: "NSE", tradingSymbol: "HCLTECH-EQ", symbolToken: "7229" },
    { exchange: "NSE", tradingSymbol: "WIPRO-EQ", symbolToken: "1270" },
    { exchange: "NSE", tradingSymbol: "TECHM-EQ", symbolToken: "1271" },
    { exchange: "NSE", tradingSymbol: "LTIM-EQ", symbolToken: "11536" },
    { exchange: "NSE", tradingSymbol: "MPHASIS-EQ", symbolToken: "11536" },
    { exchange: "NSE", tradingSymbol: "PERSISTENT-EQ", symbolToken: "11536" },
    { exchange: "NSE", tradingSymbol: "COFORGE-EQ", symbolToken: "11536" },
    { exchange: "NSE", tradingSymbol: "MINDTREE-EQ", symbolToken: "11536" }
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
        body: JSON.stringify({ symbols: itSymbols }),
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
      console.error('IT sector fetch failed', e);
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
          ws.send(JSON.stringify({ action: 'subscribe', channel: 'ohlc', exchange: 'NSE', sector: 'IT' }));
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
      title="IT" 
      rows={data} 
      isLoading={isLoading}
      onRefresh={fetchData}
    />
  );
};

export default ITSectorBeacon;
