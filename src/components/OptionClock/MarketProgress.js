import React, { useEffect, useMemo, useRef, useState } from 'react';

// Market hours 09:15 to 15:30
const START_MIN = 9 * 60 + 15;
const END_MIN = 15 * 60 + 30;
const TOTAL_MIN = END_MIN - START_MIN; // 375

function minutesNow() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

const MarketProgress = ({
  className = '',
  auto = true,
  onChange,
}) => {
  const [minute, setMinute] = useState(() => clamp(minutesNow(), START_MIN, END_MIN));
  const trackRef = useRef(null);
  const isDraggingRef = useRef(false);

  const percent = useMemo(() => ((minute - START_MIN) / TOTAL_MIN) * 100, [minute]);

  // Auto progress each minute when auto is true
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setMinute((prev) => (isDraggingRef.current ? prev : clamp(prev + 1, START_MIN, END_MIN)));
    }, 60 * 1000);
    return () => clearInterval(id);
  }, [auto]);

  useEffect(() => {
    onChange?.(minute);
  }, [minute, onChange]);

  const handleFromClientX = (clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    const p = x / rect.width; // 0..1
    const m = START_MIN + Math.round(p * TOTAL_MIN);
    setMinute(clamp(m, START_MIN, END_MIN));
  };

  const onMouseDown = (e) => {
    isDraggingRef.current = true;
    handleFromClientX(e.clientX);
  };
  const onMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    handleFromClientX(e.clientX);
  };
  const onMouseUp = () => {
    isDraggingRef.current = false;
  };
  // Touch support
  const onTouchStart = (e) => {
    isDraggingRef.current = true;
    const t = e.touches[0];
    if (t) handleFromClientX(t.clientX);
  };
  const onTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const t = e.touches[0];
    if (t) handleFromClientX(t.clientX);
  };
  const onTouchEnd = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    return `${hh}:${mm}`;
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setMinute((p) => clamp(p - 1, START_MIN, END_MIN));
    if (e.key === 'ArrowRight') setMinute((p) => clamp(p + 1, START_MIN, END_MIN));
  };

  return (
    <div className={`px-1 mt-2 ${className}`}>
      <div className="relative bg-gray-200/20 lg:w-[1200px] w-[340px] rounded-2xl border-t-2 border-r-2 border-b-2 border-l-2 dark:border-t-white/60  border-t-gray-400/60 dark:border-r-white/60 border-r-gray-400/60 border-b-blue-400/60 px-2 border-l-blue-400/60 pt-2 pb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]" tabIndex={0} onKeyDown={onKeyDown}>
        <div className="flex items-center gap-3">
          <div
            ref={trackRef}
            className="relative h-3 flex-1 rounded-full bg-white/25"
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="absolute left-0 top-0 bottom-0 rounded-full bg-[#0b2a6c]"
              style={{ width: `${percent}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white"
              style={{ left: `calc(${percent}% - 1.25rem)` }}
            
            />
            <div
              className="absolute -bottom-5 -translate-x-1/2 text-[11px] font-semibold dark:text-white text-black"
              style={{ left: `${percent}%` }}
            >
              {formatTime(minute)}
            </div>
          </div>
          <button className="h-8 px-4 rounded-lg bg-[#2e6bff] text-white text-xs font-semibold shadow hover:brightness-110">GO</button>
        </div>
        <div className="absolute left-3 bottom-2 text-[11px] dark:text-white/80 text-black/80">{formatTime(START_MIN)}</div>
        <div className="absolute right-16 bottom-2 text-[11px] dark:text-white/80 text-black/80">{formatTime(END_MIN)}</div>
        
      </div>
    </div>
  );
};

export default MarketProgress;


