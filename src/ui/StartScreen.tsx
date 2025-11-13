/**
 * SOURCE: Custom implementation with game UI inspiration
 * PURPOSE: Main menu/start screen - shown after login
 * MODIFICATIONS: Cartoon/game style with wooden elements to match login
 */

import { useState } from 'react';
import { useAuthStore } from '../state/useAuthStore';
import { SettingsScreen } from './SettingsScreen';
import { ShopScreen } from './ShopScreen';
import { ProfileScreen } from './ProfileScreen';
import { LevelSelectScreen } from './LevelSelectScreen';
import { CountdownScreen } from './CountdownScreen';
import { GameCanvas } from './GameCanvas';
import { GameOverScreen } from './GameOverScreen';

export const StartScreen = () => {
  const { userProfile, logout } = useAuthStore();
  const [showSettings, setShowSettings] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [resumeScore, setResumeScore] = useState(0);  // For second chance
  const [selectedDifficulty, setSelectedDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD'>('EASY');

  const handleLevelSelect = (difficulty: 'EASY' | 'MEDIUM' | 'HARD') => {
    setSelectedDifficulty(difficulty);
    setShowLevelSelect(false);
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setResumeScore(0);  // Reset resume score for new game
    setShowGame(true);
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setShowGame(false);
    setShowGameOver(true);
  };

  const handleBackFromGame = () => {
    setShowGame(false);
  };

  const handleRestart = () => {
    setShowGameOver(false);
    setShowCountdown(true);
  };

  const handleMainMenu = () => {
    setShowGameOver(false);
  };

  const handleSecondChance = () => {
    // Resume game from where it ended - keep the final score
    setResumeScore(finalScore);
    setShowGameOver(false);
    setShowGame(true);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Jungle Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          objectFit: 'cover',
          objectPosition: 'center',
          transform: 'scale(1.18)',
          width: '100%',
          height: '100%'
        }}
      >
        <source src="/PNG/menu/Stylized_Jungle_Game_Background_Animation.mp4" type="video/mp4" />
      </video>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-between px-4 py-8">
        
        {/* Top Section - Logo and Welcome */}
        <div className="flex flex-col items-center gap-6 mt-8">
          {/* Logo */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/PNG/menu/logo.png" 
              alt="Jungle Dash" 
              className="w-80 h-auto drop-shadow-2xl"
            />
          </div>

          {/* Welcome Banner */}
          <div className="relative">
            <div 
              className="bg-contain bg-center bg-no-repeat px-16 py-6"
              style={{ 
                backgroundImage: 'url(/PNG/menu/bgloginbox.png)',
                backgroundSize: '100% 100%'
              }}
            >
              <p className="text-xl font-bold text-center text-gray-800 whitespace-nowrap">
                Welcome, {userProfile?.username || 'Player'}!
              </p>
            </div>
          </div>
        </div>

        {/* Center Section - Main Play Button */}
        <div className="flex flex-col items-center">
          {/* Play Button */}
          <button 
            onClick={() => setShowLevelSelect(true)}
            className="transform hover:scale-110 active:scale-95 transition-transform duration-200 drop-shadow-2xl"
          >
            <img 
              src="/PNG/menu/play.png" 
              alt="Play" 
              className="w-56 h-auto"
            />
          </button>
        </div>

        {/* Bottom Section - Navigation Icons */}
        <div className="flex items-center justify-center gap-6 mb-8">
          
          {/* Shop */}
          <div className="relative group">
            <button 
              onClick={() => setShowShop(true)}
              className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <img 
                src="/PNG/btn/shop.png" 
                alt="Shop" 
                className="w-16 h-16 drop-shadow-xl"
              />
            </button>
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
              Shop
            </div>
          </div>

          {/* Settings */}
          <div className="relative group">
            <button 
              onClick={() => setShowSettings(true)}
              className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <img 
                src="/PNG/btn/settings.png" 
                alt="Settings" 
                className="w-16 h-16 drop-shadow-xl"
              />
            </button>
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
              Settings
            </div>
          </div>

          {/* Profile */}
          <div className="relative group">
            <button 
              onClick={() => setShowProfile(true)}
              className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <img 
                src="/PNG/btn/leader.png" 
                alt="Profile" 
                className="w-16 h-16 drop-shadow-xl"
              />
            </button>
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
              My Profile
            </div>
          </div>

          {/* Logout */}
          <div className="relative group">
            <button
              onClick={logout}
              className="transform hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
            </button>
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
              Logout
            </div>
          </div>

        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsScreen onClose={() => setShowSettings(false)} />}
      
      {/* Shop Modal */}
      {showShop && <ShopScreen onClose={() => setShowShop(false)} />}
      
      {/* Profile Modal */}
      {showProfile && <ProfileScreen onClose={() => setShowProfile(false)} />}
      
      {/* Level Select Modal */}
      {showLevelSelect && (
        <LevelSelectScreen 
          onClose={() => setShowLevelSelect(false)}
          onSelectLevel={handleLevelSelect}
        />
      )}
        
      {/* Countdown Screen */}
      {showCountdown && (
        <CountdownScreen 
          difficulty={selectedDifficulty}
          onCountdownComplete={handleCountdownComplete}
        />
      )}

      {/* Game Screen */}
      {showGame && (
        <GameCanvas 
          difficulty={selectedDifficulty}
          onGameOver={handleGameOver}
          onBack={handleBackFromGame}
          initialScore={resumeScore}
        />
      )}

      {/* Game Over Screen */}
      {showGameOver && (
        <GameOverScreen 
          score={finalScore}
          onRestart={handleRestart}
          onMainMenu={handleMainMenu}
          onSecondChance={handleSecondChance}
        />
      )}
    </div>
  );
};

