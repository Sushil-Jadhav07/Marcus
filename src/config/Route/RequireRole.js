import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RequireRole = ({ allowed = ['client', 'admin'], children, fallbackPath = '/' }) => {
  const { user, userProfile , isAuthenticated } = useSelector((state) => state.auth);
  const role = userProfile?.role || 'client';

  console.log(role)


  // Check if current role is in allowed roles
  if (!allowed.includes(role)) {
    // Redirect to fallback path or home
    return <Navigate to={fallbackPath} replace />;
  }
  
  return children;
};

export default RequireRole;

