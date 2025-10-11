import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../store/roleSlice';
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
  const dispatch = useDispatch();
  const role = useSelector((s) => s.role?.role || 'client');
  const changeRole = (next) => dispatch(setRole(next));
  return (
    <div className='flex flex-col h-full'>
    <Navigation />
      <div className='w-full h-full flex flex-col'>
          <Topbar /> 
          <MobileTopbar />
            <div className=" h-[120vh] lg:hidden block overflow-hidden mt-10 ">
            <Marquee/>
            <AccountDetails />  
            </div>
            <div className='lg:block h-[120vh] hidden overflow-hidden'>
              <Marquee/>
              {/* <div className="max-w-3xl mx-auto mt-6 bg-white/80 dark:bg-[#0b0b0b]/70 backdrop-blur border border-white/10 rounded-2xl p-6">
                <h3 className='text-lg font-semibold text-slate-900 dark:text-white mb-3'>Role</h3>
                <div className='flex gap-3'>
                  <button onClick={() => changeRole('client')} className={`px-3 py-1.5 rounded-lg text-sm border ${role==='client' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-transparent text-slate-800 dark:text-slate-200 border-slate-300 dark:border-white/20'}`}>Client</button>
                  <button onClick={() => changeRole('admin')} className={`px-3 py-1.5 rounded-lg text-sm border ${role==='admin' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-transparent text-slate-800 dark:text-slate-200 border-slate-300 dark:border-white/20'}`}>Admin</button>
                </div>
                <p className='mt-2 text-xs text-slate-600 dark:text-white/60'>Admin can access Create User page; client cannot.</p>
              </div> */}
              <AccountDetails />  
            </div>
      </div>
    </div>
  );
};

export default Settings;
