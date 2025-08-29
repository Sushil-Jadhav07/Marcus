import React from 'react';
import MobileTopbar from '../components/layout/MobileTopbar';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';
import { FaPlay } from 'react-icons/fa';
import IndexAndExpFilters from '../components/Filters/IndexAndExpFilters';

const OptionClock = () => {
  return (
    <div className='flex flex-col h-full'>
    <Navigation />
      <div className='w-full h-full flex flex-col'>
          <Topbar /> 
          <MobileTopbar />
          <div className=" h-[120vh] bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% ">
            <div className='flex lg:justify-center justify-start lg:items-center pl-5 pt-5 gap-5 items-center'>
            <h2 className=" !mb-0 text-white font-semibold tracking-wide">Option Clock</h2>
            <div className="flex justify-center item-center text-[10px] bg-white text-red-800 rounded-sm px-2">Live</div>
            <FaPlay className='dark:text-white text-black lg:text-lg text-sm' />
            </div>
            <IndexAndExpFilters className='mt-4' />
          </div>
      </div>
    </div>
  );
};

export default OptionClock; 