import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import { FaEllipsisH, FaTools, FaHome, FaChartLine, FaChartBar, FaTh } from 'react-icons/fa';
import { 
  Cog6ToothIcon, 
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

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
import createUserActive from '../../asset/img/Icons/Active/FIIactive.png';
import createUserInactive from '../../asset/img/Icons/Inactive/FII.png';
import userListActive from '../../asset/img/Icons/Active/insideractive.png';
import userListInactive from '../../asset/img/Icons/Inactive/insider.png';
// Import home icon (using market icon as fallback)
import homeActive from '../../asset/img/Icons/Active/marketactive.png';
import homeInactive from '../../asset/img/Icons/Inactive/marketpulse.png';

import logo from '../../asset/img/black.png'
import logowhite from '../../asset/img/logowhite.png'

// Custom Icon Component
const CustomIcon = ({ iconName, isActive, isHovered, className = "" }) => {
  const getIconSrc = (name, state) => {
    const iconMap = {
      'home': state ? homeActive : homeInactive,
      'market-beat': state ? marketActive : marketInactive,
      'insider-analysis': state ? insiderActive : insiderInactive,
      'industry-insight': state ? sectorActive : sectorInactive,  
      'momentum-wave': state ? swingActive : swingInactive,
      'option-clock': state ? optionActive : optionInactive,
      'option-apex': state ? apexActive : apexInactive,
      'create-user': state ? createUserActive : createUserInactive,
      'user-list': state ? userListActive : userListInactive
    };
    
    return iconMap[name];
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
  // Support heroicons for FAQ and Settings
  if (iconName === 'faq') {
    return (
      <QuestionMarkCircleIcon
        className={`transition-all duration-300 ${isHovered ? 'text-blue-200' : 'text-slate-600 dark:text-slate-300'} ${className}`}
      />
    );
  }
  if (iconName === 'settings') {
    return (
      <Cog6ToothIcon
        className={`transition-all duration-300 ${isHovered ? 'text-blue-200' : 'text-slate-600 dark:text-slate-300'} ${className}`}
      />
    );
  }

  const getQuickActionIcon = (name, shouldUseActive) => {
    const activeIconMap = {
      'home': homeActive,
      'market-beat': marketActive,
      'insider-analysis': insiderActive,
      'industry-insight': sectorActive,
      'momentum-wave': swingActive,
      'option-clock': optionActive,
      'option-apex': apexActive,
      'create-user': createUserActive,
      'user-list': userListActive
    };

    const inactiveIconMap = {
      'home': homeInactive,
      'market-beat': marketInactive,
      'insider-analysis': insiderInactive,
      'industry-insight': sectorInactive,
      'momentum-wave': swingInactive,
      'option-clock': optionInactive,
      'option-apex': apexInactive,
      'create-user': createUserInactive,
      'user-list': userListInactive
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
  const dispatch = useDispatch();
  const location = useLocation();
    const { user, userProfile , isAuthenticated } = useSelector((state) => state.auth);
    const role = userProfile?.role || 'client';
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const [quickKey, setQuickKey] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredQuickAction, setHoveredQuickAction] = useState(null);
  const [showMobileBar, setShowMobileBar] = useState(true);
  const lastScrollYRef = useRef(0);

  const navigate = useNavigate();
  const isActive = (path) => {
    return location.pathname === path;
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

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      // Optional: redirect to login page or home
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItemsBase = [
    { path: '/market-beat', label: 'Market Beat', iconName: 'market-beat' },
    { path: '/insider-analysis', label: 'Insider Analysis', iconName: 'insider-analysis' },
    { path: '/industry-insight', label: 'Industry Insight', iconName: 'industry-insight' },
    { path: '/momentum-wave', label: 'Momentum Wave', iconName: 'momentum-wave' },
    { path: '/option-clock', label: 'Option Clock', iconName: 'option-clock', comingSoon: true },
    { path: '/option-apex', label: 'Option Apex', iconName: 'option-apex', comingSoon: true }
  ];

  const navItems = role === 'admin'
    ? [
        ...navItemsBase,
        { path: '/create-user', label: 'Create User', iconName: 'create-user' },
        { path: '/user-list', label: 'User List', iconName: 'user-list' },
      ]
    : navItemsBase;

  

  useEffect(() => {
    // Close the quick actions sheet on route change
    setIsQuickOpen(false);
    setQuickKey(null);
    setHoveredQuickAction(null);
    // Scroll to top on route change (desktop and mobile)
    window.scrollTo(0, 0);
    try {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } catch (_) {}
  }, [location.pathname]);

  // Mobile bottom bar: show on scroll down, hide on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const isScrollingDown = y > lastScrollYRef.current;
      setShowMobileBar(!isScrollingDown || y < 10);
      lastScrollYRef.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const keyToPath = {
    home: '/',
    pulse: '/market-beat',
    swing: '/momentum-wave',
    tools: '/option-clock',
    more: null
  };

  const keyToIconName = {
    home: 'home',
    pulse: 'market-beat',
    swing: 'momentum-wave',
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

  // Create quick actions based on role
  const createQuickActions = () => {
    // Common links available to everyone (used in Home sheet if needed)
    const commonHome = [
      { to: '/', iconName: 'home', label: 'Home' },
      { to: '/market-beat', iconName: 'market-beat', label: 'Market Beat' },
      { to: '/insider-analysis', iconName: 'insider-analysis', label: 'Insider Analysis' },
      { to: '/momentum-wave', iconName: 'momentum-wave', label: 'Momentum Wave' },
      { to: '/industry-insight', iconName: 'industry-insight', label: 'Industry Insight' }
    ];

    // Base groupings requested for mobile bottom sheet
    const base = {
      pulse: [
        { to: '/market-beat', iconName: 'market-beat', label: 'Market Beat' },
        { to: '/insider-analysis', iconName: 'insider-analysis', label: 'Insider Analysis' }
      ],
      swing: [
        { to: '/momentum-wave', iconName: 'momentum-wave', label: 'Momentum Wave' },
        { to: '/industry-insight', iconName: 'industry-insight', label: 'Industry Insight' }
      ],
      more: [
        { to: '/option-clock', iconName: 'option-clock', label: 'Option Clock', comingSoon: true },
        { to: '/option-apex', iconName: 'option-apex', label: 'Option Apex', comingSoon: true }
      ],
      toolsCommon: [
        { to: '/faq', iconName: 'faq', label: 'FAQ' },
        { to: '/settings', iconName: 'settings', label: 'Settings' }
      ]
    };

    if (role === 'admin') {
      // Admin: Tools include Create/User List + FAQ/Settings; More shows coming soon options
      return {
        home: [
          ...commonHome,
        ],
        pulse: base.pulse,
        swing: base.swing,
        tools: [
          { to: '/create-user', iconName: 'create-user', label: 'Create User' },
          { to: '/user-list', iconName: 'user-list', label: 'User List' },
          ...base.toolsCommon,
        ],
        more: base.more,
      };
    }

    // Non-admin: Tools show FAQ/Settings only; More shows coming soon options
    return {
      home: [
        ...commonHome,
      ],
      pulse: base.pulse,
      swing: base.swing,
      tools: [
        ...base.toolsCommon,
      ],
      more: base.more,
    };
  };

  const quickActionsByKey = createQuickActions();

  // Don't render navigation if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Desktop sidebar (always open) */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 lg:w-72 bg-[#ffffff07] backdrop-blur-md border-r-2 border-white/10 dark:border-white/10 text-slate-900 dark:text-white flex-col justify-between py-6 z-[1000] shadow-sm dark:shadow-none overflow-y-auto scrollbar-hide">
        <div className="flex flex-col gap-6 w-full px-5">
          <Link to="/" className="flex items-center gap-3 px-2">
            {/* <span className="text-2xl text-white dark:text-[#fff] font-semibold">Marcus</span> */}
            <img src={logo} alt="Marcus Finance" className="w-[150px] h-[150px] dark:hidden block  " />
            <img src={logowhite} alt="Marcus Finance" className="w-[150px] h-[150px] dark:block hidden " />
          </Link>
          <nav className="flex-1 flex flex-col gap-1 w-full">
            {navItems.map((item) => (
              item.comingSoon ? (
                <div
                  key={item.path}
                  className="group relative overflow-hidden flex flex-col gap-1 px-3 py-3 rounded-xl text-lg transition-all duration-300 opacity-60 cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <CustomIcon 
                      iconName={item.iconName}
                      isActive={false}
                      isHovered={false}
                      className="w-6 h-6"
                    />
                    <span className="relative z-10">{item.label}</span>
                  </div>
                  <span className="text-xs text-red-400 animate-pulse font-medium ml-9">
                    Coming Soon
                  </span>
                </div>
              ) : (
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
              )
            ))}
          </nav>
        </div>
        <div className="flex gap-2 w-full px-5 mt-20">
          {/* FAQ Box */}
          <Link
            to="/faq"
            onMouseEnter={() => setHoveredItem('faq')}
            onMouseLeave={() => setHoveredItem(null)}
            className="group relative overflow-hidden border-[1px] border-[#ccc] flex items-center justify-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/10"
            title="FAQ"
          >
            <QuestionMarkCircleIcon className={`w-5 h-5 transition-all duration-300 ${
              hoveredItem === 'faq' ? 'text-blue-200' : 'text-slate-600 dark:text-slate-300'
            }`} />
          </Link>

          {/* Settings Box */}
          <Link
            to="/settings"
            onMouseEnter={() => setHoveredItem('settings')}
            onMouseLeave={() => setHoveredItem(null)}
            className="group relative overflow-hidden border-[1px] border-[#ccc] flex items-center justify-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 hover:bg-slate-100 dark:hover:bg-white/10"
            title="Settings"
          >
            <Cog6ToothIcon className={`w-5 h-5 transition-all duration-300 ${
              hoveredItem === 'settings' ? 'text-blue-200' : 'text-slate-600 dark:text-slate-300'
            }`} />
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            onMouseEnter={() => setHoveredItem('logout')}
            onMouseLeave={() => setHoveredItem(null)}
            className="group relative overflow-hidden border-[1px] border-[#ccc] flex items-center justify-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className={`w-5 h-5 transition-all duration-300 ${
              hoveredItem === 'logout' ? 'text-red-500' : 'text-slate-600 dark:text-slate-300'
            }`} />
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav (below md) */}
      <nav className={`md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 w-[92%] max-w-xl bg-white dark:bg-[#070707] text-slate-900 dark:text-white rounded-3xl border-b-[5px] border-[#000000/20]  dark:border-white shadow-[0_12px_40px_#000000/18] dark:shadow-[0_12px_40px_#000000/5] ring-1 ring-black/5 dark:ring-white/10 px-3 pt-3 z-[1000] transition-transform duration-300 ${showMobileBar ? 'translate-y-0' : 'translate-y-[140%]'}`}>
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
        <div className="mx-auto mb-[8%] w-[92%] pb-10 max-w-xl rounded-3xl bg-white/90 dark:bg-[#070707] border-b-[3px] border-slate-200 dark:border-white shadow-[0_-10px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.45)]">
          <div className="rounded-t-3xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-center py-3">
              <div className="h-1.5 w-12 rounded-full bg-slate-300 dark:bg-white/20" />
            </div>
            <div className="px-4 pb-5">
              <h3 className="text-sm text-slate-700 dark:text-slate-300 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-3">
                {(quickActionsByKey[quickKey] || []).map((item, index) => (
                  item.comingSoon ? (
                    <div
                      key={item.to}
                      className="group flex flex-col items-center justify-center gap-1 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 py-4 transition-all duration-300 min-h-[80px] opacity-60 cursor-not-allowed"
                    >
                      <span className="text-[8px] text-red-400 animate-pulse font-medium">
                        Coming Soon
                      </span>
                      <div className="flex items-center justify-center h-8">
                        <QuickActionIcon 
                          iconName={item.iconName}
                          isHovered={false}
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                      <span className="text-[10px] text-slate-700 dark:text-slate-300 text-center leading-tight">{item.label}</span>
                    </div>
                  ) : (
                    <Link
                      key={item.to}
                      to={item.to}
                      onMouseEnter={() => setHoveredQuickAction(`${quickKey}-${index}`)}
                      onMouseLeave={() => setHoveredQuickAction(null)}
                      className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white bg-black/10 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 py-4 px-2 transition-all duration-300 min-h-[80px]"
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
                  )
                ))}
              </div>
              
              {/* Logout Button for Mobile */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation; 
