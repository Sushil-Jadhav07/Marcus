import React from 'react';
import { Link } from 'react-router-dom';

export default function LearnMore() {
  const learningItems = ["FAQ Videos", "Strategy Video", "Trade Tutor"]

  return (
    <div className=" p-4 lg:hidden block">
      <div className="max-w-sm lg:max-w-7xl mx-auto space-y-4">
        <h2 className="dark:text-white text-black text-xl font-medium">Learning Center</h2>

        <div className="grid grid-cols-3 gap-3">
            {/* {learningItems.map((item, index) => (
              <div key={index} className="relative">
                <div className="relative backdrop-blur-lg rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/60 border-r-white/60 border-b-blue-400/60 border-l-blue-400/60 p-3 h-24 lg:h-48 flex items-end bg-white/20 dark:bg-black/20">
                  <span className="text-black dark:text-white text-sm font-medium leading-tight">{item}</span>
                </div>
              </div>
            ))} */}
        </div>

        <div className="flex justify-center mt-2">
          <Link
            to="/faq"
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-black dark:text-white hover:bg-white/20 transition-colors duration-200"
          >
            Know more
          </Link>
        </div>
      </div>
    </div>
  )
}