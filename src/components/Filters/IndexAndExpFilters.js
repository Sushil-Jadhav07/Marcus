import React, { useState } from 'react';
import GlassSelect from './GlassSelect';
import MarketProgress from '../OptionClock/MarketProgress';
import { FaLightbulb } from 'react-icons/fa';

// Index filter with "All" option; Exp filter with two options
const IndexAndExpFilters = ({
  onChange,
  className = '',
}) => {
  const [indexVal, setIndexVal] = useState('ALL');
  const [expVal, setExpVal] = useState('CURRENT');

  const indexOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'Nifty50', value: 'NIFTY50' },
    { label: 'NiftyBank', value: 'NIFTYBANK' },
  ];

  const expOptions = [
    { label: 'Current', value: 'CURRENT' },
    { label: 'Next', value: 'NEXT' },
  ];

  const emitChange = (nextIndex, nextExp) => {
    onChange?.({ index: nextIndex, exp: nextExp });
  };

  return (
    <div className={`flex items-start flex-col gap-2 px-5 ${className}`}>
     <div className='flex items-center flex-col lg:flex-row gap-2 w-full justify-between'>
     <GlassSelect
        label="Index"
        value={indexVal}
        onChange={(v) => { setIndexVal(v); emitChange(v, expVal); }}
        options={indexOptions}
      />
      <GlassSelect
        label="Exp"
        value={expVal}
        onChange={(v) => { setExpVal(v); emitChange(indexVal, v); }}
        options={expOptions}
      />
      </div>
       <MarketProgress className='mt-2' />
       <div className='bg-gray-200/20 mt-5 backdrop-blur-lg rounded-xl w-full border-t-2 border-r-2 border-b-2 border-l-2 dark:border-t-white/60  border-t-gray-400/60 dark:border-r-white/60 border-r-gray-400/60 border-b-blue-400/60 px-2 border-l-blue-400/60 h-[400px] p-5'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center justify-center gap-2'>
          <h2 className='text-white text-lg mb-0 font-semibold'>OI Clock</h2>
          <FaLightbulb className='dark:text-white text-black text-lg font-semibold' size={20} />
          </div>
          <div className='flex flex-col justify-start items-start gap-2'>
            <div className='flex justify-center items-center gap-2'>
                <div className='w-10 h-5 bg-[#1EE004] rounded-[30px]'></div>
                <p className='text-white text-sm font-semibold'>Bulls</p>
            </div>
            <div className='flex justify-center items-center gap-2'>
                <div className='w-10 h-5 bg-[#E70101] rounded-[30px]'></div>
                <p className='text-white text-sm font-semibold'>Bears</p>
            </div>
          </div>
        </div>
       </div>
    </div>
  );
};

export default IndexAndExpFilters;


