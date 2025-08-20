import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../store/authSlice';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

const Topbar = () => {
  const dispatch = useDispatch();
  const { user, userProfile, isAuthenticated } = useSelector((state) => state.auth);
  const [isDark, setIsDark] = useState(false);

  const displayInitial = (() => {
    const name = userProfile?.name || userProfile?.firstName || user?.displayName || user?.email || 'M';
    return name?.trim()?.charAt(0)?.toUpperCase() || 'M';
  })();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleLogout = () => dispatch(logoutUser());

  return (
    <header className="hidden md:block fixed top-0 inset-x-0 z-[999]">
      <div className="h-16 w-full bg-gradient-to-r from-[#1d4ed8] via-[#1d4ed8] to-[#1d4ed8] ">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex justify-center items-center gap-3">
            <h1 className="text-white font-semibold text-lg sm:text-xl tracking-wide">Marcus Finance</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark((v) => !v)}
              aria-label="Toggle theme"
              className={`relative h-10 w-16 rounded-2xl px-2 flex items-center justify-between transition-colors ${
                isDark ? 'bg-[#0b3aa6]' : 'bg-[#0b3aa6]'
              }`}
            >
              <BsSunFill className={`text-white/80 ${isDark ? 'opacity-50' : 'opacity-100'}`} size={14} />
              <BsMoonFill className={`text-white ${isDark ? 'opacity-100' : 'opacity-70'}`} size={16} />
              <span
                className={`absolute top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-white transition-transform shadow-md ${
                  isDark ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 ring-2 ring-white/40 grid place-items-center">
                  <span className="text-white font-bold">{displayInitial}</span>
                </div>
                <button onClick={handleLogout} className="rounded-lg border border-white/30 text-white/90 hover:text-white hover:bg-white/10 px-3 py-1.5 text-sm">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="rounded-lg border border-white/30 text-white/90 hover:text-white hover:bg-white/10 px-3 py-1.5 text-sm">Login</Link>
                <Link to="/signup" className="rounded-lg bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 text-sm">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
    
  );
};

export default Topbar;