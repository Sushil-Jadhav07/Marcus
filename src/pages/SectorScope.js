import React from 'react';
import Topbar from '../components/layout/Topbar';
import MobileTopbar from '../components/layout/MobileTopbar';
import Navigation from '../components/layout/Navigation';
import StrategyBoard from '../components/Insider/StrategyBoard';

const SectorScope = () => {
  return (
    <div className='flex flex-col h-full'>
    <div className='w-full h-full flex flex-col'>
        <Topbar /> 
        <MobileTopbar />
        <Navigation />
          <div className=" h-[100vh] bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% ">
          <div className='flex lg:justify-center justify-start lg:items-center pl-5 pt-5 items-start'>
          <h2 className="mb-3 text-white font-semibold tracking-wide">Sector Scope</h2>
          </div>
          <StrategyBoard
              title="Reality"
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
              title="Pharmaceuticals"
              height={500}
              rowHeight={56}
              items={[
                { name: 'SUNPHARMA', shape: 'big', change: 2.8 },
                { name: 'DRREDDY', shape: 'tall', change: 1.9 },
                { name: 'CIPLA', shape: 'tall', change: -0.9 },
                { name: 'DIVISLAB', shape: 'tall', change: 3.2 },
                { name: 'LUPIN', shape: 'tall', change: 1.4 },
                { name: 'BIOCON', shape: 'tall', change: -2.1 },
                { name: 'AUROPHARMA', shape: 'square', change: 0.8 },
                { name: 'TORNTPHARM', shape: 'square', change: 2.5 },
                { name: 'ALKEM', shape: 'tall', change: 1.6 },
                { name: 'GLENMARK', shape: 'tall', change: -1.3 },
                { name: 'CADILAHC', shape: 'square', change: 0.9 },
                { name: 'ABBOTINDIA', shape: 'square', change: 1.7 },
                { name: 'LAURUSLABS', shape: 'tall', change: -1.7 },
                { name: 'PFIZER', shape: 'square', change: 0.5 },
                { name: 'GRANULES', shape: 'square', change: 2.3 },
                { name: 'STRIDES', shape: 'square', change: 1.8 },
                { name: 'NATCOPHAR', shape: 'square', change: -0.6 },
              ]}
          />
          </div>
          </div>
    </div>
  </div>
  );
};

export default SectorScope; 