import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { PageLoader } from '../../components/common/Loader';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const initializing = useSelector((state) => state.auth.initializing);

  // Show loading while initializing auth state
  if (initializing) {
    return (
      <div className="min-h-screen bg-gradient-to-b dark:from-[#fff] from-[#fff] from-0% dark:via-[#0235c2] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#e7edfd] to-60% flex items-center justify-center">
        <div className='flex justify-center items-center flex-col'>
        <div className="flex items-end gap-3">
          <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.1s]">
            <div className="w-1 h-6 bg-green-500"></div>
            <div className="w-3 h-12 bg-green-500 rounded-sm"></div>
            <div className="w-1 h-6 bg-green-500"></div>
          </div>
          <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.2s]">
            <div className="w-1 h-6 bg-red-500"></div>
            <div className="w-3 h-12 bg-red-500 rounded-sm"></div>
            <div className="w-1 h-6 bg-red-500"></div>
          </div>
          <div className="flex flex-col items-center animate-[bounce_1s_ease-in-out_infinite_0.1s]">
            <div className="w-1 h-6 bg-green-500"></div>
            <div className="w-3 h-12 bg-green-500 rounded-sm"></div>
            <div className="w-1 h-6 bg-green-500"></div>
          </div>
        </div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Allow access if authenticated
  return children;
};

export default ProtectedRoute; 
