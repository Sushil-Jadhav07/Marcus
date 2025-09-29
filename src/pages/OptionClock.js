import React, { useState, useEffect, useRef } from 'react';
import MobileTopbar from '../components/layout/MobileTopbar';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';
import { FaPlay, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import IndexAndExpFilters from '../components/Filters/IndexAndExpFilters';
import MarketProgress from '../components/OptionClock/MarketProgress';
import Marquee from '../components/MarketPulse/Marquee';
import OptionCandles from '../components/OptionClock/OptionCandles';

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
          
          {/* Coming Soon Section - Mobile */}
          <div className="h-screen lg:hidden flex flex-col items-center justify-center px-5">
            <div className="text-center">
              <h2 className="mb-6 text-white font-bold tracking-wide text-3xl">Option Clock</h2>
              <div className="relative">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/30 rounded-2xl px-8 py-4 shadow-2xl">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold text-lg tracking-wide animate-pulse">
                    Coming Soon
                  </span>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-sm -z-10 animate-pulse"></div>
              </div>
              <p className="mt-6 text-white/70 text-sm max-w-md">
                We're working hard to bring you real-time option clock tools. Stay tuned for updates!
              </p>
            </div>
          </div>

          {/* Coming Soon Section - Desktop */}
          <div className='lg:flex hidden h-screen items-center justify-center'>
            <div className="text-center">
              <h2 className="mb-8 text-white font-bold tracking-wide text-4xl">Option Clock</h2>
              <div className="relative">
                <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/30 rounded-3xl px-12 py-6 shadow-2xl">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-bold text-2xl tracking-wide animate-pulse">
                    Coming Soon
                  </span>
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-lg -z-10 animate-pulse"></div>
              </div>
              <p className="mt-8 text-white/70 text-lg max-w-2xl">
                We're working hard to bring you real-time option clock tools. Stay tuned for updates!
              </p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default OptionClock; 