import React from 'react';

export default function LearnMore() {
  const learningItems = ["FAQ Videos", "Strategy Video", "Trade Tutor"]

  return (
    <div className="min-h-[100px] bg-black p-4">
      <div className="max-w-sm mx-auto space-y-4">
        <h2 className="text-white text-xl font-medium">Learning Center</h2>

        <div className="grid grid-cols-3 gap-3">
          {learningItems.map((item, index) => (
            <div key={index} className="relative">
              {/* Blue glow effect */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-sm"></div>

              {/* Main card */}
              <div className="relative bg-gradient-to-br from-gray-600 from-0% via-gray-700 via-40% to-gray-900 to-100% rounded-xl border-t-2 border-r-2 border-b-2 border-l-2 border-t-white/40 border-r-white/40 border-b-blue-400/40 border-l-blue-400/40 p-3 h-24 flex items-end">
                <span className="text-white text-sm font-medium leading-tight">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}