import React from 'react';
import MobileTopbar from '../components/layout/MobileTopbar';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';
import Optionopexarea from '../components/Optionapex/Optionopexarea';

const OptionApex = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='w-full h-full flex flex-col'>
          <Topbar /> 
          <MobileTopbar />
          <Navigation />
            <div className=" h-[200vh] bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% ">
            <div className='flex lg:justify-center justify-start lg:items-center pl-5 pt-5 items-start'>
            <h2 className="mb-3 text-white font-semibold tracking-wide">Option Apex</h2>
            </div>
            <Optionopexarea />
            </div>
      </div>
    </div>
  );
};

export default OptionApex; 