/**
 * SOURCE: Custom implementation
 * PURPOSE: Authentication state management (UI only for now)
 * MODIFICATIONS: Basic username storage, will add real auth later
 */

import { create } from 'zustand';

interface AuthState {
  username: string | null;
  isAuthenticated: boolean;
  setUsername: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  username: null,
  isAuthenticated: false,
  
  setUsername: (username: string) => {
    set({ username, isAuthenticated: true });
    // Save to localStorage for persistence
    localStorage.setItem('jungle_dash_username', username);
  },
  
  logout: () => {
    set({ username: null, isAuthenticated: false });
    localStorage.removeItem('jungle_dash_username');
  },
}));

