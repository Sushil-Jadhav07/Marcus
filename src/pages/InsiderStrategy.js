import React, { useEffect, useState } from 'react';
import { setPageSeo } from '../utils/seo';
import MobileTopbar from '../components/layout/MobileTopbar';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';
import StrategyBoard from '../components/Insider/StrategyBoard';
import MobileStrategyBox from '../components/Insider/MobileStrategyBox';
import Marquee from '../components/MarketPulse/Marquee';
import SignalSection from '../components/MarketPulse/SignalSection';
import InsiderStrategyBox from '../components/Insider/InsiderStrategyBox';
import SectorAnalysisBox from '../components/Insider/SectorAnalysisBox';
import EnergySectorBeacon from '../components/common/EnergySectorBeacon';
import LOMLongterm from '../components/common/LOMLongterm';
import LOMShortterm from '../components/common/LOMShortterm';
import LOMContractionBO from '../components/common/LOMContractionBO';
import LOMDayHLReversal from '../components/common/LOMDayHLReversal';



const InsiderStrategy = () => {
  // Mobile-only SignalSection: LOM LONG TERM (scan API)
  const [lomLongData, setLomLongData] = useState([]);
  const LOM_LONG_CACHE = 'cache_INSIDER_LOM_LONG';
  const [lomLongLoading, setLomLongLoading] = useState(false);
  const [lomLongError, setLomLongError] = useState(null);
  const [lomShortData, setLomShortData] = useState([]);
  const LOM_SHORT_CACHE = 'cache_INSIDER_LOM_SHORT';
  const [lomShortLoading, setLomShortLoading] = useState(false);
  const [lomShortError, setLomShortError] = useState(null);
  const [contractionData, setContractionData] = useState([]);
  const CONTRACTION_CACHE = 'cache_INSIDER_CONTRACTION';
  const [contractionLoading, setContractionLoading] = useState(false);
  const [contractionError, setContractionError] = useState(null);
  const [dayHLData, setDayHLData] = useState([]);
  const DAYHL_CACHE = 'cache_INSIDER_DAYHL';
  const [dayHLLoading, setDayHLLoading] = useState(false);
  const [dayHLError, setDayHLError] = useState(null);

  const transformScanToSignals = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr.map((item, index) => {
      const perChgNum = Number(item?.per_chg ?? item?.change ?? item?.pctChange ?? item?.pChange ?? 0);
      const symbol = item?.nsecode || item?.symbol || item?.tradingSymbol || item?.ticker || `STOCK${index + 1}`;
      const ltpNum = Number(item?.close ?? item?.ltp ?? item?.last_price ?? 0);
      const pctText = `${perChgNum >= 0 ? '+' : ''}${perChgNum.toFixed(2)}%`;
      return {
        symbol: String(symbol).substring(0, 20),
        timeLabel: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
        signalPercent: pctText,
        ltp: ltpNum,
        movePercent: pctText,
        direction: perChgNum >= 0 ? 'up' : 'down',
      };
    });
  };

  const fetchLomLongData = async () => {
    setLomLongLoading(true);
    setLomLongError(null);
    try {
      const res = await fetch('https://70d52fe3b233.ngrok-free.app/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: "( {cash} ( daily close > monthly lower bollinger band( 20,2 ) and daily close > 100 and daily close > 2 months ago high ) )",
        }),
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      setLomLongData(transformScanToSignals(list));
      try {
        localStorage.setItem(LOM_LONG_CACHE, JSON.stringify(transformScanToSignals(list)));
        localStorage.setItem(`${LOM_LONG_CACHE}_ts`, Date.now().toString());
      } catch {}
    } catch (err) {
      setLomLongError(err?.message || 'Unknown error');
      try {
        const cached = localStorage.getItem(LOM_LONG_CACHE);
        if (cached) { setLomLongData(JSON.parse(cached)); return; }
      } catch {}
      setLomLongData([]);
    } finally {
      setLomLongLoading(false);
    }
  };

  const fetchLomShortData = async () => {
    setLomShortLoading(true);
    setLomShortError(null);
    try {
      const res = await fetch('https://70d52fe3b233.ngrok-free.app/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: "( {cash} ( monthly close > monthly upper bollinger band( 20,2 ) and monthly rsi( 14 ) >= 60 and market cap >= 4000 ) )",
        }),
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      setLomShortData(transformScanToSignals(list));
      try {
        localStorage.setItem(LOM_SHORT_CACHE, JSON.stringify(transformScanToSignals(list)));
        localStorage.setItem(`${LOM_SHORT_CACHE}_ts`, Date.now().toString());
      } catch {}
    } catch (err) {
      setLomShortError(err?.message || 'Unknown error');
      try {
        const cached = localStorage.getItem(LOM_SHORT_CACHE);
        if (cached) { setLomShortData(JSON.parse(cached)); return; }
      } catch {}
      setLomShortData([]);
    } finally {
      setLomShortLoading(false);
    }
  };

  const fetchContractionData = async () => {
    setContractionLoading(true);
    setContractionError(null);
    try {
      const res = await fetch('https://70d52fe3b233.ngrok-free.app/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: "( {57960} ( ( daily upper bollinger band( 20 , 2 ) - daily lower bollinger band( 20 , 2 ) ) / daily close < 0.04 ) )",
        }),
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      setContractionData(transformScanToSignals(list));
      try {
        localStorage.setItem(CONTRACTION_CACHE, JSON.stringify(transformScanToSignals(list)));
        localStorage.setItem(`${CONTRACTION_CACHE}_ts`, Date.now().toString());
      } catch {}
    } catch (err) {
      setContractionError(err?.message || 'Unknown error');
      try {
        const cached = localStorage.getItem(CONTRACTION_CACHE);
        if (cached) { setContractionData(JSON.parse(cached)); return; }
      } catch {}
      setContractionData([]);
    } finally {
      setContractionLoading(false);
    }
  };

  const fetchDayHLData = async () => {
    setDayHLLoading(true);
    setDayHLError(null);
    try {
      const res = await fetch('https://70d52fe3b233.ngrok-free.app/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: "( {cash} ( 1 day ago low < 2 days ago low and [0] 5 minute cci( 34 ) > 100 and [ -1 ] 5 minute cci( 34 ) <= 100 and [0] 5 minute cci( 34 ) > [0] 30 minute cci( 34 ) and daily low < 1 day ago low ) )",
        }),
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      setDayHLData(transformScanToSignals(list));
      try {
        localStorage.setItem(DAYHL_CACHE, JSON.stringify(transformScanToSignals(list)));
        localStorage.setItem(`${DAYHL_CACHE}_ts`, Date.now().toString());
      } catch {}
    } catch (err) {
      setDayHLError(err?.message || 'Unknown error');
      try {
        const cached = localStorage.getItem(DAYHL_CACHE);
        if (cached) { setDayHLData(JSON.parse(cached)); return; }
      } catch {}
      setDayHLData([]);
    } finally {
      setDayHLLoading(false);
    }
  };

  useEffect(() => {
    // Load once on mount (mobile section renders this component with lg:hidden)
    try { const cached = localStorage.getItem(LOM_LONG_CACHE); if (cached) setLomLongData(JSON.parse(cached)); } catch {}
    try { const cached = localStorage.getItem(LOM_SHORT_CACHE); if (cached) setLomShortData(JSON.parse(cached)); } catch {}
    try { const cached = localStorage.getItem(CONTRACTION_CACHE); if (cached) setContractionData(JSON.parse(cached)); } catch {}
    try { const cached = localStorage.getItem(DAYHL_CACHE); if (cached) setDayHLData(JSON.parse(cached)); } catch {}
    fetchLomLongData();
    fetchLomShortData();
    fetchContractionData();
    fetchDayHLData();
  }, []);
  
  return (
    <div className='flex flex-col h-auto'>
    <Navigation />
      <div className=' w-full h-full flex flex-col'>
          <Topbar /> 
          <MobileTopbar />
           <div className='h-auto lg:hidden block lg:mt-0 mt-10'>
            <div className='flex lg:justify-center justify-start lg:items-center pl-5 pt-5 items-start'>
            {setPageSeo({ title: 'Insider Analysis | Marcus Finance', description: 'Decode insider buy/sell disclosures and momentum spikes.' })}
            <h2 className="mb-3 text-white font-semibold tracking-wide">Insider Analysis</h2>
            </div>
            <div className='px-5 space-y-5'>
              <MobileStrategyBox title={"5 MIN MOMENTUM SPIKE"} />
              <MobileStrategyBox title={"10 MIN MOMENTUM SPIKE"} />
            </div>
            {/* Mobile-only SignalSection matching MarketPulse layout */}
            <SignalSection
              title="LOM LONG TERM"
              items={lomLongData}
              isLoading={lomLongLoading}
              error={lomLongError}
              onRefresh={fetchLomLongData}
            />
            <SignalSection
              title="LOM SHORT TERM"
              items={lomShortData}
              isLoading={lomShortLoading}
              error={lomShortError}
              onRefresh={fetchLomShortData}
            />
            <SignalSection
              title="CONTRACTION BO"
              items={contractionData}
              isLoading={contractionLoading}
              error={contractionError}
              onRefresh={fetchContractionData}
            />
            <SignalSection
              title="DAY H/L REVERSAL"
              items={dayHLData}
              isLoading={dayHLLoading}
              error={dayHLError}
              onRefresh={fetchDayHLData}
            />
            

            
           </div>
           <div className='lg:block  hidden overflow-hidden'>
            <Marquee/>
            <div className='flex justify-start item-center px-5 pt-5'>
            {setPageSeo({ title: 'Insider Analysis | Marcus Finance', description: 'Decode insider buy/sell disclosures and momentum spikes.' })}
            <h2 className="mb-3 text-white font-semibold tracking-wide">Insider Analysis</h2>
            </div>
            
            {/* Grid Layout for Sector Analysis Boxes */}
            <div className='px-5'>
                <InsiderStrategyBox title={"5 MIN MOMENTUM SPIKE"} />
                <InsiderStrategyBox title={"10 MIN MOMENTUM SPIKE"} />
            </div>
            
            <div className='grid grid-cols-2 px-5 gap-[20px] mt-5'>
              <LOMLongterm/>
              <LOMShortterm/>
            </div> 
            <div className='grid grid-cols-2 px-5 gap-[20px] mt-5'>
             <LOMContractionBO />
             <LOMDayHLReversal />
            </div> 
            
            
          </div>
      </div>
    </div>
  );
};

export default InsiderStrategy; 