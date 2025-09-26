import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarDaysIcon,
  PencilSquareIcon,
  Cog6ToothIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline'

const getInitialFromEmail = (email) => {
  if (!email || typeof email !== 'string') return 'U'
  const firstChar = email.trim().charAt(0)
  return firstChar ? firstChar.toUpperCase() : 'U'
}

const getInitials = (fullName = '') => {
  const parts = String(fullName).trim().split(' ').filter(Boolean)
  if (parts.length === 0) return 'U'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

const safeDate = (value) => {
  if (!value) return '—'
  try {
    const d = typeof value === 'number' ? new Date(value) : new Date(String(value))
    if (isNaN(d.getTime())) return '—'
    return d.toLocaleDateString()
  } catch {
    return '—'
  }
}

const AccountDetails = () => {
  const { user, userProfile, loading, initializing } = useSelector((state) => state.auth)

  const displayName = userProfile?.name || [userProfile?.firstName, userProfile?.lastName].filter(Boolean).join(' ') || user?.displayName || (user?.email ? user.email.split('@')[0] : 'User')
  const email = userProfile?.email || user?.email || '—'
  const phone = userProfile?.phone || 'No Number'
  const provider = userProfile?.provider || (user?.providerData?.[0]?.providerId ?? '—')
  const memberSince = safeDate(userProfile?.createdAt || user?.metadata?.creationTime)
  const photoURL = userProfile?.photoURL || user?.photoURL || ''
  const [showPhoto, setShowPhoto] = useState(Boolean(photoURL))
  const avatarInitial = email && email !== '—' ? getInitialFromEmail(email) : getInitials(displayName)

  return (
    <div className='w-full max-w-6xl mx-auto px-5 py-8'>
      {/* Header */}
      <div className='mb-8 flex flex-col items-start justify-start'>
        <h1 className='text-2xl font-bold text-white'>Account</h1>
        <p className='text-white/70 text-md'>Your profile and account information</p>
      </div>

      {(loading || initializing) && (
        <div className='mb-6 text-white/80 text-sm'>Loading your account…</div>
      )}

      {/* Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
        {/* Profile card */}
        <div className='lg:col-span-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-5'>
            <div className='relative'>
              {showPhoto && photoURL ? (
                <img
                  src={photoURL}
                  alt={displayName}
                  onError={() => setShowPhoto(false)}
                  className='h-16 w-16 rounded-2xl object-cover border border-white/20 bg-white/10'
                />
              ) : (
                <div className='h-16 w-16 rounded-2xl bg-white/20 border border-white/20 flex items-center justify-center text-blue-900 dark:text-white text-xl font-extrabold'>
                  {avatarInitial}
                </div>
              )}
            </div>
            <div className='flex-1 min-w-0'>
              <h2 className='text-xl font-semibold text-white truncate'>{displayName}</h2>
              <div className='mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <div className='flex items-center gap-2 text-white/85 text-sm'>
                  <EnvelopeIcon className='w-4 h-4' />
                  <span className='truncate'>{email}</span>
                </div>
                <div className='flex items-center gap-2 text-white/85 text-sm'>
                  <PhoneIcon className='w-4 h-4' />
                  <span>{phone || "No Number"}</span>
                </div>
                {/* <div className='flex items-center gap-2 text-white/85 text-sm'>
                  <CalendarDaysIcon className='w-4 h-4' />
                  <span>Member since {memberSince}</span>
                </div> */}
                <div className='flex items-center gap-2 text-white/85 text-sm'>
                  <CheckBadgeIcon className='w-4 h-4' />
                  <span>Provider: {provider}</span>
                </div>
              </div>
            </div>
            {/* <button className='inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm transition'>
              <PencilSquareIcon className='w-4 h-4' />
              Edit profile
            </button> */}
          </div>
        </div>

        {/* Simple info card */}
        <div className='bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm border border-white/15 rounded-2xl p-6'>
          <div className='space-y-3'>
            <div>
              <p className='text-white/70 text-sm'>Signed in as</p>
              <p className='text-white font-semibold text-lg truncate'>{email}</p>
            </div>
            <div className='rounded-xl bg-white/5 border border-white/10 p-4'>
              <p className='text-white/80 text-sm'>Provider</p>
              <p className='text-white font-medium'>{provider}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountDetails