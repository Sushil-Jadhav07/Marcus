import React, { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import Topbar from '../components/layout/Topbar';
import MobileTopbar from '../components/layout/MobileTopbar';
import Navigation from '../components/layout/Navigation';
import StrategyBoard from '../components/Insider/StrategyBoard';
import Marquee from '../components/MarketPulse/Marquee';
import TradingViewWidget from '../components/common/TradingViewHeatmap';
import EnergySector from '../components/Sectors/EnergySector';
import ITSectors from '../components/Sectors/ITSectors';
import SignalSection from '../components/MarketPulse/SignalSection';
import AutoSector from '../components/common/AutoSector';
import RealitySector from '../components/common/RealitySector';
import Nifity50 from '../components/common/Nifity50';
import FMCG from '../components/common/FMCG';


const SectorScope = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mobile SignalSections data for ENERGY SECTOR and IT Sector
  const [energyData, setEnergyData] = useState([]);
  const ENERGY_CACHE = 'cache_SECTOR_energy';
  const [energyLoading, setEnergyLoading] = useState(false);
  const [energyError, setEnergyError] = useState(null);
  const [itData, setItData] = useState([]);
  const IT_CACHE = 'cache_SECTOR_it';
  const [itLoading, setItLoading] = useState(false);
  const [itError, setItError] = useState(null);
  const [pharmaData, setPharmaData] = useState([]);
  const PHARMA_CACHE = 'cache_SECTOR_pharma';
  const [pharmaLoading, setPharmaLoading] = useState(false);
  const [pharmaError, setPharmaError] = useState(null);
  const [autoData, setAutoData] = useState([]);
  const AUTO_CACHE = 'cache_SECTOR_auto';
  const [autoLoading, setAutoLoading] = useState(false);
  const [autoError, setAutoError] = useState(null);
  const [fmcgData, setFmcgData] = useState([]);
  const FMCG_CACHE = 'cache_SECTOR_fmcg';
  const [fmcgLoading, setFmcgLoading] = useState(false);
  const [fmcgError, setFmcgError] = useState(null);
  const [realtyData, setRealtyData] = useState([]);
  const REALTY_CACHE = 'cache_SECTOR_realty';
  const [realtyLoading, setRealtyLoading] = useState(false);
  const [realtyError, setRealtyError] = useState(null);
  const [nifty50Data, setNifty50Data] = useState([]);
  const NIFTY50_CACHE = 'cache_SECTOR_nifty50';
  const [nifty50Loading, setNifty50Loading] = useState(false);
  const [nifty50Error, setNifty50Error] = useState(null);
  const [financeData, setFinanceData] = useState([]);
  const FINANCE_CACHE = 'cache_SECTOR_finance';
  const [financeLoading, setFinanceLoading] = useState(false);
  const [financeError, setFinanceError] = useState(null);

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

  const fetchEnergyData = async () => {
    setEnergyLoading(true);
    setEnergyError(null);
    try {
      const res = await fetch('http://35.208.40.158:8000/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: "( {cash} ( abs( [0] 5 minute sma( [0] 5 minute close , 10 ) - [0] 5 minute sma( [0] 5 minute close , 6 ) ) <= [0] 5 minute sma( [0] 5 minute close , 10 ) * 0.005 and [0] 5 minute close > [0] 5 minute open and [0] 5 minute sma( [0] 5 minute close , 6 ) >= [0] 5 minute sma( [0] 5 minute close , 10 ) and [0] 5 minute close >= [0] 5 minute sma( [0] 5 minute close , 6 ) and [0] 5 minute rsi( 14 ) >= 70 and abs( [0] 5 minute close - [0] 5 minute open ) > 2 * [-1] 5 minute sma( abs( [0] 5 minute close - [0] 5 minute open ) , 75 ) ) ) ",
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      setEnergyData(transformScanToSignals(list));
      try { localStorage.setItem(ENERGY_CACHE, JSON.stringify(transformScanToSignals(list))); localStorage.setItem(`${ENERGY_CACHE}_ts`, Date.now().toString()); } catch {}
    } catch (err) {
      setEnergyError(err?.message || 'Unknown error');
      try { const cached = localStorage.getItem(ENERGY_CACHE); if (cached) { setEnergyData(JSON.parse(cached)); return; } } catch {}
      setEnergyData([]);
    } finally {
      setEnergyLoading(false);
    }
  };

  const fetchItData = async () => {
    setItLoading(true);
    setItError(null);
    try {
      const res = await fetch('http://35.208.40.158:8000/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: "( {cash} ( sector = 'i.t' ) )",
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      setItData(transformScanToSignals(list));
      try { localStorage.setItem(IT_CACHE, JSON.stringify(transformScanToSignals(list))); localStorage.setItem(`${IT_CACHE}_ts`, Date.now().toString()); } catch {}
    } catch (err) {
      setItError(err?.message || 'Unknown error');
      try { const cached = localStorage.getItem(IT_CACHE); if (cached) { setItData(JSON.parse(cached)); return; } } catch {}
      setItData([]);
    } finally {
      setItLoading(false);
    }
  };

  const pharmaSymbols = [
    { exchange: 'NSE', tradingSymbol: 'SUNPHARMA-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'DRREDDY-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'CIPLA-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'DIVISLAB-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'LUPIN-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'AUROPHARMA-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'BIOCON-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'CADILAHC-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'GLENMARK-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'TORNTPHARM-EQ', symbolToken: '11536' },
  ];

  const fetchPharmaData = async () => {
    setPharmaLoading(true);
    setPharmaError(null);
    try {
      const res = await fetch('https://angelbackend-production.up.railway.app/get-ohlc-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbols: pharmaSymbols }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      const fetched = json?.data?.fetched || [];
      const mapped = fetched.map((it, idx) => {
        const symbol = (it?.tradingSymbol || it?.symbol || `SYM${idx}`).replace(/-EQ$/i, '');
        const open = Number(it?.open) || 0;
        const close = Number(it?.close) || 0;
        const perChg = open ? ((close - open) / open) * 100 : 0;
        const pctText = `${perChg >= 0 ? '+' : ''}${perChg.toFixed(2)}%`;
        const ltpNum = Number(it?.ltp ?? it?.close ?? 0);
        return {
          symbol: String(symbol).substring(0, 20),
          timeLabel: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
          signalPercent: pctText,
          ltp: ltpNum,
          movePercent: pctText,
          direction: perChg >= 0 ? 'up' : 'down',
        };
      });
      setPharmaData(mapped);
      try { localStorage.setItem(PHARMA_CACHE, JSON.stringify(mapped)); localStorage.setItem(`${PHARMA_CACHE}_ts`, Date.now().toString()); } catch {}
    } catch (err) {
      setPharmaError(err?.message || 'Unknown error');
      try { const cached = localStorage.getItem(PHARMA_CACHE); if (cached) { setPharmaData(JSON.parse(cached)); return; } } catch {}
      setPharmaData([]);
    } finally {
      setPharmaLoading(false);
    }
  };

  // Auto sector symbols (copied from AutoSectorBeacon.jsx)
  const autoSymbols = [
    { exchange: 'NSE', tradingSymbol: 'MARUTI-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'TATAMOTORS-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'M&M-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'BAJAJ-AUTO-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'HEROMOTOCO-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'EICHERMOT-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'ASHOKLEY-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'TVSMOTORS-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'BOSCHLTD-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'EXIDEIND-EQ', symbolToken: '11536' },
  ];

  const fetchAutoData = async () => {
    setAutoLoading(true);
    setAutoError(null);
    try {
      const res = await fetch('http://35.208.40.158:8000/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: "( {cash} ( sector = 'auto' ) ) ",
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      const mapped = transformScanToSignals(list);
      setAutoData(mapped);
      try { localStorage.setItem(AUTO_CACHE, JSON.stringify(mapped)); localStorage.setItem(`${AUTO_CACHE}_ts`, Date.now().toString()); } catch {}
    } catch (err) {
      setAutoError(err?.message || 'Unknown error');
      try { const cached = localStorage.getItem(AUTO_CACHE); if (cached) { setAutoData(JSON.parse(cached)); return; } } catch {}
      setAutoData([]);
    } finally {
      setAutoLoading(false);
    }
  };

  // FMCG sector symbols (copied from FMCGSectorBeacon.jsx)
  const fmcgSymbols = [
    { exchange: 'NSE', tradingSymbol: 'HINDUNILVR-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'ITC-EQ', symbolToken: '4244' },
    { exchange: 'NSE', tradingSymbol: 'NESTLEIND-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'BRITANNIA-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'DABUR-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'GODREJCP-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'MARICO-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'COLPAL-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'UBL-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'TITAN-EQ', symbolToken: '11536' },
  ];

  const fetchFmcgData = async () => {
    setFmcgLoading(true);
    setFmcgError(null);
    try {
      const res = await fetch('http://35.208.40.158:8000/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: "( {cash} ( ( {cash} ( daily close < weekly max( 52 , weekly high ) and daily close > weekly max( 52 , weekly high ) * .98 ) ) ) )  ",
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      const mapped = transformScanToSignals(list);
      setFmcgData(mapped);
      try { localStorage.setItem(FMCG_CACHE, JSON.stringify(mapped)); localStorage.setItem(`${FMCG_CACHE}_ts`, Date.now().toString()); } catch {}
    } catch (err) {
      setFmcgError(err?.message || 'Unknown error');
      try { const cached = localStorage.getItem(FMCG_CACHE); if (cached) { setFmcgData(JSON.parse(cached)); return; } } catch {}
      setFmcgData([]);
    } finally {
      setFmcgLoading(false);
    }
  };

  const fetchRealtyData = async () => {
    setRealtyLoading(true);
    setRealtyError(null);
    try {
      const res = await fetch('http://35.208.40.158:8000/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: "( {33489} ( sector = 'realty' ) ) ",
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      const mapped = transformScanToSignals(list);
      setRealtyData(mapped);
      try { localStorage.setItem(REALTY_CACHE, JSON.stringify(mapped)); localStorage.setItem(`${REALTY_CACHE}_ts`, Date.now().toString()); } catch {}
    } catch (err) {
      setRealtyError(err?.message || 'Unknown error');
      try { const cached = localStorage.getItem(REALTY_CACHE); if (cached) { setRealtyData(JSON.parse(cached)); return; } } catch {}
      setRealtyData([]);
    } finally {
      setRealtyLoading(false);
    }
  };

  const fetchNifty50Data = async () => {
    setNifty50Loading(true);
    setNifty50Error(null);
    try {
      const res = await fetch('http://35.208.40.158:8000/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_clause: "( {33492} ( daily close > 50 ) ) ",
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      const mapped = transformScanToSignals(list);
      setNifty50Data(mapped);
      try { localStorage.setItem(NIFTY50_CACHE, JSON.stringify(mapped)); localStorage.setItem(`${NIFTY50_CACHE}_ts`, Date.now().toString()); } catch {}
    } catch (err) {
      setNifty50Error(err?.message || 'Unknown error');
      try { const cached = localStorage.getItem(NIFTY50_CACHE); if (cached) { setNifty50Data(JSON.parse(cached)); return; } } catch {}
      setNifty50Data([]);
    } finally {
      setNifty50Loading(false);
    }
  };

  // Finance sector symbols (copied from BreakoutBeaconLive.jsx)
  const financeSymbols = [
    { exchange: 'NSE', tradingSymbol: 'HDFCBANK-EQ', symbolToken: '1333' },
    { exchange: 'NSE', tradingSymbol: 'ICICIBANK-EQ', symbolToken: '4963' },
    { exchange: 'NSE', tradingSymbol: 'SBIN-EQ', symbolToken: '3045' },
    { exchange: 'NSE', tradingSymbol: 'KOTAKBANK-EQ', symbolToken: '4920' },
    { exchange: 'NSE', tradingSymbol: 'AXISBANK-EQ', symbolToken: '5900' },
    { exchange: 'NSE', tradingSymbol: 'INDUSINDBK-EQ', symbolToken: '5258' },
    { exchange: 'NSE', tradingSymbol: 'BANKBARODA-EQ', symbolToken: '532' },
    { exchange: 'NSE', tradingSymbol: 'PNB-EQ', symbolToken: '11915' },
    { exchange: 'NSE', tradingSymbol: 'IDFCFIRSTB-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'FEDERALBNK-EQ', symbolToken: '11915' },
    { exchange: 'NSE', tradingSymbol: 'HDFCLIFE-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'ICICIGI-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'BAJFINANCE-EQ', symbolToken: '81153' },
    { exchange: 'NSE', tradingSymbol: 'BAJAJFINSV-EQ', symbolToken: '11536' },
    { exchange: 'NSE', tradingSymbol: 'SBILIFE-EQ', symbolToken: '11536' },
  ];

  const fetchFinanceData = async () => {
    setFinanceLoading(true);
    setFinanceError(null);
    try {
      const res = await fetch('https://angelbackend-production.up.railway.app/get-ohlc-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbols: financeSymbols }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const json = await res.json();
      const fetched = json?.data?.fetched || [];
      const mapped = fetched.map((it, idx) => {
        const symbol = (it?.tradingSymbol || it?.symbol || `SYM${idx}`).replace(/-EQ$/i, '');
        const open = Number(it?.open) || 0;
        const close = Number(it?.close) || 0;
        const perChg = open ? ((close - open) / open) * 100 : 0;
        const pctText = `${perChg >= 0 ? '+' : ''}${perChg.toFixed(2)}%`;
        const ltpNum = Number(it?.ltp ?? it?.close ?? 0);
        return {
          symbol: String(symbol).substring(0, 20),
          timeLabel: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
          signalPercent: pctText,
          ltp: ltpNum,
          movePercent: pctText,
          direction: perChg >= 0 ? 'up' : 'down',
        };
      });
      setFinanceData(mapped);
      try { localStorage.setItem(FINANCE_CACHE, JSON.stringify(mapped)); localStorage.setItem(`${FINANCE_CACHE}_ts`, Date.now().toString()); } catch {}
    } catch (err) {
      setFinanceError(err?.message || 'Unknown error');
      try { const cached = localStorage.getItem(FINANCE_CACHE); if (cached) { setFinanceData(JSON.parse(cached)); return; } } catch {}
      setFinanceData([]);
    } finally {
      setFinanceLoading(false);
    }
  };

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    // Trigger refresh for all sector components
    // Each component will handle its own refresh
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  useEffect(() => {
    // Load mobile SignalSections on mount
    try { const c = localStorage.getItem(ENERGY_CACHE); if (c) setEnergyData(JSON.parse(c)); } catch {}
    try { const c = localStorage.getItem(IT_CACHE); if (c) setItData(JSON.parse(c)); } catch {}
    try { const c = localStorage.getItem(PHARMA_CACHE); if (c) setPharmaData(JSON.parse(c)); } catch {}
    try { const c = localStorage.getItem(AUTO_CACHE); if (c) setAutoData(JSON.parse(c)); } catch {}
    try { const c = localStorage.getItem(FMCG_CACHE); if (c) setFmcgData(JSON.parse(c)); } catch {}
    try { const c = localStorage.getItem(REALTY_CACHE); if (c) setRealtyData(JSON.parse(c)); } catch {}
    try { const c = localStorage.getItem(NIFTY50_CACHE); if (c) setNifty50Data(JSON.parse(c)); } catch {}
    try { const c = localStorage.getItem(FINANCE_CACHE); if (c) setFinanceData(JSON.parse(c)); } catch {}
    fetchEnergyData();
    fetchItData();
    fetchPharmaData();
    fetchAutoData();
    fetchFmcgData();
    fetchRealtyData();
    fetchNifty50Data();
    fetchFinanceData();
  }, []);

  return (
    <div className='flex flex-col h-full'>
    <div className='w-full h-full flex flex-col'>
        <Topbar /> 
        <MobileTopbar />
        <Navigation />
          <div className="h-auto lg:hidden block ">
          <div className='flex lg:justify-center justify-start lg:items-center pl-5 pt-5 items-start'>
          <h2 className="mb-3 text-white font-semibold tracking-wide">Sector Scope</h2>
          </div>
          <div className='px-5 mt-4'>
            <div className='bg-white/10 backdrop-blur rounded-xl border border-white/10 overflow-hidden p-4'>
              <div className='h-[420px]'>
                <TradingViewWidget />
              </div>
            </div>
          </div>
          {/* Mobile-only SignalSections */}
          <SignalSection
            title="ENERGY SECTOR"
            items={energyData}
            isLoading={energyLoading}
            error={energyError}
            onRefresh={fetchEnergyData}
          />
          <SignalSection
            title="IT SECTOR"
            items={itData}
            isLoading={itLoading}
            error={itError}
            onRefresh={fetchItData}
          />
         
          
         
          <SignalSection
            title="REALTY SECTOR"
            items={realtyData}
            isLoading={realtyLoading}
            error={realtyError}
            onRefresh={fetchRealtyData}
          />
          <SignalSection
            title="AUTO SECTOR"
            items={autoData}
            isLoading={autoLoading}
            error={autoError}
            onRefresh={fetchAutoData}
          />
           <SignalSection
            title="FMCG SECTOR"
            items={fmcgData}
            isLoading={fmcgLoading}
            error={fmcgError}
            onRefresh={fetchFmcgData}
          />
          <SignalSection
            title="NIFTY 50"
            items={nifty50Data}
            isLoading={nifty50Loading}
            error={nifty50Error}
            onRefresh={fetchNifty50Data}
          />
          
          
          <div className='px-5 mt-4'>
            {/* <div className='bg-white/10 backdrop-blur rounded-xl border border-white/10 overflow-hidden p-4'>
              <div className='h-[260px]'>
                <SectorQuotes />
              </div>
            </div> */}
          </div>
         
          </div>
          <div className='lg:block hidden overflow-hidden'>
            <Marquee/>
             {/* Sector Heatmap - Real Estate */}
             <div className='px-5 mt-5'>
               <div className='bg-white/10 backdrop-blur rounded-xl border border-white/10 overflow-hidden p-6'>
                   <div className='h-[470px]'>
                     <TradingViewWidget />
                   </div>
               </div>

             </div>
             
             <div className='px-5 mt-5'>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                 {/* <EnergySectorBeacon /> */}
                 <EnergySector />
                 <ITSectors />
               </div>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                 <RealitySector />
                 <AutoSector />
               </div>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                 <Nifity50 />
                 <FMCG/>
                 {/* <BreakoutBeaconLive /> */}
               </div>
               
             </div>
            
          
            
            
          </div>    
          
    </div>
    </div>
  );
};

export default SectorScope; 