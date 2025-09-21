import React, { useState } from 'react';
import { FiRefreshCw, FiHelpCircle, FiSearch } from 'react-icons/fi';
import { HiExclamationTriangle } from 'react-icons/hi2';

const SectorAnalysisBox = ({ sectorName = "ENERGY", subtitle = "Real-time Sector Analysis" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Neutral');

  // Mock data - no API calls
  const mockData = {
    high: { value: 0, percentage: 0.0 },
    low: { value: 0, percentage: 0.0 },
    performance: "Weak Performance",
    signals: []
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur rounded-xl border border-gray-600/30 overflow-hidden p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          {/* Logo with candlestick chart */}
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
          </div>
          <div>
            <h2 className="text-white font-bold text-xl">{sectorName}</h2>
            <p className="text-gray-400 text-sm">{subtitle}</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg border border-gray-600/30 transition-all duration-200">
            <FiRefreshCw className="w-4 h-4" />
            <span className="text-sm">Refresh</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-lg border border-gray-600/30 transition-all duration-200">
            <FiHelpCircle className="w-4 h-4" />
            <span className="text-sm">Help</span>
          </button>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-medium transition-all duration-200">
            LIVE
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search symbols"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
        />
      </div>

      {/* Performance Indicators */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-green-400 font-medium">High: {mockData.high.value} ({mockData.high.percentage}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-red-400 font-medium">Low: {mockData.low.value} ({mockData.low.percentage}%)</span>
          </div>
        </div>
        
        {/* Performance Bar */}
        <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden mb-3">
          <div className="h-full bg-gradient-to-r from-red-500 to-green-500 opacity-30"></div>
        </div>
        
        {/* Performance Status */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-full border border-red-600/30 transition-all duration-200">
            <HiExclamationTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">{mockData.performance}</span>
          </button>
        </div>
      </div>

      {/* Filter and Information Row */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="Neutral">Neutral</option>
            <option value="Bullish">Bullish</option>
            <option value="Bearish">Bearish</option>
          </select>
        </div>
        <div className="text-gray-400 text-sm">
          Shows latest signals with change
        </div>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-gray-700/30 rounded-full px-4 py-2 text-center">
          <span className="text-white text-sm font-medium">Symbols</span>
        </div>
        <div className="bg-gray-700/30 rounded-full px-4 py-2 text-center">
          <span className="text-white text-sm font-medium">%n+</span>
        </div>
        <div className="bg-gray-700/30 rounded-full px-4 py-2 text-center">
          <span className="text-white text-sm font-medium">Signal %</span>
        </div>
        <div className="bg-gray-700/30 rounded-full px-4 py-2 text-center">
          <span className="text-white text-sm font-medium">Time</span>
        </div>
      </div>

      {/* Data Area */}
      <div className="h-32 flex items-center justify-center">
        <div className="text-gray-400 text-lg">No data available</div>
      </div>
    </div>
  );
};

export default SectorAnalysisBox;
