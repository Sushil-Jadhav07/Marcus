import React from 'react'
import { useSelector } from 'react-redux'
import bgimage from '../../asset/img/bg-circle.png'
import bgimage2 from '../../asset/img/white.png'

const Homearea = () => {
  const { user, userProfile } = useSelector((state) => state.auth || {});

  const getUserDisplayName = () => {
    if (userProfile?.firstName || userProfile?.lastName) {
      return `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim();
    }
    if (userProfile?.name) return userProfile.name;
    if (user?.displayName) return user.displayName;
    return 'Alax';
  };

  return (
    <>
      <div className='w-full lg:hidden flex flex-col justify-center items-center'>
    <div className='md:hidden flex flex-col justify-center items-center w-[90%] p-10 relative '>
       <div className='absolute dark:block hidden -top-0 left-[0px] h-full w-[100%] bg-no-repeat bg-contain z-0 bg-center' style={{backgroundImage: `url(${bgimage})`}}></div>
       <div className='absolute dark:hidden block -top-[0.5px] -left-[3px] h-[90%] w-[100%] bg-no-repeat bg-contain z-0 bg-center' style={{backgroundImage: `url(${bgimage2})`}}></div>
       <div className='flex flex-col items-center justify-start h-full pt-0 w-full z-10'>
        <h2 className='text-5xl font-bold text-white'>Welcome</h2>
        <p className='text-white text-md'>to Best Trading Platform <br className='bl lg:hidden' /> Next level Trade Product</p>
        <p className='text-white text-xs text-center mt-5'>Welcome to Marcus Platform. Track live prices, scan curated news, and visualize trends in seconds. Make every market move with clarity and confidence.</p>
       </div>
       
    </div>
    <div className='hidden md:flex flex-col justify-start w-[90%] p-10 relative '>
       {/* <div className='absolute -top-0 left-0 w-full h-full bg-contain z-0 bg-center' style={{backgroundImage: `url(${bgimage})`}}></div> */}
       <div className='flex flex-col items-center justify-start h-full pt-0 w-full z-10'>
        <h2 className='text-5xl lg:text-7xl font-bold text-white'>Welcome</h2>
        <p className='text-white text-lg lg:text-xl'>To Best Trading Platform <br className='block lg:hidden'/> Next level Trade Product</p>
        <p className='text-white lg:text-lg text-md text-center mt-5'>Welcome to Marcus Platform. Track live prices, scan curated news, and visualize trends in seconds. Make every market move with clarity and confidence.</p>
       </div>
       
    </div>
    </div>
    {/* Slim welcome banner */}
    <div className='w-full lg:block hidden px-4 mt-10'>
      <div
        className='
           flex items-center justify-between gap-6 rounded-xl
          text-white
         
        '
      >
        {/* Left: Paragraph */}
        <p className='text-[22px] leading-snug max-w-3xl opacity-90'>
        Welcome to Marcus Platform. Track live prices, scan curated news, and visualize trends in seconds. Make every market move with clarity and confidence.
        </p>

        {/* Right: Welcome + Name */}
        <div className='text-right shrink-0 pr-1'>
          <div className='text-white/70 text-lg '>Welcome</div>
          <div className='font-extrabold text-2xl leading-none'>
            {getUserDisplayName()}
          </div>
        </div>
      </div>

      <div className='flex justify-start flex-col items-start mt-5 gap-4'>
          <div className='flex justify-start items-center gap-2'>
            <h2 className='text-white text-[22px] mb-0 font-bold'>Crypto Trading</h2>
            <p className='text-white text-[20px] hover:underline cursor-pointer'>click here</p>
          </div>
          <div className='flex justify-start items-center gap-2'>
            <h2 className='text-white text-[22px] mb-0 font-bold'>FAQ Video</h2>
            <p className='text-white text-[20px] hover:underline cursor-pointer'>click here</p>
          </div>
        </div>

    </div>
    </>
  )
}

export default Homearea
