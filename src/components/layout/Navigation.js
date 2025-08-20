import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import { AiFillSignal } from "react-icons/ai";
import { IoTrendingUpOutline } from 'react-icons/io5';
import { GoHomeFill } from 'react-icons/go';
import { FaEllipsisH, FaTools } from 'react-icons/fa';

const Navigation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, userProfile , isAuthenticated } = useSelector((state) => state.auth);
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const [quickKey, setQuickKey] = useState(null);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Get user display name or email
  const getUserDisplayName = () => {
    if (userProfile?.firstName || userProfile?.lastName) {
      return `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim();
    }
    if (userProfile?.name) {
      return userProfile.name;
    }
    if (user?.displayName) {
      return user.displayName;
    }
    return user?.email ? user.email.split('@')[0] : 'User';
  };

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/market-pulse', label: 'Market Pulse', icon: '📈' },
    { path: '/insider-strategy', label: 'Insider', icon: '🎯' },
    { path: '/sector-scope', label: 'Sectors', icon: '🔍' },
    { path: '/swing-spectrum', label: 'Swing', icon: '📊' },
    { path: '/option-clock', label: 'Clock', icon: '⏰' },
    { path: '/option-apex', label: 'Apex', icon: '⭐' }
  ];

  

  useEffect(() => {
    // Close the quick actions sheet on route change
    setIsQuickOpen(false);
    setQuickKey(null);
  }, [location.pathname]);

  const keyToPath = {
    home: '/',
    pulse: '/market-pulse',
    swing: '/swing-spectrum',
    tools: '/option-clock',
    more: null
  };

  const isKeyActive = (key) => {
    const p = keyToPath[key];
    return p ? isActive(p) : false;
  };

  const openQuick = (key) => {
    setQuickKey(key);
    setIsQuickOpen(true);
  };

  const quickActionsByKey = {
    home: [
      { to: '/', icon: '🏠', label: 'Home' },
      { to: '/market-pulse', icon: '📈', label: 'Pulse' },
      { to: '/swing-spectrum', icon: '📊', label: 'Swing' },
      { to: '/sector-scope', icon: '🔍', label: 'Sectors' },
      { to: '/insider-strategy', icon: '🎯', label: 'Insider' },
      { to: '/option-clock', icon: '⏰', label: 'Clock' },
      { to: '/option-apex', icon: '⭐', label: 'Apex' }
    ],
    pulse: [
      { to: '/market-pulse', icon: '📈', label: 'Open Pulse' },
      { to: '/sector-scope', icon: '🔍', label: 'Sectors' },
      { to: '/insider-strategy', icon: '🎯', label: 'Insider' }
    ],
    swing: [
      { to: '/swing-spectrum', icon: '📊', label: 'Open Swing' },
      { to: '/option-apex', icon: '⭐', label: 'Apex' }
    ],
    tools: [
      { to: '/option-clock', icon: '⏰', label: 'Open Clock' },
      { to: '/option-apex', icon: '⭐', label: 'Apex' }
    ],
    more: [
      { to: '/insider-strategy', icon: '🎯', label: 'Insider' },
      { to: '/sector-scope', icon: '🔍', label: 'Sectors' },
      { to: '/option-apex', icon: '⭐', label: 'Apex' }
    ]
  };

  return (
    <>
      {/* Desktop sidebar (md and up) */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 lg:w-24 bg-slate-950 text-white flex-col items-center justify-between py-6 z-[1000] bg-[#070707]">
        <div className="flex flex-col items-center gap-6 w-full">
          <Link to="/" className="text-xl font-bold tracking-wide" title="Marcus Finance">
            MF
          </Link>
          <nav className="flex-1 flex flex-col items-center gap-2 w-full">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                title={item.label}
                className={`flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl lg:text-2xl" aria-hidden>
                  {item.icon}
                </span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col items-center gap-2 w-full px-2">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="w-full rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm py-2 text-slate-200 transition"
            >
              Logout
            </button>
          )}
          {!isAuthenticated && (
            <Link
              to="/login"
              className="w-full text-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm py-2 text-slate-200 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </aside>

      {/* Mobile bottom nav (below md) */}
      <nav className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-xl bg-[#070707] text-white rounded-3xl border-b-[5px] border-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] px-3 pt-3 z-[1000]">
        <ul className="grid grid-cols-5 items-center">
          <li className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => openQuick('pulse')}
              className={`relative flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-2xl text-xs ${
                isKeyActive('pulse') || (isQuickOpen && quickKey === 'pulse') ? 'text-blue-400 bg-white/10' : 'text-white/90 hover:text-white'
              }`}
            >
              <span className="text-xl" aria-hidden><IoTrendingUpOutline   className={`${isKeyActive('pulse') || (isQuickOpen && quickKey === 'pulse') ? 'text-[#1D55F1]' : 'text-[#fff]'}`} /></span>
              {(isKeyActive('pulse') || (isQuickOpen && quickKey === 'pulse')) && (
                <span className="absolute -bottom-1 w-4 h-2 bg-white rounded-t-full" />
              )}
            </button>
          </li>
          <li className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => openQuick('swing')}
              className={`relative flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-2xl text-xs ${
                isKeyActive('swing') || (isQuickOpen && quickKey === 'swing') ? 'text-blue-400 bg-white/10' : 'text-white/90 hover:text-white'
              }`}
            >
              <span className="text-xl" aria-hidden><AiFillSignal className={`${isKeyActive('swing') || (isQuickOpen && quickKey === 'swing') ? 'text-[#1D55F1]' : 'text-[#fff]'}`} /></span>
              {(isKeyActive('swing') || (isQuickOpen && quickKey === 'swing')) && (
                <span className="absolute -bottom-1 w-4 h-2 bg-white rounded-t-full" />
              )}
            </button>
          </li>
         <Link to="/">
         <li className="flex items-center justify-center">
            <button
              type="button"
              // onClick={() => openQuick('home')}
              className={`relative flex items-center justify-center w-12 h-12 rounded-2xl ${
                isKeyActive('home') || (isQuickOpen && quickKey === 'home') ? 'text-blue-400' : 'text-white/90 hover:text-white'
              }`}
              title="Home"
            >
              <span className="text-3xl" aria-hidden><GoHomeFill className={`${isKeyActive('home') || (isQuickOpen && quickKey === 'home') ? 'text-[#1D55F1]' : 'text-[#fff]'}`} /></span>
              {(isKeyActive('home') || (isQuickOpen && quickKey === 'home')) && (
                <span className="absolute -bottom-1 w-4 h-2 bg-white rounded-t-full" />
              )}
            </button>
          </li>
         </Link>
          <li className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => openQuick('tools')}
              className={`relative flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-2xl text-xs ${
                isKeyActive('tools') || (isQuickOpen && quickKey === 'tools') ? 'text-blue-400 bg-white/10' : 'text-white/90 hover:text-white'
              }`}
              title="Tools"
            >
              <span className="text-xl " aria-hidden><FaTools className='text-[#fff]' /></span>
              {(isKeyActive('tools') || (isQuickOpen && quickKey === 'tools')) && (
                <span className="absolute -bottom-1 w-4 h-2 bg-white rounded-t-full" />
              )}
            </button>
          </li>
          <li className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => openQuick('more')}
              className="relative flex items-center justify-center px-2 py-1 rounded-xl text-white/90 hover:text-white text-xl"
              aria-label="More"
              aria-expanded={isQuickOpen && quickKey === 'more'}
            > 
              <span className="text-xl bg-white rounded-lg py-1 px-2" aria-hidden><FaEllipsisH className='text-[#070707]' /></span>
              {(isQuickOpen && quickKey === 'more') && (
                <span className="absolute -bottom- w-4 h-2 bg-white rounded-t-full" />
              )}
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile quick actions bottom sheet with smooth open/close */}
      {/* Backdrop */}
      <button aria-label="Close quick actions"
        onClick={() => setIsQuickOpen(false)}
        className={`fixed inset-0 md:hidden z-[999] bg-black/30 transition-opacity duration-300 ${
          isQuickOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      {/* Sheet */}
      <div
        className={`fixed inset-x-0 bottom-[0%] md:hidden z-[999] transition-transform duration-300 ${
          isQuickOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mx-auto mb-[8%] w-[92%] pb-10 max-w-xl rounded-3xl bg-[#070707] border-b-[3px] border-white shadow-[0_-10px_30px_rgba(0,0,0,0.45)]">
          <div className="rounded-t-3xl bg-slate-950 text-white border-t border-white/10">
            <div className="flex items-center justify-center py-3">
              <div className="h-1.5 w-12 rounded-full bg-white/20" />
            </div>
            <div className="px-4 pb-5">
              <h3 className="text-sm text-slate-300 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-3">
                {(quickActionsByKey[quickKey] || []).map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 py-3 transition"
                  >
                    <span className="text-lg" aria-hidden>{item.icon}</span>
                    <span className="text-[10px] text-slate-300 group-hover:text-white text-center">{item.label}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm py-2 text-slate-200 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="w-full inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm py-2 text-slate-200 transition"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation; 