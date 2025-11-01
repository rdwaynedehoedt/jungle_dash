/**
 * SOURCE: Firebase official documentation
 * PURPOSE: Initialize Firebase app with auth and firestore
 * MODIFICATIONS: Configured for Jungle Dash project with modular SDK
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAAGYdvag_hdKa0yQj7yQBK6Si0yoQS_3s",
  authDomain: "jungle-dash-5d81a.firebaseapp.com",
  projectId: "jungle-dash-5d81a",
  storageBucket: "jungle-dash-5d81a.firebasestorage.app",
  messagingSenderId: "601235835169",
  appId: "1:601235835169:web:2eb4abe750491111cf1660",
  measurementId: "G-CS8Z7R9HV3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

