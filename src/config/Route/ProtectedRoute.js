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
      <div className="min-h-screen bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% flex items-center justify-center">
        <PageLoader text="Authenticating..." />
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
