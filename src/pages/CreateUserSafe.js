import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../store/authSlice';
import { addUser, removeUser } from '../store/usersSlice';
import { 
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  KeyIcon
} from '@heroicons/react/24/outline';
import { 
  AiOutlineEye, 
  AiOutlineEyeInvisible 
} from 'react-icons/ai';

const CreateUserSafe = () => {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users.list);
  const [formData, setFormData] = useState({
    fullName: '',
    number: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
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
        setShowPassword(false);
        setShowConfirmPassword(false);
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
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-4'>
            <UserIcon className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
            Create New User
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            Add new users to your Marcus Finance platform with Firebase authentication
          </p>
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Create User Form */}
          <div className='lg:col-span-2'>
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700'>
              <div className='p-8'>
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
                  <div className='relative'>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      Full Name
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <UserIcon className='h-5 w-5 text-gray-400' />
                      </div>
                      <input
                        type='text'
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder='Enter full name'
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className='relative'>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      Phone Number
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <PhoneIcon className='h-5 w-5 text-gray-400' />
                      </div>
                      <input
                        type='tel'
                        value={formData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        placeholder='Enter phone number'
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className='relative'>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      Email Address
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <EnvelopeIcon className='h-5 w-5 text-gray-400' />
                      </div>
                      <input
                        type='email'
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder='Enter email address'
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className='relative'>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      Password
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <KeyIcon className='h-5 w-5 text-gray-400' />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder='Enter password (min 6 characters)'
                        className='w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      />
                      <button
                        type='button'
                        className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible className='h-5 w-5' />
                        ) : (
                          <AiOutlineEye className='h-5 w-5' />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className='relative'>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                      Confirm Password
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <KeyIcon className='h-5 w-5 text-gray-400' />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder='Confirm your password'
                        className='w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      />
                      <button
                        type='button'
                        className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <AiOutlineEyeInvisible className='h-5 w-5' />
                        ) : (
                          <AiOutlineEye className='h-5 w-5' />
                        )}
                      </button>
                    </div>
                  </div>

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
                      <option value='client'>Client - Access to financial tools</option>
                      <option value='admin'>Admin - Full platform access</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2'
                  >
                    {loading && (
                      <svg className='animate-spin h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                      </svg>
                    )}
                    {loading ? 'Creating User...' : 'Create User'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className='lg:col-span-1'>
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 h-fit'>
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                  <UserIcon className='h-5 w-5' />
                  Created Users
                </h3>
                
                {users.length === 0 ? (
                  <div className='text-center py-8'>
                    <UserIcon className='h-12 w-12 text-gray-400 mx-auto mb-3' />
                    <p className='text-gray-500 dark:text-gray-400'>
                      No users created yet
                    </p>
                  </div>
                ) : (
                  <div className='space-y-3'>
                    {users.map((user) => (
                      <div
                        key={user.id || user.uid}
                        className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'
                      >
                        <div className='flex-1'>
                          <p className='font-semibold text-gray-900 dark:text-white'>
                            {user.name}
                          </p>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            {user.email}
                          </p>
                          {user.phoneNumber && (
                            <p className='text-xs text-gray-500 dark:text-gray-500'>
                              {user.phoneNumber}
                            </p>
                          )}
                        </div>
                        <div className='flex items-center gap-2'>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'admin' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          }`}>
                            {user.role}
                          </span>
                          <button
                            onClick={() => dispatch(removeUser(user.id || user.uid))}
                            className='text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20'
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserSafe;
