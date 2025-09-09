import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Marquee = () => {
 
  // Fallback static data for when API is loading or failed
  const staticMarketData = [
    { symbol: 'NIFTY', price: '₹24,188.65', change: '+123.45', percent: '(+0.51%)', isPositive: true },
    { symbol: 'SENSEX', price: '₹79,802.79', change: '+456.78', percent: '(+0.58%)', isPositive: true },
    { symbol: 'RELIANCE', price: '₹2,845.30', change: '-12.45', percent: '(-0.44%)', isPositive: false },
    { symbol: 'TCS', price: '₹4,123.80', change: '+78.90', percent: '(+1.95%)', isPositive: true },
    { symbol: 'HDFCBANK', price: '₹1,687.25', change: '+23.45', percent: '(+1.41%)', isPositive: true },
  ];



  return (
    <>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
      
      {/* Market Data Box */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-400/30 mt-10 lg:relative h-[100px] backdrop-blur-lg rounded-l-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col items-start justify-start gap-3 bg-white/20 dark:bg-white/20 p-1 shadow-lg ml-5">
        
        {/* Loading State */}
        {staticMarketData.length === 0 && (
          <div className="flex items-center justify-center h-full w-full">
            <div className="flex items-center gap-3 text-white">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="text-sm font-medium">Loading market data...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {staticMarketData.length === 0 && (
          <div className="flex items-center justify-center h-full w-full">
            <div className="flex items-center gap-3 text-red-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Failed to load market data</span>
            </div>
          </div>
        )}

        {/* Market Data Display */}
        {staticMarketData.length > 0 && (
          <div className="flex items-center gap-2 animate-marquee whitespace-nowrap h-full">
            {(() => {
              // Duplicate items for seamless scrolling
              const duplicatedItems = [...staticMarketData, ...staticMarketData];
              
              return duplicatedItems.map((item, index) => (
                <div key={`${item.symbol}-${index}`} className="flex flex-col items-start justify-center min-w-[200px] h-full px-2 py-2 border-r border-white/50">
                  <div className="flex items-center gap-2 mb-1">
                    {/* Live indicator for real data */}
                    <div className={`w-2 h-2 rounded-full ${true ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                    <span className="text-white font-medium text-sm uppercase">{item.symbol}</span>
                    {/* WebSocket status indicator */}
                    {true && (
                      <span className="text-xs text-green-400 font-bold">LIVE</span>
                    )}
                  </div>
                  <div className="text-white text-lg font-semibold mb-1">{item.price}</div>
                  <div className={`text-sm font-medium ${
                    item.isPositive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {item.change} {item.percent}
                  </div>
                  {/* Volume info for real data */}
                  {item.volume && item.volume > 0 && (
                    <div className="text-xs text-white/70 mt-1">
                      Vol: {item.volume.toLocaleString()}
                    </div>
                  )}
                </div>
              ));
            })()}
          </div>
        )}
      </div>
    </>
  );
};

export default Marquee;