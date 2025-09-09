import React from 'react'
import { FaPlay } from 'react-icons/fa'

const OptionCandles = () => {
  return (
    <div className='w-full h-[500px] bg-white/20 dark:bg-white/20 rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 p-5 mt-5'>

    <div className='w-full grid grid-cols-2 gap-6'>
        <div className='border-r-2 dark:border-r-white/20 border-r-black/20 h-[450px]'>
            <div className='flex justify-start items-center gap-2'>
                <h2 className='dark:text-white text-black text-2xl font-bold tracking-wide mb-0 '>OI Clocks</h2>
                <div className='flex justify-center items-center text-[10px] bg-white text-red-800 rounded-sm px-2'>Live</div>
                <FaPlay className='dark:text-white text-black lg:text-[10px]' />
            </div>
        </div>
        <div className=' h-[450px]'>
            <div className='flex justify-start items-center gap-2'>
                <h2 className='dark:text-white text-black text-2xl font-bold tracking-wide mb-0 '>Net Position</h2>
                <div className='flex justify-center items-center text-[10px] bg-white text-red-800 rounded-sm px-2'>Live</div>
                <FaPlay className='dark:text-white text-black lg:text-[10px]' />
            </div>
        </div>
    </div>

    </div>
  )
}

export default OptionCandles
