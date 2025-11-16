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

/** Score data stored in Firestore for each game session */
export interface ScoreData {
  userId: string;                      // User's Firebase UID
  username: string;                    // Display name
  score: number;                       // Final game score
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  timestamp: any;                      // When the game was played
  correctAnswers: number;              // Trivia questions answered correctly
  wrongAnswers: number;                // Trivia questions answered incorrectly
  distance: number;                    // Distance traveled in game
  obstaclesAvoided: number;            // Number of obstacles dodged
  duration: number;                    // Game duration in seconds
}

/** User statistics aggregated from all games */
export interface UserStats {
  uid: string;                         // User's Firebase UID
  username: string;                    // Display name
  email: string;                       // User email
  totalGames: number;                  // Total games played
  highScore: number;                   // Highest score achieved
  createdAt: Timestamp;                // Account creation date
}

/**
 * Save game score to Firestore and update user stats
 * Creates new score document and updates user's high score if beaten
 */
export const saveScore = async (userId: string, scoreData: Omit<ScoreData, 'userId' | 'timestamp'>): Promise<void> => {
  try {
    // Create new score document in 'scores' collection
    const scoreRef = doc(collection(db, 'scores'));
    
    const fullScoreData: ScoreData = {
      userId,
      ...scoreData,
      timestamp: serverTimestamp() // Use server time for consistency
    };

    await setDoc(scoreRef, fullScoreData);

    // Update user's total games and high score
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentHighScore = userData.highScore || 0;
      const totalGames = (userData.totalGames || 0) + 1;

      // Only update high score if new score is higher
      await updateDoc(userRef, {
        totalGames,
        highScore: Math.max(currentHighScore, scoreData.score)
      });
    }
  } catch (error: any) {
    throw new Error(error.message || 'Failed to save score');
  }
};

/**
 * Get top high scores from leaderboard
 * Can filter by difficulty or get all scores
 */
export const getHighScores = async (difficulty?: 'EASY' | 'MEDIUM' | 'HARD', limitCount: number = 10): Promise<ScoreData[]> => {
  try {
    const scoresRef = collection(db, 'scores');
    
    // Build query with optional difficulty filter
    let q;
    if (difficulty) {
      q = query(
        scoresRef,
        where('difficulty', '==', difficulty),
        orderBy('score', 'desc'),          // Sort by highest score first
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

    // Convert Firestore documents to ScoreData objects
    querySnapshot.forEach((doc) => {
      scores.push(doc.data() as ScoreData);
    });

    return scores;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get high scores');
  }
};

/**
 * Get user statistics (total games, high score, etc.)
 */
export const getUserStats = async (userId: string): Promise<UserStats | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserStats;
    }
    return null; // User not found
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get user stats');
  }
};

/**
 * Update user profile fields (username, email, etc.)
 */
export const updateUserProfile = async (userId: string, data: Partial<UserStats>): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, data as any); // Update only specified fields
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update user profile');
  }
};

/**
 * Get all scores for a specific user (game history)
 */
export const getUserScores = async (userId: string, limitCount: number = 10): Promise<ScoreData[]> => {
  try {
    const scoresRef = collection(db, 'scores');
    const q = query(
      scoresRef,
      where('userId', '==', userId),     // Filter by user ID
      orderBy('score', 'desc'),          // Sort by highest score
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

