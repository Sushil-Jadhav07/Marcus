import React, { useEffect, useRef, memo } from 'react';

function SectorQuotes({ symbols = [
  { name: 'AMEX:XLK', displayName: 'Technology (XLK)' },
  { name: 'AMEX:XLF', displayName: 'Financials (XLF)' },
  { name: 'AMEX:XLE', displayName: 'Energy (XLE)' }
] }) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    script.type = 'text/javascript';
    script.async = true;
    const symbolsGroups = [
      {
        name: 'Sectors',
        symbols: symbols.map(s => ({ name: s.name, displayName: s.displayName }))
      }
    ];
    script.innerHTML = `{
      "width": "100%",
      "height": "100%",
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
  }, [symbols]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(SectorQuotes);


