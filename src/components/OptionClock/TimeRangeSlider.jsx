import React, { useCallback, useMemo, useRef, useState } from 'react'

const clamp = (val, min, max) => Math.min(max, Math.max(min, val))

// minutes from 9:15 to 15:30 => 375 minutes
const DEFAULT_MINUTES_START = 9 * 60 + 15
const DEFAULT_MINUTES_END = 15 * 60 + 30

const formatTime = (totalMinutes) => {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  const pad = (n) => String(n).padStart(2, '0')
  return `${h}:${pad(m)}`
}

const TimeRangeSlider = ({
  startMinutes = DEFAULT_MINUTES_START,
  endMinutes = DEFAULT_MINUTES_END,
  value = [DEFAULT_MINUTES_START, 14 * 60],
  onChange,
  onGo,
  className = ''
}) => {
  const [range, setRange] = useState(value)
  const trackRef = useRef(null)

  const total = endMinutes - startMinutes

  const percentFromMinutes = useCallback((mins) => ((mins - startMinutes) / total) * 100, [startMinutes, total])
  const minutesFromClientX = useCallback((clientX) => {
    const rect = trackRef.current.getBoundingClientRect()
    const x = clamp(clientX - rect.left, 0, rect.width)
    const pct = x / rect.width
    const mins = Math.round(startMinutes + pct * total)
    return clamp(mins, startMinutes, endMinutes)
  }, [startMinutes, endMinutes, total])

  const startPct = percentFromMinutes(range[0])
  const endPct = percentFromMinutes(range[1])

  const ticks = useMemo(() => {
    const arr = []
    // major ticks each ~45-50 minutes to resemble the screenshot labels
    for (let m = startMinutes; m <= endMinutes; m += 15) {
      const pct = percentFromMinutes(m)
      const isMajor = (m - startMinutes) % 45 === 0
      arr.push({ pct, m, isMajor })
    }
    return arr
  }, [startMinutes, endMinutes, percentFromMinutes])

  const beginDrag = (which) => (e) => {
    e.preventDefault()
    const move = (ev) => {
      const mins = minutesFromClientX(ev.clientX)
      setRange((r) => {
        const next = which === 'start' ? [Math.min(mins, r[1] - 1), r[1]] : [r[0], Math.max(mins, r[0] + 1)]
        onChange?.(next)
        return next
      })
    }
    const up = () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className='flex-1 bg-black/10 border px-10 py-5   border-white/10 rounded-2xl p-3'>
        <div className='relative h-4' ref={trackRef}>
          <div className='absolute inset-y-0 left-0 right-0 rounded-full bg-white/20' />
          <div
            className='absolute inset-y-0 rounded-full bg-[#01228F]'
            style={{ left: `${startPct}%`, right: `${100 - endPct}%` }}
          />
          <div
            className='absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow cursor-pointer'
            style={{ left: `calc(${startPct}% - 12px)` }}
            onMouseDown={beginDrag('start')}
          />
          <div
            className='absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow cursor-pointer'
            style={{ left: `calc(${endPct}% - 12px)` }}
            onMouseDown={beginDrag('end')}
          />
        </div>
        <div className='mt-3 relative h-6'>
          {ticks.map((t, idx) => (
            <div key={idx} className='absolute' style={{ left: `${t.pct}%`, transform: 'translateX(-50%)' }}>
              <div className={`h-3 ${t.isMajor ? 'w-[2px] bg-white/80' : 'w-[1px] bg-white/40'}`} />
              {t.isMajor && (
                <div className='text-sm text-white/80 mt-1 whitespace-nowrap'>
                  {formatTime(t.m)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        type='button'
        onClick={() => onGo?.(range)}
        className='select-none px-5 py-8 rounded-2xl bg-[#2264FA] dark:hover:bg-white dark:hover:text-[#2264FA] hover:bg-white hover:text-black text-white font-semibold shadow'
      >
        Go
      </button>
    </div>
  )
}

export default TimeRangeSlider


