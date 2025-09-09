import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, loginWithEmail, loginWithGoogle } from '../../store/authSlice';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { LuLogOut } from 'react-icons/lu';
import { InlineLoader, ButtonLoader } from '../common/Loader';

const Topbar = () => {
  const dispatch = useDispatch();
  const { user, userProfile, isAuthenticated, loading } = useSelector((state) => state.auth);
  const [isDark, setIsDark] = useState(true); // Default to dark mode
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalDismissed, setModalDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [scrollY, setScrollY] = useState(0);

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
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (_) {
      // no-op
    }
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 10 && !isAuthenticated && !modalDismissed) {
        setShowLoginModal(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isAuthenticated, modalDismissed]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (showLoginModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow || '';
    }
    return () => {
      document.body.style.overflow = originalOverflow || '';
    };
  }, [showLoginModal]);

  const closeModal = () => {
    setShowLoginModal(false);
    setModalDismissed(true);
    setError('');
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await dispatch(loginWithEmail({ email, password })).unwrap();
      setShowLoginModal(false);
    } catch (err) {
      setError(err || 'Failed to sign in');
    }
  };

  const handleGoogle = async () => {
    try {
      setError('');
      await dispatch(loginWithGoogle()).unwrap();
      setShowLoginModal(false);
    } catch (err) {
      setError(err || 'Failed to sign in with Google');
    }
  };

  const handleLogout = () => dispatch(logoutUser());

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

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-black/10 dark:bg-white/20 ring-2 ring-black/10 dark:ring-white/40 grid place-items-center">
                  <span className="text-slate-900 dark:text-white font-bold">{displayInitial}</span>
                </div>
                
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => setShowLoginModal(true)} className="rounded-lg border border-slate-300 dark:border-white/30 text-slate-800 dark:text-white/90 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 px-3 py-1.5 text-sm">Login</button>
                <Link to="/signup" className="rounded-lg bg-slate-200 dark:bg-white/20 hover:bg-slate-300 dark:hover:bg-white/30 text-slate-900 dark:text-white px-3 py-1.5 text-sm">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {showLoginModal && (
        <>
          <button aria-label="Close login" onClick={closeModal} className="fixed inset-0 z-[2000] bg-black/40 backdrop-blur-sm transition-opacity" />
          <div className="fixed inset-0 z-[2001] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur-2xl border border-white/10 rounded-xl shadow-xl p-6 sm:p-7 relative">
              <button type="button" onClick={closeModal} aria-label="Close" className="absolute top-2 right-3 text-slate-700 dark:text-white/80 hover:opacity-100 opacity-80 text-2xl leading-none">×</button>
              <div className="text-center mb-5">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Sign in</h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-white/60">Access your dashboard</p>
              </div>
              {error && (
                <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
              )}
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label htmlFor="tb-email" className="block text-xs font-medium text-slate-900 dark:text-white">Email</label>
                  <input id="tb-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full rounded-lg border border-slate-300 dark:border-white/20 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@example.com" />
                </div>
                <div className="relative">
                  <label htmlFor="tb-password" className="block text-xs font-medium text-slate-900 dark:text-white">Password</label>
                  <input id="tb-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 w-full rounded-lg border border-slate-300 dark:border-white/20 bg-white px-3 py-2 pr-10 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-8 text-xs text-gray-600">{showPassword ? 'Hide' : 'Show'}</button>
                </div>
                <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60">
                  {loading ? (
                    <>
                      <ButtonLoader size="sm" variant="primary" />
                      <span>Signing In</span>
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>
              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                <span className="text-[10px] text-slate-600 dark:text-white/60">or</span>
                <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
              </div>
              <button onClick={handleGoogle} disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? (
                  <>
                    <ButtonLoader size="sm" variant="secondary" />
                    <span>Signing In</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Sign in with Google</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </header>
    
  );
};

export default Topbar;