import React, { useEffect, useRef, useState } from 'react'
import { FaChevronDown, FaChevronUp, FaPlay } from 'react-icons/fa';

const OptioApexDesktop = () => {
  const [selectedIndex, setSelectedIndex] = useState('NIFTY');
  const [selectedTime, setSelectedTime] = useState('5');
  const [indexDropdownOpen, setIndexDropdownOpen] = useState(false);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });
  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [dataPreview, setDataPreview] = useState([]);
  const dropdownRef = useRef(null);

  const indexOptions = [
    { label: 'NIFTY', value: 'NIFTY' },
    { label: 'BANKNIFTY', value: 'BANKNIFTY' },
    { label: 'FINNIFTY', value: 'FINNIFTY' },
    { label: 'MIDCAP', value: 'MIDCAP' },
    { label: 'SENSEX', value: 'SENSEX' },
  ];

  const timeOptions = [
    { label: '3 Min', value: '3' },
    { label: '5 Min', value: '5' },
    { label: '15 Min', value: '15' },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIndexDropdownOpen(false);
        setTimeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Helpers
  const formatDateTime = (date, time) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} ${time}`;
  };

  const getStartOfSelected = () => {
    // Market open assumed 09:15:00 on selected startDate
    const [y, m, d] = startDate.split('-').map((v) => parseInt(v, 10));
    const dt = new Date(y, m - 1, d, 9, 15, 0);
    return formatDateTime(dt, '09:15:00');
  };

  const getEndOfSelected = () => {
    // Market close assumed 15:30:00 on selected endDate
    const [y, m, d] = endDate.split('-').map((v) => parseInt(v, 10));
    const dt = new Date(y, m - 1, d, 15, 30, 0);
    return formatDateTime(dt, '15:30:00');
  };

  const fetchHistorical = async () => {
    setIsLoading(true);
    setApiError('');
    setDataPreview([]);
    try {
      const body = {
        symbol: selectedIndex,
        start_time: getStartOfSelected(),
        end_time: getEndOfSelected(),
        interval: Number(selectedTime),
        exchange: 'NSE',
      };

      const res = await fetch('https://marcusbackend-production.up.railway.app/get-historical-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await res.json();
      const arr = Array.isArray(json) ? json : json?.data || [];
      setDataPreview(arr.slice(0, 10));
    } catch (err) {
      setApiError(err?.message || 'Failed to fetch');
    } finally {
      setIsLoading(false);
    }
  };

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
                          setSelectedIndex(option.value);
                          setIndexDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                          selectedIndex === option.value
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
                    }}
                    className='flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm rounded-full px-4 py-2 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 z-50'
                  >
                    <span className='text-white/90'>Time:</span>
                    <span className='font-medium'>{`${selectedTime} Min`}</span>
                    {timeDropdownOpen ? (
                      <FaChevronUp className='w-3 h-3 text-white/70 transition-transform duration-300' />
                    ) : (
                      <FaChevronDown className='w-3 h-3 text-white/70 transition-transform duration-300' />
                    )}
                  </button>
                  
                  {/* Time Dropdown Menu */}
                  <div className={`absolute z-50 top-full mt-2 right-0 w-40 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg transition-all duration-300 ease-in-out origin-top ${
                    timeDropdownOpen 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}>
                    {timeOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedTime(option.value);
                          setTimeDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                          selectedTime === option.value
                            ? 'bg-blue-500/30 text-white font-medium'
                            : 'text-white/90 hover:bg-white/10'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                
                
                {/* Start and End date pickers */}
                <div className='flex items-center gap-2'>
                  <label className='text-white/80 text-sm'>Start Date</label>
                  <input
                    type='date'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className='bg-white/10 text-white text-sm rounded-md px-3 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400'
                  />
                </div>
                <div className='flex items-center gap-2'>
                  <label className='text-white/80 text-sm'>End Date</label>
                  <input
                    type='date'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className='bg-white/10 text-white text-sm rounded-md px-3 py-2 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400'
                  />
                </div>
                
                <button
                  onClick={fetchHistorical}
                  className='px-4 py-2 text-sm rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors'
                  disabled={isLoading}
                >
                  {isLoading ? 'Fetching…' : 'Fetch'}
                </button>
              </div>
              {/* Option Apex Desktop body */}
             <div className='grid grid-cols-2 gap-6'>
               <div className='relative overflow-hidden bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-400/30 mt-2 lg:relative backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col p-5 gap-3 bg-white/20 dark:bg-white/20 shadow-lg h-[500px]'>
                 <div className='flex items-center justify-between'>
                   <h3 className='text-white font-semibold'>Historical Data Preview</h3>
                   {apiError && <span className='text-red-300 text-xs'>{apiError}</span>}
                 </div>
                 <div className='text-white/90 text-sm'>
                   <div className='mb-2'>
                     <span className='mr-2'>Symbol:</span>
                     <span className='font-medium'>{selectedIndex}</span>
                   </div>
                   <div className='grid grid-cols-5 gap-2 text-xs text-white/70'>
                     <span>Time</span>
                     <span>Open</span>
                     <span>High</span>
                     <span>Low</span>
                     <span>Close</span>
                   </div>
                   <div className='divide-y divide-white/10 overflow-auto'>
                     {dataPreview.map((row, idx) => (
                       <div key={idx} className='grid grid-cols-5 gap-2 py-1 text-xs'>
                         <span>{row?.time || row?.timestamp || '-'}</span>
                         <span>{row?.open ?? '-'}</span>
                         <span>{row?.high ?? '-'}</span>
                         <span>{row?.low ?? '-'}</span>
                         <span>{row?.close ?? '-'}</span>
                       </div>
                     ))}
                     {!isLoading && dataPreview.length === 0 && (
                       <div className='text-white/60 text-xs py-4'>No data yet. Choose options and Fetch.</div>
                     )}
                   </div>
                 </div>
               </div>
               <div className='relative overflow-hidden bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-400/30 mt-2 lg:relative backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col p-5 gap-3 bg-white/20 dark:bg-white/20 shadow-lg h-[500px]'>
               </div>
             </div>
             <div className='relative overflow-hidden bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-400/30 mt-2 lg:relative backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col p-5 gap-3 bg-white/20 dark:bg-white/20 shadow-lg h-[500px]'>
             </div>
    </div>

  )
}

export default OptioApexDesktop