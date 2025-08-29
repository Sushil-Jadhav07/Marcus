import React, { useState } from 'react'
import GlassSelect from '../Filters/GlassSelect'

const Optionopexarea = () => {
  const [indexVal, setIndexVal] = useState('NIFTY50');
  const [tfVal, setTfVal] = useState('3M');
  const [expVal, setExpVal] = useState('CURRENT');

  const indexOptions = [
    { label: 'Nifty50', value: 'NIFTY50' },
    { label: 'NiftyBank', value: 'NIFTYBANK' },
    { label: 'All', value: 'ALL' },
  ];

  const tfOptions = [
    { label: '1m', value: '1M' },
    { label: '3m', value: '3M' },
    { label: '5m', value: '5M' },
    { label: '15m', value: '15M' },
  ];

  const expOptions = [
    { label: 'Current', value: 'CURRENT' },
    { label: 'Next', value: 'NEXT' },
  ];

  return (
    <div className='px-5'>
      <div className='flex items-center gap-3'>
        <div className='w-[40%]'>
          <GlassSelect label="Index" value={indexVal} onChange={setIndexVal} options={indexOptions} />
        </div>
        <div className='w-[20%]'>
          <GlassSelect label="TF" value={tfVal} onChange={setTfVal} options={tfOptions} />
        </div>
        <div className='w-[40%]'>
          <GlassSelect label="Exp" value={expVal} onChange={setExpVal} options={expOptions} />
        </div>
      </div>
      <div className='flex items-center flex-col lg:flex-row  gap-3'>
        <div className='w-full h-[300px] bg-gray-200/20 backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 dark:border-t-white/60  border-t-gray-400/60 dark:border-r-white/60 border-r-gray-400/60 border-b-blue-400/60 px-2 border-l-blue-400/60 mt-5'></div>
        <div className='w-full h-[300px] bg-gray-200/20 backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 dark:border-t-white/60  border-t-gray-400/60 dark:border-r-white/60 border-r-gray-400/60 border-b-blue-400/60 px-2 border-l-blue-400/60 mt-5'></div>
        <div className='w-full h-[300px] bg-gray-200/20 backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 dark:border-t-white/60  border-t-gray-400/60 dark:border-r-white/60 border-r-gray-400/60 border-b-blue-400/60 px-2 border-l-blue-400/60 mt-5'></div>
       
      </div>
    </div>
  )
}

export default Optionopexarea