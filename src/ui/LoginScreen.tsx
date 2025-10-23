/**
 * SOURCE: Custom implementation with minimalist icon-based UI
 * PURPOSE: Clean login with icons and tooltips - minimal text approach
 * MODIFICATIONS: Icon-only buttons with smooth hover tooltips, settings and info buttons
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

  const handleSettings = () => {
    alert('Settings coming soon!');
  };

  const handleInfo = () => {
    alert('Game Info: Jungle Dash - An endless runner adventure!');
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
      
      {/* Top Corner Buttons */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between">
        {/* Settings Button */}
        <div className="relative group">
          <button
            onClick={handleSettings}
            className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
          >
            <img 
              src="/PNG/btn/settings.png" 
              alt="Settings" 
              className="w-12 h-12 drop-shadow-lg"
            />
          </button>
          <div className="absolute top-14 left-0 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
            Settings
          </div>
        </div>

        {/* Info Button */}
        <div className="relative group">
          <button
            onClick={handleInfo}
            className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
          >
            <img 
              src="/PNG/btn/about.png" 
              alt="Info" 
              className="w-12 h-12 drop-shadow-lg"
            />
          </button>
          <div className="absolute top-14 right-0 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
            Info
          </div>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">

        {/* Wooden Box Login Container - Bigger and eye-catching */}
        <div className="w-full max-w-lg relative">
          {/* Wooden Board Background */}
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/PNG/menu/bgloginbox.png)',
              backgroundSize: '100% 100%'
            }}
          />
          
          {/* Content on wooden board */}
          <div className="relative px-14 py-16">
            
            {/* Logo at top inside box */}
            <div className="flex justify-center mb-10">
              <img 
                src="/PNG/menu/logo.png" 
                alt="Jungle Dash" 
                className="w-72 h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Username Input with icon */}
            <div className="mb-6">
              <div className="flex items-center bg-white rounded-xl border-2 border-gray-300 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition-all shadow-md">
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
                  className="flex-1 px-4 py-4 text-base rounded-xl bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                  maxLength={15}
                />
              </div>
            </div>

            {/* Password Input with icon */}
            <div className="mb-8">
              <div className="flex items-center bg-white rounded-xl border-2 border-gray-300 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition-all shadow-md">
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
                  className="flex-1 px-4 py-4 text-base rounded-xl bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-600 mb-6 text-center">
                {error}
              </p>
            )}

            {/* Icon Buttons Row */}
            <div className="flex items-center justify-center gap-6 mt-4">
              
              {/* Google Login Button - 01 with white box and G on top */}
              <div className="relative group">
                <button
                  onClick={handleGoogleLogin}
                  className="relative transform hover:scale-110 active:scale-95 transition-transform duration-200"
                >
                  {/* 01.png background frame */}
                  <img 
                    src="/PNG/btn/01.png" 
                    alt="Google Login" 
                    className="w-16 h-16 drop-shadow-xl"
                  />
                  {/* White box/circle to cover green part */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 bg-white rounded-xl"></div>
                  </div>
                  {/* Google G overlaid on top of white box */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-9 h-9" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                  </div>
                </button>
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Google Login
                </div>
              </div>

              {/* Continue/OK Button */}
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
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Continue
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
