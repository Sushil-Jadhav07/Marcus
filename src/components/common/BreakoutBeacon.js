import React, { useMemo, useState } from 'react';
import {
  FiSearch,
  FiChevronDown,
  FiFlag,
  FiStar,
  FiSun,
  FiHelpCircle,
  FiRefreshCw,
} from 'react-icons/fi';
import icon from '../../asset/img/candlepc.png';
import iconsmall from '../../asset/img/candle.png';

// Reusable board component to display a beacon-style list
// Accepts optional props; falls back to static demo data
const BreakoutBeacon = ({
  title = 'BREAKOUT BEACON',
  moodOptions = ['Bullish', 'Bearish', 'Neutral'],
  defaultMood = 'Neutral',
  rows: rowsProp,
  data = [], // New prop to accept data from parent
  isLoading = false,
  onRefresh,
}) => {
  const staticRows = useMemo(
    () => [
      { tag: 'BULL', symbol: 'BOSCHLTD', percent: 4.34, signal: 3.44, time: '09:35', dir: 'up' },
      { tag: 'BULL', symbol: 'HINDCOPPER', percent: 4.34, signal: 3.44, time: '09:34', dir: 'up' },
      { tag: 'BULL', symbol: 'BSOFT', percent: 4.50, signal: 4.50, time: '09:25', dir: 'up' },
      { tag: 'BULL', symbol: 'PPLPHARMA', percent: 1.35, signal: 1.35, time: '09:46', dir: 'up' },
      { tag: 'BULL', symbol: 'VBL', percent: 1.79, signal: 1.79, time: '09:39', dir: 'up' },
      { tag: 'BULL', symbol: 'CESC', percent: 2.44, signal: 2.44, time: '09:50', dir: 'up' },
      
    ],
    []
  );

  const [query, setQuery] = useState('');
  const [mood, setMood] = useState(defaultMood);
  
  // Transform data from parent to match the expected format
  const transformedData = useMemo(() => {
    if (data && data.length > 0) {
      return data.map(item => ({
        tag: item.direction === 'up' ? 'BULL' : 'BEAR',
        symbol: item.symbol || 'N/A',
        percent: parseFloat(item.signalPercent?.replace('%', '') || '0'),
        signal: parseFloat(item.signalPercent?.replace('%', '') || '0'),
        time: item.timeLabel || '--:--',
        dir: item.direction || 'up'
      }));
    }
    return null;
  }, [data]);

  const rows = rowsProp || transformedData || staticRows;

  const filtered = useMemo(() => {
    let filteredRows = rows;
    
    // Apply mood filtering
    if (mood === 'Bullish') {
      filteredRows = filteredRows.filter(r => r.tag === 'BULL');
    } else if (mood === 'Bearish') {
      filteredRows = filteredRows.filter(r => r.tag === 'BEAR');
    }
    // Neutral shows all stocks (no filtering)
    
    // Apply search filtering
    if (!query) return filteredRows;
    const q = query.toLowerCase();
    return filteredRows.filter((r) => r.symbol.toLowerCase().includes(q));
  }, [rows, query, mood]);

  // Calculate progress bar data
  const progressData = useMemo(() => {
    const total = filtered.length;
    if (total === 0) return { high: 0, low: 0, highPercent: 0, lowPercent: 0 };
    
    const high = filtered.filter(r => r.dir === 'up').length;
    const low = total - high;
    const highPercent = (high / total) * 100;
    const lowPercent = (low / total) * 100;
    
    return { high, low, highPercent, lowPercent };
  }, [filtered]);

  // Sort filtered data with high performers at top
  const sortedFiltered = useMemo(() => {
    return [...filtered].sort((a, b) => {
      // First sort by direction (up first)
      if (a.dir !== b.dir) {
        return a.dir === 'up' ? -1 : 1;
      }
      // Then sort by percentage (highest first)
      return b.percent - a.percent;
    });
  }, [filtered]);

  const openInTradingView = (symbol) => {
    if (!symbol) return;
    // Prefer NSE for India tickers if no exchange prefix is present
    const hasPrefix = /.+:.+/.test(symbol);
    const tvSymbol = hasPrefix ? symbol : `NSE:${symbol}`;
    const url = `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(tvSymbol)}`;
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e) {
      // Fallback to same-tab navigation
      window.location.href = url;
    }
  };

  return (
    <div className="relative overflow-y-auto scrollbar-hide bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-indigo-900/30 border-blue-400/40 mt-2 lg:relative backdrop-blur-xl rounded-2xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/70 border-r-white/70 border-b-blue-400/70 border-l-blue-400/70 w-full flex flex-col p-6 gap-4 bg-white/25 dark:bg-white/25 shadow-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-[1.02]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        {/* Placeholder candle icon block */}
        <div className="relative">
          <img src={icon} alt={title} className="w-12 h-12 drop-shadow-lg" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold tracking-wide text-[20px] dark:text-white text-black drop-shadow-sm">{title}</h3>
          <div className="text-xs text-white/70 font-medium">Real-time Sector Analysis</div>
        </div>
        <div className="flex items-center gap-3 text-xs dark:text-white/80 text-black/80">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
            >
              <FiRefreshCw className={`shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          )}
          <a href="#" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 border border-white/20">
            <FiHelpCircle className="shrink-0" />
            <span>Help</span>
            <span className="ml-1 rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-bold animate-pulse">LIVE</span>
          </a>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 dark:text-white/70 text-black/70" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search symbols"
          className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/10 border border-white/10  text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/50 placeholder:text-black/80"
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-lg"></div>
            <span className="text-white font-medium">High: {progressData.high}</span>
            <span className="text-green-300 font-semibold">({progressData.highPercent.toFixed(1)}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-300 font-semibold">({progressData.lowPercent.toFixed(1)}%)</span>
            <span className="text-white font-medium">Low: {progressData.low}</span>
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-500 shadow-lg"></div>
          </div>
        </div>
        <div className="relative w-full bg-white/5 rounded-full h-3 overflow-hidden shadow-inner border border-white/10">
          <div className="h-full flex transition-all duration-500 ease-out">
            <div 
              className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-lg transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${progressData.highPercent}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
            <div 
              className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 shadow-lg transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${progressData.lowPercent}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          {/* Progress percentage overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow-lg">
              {progressData.highPercent > progressData.lowPercent ? '↗' : '↘'}
            </span>
          </div>
        </div>
        {/* Performance indicator */}
        <div className="flex items-center justify-center mt-2">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
            progressData.highPercent > 60 
              ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
              : progressData.highPercent > 40 
              ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30'
              : 'bg-red-500/20 text-red-300 border border-red-400/30'
          }`}>
            {progressData.highPercent > 60 
              ? '🔥 Strong Performance' 
              : progressData.highPercent > 40 
              ? '⚡ Mixed Signals'
              : '⚠️ Weak Performance'
            }
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md bg-white/10 border border-white/10 px-2.5 py-1.5 text-xs"
          onClick={() => setMood((m) => (moodOptions[(moodOptions.indexOf(m) + 1) % moodOptions.length]))}
        >
          <span>{mood}</span>
          <FiChevronDown />
        </button>
        <div className="text-[11px] dark:text-white/70 text-black/70 ml-auto">Shows latest signals with change</div>
      </div>

      {/* Header row */}
      <div className="grid grid-cols-7 text-[12px] dark:text-white/70 text-black/70 px-2">
        <div className="col-span-3  bg-white/50 px-5 py-2 rounded-full ">Symbols</div>
        <div className="col-span-1 bg-white/50 px-5 py-2 rounded-full">%n+</div>
        <div className="col-span-2 bg-white/50 px-5 py-2 rounded-full">LTP</div>
        <div className="col-span-1 bg-white/50 px-5 py-2 rounded-full">Time</div>
      </div>

      <div className="mt-2 divide-y divide-white/10">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2 text-white/70">
              <FiRefreshCw className="animate-spin" />
              <span>Loading...</span>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-white/70">No data available</div>
          </div>
        ) : (
          sortedFiltered.map((r, idx) => (
          <div
            key={r.symbol + idx}
            className="group grid grid-cols-7 items-center px-2 py-2 rounded-lg cursor-pointer transition-all duration-150 ease-out hover:bg-white/10 hover:-translate-y-0.5 hover:ring-1 ring-white/10"
            role="button"
            tabIndex={0}
            onClick={() => openInTradingView(r.symbol)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') openInTradingView(r.symbol);
            }}
          >
            {/* Symbol + tag */}
            <div className="col-span-3 flex items-center justify-between gap-2 overflow-hidden">
              <div className='flex items-center gap-2'>
              <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 transition-colors ${
                r.tag === 'BULL' 
                  ? 'bg-green-500 text-white group-hover:bg-green-400' 
                  : 'bg-red-500 text-white group-hover:bg-red-400'
              }`}>{r.tag}</span>
              <span className="truncate text-sm dark:text-white text-black transition-colors group-hover:text-white">{r.symbol}</span>
              </div>
              <div className='flex items-center gap-2'>
                <img src={iconsmall} alt={r.symbol} className='w-4 h-4 transition-transform duration-150 group-hover:rotate-6' />
                </div>
            </div>

            {/* % change */}
            <div className="col-span-1 text-center">
              <span
                className={`inline-flex min-w-[48px] justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                  r.dir === 'up' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {r.percent.toFixed(2)}
              </span>
            </div>

            {/* LTP display */}
            <div className="col-span-2 text-start">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-medium dark:text-white text-black">{r.ltp ? r.ltp.toFixed(2) : '--'}</span>
              </div>
            </div>

            {/* Time */}
            <div className="col-span-1 text-center text-xs dark:text-white/80 text-black/80">{r.time}</div>
          </div>
        ))
        )}
      </div>
    </div>
  );
};

export default BreakoutBeacon;
