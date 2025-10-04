import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const HomeLearnVideos = () => {
  const videos = [
    { title: 'Getting started with Market Pulse' },
    { title: 'Insider Strategy in 2 minutes' },
    { title: 'Timing entries with Option Clock' },
  ]

  return (
    <div className='w-full px-5 py-5'>
      <div className=''>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='text-xl font-semibold text-black dark:text-white'>Learn videos</h3>
          {/* <Link
            to='/faq'
            className='px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-black dark:text-white hover:bg-white/20 transition-colors duration-200'
          >
            Know more
          </Link> */}
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {videos.map((v, i) => (
            <div key={i} className='group relative rounded-xl overflow-hidden border border-gray-200 dark:border-white/20 bg-white/20 dark:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300'>
              <div className='aspect-video w-full bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-fuchsia-500/20' />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='flex items-center justify-center cursor-pointer w-14 h-14 rounded-full bg-white/80 text-black group-hover:scale-110 transition-transform duration-200'>
                  <span className='text-lg'><FaPlay /></span>
                </div>
              </div>
              <div className='p-3'>
                <div className='text-sm font-medium text-black dark:text-white truncate'>{v.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeLearnVideos


