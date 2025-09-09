import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navigation from './components/layout/Navigation';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './pages/Home';
import MarketPulse from './pages/MarketPulse';
import InsiderStrategy from './pages/InsiderStrategy';
import SectorScope from './pages/SectorScope';
import SwingSpectrum from './pages/SwingSpectrum';
import OptionClock from './pages/OptionClock';
import OptionApex from './pages/OptionApex';
import './App.css';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import { listenToAuthChanges } from './store/authSlice';
import Topbar from './components/layout/Topbar';
import MobileTopbar from './components/layout/MobileTopbar';
import ProtectedRoute from './config/Route/ProtectedRoute';
  
const AuthBootstrapper = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <AuthBootstrapper>
            <div className="App scroll-smooth scroll-behavior-smooth scrollbar-hide">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                       
                        <main className="pt-16 md:ml-64 lg:ml-72 pb-0 md:pb-0 ">
                          <Home />
                        </main>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/market-pulse" element={
                  <ProtectedRoute>
                    <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                      
                      <main className=" pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                        <MarketPulse />
                      </main>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/insider-strategy" element={
                  <ProtectedRoute>
                    <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                          
                      <main className=" !h-auto pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                        <InsiderStrategy />
                      </main>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/sector-scope" element={
                  <ProtectedRoute>
                    <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                      
                      <main className=" pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                        <SectorScope />
                      </main>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/swing-spectrum" element={
                  <ProtectedRoute>
                    <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                      
                      <main className=" pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                        <SwingSpectrum />
                      </main>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/option-clock" element={
                  <ProtectedRoute>
                    <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                     
                      <main className=" pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                        <OptionClock />
                      </main>
                    </div>
                  </ProtectedRoute>
                } />
                <Route path="/option-apex" element={
                  <ProtectedRoute>
                    <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                     
                      <main className="pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                        <OptionApex />
                      </main>
                    </div>
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </AuthBootstrapper>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
