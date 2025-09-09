import React, { useMemo, useState } from 'react';
import {
  FiSearch,
  FiChevronDown,
  FiFlag,
  FiStar,
  FiSun,
  FiHelpCircle,
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
    if (!query) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) => r.symbol.toLowerCase().includes(q));
  }, [rows, query]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-400/30 mt-2 lg:relative backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col p-5 gap-3 bg-white/20 dark:bg-white/20  shadow-lg overflow-y-auto scrollbar-hide  ">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        {/* Placeholder candle icon block */}
        <img src={icon} alt={title} className="w-10 h-10" />
        <h3 className="font-semibold tracking-wide text-[18px] dark:text-white text-black">{title}</h3>
        <div className="ml-auto flex items-center gap-3 text-xs dark:text-white/80 text-black/80">
          <a href="#" className="inline-flex items-center gap-1 hover:text-white">
            <FiHelpCircle className="shrink-0" />
            <span>How to use</span>
            <span className="ml-1 rounded bg-red-500/90 px-1.5 py-0.5 text-[10px] font-semibold">LIVE</span>
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
        <div className="col-span-2 bg-white/50 px-5 py-2 rounded-full">Signal %</div>
        <div className="col-span-1 bg-white/50 px-5 py-2 rounded-full">Time</div>
      </div>

      <div className="mt-2 divide-y divide-white/10">
        {filtered.map((r, idx) => (
          <div
            key={r.symbol + idx}
            className="grid grid-cols-7 items-center px-2 py-2 hover:bg-white/5 rounded-lg"
          >
            {/* Symbol + tag */}
            <div className="col-span-3 flex items-center justify-between gap-2 overflow-hidden">
              <div className='flex items-center gap-2'>
              <span className="text-[10px] bg-[#1EE004] font-semibold rounded-full bg-emerald-500/90 text-black px-2 py-0.5">{r.tag}</span>
              <span className="truncate text-sm">{r.symbol}</span>
              </div>
              <div className='flex items-center gap-2'>
                <img src={iconsmall} alt={r.symbol} className='w-4 h-4' />
                </div>
            </div>

            {/* % change */}
            <div className="col-span-1 text-center">
              <span
                className={`inline-flex min-w-[48px] justify-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                  r.dir === 'up' ? 'bg-[#1EE004] text-black' : 'bg-red-500/90 text-black'
                }`}
              >
                {r.percent.toFixed(2)}
              </span>
            </div>

            {/* Signal % with small markers */}
            <div className="col-span-2 text-start">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-medium">{r.signal.toFixed(2)}</span>
                
              </div>
            </div>

            {/* Time */}
            <div className="col-span-1 text-center text-xs dark:text-white/80 text-black/80">{r.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreakoutBeacon;

