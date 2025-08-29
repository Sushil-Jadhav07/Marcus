import React from 'react';

// Grid-based board with explicit shapes and zero gaps between tiles
const shapeToSpans = {
  square: { col: 3, row: 1 },
  tall: { col: 3, row: 2 },
  wide: { col: 6, row: 1 },
  big: { col: 6, row: 2 },
};

const Tile = ({ name, change = 0, shape = 'square' }) => {
  const isUp = (change || 0) >= 0;
  const { col, row } = shapeToSpans[shape] || shapeToSpans.square;
  const gradStart = isUp ? '#22ff66' : '#ff3b30';
  const gradEnd = isUp ? '#14c34a' : '#b91c1c';
  return (
    <div
      className="flex items-center justify-center px-3 rounded-xl border-2 border-white/80"
      style={{
        gridColumnEnd: `span ${col}`,
        gridRowEnd: `span ${row}`,
        background: `linear-gradient(135deg, ${gradStart}, ${gradEnd})`,
      }}
    >
      <span className="text-white font-semibold text-base md:text-lg truncate w-full text-center">
        {(name || '').toUpperCase()}
      </span>
    </div>
  );
};

const StrategyBoard = ({ title, items = [], height = 500, rowHeight = 60 }) => {
  return (
    <div className="px-5 mt-4" style={{ height: `${height}px` }}>
    <h2 className="mb-3 dark:text-white text-black text-lg font-semibold tracking-wide">{title}</h2>
      <div
        className="grid"
        style={{
          gap: 0,
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          gridAutoRows: `${rowHeight}px`,
          gridAutoFlow: 'dense',
        }}
      >
        {items.map((it, idx) => (
          <Tile key={(it.name || 'item') + idx} name={it.name} change={it.change} shape={it.shape} />
        ))}
      </div>
    </div>
  );
};

export default StrategyBoard;


