import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVOmy3nzS4CdGex_BauEJgj6w8_AXGGnA",
    authDomain: "marcusfinance-5c272.firebaseapp.com",
    projectId: "marcusfinance-5c272",
    storageBucket: "marcusfinance-5c272.firebasestorage.app",
    messagingSenderId: "671036698261",
    appId: "1:671036698261:web:06b314e80e6d7c3e3b359c",
    measurementId: "G-MKKG2LP8BZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and export reference
export const db = getFirestore(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Configure Google Auth Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app; 