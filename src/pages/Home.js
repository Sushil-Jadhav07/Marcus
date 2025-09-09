import React from 'react';
import './Home.css';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';
import MobileTopbar from '../components/layout/MobileTopbar';
import Homearea from '../components/Home/Homearea';
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
                <div className=" h-full ">
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