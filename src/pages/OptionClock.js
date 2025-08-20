import React from 'react';

const OptionClock = () => {
  return (
    <div className="option-clock-page">
      <h1>Option Clock</h1>
      <div className="clock-overview">
        <h2>Options Trading Timing</h2>
        <p>Master the art of timing in options trading with precision</p>
      </div>
      
      <div className="timing-indicators">
        <h3>Market Timing Indicators</h3>
        <div className="indicator-grid">
          <div className="indicator-card">
            <h4>Volatility Index (VIX)</h4>
            <div className="indicator-value">
              <span className="current">18.5</span>
              <span className="change positive">+2.3</span>
            </div>
            <p className="interpretation">Low volatility - favorable for selling options</p>
          </div>
          
          <div className="indicator-card">
            <h4>Put-Call Ratio</h4>
            <div className="indicator-value">
              <span className="current">0.85</span>
              <span className="change negative">-0.12</span>
            </div>
            <p className="interpretation">Moderate bearish sentiment</p>
          </div>
          
          <div className="indicator-card">
            <h4>Gamma Exposure</h4>
            <div className="indicator-value">
              <span className="current">High</span>
              <span className="status">Active</span>
            </div>
            <p className="interpretation">High gamma - expect price swings</p>
          </div>
        </div>
      </div>
      
      <div className="optimal-timing">
        <h3>Optimal Entry Times</h3>
        <div className="timing-schedule">
          <div className="time-slot">
            <div className="time">9:30 AM - 10:00 AM</div>
            <div className="activity">Market Open Volatility</div>
            <div className="strategy">Sell premium, collect theta</div>
          </div>
          
          <div className="time-slot">
            <div className="time">11:00 AM - 2:00 PM</div>
            <div className="activity">Midday Consolidation</div>
            <div className="strategy">Iron condors, straddles</div>
          </div>
          
          <div className="time-slot">
            <div className="time">3:00 PM - 4:00 PM</div>
            <div className="activity">Closing Rush</div>
            <div className="strategy">Scalp quick moves</div>
          </div>
        </div>
      </div>
      
      <div className="expiry-analysis">
        <h3>Expiry Analysis</h3>
        <div className="expiry-grid">
          <div className="expiry-option">
            <h4>Weekly Options</h4>
            <p>High theta decay, quick profits</p>
            <span className="risk-level">High Risk</span>
          </div>
          
          <div className="expiry-option">
            <h4>Monthly Options</h4>
            <p>Balanced theta and gamma</p>
            <span className="risk-level">Medium Risk</span>
          </div>
          
          <div className="expiry-option">
            <h4>Quarterly Options</h4>
            <p>Lower theta, higher premiums</p>
            <span className="risk-level">Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionClock; 