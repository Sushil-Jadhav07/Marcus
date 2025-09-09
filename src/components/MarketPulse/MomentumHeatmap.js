import React, { useState, useMemo } from 'react';
import { FaPlay, FaLightbulb, FaChartLine } from 'react-icons/fa';
import momentumIcon from '../../asset/img/candlepc.png';

const MomentumHeatmap = ({ 
  data = [], 
  title = "5 MIN MOMENTUM SPIKE",
  showHeader = true,
  className = ""
}) => {
  // Default static data optimized for treemap layout - filled to cover all spaces
  const defaultData = [
    { symbol: 'AMBER', momentum: 8.5, direction: 'up', size: 'large' },
    { symbol: 'BOSCHLTD', momentum: 6.2, direction: 'up', size: 'big-square' },
    { symbol: 'BOSCHLTD', momentum: 6.2, direction: 'up', size: 'big-square' },
    { symbol: 'ASHOKLEY', momentum: 4.1, direction: 'up', size: 'rectangle' },
    { symbol: 'ASHOKLEY', momentum: 4.1, direction: 'up', size: 'small' },
    { symbol: 'TIINDIA', momentum: 5.8, direction: 'up', size: 'big-square' },
    { symbol: 'UNOMINADA', momentum: -3.2, direction: 'down', size: 'small' },
    { symbol: 'UNOMINADA', momentum: -3.2, direction: 'down', size: 'small' },
    { symbol: 'SONACOMS', momentum: 7.1, direction: 'up', size: 'big-square' },
    { symbol: 'RBLBANK', momentum: -2.8, direction: 'down', size: 'big-square' },
    { symbol: 'ICICIBANK', momentum: -4.5, direction: 'down', size: 'big-square' },
    { symbol: 'CANBK', momentum: -1.9, direction: 'down', size: 'small' },
    { symbol: 'BHARAT', momentum: 3.2, direction: 'up', size: 'small' },
    { symbol: 'PGEL', momentum: 2.8, direction: 'up', size: 'small' },
    { symbol: 'INDU', momentum: 6.5, direction: 'up', size: 'big-square' },
    { symbol: 'BITO', momentum: 5.2, direction: 'up', size: 'small' },
    { symbol: 'PATANALI', momentum: 4.8, direction: 'up', size: 'rectangle' },
    { symbol: 'PATANALI', momentum: 4.8, direction: 'up', size: 'small' },
    { symbol: 'ZYDUSL', momentum: 3.9, direction: 'up', size: 'small' },
    // Additional stocks to fill blank spaces
    { symbol: 'RELIANCE', momentum: 2.1, direction: 'up', size: 'small' },
    { symbol: 'TCS', momentum: 1.8, direction: 'up', size: 'small' },
    { symbol: 'HDFC', momentum: -1.2, direction: 'down', size: 'small' },
    { symbol: 'INFY', momentum: 3.5, direction: 'up', size: 'small' },
    { symbol: 'WIPRO', momentum: 2.7, direction: 'up', size: 'small' },
    { symbol: 'ITC', momentum: -0.8, direction: 'down', size: 'small' },
    { symbol: 'SBIN', momentum: 4.2, direction: 'up', size: 'small' },
    { symbol: 'BAJFIN', momentum: 1.9, direction: 'up', size: 'small' },
    { symbol: 'MARUTI', momentum: 3.1, direction: 'up', size: 'small' },
    { symbol: 'ONGC', momentum: -2.1, direction: 'down', size: 'small' },
    { symbol: 'NTPC', momentum: 1.5, direction: 'up', size: 'small' },
    { symbol: 'COALINDIA', momentum: 2.3, direction: 'up', size: 'small' },
    { symbol: 'POWERGRID', momentum: 1.7, direction: 'up', size: 'small' },
    // { symbol: 'ULTRACEMCO', momentum: 2.9, direction: 'up', size: 'small' },
    // { symbol: 'TITAN', momentum: 3.8, direction: 'up', size: 'small' },
    // { symbol: 'NESTLEIND', momentum: 1.4, direction: 'up', size: 'small' },
    // { symbol: 'BRITANNIA', momentum: 2.6, direction: 'up', size: 'small' },
    // { symbol: 'DIVISLAB', momentum: 4.7, direction: 'up', size: 'small' },
    // { symbol: 'DRREDDY', momentum: 3.3, direction: 'up', size: 'small' },
    // { symbol: 'CIPLA', momentum: 2.4, direction: 'up', size: 'small' },
    // { symbol: 'SUNPHARMA', momentum: 1.6, direction: 'up', size: 'small' },
    // { symbol: 'AXISBANK', momentum: -1.8, direction: 'down', size: 'small' },
    // { symbol: 'KOTAKBANK', momentum: 2.8, direction: 'up', size: 'small' },
    // { symbol: 'INDUSINDBK', momentum: 3.6, direction: 'up', size: 'small' },
    // { symbol: 'BAJAJFINSV', momentum: 4.1, direction: 'up', size: 'small' },
    // { symbol: 'BAJAJ-AUTO', momentum: 2.2, direction: 'up', size: 'small' },
    // { symbol: 'HEROMOTOCO', momentum: 1.9, direction: 'up', size: 'small' },
    // { symbol: 'EICHERMOT', momentum: 3.4, direction: 'up', size: 'small' },
    // { symbol: 'M&M', momentum: 2.5, direction: 'up', size: 'small' },
    // { symbol: 'TATAMOTORS', momentum: 4.3, direction: 'up', size: 'small' },
    // // Additional medium-sized boxes to fill larger gaps
    // { symbol: 'HINDALCO', momentum: 3.7, direction: 'up', size: 'big-square' },
    // { symbol: 'JSWSTEEL', momentum: 2.8, direction: 'up', size: 'big-square' },
    // { symbol: 'TATASTEEL', momentum: -1.5, direction: 'down', size: 'big-square' },
    // { symbol: 'ADANIPORTS', momentum: 4.5, direction: 'up', size: 'big-square' },
    // { symbol: 'GRASIM', momentum: 2.1, direction: 'up', size: 'big-square' },
    // { symbol: 'LT', momentum: 3.2, direction: 'up', size: 'big-square' },
    // { symbol: 'BHARTIARTL', momentum: 1.8, direction: 'up', size: 'big-square' },
    // { symbol: 'ASIANPAINT', momentum: 2.4, direction: 'up', size: 'big-square' },
    // { symbol: 'HINDUNILVR', momentum: 1.6, direction: 'up', size: 'big-square' },
    // { symbol: 'HCLTECH', momentum: 3.9, direction: 'up', size: 'big-square' },
    // { symbol: 'TECHM', momentum: 2.7, direction: 'up', size: 'big-square' },
    // { symbol: 'MINDTREE', momentum: 4.2, direction: 'up', size: 'big-square' }
  ];

  // Transform data from parent to match the expected format
  const transformedData = useMemo(() => {
    if (data && data.length > 0) {
      return data.map((item, index) => ({
        symbol: item.symbol || 'N/A',
        momentum: parseFloat(item.signalPercent?.replace('%', '') || '0'),
        direction: item.direction || 'up',
        size: index === 0 ? 'large' : index < 5 ? 'medium' : 'small'
      }));
    }
    return null;
  }, [data]);

  const heatmapData = transformedData || defaultData;
  const [hoveredItem, setHoveredItem] = useState(null);

  // Get color intensity based on momentum value
  const getColorIntensity = (momentum, direction) => {
    const absMomentum = Math.abs(momentum);
    if (direction === 'up') {
      if (absMomentum >= 7) return 'bg-[#1EE004]';
      if (absMomentum >= 5) return 'bg-[#1EE004]';
      if (absMomentum >= 3) return 'bg-green-400';
      return 'bg-green-300';
    } else {
      if (absMomentum >= 7) return 'bg-red-600';
      if (absMomentum >= 5) return 'bg-red-500';
      if (absMomentum >= 3) return 'bg-red-400';
      return 'bg-red-300';
    }
  };

  // Get size classes for different box shapes - optimized for treemap layout
  const getSizeClasses = (size, index) => {
    switch (size) {
      case 'large':
        return 'col-span-4 row-span-4 text-lg';
      case 'big-square':
        return 'col-span-2 row-span-2 text-base';
      case 'rectangle':
        return 'col-span-3 row-span-1 text-sm';
      case 'square':
        return 'col-span-1 row-span-1 text-sm';
      case 'small':
        return 'col-span-1 row-span-1 text-xs';
      default:
        return 'col-span-1 row-span-1 text-sm';
    }
  };

  return (
    <div className={`relative overflow-hidden bg-gradient-to-r from-blue-900/20 to-blue-800/20 border-blue-400/30 mt-2 lg:relative backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col p-5 gap-3 bg-white/20 dark:bg-white/20 shadow-lg ${className}`}>
      
      {/* Header */}
      {showHeader && (
        <div className="flex items-center gap-4 mb-4">
          <img src={momentumIcon} alt="Momentum" className="w-12 h-12" />
          <div className="flex flex-col">
            <h3 className="font-bold text-xl text-white tracking-wide">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-300 underline cursor-pointer hover:text-white transition-colors">
                How to use
              </span>
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-400 transition-colors">
                <FaPlay className="text-white text-xs ml-0.5" />
              </div>
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              LIVE
            </div>
            </div>
          </div>
          
        </div>
      )}

      {/* Heatmap Grid - Treemap Layout */}
      <div className="flex-1 grid grid-cols-8 grid-rows-8 h-[500px] gap-0.5">
        {heatmapData.map((item, index) => (
          <div
            key={`${item.symbol}-${index}`}
            className={`
              ${getSizeClasses(item.size, index)}
              flex items-center justify-center
              text-white font-bold
              cursor-pointer
              border border-white/5
              rounded-lg
              ${hoveredItem === index ? 'border-white/20 z-10' : ''}
            `}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              background: item.direction === 'up' 
                ? `rgba(30, 224, 4, ${Math.min(0.9, Math.abs(item.momentum) / 8)})`
                : `rgba(232, 0, 0, ${Math.min(0.9, Math.abs(item.momentum) / 8)})`
            }}
          >
            <div className="text-center p-2">
              <div className="font-bold truncate text-xs lg:text-sm">{item.symbol}</div>
              {/* <div className="text-xs opacity-90">
                {item.direction === 'up' ? '+' : ''}{item.momentum.toFixed(1)}%
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs text-white/70 mt-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{backgroundColor: '#1EE004'}}></div>
            <span>Positive Momentum</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{backgroundColor: '#E80000'}}></div>
            <span>Negative Momentum</span>
          </div>
        </div>
        <div className="text-xs">
          Intensity = Momentum Strength
        </div>
      </div>
    </div>
  );
};

export default MomentumHeatmap;
