import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown, FaChevronUp, FaPlay } from 'react-icons/fa';

const OptioApexDesktop = () => {
    const [selectedIndex, setSelectedIndex] = useState('Nifty50');
  const [selectedExp, setSelectedExp] = useState('Sep-04 (Thursday)');
  const [selectedTime, setSelectedTime] = useState('1 Min');
  const [indexDropdownOpen, setIndexDropdownOpen] = useState(false);
  const [expDropdownOpen, setExpDropdownOpen] = useState(false);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
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

  const timeOptions = [
    { label: '1 Min', value: '1min' },
    { label: '5 Min', value: '5min' },
    { label: '15 Min', value: '15min' },
    { label: '30 Min', value: '30min' },
    { label: '1 Hour', value: '1hour' },
    { label: '1 Day', value: '1day' }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIndexDropdownOpen(false);
        setExpDropdownOpen(false);
        setTimeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div>
        <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center gap-4'>
                  <h2 className='text-white text-2xl font-bold tracking-wide mb-0'>Option Apex</h2>
                  <div className="flex justify-center items-center text-[10px] bg-white text-red-800 rounded-sm px-2">
                    LIVE
                  </div>
                  <FaPlay className='text-white text-sm ml-2' />
                </div>
              </div>
              <div ref={dropdownRef} className='flex justify-end gap-3 mb-4'>
                {/* Index Filter Dropdown */}
                <div className='relative'>
                  <button 
                    onClick={() => {
                      setIndexDropdownOpen(!indexDropdownOpen);
                      setExpDropdownOpen(false);
                      setTimeDropdownOpen(false);
                    }}
                    className='flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm rounded-full px-4 py-2 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300'
                  >
                    <span className='text-white/90'>Index:</span>
                    <span className='font-medium'>{selectedIndex}</span>
                    {indexDropdownOpen ? (
                      <FaChevronUp className='w-3 h-3 text-white/70 transition-transform duration-300' />
                    ) : (
                      <FaChevronDown className='w-3 h-3 text-white/70 transition-transform duration-300' />
                    )}
                  </button>
                  
                  {/* Index Dropdown Menu */}
                  <div className={`absolute z-50 top-full mt-2 right-0 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg transition-all duration-300 ease-in-out origin-top ${
                    indexDropdownOpen 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}>
                    {indexOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedIndex(option.label);
                          setIndexDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                          selectedIndex === option.label
                            ? 'bg-blue-500/30 text-white font-medium'
                            : 'text-white/90 hover:bg-white/10'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Exp Filter Dropdown */}
                <div className='relative'>
                  <button 
                    onClick={() => {
                      setExpDropdownOpen(!expDropdownOpen);
                      setIndexDropdownOpen(false);
                      setTimeDropdownOpen(false);
                    }}
                    className='flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm rounded-full px-4 py-2 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300'
                  >
                    <span className='text-white/90'>Exp:</span>
                    <span className='font-medium'>{selectedExp}</span>
                    {expDropdownOpen ? (
                      <FaChevronUp className='w-3 h-3 text-white/70 transition-transform duration-300' />
                    ) : (
                      <FaChevronDown className='w-3 h-3 text-white/70 transition-transform duration-300' />
                    )}
                  </button>
                  
                  {/* Exp Dropdown Menu */}
                  <div className={`absolute top-full mt-2 right-0 w-56 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg transition-all duration-300 ease-in-out origin-top ${
                    expDropdownOpen 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}>
                    {expOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedExp(option.label);
                          setExpDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                          selectedExp === option.label
                            ? 'bg-blue-500/30 text-white font-medium'
                            : 'text-white/90 hover:bg-white/10'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Time Filter Dropdown */}
                <div className='relative'>
                  <button 
                    onClick={() => {
                      setTimeDropdownOpen(!timeDropdownOpen);
                      setIndexDropdownOpen(false);
                      setExpDropdownOpen(false);
                    }}
                    className='flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm rounded-full px-4 py-2 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300'
                  >
                    <span className='text-white/90'>Time:</span>
                    <span className='font-medium'>{selectedTime}</span>
                    {timeDropdownOpen ? (
                      <FaChevronUp className='w-3 h-3 text-white/70 transition-transform duration-300' />
                    ) : (
                      <FaChevronDown className='w-3 h-3 text-white/70 transition-transform duration-300' />
                    )}
                  </button>
                  
                  {/* Time Dropdown Menu */}
                  <div className={`absolute top-full mt-2 right-0 w-40 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg transition-all duration-300 ease-in-out origin-top ${
                    timeDropdownOpen 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}>
                    {timeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedTime(option.label);
                          setTimeDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                          selectedTime === option.label
                            ? 'bg-blue-500/30 text-white font-medium'
                            : 'text-white/90 hover:bg-white/10'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Option Apex Desktop body */}
             <div className='grid grid-cols-2 gap-6'>
             <div className='relative overflow-hidden bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-400/30 mt-2 lg:relative backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col p-5 gap-3 bg-white/20 dark:bg-white/20 shadow-lg h-[500px]'></div>
             <div className='relative overflow-hidden bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-400/30 mt-2 lg:relative backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col p-5 gap-3 bg-white/20 dark:bg-white/20 shadow-lg h-[500px]'></div>
             </div>
             <div className='relative overflow-hidden bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-400/30 mt-2 lg:relative backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col p-5 gap-3 bg-white/20 dark:bg-white/20 shadow-lg h-[500px]'></div>
    </div>

  )
}

export default OptioApexDesktop