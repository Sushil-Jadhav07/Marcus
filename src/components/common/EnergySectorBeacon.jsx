import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import BreakoutBeacon from './BreakoutBeacon';
import { buildTradingViewNseUrl } from '../../utils/tradingview';

const EnergySectorBeacon = () => {
  const accessToken = useSelector((s) => s.vendorAuth?.accessToken);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const wsRef = useRef(null);

  // Scan API request body for energy sector analysis
  const requestBody = useMemo(() => ({
    scan_clause: "( {cash} ( abs( [0] 5 minute sma( [0] 5 minute close , 10 ) - [0] 5 minute sma( [0] 5 minute close , 6 ) ) <= [0] 5 minute sma( [0] 5 minute close , 10 ) * 0.005 and [0] 5 minute close > [0] 5 minute open and [0] 5 minute sma( [0] 5 minute close , 6 ) >= [0] 5 minute sma( [0] 5 minute close , 10 ) and [0] 5 minute close >= [0] 5 minute sma( [0] 5 minute close , 6 ) and [0] 5 minute rsi( 14 ) >= 70 and abs( [0] 5 minute close - [0] 5 minute open ) > 2 * [-1] 5 minute sma( abs( [0] 5 minute close - [0] 5 minute open ) , 75 ) ) ) "
  }), []);

  // Helper: map scan API response to beacon rows
  const mapToRows = (items) => {
    if (!Array.isArray(items)) return [];
    console.log('Mapping items:', items);
    return items.map((it, idx) => {
      console.log(`Processing item ${idx}:`, it);
      const symbol = (it.nsecode || it.symbol || it.tradingSymbol || it.name || `SYM${idx}`).replace(/^NSE_/i, '');
      const changePct = Number(it.per_chg ?? it.change ?? it.pctChange ?? it.pChange ?? 0);
      const direction = changePct >= 0 ? 'up' : 'down';
      const tradingViewUrl = buildTradingViewNseUrl(it);
      
      const mappedItem = {
        tag: direction === 'up' ? 'BULL' : 'BEAR',
        symbol,
        percent: Math.abs(changePct) || 0,
        signal: Math.abs(changePct) || 0,
        ltp: Number(it.ltp ?? it.close ?? it.last_price ?? 0),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dir: direction,
        tradingViewUrl,
        originalData: it
      };
      console.log(`Mapped item ${idx}:`, mappedItem);
      return mappedItem;
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const url = 'https://angelbackend-production.up.railway.app/scan';
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const json = await res.json();
      
      // Debug: Log the full API response
      console.log('Scan API Response:', json);
      
      // Handle scan API response format
      const scanData = json?.data || [];
      
      // Debug: Log the extracted data
      console.log('Extracted scanData:', scanData);
      console.log('Is Array:', Array.isArray(scanData));
      console.log('Data length:', scanData.length);
      
      if (!Array.isArray(scanData) || scanData.length === 0) {
        console.log('No data available or not an array');
        setRows([]);
        return;
      }
      
      const mappedRows = mapToRows(scanData);
      console.log('Mapped rows:', mappedRows);
      setRows(mappedRows);
    } catch (e) {
      console.error('Energy sector scan failed', e);
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
          ws.send(JSON.stringify({ action: 'subscribe', channel: 'ohlc', exchange: 'NSE', sector: 'ENERGY' }));
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

  const data = useMemo(() => {
    const result = Array.isArray(rows) ? rows.slice(0, 10) : [];
    console.log('EnergySectorBeacon - Final data being passed to BreakoutBeacon:', result);
    return result;
  }, [rows]);

  console.log('EnergySectorBeacon - Current state:', { rows, isLoading, data });

  return (
    <BreakoutBeacon 
      title="ENERGY" 
      rows={data} 
      isLoading={isLoading}
      onRefresh={fetchData}
    />
  );
};

export default EnergySectorBeacon;
