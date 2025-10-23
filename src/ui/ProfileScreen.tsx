/**
 * SOURCE: Custom implementation
 * PURPOSE: User profile screen showing stats, achievements, and user info
 * MODIFICATIONS: Wooden box aesthetic with smooth macOS-like animations
 */

import { useState, useEffect } from 'react';
import { useAuthStore } from '../state/useAuthStore';

interface ProfileScreenProps {
  onClose: () => void;
}

export const ProfileScreen = ({ onClose }: ProfileScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const username = useAuthStore((state) => state.username);

  useEffect(() => {
    // Trigger open animation
    setIsAnimating(true);
  }, []);

  const handleClose = () => {
    // Trigger close animation
    setIsAnimating(false);
    // Wait for animation to finish before actually closing
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Mock user stats - will be replaced with real data later
  const userStats = {
    coins: 1000,
    level: 5,
    highScore: 12450,
    gamesPlayed: 23,
    achievements: 8
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Blur overlay */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-all duration-300 ${
          isAnimating ? 'backdrop-blur-md opacity-100' : 'backdrop-blur-none opacity-0'
        }`}
        onClick={handleClose} 
      />
      
      {/* Profile Box Container */}
      <div className={`relative w-full max-w-2xl transition-all duration-300 ${
        isAnimating ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}>
        
        {/* Title Image - Half outside box at top */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-10">
          <img 
            src="/PNG/My_profile/Header.png" 
            alt="My Profile" 
            className="h-40 w-auto drop-shadow-2xl"
            style={{ transform: 'scaleX(1.15)' }}
          />
        </div>

        {/* Profile Box */}
        <div className="relative mt-8">
          {/* Table background */}
          <div 
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/PNG/My_profile/table.png)',
              backgroundSize: '100% 100%'
            }}
          />
          
          {/* Content */}
          <div className="relative px-12 pt-20 pb-12">
            
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 transform hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <img 
                src="/PNG/My_profile/close_2.png" 
                alt="Close" 
                className="w-10 h-10 drop-shadow-lg"
              />
            </button>

            {/* Username Display */}
            <div className="text-center mb-10">
              <h2 
                className="text-3xl font-black text-gray-800"
                style={{ 
                  fontFamily: '"Fredoka One", "Lilita One", "Baloo 2", "Bubblegum Sans", Rounded, cursive, sans-serif'
                }}
              >
                {username}
              </h2>
            </div>

            {/* Stats */}
            <div className="space-y-5 mb-8">
              
              {/* Coins */}
              <div className="flex items-center justify-center gap-4 transform hover:scale-105 transition-transform">
                <span className="text-6xl">💰</span>
                <span className="text-4xl font-black text-gray-800">{userStats.coins}</span>
              </div>

              {/* Level */}
              <div className="flex items-center justify-center gap-4 transform hover:scale-105 transition-transform">
                <span className="text-6xl">⭐</span>
                <span className="text-4xl font-black text-gray-800">{userStats.level}</span>
              </div>

              {/* High Score */}
              <div className="flex items-center justify-center gap-4 transform hover:scale-105 transition-transform">
                <span className="text-6xl">🏆</span>
                <span className="text-3xl font-black text-gray-800">{userStats.highScore.toLocaleString()}</span>
              </div>

              {/* Games Played */}
              <div className="flex items-center justify-center gap-4 transform hover:scale-105 transition-transform">
                <span className="text-6xl">🎯</span>
                <span className="text-4xl font-black text-gray-800">{userStats.gamesPlayed}</span>
              </div>

              {/* Achievements */}
              <div className="flex items-center justify-center gap-4 transform hover:scale-105 transition-transform">
                <span className="text-6xl">🌟</span>
                <span className="text-4xl font-black text-gray-800">{userStats.achievements}/20</span>
              </div>

            </div>

            {/* OK Button */}
            <div className="flex items-center justify-center">
              <button
                onClick={handleClose}
                className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
              >
                <img 
                  src="/PNG/btn/ok.png" 
                  alt="OK" 
                  className="w-16 h-16 drop-shadow-xl"
                />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

