import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginWithEmail, loginWithGoogle } from '../../store/authSlice';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { ButtonLoader } from '../common/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      await dispatch(loginWithEmail({ email, password })).unwrap();
      navigate('/');
    } catch (err) {
      try {
        const isInvalidCred = (err && err.code === 'auth/invalid-credential') || String(err || '').includes('auth/invalid-credential');
        if (isInvalidCred) {
          setError('Invalid credential. Try to login again');
        } else {
          setError(err?.message || String(err) || 'Login failed. Please try again.');
        }
      } catch (_) {
        setError('Login failed. Please try again.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      await dispatch(loginWithGoogle()).unwrap();
      navigate('/');
    } catch (err) {
      try {
        const isInvalidCred = (err && err.code === 'auth/invalid-credential') || String(err || '').includes('auth/invalid-credential');
        if (isInvalidCred) {
          setError('Invalid credential. Try to login again');
        } else {
          setError(err?.message || String(err) || 'Login failed. Please try again.');
        }
      } catch (_) {
        setError('Login failed. Please try again.');
      }
    }
  };

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% to-[#0D0D0D] flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-white">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b dark:from-[#fff] from-[#fff] from-0% dark:via-[#0235c2] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#e7edfd] to-60% flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/5 dark:bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Welcome Back</h2>
          <p className="mt-1 text-sm text-white/60">Sign in to access your dashboard</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-900/30 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <div className="relative mt-1 group">
              <FaEnvelope className="pointer-events-none absolute text-white left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-400" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-slate-200/30 dark:border-white/10 bg-white/60 dark:bg-white/10 px-3 pl-10 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <div className="relative mt-1 group">
              <FaLock className="pointer-events-none absolute text-white left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-slate-200/30 dark:border-white/10 bg-white/60 dark:bg-white/10 px-3 pl-10 pr-10 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute text-white right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer text-slate-400 hover:text-slate-200"
                  onClick={() => setShowPassword(false)}
                  aria-label="Hide password"
                />
              ) : (
                <FaEye
                  className="absolute text-white right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer text-slate-400 hover:text-slate-200"
                  onClick={() => setShowPassword(true)}
                  aria-label="Show password"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 px-4 py-2.5 text-sm font-medium text-white hover:from-indigo-600 hover:via-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
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


            <hr className='my-6 border-white/10' />

        {/* <button
          onClick={handleGoogleLogin}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
        >
          {loading ? (
            <>
              <ButtonLoader size="sm" variant="secondary" />
              <span>Signing In</span>
            </>
          ) : (
            <>
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Sign in with Google</span>
            </>
          )}
        </button> */}

        {/* <div className="mt-6 text-center text-sm text-white">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-white hover:text-indigo-700">
              Sign up here
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login; 