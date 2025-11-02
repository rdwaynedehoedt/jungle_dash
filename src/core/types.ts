/**
 * SOURCE: Custom implementation for Jungle Dash game
 * PURPOSE: TypeScript type definitions for game entities
 * MODIFICATIONS: Designed for UP/DOWN movement endless runner
 */

export type GameState = 'READY' | 'PLAYING' | 'PAUSED' | 'TRIVIA' | 'GAME_OVER';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

export interface Obstacle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: 'stone1' | 'stone2' | 'stone3' | 'stone4' | 'axe' | 'hammer';
}

export interface GameStats {
  score: number;
  distance: number;
  obstaclesAvoided: number;
  correctAnswers: number;
  wrongAnswers: number;
  startTime: number;
  duration: number;
}

export interface TriviaQuestion {
  question: string;
  image: string;
  answer: number;
  options?: number[];
}

export interface Position {
  x: number;
  y: number;
}

export interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}


