import React, { useState } from 'react';
import { 
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { 
  QuestionMarkCircleIcon as QuestionMarkCircleIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  ExclamationTriangleIcon as ExclamationTriangleIconSolid,
  CheckCircleIcon as CheckCircleIconSolid,
  InformationCircleIcon as InformationCircleIconSolid
} from '@heroicons/react/24/solid';
import Navigation from '../components/layout/Navigation';
import Topbar from '../components/layout/Topbar';
import MobileTopbar from '../components/layout/MobileTopbar';
import Marquee from '../components/MarketPulse/Marquee';
import FAQSection from '../components/F&Q/FAQSection';

const FAQ = () => {
  return (
    <div className='flex flex-col h-full'>
    <Navigation />
      <div className='w-full h-full flex flex-col'>
          <Topbar /> 
          <MobileTopbar />
            <div className=" h-auto lg:hidden block bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% ">
            
            </div>
            <div className='lg:block h-auto hidden overflow-hidden'>
              <Marquee/>
              <FAQSection />
            </div>
      </div>
    </div>
  );
};

export default FAQ;
