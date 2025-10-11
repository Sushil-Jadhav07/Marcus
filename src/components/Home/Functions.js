import React from 'react'
import { Link } from 'react-router-dom'

import marketpulseIcon from '../../asset/img/functions/marketpulse.png'
import insiderstrategyIcon from '../../asset/img/functions/insiderstrategy.png'
import sectorscopeIcon from '../../asset/img/functions/sectorscope.png'
import swingspectrumIcon from '../../asset/img/functions/swing.png'
import optionclockIcon from '../../asset/img/functions/optionclock.png'
import optionapexIcon from '../../asset/img/functions/optionapex.png'

import bgimage from '../../asset/img/functions/bgbox.png'

const Functions = () => {
  const features = [
    { title: 'Market Beat', to: '/market-beat', icon: marketpulseIcon, desc: "The market’s heartbeat: real-time trend, momentum, and breadth at a glance.", },
    { title: 'Insider Analysis', to: '/insider-analysis', icon: insiderstrategyIcon, desc: "Decode insider buy/sell disclosures to follow where the smart money moves." },
    { title: 'Industry Insight', to: '/industry-insight', icon: sectorscopeIcon ,desc: "Compare industry strength, rotation, and risk-on/off in a clean heatmap view." },
    { title: 'Momentum Wave', to: '/momentum-wave', icon: swingspectrumIcon, desc: "Spot 2–10 day swing setups across volatility bands and momentum lanes." },
    { title: 'Option Clock', to: '', icon: optionclockIcon, desc: "Time entries with IV, theta decay, and catalyst countdowns synced to the tape." },
    { title: 'Option Apex', to: '', icon: optionapexIcon ,desc: "Surface high-conviction options plays at the peak of risk-reward." },
  ]
  // Dedupe by title in case of accidental duplicates
  const uniqueFeatures = Array.from(new Map(features.map((f) => [f.title, f])).values())
  // Ensure Option Clock and Option Apex are not shown first
  const orderedFeatures = [...uniqueFeatures].sort((a, b) => {
    const isAComing = a.title === 'Option Clock' || a.title === 'Option Apex'
    const isBComing = b.title === 'Option Clock' || b.title === 'Option Apex'
    if (isAComing && !isBComing) return 1
    if (!isAComing && isBComing) return -1
    return 0
  })
  return (
    <>
      <div className="w-full px-4 py-6 lg:hidden block">      
      <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
        {orderedFeatures.map(({ title, to, icon }) => {
          const isComingSoon = title === 'Option Clock' || title === 'Option Apex'
          return (
            <Link
              key={title}
              to={isComingSoon ? '#' : to}
              onClick={(e) => { if (isComingSoon) e.preventDefault() }}
              aria-disabled={isComingSoon}
              className={`relative group h-[150px] backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col items-center justify-center gap-3 bg-white/20 dark:bg-white/20 ${isComingSoon ? 'opacity-80' : ''}`}
            >
              <div className="w-[75px] h-[59px] flex items-center justify-center rounded-xl">
                <img src={icon} alt={title} className="lg:w-[71px] lg:h-[59px] w-[50px] h-[50px]" />
              </div>
              <p className="text-sm font-semibold text-black dark:text-white text-center leading-tight flex items-center gap-2">
                {title}
                {isComingSoon && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-400/90 text-black font-bold">Soon</span>
                )}
              </p>
              {isComingSoon && (
                <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-black/30 dark:bg-black/40 backdrop-blur-[2px]"></div>
                  <div className="absolute inset-0 opacity-40 bg-[linear-gradient(110deg,rgba(255,255,255,0)_40%,rgba(255,255,255,0.6)_50%,rgba(255,255,255,0)_60%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-white/90">Coming soon</span>
                  </div>
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
    <div className='w-full px-4 py-6 lg:block hidden'>
       <div className="grid grid-cols-3 gap-6">
        {orderedFeatures.map(({ title, desc, to, icon }) => {
          const isComingSoon = title === 'Option Clock' || title === 'Option Apex'
          return (
            <Link key={title} to={isComingSoon ? '#' : to} onClick={(e) => { if (isComingSoon) e.preventDefault() }} aria-disabled={isComingSoon} className="relative group backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col items-center justify-center gap-3 bg-white/20 dark:bg-white/20 p-5 shadow-lg">
              <div className='flex justify-start flex-col items-center gap-3'>
                <img src={icon} alt={title} className="w-[100px]" />
                <p className="text-[20px] font-semibold text-black dark:text-white text-center leading-tight flex items-center gap-2">{title}{isComingSoon && (<span className="text-[11px] px-2 py-0.5 rounded-full bg-white animate-pulse text-black font-bold">Coming Soon</span>)}</p>
              </div>
              <div className='flex justify-center items-center gap-3'>
                <p className='text-[15px] w-[300px] font-normal text-center text-black dark:text-white leading-tight'>{desc}</p>
              </div>
              
            </Link>
          )
        })}
       </div>
    </div>
    </>
  )
}

export default Functions