/**
 * SOURCE: Custom implementation
 * PURPOSE: Main app component - handles routing between screens
 * MODIFICATIONS: Routes based on authentication state
 */

import { useEffect } from 'react';
import { useAuthStore } from './state/useAuthStore';
import { LoginScreen } from './ui/LoginScreen';
import { StartScreen } from './ui/StartScreen';

function App() {
  const { isAuthenticated, setUsername } = useAuthStore();

  // Check for existing username in localStorage on mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('jungle_dash_username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, [setUsername]);

  return (
    <>
      {!isAuthenticated ? <LoginScreen /> : <StartScreen />}
    </>
  );
}

export default App;

