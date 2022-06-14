import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {firebaseConfig} from '../../_domains/cx-firebase';

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const authProviderGoogle = new GoogleAuthProvider();

// Firebase-related constants

export { db, auth, authProviderGoogle };
