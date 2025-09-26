import React, { useState } from 'react';
import { 
  Cog6ToothIcon, 
  UserIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  PaintBrushIcon,
  LanguageIcon,
  MoonIcon,
  SunIcon,
  ChevronRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { 
  Cog6ToothIcon as Cog6ToothIconSolid, 
  UserIcon as UserIconSolid, 
  BellIcon as BellIconSolid, 
  ShieldCheckIcon as ShieldCheckIconSolid, 
  PaintBrushIcon as PaintBrushIconSolid,
  LanguageIcon as LanguageIconSolid,
  MoonIcon as MoonIconSolid,
  SunIcon as SunIconSolid
} from '@heroicons/react/24/solid';
import Marquee from '../components/MarketPulse/Marquee';
import MobileTopbar from '../components/layout/MobileTopbar';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';
import AccountDetails from '../components/Auth/AccountDetails';

const Settings = () => {
  return (
    <div className='flex flex-col h-full'>
    <Navigation />
      <div className='w-full h-full flex flex-col'>
          <Topbar /> 
          <MobileTopbar />
            <div className=" h-[120vh] lg:hidden block bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% ">
            
            </div>
            <div className='lg:block h-[120vh] hidden overflow-hidden'>
              <Marquee/>
              <AccountDetails />  
            </div>
      </div>
    </div>
  );
};

export default Settings;
