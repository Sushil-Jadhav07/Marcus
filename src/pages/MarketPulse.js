import React from 'react';
import Navigation from '../components/layout/Navigation';
import Topbar from '../components/layout/Topbar';
import MobileTopbar from '../components/layout/MobileTopbar';
import SignalCard from '../components/MarketPulse/SignalCard';
import SignalSection from '../components/MarketPulse/SignalSection';

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
  <div className='flex flex-col h-full'>
  <Navigation />
    <div className='w-full h-full flex flex-col'>
        <Topbar /> 
        <MobileTopbar />
          <div className=" h-[120vh] bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% ">
          <div className='flex lg:justify-center justify-start lg:items-center pl-5 pt-5 items-start'>
            <h1 className='text-white lg:text-4xl text-lg'>Market Pulse</h1>
          </div>
          <SignalSection
              title="LOM Short Term"
              items={[
                { symbol: 'BOSCHILTD', timeLabel: '09:30', signalPercent: '6.44%', movePercent: '6.51%', direction: 'up' },
                { symbol: 'RVNL', timeLabel: '15:05', signalPercent: '-5.01%', movePercent: '-5.01%', direction: 'down' },
                { symbol: 'BOSCH', timeLabel: '09:30', signalPercent: '6.44%', movePercent: '6.51%', direction: 'up' },
                { symbol: 'TCS', timeLabel: '10:15', signalPercent: '-2.12%', movePercent: '-1.80%', direction: 'down' },
              ]}
            />
              <SignalSection
              title="Contraction BO"
              items={[
                { symbol: 'BOSCHILTD', timeLabel: '09:30', signalPercent: '6.44%', movePercent: '6.51%', direction: 'up' },
                { symbol: 'RVNL', timeLabel: '15:05', signalPercent: '-5.01%', movePercent: '-5.01%', direction: 'down' },
                { symbol: 'BOSCH', timeLabel: '09:30', signalPercent: '6.44%', movePercent: '6.51%', direction: 'up' },
                { symbol: 'TCS', timeLabel: '10:15', signalPercent: '-2.12%', movePercent: '-1.80%', direction: 'down' },
              ]}
            />
            <div className='dark:bg-black bg-white'>
            <SignalSection
              title="Day H/L Reversal"
              items={[
                { symbol: 'BOSCHILTD', timeLabel: '09:30', signalPercent: '6.44%', movePercent: '6.51%', direction: 'up' },
                { symbol: 'RVNL', timeLabel: '15:05', signalPercent: '-5.01%', movePercent: '-5.01%', direction: 'down' },
                { symbol: 'BOSCH', timeLabel: '09:30', signalPercent: '6.44%', movePercent: '6.51%', direction: 'up' },
                { symbol: 'TCS', timeLabel: '10:15', signalPercent: '-2.12%', movePercent: '-1.80%', direction: 'down' },
              ]}
            />
            </div>
          </div>
    </div>
  </div>
  );
};

export default MarketPulse; 