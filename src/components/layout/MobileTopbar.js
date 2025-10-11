import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import logo from '../../asset/img/black.png'
import logowhite from '../../asset/img/logowhite.png'

const MobileTopbar = () => {
  const { user, userProfile, isAuthenticated } = useSelector((state) => state.auth);
  const role = useSelector((state) => state.role?.role || 'client');
  const getInitialDark = () => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light') return false;
      if (!stored) localStorage.setItem('theme', 'dark');
      return true;
    } catch (_) { return true; }
  };
  const [isDark, setIsDark] = useState(getInitialDark()); // Default to dark, reflect storage

  // no additional mount sync required

  const displayInitial = (() => {
    const name = userProfile?.name || userProfile?.firstName || user?.displayName || user?.email || 'M';
    return name?.trim()?.charAt(0)?.toUpperCase() || 'M';
  })();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (_) {}
  }, [isDark]);

  // Enhanced theme toggle function
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    try {
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newTheme);
    } catch (_) {
      // no-op
    }
  };

  // Don't render mobile topbar if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="md:hidden fixed top-0 inset-x-0 z-[1100]">
      <div className="h-20 w-full bg-gradient-to-r from-[#1d4ed8] via-[#1d4ed8] to-[#1d4ed8] ">
        <div className="h-full px-4 flex items-center justify-between">
          <Link to="/">
          <img src={logo} alt="Marcus Finance" className="w-[70px] h-[70px] dark:hidden block  " />
            <img src={logowhite} alt="Marcus Finance" className="w-[70px] h-[70px] dark:block hidden " />
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              className={`relative h-9 w-14 rounded-2xl px-2 flex items-center justify-between transition-colors duration-300 ${
                isDark ? 'bg-[#0b3aa6]' : 'bg-gray-300'
              }`}
            >
              <BsSunFill className={`text-black dark:text-white z-10 ${isDark ? 'opacity-50 ' : 'opacity-100'}`} size={12} />
              <BsMoonFill className={`text-black dark:text-white z-10 ${isDark ? 'opacity-100' : 'opacity-70'}`} size={14} />
              <span className={`absolute top-1/2 -translate-y-1/2 h-6 w-6 rounded-full dark:bg-[#1d4ed8] bg-[#fff] transition-transform text-white shadow ${isDark ? 'translate-x-5' : '-translate-x-1'}`} />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-white/20 ring-2 ring-white/40 grid place-items-center">
                <span className="text-white font-bold text-sm">{displayInitial}</span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileTopbar;

