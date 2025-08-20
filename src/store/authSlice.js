import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db, googleProvider } from '../firebase/config';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const initialState = {
  user: null,
  userProfile: null,
  isAuthenticated: false,
  loading: false,
  initializing: true,
  error: null
};

export const signupWithEmail = createAsyncThunk(
  'auth/signupWithEmail',
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const userDocumentRef = doc(db, 'users', user.uid);
      const userProfile = {
        uid: user.uid,
        email: user.email,
        firstName: firstName || '',
        lastName: lastName || '',
        name: `${firstName || ''} ${lastName || ''}`.trim(),
        createdAt: serverTimestamp(),
        provider: 'password'
      };
      await setDoc(userDocumentRef, userProfile, { merge: true });

      return { user, userProfile: { ...userProfile, createdAt: Date.now() } };
    } catch (error) {
      let errorMessage = 'Failed to create account';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled.';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred';
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const userDocumentRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocumentRef);
      const userProfile = userDoc.exists() ? userDoc.data() : null;
      return { user, userProfile };
    } catch (error) {
      let errorMessage = 'Failed to sign in';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred';
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDocumentRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocumentRef);
      if (!userDoc.exists()) {
        const profile = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: serverTimestamp(),
          provider: 'google'
        };
        await setDoc(userDocumentRef, profile, { merge: true });
      }
      const updatedDoc = await getDoc(userDocumentRef);
      return { user, userProfile: updatedDoc.data() };
    } catch (error) {
      let errorMessage = 'Failed to sign in with Google';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in popup was closed';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Sign-in popup was blocked. Please allow popups for this site';
      } else if (error.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Sign-in was cancelled';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'Account exists with the same email using different credentials';
      } else {
        errorMessage = error.message || 'An unexpected error occurred';
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to sign out');
    }
  }
);

export const listenToAuthChanges = createAsyncThunk(
  'auth/listenToAuthChanges',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      return await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userDocumentRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocumentRef);
            const userProfile = userDoc.exists() ? userDoc.data() : null;
            dispatch(authSlice.actions.setAuthState({ user, userProfile }));
          } else {
            dispatch(authSlice.actions.clearAuthState());
          }
          dispatch(authSlice.actions.setInitializing(false));
        });
        // Resolve immediately; caller doesn't need the unsubscribe here
        resolve(unsubscribe);
      });
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to bind auth listener');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.user = action.payload.user;
      state.userProfile = action.payload.userProfile;
      state.isAuthenticated = Boolean(action.payload.user);
      state.error = null;
    },
    clearAuthState(state) {
      state.user = null;
      state.userProfile = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setInitializing(state, action) {
      state.initializing = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userProfile = action.payload.userProfile;
        state.isAuthenticated = true;
      })
      .addCase(signupWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Signup failed';
      })

      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userProfile = action.payload.userProfile;
        state.isAuthenticated = true;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })

      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.userProfile = action.payload.userProfile;
        state.isAuthenticated = true;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Google login failed';
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.userProfile = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Logout failed';
      });
  }
});

export const { reducer: authReducer } = authSlice;
export default authSlice;

