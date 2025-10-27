// Firebase Configuration for TRISHOOL Device Registration Portal
// This file is prepared for future migration from Supabase to Firebase

// Import Firebase services (commented out until migration)
// import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
// import { getFirestore } from 'firebase/firestore'
// import { getStorage } from 'firebase/storage'

// Firebase configuration - Update these with your Firebase project details
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
}

// Initialize Firebase (commented out until migration)
// const app = initializeApp(firebaseConfig)

// Export Firebase services (commented out until migration)
// export const auth = getAuth(app)
// export const db = getFirestore(app)
// export const storage = getStorage(app)

// For now, export placeholder values
export const auth = null
export const db = null
export const storage = null
export default null
