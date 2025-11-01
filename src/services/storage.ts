/**
 * SOURCE: Firebase Firestore documentation
 * PURPOSE: Database service layer - handles all Firestore operations
 * MODIFICATIONS: Custom data structures for game scores and leaderboard
 */

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

export interface ScoreData {
  userId: string;
  username: string;
  score: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  timestamp: any;
  correctAnswers: number;
  wrongAnswers: number;
  distance: number;
  obstaclesAvoided: number;
  duration: number;
}

export interface UserStats {
  uid: string;
  username: string;
  email: string;
  totalGames: number;
  highScore: number;
  createdAt: Timestamp;
}

export const saveScore = async (userId: string, scoreData: Omit<ScoreData, 'userId' | 'timestamp'>): Promise<void> => {
  try {
    const scoreRef = doc(collection(db, 'scores'));
    
    const fullScoreData: ScoreData = {
      userId,
      ...scoreData,
      timestamp: serverTimestamp()
    };

    await setDoc(scoreRef, fullScoreData);

    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentHighScore = userData.highScore || 0;
      const totalGames = (userData.totalGames || 0) + 1;

      await updateDoc(userRef, {
        totalGames,
        highScore: Math.max(currentHighScore, scoreData.score)
      });
    }
  } catch (error: any) {
    throw new Error(error.message || 'Failed to save score');
  }
};

export const getHighScores = async (difficulty?: 'EASY' | 'MEDIUM' | 'HARD', limitCount: number = 10): Promise<ScoreData[]> => {
  try {
    const scoresRef = collection(db, 'scores');
    
    let q;
    if (difficulty) {
      q = query(
        scoresRef,
        where('difficulty', '==', difficulty),
        orderBy('score', 'desc'),
        limit(limitCount)
      );
    } else {
      q = query(
        scoresRef,
        orderBy('score', 'desc'),
        limit(limitCount)
      );
    }

    const querySnapshot = await getDocs(q);
    const scores: ScoreData[] = [];

    querySnapshot.forEach((doc) => {
      scores.push(doc.data() as ScoreData);
    });

    return scores;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get high scores');
  }
};

export const getUserStats = async (userId: string): Promise<UserStats | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserStats;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get user stats');
  }
};

export const updateUserProfile = async (userId: string, data: Partial<UserStats>): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, data as any);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update user profile');
  }
};

export const getUserScores = async (userId: string, limitCount: number = 10): Promise<ScoreData[]> => {
  try {
    const scoresRef = collection(db, 'scores');
    const q = query(
      scoresRef,
      where('userId', '==', userId),
      orderBy('score', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const scores: ScoreData[] = [];

    querySnapshot.forEach((doc) => {
      scores.push(doc.data() as ScoreData);
    });

    return scores;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get user scores');
  }
};

