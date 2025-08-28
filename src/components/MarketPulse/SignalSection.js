import React from 'react';
import SignalCard from './SignalCard';
import { FaLightbulb, FaPlay } from 'react-icons/fa';

/**
 * SignalSection renders a titled, horizontally scrollable row of SignalCard items.
 */
const SignalSection = ({
  title,
  onSeeAll,
  items = [],
}) => {
  return (
    <div className="mt-6 px-5">
      <div className="flex items-center justify-between">
        <div className='flex justify-center items-center gap-2'>
        <div className='flex justify-center items-center gap-2'>
        <p className="dark:text-white text-black font-medium">{title}</p>
        <FaLightbulb className='dark:text-white text-black text-lg font-semibold' size={20} />
        </div>
        <FaPlay className='dark:text-white text-black text-lg font-semibold' size={20} />
        </div>
        <button
          type="button"
          className="dark:text-white text-black text-sm inline-flex items-center gap-2"
          onClick={onSeeAll}
        >
          See all <span>→</span>
        </button>
      </div>
      <div className="mt-4 !dark:text-white !text-black overflow-x-auto hide-scrollbar">
        <div className="flex gap-5 snap-x snap-mandatory">
          {items.map((item) => (
            <SignalCard key={item.symbol + item.timeLabel}
              symbol={item.symbol}
              timeLabel={item.timeLabel}
              signalPercent={item.signalPercent}
              movePercent={item.movePercent}
              direction={item.direction}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignalSection;


