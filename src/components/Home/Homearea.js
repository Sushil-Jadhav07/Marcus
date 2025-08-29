import React from 'react'
import bgimage from '../../asset/img/bg-circle.png'
import bgimage2 from '../../asset/img/white.png'

const Homearea = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
    <div className='md:hidden flex flex-col justify-center items-center w-[90%] p-10 relative '>
       <div className='absolute dark:block hidden -top-0 left-[0px] h-full w-[100%] bg-no-repeat bg-contain z-0 bg-center' style={{backgroundImage: `url(${bgimage})`}}></div>
       <div className='absolute dark:hidden block -top-[0.5px] -left-[3px] h-[90%] w-[100%] bg-no-repeat bg-contain z-0 bg-center' style={{backgroundImage: `url(${bgimage2})`}}></div>
       <div className='flex flex-col items-center justify-start h-full pt-0 w-full z-10'>
        <h2 className='text-5xl font-bold text-white'>Welcome</h2>
        <p className='text-white text-md'>to Best Trading Platform <br /> Next level Trade Product</p>
        <p className='text-white text-xs text-center   mt-5'>Lorem ipsum dolor sit amet, consectetur   adipiscing        elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat.</p>
       </div>
       
    </div>
    <div className='hidden md:flex flex-col justify-start w-[90%] p-10 relative '>
       {/* <div className='absolute -top-0 left-0 w-full h-full bg-contain z-0 bg-center' style={{backgroundImage: `url(${bgimage})`}}></div> */}
       <div className='flex flex-col items-center justify-start h-full pt-0 w-full z-10'>
        <h2 className='text-5xl font-bold text-white'>Welcome</h2>
        <p className='text-white text-lg'>to Best Trading Platform <br /> Next level Trade Product</p>
        <p className='text-white text-md text-center mt-5'>Lorem ipsum dolor sit amet, consectetur   adipiscing        elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat.</p>
       </div>
       
    </div>
    </div>
  )
}

export default Homearea