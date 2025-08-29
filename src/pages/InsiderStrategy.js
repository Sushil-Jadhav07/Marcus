import React from 'react';
import MobileTopbar from '../components/layout/MobileTopbar';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';
import StrategyBoard from '../components/Insider/StrategyBoard';



const InsiderStrategy = () => {
  const data = {
    name: 'market',
    children: [
      { name: 'REALTY', children: [{ name: 'LODHA', value: 8, change: 3.2 }, { name: 'OBEROALTY', value: 7, change: 2.4 }, { name: 'PRESTIGE', value: 6, change: 1.8 }, { name: 'NCC', value: 9, change: 2.9 }, { name: 'GODREJPROP', value: 6, change: 0.8 }, { name: 'NBCC', value: 5, change: -4.2 }] },
      { name: 'PHARMA', children: [{ name: 'SUNPHARMA', value: 7, change: 2.1 }, { name: 'DRREDDY', value: 6, change: 1.6 }, { name: 'CIPLA', value: 5, change: 1.2 }, { name: 'DIVISLAB', value: 8, change: 2.5 }, { name: 'LUPIN', value: 6, change: 0.9 }, { name: 'BIOCON', value: 5, change: -3.8 }] }
    ]
  };
  return (
    <div className='flex flex-col h-full'>
    <Navigation />
      <div className='w-full h-full flex flex-col'>
          <Topbar /> 
          <MobileTopbar />
           <div className='h-[120vh] bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% '>
            <div className='flex lg:justify-center justify-start lg:items-center pl-5 pt-5 items-start'>
            <h2 className="mb-3 text-white font-semibold tracking-wide">Insider Strategy</h2>
            </div>
            <StrategyBoard
              title="5 MIN MOMENTUM SPIKE"
              height={500}
              rowHeight={56}
              items={[
                { name: 'ASTRAL', shape: 'big', change: -3.1 },
                { name: 'TORNTPOWER', shape: 'tall', change: -5.0 },
                { name: 'TATACOMM', shape: 'tall', change: -1.5 },
                { name: 'COFORGE', shape: 'tall', change: 2.3 },
                { name: 'HAVELLS', shape: 'tall', change: 1.8 },
                { name: 'GMRAIRPORT', shape: 'tall', change: 2.2 },
                { name: 'PFC', shape: 'square', change: -1.1 },
                { name: 'ICICIBANK', shape: 'square', change: 1.2 },
                { name: 'UNITDSPR', shape: 'tall', change: 1.7 },
                { name: 'KALYANKJIL', shape: 'tall', change: 2.4 },
                { name: 'PGEL', shape: 'square', change: 2.1 },
                { name: 'AXISBANK', shape: 'square', change: 1.9 },
                { name: 'LAURUSLABS', shape: 'tall', change: -1.7 },
                { name: 'CIPLA', shape: 'square', change: -0.9 },
                { name: 'NAUKRI', shape: 'square', change: 2.0 },
                { name: 'NAUKRI', shape: 'square', change: 2.0 },
                { name: 'NAUKRI', shape: 'square', change: 2.0 },
              ]}
            />
            <div className='dark:bg-black bg-white'>
            <StrategyBoard
              title="10 MIN MOMENTUM SPIKE"
              height={500}
              rowHeight={56}
              items={[
                { name: 'ASTRAL', shape: 'big', change: -3.1 },
                { name: 'TORNTPOWER', shape: 'tall', change: -5.0 },
                { name: 'TATACOMM', shape: 'tall', change: -1.5 },
                { name: 'COFORGE', shape: 'tall', change: 2.3 },
                { name: 'HAVELLS', shape: 'tall', change: 1.8 },
                { name: 'GMRAIRPORT', shape: 'tall', change: 2.2 },
                { name: 'PFC', shape: 'square', change: -1.1 },
                { name: 'ICICIBANK', shape: 'square', change: 1.2 },
                { name: 'UNITDSPR', shape: 'tall', change: 1.7 },
                { name: 'KALYANKJIL', shape: 'tall', change: 2.4 },
                { name: 'PGEL', shape: 'square', change: 2.1 },
                { name: 'AXISBANK', shape: 'square', change: 1.9 },
                { name: 'LAURUSLABS', shape: 'tall', change: -1.7 },
                { name: 'CIPLA', shape: 'square', change: -0.9 },
                { name: 'NAUKRI', shape: 'square', change: 2.0 },
                { name: 'NAUKRI', shape: 'square', change: 2.0 },
                { name: 'NAUKRI', shape: 'square', change: 2.0 },
              ]}
            />
            </div>
           </div>
      </div>
    </div>
  );
};

export default InsiderStrategy; 