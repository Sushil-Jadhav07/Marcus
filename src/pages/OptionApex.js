import React from 'react';

const OptionApex = () => {
  return (
    <div className="option-apex-page">
      <h1>Option Apex</h1>
      <div className="apex-overview">
        <h2>Premium Options Strategies</h2>
        <p>Advanced options strategies for sophisticated traders</p>
      </div>
      
      <div className="strategy-showcase">
        <h3>Featured Strategies</h3>
        <div className="strategy-grid">
          <div className="strategy-card">
            <h4>Iron Condor</h4>
            <div className="strategy-details">
              <p><strong>Setup:</strong> Sell OTM put + call spreads</p>
              <p><strong>Profit Zone:</strong> Between short strikes</p>
              <p><strong>Max Risk:</strong> Width of spreads</p>
              <p><strong>Best For:</strong> Low volatility markets</p>
            </div>
            <div className="strategy-metrics">
              <span className="metric">Success Rate: 78%</span>
              <span className="metric">Avg Return: 15.2%</span>
            </div>
          </div>
          
          <div className="strategy-card">
            <h4>Butterfly Spread</h4>
            <div className="strategy-details">
              <p><strong>Setup:</strong> Long 2 ATM + Short 1 OTM each side</p>
              <p><strong>Profit Zone:</strong> At center strike</p>
              <p><strong>Max Risk:</strong> Net debit</p>
              <p><strong>Best For:</strong> Directional bets</p>
            </div>
            <div className="strategy-metrics">
              <span className="metric">Success Rate: 65%</span>
              <span className="metric">Avg Return: 25.8%</span>
            </div>
          </div>
          
          <div className="strategy-card">
            <h4>Calendar Spread</h4>
            <div className="strategy-details">
              <p><strong>Setup:</strong> Sell near-term + Buy far-term</p>
              <p><strong>Profit Zone:</strong> Time decay advantage</p>
              <p><strong>Max Risk:</strong> Net debit</p>
              <p><strong>Best For:</strong> Theta harvesting</p>
            </div>
            <div className="strategy-metrics">
              <span className="metric">Success Rate: 82%</span>
              <span className="metric">Avg Return: 18.7%</span>
            </div>
          </div>
          
          <div className="strategy-card">
            <h4>Straddle</h4>
            <div className="strategy-details">
              <p><strong>Setup:</strong> Buy ATM put + call</p>
              <p><strong>Profit Zone:</strong> Large price moves</p>
              <p><strong>Max Risk:</strong> Premium paid</p>
              <p><strong>Best For:</strong> High volatility</p>
            </div>
            <div className="strategy-metrics">
              <span className="metric">Success Rate: 58%</span>
              <span className="metric">Avg Return: 35.4%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="risk-management">
        <h3>Risk Management</h3>
        <div className="risk-tips">
          <div className="tip">
            <h4>Position Sizing</h4>
            <p>Never risk more than 2% of portfolio per trade</p>
          </div>
          <div className="tip">
            <h4>Stop Losses</h4>
            <p>Set automatic exits at 50% of max profit</p>
          </div>
          <div className="tip">
            <h4>Correlation</h4>
            <p>Avoid multiple positions in same sector</p>
          </div>
          <div className="tip">
            <h4>Expiry Management</h4>
            <p>Close positions 3-5 days before expiry</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionApex; 