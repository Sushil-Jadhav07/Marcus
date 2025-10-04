import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@material-tailwind/react';

import Navigation from './components/layout/Navigation';
import Home from './pages/Home';
import MarketPulse from './pages/MarketPulse';
import InsiderStrategy from './pages/InsiderStrategy';
import SectorScope from './pages/SectorScope';
import SwingSpectrum from './pages/SwingSpectrum';
import OptionClock from './pages/OptionClock';
import OptionApex from './pages/OptionApex';
import Settings from './pages/Settings';
import FAQ from './pages/FAQ';
import CreateUser from './pages/CreateUserSimple';
import UserList from './pages/UserList';
import TestMaterialTailwind from './components/common/TestMaterialTailwind';
import './App.css';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import { listenToAuthChanges } from './store/authSlice';
import Topbar from './components/layout/Topbar';
import MobileTopbar from './components/layout/MobileTopbar';
import ProtectedRoute from './config/Route/ProtectedRoute';
import RequireRole from './config/Route/RequireRole';
import RoleSwitcher from './components/common/RoleSwitcher';
import Login from './components/Auth/Login';
  
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
      <ThemeProvider>
        <AuthProvider>
          <Router>
              <AuthBootstrapper>
                <div className="App scroll-smooth scroll-behavior-smooth scrollbar-hide">
                  {/* <Navigation />
                  <Topbar />
                  <MobileTopbar /> */}
                  {/* Role Switcher for Testing */}
                  {/* <RoleSwitcher /> */}
                  <Routes>
                { /* Sign-in removed: no login/signup routes */ }
                <Route path="/login"  element={<Login />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <RequireRole allowed={['admin', 'client']}>
                      <div className='bg-gradient-to-b dark:from-[#fff] from-[#fff] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                         
                          <main className="pt-16 md:ml-64 lg:ml-72 pb-0 md:pb-0 ">
                            <Home />
                          </main>
                      </div>
                    </RequireRole>
                  </ProtectedRoute>
                } />
                <Route path="/market-pulse" element={
                  <ProtectedRoute>
                    <RequireRole allowed={['admin', 'client']}>
                      <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                        
                        <main className=" pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                          <MarketPulse />
                        </main>
                      </div>
                    </RequireRole>
                  </ProtectedRoute>
                } />
                <Route path="/insider-strategy" element={
                  <ProtectedRoute>
                    <RequireRole allowed={['admin', 'client']}>
                      <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                            
                        <main className=" !h-auto pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                          <InsiderStrategy />
                        </main>
                      </div>
                    </RequireRole>
                  </ProtectedRoute>
                } />
                <Route path="/sector-scope" element={
                  <ProtectedRoute>
                    <RequireRole allowed={['admin', 'client']}>
                      <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                        
                        <main className=" pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                          <SectorScope />
                        </main>
                      </div>
                    </RequireRole>
                  </ProtectedRoute>
                } />
                <Route path="/swing-spectrum" element={
                  <ProtectedRoute>
                    <RequireRole allowed={['admin', 'client']}>
                      <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                        
                        <main className=" pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                          <SwingSpectrum />
                        </main>
                      </div>
                    </RequireRole>
                  </ProtectedRoute>
                } />
                <Route path="/option-clock" element={
                  <ProtectedRoute>
                    <RequireRole allowed={['admin', 'client']}>
                      <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                       
                        <main className=" pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                          <OptionClock />
                        </main>
                      </div>
                    </RequireRole>
                  </ProtectedRoute>
                } />
                <Route path="/option-apex" element={
                  <ProtectedRoute>
                    <RequireRole allowed={['admin', 'client']}>
                      <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                       
                        <main className="pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                          <OptionApex />
                        </main>
                      </div>
                    </RequireRole>
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <RequireRole allowed={['admin', 'client']}>
                      <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                       
                        <main className="pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                          <Settings />
                        </main>
                      </div>
                    </RequireRole>
                  </ProtectedRoute>
                } />
                 <Route path="/create-user" element={
                   <ProtectedRoute>
                     <RequireRole allowed={['admin']}>
                     <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                       
                       <main className="pt-16 md:ml-64 lg:ml-70 pb-24 md:pb-0">
                         <CreateUser />
                       </main>
                     </div> 
                     </RequireRole>
                   </ProtectedRoute>
                 } />
                 <Route path="/user-list" element={
                   <ProtectedRoute>
                     <RequireRole allowed={['admin']}>
                       <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                         <main className="pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                           <UserList />
                         </main>
                       </div> 
                     </RequireRole>
                   </ProtectedRoute>
                 } />
                 {/* <Route path="/test-material" element={
                   <ProtectedRoute>
                     <TestMaterialTailwind />
                   </ProtectedRoute>
                 } /> */}
                <Route path="/faq" element={
                  <ProtectedRoute>
                    <RequireRole allowed={['admin', 'client']}>
                      <div className='bg-gradient-to-b dark:from-[#1e40af] from-[#375FFF] from-0% dark:via-[#1d4ed8] via-[#1d4ed8] via-0% dark:to-[#0D0D0D] to-[#fff] to-60%'>
                       
                        <main className="pt-16 md:ml-64 lg:ml-72 pb-24 md:pb-0">
                          <FAQ />
                        </main>
                      </div>
                    </RequireRole>
                  </ProtectedRoute>
                } />
               </Routes>
             </div>
           </AuthBootstrapper>
         </Router>
       </AuthProvider>
      </ThemeProvider>
     </Provider>
  );
}

export default App;
