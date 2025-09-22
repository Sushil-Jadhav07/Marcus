import React, { useEffect, useMemo, useState } from 'react';
import BreakoutBeacon from './BreakoutBeacon';

/**
 * IntradayBoost
 * - Reuses BreakoutBeacon presentation
 * - Calls a configurable endpoint (defaults to market movers)
 * - Maps payloads into BreakoutBeacon rows
 */
const IntradayBoost = ({
  title = 'INTRADAY BOOST',
  apiUrl = 'https://angelbackend-production.up.railway.app/get-market-movers',
  requestBody = { datatype: 'PercPriceGainers', expirytype: 'NEAR' },
  limit = 10,
}) => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Map various payload shapes into rows that BreakoutBeacon understands
  const mapToRows = (items) => {
    if (!Array.isArray(items)) return [];
    return items.map((it, idx) => {
      const symbolRaw = it.tradingSymbol || it.symbol || it.name || `SYM${idx}`;
      const symbol = String(symbolRaw).replace(/^-?NSE_?/i, '').replace(/-EQ$/i, '');
      const company = it.companyName || it.name || undefined;

      let changePct = Number.isFinite(Number(it.percentChange))
        ? Number(it.percentChange)
        : (typeof it.changePct === 'number')
          ? it.changePct
          : parseFloat(
              it.changePct || it.pct || it.percent || it.pChange || it.percChange || 0
            );

      const openVal = Number(it.o ?? it.open);
      const closeVal = Number(it.c ?? it.close ?? it.ltp ?? it.lastPrice);
      if (!Number.isFinite(changePct) || changePct === 0) {
        if (Number.isFinite(openVal) && Number.isFinite(closeVal) && openVal) {
          changePct = ((closeVal - openVal) / openVal) * 100;
        } else {
          changePct = 0;
        }
      }
      const direction = changePct >= 0 ? 'up' : 'down';

      const ltpVal = Number(it.ltp ?? it.lastPrice ?? it.close) || 0;
      const openField = Number(it.open ?? it.o) || 0;
      const closeField = Number(it.close ?? it.c ?? it.lastPrice ?? it.ltp) || 0;
      const netChangeApi = Number(it.netChange);
      const netChange = Number.isFinite(netChangeApi) ? netChangeApi : (ltpVal || closeField) - openField;
      const netChangePct = Number.isFinite(Number(it.percentChange))
        ? Number(it.percentChange)
        : (openField ? (netChange / openField) * 100 : (Number.isFinite(changePct) ? changePct : 0));

      const finalDir = Number.isFinite(netChange) ? (netChange >= 0 ? 'up' : 'down') : direction;

      return {
        tag: finalDir === 'up' ? 'BULL' : 'BEAR',
        symbol,
        company,
        percent: Math.abs(changePct) || 0,
        signal: Math.abs(changePct) || 0,
        ltp: ltpVal,
        open: openField,
        close: closeField,
        netChange,
        netChangePct,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        dir: finalDir,
      };
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const items = Array.isArray(json?.data) ? json.data : (json?.items || []);
      const mapped = mapToRows(items);
      setRows(mapped);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('IntradayBoost fetch failed', e);
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiUrl]);

  const data = useMemo(() => (Array.isArray(rows) ? rows.slice(0, limit) : []), [rows, limit]);

  return (
    <BreakoutBeacon
      title={title}
      rows={data}
      isLoading={isLoading}
      onRefresh={fetchData}
    />
  );
};

export default IntradayBoost;

