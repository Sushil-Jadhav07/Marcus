import React, { useState } from 'react';
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
          <div className=' '>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
            Create New User
          </h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Add new users to your Marcus Finance platform with Firebase authentication
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-8 lg:px-16 px-4'>
          {/* Create User Form */}
          <div className='lg:col-span-2'>
            <div className='bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8'>
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

                {/* Full Name */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder='Enter full name'
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-white/10 text-gray-900 dark:text-white'
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    placeholder='Enter phone number'
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-white/10 text-gray-900 dark:text-white'
                  />
                </div>

                {/* Email */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Email Address
                  </label>
                  <input
                    type='email'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder='Enter email address'
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-white/10 text-gray-900 dark:text-white'
                  />
                </div>

                {/* Password */}
                <div className='relative'>
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    
                    placeholder='Enter password (min 6 characters)'
                    className='w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-white/10 text-gray-900 dark:text-white'
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-11 text-black hover:text-black dark:text-black dark:hover:text-black'
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
                  <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                    User Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  >
                    <option value='client'>Client</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200'
                >
                  {loading ? 'Creating User...' : 'Create User'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
    </>
  );
};

export default CreateUserSimple;
