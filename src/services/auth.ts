/**
 * SOURCE: Firebase Authentication documentation
 * PURPOSE: Authentication service layer - handles all auth operations
 * MODIFICATIONS: Custom error handling and user profile creation
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User,
  onAuthStateChanged,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  createdAt: any;
  totalGames: number;
  highScore: number;
}

export const signUp = async (email: string, password: string, username: string): Promise<User> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });

    await sendEmailVerification(user);

    const userProfile: UserProfile = {
      uid: user.uid,
      username,
      email,
      createdAt: serverTimestamp(),
      totalGames: 0,
      highScore: 0
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);

    return user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign up');
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to login');
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to logout');
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to send reset email');
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get user profile');
  }
};

export const signInWithGoogle = async (): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential: UserCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      const username = user.displayName || user.email?.split('@')[0] || 'Player';
      
      const userProfile: UserProfile = {
        uid: user.uid,
        username,
        email: user.email || '',
        createdAt: serverTimestamp(),
        totalGames: 0,
        highScore: 0
      };

      await setDoc(userDocRef, userProfile);
    }

    return user;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

export const resendVerificationEmail = async (user: User): Promise<void> => {
  try {
    await sendEmailVerification(user);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to send verification email');
  }
};

export const onAuthChange = (callback: (user: User | null) => void): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

