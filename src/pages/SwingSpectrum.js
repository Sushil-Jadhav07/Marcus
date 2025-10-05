
import React, { useEffect, useState } from 'react';
import MobileTopbar from '../components/layout/MobileTopbar';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';
import SignalSection from '../components/MarketPulse/SignalSection';
import Marquee from '../components/MarketPulse/Marquee';
import BreakoutBeacon from '../components/common/BreakoutBeacon';
import LOMSwingScanOne from '../components/common/LOMSwingScanOne';
import LOMSwingScanTwo from '../components/common/LOMSwingScanTwo';
import LOMSwingThree from '../components/common/LOMSwingThree';
import LOMSwingFour from '../components/common/LOMSwingFour';
import WeeklyWatch from '../components/common/WeeklyWatch';
import WeeklyWatchMobile from '../components/common/WeeklyWatchMobile';

const SwingSpectrum = () => {
  // Mobile SignalSection state
  const [bo10Data, setBo10Data] = useState([]);
  const BO10_CACHE = 'cache_SWING_bo10';
  const [bo10Loading, setBo10Loading] = useState(false);
  const [bo10Error, setBo10Error] = useState(null);
  const [bo50Data, setBo50Data] = useState([]);
  const BO50_CACHE = 'cache_SWING_bo50';
  const [bo50Loading, setBo50Loading] = useState(false);
  const [bo50Error, setBo50Error] = useState(null);
  const [channelData, setChannelData] = useState([]);
  const CHANNEL_CACHE = 'cache_SWING_channel';
  const [channelLoading, setChannelLoading] = useState(false);
  const [channelError, setChannelError] = useState(null);
  const [nr7Data, setNr7Data] = useState([]);
  const NR7_CACHE = 'cache_SWING_nr7';
  const [nr7Loading, setNr7Loading] = useState(false);
  const [nr7Error, setNr7Error] = useState(null);

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

  const postScan = async (scan_clause, setters) => {
    const { setData, setLoading, setError } = setters;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://angelbackend-production.up.railway.app/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scan_clause }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      setData(transformScanToSignals(list));
      // Persist by heuristic using the provided setter
      try {
        if (setData === setBo10Data) localStorage.setItem(BO10_CACHE, JSON.stringify(transformScanToSignals(list)));
        else if (setData === setBo50Data) localStorage.setItem(BO50_CACHE, JSON.stringify(transformScanToSignals(list)));
        else if (setData === setChannelData) localStorage.setItem(CHANNEL_CACHE, JSON.stringify(transformScanToSignals(list)));
        else if (setData === setNr7Data) localStorage.setItem(NR7_CACHE, JSON.stringify(transformScanToSignals(list)));
      } catch {}
    } catch (err) {
      setError(err?.message || 'Unknown error');
      try {
        if (setData === setBo10Data) {
          const c = localStorage.getItem(BO10_CACHE); if (c) { setData(JSON.parse(c)); return; }
        } else if (setData === setBo50Data) {
          const c = localStorage.getItem(BO50_CACHE); if (c) { setData(JSON.parse(c)); return; }
        } else if (setData === setChannelData) {
          const c = localStorage.getItem(CHANNEL_CACHE); if (c) { setData(JSON.parse(c)); return; }
        } else if (setData === setNr7Data) {
          const c = localStorage.getItem(NR7_CACHE); if (c) { setData(JSON.parse(c)); return; }
        }
      } catch {}
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBo10 = () => postScan(
    "( {cash} ( 1 day ago max( 10 , daily high ) < daily close and 1 day ago max( 10 , daily high ) > 1 day ago high and 1 day ago close < daily open ) )",
    { setData: setBo10Data, setLoading: setBo10Loading, setError: setBo10Error }
  );

  const fetchBo50 = () => postScan(
    "( {cash} ( 1 day ago low <= daily min( 50 , daily low ) and daily high < 1 day ago high and daily close < 1 day ago close and daily close < daily open and daily volume < 1 day ago volume * 1.2 ) )",
    { setData: setBo50Data, setLoading: setBo50Loading, setError: setBo50Error }
  );

  const fetchChannel = () => postScan(
    "( {57960} ( daily max( 20 , daily high ) > 1 day ago max( 20 , 1 day ago high ) and daily max( 50 , daily high ) > 1 day ago max( 50 , 1 day ago high ) and daily max( 90 , daily high ) > 1 day ago max( 90 , 1 day ago high ) and daily max( 144 , daily high ) > 1 day ago max( 144 , 1 day ago high ) ) )",
    { setData: setChannelData, setLoading: setChannelLoading, setError: setChannelError }
  );

  const fetchNr7 = () => postScan(
    "( {33489} ( daily high - daily low < 1 day ago high - 1 day ago low and daily high - daily low < 2 days ago high - 2 days ago low and daily high - daily low < 3 days ago high - 3 days ago low and daily high - daily low < 4 days ago high - 4 days ago low and daily high - daily low < 5 days ago high - 5 days ago low and daily high - daily low < 6 days ago high - 6 days ago low ) )",
    { setData: setNr7Data, setLoading: setNr7Loading, setError: setNr7Error }
  );

  useEffect(() => {
    try { const c = localStorage.getItem(BO10_CACHE); if (c) setBo10Data(JSON.parse(c)); } catch {}
    try { const c = localStorage.getItem(BO50_CACHE); if (c) setBo50Data(JSON.parse(c)); } catch {}
    try { const c = localStorage.getItem(CHANNEL_CACHE); if (c) setChannelData(JSON.parse(c)); } catch {}
    try { const c = localStorage.getItem(NR7_CACHE); if (c) setNr7Data(JSON.parse(c)); } catch {}
    fetchBo10();
    fetchBo50();
    fetchChannel();
    fetchNr7();
  }, []);

  return (
    <div className='flex flex-col h-full'>
  <Navigation />
    <div className='w-full h-full flex flex-col'>
        <Topbar /> 
        <MobileTopbar />
          <div className=" h-auto lg:hidden block">
          <div className='flex lg:justify-center justify-start lg:items-center pl-5 pt-5 items-start'>
          <h2 className="mb-3 text-white font-semibold tracking-wide">Swing Spectrum</h2>
          </div>
          <SignalSection
            title="10 DAY BO"
            items={bo10Data}
            isLoading={bo10Loading}
            error={bo10Error}
            onRefresh={fetchBo10}
          />
          <SignalSection
            title="50 DAY BO"
            items={bo50Data}
            isLoading={bo50Loading}
            error={bo50Error}
            onRefresh={fetchBo50}
          />
          <SignalSection
            title="CHANNEL BO"
            items={channelData}
            isLoading={channelLoading}
            error={channelError}
            onRefresh={fetchChannel}
          />
          <SignalSection
            title="NR7"
            items={nr7Data}
            isLoading={nr7Loading}
            error={nr7Error}
            onRefresh={fetchNr7}
          />

          <div className='px-5'>
          <WeeklyWatchMobile title={"WEEKLY WATCH"}/>
          </div>
        
            </div>
          </div>
          <div className='lg:block hidden overflow-hidden'>
            <Marquee/>
            <div className='flex justify-start item-center px-5 pt-5'>
            <h2 className="mb-3 text-white font-semibold tracking-wide">Swing Spectrum</h2>
            </div>
            <div className='px-5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
              <LOMSwingScanOne title="10 DAY BO" />
              <LOMSwingScanOne title="50 DAY BO" />
              <LOMSwingThree title='CHANNEL BO'/>
              <LOMSwingFour title='NR7'/>
            </div>
            <div className='px-5'>
            <WeeklyWatch title={"WEEKLY WATCH"}/>
            </div>
          </div>
  </div>
  );
};

export default SwingSpectrum; 