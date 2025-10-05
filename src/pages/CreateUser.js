import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Card, 
  CardBody, 
  Typography, 
  Input, 
  Button, 
  Select, 
  Option,
  Alert,
  Chip
} from '@material-tailwind/react';
import { 
  EyeIcon, 
  EyeSlashIcon,
  UserPlusIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  KeyIcon
} from '@heroicons/react/24/outline';
import { createUser } from '../store/authSlice';
import { addUser, removeUser } from '../store/usersSlice';

const CreateUser = () => {
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
    // Clear errors when user starts typing
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
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-4'>
              <UserPlusIcon className='w-8 h-8 text-white' />
            </div>
            <Typography variant='h2' className='text-gray-900 dark:text-white mb-2'>
              Create New User
            </Typography>
            <Typography variant='lead' className='text-gray-600 dark:text-gray-300'>
              Add new users to your Marcus Finance platform with Firebase authentication
            </Typography>
          </div>

          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Create User Form */}
            <div className='lg:col-span-2'>
              <Card className='shadow-xl border-0'>
                <CardBody className='p-8'>
                  <form onSubmit={submit} className='space-y-6'>
                    {/* Alerts */}
            {error && (
                      <Alert color='red' variant='gradient'>
                {error}
                      </Alert>
                    )}
                    
                    {success && (
                      <Alert color='green' variant='gradient'>
                        {success}
                      </Alert>
                    )}

                    {/* Full Name */}
                    <div>
                      <Input
                        label='Full Name'
                        size='lg'
                        icon={<UserIcon className='h-5 w-5' />}
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder='Enter full name'
                        className='!border-gray-300 dark:!border-gray-600'
                        labelProps={{
                          className: '!text-gray-700 dark:!text-gray-300',
                        }}
                      />
              </div>

                    {/* Phone Number */}
                    <div>
                      <Input
                        label='Phone Number'
                        size='lg'
                        icon={<PhoneIcon className='h-5 w-5' />}
                        value={formData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        placeholder='Enter phone number'
                        className='!border-gray-300 dark:!border-gray-600'
                        labelProps={{
                          className: '!text-gray-700 dark:!text-gray-300',
                        }}
                      />
              </div>

                    {/* Email */}
                    <div>
                      <Input
                        label='Email Address'
                        type='email'
                        size='lg'
                        icon={<EnvelopeIcon className='h-5 w-5' />}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder='Enter email address'
                        className='!border-gray-300 dark:!border-gray-600'
                        labelProps={{
                          className: '!text-gray-700 dark:!text-gray-300',
                        }}
                      />
                </div>

                    {/* Password */}
                    <div className='relative'>
                      <Input
                        label='Password'
                        size='lg'
                        type={showPassword ? 'text' : 'password'}
                        icon={<KeyIcon className='h-5 w-5' />}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder='Enter password (min 6 characters)'
                        className='!border-gray-300 dark:!border-gray-600'
                        labelProps={{
                          className: '!text-gray-700 dark:!text-gray-300',
                        }}
                      />
                      <button
                        type='button'
                        className='absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className='h-4 w-4' />
                        ) : (
                          <EyeIcon className='h-4 w-4' />
                        )}
                      </button>
              </div>

                    {/* Confirm Password */}
                    <div className='relative'>
                      <Input
                        label='Confirm Password'
                        size='lg'
                        type={showConfirmPassword ? 'text' : 'password'}
                        icon={<KeyIcon className='h-5 w-5' />}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder='Confirm your password'
                        className='!border-gray-300 dark:!border-gray-600'
                        labelProps={{
                          className: '!text-gray-700 dark:!text-gray-300',
                        }}
                      />
                      <button
                        type='button'
                        className='absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className='h-4 w-4' />
                        ) : (
                          <EyeIcon className='h-4 w-4' />
                        )}
                </button>
              </div>

                    {/* Role Selection */}
                    <div>
                      <Typography variant='small' className='text-gray-700 dark:text-gray-300 mb-2'>
                        User Role
                      </Typography>
                      <Select
                        size='lg'
                        value={formData.role}
                        onChange={(value) => handleInputChange('role', value)}
                        className='!border-gray-300 dark:!border-gray-600'
                      >
                        <Option value='client'>Client - Access to financial tools</Option>
                        <Option value='admin'>Admin - Full platform access</Option>
                      </Select>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type='submit'
                      size='lg'
                      loading={loading}
                      className='w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                      disabled={loading}
                    >
                      {loading ? 'Creating User...' : 'Create User'}
                    </Button>
            </form>
                </CardBody>
              </Card>
            </div>

            {/* Users List */}
            <div className='lg:col-span-1'>
              <Card className='shadow-xl border-0 h-fit'>
                <CardBody className='p-6'>
                  <Typography variant='h5' className='text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                    <UserIcon className='h-5 w-5' />
                    Created Users
                  </Typography>
                  
              {users.length === 0 ? (
                    <div className='text-center py-8'>
                      <UserIcon className='h-12 w-12 text-gray-400 mx-auto mb-3' />
                      <Typography variant='small' className='text-gray-500 dark:text-gray-400'>
                        No users created yet
                      </Typography>
                    </div>
                  ) : (
                    <div className='space-y-3'>
                      {users.map((user) => (
                        <div
                          key={user.id || user.uid}
                          className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg'
                        >
                          <div className='flex-1'>
                            <Typography variant='small' className='font-semibold text-gray-900 dark:text-white'>
                              {user.name}
                            </Typography>
                            <Typography variant='small' className='text-gray-600 dark:text-gray-400'>
                              {user.email}
                            </Typography>
                            {user.phoneNumber && (
                              <Typography variant='small' className='text-gray-500 dark:text-gray-500'>
                                {user.phoneNumber}
                              </Typography>
                            )}
                          </div>
                          <div className='flex items-center gap-2'>
                            <Chip
                              value={user.role}
                              size='sm'
                              color={user.role === 'admin' ? 'blue' : 'green'}
                              variant='gradient'
                            />
                            <Button
                              variant='text'
                              size='sm'
                              color='red'
                              className='!p-1 !min-w-0'
                              onClick={() => dispatch(removeUser(user.id || user.uid))}
                            >
                              ×
                            </Button>
                          </div>
                      </div>
                  ))}
                    </div>
              )}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;

