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

/**
 * User Profile Interface
 * Represents user data stored in Firestore database
 * Separate from Firebase Auth User object
 */
export interface UserProfile {
  uid: string;           // Unique user ID from Firebase Auth
  username: string;      // Display name shown in game and leaderboard
  email: string;         // User's email address
  createdAt: any;        // Timestamp when account was created
  totalGames: number;    // Total number of games played
  highScore: number;     // User's highest score across all games
}

/**
 * Sign up a new user with email and password
 * Creates Firebase auth account and user profile in Firestore
 * @param email - User's email address
 * @param password - User's password (Firebase handles hashing)
 * @param username - Display name for the user
 * @returns Promise<User> - Firebase User object with UID and auth info
 */
export const signUp = async (email: string, password: string, username: string): Promise<User> => {
  try {
    // Step 1: Create authentication account in Firebase Auth
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Update Firebase Auth profile with display name
    await updateProfile(user, { displayName: username });

    // Step 3: Send email verification for account security
    await sendEmailVerification(user);

    // Step 4: Create user profile document in Firestore database
    const userProfile: UserProfile = {
      uid: user.uid,              // Unique user ID from Firebase Auth
      username,                   // Display name
      email,                      // Email address
      createdAt: serverTimestamp(), // Server timestamp for consistency
      totalGames: 0,              // Initialize game statistics
      highScore: 0                // Initialize high score
    };

    // Step 5: Save profile to 'users' collection with UID as document ID
    await setDoc(doc(db, 'users', user.uid), userProfile);

    return user;
  } catch (error: any) {
    // Error handling: Re-throw with clean message
    throw new Error(error.message || 'Failed to sign up');
  }
};

/**
 * Log in an existing user with email and password
 * @param email - User's registered email
 * @param password - User's password
 * @returns Promise<User> - Firebase User object with auth token
 */
export const login = async (email: string, password: string): Promise<User> => {
  try {
    // Authenticate user with Firebase Auth
    // Firebase validates credentials and generates JWT token automatically
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Returns user with auth token for session
  } catch (error: any) {
    // Common errors: wrong password, user not found, too many attempts
    throw new Error(error.message || 'Failed to login');
  }
};

/**
 * Log out the current user
 * Clears authentication tokens and session data
 * @returns Promise<void>
 */
export const logout = async (): Promise<void> => {
  try {
    // Sign out from Firebase Auth - clears JWT tokens and local storage
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to logout');
  }
};

/**
 * Send password reset email to user
 * User will receive link to create new password
 * @param email - User's registered email address
 * @returns Promise<void>
 */
export const resetPassword = async (email: string): Promise<void> => {
  try {
    // Firebase sends email with secure reset link
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    // Error if email not registered or invalid
    throw new Error(error.message || 'Failed to send reset email');
  }
};

/**
 * Retrieve user profile data from Firestore
 * Fetches game stats, username, and other profile info
 * @param uid - User's unique Firebase ID
 * @returns Promise<UserProfile | null> - User profile or null if not found
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    // Reference to user document in 'users' collection
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    // Check if document exists in Firestore
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile; // Return profile data
    }
    return null; // User profile not found
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get user profile');
  }
};

/**
 * Sign in with Google OAuth 2.0
 * Opens Google popup for authentication, creates profile if new user
 * Demonstrates third-party authentication integration
 * @returns Promise<User> - Firebase User object
 */
export const signInWithGoogle = async (): Promise<User> => {
  try {
    // Step 1: Create Google OAuth provider
    const provider = new GoogleAuthProvider();
    
    // Step 2: Open Google sign-in popup (OAuth 2.0 flow)
    const userCredential: UserCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Step 3: Check if user profile exists in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    // Step 4: Create profile for new Google users
    if (!userDoc.exists()) {
      // Extract username from Google profile or email
      const username = user.displayName || user.email?.split('@')[0] || 'Player';
      
      const userProfile: UserProfile = {
        uid: user.uid,
        username,
        email: user.email || '',
        createdAt: serverTimestamp(),
        totalGames: 0,
        highScore: 0
      };

      // Save new profile to Firestore
      await setDoc(userDocRef, userProfile);
    }

    return user; // Return authenticated user with JWT token
  } catch (error: any) {
    // Errors: popup closed, network issues, Google auth failure
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

/**
 * Resend email verification to user
 * Used when user didn't receive initial verification email
 * @param user - Firebase User object
 * @returns Promise<void>
 */
export const resendVerificationEmail = async (user: User): Promise<void> => {
  try {
    // Send new verification email to user's registered email
    await sendEmailVerification(user);
  } catch (error: any) {
    // Error if too many requests or network issues
    throw new Error(error.message || 'Failed to send verification email');
  }
};

/**
 * Listen for authentication state changes
 * Fires callback when user logs in, logs out, or token refreshes
 * Used for persistent sessions across page refreshes
 * @param callback - Function called with User object or null
 * @returns Function to unsubscribe from listener
 */
export const onAuthChange = (callback: (user: User | null) => void): (() => void) => {
  // Firebase automatically checks for stored tokens on page load
  // Callback fires with user if valid session exists, null otherwise
  return onAuthStateChanged(auth, callback);
};

