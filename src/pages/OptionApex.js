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
          
          {/* Coming Soon Section - Mobile */}
          <div className="h-screen lg:hidden flex flex-col items-center justify-center px-5">
            <div className="text-center">
              <h2 className="mb-6 text-white font-bold tracking-wide text-3xl">Option Apex</h2>
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
                We're working hard to bring you advanced option analysis tools. Stay tuned for updates!
              </p>
            </div>
          </div>

          {/* Coming Soon Section - Desktop */}
          <div className='lg:flex hidden h-screen items-center justify-center'>
            <div className="text-center">
              <h2 className="mb-8 text-white font-bold tracking-wide text-4xl">Option Apex</h2>
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
                We're working hard to bring you advanced option analysis tools. Stay tuned for updates!
              </p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default OptionApex; 