/**
 * SOURCE: Custom implementation with react-hot-toast for notifications
 * PURPOSE: Main app component - handles routing between screens
 * MODIFICATIONS: Routes based on authentication state, added toast notifications
 */

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './state/useAuthStore';
import { LoginScreen } from './ui/LoginScreen';
import { StartScreen } from './ui/StartScreen';

function App() {
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-green-400 to-green-600">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Toast Notification Container */}
      <Toaster 
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Default options
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          // Success toast style
          success: {
            duration: 2500,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
            style: {
              background: '#10b981',
            },
          },
          // Error toast style
          error: {
            duration: 3500,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
      
      {!isAuthenticated ? <LoginScreen /> : <StartScreen />}
    </>
  );
}

export default App;

