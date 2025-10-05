import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

const Topbar = () => {
  const { user, userProfile, isAuthenticated } = useSelector((state) => state.auth);
  const role = useSelector((state) => state.role?.role || 'client');
  const getInitialDark = () => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light') return false;
      // seed to dark if missing
      if (!stored) localStorage.setItem('theme', 'dark');
      return true;
    } catch (_) {
      return true;
    }
  };
  const [isDark, setIsDark] = useState(getInitialDark());
  const [scrollY, setScrollY] = useState(0);

  // no mount-time mutation needed; initial state already reflects localStorage

  const displayInitial = (() => {
    const name = userProfile?.name || userProfile?.firstName || user?.displayName || user?.email || 'M';
    return name?.trim()?.charAt(0)?.toUpperCase() || 'M';
  })();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (_) {}
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // No auth modal -> no overflow handling

  // Auth actions removed

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

  // Market data fetching
  

  // Calculate blur intensity based on scroll position
  const getBlurIntensity = () => {
    const maxScroll = 200; // Maximum scroll distance for full blur effect
    const blurIntensity = Math.min(scrollY / maxScroll, 1);
    return blurIntensity;
  };

  // Calculate background opacity based on scroll position
  const getBackgroundOpacity = () => {
    const maxScroll = 100; // Scroll distance for full background opacity
    const opacity = Math.min(scrollY / maxScroll, 0.95);
    return opacity;
  };

  // Don't render topbar if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <header 
      className="hidden md:block fixed top-0 inset-x-0 z-[999] transition-all duration-300 ease-out"
      style={{
        backdropFilter: `blur(${8 + getBlurIntensity() * 12}px)`,
        WebkitBackdropFilter: `blur(${8 + getBlurIntensity() * 12}px)`,
        backgroundColor: isDark 
          ? `rgba(0, 0, 0, ${getBackgroundOpacity() * 0.3})` 
          : `rgba(255, 255, 255, ${getBackgroundOpacity() * 0.2})`,
        borderBottom: scrollY > 50 
          ? isDark 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.1)' 
          : 'none',
        boxShadow: scrollY > 50 
          ? isDark 
            ? '0 4px 20px rgba(0, 0, 0, 0.3)' 
            : '0 4px 20px rgba(0, 0, 0, 0.1)' 
          : 'none'
      }}
    >
      <div className="h-16 w-full bg-transparent">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-end">
          
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 ${
                isDark ? 'bg-[#0b3aa6] text-white shadow-lg' : 'bg-white/20 text-black shadow-md'
              }`}
            >
              {isDark ? <BsMoonFill size={16} /> : <BsSunFill size={16} />}
            </button>

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-black/10 dark:bg-white/20 ring-2 ring-black/10 dark:ring-white/40 grid place-items-center">
                <span className="text-slate-900 dark:text-white font-bold">{displayInitial}</span>
              </div>
              {/* <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 capitalize">{role}</span> */}
            </div>
          </div>
        </div>
      </div>
    </header>
    
  );
};

export default Topbar;
