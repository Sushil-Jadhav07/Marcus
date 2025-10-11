import React from 'react';
import './Home.css';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';
import MobileTopbar from '../components/layout/MobileTopbar';
import Homearea from '../components/Home/Homearea';
import Functions from '../components/Home/Functions';
import LearnMore from '../components/Home/LearnMore';
import HomeLearnVideos from '../components/Home/HomeLearnVideos';
import FAQSection from '../components/F&Q/FAQSection';
import Marquee from '../components/MarketPulse/Marquee';
import HomeFAQTeaser from '../components/Home/HomeFAQTeaser';

const Home = () => {

  return (
    <div className='flex flex-col h-full'>
      <Navigation />
          <div className='w-full h-full flex flex-col'>
              <Topbar /> 
              <MobileTopbar />
                <div className=" h-auto lg:mt-0 mt-10">
                  <div className='h-auto overflow-hidden '>
                  <Marquee />
                  
                 
                  </div>
                  {/* <div className='h-full px-4 my-6'>
                    <CandlestickChart symbol="IBM" apiKey={process.env.REACT_APP_ALPHA_VANTAGE_KEY || '3R1UBTVGUDNS46OO'} height={420} />
                  </div> */}
                  <div className='h-full mt-10 px-5 py-5 mb-[50px] lg:mb-[100px] '>
                  <Homearea />
                  <Functions />
                  {/* <LearnMore/>
                  <HomeLearnVideos/> */}
                  <HomeFAQTeaser/>
                  </div>
                
                  {/* <MoreTools/> */}
                </div>
            </div>
    </div>
  );
};

export default Home; 