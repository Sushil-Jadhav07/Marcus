import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

const MobileTopbar = () => {
  const { user, userProfile, isAuthenticated } = useSelector((state) => state.auth);
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      
      if (storedTheme) {
        // Use stored preference
        const shouldUseDark = storedTheme === 'dark';
        setIsDark(shouldUseDark);
        document.documentElement.classList.toggle('dark', shouldUseDark);
      } else {
        // Default to dark mode only if no stored preference exists
        setIsDark(true);
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    } catch (_) {
      // Fallback to dark mode if localStorage fails
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const displayInitial = (() => {
    const name = userProfile?.name || userProfile?.firstName || user?.displayName || user?.email || 'M';
    return name?.trim()?.charAt(0)?.toUpperCase() || 'M';
  })();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (_) {
      // no-op
    }
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

  return (
    <header className="md:hidden fixed top-0 inset-x-0 z-[1100]">
      <div className="h-16 w-full bg-gradient-to-r from-[#1d4ed8] via-[#1d4ed8] to-[#1d4ed8] ">
        <div className="h-full px-4 flex items-center justify-between">
          <Link to="/">
          <div className="flex justify-center pt-4 items-center gap-3">
            <h1 className="text-white font-semibold text-lg tracking-wide">Marcus Finance</h1>
          </div>
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
            {isAuthenticated ? (
              <div className="h-9 w-9 rounded-full bg-white/20 ring-2 ring-white/40 grid place-items-center">
                <span className="text-white font-bold text-sm">{displayInitial}</span>
              </div>
            ) : (
              <Link to="/login" className="rounded-lg border border-white/30 text-white/90 hover:text-white hover:bg-white/10 px-2.5 py-1 text-sm">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileTopbar;


