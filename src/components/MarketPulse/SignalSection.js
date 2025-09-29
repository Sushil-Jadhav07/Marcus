import React from 'react';
import SignalCard from './SignalCard';
import { FaLightbulb, FaPlay, FaSync } from 'react-icons/fa';
import icon from '../../asset/img/candlepc.png';

/**
 * SignalSection renders a titled, horizontally scrollable row of SignalCard items.
 */
const SignalSection = ({
  title,
  onSeeAll,
  items = [],
  isLoading = false,
  error = null,
  onRefresh,
}) => {
  return (
    <div className="mt-6 px-5 lg:hidden block">
      <div className="flex items-center justify-between w-full">
        <div className='flex justify-between items-center gap-2 w-full'>
        <div className='flex justify-between items-center gap-5'>
        
        <div className="relative">
          <img src={icon} alt={title} className="w-[40px] h-[40px] drop-shadow-lg" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
        </div>
        <p className="dark:text-white text-[15px] font-medium">{title}</p>
        {/* <FaLightbulb className='dark:text-white text-black text-lg font-semibold' size={20} /> */}
        </div>
        <div className="flex items-center gap-3">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh data"
            >
              <FaSync className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          )}
          <FaPlay className='dark:text-white text-black text-lg font-semibold' size={20} />
        </div>
        </div>
        {/* <button
          type="button"
          className="dark:text-white text-black text-sm inline-flex items-center gap-2"
          onClick={onSeeAll}
        >
          See all <span>→</span>
        </button> */}
      </div>
        <div className="mt-4 !dark:text-white !text-black overflow-x-auto scrollbar-hide">
          {error ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-red-400 text-sm mb-2">Please refresh button to try again</p>
                
                {onRefresh && (
                  <button
                    onClick={onRefresh}
                    className="mt-3 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200"
                  >
                    Refresh
                  </button> 
                )}
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-3">
                <FaSync className="w-5 h-5 animate-spin text-white/70" />
                <p className="text-white/70 text-sm">Loading market data...</p>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-white/70 text-sm">No market data available</p>
            </div>
          ) : (
            <div className="flex gap-5 snap-x snap-mandatory">
              {items.map((item) => (
                <SignalCard key={item.symbol + item.timeLabel}
                  ltp={item.ltp}
                  symbol={item.symbol}
                  timeLabel={item.timeLabel}
                  signalPercent={item.signalPercent}
                  movePercent={item.movePercent}
                  direction={item.direction}
                />
              ))}
            </div>
          )}
        </div>
    </div>
  );
};

export default SignalSection;


