import React from 'react';

const SectorScope = () => {
  return (
    <div className="sector-scope-page">
      <h1>Sector Scope</h1>
      <div className="sector-analysis">
        <h2>Comprehensive Sector Analysis</h2>
        <p>Deep dive into market sectors and their performance metrics</p>
      </div>
      
      <div className="sectors-overview">
        <div className="sector-category">
          <h3>Technology</h3>
          <div className="sector-details">
            <div className="performance">
              <span className="label">YTD Performance:</span>
              <span className="value positive">+18.5%</span>
            </div>
            <div className="pe-ratio">
              <span className="label">P/E Ratio:</span>
              <span className="value">28.4</span>
            </div>
            <div className="top-stocks">
              <span className="label">Top Stocks:</span>
              <span className="value">AAPL, MSFT, GOOGL</span>
            </div>
          </div>
        </div>
        
        <div className="sector-category">
          <h3>Healthcare</h3>
          <div className="sector-details">
            <div className="performance">
              <span className="label">YTD Performance:</span>
              <span className="value positive">+12.3%</span>
            </div>
            <div className="pe-ratio">
              <span className="label">P/E Ratio:</span>
              <span className="value">22.1</span>
            </div>
            <div className="top-stocks">
              <span className="label">Top Stocks:</span>
              <span className="value">JNJ, PFE, UNH</span>
            </div>
          </div>
        </div>
        
        <div className="sector-category">
          <h3>Financial</h3>
          <div className="sector-details">
            <div className="performance">
              <span className="label">YTD Performance:</span>
              <span className="value negative">-2.1%</span>
            </div>
            <div className="pe-ratio">
              <span className="label">P/E Ratio:</span>
              <span className="value">15.8</span>
            </div>
            <div className="top-stocks">
              <span className="label">Top Stocks:</span>
              <span className="value">JPM, BAC, WFC</span>
            </div>
          </div>
        </div>
        
        <div className="sector-category">
          <h3>Energy</h3>
          <div className="sector-details">
            <div className="performance">
              <span className="label">YTD Performance:</span>
              <span className="value negative">-8.7%</span>
            </div>
            <div className="pe-ratio">
              <span className="label">P/E Ratio:</span>
              <span className="value">12.3</span>
            </div>
            <div className="top-stocks">
              <span className="label">Top Stocks:</span>
              <span className="value">XOM, CVX, COP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorScope; 