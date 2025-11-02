/**
 * SOURCE: Zustand documentation + Firebase Auth integration
 * PURPOSE: Global authentication state management
 * MODIFICATIONS: Integrated with Firebase auth service
 */

import { create } from 'zustand';
import { User } from 'firebase/auth';
import { 
  signUp, 
  login, 
  logout as firebaseLogout, 
  onAuthChange, 
  getUserProfile,
  signInWithGoogle,
  resendVerificationEmail
} from '../services/auth';
import { UserProfile } from '../services/auth';

interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  signUpUser: (email: string, password: string, username: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => void;
  resendVerification: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userProfile: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  setUser: (user) => {
    set({ user, isAuthenticated: !!user, isLoading: false });
  },

  setUserProfile: (profile) => {
    set({ userProfile: profile });
  },

  signUpUser: async (email, password, username) => {
    try {
      set({ isLoading: true, error: null });
      const user = await signUp(email, password, username);
      const profile = await getUserProfile(user.uid);
      set({ 
        user, 
        userProfile: profile, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      });
    } catch (error: any) {
      set({ 
        error: error.message || 'Failed to sign up', 
        isLoading: false 
      });
      throw error;
    }
  },

  loginUser: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const user = await login(email, password);
      const profile = await getUserProfile(user.uid);
      set({ 
        user, 
        userProfile: profile, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      });
    } catch (error: any) {
      set({ 
        error: error.message || 'Failed to login', 
        isLoading: false 
      });
      throw error;
    }
  },

  loginWithGoogle: async () => {
    try {
      set({ isLoading: true, error: null });
      const user = await signInWithGoogle();
      const profile = await getUserProfile(user.uid);
      set({ 
        user, 
        userProfile: profile, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      });
    } catch (error: any) {
      set({ 
        error: error.message || 'Failed to sign in with Google', 
        isLoading: false 
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await firebaseLogout();
      set({ 
        user: null, 
        userProfile: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: null 
      });
    } catch (error: any) {
      set({ 
        error: error.message || 'Failed to logout', 
        isLoading: false 
      });
      throw error;
    }
  },

  initializeAuth: () => {
    onAuthChange(async (user) => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        set({ 
          user, 
          userProfile: profile, 
          isAuthenticated: true, 
          isLoading: false 
        });
      } else {
        set({ 
          user: null, 
          userProfile: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
      }
    });
  },

  resendVerification: async () => {
    const { user } = get();
    if (!user) {
      throw new Error('No user logged in');
    }
    try {
      set({ isLoading: true, error: null });
      await resendVerificationEmail(user);
      set({ isLoading: false });
    } catch (error: any) {
      set({ 
        error: error.message || 'Failed to resend verification email', 
        isLoading: false 
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  }
}));
