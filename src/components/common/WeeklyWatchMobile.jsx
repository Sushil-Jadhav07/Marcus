import React, { useEffect, useMemo, useState } from 'react';
import icon from '../../asset/img/candlepc.png';
import iconsmall from '../../asset/img/candle.png';
import { buildTradingViewNseUrl } from '../../utils/tradingview';

const WeeklyWatchMobile = ({ title, children, className = "" }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false);
  
    const requestBody = useMemo(() => ({
      scan_clause: "( {33489} ( monthly rsi( 14 ) > 60 and weekly close < weekly sma( close,20 ) and weekly high < 1 week ago high ) )"
    }), []);
  
    const fetchScan = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch('https://angelbackend-production.up.railway.app/scan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
        if (res.status !== 200) {
          throw new Error(`Request failed: ${res.status}`);
        }
        const json = await res.json();
        setData(json.data);
        setVisible(true);
      } catch (err) {
        setError(err?.message || 'Unknown error');
        setVisible(false);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      // initial fetch
      fetchScan();
      // 15 minutes interval
      const intervalId = setInterval(fetchScan, 3 * 60 * 1000);
      return () => clearInterval(intervalId);
    }, []);
  
    const processed = useMemo(() => {
      if (!Array.isArray(data)) return null;
      const baseItems = data
        .slice(0, 15)
        .sort((a, b) => Math.abs(Number(b?.per_chg ?? b?.change ?? 0)) - Math.abs(Number(a?.per_chg ?? a?.change ?? 0)))
        .map((item, idx) => {
          const label = item?.symbol || item?.name || item?.ticker || `Item ${idx + 1}`;
          const changeValue = Number(item?.per_chg ?? item?.change ?? item?.pctChange ?? item?.pChange ?? 0);
          const clamped = Math.max(-5, Math.min(5, Number.isNaN(changeValue) ? 0 : changeValue));
          const intensity = Math.round((Math.abs(clamped) / 5) * 100);
          const color = clamped >= 0 ? `rgba(34,197,94,${0.45 + intensity/250})` : `rgba(239,68,68,${0.45 + intensity/250})`;
          const url = buildTradingViewNseUrl(item);
          const closePrice = Number(item?.close ?? item?.ltp ?? item?.last_price ?? 0);
          const perChange = Number(item?.per_chg ?? item?.change ?? item?.pctChange ?? item?.pChange ?? 0);
          return { 
            label, 
            color, 
            url, 
            closePrice: closePrice.toFixed(2), 
            perChange: perChange.toFixed(2),
            originalData: item 
          };
        });
  
      const rowsTarget = 5; // fixed number of rows; grid will pack by columns
      const patternRows = [1, 1, 2, 1, 2];
      let patternIndex = 0;
  
      const tiles = [];
  
      if (baseItems.length > 0) {
        // First column: single large tile spanning all rows, two columns wide
        const first = baseItems[0];
        tiles.push({ 
          key: `item-0`, 
          label: first.label, 
          color: first.color, 
          colSpan: 2, 
          rowSpan: rowsTarget, 
          url: first.url,
          closePrice: first.closePrice,
          perChange: first.perChange,
          originalData: first.originalData
        });
      }
  
      baseItems.slice(1).forEach((it, idx) => {
        const rowSpan = patternRows[patternIndex % patternRows.length];
        patternIndex += 1;
        const colSpan = 1; // pack vertically first
        tiles.push({ 
          key: `item-${idx + 1}`, 
          label: it.label, 
          color: it.color, 
          colSpan, 
          rowSpan, 
          url: it.url,
          closePrice: it.closePrice,
          perChange: it.perChange,
          originalData: it.originalData
        });
      });
  
      return { tiles, rowsCount: rowsTarget };
    }, [data]);

    
  if (!visible) return null;

  return (
    <div className={` overflow-y-auto scrollbar-hide bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-indigo-900/30 border-blue-400/40 mt-2 lg:relative backdrop-blur-xl rounded-2xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/70 border-r-white/70 border-b-blue-400/70 border-l-blue-400/70 w-full flex flex-col p-6 gap-4 bg-white/25 dark:bg-white/25 shadow-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 h-[500px]`}>
        <div className='flex justify-start items-start gap-5'>
          <div className="relative">
              <img src={icon} alt={title} className="w-12 h-12 drop-shadow-lg" />
          </div>
          <div className="flex-1">
              <h3 className="font-bold tracking-wide text-[20px] dark:text-white text-black drop-shadow-sm">{title}</h3>
          </div>
        </div>
        
        
  
        {isLoading && (
          <div className="flex-1 grid place-items-center text-white/80">
            Loading...
          </div>
        )}
  
        {error && (
          <div className="text-red-300 bg-red-900/40 border border-red-500/40 rounded-lg p-3">
            {error}
          </div>
        )}
  
        {!isLoading && !error && data && (
          <div className="w-full flex-1">
            {Array.isArray(data) && processed ? (
              <div
                className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-3 grid-flow-col-dense rounded h-full"
                style={{ gridTemplateRows: `repeat(${processed.rowsCount}, minmax(0, 1fr))` }}
              >
                {processed.tiles.map((it) => (
                  <div
                    key={it.key}
                    className={`relative group flex items-center justify-center p-2 ${it.filler ? 'opacity-0' : 'cursor-pointer hover:brightness-110'}`}
                    style={{ backgroundColor: it.filler ? 'transparent' : it.color, gridColumnEnd: `span ${it.colSpan}`, gridRowEnd: `span ${it.rowSpan}` }}
                    title={it.filler ? '' : it.label}
                    onClick={() => { if (!it.filler && it.url) { window.open(it.url, '_blank', 'noopener'); } }}
                  >
                    {!it.filler && (
                      <>
                        <span className="text-white font-semibold tracking-wide uppercase text-[12px] md:text-[13px] lg:text-[14px] select-none text-center truncate w-full px-2">
                          {it.label}
                        </span>
                        
                        {/* Hover Popup */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg border border-gray-700 whitespace-nowrap">
                            <div className="text-center">
                              <div className="font-semibold text-white mb-1">{it.label}</div>
                              <div className="text-gray-300">Close: ₹{it.closePrice}</div>
                              <div className={`font-medium ${Number(it.perChange) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {Number(it.perChange) >= 0 ? '+' : ''}{it.perChange}%
                              </div>
                            </div>
                            {/* Arrow pointing down */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <pre className="text-xs text-white/80 bg-black/30 rounded-lg p-3 max-h-[340px] overflow-auto">{JSON.stringify(data, null, 2)}</pre>
            )}
          </div>
        )}
      </div>
  )
}

export default WeeklyWatchMobile