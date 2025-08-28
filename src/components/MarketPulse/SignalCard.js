import React from 'react';
import up from '../../asset/img/candle.png'
import down from '../../asset/img/plus.png'
import bull from '../../asset/img/bull.png'
import bear from '../../asset/img/redbull.png'
/**
 * SignalCard displays a stock idea with time and percent change.
 * Styling uses a subtle glass card with a gradient border to match the app's theme.
 */
const SignalCard = ({
  symbol,
  timeLabel,
  signalPercent,
  movePercent,
  direction = 'up', // 'up' | 'down'
}) => {
  const isUp = direction === 'up';
  const signalPercentTextColor = isUp ? 'text-green-400' : 'text-red-400';
  const movePercentTextColor = isUp ? 'text-green-400' : 'text-red-400';
  const arrow = isUp ? '▲' : '▼';
  const animal = isUp ? bull : bear;

  return (
    <div className="snap-start dark:text-white text-black shrink-0 w-72">
      <div className="rounded-2xl h-56 bg-gradient-to-b from-white/60 to-white/10">
        <div className=" relative backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 dark:border-t-white/60  border-t-gray-400/60 dark:border-r-white/60 border-r-gray-400/60 border-b-blue-400/60 border-l-blue-400/60  p-3 h-56  ">
          {/* Header row */}
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 rounded-full bg-gray-200/90" />
            <div className="flex items-center gap-2">
              {/* Simple candles glyph using inline SVG */}
              {/* <svg width="22" height="22" viewBox="0 0 24 24" className="text-white/80">
                <rect x="3" y="8" width="4" height="10" fill="currentColor" opacity="0.8"/>
                <rect x="10" y="5" width="4" height="13" fill="currentColor" opacity="0.6"/>
                <rect x="17" y="9" width="4" height="9" fill="currentColor" opacity="0.9"/>
              </svg> */}
              <div className='flex justify-center items-center'>
              <img src={up} alt="up" className='w-6 h-6'/>
              </div>
              <button
                type="button"
                className="h-6 w-6 grid place-items-center rounded-md"
                aria-label="Add"
              >
                <img src={down} alt="up" className='w-6 h-6'/>
              </button>
            </div>
          </div>

          {/* Symbol */}
          <div className="mt-3">
            <div className="dark:text-white text-black text-xl font-semibold tracking-wide">{symbol}</div>
          </div>

          {/* Metrics */}
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="dark:text-white text-black">Time</div>
              <div className="mt-1 dark:text-white text-black text-base">{timeLabel}</div>
            </div>
            <div>
              <div className="dark:text-white text-black">Sgn %</div>
              <div className={`mt-1 text-base font-semibold ${isUp ? 'text-[#1EE004]' : 'text-[#E70101]'}`}>{signalPercent}</div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="absolute left-5 bottom-4 right-5 flex items-end justify-between">
            <div className={`flex items-center gap-2 text-lg font-semibold ${movePercentTextColor}`}>
              <span className={`${isUp ? 'text-[#1EE004]' : 'text-[#E70101]'}`}>{arrow}</span>
              <span className={`${isUp ? 'text-[#1EE004]' : 'text-[#E70101]'}`}>{movePercent}</span>
            </div>
            <div className={`text-3xl ${isUp ? 'text-[#1EE004]' : 'text-[#E70101]'}`}>
              <img src={animal} alt="animal" className=' w-[50px] h-[30px]'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalCard;


