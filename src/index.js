import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from "@material-tailwind/react";
import { generateVendorAccessToken } from './store/vendorAuthSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
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
