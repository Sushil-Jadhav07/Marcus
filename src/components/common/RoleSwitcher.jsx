import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRole } from '../../store/roleSlice';

const RoleSwitcher = () => {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state.role?.role || 'client');

  const handleRoleChange = (newRole) => {
    dispatch(setRole(newRole));
  };

  return (
    <div className="fixed top-20 right-4 z-[1001] bg-white/90 dark:bg-[#0b0b0b]/90 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Role Switcher (Testing)</h3>
      <div className="flex gap-2">
        <button
          onClick={() => handleRoleChange('admin')}
          className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
            currentRole === 'admin'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20'
          }`}
        >
          Admin
        </button>
        <button
          onClick={() => handleRoleChange('client')}
          className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
            currentRole === 'client'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/20'
          }`}
        >
          Client
        </button>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
        Current: {currentRole}
      </p>
    </div>
  );
};

export default RoleSwitcher;
