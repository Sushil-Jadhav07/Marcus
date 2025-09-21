import React, { useEffect, useRef, memo } from 'react';

// TradingView Market Quotes widget restricted to a single sector list.
// Pass your own symbols (TradingView format: EXCHANGE:SYMBOL) to customize.
function SectorSingleListTV({
  title = 'Energy',
  symbols = [
    { name: 'NYSE:XOM', displayName: 'Exxon Mobil' },
    { name: 'NYSE:CVX', displayName: 'Chevron' },
    { name: 'NYSE:COP', displayName: 'ConocoPhillips' },
    { name: 'NYSE:SLB', displayName: 'Schlumberger' },
    { name: 'NYSE:PSX', displayName: 'Phillips 66' },
    { name: 'NYSE:MPC', displayName: 'Marathon Petroleum' },
    { name: 'NYSE:VLO', displayName: 'Valero' },
    { name: 'NYSE:OXY', displayName: 'Occidental' },
    { name: 'NYSE:HAL', displayName: 'Halliburton' },
    { name: 'NYSE:BKR', displayName: 'Baker Hughes' }
  ],
  height = '460px'
}) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    script.type = 'text/javascript';
    script.async = true;

    const symbolsGroups = [
      {
        name: `${title} Stocks`,
        symbols: symbols.map(s => ({ name: s.name, displayName: s.displayName || s.name }))
      }
    ];

    script.innerHTML = `{
      "width": "100%",
      "height": ${JSON.stringify(height)},
      "symbolsGroups": ${JSON.stringify(symbolsGroups)},
      "showSymbolLogo": false,
      "isTransparent": false,
      "colorTheme": "dark",
      "locale": "en"
    }`;

    container.current.appendChild(script);
    return () => {
      while (container.current && container.current.firstChild) {
        container.current.removeChild(container.current.firstChild);
      }
    };
  }, [title, symbols, height]);

  return (
    <div className="bg-white/10 backdrop-blur rounded-xl border border-white/10 overflow-hidden">
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="text-white font-semibold">Breakout Beacon</div>
          <div className="flex items-center gap-2 text-[10px] text-white/60">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>LIVE</span>
          </div>
        </div>
        <div className="mt-3">
          <input placeholder="Search symbols" className="w-full bg-white/10 border border-white/10 rounded-md text-sm text-white placeholder-white/60 px-3 py-2 outline-none" />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button className="bg-white/10 border border-white/10 rounded-md text-xs text-white px-3 py-2">Neutral</button>
          <span className="text-[10px] text-white/60">Shows latest signals with change</span>
        </div>
        <div className="mt-3">
          <div className="grid grid-cols-4 gap-2 text-xs text-white/70">
            <div className="bg-white/10 rounded-full px-3 py-2 inline-block">Symbols</div>
            <div className="bg-white/10 rounded-full px-3 py-2 text-center">%n+</div>
            <div className="bg-white/10 rounded-full px-3 py-2 text-center">Signal %</div>
            <div className="bg-white/10 rounded-full px-3 py-2 text-center">Time</div>
          </div>
        </div>
      </div>
      <div className="mt-2 tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget" style={{ height }}></div>
      </div>
    </div>
  );
}

export default memo(SectorSingleListTV);


