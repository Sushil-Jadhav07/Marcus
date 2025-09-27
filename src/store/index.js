import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authSlice';
import { vendorAuthReducer } from './vendorAuthSlice';
import { roleReducer } from './roleSlice';
import { usersReducer } from './usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vendorAuth: vendorAuthReducer,
    role: roleReducer,
    users: usersReducer,
  }
});

export default store;

