
import React from 'react';

const SwingSpectrum = () => {
  return (
    <div className="swing-spectrum-page">
      <h1>Swing Spectrum</h1>
      <div className="swing-overview">
        <h2>Swing Trading Opportunities</h2>
        <p>Identify short to medium-term trading setups across different timeframes</p>
      </div>
      
      <div className="swing-signals">
        <h3>Active Swing Signals</h3>
        <div className="signal-grid">
          <div className="signal-card bullish">
            <div className="signal-header">
              <h4>AAPL</h4>
              <span className="signal-type">BULLISH</span>
            </div>
            <div className="signal-details">
              <p>Price: $175.50</p>
              <p>Target: $185.00</p>
              <p>Stop Loss: $168.00</p>
              <p>Timeframe: 3-5 days</p>
            </div>
            <div className="confidence">
              <span className="confidence-label">Confidence:</span>
              <span className="confidence-value high">85%</span>
            </div>
          </div>
          
          <div className="signal-card bearish">
            <div className="signal-header">
              <h4>TSLA</h4>
              <span className="signal-type">BEARISH</span>
            </div>
            <div className="signal-details">
              <p>Price: $245.30</p>
              <p>Target: $230.00</p>
              <p>Stop Loss: $255.00</p>
              <p>Timeframe: 2-4 days</p>
            </div>
            <div className="confidence">
              <span className="confidence-label">Confidence:</span>
              <span className="confidence-value medium">72%</span>
            </div>
          </div>
          
          <div className="signal-card bullish">
            <div className="signal-header">
              <h4>NVDA</h4>
              <span className="signal-type">BULLISH</span>
            </div>
            <div className="signal-details">
              <p>Price: $890.25</p>
              <p>Target: $920.00</p>
              <p>Stop Loss: $870.00</p>
              <p>Timeframe: 4-7 days</p>
            </div>
            <div className="confidence">
              <span className="confidence-label">Confidence:</span>
              <span className="confidence-value high">91%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="swing-metrics">
        <h3>Performance Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="metric-label">Win Rate</span>
            <span className="metric-value">68.5%</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Avg Return</span>
            <span className="metric-value">+12.3%</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Avg Hold Time</span>
            <span className="metric-value">4.2 days</span>
          </div>
          <div className="metric-item">
            <span className="metric-label">Max Drawdown</span>
            <span className="metric-value">-8.7%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwingSpectrum; 