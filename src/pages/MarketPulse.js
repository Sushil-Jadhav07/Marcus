import React, { useEffect, useState } from 'react';
import Navigation from '../components/layout/Navigation';
import Topbar from '../components/layout/Topbar';
import MobileTopbar from '../components/layout/MobileTopbar';
import SignalSection from '../components/MarketPulse/SignalSection';
import BreakoutBeacon from '../components/common/BreakoutBeacon';
import Marquee from '../components/MarketPulse/Marquee';
import Nifty50Chart from '../components/charts/Nifty50Chart';
import IntradayBoost from '../components/common/IntradayBoost';
import TopLevelStocks from '../components/common/TopLevelStocks';
import LowLevelStocks from '../components/common/LowLevelStocks';
import TopLoser from '../components/common/TopLoser';
import TopGainer from '../components/common/TopGainer';

const MarketPulse = () => {
  // Initialize states with localStorage data if available
  const [breakoutData, setBreakoutData] = useState(() => {
    const saved = localStorage.getItem('breakoutData');
    return saved ? JSON.parse(saved) : [];
  });
  const [intradayData, setIntradayData] = useState(() => {
    const saved = localStorage.getItem('intradayData');
    return saved ? JSON.parse(saved) : [];
  });
  const [topLevelData, setTopLevelData] = useState(() => {
    const saved = localStorage.getItem('topLevelData');
    return saved ? JSON.parse(saved) : [];
  });
  const [lowLevelData, setLowLevelData] = useState(() => {
    const saved = localStorage.getItem('lowLevelData');
    return saved ? JSON.parse(saved) : [];
  });
  const [topGainerData, setTopGainerData] = useState(() => {
    const saved = localStorage.getItem('topGainerData');
    return saved ? JSON.parse(saved) : [];
  });
  const [topLoserData, setTopLoserData] = useState(() => {
    const saved = localStorage.getItem('topLoserData');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [breakoutLoading, setBreakoutLoading] = useState(false);
  const [intradayLoading, setIntradayLoading] = useState(false);
  const [topLevelLoading, setTopLevelLoading] = useState(false);
  const [lowLevelLoading, setLowLevelLoading] = useState(false);
  const [topGainerLoading, setTopGainerLoading] = useState(false);
  const [topLoserLoading, setTopLoserLoading] = useState(false);
  
  const [breakoutError, setBreakoutError] = useState(null);
  const [intradayError, setIntradayError] = useState(null);
  const [topLevelError, setTopLevelError] = useState(null);
  const [lowLevelError, setLowLevelError] = useState(null);
  const [topGainerError, setTopGainerError] = useState(null);
  const [topLoserError, setTopLoserError] = useState(null);

  // Helper: transform scan API to SignalSection items (nsecode/per_chg/close)
  const transformScanToSignals = (data) => {
    const items = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.items)
          ? data.items
          : [];
    const now = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
    return items.map((it, idx) => {
      const symbol = String(it.nsecode || it.symbol || it.tradingSymbol || `STOCK${idx + 1}`).substring(0, 20);
      const perChgNum = Number(it.per_chg);
      const percent = Number.isFinite(perChgNum) ? perChgNum : 0;
      const ltp = it.close ?? it.ltp ?? null;
      return {
        symbol,
        timeLabel: now(),
        signalPercent: `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`,
        ltp,
        movePercent: `${percent > 0 ? '+' : ''}${percent.toFixed(2)}%`,
        direction: percent >= 0 ? 'up' : 'down',
      };
    });
  };

  // Fetch breakout beacon data (match BreakoutBeacon scan clause)
  const fetchBreakoutData = async () => {
    setBreakoutLoading(true);
    setBreakoutError(null);
    try {
      const response = await fetch('https://angelbackend-production.up.railway.app/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: '( {33489} ( [0] 5 minute close > [0] 5 minute vwap and [0] 5 minute close > 1 day ago high and [0] 5 minute volume > ( 2 ) ) ) ',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const transformedData = transformScanToSignals(data);
      setBreakoutData(transformedData);
      saveDataWithTimestamp('breakoutData', transformedData);
    } catch (err) {
      console.error('Error fetching breakout data:', err);
      setBreakoutError(err.message);
      setBreakoutData(getFallbackData());
    } finally {
      setBreakoutLoading(false);
    }
  };

  // Fetch intraday boost data (match IntradayBoost scan clause)
  const fetchIntradayData = async () => {
    setIntradayLoading(true);
    setIntradayError(null);
    try {
      const response = await fetch('https://angelbackend-production.up.railway.app/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: '( {cash} ( daily close > daily open and daily close > daily ema( daily close , 20 ) and daily volume > daily sma( daily volume , 20 ) * 2 and daily close > daily max( 10 , 1 day ago high ) and daily rsi( 14 ) > 50 and daily adx( 14 ) > 20 ) ) ',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const transformedData = transformScanToSignals(data);
      setIntradayData(transformedData);
      saveDataWithTimestamp('intradayData', transformedData);
    } catch (err) {
      console.error('Error fetching intraday data:', err);
      setIntradayError(err.message);
      setIntradayData(getFallbackData());
    } finally {
      setIntradayLoading(false);
    }
  };

  // Fetch top level stocks data (match TopLevelStocks scan clause)
  const fetchTopLevelData = async () => {
    setTopLevelLoading(true);
    setTopLevelError(null);
    try {
      const response = await fetch('https://angelbackend-production.up.railway.app/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: '( {cash} ( ( {33489} ( ( [0] 5 minute sma( [0] 5 minute volume , 4 ) - daily sma( 2 days ago volume / 75 , 5 ) ) / 2 days ago sma( daily volume , 75 ) * 100 > 0 and daily high / daily close <= 1.003 and 1 day ago "close - 1 candle ago close / 1 candle ago close * 100" < 5 and daily close >= 1 day ago high and daily close > 80 and daily close < 10000 and( {33489} ( [0] 5 minute close - [0] 5 minute open / [0] 5 minute open * 100 < 0.05 or [-1] 5 minute close - [-1] 5 minute open / [-1] 5 minute open * 100 < 0.05 or [-2] 5 minute close - [-2] 5 minute open / [-2] 5 minute open * 100 < 0.05 ) ) ) ) ) )',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const transformedData = transformScanToSignals(data);
      setTopLevelData(transformedData);
      saveDataWithTimestamp('topLevelData', transformedData);
    } catch (err) {
      console.error('Error fetching top level data:', err);
      setTopLevelError(err.message);
      setTopLevelData(getFallbackData());
    } finally {
      setTopLevelLoading(false);
    }
  };

  // Fetch low level stocks data (match LowLevelStocks scan clause)
  const fetchLowLevelData = async () => {
    setLowLevelLoading(true);
    setLowLevelError(null);
    try {
      const response = await fetch('https://angelbackend-production.up.railway.app/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: '( {cash} ( daily close > daily open and daily close > daily ema( daily close , 20 ) and daily volume > daily sma( daily volume , 20 ) * 2 and daily close > daily max( 10 , 1 day ago high ) and daily rsi( 14 ) > 50 and daily adx( 14 ) > 20 ) )  ',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const transformedData = transformScanToSignals(data);
      setLowLevelData(transformedData);
      saveDataWithTimestamp('lowLevelData', transformedData);
    } catch (err) {
      console.error('Error fetching low level data:', err);
      setLowLevelError(err.message);
      setLowLevelData(getFallbackData());
    } finally {
      setLowLevelLoading(false);
    }
  };

  // Fetch top gainers data (match TopGainer scan clause)
  const fetchTopGainerData = async () => {
    setTopGainerLoading(true);
    setTopGainerError(null);
    try {
      const response = await fetch('https://angelbackend-production.up.railway.app/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: '( {cash} ( daily close > daily open * 1.1 ) )',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const transformedData = transformScanToSignals(data);
      setTopGainerData(transformedData);
      saveDataWithTimestamp('topGainerData', transformedData);
    } catch (err) {
      console.error('Error fetching top gainer data:', err);
      setTopGainerError(err.message);
      setTopGainerData(getFallbackData());
    } finally {
      setTopGainerLoading(false);
    }
  };

  // Fetch top losers data (match TopLoser scan clause)
  const fetchTopLoserData = async () => {
    setTopLoserLoading(true);
    setTopLoserError(null);
    try {
      const response = await fetch('https://angelbackend-production.up.railway.app/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: '( {33489} ( ( [=-1] 5 minute close - [0] 5 minute low ) / [=-1] 5 minute close > .01 ) )',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const transformedData = transformScanToSignals(data);
      setTopLoserData(transformedData);
      saveDataWithTimestamp('topLoserData', transformedData);
    } catch (err) {
      console.error('Error fetching top loser data:', err);
      setTopLoserError(err.message);
      setTopLoserData(getFallbackData());
    } finally {
      setTopLoserLoading(false);
    }
  };

  // Helper function to transform API data
  const transformData = (data) => {
    let transformedData = [];
    
    if (Array.isArray(data)) {
      transformedData = data.map((item, index) => {
        const perChg = parseFloat(item.per_chg) || 0;
        const symbol = item.symbol || item.tradingSymbol || item.name || `STOCK${index + 1}`;
        
        return {
          symbol: String(symbol).substring(0, 20),
          timeLabel: new Date().toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          signalPercent: item.percentChange || `${perChg > 0 ? '+' : ''}${perChg.toFixed(2)}%`,
          ltp: item.ltp,
          movePercent: item.netChange ? item.netChange + '%' : `${perChg > 0 ? '+' : ''}${perChg.toFixed(2)}%`,
          direction: perChg >= 0 ? 'up' : 'down'
        };
      });
    } else if (data && typeof data === 'object') {
      const items = data.data || data.items || data.results || [];
      if (Array.isArray(items)) {
        transformedData = items.map((item, index) => {
          const perChg = parseFloat(item.per_chg) || 0;
          const symbol = item.symbol || item.tradingSymbol || item.name || `STOCK${index + 1}`;
          
          return {
            symbol: String(symbol).substring(0, 20),
            timeLabel: new Date().toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false 
            }),
            signalPercent: item.percentChange || item.netChangeOpnInterest || `${perChg > 0 ? '+' : ''}${perChg.toFixed(2)}%`,
            ltp: item.ltp || item.netChangeOpnInterest || item.netChange || item.percentChange,
            movePercent: item.netChange ? item.netChange + '%' : item.percentChange ? item.percentChange + '%' : `${perChg > 0 ? '+' : ''}${perChg.toFixed(2)}%`,
            direction: (item.percentChange || item.netChangeOpnInterest ) >= 0 ? 'up' : 'down'
          };
        });
      }
    }

    return transformedData;
  };

  // Helper function for fallback data
  const getFallbackData = () => [
    { symbol: 'BOSCHILTD', timeLabel: '09:30', signalPercent: '6.44%', movePercent: '6.51%', direction: 'up' },
    { symbol: 'RVNL', timeLabel: '15:05', signalPercent: '-5.01%', movePercent: '-5.01%', direction: 'down' },
    { symbol: 'BOSCH', timeLabel: '09:30', signalPercent: '6.44%', movePercent: '6.51%', direction: 'up' },
    { symbol: 'TCS', timeLabel: '10:15', signalPercent: '-2.12%', movePercent: '-1.80%', direction: 'down' },
  ];

  // Helper function to check if data is stale (older than 5 minutes)
  const isDataStale = (key) => {
    const timestamp = localStorage.getItem(`${key}_timestamp`);
    if (!timestamp) return true;
    const now = Date.now();
    const dataTime = parseInt(timestamp);
    return (now - dataTime) > 5 * 60 * 1000; // 5 minutes
  };

  // Helper function to save data with timestamp
  const saveDataWithTimestamp = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`${key}_timestamp`, Date.now().toString());
  };

  useEffect(() => {
    // Only fetch data if it doesn't exist or is stale (prevent unnecessary reload on website refresh)
    if (!localStorage.getItem('breakoutData') || isDataStale('breakoutData')) {
      fetchBreakoutData();
    }
    if (!localStorage.getItem('intradayData') || isDataStale('intradayData')) {
      fetchIntradayData();
    }
    if (!localStorage.getItem('topLevelData') || isDataStale('topLevelData')) {
      fetchTopLevelData();
    }
    if (!localStorage.getItem('lowLevelData') || isDataStale('lowLevelData')) {
      fetchLowLevelData();
    }
    if (!localStorage.getItem('topGainerData') || isDataStale('topGainerData')) {
      fetchTopGainerData();
    }
    if (!localStorage.getItem('topLoserData') || isDataStale('topLoserData')) {
      fetchTopLoserData();
    }
  }, []);

  return (
    <div className='flex flex-col bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% '>
      <Navigation />
      <div className='w-full h-full flex flex-col'>
        <Topbar /> 
        <MobileTopbar />
        
        <div className=' overflow-hidden '>
          <Marquee/>
          <div className='flex justify-start item-center px-5 pt-5'>
            <h2 className="mb-3 text-white font-semibold tracking-wide text-[30px]">Market Pulse</h2>
          </div>
          <div className='px-5 md:grid hidden grid-cols-1 lg:grid-cols-2 gap-5 lg:mb-[50px]'>
            <BreakoutBeacon 
              title="Breakout Beacon"
            />
            <IntradayBoost/>
            <TopLevelStocks title="Top Level Stocks"/>
            <LowLevelStocks title='Low Level Stocks' />
            <TopGainer title='TOP GAINERS' />
            <TopLoser title="TOP LOSERS" />
          </div>
          <div className='space-y-5'>
            <SignalSection
              title="BREAKOUT BEACON"
              items={breakoutData}
              isLoading={breakoutLoading}
              error={breakoutError}
              onRefresh={fetchBreakoutData}
            />
            <SignalSection
              title="INTRADAY BOOST"
              items={intradayData}
              isLoading={intradayLoading}
              error={intradayError}
              onRefresh={fetchIntradayData}
            />
            <SignalSection
              title="TOP LEVEL STOCKS"
              items={topLevelData}
              isLoading={topLevelLoading}
              error={topLevelError}
              onRefresh={fetchTopLevelData}
            />
            <SignalSection
              title="LOW LEVEL STOCKS"
              items={lowLevelData}
              isLoading={lowLevelLoading}
              error={lowLevelError}
              onRefresh={fetchLowLevelData}
            />
            <SignalSection
              title="TOP GAINERS"
              items={topGainerData}
              isLoading={topGainerLoading}
              error={topGainerError}
              onRefresh={fetchTopGainerData}
            />
            <SignalSection
              title="TOP LOSERS"
              items={topLoserData}
              isLoading={topLoserLoading}
              error={topLoserError}
              onRefresh={fetchTopLoserData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPulse;