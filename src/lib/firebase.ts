import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;
let auth;
let db;

// Check if apiKey is defined before initializing Firebase
if (firebaseConfig.apiKey) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app); // Initialize Firestore
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else {
  const errorMessage = "Firebase API key is not defined. Please set the NEXT_PUBLIC_FIREBASE_API_KEY environment variable.";
  console.error(errorMessage);
  throw new Error(errorMessage);
}

export { auth, app, db }; // Export firestore
export default app;
