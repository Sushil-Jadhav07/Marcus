import React, { useState } from 'react';
import MobileNavigation from '../components/layout/MobileNavigation';
import './Home.css';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';
import MobileTopbar from '../components/layout/MobileTopbar';
import Homearea from '../components/Home/Homearea';
import { DiVim } from 'react-icons/di';

import Functions from '../components/Home/Functions';
import LearnMore from '../components/Home/LearnMore';
import MoreTools from '../components/Home/MoreTools';

const Home = () => {
 

  return (
    <div className='flex flex-col h-full'>
      <Navigation />
          <div className='w-full h-full flex flex-col'>
              <Topbar /> 
              <MobileTopbar />
                <div className=" h-full bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% ">
                  <div className='h-full'>
                  <Homearea />
                  </div>
                  <div className='h-full'>
                  <Functions />
                  </div>
                  <LearnMore/>
                  <MoreTools/>
                </div>
            </div>
    </div>
  );
};

export default Home; 