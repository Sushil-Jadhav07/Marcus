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
    { title: 'Market Plus', to: '/market-pulse', icon: marketpulseIcon, desc: "The market’s heartbeat: real-time trend, momentum, and breadth at a glance.", },
    { title: 'Insider Strategy', to: '/insider-strategy', icon: insiderstrategyIcon, desc: "Decode insider buy/sell disclosures to follow where the smart money moves." },
    { title: 'Sector Scope', to: '/sector-scope', icon: sectorscopeIcon ,desc: "Compare sector strength, rotation, and risk-on/off in a clean heatmap view." },
    { title: 'Swing Spectrum', to: '/swing-spectrum', icon: swingspectrumIcon, desc: "Spot 2–10 day swing setups across volatility bands and momentum lanes." },
    { title: 'Option Clock', to: '/option-clock', icon: optionclockIcon, desc: "Time entries with IV, theta decay, and catalyst countdowns synced to the tape." },
    { title: 'Option Apex', to: '/option-apex', icon: optionapexIcon ,desc: "Surface high-conviction options plays at the peak of risk-reward." },
  ]
  return (
    <>
      <div className="w-full px-4 py-6 lg:hidden block">      
      <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
        {features.map(({ title, to, icon }) => (
            <Link
                key={to}
                to={to}
                className="relative h-[150px] backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col items-center justify-center gap-3 bg-white/20 dark:bg-white/20"
                >
                <div className="w-[75px] h-[59px] flex items-center justify-center rounded-xl">
                    <img src={icon} alt={title} className="lg:w-[71px] lg:h-[59px] w-[50px] h-[50px]" />
                </div>
                <p className="text-sm font-semibold text-black dark:text-white text-center leading-tight">{title}</p>
            </Link>
        ))}
      </div>
    </div>
    <div className='w-full px-4 py-6 lg:block hidden'>
       <div className="grid grid-cols-3 gap-6">
        {features.map(({ title, desc, to, icon }) => (
          <Link key={to} to={to} className="relative h-[286px] backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col items-start justify-start gap-3 bg-white/20 dark:bg-white/20 p-5 shadow-lg">
            <div className='flex justify-start items-center gap-3'>
              <img src={icon} alt={title} className="w-[40px] h-[45px]" />
              <p className="text-[24px] font-semibold text-black dark:text-white text-center leading-tight">{title}</p>
            </div>
            <div className='flex justify-start items-start gap-3 mt-[20px]'>
              <p className='text-[20px] w-[300px] font-normal text-black dark:text-white leading-tight'>{desc}</p>
            </div>
            <div className='backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 flex justify-center items-center dark:text-white text-[20px] text-black gap-3 mt-[20px] p-4 w-full'>
              {title}
            </div>
          </Link>
        ))}
       </div>
    </div>
    </>
  )
}

export default Functions