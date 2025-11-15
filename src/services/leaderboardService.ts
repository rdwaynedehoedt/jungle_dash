/**
 * SOURCE: Custom implementation with Firebase Firestore
 * PURPOSE: Handle all leaderboard data operations
 * MODIFICATIONS: Simple get/save operations for Jungle Dash leaderboard
 */

import { collection, addDoc, getDocs, query, orderBy, limit, where, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { LeaderboardEntry } from '../core/types';

const COLLECTION_NAME = 'leaderboard';

/**
 * Save a score to the leaderboard (only saves if it's the user's highest score)
 */
export const saveScore = async (username: string, score: number): Promise<void> => {
  try {
    // Check if user already has a score
    const q = query(
      collection(db, COLLECTION_NAME),
      where('username', '==', username)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // User already exists - check if new score is higher
      const existingDoc = querySnapshot.docs[0];
      const existingScore = existingDoc.data().score;
      
      if (score > existingScore) {
        // Update with new high score
        await updateDoc(doc(db, COLLECTION_NAME, existingDoc.id), {
          score,
          timestamp: new Date(),
        });
        console.log(`Updated ${username}'s high score to ${score}`);
      } else {
        // Don't save - existing score is higher
        console.log(`${username}'s existing score (${existingScore}) is higher than ${score}`);
      }
    } else {
      // New user - add their first score
      await addDoc(collection(db, COLLECTION_NAME), {
        username,
        score,
        timestamp: new Date(),
      });
      console.log(`Added ${username}'s first score: ${score}`);
    }
  } catch (error) {
    console.error('Error saving score:', error);
    throw new Error('Failed to save score to leaderboard');
  }
};

/**
 * Get all scores from the leaderboard (sorted by highest score)
 */
export const getScores = async (maxResults: number = 50): Promise<LeaderboardEntry[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('score', 'desc'),
      limit(maxResults)
    );
    
    const querySnapshot = await getDocs(q);
    const scores: LeaderboardEntry[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      scores.push({
        id: doc.id,
        username: data.username,
        score: data.score,
        timestamp: data.timestamp?.toDate() || new Date(),
      });
    });
    
    return scores;
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw new Error('Failed to fetch leaderboard data');
  }
};

