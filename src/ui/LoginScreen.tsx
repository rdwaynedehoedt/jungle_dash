/**
 * SOURCE: Custom implementation with react-hot-toast notifications
 * PURPOSE: Clean login with icons, tooltips, and proper validation alerts
 * MODIFICATIONS: Icon-only buttons with toast notifications for errors
 */

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../state/useAuthStore';

export const LoginScreen = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUsername: saveUsername } = useAuthStore();

  const validateUsername = (username: string) => {
    if (!username) {
      toast.error('Enter username');
      return false;
    }
    
    if (username.length < 3) {
      toast.error('Username too short (min 3)');
      return false;
    }
    
    if (username.length > 15) {
      toast.error('Username too long (max 15)');
      return false;
    }

    const validUsername = /^[a-zA-Z0-9_-]+$/;
    if (!validUsername.test(username)) {
      toast.error('Invalid characters');
      return false;
    }

    return true;
  };

  const validatePassword = (password: string) => {
    if (mode === 'signup' && !password) {
      toast.error('Enter password');
      return false;
    }

    if (mode === 'signup' && password.length < 6) {
      toast.error('Password too short (min 6)');
      return false;
    }

    return true;
  };

  const handleLogin = () => {
    const trimmedUsername = username.trim();
    
    if (!validateUsername(trimmedUsername)) return;

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('jungle_dash_users') || '{}');
    
    if (!users[trimmedUsername]) {
      toast.error('User not found');
      return;
    }

    // For login, password is optional for now
    toast.success(`Welcome, ${trimmedUsername}!`);
    saveUsername(trimmedUsername);
  };

  const handleSignup = () => {
    const trimmedUsername = username.trim();
    
    if (!validateUsername(trimmedUsername)) return;
    if (!validatePassword(password)) return;

    // Check password confirmation
    if (password !== confirmPassword) {
      toast.error('Passwords don\'t match');
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('jungle_dash_users') || '{}');
    
    if (users[trimmedUsername]) {
      toast.error('Username taken');
      return;
    }

    // Save new user
    users[trimmedUsername] = { password, createdAt: new Date().toISOString() };
    localStorage.setItem('jungle_dash_users', JSON.stringify(users));

    toast.success(`Welcome, ${trimmedUsername}!`);
    saveUsername(trimmedUsername);
  };

  const handleSubmit = () => {
    if (mode === 'login') {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  const handleGoogleLogin = () => {
    toast('Coming soon', {
      duration: 2000,
    });
  };

  const handleSettings = () => {
    toast('Coming soon', {
      duration: 2000,
    });
  };

  const handleInfo = () => {
    toast('Jungle Dash', {
      duration: 2000,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setPassword('');
    setConfirmPassword('');
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
            <div className="flex justify-center mb-8">
              <img 
                src="/PNG/menu/logo.png" 
                alt="Jungle Dash" 
                className="w-64 h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Login/Signup Toggle - Minimal icons */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setMode('login')}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                  mode === 'login'
                    ? 'bg-green-500 text-white shadow-lg scale-110'
                    : 'bg-white/60 text-gray-500 hover:bg-white/90'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                  mode === 'signup'
                    ? 'bg-green-500 text-white shadow-lg scale-110'
                    : 'bg-white/60 text-gray-500 hover:bg-white/90'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </button>
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
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={mode === 'login' ? 'username' : 'new username'}
                  className="flex-1 px-4 py-4 text-base rounded-xl bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                  maxLength={15}
                />
              </div>
            </div>

            {/* Password Input with icon */}
            {mode === 'signup' && (
              <div className="mb-5">
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
                    placeholder="password"
                    className="flex-1 px-4 py-4 text-base rounded-xl bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Confirm Password Input - Only for signup */}
            {mode === 'signup' && (
              <div className="mb-8">
                <div className="flex items-center bg-white rounded-xl border-2 border-gray-300 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition-all shadow-md">
                  <div className="pl-4 text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="confirm password"
                    className="flex-1 px-4 py-4 text-base rounded-xl bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                  />
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="mb-8"></div>
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
                  onClick={handleSubmit}
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
                  {mode === 'login' ? 'Login' : 'Sign Up'}
                </div>
              </div>

            </div>


          </div>
        </div>
      </div>
    </div>
  );
};
