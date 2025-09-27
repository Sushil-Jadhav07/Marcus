import { createSlice, nanoid } from '@reduxjs/toolkit';

const persistedUsers = (() => {
  try {
    const raw = localStorage.getItem('app.users');
    return Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
})();

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: persistedUsers,
  },
  reducers: {
    addUser: {
      reducer(state, action) {
        state.list.push(action.payload);
        try {
          localStorage.setItem('app.users', JSON.stringify(state.list));
        } catch (_) {
          // ignore persistence errors
        }
      },
      prepare({ name, email, role, phoneNumber, uid }) {
        return {
          payload: {
            id: uid || nanoid(),
            name: name?.trim() || '',
            email: email?.trim() || '',
            phoneNumber: phoneNumber?.trim() || '',
            role: role === 'admin' ? 'admin' : 'client',
            createdAt: Date.now(),
          },
        };
      },
    },
    removeUser(state, action) {
      state.list = state.list.filter((u) => u.id !== action.payload);
      try {
        localStorage.setItem('app.users', JSON.stringify(state.list));
      } catch (_) {
        // ignore
      }
    },
  },
});

export const { addUser, removeUser } = usersSlice.actions;
export const { reducer: usersReducer } = usersSlice;
export default usersSlice;

