# Firebase Migration Guide for TRISHOOL Device Registration Portal

## Overview
This guide provides instructions for migrating from the current Supabase backend to Firebase when needed.

## Setup Instructions

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project named "trishool-device-portal"
3. Enable Authentication, Firestore Database, and Cloud Storage

### 2. Update Configuration
Replace the placeholder values in `src/lib/firebase.ts` with your actual Firebase project details:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
}
```

### 3. Firestore Database Structure

Create the following collections:

#### Users Collection (`users`)
```javascript
// Document structure for user profiles
{
  uid: "user-uid",
  email: "user@email.com",
  createdAt: timestamp,
  role: "admin" | "user"
}
```

#### Devices Collection (`devices`)
```javascript
// Document structure for device registry
{
  deviceId: "deviceid-A2025001",
  device_name: "trishool",
  device_version: "version one",
  registeredAt: timestamp,
  isLinked: false,
  linkedAt: null,
  linkedToUser: null,
  registeredBy: "user-uid"
}
```

### 4. Authentication Setup

#### Enable Authentication Providers:
- Email/Password authentication
- Configure authorized domains
- Set up user roles and permissions

#### Security Rules:

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Only authenticated users can access devices
    match /devices/{deviceId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 5. Migration Steps

#### Step 1: Update Dependencies
Replace Supabase dependencies with Firebase:
```bash
npm uninstall @supabase/supabase-js
npm install firebase
```

#### Step 2: Update Authentication Context
Replace `src/contexts/AuthContext.tsx` with Firebase Auth implementation.

#### Step 3: Update Database Operations
Replace all Supabase queries with Firestore queries:
- `supabase.from('devices')` → `db.collection('devices')`
- Update query methods to match Firestore syntax

#### Step 4: Test Authentication Flow
- Verify login/logout functionality
- Test protected routes
- Ensure proper session management

#### Step 5: Test Device Operations
- Verify device registration
- Test device deregistration
- Validate data persistence

### 6. Environment Variables

Create `.env` file:
```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 7. Deployment Considerations

#### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize Firebase: `firebase init hosting`
3. Build project: `npm run build`
4. Deploy: `firebase deploy`

#### Authentication Configuration
1. Add your domain to authorized domains
2. Configure OAuth providers if needed
3. Set up email templates

### 8. Rollback Plan

If migration issues occur:
1. Keep Supabase setup running
2. Document specific issues encountered
3. Test thoroughly before switching production traffic
4. Have a rollback strategy prepared

## Current Implementation Notes

- Currently using Supabase for rapid development
- All data structures are compatible with Firebase
- Authentication flow can be directly mapped
- QR scanner functionality remains unchanged
- Swiss Design UI components are backend-agnostic

## Support

For Firebase-specific issues:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)
