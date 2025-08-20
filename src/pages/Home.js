import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileNavigation from '../components/layout/MobileNavigation';
import './Home.css';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';
import MobileTopbar from '../components/layout/MobileTopbar';
import Homearea from '../components/Home/Homearea';
import { DiVim } from 'react-icons/di';
import LearMore from '../components/Home/LearnMore';
import Functions from '../components/Home/Functions';
import MoreTools from '../components/Home/MoreTools';
import LearnMore from '../components/Home/LearnMore';

const Home = () => {
 

  return (
    <div className='flex flex-col h-full'>
      <Navigation />
          <div className='w-full h-full flex flex-col'>
              <Topbar /> 
              <MobileTopbar />
                <div className=" h-full bg-gradient-to-b from-[#1e40af] from-0% via-[#1d4ed8] via-0% to-[#0D0D0D] to-60%">
                  <div className='h-full'>
                  <Homearea />
                  </div>
                  <div className='h-full'>
                  <Functions />
                  </div>
                  <div className='h-full'>
                  <LearnMore />
                  </div>
                  <div className='h-full'>
                  <MoreTools />
                  </div>
                </div>
            </div>
    </div>
  );
};

export default Home; 