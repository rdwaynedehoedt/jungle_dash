/**
 * SOURCE: Custom implementation
 * PURPOSE: Global game state management
 * MODIFICATIONS: Zustand store for game state, score, difficulty
 */

import { create } from 'zustand';

type GameState = 'READY' | 'PLAYING' | 'PAUSED' | 'TRIVIA' | 'GAME_OVER';
type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

interface GameStats {
  score: number;
  distance: number;
  obstaclesAvoided: number;
  correctAnswers: number;
  wrongAnswers: number;
  startTime: number;
  duration: number;
}

interface GameStore {
  gameState: GameState;
  difficulty: Difficulty;
  stats: GameStats;
  
  setGameState: (state: GameState) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  updateStats: (stats: Partial<GameStats>) => void;
  resetGame: () => void;
  incrementScore: (points: number) => void;
  incrementObstaclesAvoided: () => void;
  incrementCorrectAnswers: () => void;
  incrementWrongAnswers: () => void;
}

const initialStats: GameStats = {
  score: 0,
  distance: 0,
  obstaclesAvoided: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  startTime: 0,
  duration: 0
};

export const useGameStore = create<GameStore>((set) => ({
  gameState: 'READY',
  difficulty: 'EASY',
  stats: initialStats,

  setGameState: (state) => {
    set({ gameState: state });
  },

  setDifficulty: (difficulty) => {
    set({ difficulty });
  },

  updateStats: (newStats) => {
    set((state) => ({
      stats: { ...state.stats, ...newStats }
    }));
  },

  resetGame: () => {
    set({
      gameState: 'READY',
      stats: { ...initialStats, startTime: Date.now() }
    });
  },

  incrementScore: (points) => {
    set((state) => ({
      stats: { ...state.stats, score: state.stats.score + points }
    }));
  },

  incrementObstaclesAvoided: () => {
    set((state) => ({
      stats: { ...state.stats, obstaclesAvoided: state.stats.obstaclesAvoided + 1 }
    }));
  },

  incrementCorrectAnswers: () => {
    set((state) => ({
      stats: { ...state.stats, correctAnswers: state.stats.correctAnswers + 1 }
    }));
  },

  incrementWrongAnswers: () => {
    set((state) => ({
      stats: { ...state.stats, wrongAnswers: state.stats.wrongAnswers + 1 }
    }));
  }
}));

