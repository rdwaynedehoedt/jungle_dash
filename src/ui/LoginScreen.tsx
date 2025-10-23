/**
 * SOURCE: Custom implementation with minimalist icon-based UI
 * PURPOSE: Clean login with icons and tooltips - minimal text approach
 * MODIFICATIONS: Icon-only buttons with smooth hover tooltips
 */

import { useState } from 'react';
import { useAuthStore } from '../state/useAuthStore';

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUsername: saveUsername } = useAuthStore();

  const handleManualLogin = () => {
    // Validation
    if (!username.trim()) {
      setError('Enter username');
      return;
    }
    
    if (username.trim().length < 3) {
      setError('Username too short');
      return;
    }
    
    if (username.trim().length > 15) {
      setError('Username too long');
      return;
    }

    // Save username (password is optional for now)
    saveUsername(username.trim());
  };

  const handleGoogleLogin = () => {
    alert('Google login coming soon!');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleManualLogin();
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Jungle Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/PNG/menu/bg.png)' }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        
        {/* Logo - Bigger and more prominent */}
        <div className="transform hover:scale-105 transition-transform duration-300 mb-8">
          <img 
            src="/PNG/menu/logo.png" 
            alt="Jungle Dash" 
            className="w-80 h-auto drop-shadow-2xl"
          />
        </div>

        {/* Wooden Box Login Container - Bigger and more spacious */}
        <div className="w-full max-w-md relative">
          {/* Wooden Board Background */}
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/PNG/menu/bgloginbox.png)',
              backgroundSize: '100% 100%'
            }}
          />
          
          {/* Content on wooden board - More padding and spacing */}
          <div className="relative px-12 py-12">
            
            {/* Cute emoji decoration at top */}
            <div className="text-center mb-6">
              <span className="text-4xl">🌴</span>
            </div>

            {/* Username Input with icon - Bigger */}
            <div className="mb-5">
              <div className="flex items-center bg-white rounded-xl border-2 border-gray-300 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition-all shadow-sm">
                <div className="pl-4 text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError('');
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="username"
                  className="flex-1 px-4 py-3.5 text-base rounded-xl bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                  maxLength={15}
                />
              </div>
            </div>

            {/* Password Input with icon - Bigger */}
            <div className="mb-6">
              <div className="flex items-center bg-white rounded-xl border-2 border-gray-300 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition-all shadow-sm">
                <div className="pl-4 text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="password (optional)"
                  className="flex-1 px-4 py-3.5 text-base rounded-xl bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-600 mb-4 text-center">
                {error}
              </p>
            )}

            {/* Icon Buttons Row - Bigger with more spacing */}
            <div className="flex items-center justify-center gap-6 mt-8">
              
              {/* Google Login Icon Button - Bigger */}
              <div className="relative group">
                <button
                  onClick={handleGoogleLogin}
                  className="w-16 h-16 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 border-2 border-gray-100"
                >
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Google Login
                </div>
              </div>

              {/* Continue/OK Button - Bigger */}
              <div className="relative group">
                <button
                  onClick={handleManualLogin}
                  className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
                >
                  <img 
                    src="/PNG/btn/ok.png" 
                    alt="Continue" 
                    className="w-16 h-16 drop-shadow-xl"
                  />
                </button>
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Continue
                </div>
              </div>

            </div>

            {/* Cute emoji decoration at bottom */}
            <div className="text-center mt-6">
              <span className="text-2xl">🎮</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

