import React from 'react';

const InsiderStrategy = () => {
  return (
    <div className="insider-strategy-page">
      <h1>Insider Strategy</h1>
      <div className="strategy-overview">
        <h2>Advanced Trading Strategies</h2>
        <p>Discover sophisticated trading approaches used by market professionals</p>
      </div>
      
      <div className="strategies-grid">
        <div className="strategy-card">
          <h3>Momentum Trading</h3>
          <p>Capitalize on strong price movements and market trends</p>
          <div className="strategy-metrics">
            <span className="metric">Success Rate: 68%</span>
            <span className="metric">Avg Return: 12.5%</span>
          </div>
        </div>
        
        <div className="strategy-card">
          <h3>Mean Reversion</h3>
          <p>Trade against extreme price movements for profit</p>
          <div className="strategy-metrics">
            <span className="metric">Success Rate: 72%</span>
            <span className="metric">Avg Return: 8.3%</span>
          </div>
        </div>
        
        <div className="strategy-card">
          <h3>Breakout Trading</h3>
          <p>Enter positions when prices break key resistance levels</p>
          <div className="strategy-metrics">
            <span className="metric">Success Rate: 65%</span>
            <span className="metric">Avg Return: 15.2%</span>
          </div>
        </div>
        
        <div className="strategy-card">
          <h3>Arbitrage</h3>
          <p>Profit from price differences across markets</p>
          <div className="strategy-metrics">
            <span className="metric">Success Rate: 85%</span>
            <span className="metric">Avg Return: 3.1%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsiderStrategy; 