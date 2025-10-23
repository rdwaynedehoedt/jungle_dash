/**
 * SOURCE: Custom implementation with game UI inspiration
 * PURPOSE: Main menu/start screen - shown after login
 * MODIFICATIONS: Cartoon/game style with wooden elements to match login
 */

import { useAuthStore } from '../state/useAuthStore';

export const StartScreen = () => {
  const { username, logout } = useAuthStore();

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Jungle Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/PNG/menu/bg.png)' }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 gap-10">
        
        {/* Logo - Bigger */}
        <div className="transform hover:scale-105 transition-transform duration-300">
          <img 
            src="/PNG/menu/logo.png" 
            alt="Jungle Dash" 
            className="w-96 h-auto drop-shadow-2xl"
          />
        </div>

        {/* Welcome Banner - Bigger on wooden board */}
        <div className="relative">
          <div 
            className="bg-contain bg-center bg-no-repeat px-20 py-8"
            style={{ 
              backgroundImage: 'url(/PNG/menu/bgloginbox.png)',
              backgroundSize: '100% 100%'
            }}
          >
            <p className="text-2xl font-bold text-center text-gray-800">
              <span className="text-gray-700">Welcome, </span>
              <span className="text-green-600">{username}</span>
            </p>
          </div>
        </div>

        {/* Play Button - Bigger */}
        <button className="transform hover:scale-110 active:scale-95 transition-transform duration-200 drop-shadow-2xl">
          <img 
            src="/PNG/menu/play.png" 
            alt="Play" 
            className="w-56 h-auto"
          />
        </button>

        {/* Coming Soon Badge - Clean and bigger */}
        <div className="bg-yellow-400 border-2 border-yellow-500 text-yellow-900 font-bold px-8 py-3 rounded-full shadow-lg text-lg">
          Game Coming Soon
        </div>

        {/* Logout Button - Clean and bigger */}
        <button
          onClick={logout}
          className="mt-4 bg-white/90 hover:bg-white text-gray-700 font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

