import React, { useState, useEffect, useRef } from 'react';
import MobileTopbar from '../components/layout/MobileTopbar';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';
import { FaPlay, FaChevronDown, FaChevronUp, FaLightbulb } from 'react-icons/fa';
import IndexAndExpFilters from '../components/Filters/IndexAndExpFilters';
import MarketProgress from '../components/OptionClock/MarketProgress';
import Marquee from '../components/MarketPulse/Marquee';
import OptionCandles from '../components/OptionClock/OptionCandles';
import OptionArea from '../components/OptionClock/OptionArea';

const OptionClock = () => {
  const [selectedIndex, setSelectedIndex] = useState('Nifty50');
  const [selectedExp, setSelectedExp] = useState('Sep-04 (Thursday)');
  const [indexDropdownOpen, setIndexDropdownOpen] = useState(false);
  const [expDropdownOpen, setExpDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const indexOptions = [
    { label: 'Nifty50', value: 'nifty50' },
    { label: 'NiftyBank', value: 'niftybank' },
    { label: 'All', value: 'all' }
  ];

  const expOptions = [
    { label: 'Sep-04 (Thursday)', value: 'current' },
    { label: 'Sep-11 (Thursday)', value: 'next' },
    { label: 'Sep-18 (Thursday)', value: 'future' }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIndexDropdownOpen(false);
        setExpDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex overflow-hidden flex-col min-h-screen bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
    <Navigation />
      <div className='w-full h-full flex flex-col'>
          <Topbar /> 
          <MobileTopbar />
          <div clasname='mt-6' >
          <Marquee />
          </div>

          <div className='lg:block hidden' >
            <div className='px-5 mt-5 flex gap-5 justify-start items-end'>
              <h2 className='text-white text-3xl mb-0 font-bold'>Option Clock</h2>
              <div className='flex gap-2 items-center'>
              <FaPlay className='text-white text-md'/>
               <FaLightbulb className='dark:text-white text-black text-md font-semibold' size={20} />
              </div>
             <div>              
            </div>
            </div>
            <div className='w-full h-full px-5 mt-5'>
              <OptionArea />
            </div>
          </div>
          
         
      </div>
    </div>
  );
};

export default OptionClock; 