import { createSlice } from '@reduxjs/toolkit';

const persistedRole = (() => {
  try {
    const v = localStorage.getItem('app.role');
    return v === 'admin' || v === 'client' ? v : 'client';
  } catch (_) {
    return 'client';
  }
})();

const initialState = {
  role: persistedRole,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole(state, action) {
      const next = action.payload === 'admin' ? 'admin' : 'client';
      state.role = next;
      try {
        localStorage.setItem('app.role', next);
      } catch (_) {
        // ignore persistence errors
      }
    },
  },
});

export const { setRole } = roleSlice.actions;
export const { reducer: roleReducer } = roleSlice;
export default roleSlice;

