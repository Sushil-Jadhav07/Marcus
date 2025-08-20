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
    { title: 'Market Plus', to: '/market-pulse', icon: marketpulseIcon },
    { title: 'Insider Strategy', to: '/insider-strategy', icon: insiderstrategyIcon },
    { title: 'Sector Scope', to: '/sector-scope', icon: sectorscopeIcon },
    { title: 'Swing Spectrum', to: '/swing-spectrum', icon: swingspectrumIcon },
    { title: 'Option Clock', to: '/option-clock', icon: optionclockIcon },
    { title: 'Option Apex', to: '/option-apex', icon: optionapexIcon },
  ]
  return (
    <div className="w-full px-4 py-6">
      <div className="grid md:grid-cols-6 grid-cols-2 gap-6">
        {features.map(({ title, to, icon }) => (
            <Link
                key={to}
                to={to}
                className="relative h-[140px] bg-gradient-to-br from-gray-600 from-10% via-gray-700 via-40% to-gray-900 to-80% rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 w-full flex flex-col items-center justify-center gap-3 bg-cover"
                
                >
                <div className="absolute top-0 left-0 w-full h-full bg-cover"></div>
                <div className="w-12 h-12 flex items-center justify-center rounded-xl">
                    <img src={icon} alt={title} className="w-7 h-7" />
                </div>
                <p className="text-sm font-semibold text-white text-center leading-tight">{title}</p>
            </Link>

        ))}
      </div>
    </div>
  )
}

export default Functions