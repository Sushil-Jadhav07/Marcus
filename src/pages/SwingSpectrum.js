
import React from 'react';
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

const SwingSpectrum = () => {
  return (
    <div className='flex flex-col h-full'>
  <Navigation />
    <div className='w-full h-full flex flex-col'>
        <Topbar /> 
        <MobileTopbar />
          <div className=" h-[120vh] lg:hidden block bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% ">
          <div className='flex lg:justify-center justify-start lg:items-center pl-5 pt-5 items-start'>
          <h2 className="mb-3 text-white font-semibold tracking-wide">Swing Spectrum</h2>
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
          <div className='lg:block hidden overflow-hidden'>
            <Marquee/>
            <div className='flex justify-start item-center px-5 pt-5'>
            <h2 className="mb-3 text-white font-semibold tracking-wide">Swing Spectrum</h2>
            </div>
            <div className='px-5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
              <LOMSwingScanOne title="10 DAY BO" />
              <LOMSwingScanTwo title="50 DAY BO" />
              <LOMSwingThree title='CHANNEL BO'/>
              <LOMSwingFour title='NR7'/>
            </div>
            <div className='px-5'>
            <WeeklyWatch title={"WEEKLY WATCH"}/>
            </div>
          </div>
    </div>
  </div>
  );
};

export default SwingSpectrum; 