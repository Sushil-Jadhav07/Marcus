import React, { useEffect, useState } from 'react'
import GlassSelect from '../Filters/GlassSelect'
import TimeRangeSlider from './TimeRangeSlider'

const OptionArea = () => {
  const [selectedIndex, setSelectedIndex] = useState('NIFTY')
  const [indexOptions, setIndexOptions] = useState([])
  const [indexToSymbol, setIndexToSymbol] = useState({})
  const [selectedExpiry, setSelectedExpiry] = useState('2025-09-04')
  const [expiryOptions, setExpiryOptions] = useState([])
  const [timeRange, setTimeRange] = useState(null)

  useEffect(() => {
    let isMounted = true
    const loadIndices = async () => {
      try {
        const res = await fetch('http://35.208.40.158:8000/indices', { method: 'GET' })
        const data = await res.json()
        const indices = data && data.indices ? Object.keys(data.indices) : []
        const options = indices.map((k) => ({ label: k, value: k }))
        if (isMounted) {
          setIndexOptions(options)
          const mapping = {}
          indices.forEach((k) => { mapping[k] = data.indices[k].symbol })
          setIndexToSymbol(mapping)
          const defaultKey = data && data.default ? data.default : (indices[0] || 'NIFTY')
          setSelectedIndex(defaultKey)
        }
      } catch (err) {
        if (isMounted) {
          // Fallback list if API fails
          const fallback = ['NIFTY', 'BANKNIFTY', 'FINNIFTY', 'MIDCAP', 'SENSEX']
          setIndexOptions(fallback.map((k) => ({ label: k, value: k })))
          setIndexToSymbol({ NIFTY: 'NIFTY', BANKNIFTY: 'BANKNIFTY', FINNIFTY: 'FINNIFTY', MIDCAP: 'MIDCPNIFTY', SENSEX: 'SENSEX' })
          setSelectedIndex('NIFTY')
        }
      }
    }
    loadIndices()
    return () => { isMounted = false }
  }, [])

  // Format compact date like 07Dec2023 -> label "Dec-07 (W1)" and ISO value "2023-12-07"
  const toExpiryOption = (compact) => {
    const day = compact.slice(0, 2)
    const mon = compact.slice(2, 5)
    const year = compact.slice(5)
    const date = new Date(`${day} ${mon} ${year} 00:00:00 UTC`)
    const monthNumber = String(date.getUTCMonth() + 1).padStart(2, '0')
    const iso = `${year}-${monthNumber}-${day}`
    // const week = Math.floor((date.getUTCDate() - 1) / 7) + 1
    return { label: `${mon}-${day}`, value: iso }
  }

  // Load expiries when index changes
  useEffect(() => {
    if (!selectedIndex) return
    const symbol = indexToSymbol[selectedIndex] || selectedIndex
    let isMounted = true
    const loadExpiries = async () => {
      try {
        // Request a slightly wider window so October dates are included
        const res = await fetch(`http://35.208.40.158:8000/expiry-dates?symbol=${encodeURIComponent(symbol)}&months=3`, { method: 'GET' })
        const data = await res.json()
        const arr = Array.isArray(data.expiry_dates) ? data.expiry_dates : []
        // Keep only October of the current year when available
        const now = new Date()
        const targetMonth = 9 // October (0-based)
        const targetYear = now.getUTCFullYear()
        const octoberOnly = arr.filter((compact) => {
          const d = new Date(`${compact.slice(0,2)} ${compact.slice(2,5)} ${compact.slice(5)} 00:00:00 UTC`)
          return d.getUTCMonth() === targetMonth && d.getUTCFullYear() === targetYear
        })
        const source = octoberOnly.length > 0 ? octoberOnly : arr
        const opts = source.map(toExpiryOption)
        if (isMounted) {
          setExpiryOptions(opts)
          if (opts.length > 0) setSelectedExpiry(opts[0].value)
        }
      } catch (e) {
        if (isMounted) {
          setExpiryOptions([])
        }
      }
    }
    loadExpiries()
    return () => { isMounted = false }
  }, [selectedIndex, indexToSymbol])

  const formatExpiryCompact = (iso) => {
    // Expect iso like YYYY-MM-DD, output ddMonYYYY e.g., 07Dec2023
    if (!iso) return ''
    const d = new Date(`${iso}T00:00:00Z`)
    const day = String(d.getUTCDate()).padStart(2, '0')
    const mon = d.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
    const year = d.getUTCFullYear()
    return `${day}${mon}${year}`
  }

  const formatMinutesToHM = (mins) => {
    const h = Math.floor(mins / 60)
    const m = String(mins % 60).padStart(2, '0')
    return `${h}:${m}`
  }

  return (
    <div className='w-full h-full'>
      <div className='flex items-center justify-end gap-2'>
        <GlassSelect
          label="Index :"
          value={selectedIndex}
          onChange={setSelectedIndex}
          className='w-[180px] h-10 px-3 '
          options={indexOptions}
        />
        <GlassSelect
          label="Exp :"
          value={selectedExpiry}
          onChange={setSelectedExpiry}
          className='w-[200px] h-10 px-3 '
          options={expiryOptions}
        />
      </div>
      <div className='mt-5'>
        <TimeRangeSlider
          onChange={(range) => { setTimeRange(range) }}
          onGo={(range) => {
            const payload = {
              Index: selectedIndex,
              expdate: formatExpiryCompact(selectedExpiry),
              starttime: formatMinutesToHM(range?.[0] ?? 0),
              endtime: formatMinutesToHM(range?.[1] ?? 0),
            }
            console.log('OptionClock payload:', payload)
          }}
        />
      </div>

      
    </div>
  )
}

export default OptionArea