import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store';
import { generateVendorAccessToken } from './store/vendorAuthSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Generate and log access token on startup
store.dispatch(generateVendorAccessToken()).then((action) => {
  const state = store.getState();
  if (state.vendorAuth && state.vendorAuth.accessToken) {
    // eslint-disable-next-line no-console
    console.log('Vendor Access Token:', state.vendorAuth.accessToken);
  }
});
