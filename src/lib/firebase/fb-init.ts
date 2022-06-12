import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDV7KRqzWnZEsZPvhoT8Ww0Mwa2hOfer3c',
  authDomain: 'cogentx-360ai-app.firebaseapp.com',
  databaseURL: 'https://cogentx-360ai-app.firebaseio.com',
  projectId: 'cogentx-360ai-app',
  storageBucket: 'cogentx-360ai-app.appspot.com',
  messagingSenderId: '99012026996',
  appId: '1:99012026996:web:cf8c8a0e878e820e5f2721',
  measurementId: 'G-3JFFLLFMCX',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const authProviderGoogle = new GoogleAuthProvider();

// Firebase-related constants

export { db, auth, authProviderGoogle };
