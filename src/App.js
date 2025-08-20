import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Route/ProtectedRoute';
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
            <div className="App">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <>
                       
                        <main className="pt-16 md:ml-20 lg:ml-24 pb-0 md:pb-0">
                          <Home />
                        </main>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/market-pulse" element={
                  <ProtectedRoute>
                    <>
                      <Topbar />
                      <MobileTopbar />
                      <Navigation />
                      <main className="main-content pt-16 md:ml-20 lg:ml-24 pb-24 md:pb-0">
                        <MarketPulse />
                      </main>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/insider-strategy" element={
                  <ProtectedRoute>
                    <>
                      <Topbar />
                      <MobileTopbar />
                      <Navigation />
                      <main className="main-content pt-16 md:ml-20 lg:ml-24 pb-24 md:pb-0">
                        <InsiderStrategy />
                      </main>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/sector-scope" element={
                  <ProtectedRoute>
                    <>
                      <Topbar />
                      <MobileTopbar />
                      <Navigation />
                      <main className="main-content pt-16 md:ml-20 lg:ml-24 pb-24 md:pb-0">
                        <SectorScope />
                      </main>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/swing-spectrum" element={
                  <ProtectedRoute>
                    <>
                      <Topbar />
                      <MobileTopbar />
                      <Navigation />
                      <main className="main-content pt-16 md:ml-20 lg:ml-24 pb-24 md:pb-0">
                        <SwingSpectrum />
                      </main>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/option-clock" element={
                  <ProtectedRoute>
                    <>
                      <Topbar />
                      <MobileTopbar />
                      <Navigation />
                      <main className="main-content pt-16 md:ml-20 lg:ml-24 pb-24 md:pb-0">
                        <OptionClock />
                      </main>
                    </>
                  </ProtectedRoute>
                } />
                <Route path="/option-apex" element={
                  <ProtectedRoute>
                    <>
                      <Topbar />
                      <MobileTopbar />
                      <Navigation />
                      <main className="main-content pt-16 md:ml-20 lg:ml-24 pb-24 md:pb-0">
                        <OptionApex />
                      </main>
                    </>
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
