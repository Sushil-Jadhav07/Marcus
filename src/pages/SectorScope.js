import React, { useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import Topbar from '../components/layout/Topbar';
import MobileTopbar from '../components/layout/MobileTopbar';
import Navigation from '../components/layout/Navigation';
import StrategyBoard from '../components/Insider/StrategyBoard';
import Marquee from '../components/MarketPulse/Marquee';
import MomentumHeatmap from '../components/MarketPulse/MomentumHeatmap';
import TradingViewWidget from '../components/common/TradingViewHeatmap';
import SectorQuotes from '../components/common/SectorQuotes';
import SectorSingleListTV from '../components/common/SectorSingleListTV';
import BreakoutBeaconLive from '../components/common/BreakoutBeaconLive';
import EnergySectorBeacon from '../components/common/EnergySectorBeacon';
import ITSectorBeacon from '../components/common/ITSectorBeacon';
import PharmaSectorBeacon from '../components/common/PharmaSectorBeacon';
import AutoSectorBeacon from '../components/common/AutoSectorBeacon';
import FMCGSectorBeacon from '../components/common/FMCGSectorBeacon';


const SectorScope = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    // Trigger refresh for all sector components
    // Each component will handle its own refresh
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className='flex flex-col h-full'>
    <div className='w-full h-full flex flex-col'>
        <Topbar /> 
        <MobileTopbar />
        <Navigation />
          <div className=" h-[100vh] lg:hidden block bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% ">
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
            {/* <div className='flex justify-between items-center px-5 pt-5'>
              <h2 className="mb-3 text-white font-semibold tracking-wide">Sector Scope</h2>
              <button
                onClick={handleRefreshAll}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-sm">Refresh All</span>
              </button>
            </div> */}
            
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
                 <EnergySectorBeacon />
                 <ITSectorBeacon />
               </div>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                 <PharmaSectorBeacon />
                 <AutoSectorBeacon />
               </div>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                 <FMCGSectorBeacon />
                 <BreakoutBeaconLive />
               </div>
               
             </div>
            
          
            
            
          </div>    
          
    </div>
    </div>
  );
};

export default SectorScope; 