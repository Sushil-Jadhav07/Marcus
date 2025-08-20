import React from 'react';

const MarketPulse = () => {
  return (
    <div className="market-pulse-page">
      <h1>Market Pulse</h1>
      <div className="market-overview">
        <h2>Market Overview</h2>
        <div className="market-stats">
          <div className="stat-card">
            <h3>S&P 500</h3>
            <p className="price">4,567.89</p>
            <span className="change positive">+0.45%</span>
          </div>
          <div className="stat-card">
            <h3>NASDAQ</h3>
            <p className="price">14,234.56</p>
            <span className="change positive">+0.78%</span>
          </div>
          <div className="stat-card">
            <h3>DOW</h3>
            <p className="price">34,567.12</p>
            <span className="change negative">-0.23%</span>
          </div>
        </div>
      </div>
      
      <div className="trending-sectors">
        <h2>Trending Sectors</h2>
        <div className="sector-list">
          <div className="sector-item">
            <span className="sector-name">Technology</span>
            <span className="sector-change positive">+2.1%</span>
          </div>
          <div className="sector-item">
            <span className="sector-name">Healthcare</span>
            <span className="sector-change positive">+1.8%</span>
          </div>
          <div className="sector-item">
            <span className="sector-name">Energy</span>
            <span className="sector-change negative">-0.9%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPulse; 