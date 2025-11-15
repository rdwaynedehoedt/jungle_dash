/**
 * SOURCE: Custom implementation with Zustand
 * PURPOSE: Global state management for leaderboard
 * MODIFICATIONS: Simple store for leaderboard data and modal state
 */

import { create } from 'zustand';
import { LeaderboardEntry } from '../core/types';
import { getScores, saveScore } from '../services/leaderboardService';

interface LeaderboardStore {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
  
  // Actions
  openLeaderboard: () => void;
  closeLeaderboard: () => void;
  fetchScores: () => Promise<void>;
  submitScore: (username: string, score: number) => Promise<void>;
}

export const useLeaderboardStore = create<LeaderboardStore>((set) => ({
  entries: [],
  isLoading: false,
  error: null,
  isOpen: false,

  openLeaderboard: () => set({ isOpen: true }),
  
  closeLeaderboard: () => set({ isOpen: false }),

  fetchScores: async () => {
    set({ isLoading: true, error: null });
    try {
      const scores = await getScores(50);
      set({ entries: scores, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load leaderboard',
        isLoading: false 
      });
    }
  },

  submitScore: async (username: string, score: number) => {
    try {
      await saveScore(username, score);
      // Optionally refresh the leaderboard after submitting
      const scores = await getScores(50);
      set({ entries: scores });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to submit score'
      });
    }
  },
}));

