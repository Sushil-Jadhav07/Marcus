import React, { useState, useEffect, useRef } from 'react';
import MobileTopbar from '../components/layout/MobileTopbar';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';
import { FaPlay, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Optionopexarea from '../components/Optionapex/Optionopexarea';
import Marquee from '../components/MarketPulse/Marquee';
import OptionApexDesktop from '../components/Optionapex/OptioApexDesktop';

const OptionApex = () => {
  

  return (
    <div className='flex flex-col overflow-hidden bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
      <div className='w-full h-full flex flex-col'>
          <Topbar /> 
          <MobileTopbar />
          <Navigation />
            <div className=" h-[200vh] lg:hidden block  ">
            <div className='flex lg:justify-center justify-start lg:items-center pl-5 pt-5 items-start'>
            <h2 className="mb-3 text-white font-semibold tracking-wide">Option Apex</h2>
            </div>
            <Optionopexarea />
            </div>
            <div className='lg:block hidden'>
            <Marquee/>
            <div className='px-5 mt-8'>
            
              <OptionApexDesktop />
            </div>
            </div>
      </div>
    </div>
  );
};

export default OptionApex; 