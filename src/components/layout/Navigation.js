import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import { FaEllipsisH, FaTools, FaSignOutAlt, FaHome, FaChartLine, FaChartBar, FaTh } from 'react-icons/fa';

// Import icons
import marketActive from '../../asset/img/Icons/Active/marketactive.png';
import marketInactive from '../../asset/img/Icons/Inactive/marketpulse.png';
import insiderActive from '../../asset/img/Icons/Active/insideractive.png';
import insiderInactive from '../../asset/img/Icons/Inactive/insider.png';
import sectorActive from '../../asset/img/Icons/Active/sectoractive.png';
import sectorInactive from '../../asset/img/Icons/Inactive/sectorScope.png';
import swingActive from '../../asset/img/Icons/Active/swingactive.png';
import swingInactive from '../../asset/img/Icons/Inactive/swing.png';
import optionActive from '../../asset/img/Icons/Active/optionactive.png';
import optionInactive from '../../asset/img/Icons/Inactive/option.png';
import apexActive from '../../asset/img/Icons/Active/apexactive.png';
import apexInactive from '../../asset/img/Icons/Inactive/apex.png';
// Import home icon (using market icon as fallback)
import homeActive from '../../asset/img/Icons/Active/marketactive.png';
import homeInactive from '../../asset/img/Icons/Inactive/marketpulse.png';

// Custom Icon Component
const CustomIcon = ({ iconName, isActive, isHovered, className = "" }) => {
  const getIconSrc = (name, state) => {
    const iconMap = {
      'home': state ? homeActive : homeInactive,
      'market-pulse': state ? marketActive : marketInactive,
      'insider-strategy': state ? insiderActive : insiderInactive,
      'sector-scope': state ? sectorActive : sectorInactive,
      'swing-spectrum': state ? swingActive : swingInactive,
      'option-clock': state ? optionActive : optionInactive,
      'option-apex': state ? apexActive : apexInactive
    };
    
    return iconMap[iconName];
  };

  const shouldShowActive = isActive || isHovered;
  
  return (
    <img 
      src={getIconSrc(iconName, shouldShowActive)} 
      alt={iconName}
      className={`transition-all duration-300 ${className}`}
    />
  );
};

// Quick Action Icon Component for modal
const QuickActionIcon = ({ iconName, isHovered = false, className = "" }) => {
  const getQuickActionIcon = (name, shouldUseActive) => {
    const activeIconMap = {
      'home': homeActive,
      'market-pulse': marketActive,
      'insider-strategy': insiderActive,
      'sector-scope': sectorActive,
      'swing-spectrum': swingActive,
      'option-clock': optionActive,
      'option-apex': apexActive
    };

    const inactiveIconMap = {
      'home': homeInactive,
      'market-pulse': marketInactive,
      'insider-strategy': insiderInactive,
      'sector-scope': sectorInactive,
      'swing-spectrum': swingInactive,
      'option-clock': optionInactive,
      'option-apex': apexInactive
    };
    
    return shouldUseActive ? activeIconMap[name] : inactiveIconMap[name];
  };
  
  return (
    <img 
      src={getQuickActionIcon(iconName, isHovered)} 
      alt={iconName}
      className={`transition-all duration-300 ${className}`}
    />
  );
};

const Navigation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, userProfile , isAuthenticated } = useSelector((state) => state.auth);
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const [quickKey, setQuickKey] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredQuickAction, setHoveredQuickAction] = useState(null);

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
    { path: '/market-pulse', label: 'Market Pulse', iconName: 'market-pulse' },
    { path: '/insider-strategy', label: 'Insider Strategy', iconName: 'insider-strategy' },
    { path: '/sector-scope', label: 'Sector Scope', iconName: 'sector-scope' },
    { path: '/swing-spectrum', label: 'Swing Spectrum', iconName: 'swing-spectrum' },
    { path: '/option-clock', label: 'Option Clock', iconName: 'option-clock' },
    { path: '/option-apex', label: 'Option Apex', iconName: 'option-apex' }
  ];

  

  useEffect(() => {
    // Close the quick actions sheet on route change
    setIsQuickOpen(false);
    setQuickKey(null);
    setHoveredQuickAction(null);
  }, [location.pathname]);

  const keyToPath = {
    home: '/',
    pulse: '/market-pulse',
    swing: '/swing-spectrum',
    tools: '/option-clock',
    more: null
  };

  const keyToIconName = {
    home: 'home',
    pulse: 'market-pulse',
    swing: 'swing-spectrum',
    tools: 'option-clock'
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
      { to: '/', iconName: 'home', label: 'Home' },
      { to: '/market-pulse', iconName: 'market-pulse', label: 'Pulse' },
      { to: '/swing-spectrum', iconName: 'swing-spectrum', label: 'Swing' },
      { to: '/sector-scope', iconName: 'sector-scope', label: 'Sectors' },
      { to: '/insider-strategy', iconName: 'insider-strategy', label: 'Insider' },
      { to: '/option-clock', iconName: 'option-clock', label: 'Clock' },
      { to: '/option-apex', iconName: 'option-apex', label: 'Apex' }
    ],
    pulse: [
      { to: '/market-pulse', iconName: 'market-pulse', label: 'Open Pulse' },
      { to: '/sector-scope', iconName: 'sector-scope', label: 'Sectors' },
      { to: '/insider-strategy', iconName: 'insider-strategy', label: 'Insider' }
    ],
    swing: [
      { to: '/swing-spectrum', iconName: 'swing-spectrum', label: 'Open Swing' },
      { to: '/option-apex', iconName: 'option-apex', label: 'Apex' }
    ],
    tools: [
      { to: '/option-clock', iconName: 'option-clock', label: 'Open Clock' },
      { to: '/option-apex', iconName: 'option-apex', label: 'Apex' }
    ],
    more: [
      { to: '/insider-strategy', iconName: 'insider-strategy', label: 'Insider' },
      { to: '/sector-scope', iconName: 'sector-scope', label: 'Sectors' },
      { to: '/option-apex', iconName: 'option-apex', label: 'Apex' }
    ]
  };

  return (
    <>
      {/* Desktop sidebar (always open) */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 lg:w-72 bg-[#ffffff07] backdrop-blur-md border-r-2 border-white/10 dark:border-white/10 text-slate-900 dark:text-white flex-col justify-between py-6 z-[1000] shadow-sm dark:shadow-none">
        <div className="flex flex-col gap-6 w-full px-5">
          <Link to="/" className="flex items-center gap-3 px-2">
            <span className="text-2xl text-white dark:text-[#fff] font-semibold">Marcus</span>
          </Link>
          <nav className="flex-1 flex flex-col gap-1 w-full">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`group relative overflow-hidden flex items-center gap-3 px-3 py-3 rounded-xl text-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                <CustomIcon 
                  iconName={item.iconName}
                  isActive={isActive(item.path)}
                  isHovered={hoveredItem === item.path}
                  className="w-6 h-6"
                />
                <span className="relative z-10">{item.label}</span>
                <span
                  className={`absolute inset-0 -z-0 rounded-xl transition-opacity duration-300 ${
                    isActive(item.path)
                      ? 'opacity-100 bg-slate-200 dark:bg-gradient-to-r dark:from-white/10 dark:via-white/5 dark:to-white/0'
                      : 'opacity-0 group-hover:opacity-100 bg-slate-100 dark:bg-white/5'
                  }`}
                />
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 w-full px-5">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              onMouseEnter={() => setHoveredItem('logout')}
              onMouseLeave={() => setHoveredItem(null)}
              className="group relative overflow-hidden flex items-center gap-3 px-3 py-3 rounded-xl text-lg transition-all duration-300 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400/40"
            >
              <FaSignOutAlt className={`w-5 h-5 transition-all duration-300 ${
                hoveredItem === 'logout' ? 'text-red-500' : 'text-slate-600 dark:text-slate-300'
              }`} />
              <span className="relative z-10">Logout</span>
              <span
                className={`absolute inset-0 -z-0 rounded-xl transition-opacity duration-300 ${
                  hoveredItem === 'logout'
                    ? 'opacity-100 bg-red-50 dark:bg-red-900/20'
                    : 'opacity-0'
                }`}
              />
            </button>
          ) : (
            <Link
              to="/login"
              onMouseEnter={() => setHoveredItem('login')}
              onMouseLeave={() => setHoveredItem(null)}
              className="group relative overflow-hidden flex items-center justify-center gap-3 px-3 py-3 rounded-xl text-lg transition-all duration-300 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/40"
            >
              <span className="relative z-10">Sign In</span>
              <span
                className={`absolute inset-0 -z-0 rounded-xl transition-opacity duration-300 ${
                  hoveredItem === 'login'
                    ? 'opacity-100 bg-blue-50 dark:bg-blue-900/20'
                    : 'opacity-0'
                }`}
              />
            </Link>
          )}
        </div>
      </aside>

      {/* Mobile bottom nav (below md) */}
      <nav className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-xl bg-white dark:bg-[#070707] text-slate-900 dark:text-white rounded-3xl border-b-[5px] border-slate-200 dark:border-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)] px-3 pt-3 z-[1000]">
        <ul className="grid grid-cols-5 items-center">
          <li className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => openQuick('pulse')}
              className={`relative flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-2xl text-xs transition-all duration-300 ${
                isKeyActive('pulse') || (isQuickOpen && quickKey === 'pulse') ? 'text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-white/10' : 'text-slate-700 hover:text-slate-900 dark:text-white/90 dark:hover:text-white'
              }`}
            >
              <FaChartLine className={`w-6 h-6 transition-all duration-300 ${
                isKeyActive('pulse') || (isQuickOpen && quickKey === 'pulse') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-slate-800 dark:text-white'
              }`} />
              {(isKeyActive('pulse') || (isQuickOpen && quickKey === 'pulse')) && (
                <span className="absolute -bottom-1 w-4 h-2 bg-slate-300 dark:bg-white rounded-t-full" />
              )}
            </button>
          </li>
          <li className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => openQuick('swing')}
              className={`relative flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-2xl text-xs transition-all duration-300 ${
                isKeyActive('swing') || (isQuickOpen && quickKey === 'swing') ? 'text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-white/10' : 'text-slate-700 hover:text-slate-900 dark:text-white/90 dark:hover:text-white'
              }`}
            >
              <FaChartBar className={`w-6 h-6 transition-all duration-300 ${
                isKeyActive('swing') || (isQuickOpen && quickKey === 'swing') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-slate-800 dark:text-white'
              }`} />
              {(isKeyActive('swing') || (isQuickOpen && quickKey === 'swing')) && (
                <span className="absolute -bottom-1 w-4 h-2 bg-slate-300 dark:bg-white rounded-t-full" />
              )}
            </button>
          </li>
         <Link to="/">
         <li className="flex items-center justify-center">
            <button
              type="button"
              // onClick={() => openQuick('home')}
              className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
                isKeyActive('home') || (isQuickOpen && quickKey === 'home') ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-white/90 dark:hover:text-white'
              }`}
              title="Home"
            >
              <FaHome className={`w-8 h-8 transition-all duration-300 ${
                isKeyActive('home') || (isQuickOpen && quickKey === 'home') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-slate-800 dark:text-white'
              }`} />
              {(isKeyActive('home') || (isQuickOpen && quickKey === 'home')) && (
                <span className="absolute -bottom-1 w-4 h-2 bg-slate-300 dark:bg-white rounded-t-full" />
              )}
            </button>
          </li>
         </Link>
          <li className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => openQuick('tools')}
              className={`relative flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-2xl text-xs transition-all duration-300 ${
                isKeyActive('tools') || (isQuickOpen && quickKey === 'tools') ? 'text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-white/10' : 'text-slate-700 hover:text-slate-900 dark:text-white/90 dark:hover:text-white'
              }`}
              title="Tools"
            >
              <FaTools className={`w-6 h-6 transition-all duration-300 ${
                isKeyActive('tools') || (isQuickOpen && quickKey === 'tools') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-slate-800 dark:text-white'
              }`} />
              {(isKeyActive('tools') || (isQuickOpen && quickKey === 'tools')) && (
                <span className="absolute -bottom-1 w-4 h-2 bg-slate-300 dark:bg-white rounded-t-full" />
              )}
            </button>
          </li>
          <li className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => openQuick('more')}
              className={`relative flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-2xl text-xs transition-all duration-300 ${
                isQuickOpen && quickKey === 'more' ? 'text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-white/10' : 'text-slate-700 hover:text-slate-900 dark:text-white/90 dark:hover:text-white'
              }`}
              aria-label="More"
              aria-expanded={isQuickOpen && quickKey === 'more'}
            > 
              <FaTh className={`w-6 h-6 transition-all duration-300 ${
                isQuickOpen && quickKey === 'more'
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-slate-800 dark:text-white'
              }`} />
              {(isQuickOpen && quickKey === 'more') && (
                <span className="absolute -bottom-1 w-4 h-2 bg-slate-300 dark:bg-white rounded-t-full" />
              )}
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile quick actions bottom sheet with smooth open/close */}
      {/* Backdrop */}
      <button aria-label="Close quick actions"
        onClick={() => {
          setIsQuickOpen(false);
          setHoveredQuickAction(null);
        }}
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
        <div className="mx-auto mb-[8%] w-[92%] pb-10 max-w-xl rounded-3xl bg-white dark:bg-[#070707] border-b-[3px] border-slate-200 dark:border-white shadow-[0_-10px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.45)]">
          <div className="rounded-t-3xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-center py-3">
              <div className="h-1.5 w-12 rounded-full bg-slate-300 dark:bg-white/20" />
            </div>
            <div className="px-4 pb-5">
              <h3 className="text-sm text-slate-700 dark:text-slate-300 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-3">
                {(quickActionsByKey[quickKey] || []).map((item, index) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onMouseEnter={() => setHoveredQuickAction(`${quickKey}-${index}`)}
                    onMouseLeave={() => setHoveredQuickAction(null)}
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 py-4 transition-all duration-300 min-h-[80px]"
                  >
                    <div className="flex items-center justify-center h-8">
                      <QuickActionIcon 
                        iconName={item.iconName}
                        isHovered={hoveredQuickAction === `${quickKey}-${index}` || isActive(item.to)}
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                    <span className="text-[10px] text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white text-center leading-tight">{item.label}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 rounded-xl text-sm py-3 text-slate-800 dark:text-slate-200 transition-all duration-200 border border-red-200 dark:border-red-800/30 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="w-full inline-flex items-center justify-center rounded-xl text-sm py-3 text-slate-800 dark:text-slate-200 transition-all duration-200 border border-blue-200 dark:border-blue-800/30 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300"
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