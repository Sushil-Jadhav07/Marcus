import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../components/layout/Navigation';
import Topbar from '../components/layout/Topbar';
import MobileTopbar from '../components/layout/MobileTopbar';
import SignalSection from '../components/MarketPulse/SignalSection';
import BreakoutBeacon from '../components/common/BreakoutBeacon';
import Marquee from '../components/MarketPulse/Marquee';
import Nifty50Chart from '../components/charts/Nifty50Chart';


const MarketPulse = () => {
 
  return (
  //   <div className='flex flex-col h-full'>
  //   <Navigation />
  //       <div className='w-full h-full flex flex-col'>
  //           <Topbar /> 
  //           <MobileTopbar />
  //             <div className="h-full bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% ">
  //             <div className='flex lg:justify-center justify-start lg:items-center pl-5 pt-5 items-start'>
  //               <h1 className='text-white lg:text-4xl text-lg'>Market Pulse</h1>
  //             </div>

  //             <SignalSection
  //               title="LOM Short Term"
  //               items={[
  //                 { symbol: 'BOSCHILTD', timeLabel: '09:30', signalPercent: '6.44%', movePercent: '6.51%', direction: 'up' },
  //                 { symbol: 'RVNL', timeLabel: '15:05', signalPercent: '-5.01%', movePercent: '-5.01%', direction: 'down' },
  //                 { symbol: 'BOSCH', timeLabel: '09:30', signalPercent: '6.44%', movePercent: '6.51%', direction: 'up' },
  //                 { symbol: 'TCS', timeLabel: '10:15', signalPercent: '-2.12%', movePercent: '-1.80%', direction: 'down' },
  //               ]}
  //             />
  //             </div>
  //         </div>
  // </div>
  <div className='flex flex-col bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% '>
  <Navigation />
    <div className='w-full h-full flex flex-col'>
        <Topbar /> 
        <MobileTopbar />
          
          <div className=' overflow-hidden'>
            <Marquee/>
            <div className='flex justify-start item-center px-5 pt-5'>
            <h2 className="mb-3 text-white font-semibold tracking-wide">Market Pulse</h2>
            </div>
            <div className='px-5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
              {/* <div className='col-span-1 lg:col-span-2'>
                <Nifty50Chart height={360} />
              </div> */}
              <BreakoutBeacon 
                
                title="Breakout Beacon"
              />
              <BreakoutBeacon 
                
                title="Intraday Boost"
                moodOptions={['Bullish', 'Bearish', 'Neutral']}
                defaultMood="Bullish"
              />
              <div className=''>
              <BreakoutBeacon 
                
                title="DAY H/L REVERSAL"
                moodOptions={['Bullish', 'Bearish', 'Neutral']}
                defaultMood="Neutral"
              />
            </div>
            
            <div className=''>
              <BreakoutBeacon 
                title="MOMENTUM SIGNALS"
                moodOptions={['Bullish', 'Bearish', 'Neutral']}
                defaultMood="Bullish"
              />
            </div>
            </div>
            
            
            
          </div>
    </div>
  </div>
  );
};

export default MarketPulse; 
