# Firebase Authentication Setup Guide

This guide will help you set up Firebase authentication for your Marcus Finance React application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "marcus-finance")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project dashboard, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password**: Click "Enable" and save
   - **Google**: Click "Enable", add your support email, and save

## Step 3: Get Firebase Configuration

1. In your Firebase project dashboard, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "marcus-finance-web")
6. Copy the Firebase configuration object

## Step 4: Update Firebase Config

1. Open `src/firebase/config.js` in your project
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-messaging-sender-id",
  appId: "your-actual-app-id"
};
```

## Step 5: Configure Google OAuth (Optional)

If you want to use Google Sign-in:

1. In Firebase Console, go to Authentication > Sign-in method
2. Click on Google provider
3. Add your authorized domain (localhost for development)
4. For production, add your actual domain

## Step 6: Test the Application

1. Start your development server: `npm start`
2. Navigate to `/login` or `/signup`
3. Try creating an account with email/password
4. Try signing in with Google
5. Verify that authentication works and users are redirected to the dashboard

## Features Included

✅ **Email/Password Authentication**
- User registration and login
- Password validation
- Error handling for common auth issues

✅ **Google Authentication**
- One-click Google sign-in
- Automatic account creation
- Secure OAuth flow

✅ **Protected Routes**
- All dashboard pages require authentication
- Automatic redirects for unauthenticated users
- Persistent login sessions

✅ **User Management**
- Display user information in navigation
- Secure logout functionality
- Real-time authentication state

## Security Features

- **Route Protection**: Unauthenticated users cannot access dashboard
- **Secure Authentication**: Uses Firebase's battle-tested auth system
- **Error Handling**: User-friendly error messages for auth failures
- **Session Management**: Secure token-based authentication

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/popup-closed-by-user)"**
   - User closed the Google sign-in popup
   - This is normal behavior

2. **"Firebase: Error (auth/popup-blocked)"**
   - Browser blocked the popup
   - Ask users to allow popups for your site

3. **"Firebase: Error (auth/network-request-failed)"**
   - Check internet connection
   - Verify Firebase project is active

4. **Authentication not working**
   - Verify Firebase config is correct
   - Check browser console for errors
   - Ensure Authentication is enabled in Firebase Console

## Production Deployment

When deploying to production:

1. Add your production domain to Firebase authorized domains
2. Update Firebase configuration if needed
3. Test authentication flow in production environment
4. Monitor Firebase Console for any auth issues

## Support

For Firebase-specific issues, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firebase Support](https://firebase.google.com/support)

For application-specific issues, check the browser console and React DevTools. 