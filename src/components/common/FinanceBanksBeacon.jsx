import React from 'react';
import BreakoutBeacon from './BreakoutBeacon';

const buildSubscribePayload = ({ sector, nseOnly }) => ({
  action: 'subscribe',
  channel: 'sector-signals',
  exchange: nseOnly ? 'NSE' : 'ALL',
  sector,
});

const parseMessage = (data) => {
  // Expecting data.items: [{ symbol, direction, signalPercent, timeLabel }]
  return data && data.items ? data.items : [];
};

const FinanceBanksBeacon = () => {
  const staticRows = Array.from({ length: 10 }).map((_, i) => ({
    symbol: `FINSYM${i + 1}`,
    direction: i % 2 === 0 ? 'up' : 'down',
    signalPercent: `${(Math.random() * 5 + 0.5).toFixed(2)}%`,
    timeLabel: '—',
  }));
  const sliced = staticRows.slice(4, 10);
  return (
    <BreakoutBeacon title="Breakout Beacon" data={sliced} />
  );
};

export default FinanceBanksBeacon;


