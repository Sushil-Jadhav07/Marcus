# Role-Based Access System

## Overview
Marcus Finance now implements a comprehensive role-based access system using Redux for state management. The system supports two main roles: **Admin** and **Client**.

## Roles and Permissions

### Admin Role
- **Full Access**: Can access all pages and features
- **User Management**: Can create, view, and manage users through the Create User page
- **Pages Access**:
  - Home (`/`)
  - Market Pulse (`/market-pulse`)
  - Insider Strategy (`/insider-strategy`)
  - Sector Scope (`/sector-scope`)
  - Swing Spectrum (`/swing-spectrum`)
  - Option Clock (`/option-clock`)
  - Option Apex (`/option-apex`)
  - Settings (`/settings`)
  - FAQ (`/faq`)
  - **Create User (`/create-user`)** - Admin only

### Client Role
- **Limited Access**: Can access core financial analysis tools
- **Pages Access**:
  - Home (`/`)
  - Market Pulse (`/market-pulse`)
  - Insider Strategy (`/insider-strategy`)
  - Sector Scope (`/sector-scope`)
  - Swing Spectrum (`/swing-spectrum`)
  - Option Clock (`/option-clock`)
  - Option Apex (`/option-apex`)
  - Settings (`/settings`)
  - FAQ (`/faq`)
  - **Cannot access Create User page**

## Implementation Details

### Redux Store Structure
```javascript
{
  role: {
    role: 'admin' | 'client' // Current user role
  },
  auth: {
    user: null,
    userProfile: null,
    isAuthenticated: false,
    // ... other auth properties
  },
  users: {
    list: [] // Array of created users (stored locally)
  }
}
```

### Key Components

#### 1. ProtectedRoute (`src/config/Route/ProtectedRoute.js`)
- Handles authentication state initialization
- Shows loading spinner while auth state is being determined
- Allows access without authentication (as requested)

#### 2. RequireRole (`src/config/Route/RequireRole.js`)
- Enforces role-based access control
- Redirects unauthorized users to fallback path
- Configurable allowed roles per route

#### 3. RoleSwitcher (`src/components/common/RoleSwitcher.jsx`)
- Testing component for switching between roles
- Fixed position in top-right corner
- Shows current role and allows role switching

### Navigation Updates
- **Desktop Navigation**: Shows "Create User" option only for Admin role
- **Mobile Navigation**: Includes Create User in quick actions for Admin role only
- **Role Indicator**: Displays current role in both desktop and mobile topbars

### Removed Features
- **Sign-in/Login functionality** completely removed as requested
- **Logout functionality** removed from navigation
- **Authentication modals** removed from topbar
- **Login-related FAQ content** updated to reflect role-based system

## Testing the System

### Role Switching
1. Use the RoleSwitcher component (top-right corner) to switch between Admin and Client roles
2. Observe navigation changes:
   - Admin: Shows "Create User" in navigation
   - Client: Does not show "Create User" option

### Access Control Testing
1. **As Admin**:
   - Navigate to `/create-user` - Should work
   - All other pages should be accessible

2. **As Client**:
   - Navigate to `/create-user` - Should redirect to home
   - All other pages should be accessible

### User Management (Admin Only)
1. Switch to Admin role
2. Navigate to Create User page
3. Test creating users with different roles
4. Test removing users

## Storage
- **Role**: Stored in localStorage as `app.role`
- **Users**: Stored in localStorage as `app.users`
- **Theme**: Stored in localStorage as `theme`

## Default Behavior
- **Default Role**: Client (if no role is stored)
- **Default Theme**: Dark mode
- **Access**: All pages accessible without authentication

## Security Notes
- Role switching is for testing purposes only
- In production, roles should be determined by server-side authentication
- User data is stored locally and should be migrated to a proper backend
- Consider implementing proper session management for production use

## Files Modified/Created
- `src/config/Route/ProtectedRoute.js` - Updated authentication handling
- `src/config/Route/RequireRole.js` - Enhanced role checking
- `src/components/layout/Navigation.js` - Added role-based navigation
- `src/components/layout/Topbar.js` - Cleaned up, removed auth modals
- `src/App.js` - Updated routing with role-based access
- `src/components/F&Q/FAQSection.jsx` - Updated FAQ content
- `src/components/common/RoleSwitcher.jsx` - New testing component
- `ROLE_BASED_ACCESS.md` - This documentation

## Future Enhancements
1. Server-side role validation
2. Session management
3. User profile management
4. Role-based feature toggles
5. Audit logging for role changes
6. Multi-tenant support
