import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { 
  AiOutlineSearch,
  AiOutlineFilter
} from 'react-icons/ai';
import { FiUsers, FiUserCheck, FiUserX } from 'react-icons/fi';
import EditUserModal from '../components/modals/EditUserModal';
import MobileTopbar from '../components/layout/MobileTopbar';
import Topbar from '../components/layout/Topbar';
import Navigation from '../components/layout/Navigation';

const UserList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    role: ''
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Fetch users from Firebase
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersCollection = collection(db, 'users');
      const usersQuery = query(usersCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(usersQuery);
      
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setUsers(usersList);
      setError('');
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search term and active tab
  const filteredUsers = users.filter(userData => {
    const matchesSearch = 
      userData.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userData.phoneNumber?.includes(searchTerm);
    
    const matchesTab = activeTab === 'all' || userData.role === activeTab;
    
    return matchesSearch && matchesTab;
  });

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user');
      }
    }
  };

  // Start editing user
  const handleEditUser = (user) => {
    setEditingUser(user.id);
    setEditForm({
      fullName: user.fullName || '',
      phoneNumber: user.phoneNumber || '',
      email: user.email || '',
      role: user.role || 'client'
    });
  };

  // Save user edits
  const handleSaveEdit = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...editForm,
        updatedAt: new Date()
      });
      
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, ...editForm, updatedAt: new Date() }
          : user
      ));
      
      setEditingUser(null);
      setEditForm({
        fullName: '',
        phoneNumber: '',
        email: '',
        role: ''
      });
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user');
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({
      fullName: '',
      phoneNumber: '',
      email: '',
      role: ''
    });
  };

  // Open edit modal
  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Save user edits from modal
  const handleSaveUserModal = async (formData) => {
    try {
      setUpdateLoading(true);
      const userRef = doc(db, 'users', selectedUser.id);
      await updateDoc(userRef, {
        ...formData,
        updatedAt: new Date()
      });
      
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...formData, updatedAt: new Date() }
          : user
      ));
      
      setIsEditModalOpen(false);
      setSelectedUser(null);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user');
    } finally {
      setUpdateLoading(false);
    }
  };

  // Close edit modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <ShieldCheckIcon className="h-5 w-5 text-blue-600" />;
      case 'client':
        return <ShieldExclamationIcon className="h-5 w-5 text-green-600" />;
      default:
        return <UserIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'client':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // Get stats
  const stats = {
    all: users.length,
    admin: users.filter(user => user.role === 'admin').length,
    client: users.filter(user => user.role === 'client').length
  };

  return (
    <div className='flex flex-col h-full'>
    <Navigation />
      <div className='w-full h-full flex flex-col'>
          <Topbar /> 
          <MobileTopbar />
          <div className='min-h-screen  p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/15 p-5 rounded-full mb-4'>
            <FiUsers className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>
            User Management
          </h1>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            Manage all users in your Marcus Finance platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Total Users</p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>{stats.all}</p>
              </div>
              <FiUsers className='h-8 w-8 text-blue-600' />
            </div>
          </div>
          
          <div className='bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Admins</p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>{stats.admin}</p>
              </div>
              <FiUserCheck className='h-8 w-8 text-blue-600' />
            </div>
          </div>
          
          <div className='bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Clients</p>
                <p className='text-3xl font-bold text-gray-900 dark:text-white'>{stats.client}</p>
              </div>
              <FiUserX className='h-8 w-8 text-green-600' />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className='bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 mb-6'>
          <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
            <div className='relative flex-1 max-w-md'>
              <AiOutlineSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <input
                type='text'
                placeholder='Search users...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              />
            </div>
            
            <button
              onClick={fetchUsers}
              className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
            >
              <AiOutlineFilter className='h-5 w-5' />
              Refresh
            </button>
          </div>
        </div>

        {/* Role Tabs */}
        <div className='bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 mb-6'>
          <div className='border-b border-gray-200 dark:border-gray-700'>
            <nav className='flex space-x-8 px-6' aria-label='Tabs'>
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Users ({stats.all})
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'admin'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Admins ({stats.admin})
              </button>
              <button
                onClick={() => setActiveTab('client')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'client'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Clients ({stats.client})
              </button>
            </nav>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6'>
            {error}
          </div>
        )}

        {/* Users Table */}
        <div className='bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5'>
          {loading ? (
            <div className='flex items-center justify-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
              <span className='ml-3 text-gray-600 dark:text-gray-400'>Loading users...</span>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className='text-center py-12'>
              <FiUsers className='h-12 w-12 text-gray-400 mx-auto mb-4' />
              <p className='text-gray-500 dark:text-gray-400'>
                {searchTerm ? 'No users found matching your search.' : 'No users found.'}
              </p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50 dark:bg-gray-700'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      User
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      Contact
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      Role
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      Created
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
                  {filteredUsers.map((userData) => (
                    <tr key={userData.id} className='hover:bg-gray-50 dark:hover:bg-gray-700'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0 h-10 w-10'>
                            <div className='h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center'>
                              <UserIcon className='h-6 w-6 text-white' />
                            </div>
                          </div>
                          <div className='ml-4'>
                            {editingUser === userData.id ? (
                              <input
                                type='text'
                                value={editForm.fullName}
                                onChange={(e) => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                                className='px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                              />
                            ) : (
                              <div className='text-sm font-medium text-gray-900 dark:text-white'>
                                {userData.fullName || 'N/A'}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='space-y-1'>
                          {editingUser === userData.id ? (
                            <div className='space-y-2'>
                              <input
                                type='email'
                                value={editForm.email}
                                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                                className='w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                              />
                              <input
                                type='tel'
                                value={editForm.phoneNumber}
                                onChange={(e) => setEditForm(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                className='w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                              />
                            </div>
                          ) : (
                            <>
                              <div className='flex items-center text-sm text-gray-900 dark:text-white'>
                                <EnvelopeIcon className='h-4 w-4 text-gray-400 mr-2' />
                                {userData.email}
                              </div>
                              {userData.phoneNumber && (
                                <div className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                                  <PhoneIcon className='h-4 w-4 text-gray-400 mr-2' />
                                  {userData.phoneNumber}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                      
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {editingUser === userData.id ? (
                          <select
                            value={editForm.role}
                            onChange={(e) => setEditForm(prev => ({ ...prev, role: e.target.value }))}
                            className='px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                          >
                            <option value='client'>Client</option>
                            <option value='admin'>Admin</option>
                          </select>
                        ) : (
                          <div className='flex items-center'>
                            {getRoleIcon(userData.role)}
                            <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(userData.role)}`}>
                              {userData.role}
                            </span>
                          </div>
                        )}
                      </td>
                      
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>
                        <div className='flex items-center'>
                          <CalendarIcon className='h-4 w-4 text-gray-400 mr-2' />
                          {userData.createdAt?.toDate ? 
                            userData.createdAt.toDate().toLocaleDateString() :
                            new Date(userData.createdAt).toLocaleDateString()
                          }
                        </div>
                      </td>
                      
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        {editingUser === userData.id ? (
                          <div className='flex space-x-2'>
                            <button
                              onClick={() => handleSaveEdit(userData.id)}
                              className='text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                            >
                              <CheckIcon className='h-5 w-5' />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className='text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
                            >
                              <XMarkIcon className='h-5 w-5' />
                            </button>
                          </div>
                        ) : (
                          <div className='flex space-x-2'>
                          
                            <button
                              onClick={() => handleOpenEditModal(userData)}
                              className='text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300'
                              title="Advanced Edit (Modal)"
                            >
                              <PencilIcon className='h-5 w-5' />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(userData.id)}
                              className='text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
                              title="Delete User"
                            >
                              <TrashIcon className='h-5 w-5' />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
      </div>

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        user={selectedUser}
        onSave={handleSaveUserModal}
        loading={updateLoading}
      />
      </div>
  );
};

export default UserList;