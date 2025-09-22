import React, { useEffect, useMemo, useState } from 'react';
import { FiHelpCircle, FiRefreshCw } from 'react-icons/fi';
import icon from '../../asset/img/candlepc.png';
import iconsmall from '../../asset/img/candle.png';

const TopGainer = (
    {
        title = 'LOW LEVEL STOCKS',
        apiUrl = 'https://angelbackend-production.up.railway.app/get-market-movers',
        method = 'POST',
        requestBody = { datatype: 'PercOIGainers', expirytype: 'FAR' },
        headers = { 'Content-Type': 'application/json' },
        limit = 20,
      }
) => {
    const [rawData, setRawData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const extractItems = (json) => {
      if (Array.isArray(json)) return json;
      if (Array.isArray(json?.data)) return json.data;
      if (Array.isArray(json?.items)) return json.items;
      if (Array.isArray(json?.data?.items)) return json.data.items;
      return [];
    };
  
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const init = { method, headers };
        if (method.toUpperCase() === 'POST') {
          init.body = JSON.stringify(requestBody ?? {});
        }
        const res = await fetch(apiUrl, init);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const items = extractItems(json);
        setRawData(Array.isArray(items) ? items : []);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('TopLevelStocks fetch failed', e);
        setRawData([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiUrl, method, JSON.stringify(requestBody)]);
  
    const data = useMemo(
      () => (Array.isArray(rawData) ? rawData.slice(0, limit) : []),
      [rawData, limit]
    );
  
    const fmtInt = (v) => {
      const n = Number(v);
      if (!Number.isFinite(n)) return '--';
      return n.toLocaleString('en-IN');
    };
  
    const fmtPct = (v) => {
      const n = Number(v);
      if (!Number.isFinite(n)) return '--';
      const sign = n > 0 ? '+' : '';
      return `${sign}${n.toFixed(2)}%`;
    };
  
    const stripExpirySuffix = (str) => {
      let v = String(str || '');
      v = v.replace(/\d{2}(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)\d{2}(?:FUT|OPT)?$/i, '');
      v = v.replace(/\d{2}(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV)(?:FUT|OPT)?$/i, '');
      v = v.replace(/(FUT|OPT)$/i, '');
      return v.trim();
    };
  
    const displaySymbol = (it) => {
      const sym = it.tradingSymbol || it.symbol || '';
      if (!sym) return '';
      const s = sym.replace(/-EQ$/i, '').replace(/^NSE_?/i, '');
      return stripExpirySuffix(s);
    };
  
  return (
    <div className="relative overflow-y-auto scrollbar-hide bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-indigo-900/30 border-blue-400/40 mt-2 lg:relative backdrop-blur-xl rounded-2xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/70 border-r-white/70 border-b-blue-400/70 border-l-blue-400/70 w-full flex flex-col p-6 gap-4 bg-white/25 dark:bg-white/25 shadow-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-[1.02]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
    {/* Header (matches BreakoutBeacon style) */}
    <div className="flex items-center gap-4 mb-2">
      <div className="relative">
        <img src={icon} alt={title} className="w-12 h-12 drop-shadow-lg" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
      </div>
      <div className="flex-1">
        <h3 className="font-bold tracking-wide text-[20px] dark:text-white text-black drop-shadow-sm">{title}</h3>
        <div className="text-xs text-white/70 font-medium">Open Interest Gainers (NEAR)</div>
      </div>
      <div className="flex items-center gap-3 text-xs dark:text-white/80 text-black/80">
        <button
          onClick={fetchData}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
        >
          <FiRefreshCw className={`shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
        <a href="#" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 border border-white/20">
          <FiHelpCircle className="shrink-0" />
          <span>Help</span>
          <span className="ml-1 rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-bold animate-pulse">LIVE</span>
        </a>
      </div>
    </div>

    <div className="grid grid-cols-7 text-[12px] dark:text-white/70 text-black/70 px-2">
      <div className="col-span-3 bg-white/50 px-5 py-2 rounded-full">Symbol</div>
      <div className="col-span-2 bg-white/50 px-5 py-2 rounded-full">OI Change</div>
      <div className="col-span-1 bg-white/50 px-5 py-2 rounded-full">OI</div>
      <div className="col-span-1 bg-white/50 px-5 py-2 rounded-full">%</div>
    </div>

    <div className="mt-2 divide-y divide-white/10">
      {isLoading ? (
        <div className="flex items-center justify-center py-8 text-white/70">Loading...</div>
      ) : !data.length ? (
        <div className="flex items-center justify-center py-8 text-white/70">No data available</div>
      ) : (
        data.map((it, idx) => {
          const pct = Number(it.percentChange);
          const up = Number.isFinite(pct) ? pct >= 0 : (Number(it.netChangeOpnInterest) || 0) >= 0;
          return (
            <div key={(it.tradingSymbol || it.symbol || 'row') + idx} className="group grid grid-cols-7 items-center px-2 py-2 rounded-lg hover:bg-white/10 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:ring-1 ring-white/10">
              <div className="col-span-3 flex items-center justify-between gap-2 overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${up ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{up ? 'BULL' : 'BEAR'}</span>
                  <span className="truncate text-sm dark:text-white text-black transition-colors group-hover:text-white">{displaySymbol(it)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={iconsmall} alt={displaySymbol(it)} className="w-4 h-4 transition-transform duration-150 group-hover:rotate-6" />
                </div>
              </div>
              <div className="col-span-2 text-sm flex justify-center items-center">
                <span className={`inline-flex min-w-[80px] justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${up ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {fmtInt(it.netChangeOpnInterest)}
                </span>
              </div>
              <div className="col-span-1 text-xs dark:text-white text-black">{fmtInt(it.opnInterest)}</div>
              <div className={`col-span-1 text-xs font-semibold ${up ? 'text-green-300' : 'text-red-300'}`}>
                {fmtPct(it.percentChange)}
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
  )
}

export default TopGainer