import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PageLoader } from '../../components/common/Loader';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user, initializing } = useSelector((state) => state.auth);

  if (loading || initializing) {
    return (
      <div className="min-h-screen bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60% flex items-center justify-center">
        <PageLoader text="Authenticating..." />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 