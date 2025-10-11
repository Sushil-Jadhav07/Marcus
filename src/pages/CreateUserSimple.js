import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../store/authSlice';
import { addUser, removeUser } from '../store/usersSlice';
import { 
  AiOutlineEye, 
  AiOutlineEyeInvisible 
} from 'react-icons/ai';
import MobileTopbar from '../components/layout/MobileTopbar';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';

const CreateUserSimple = () => {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users.list);
  const [formData, setFormData] = useState({
    fullName: '',
    number: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [roleOpen, setRoleOpen] = useState(false);
  const roleDropdownRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    const { fullName, number, email, password, confirmPassword } = formData;
    
    if (!fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    
    if (!number.trim()) {
      setError('Phone number is required');
      return false;
    }
    
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!password) {
      setError('Password is required');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    // if (password !== confirmPassword) {
    //   setError('Passwords do not match');
    //   return false;
    // }
    
    return true;
  };

  // Close custom dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!roleDropdownRef.current) return;
      if (!roleDropdownRef.current.contains(e.target)) {
        setRoleOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const { fullName, number, email, password, role } = formData;
      
      // Create user using Redux action
      const result = await dispatch(createUser({
        fullName,
        phoneNumber: number,
        email,
        password,
        role
      }));
      
      if (createUser.fulfilled.match(result)) {
        // Add to local Redux store for immediate UI update
        dispatch(addUser({ 
          name: fullName, 
          email: email, 
          role: role,
          phoneNumber: number,
          uid: result.payload.user.uid
        }));
        
        setSuccess(`User "${fullName}" created successfully!`);
        
        // Reset form
        setFormData({
          fullName: '',
          number: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'client'
        });
      } else {
        setError(result.payload || 'Failed to create user');
      }
      
    } catch (error) {
      console.error('Error creating user:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
       <div className='flex flex-col h-full'>
      <Navigation />
      <div className='w-full h-full flex flex-col'>
          <Topbar /> 
          <MobileTopbar />
          <div className=' lg:mt-0 mt-10'>
      <div className='max-w-[1000px] mx-auto'>
        {/* Header */}
        <div className=' mb-8 px-4 lg:px-0'>
        
          <h1 className='text-3xl text-start lg:text-4xl font-bold text-gray-900 dark:text-white mb-2'>
            Create New User
          </h1> 
         
        </div>

        <div className='grid grid-cols-1 gap-6 px-4 lg:px-0'>
          {/* Create User Form */}
          <div className='lg:col-span-2'>
            <div className='bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 lg:p-8 shadow-lg'>
              <form onSubmit={submit} className='space-y-6'>
                {/* Alerts */}
                {error && (
                  <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg'>
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg'>
                    {success}
                  </div>
                )}

                {/* Grid: Full name + Phone */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {/* Full Name */}
                  <div>
                    <label className='block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2'>
                      Full Name <span className='text-red-400'>*</span>
                    </label>
                    <input
                      type='text'
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder='John Doe'
                      className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/60'
                    />
                  </div>
                  {/* Phone Number */}
                  <div>
                    <label className='block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2'>
                      Phone Number <span className='text-red-400'>*</span>
                    </label>
                    <input
                      type='tel'
                      value={formData.number}
                      onChange={(e) => handleInputChange('number', e.target.value)}
                      placeholder='e.g., 9876543210'
                      className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/60'
                    />
                  </div>
                </div>

                {/* Grid: Email */}
                <div>
                  <label className='block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2'>
                    Email Address <span className='text-red-400'>*</span>
                  </label>
                  <input
                    type='email'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder='name@example.com'
                    className='w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/60'
                  />
                </div>

                {/* Password */}
                <div className='relative'>
                  <label className='block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2'>
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    
                    placeholder='Enter password (min 6 characters)'
                    className='w-full px-4 py-3 pr-12 border border-gray-300 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/60'
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-11 text-gray-600 hover:text-gray-800 dark:text-white/70 dark:hover:text-white'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                     {showPassword ? (
                          <AiOutlineEyeInvisible className='h-5 w-5' />
                        ) : (
                          <AiOutlineEye className='h-5 w-5' />
                        )}
                  </button>
                </div>

                {/* Confirm Password */}
                {/* <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder='Confirm your password'
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-white/10 text-gray-900 dark:text-white'
                  />
                </div> */}

                {/* Role Selection */}
                <div>
                  <label className='block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2'>
                    User Role
                  </label>
                  <div ref={roleDropdownRef} className='relative'>
                    <button
                      type='button'
                      onClick={() => setRoleOpen((o) => !o)}
                      className='flex w-full items-center justify-between px-4 py-3 border border-gray-300 dark:border-white/20 rounded-lg bg-white dark:bg-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    >
                      <span className='truncate capitalize'>{formData.role || 'Select role'}</span>
                      <span className={`ml-3 transition-transform ${roleOpen ? 'rotate-180' : ''}`}>
                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M7 10l5 5 5-5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                        </svg>
                      </span>
                    </button>
                    {roleOpen && (
                      <div className='absolute z-20 mt-2 w-full rounded-xl bg-white dark:bg-[#1f2937] shadow-2xl border border-gray-200 dark:border-white/20 overflow-hidden'>
                        {[
                          { label: 'Client', value: 'client' },
                          { label: 'Admin', value: 'admin' },
                        ].map((opt) => {
                          const active = formData.role === opt.value;
                          return (
                            <button
                              type='button'
                              key={opt.value}
                              onClick={() => {
                                handleInputChange('role', opt.value);
                                setRoleOpen(false);
                              }}
                              className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-blue-50 dark:hover:bg-white/10 ${active ? 'bg-blue-50 dark:bg-white/10' : ''}`}
                            >
                              <span className='capitalize text-gray-900 dark:text-white'>{opt.label}</span>
                              {active && (
                                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='text-blue-600 dark:text-white'>
                                  <path d='M20 6L9 17l-5-5' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                                </svg>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className='flex items-center justify-end gap-3 pt-2'>
                  <button
                    type='button'
                    disabled={loading}
                    onClick={() => setFormData({ fullName: '', number: '', email: '', password: '', confirmPassword: '', role: '' })}
                    className='px-5 py-3 rounded-lg border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200 disabled:opacity-50'
                  >
                    Reset
                  </button>
                  <button
                    type='submit'
                    disabled={loading}
                    className='px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700'
                  >
                    {loading ? 'Creating User...' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right column removed as requested */}
        </div>
      </div>
    </div>
      </div>
    </div>
    </>
  );
};

export default CreateUserSimple;
