import React from 'react';

const InsiderStrategyBox = ({ title, children, className = "" }) => {
  return (
    <div className={`px-5 mt-5 ${className}`}>
      <div className='bg-white/10 backdrop-blur rounded-xl border border-white/10 overflow-hidden p-6'>
        <div className='h-[470px]'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default InsiderStrategyBox;
